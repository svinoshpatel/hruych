--
-- PostgreSQL database dump
--

\restrict PboteL9ar0CJ9ddqJCCCdG5dsyjfuYXmpm4RZ3MfwDc0c1HV2POU9jsf85rK9m4

-- Dumped from database version 15.14
-- Dumped by pg_dump version 15.14

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: account; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.account (
    id integer NOT NULL,
    name text,
    image text
);


ALTER TABLE public.account OWNER TO postgres;

--
-- Name: account_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.account_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.account_id_seq OWNER TO postgres;

--
-- Name: account_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.account_id_seq OWNED BY public.account.id;


--
-- Name: auction; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.auction (
    id integer NOT NULL,
    image text NOT NULL,
    author_id integer NOT NULL,
    title text NOT NULL,
    description text,
    start_time timestamp without time zone,
    end_time timestamp without time zone
);


ALTER TABLE public.auction OWNER TO postgres;

--
-- Name: auction_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.auction_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.auction_id_seq OWNER TO postgres;

--
-- Name: auction_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.auction_id_seq OWNED BY public.auction.id;


--
-- Name: bid; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.bid (
    id integer NOT NULL,
    auction_id integer NOT NULL,
    account_id integer NOT NULL,
    price numeric(12,0) NOT NULL,
    bid_time timestamp without time zone DEFAULT now()
);


ALTER TABLE public.bid OWNER TO postgres;

--
-- Name: bid_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.bid_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.bid_id_seq OWNER TO postgres;

--
-- Name: bid_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.bid_id_seq OWNED BY public.bid.id;


--
-- Name: account id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.account ALTER COLUMN id SET DEFAULT nextval('public.account_id_seq'::regclass);


--
-- Name: auction id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auction ALTER COLUMN id SET DEFAULT nextval('public.auction_id_seq'::regclass);


--
-- Name: bid id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bid ALTER COLUMN id SET DEFAULT nextval('public.bid_id_seq'::regclass);


--
-- Data for Name: account; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.account (id, name, image) FROM stdin;
1	\nrumi	http://localhost:3000/uploads/moth.jpg
2	svinoshpatel	http://localhost:3000/uploads/goatskull.png
3	hruk	http://localhost:3000/uploads/moth.jpg
4	zirkul	http://localhost:3000/uploads/2b-arch-wallpaper-no-text.png
5	bambam	http://localhost:3000/uploads/spider.jpg
6	bombom	http://localhost:3000/uploads/woman.jpg
7	adam	http://localhost:3000/uploads/deer.jpg
8	svinoshpatel	http://localhost:3000/uploads/goatskull.png
9	hruk	http://localhost:3000/uploads/moth.jpg
10	zirkul	http://localhost:3000/uploads/2b-arch-wallpaper-no-text.png
11	bambam	http://localhost:3000/uploads/spider.jpg
12	bombom	http://localhost:3000/uploads/woman.jpg
13	adam	http://localhost:3000/uploads/deer.jpg
\.


--
-- Data for Name: auction; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.auction (id, image, author_id, title, description, start_time, end_time) FROM stdin;
3	http://localhost:3000/uploads/goatskull.png	1	something	he told something	2023-07-04 12:05:33	2024-08-04 12:04:55
4	http://localhost:3000/uploads/goatskull.png	2	Goat Skull Auction	A rare goat skull from the mountains	2025-09-01 10:00:00	2025-09-15 10:00:00
5	http://localhost:3000/uploads/moth.jpg	3	Moth Wings Collection	Beautiful intricately patterned moth wings	2025-09-03 12:00:00	2025-09-20 12:00:00
6	http://localhost:3000/uploads/2b-arch-wallpaper-no-text.png	4	2B Arch Wallpaper	High resolution wallpaper inspired by 2B from Nier	2025-08-25 09:00:00	2025-09-30 09:00:00
7	http://localhost:3000/uploads/spider.jpg	5	Spider Sculpture	Handmade spider sculpture in metal	2025-09-05 14:00:00	2025-09-25 14:00:00
8	http://localhost:3000/uploads/woman.jpg	6	Portrait Painting	Oil painting portrait of a woman	2025-09-07 16:00:00	2025-09-22 16:00:00
9	http://localhost:3000/uploads/deer.jpg	7	Deer in Forest	Photograph of deer in a forest setting	2025-09-10 08:00:00	2025-09-24 08:00:00
\.


--
-- Data for Name: bid; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.bid (id, auction_id, account_id, price, bid_time) FROM stdin;
\.


--
-- Name: account_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.account_id_seq', 13, true);


--
-- Name: auction_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.auction_id_seq', 9, true);


--
-- Name: bid_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.bid_id_seq', 1, false);


--
-- Name: account account_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.account
    ADD CONSTRAINT account_pkey PRIMARY KEY (id);


--
-- Name: auction auction_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auction
    ADD CONSTRAINT auction_pkey PRIMARY KEY (id);


--
-- Name: bid bid_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bid
    ADD CONSTRAINT bid_pkey PRIMARY KEY (id);


--
-- Name: auction fk_account; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auction
    ADD CONSTRAINT fk_account FOREIGN KEY (author_id) REFERENCES public.account(id);


--
-- Name: bid fk_account; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bid
    ADD CONSTRAINT fk_account FOREIGN KEY (account_id) REFERENCES public.account(id);


--
-- Name: bid fk_auction; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bid
    ADD CONSTRAINT fk_auction FOREIGN KEY (auction_id) REFERENCES public.auction(id);


--
-- PostgreSQL database dump complete
--

\unrestrict PboteL9ar0CJ9ddqJCCCdG5dsyjfuYXmpm4RZ3MfwDc0c1HV2POU9jsf85rK9m4

