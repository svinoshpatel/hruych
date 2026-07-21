# Hruych

![Java](https://img.shields.io/badge/Java-17-orange)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-4.1-brightgreen)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-18-blue)
![Keycloak](https://img.shields.io/badge/Keycloak-26-blue)
![Status](https://img.shields.io/badge/status-work--in--progress-yellow)

A backend for a real-time online auction platform. Users publish auctions
(with an image, terms, and optional Kickstarter-style reward tiers), and
other users place live bids that are validated server-side and broadcast
instantly over WebSocket to everyone watching that auction.

This is a personal learning project built to practice designing a
production-shaped Spring Boot service end to end: token-based auth against
a real identity provider, authenticated real-time messaging, file uploads
with real content validation, database migrations, and generated API docs.
It's a work in progress — see [Roadmap](#roadmap--known-limitations) below
for what's still rough.

## Features

- **Auctions** — create, update, delete, fetch, and paginate, with an
  uploaded cover image and optional reward tiers
- **Live bidding over WebSocket (STOMP)** — bids are placed and broadcast
  in real time, not polled
- **Authenticated WebSocket sessions** — the STOMP handshake is public,
  but the `CONNECT` frame's bearer token is decoded and turned into a real
  Spring Security `Authentication`, so every bid is tied to a real,
  verified user
- **Bid validation** — a bid must beat the current highest bid (or the
  starting bid) by at least the configured minimum step, and auction
  authors can't bid on their own auctions
- **JWT auth via Keycloak** — the API is a stateless OAuth2 resource
  server; user accounts are auto-provisioned from the JWT's claims the
  first time a new subject is seen, so there's no separate signup flow
- **Real file-type validation** — uploaded images are sniffed with Apache
  Tika (actual byte inspection) rather than trusting the client-supplied
  `Content-Type`, via a custom `@ValidFile` Bean Validation constraint
- **S3-compatible object storage** — images are uploaded to S3 (LocalStack
  standing in for AWS locally)
- **RFC 7807 error responses** — a global exception handler turns domain
  exceptions into `application/problem+json` responses
- **Schema migrations with Liquibase**
- **Code-first API docs** — OpenAPI/Swagger UI generated from the
  controllers and DTOs at runtime via springdoc, so the docs can't drift
  out of sync with the code
- **Fully dockerized local stack** — Postgres, Keycloak (pre-loaded with a
  realm, test users, and an OAuth client for Postman), and LocalStack, all
  defined in one `compose.yaml`

## Tech stack

| Layer               | Technology                                                          |
|---------------------|----------------------------------------------------------------------|
| Language / runtime  | Java 17                                                               |
| Framework           | Spring Boot 4.1, Spring MVC, Spring WebSocket (STOMP)                 |
| Auth                | Spring Security OAuth2 Resource Server + Keycloak (JWT bearer)        |
| Persistence         | Spring Data JPA + PostgreSQL, migrations via Liquibase                |
| Object storage      | AWS SDK v2 S3 client, LocalStack for local development                |
| Mapping             | MapStruct                                                             |
| Validation          | Jakarta Bean Validation + a custom Apache Tika-backed file validator  |
| API docs            | springdoc-openapi (generated from code)                               |
| Testing             | JUnit 5, Mockito, AssertJ                                             |
| Local infra         | Docker Compose (Postgres, Keycloak, LocalStack)                       |
| Build               | Maven                                                                 |

## Project layout

```
apps/api/           Spring Boot service (the only app so far)
infra/docker/       Keycloak realm import, Postgres init scripts, LocalStack init scripts
compose.yaml        Local dev stack: Postgres, Keycloak, LocalStack
```

The `apps/` / `infra/` split is set up as a small monorepo on purpose, to
leave room for a web client to live alongside the API later.

## Domain model

- **UserAccount** — created automatically the first time a JWT's
  `sub` claim is seen; no signup endpoint required
- **Auction** — belongs to an author, has a title, description, terms,
  cover image, starting bid, minimum bid step, a set of **Tiers**, and a
  set of **Bids**
- **Tier** — a named reward level with a price, belonging to one auction
- **Bid** — an amount placed by a bidder on an auction, validated against
  the current highest bid and the auction's minimum step

## API

Every HTTP route below currently requires a Keycloak-issued bearer token
(`Authorization: Bearer <jwt>`); only the WebSocket handshake endpoint
itself is public — the bid channel is authenticated separately via the
STOMP `CONNECT` frame.

| Route                                                       | Description                                                     |
|----------------------------------------------------------------|---------------------------------------------------------------------|
| `POST /auctions` *(multipart: `data` JSON + `image` file)*      | Create an auction with an image and optional reward tiers            |
| `PATCH /auctions/{id}` *(multipart)*                            | Update an auction you own; the image part is optional                |
| `DELETE /auctions/{id}`                                         | Delete an auction you own                                            |
| `GET /auctions/{id}`                                            | Fetch a single auction                                                |
| `GET /auctions?page=&size=`                                     | Paginated auction list, soonest-ending first                         |
| STOMP `SEND /app/create-bid` → broadcast on `/topic/bids`       | Place a bid; the result is pushed to that auction's subscribers      |

### API documentation

Docs are generated from the code at runtime:

- OpenAPI JSON: `http://localhost:8081/v3/api-docs`
- Swagger UI: `http://localhost:8081/swagger-ui/index.html`

## Getting started
This project is currently developed and run through **IntelliJ IDEA**;
the Maven CLI path isn't set up or tested, so use IDEA's run
configuration rather than `mvnw`.

**Prerequisites:** Java 17+, Docker Desktop (or another Docker Compose
provider), IntelliJ IDEA.

1. Clone the repo and open it in IntelliJ (there's an `.idea` folder for
   it already).
2. Copy the env template and fill in secrets:
   ```bash
   cp .env.template .env
   ```
3. Run `ApiApplication` from IntelliJ's Spring Boot run configuration (**-Duser.timezone=UTC** vm option may be needed for DB to work.)
   `spring-boot-docker-compose` will automatically start Postgres,
   Keycloak (pre-loaded with a `main` realm, test users, and a `postman`
   OAuth client for manual token testing), and LocalStack (which
   auto-creates the `hruych-bucket` S3 bucket) — and stop them again when
   the app shuts down. Liquibase applies schema migrations automatically
   on startup.
4. The API is now available at `http://localhost:8081`, and Keycloak's
   admin console at `http://localhost:8080`.

To call authenticated endpoints, obtain a token from Keycloak (the
pre-configured `postman` client makes this easy to do straight from
Postman's built-in OAuth2 helper against the `main` realm's token
endpoint).

## Running tests

Run via IntelliJ's test runner (right-click `apps/api/src/test` → Run
Tests). The Maven CLI (`./mvnw test`) isn't part of the tested workflow
for this project yet.

## Roadmap / known limitations

This is a learning project and still evolving. Currently on the list:

- Parametrized sorting for the auction list endpoint (currently fixed:
  soonest-ending first)
- Trimming down nested data in list responses — right now each auction in
  a page includes its full bid and tier collections
- Finishing the user account endpoints (a profile-lookup route is
  stubbed but not implemented)
- Revisiting how an auction's tiers get cascaded/persisted alongside
  their parent
- Expanding and cleaning up service-layer test coverage
