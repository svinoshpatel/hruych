--
-- PostgreSQL database dump
--

\restrict K9atpbQWMRPSSVhXMrwz34rcYq8yJMsiiylQBWLc5puIpJJ8xA3NGRq0OeuIlLS

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
    display_name text NOT NULL,
    image text,
    username text NOT NULL,
    email text NOT NULL,
    password text NOT NULL
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
    start_time timestamp with time zone,
    end_time timestamp with time zone,
    starting_bid numeric(12,0),
    min_bid_step numeric(12,0),
    is_autobuy boolean DEFAULT false,
    autobuy_price numeric(12,0),
    is_open boolean DEFAULT true,
    winner_id integer
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
    bid_time timestamp with time zone DEFAULT now()
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

COPY public.account (id, display_name, image, username, email, password) FROM stdin;
1	\nrumi	http://localhost:3000/uploads/moth.jpg	\nrumi_1	\nrumi_1@gmail.com	\nrumi_1pswd
2	svinoshpatel	http://localhost:3000/uploads/goatskull.png	svinoshpatel_2	svinoshpatel_2@gmail.com	svinoshpatel_2pswd
3	hruk	http://localhost:3000/uploads/moth.jpg	hruk_3	hruk_3@gmail.com	hruk_3pswd
4	zirkul	http://localhost:3000/uploads/2b-arch-wallpaper-no-text.png	zirkul_4	zirkul_4@gmail.com	zirkul_4pswd
5	bambam	http://localhost:3000/uploads/spider.jpg	bambam_5	bambam_5@gmail.com	bambam_5pswd
6	bombom	http://localhost:3000/uploads/woman.jpg	bombom_6	bombom_6@gmail.com	bombom_6pswd
7	adam	http://localhost:3000/uploads/deer.jpg	adam_7	adam_7@gmail.com	adam_7pswd
8	svinoshpatel	http://localhost:3000/uploads/goatskull.png	svinoshpatel_8	svinoshpatel_8@gmail.com	svinoshpatel_8pswd
9	hruk	http://localhost:3000/uploads/moth.jpg	hruk_9	hruk_9@gmail.com	hruk_9pswd
10	zirkul	http://localhost:3000/uploads/2b-arch-wallpaper-no-text.png	zirkul_10	zirkul_10@gmail.com	zirkul_10pswd
11	bambam	http://localhost:3000/uploads/spider.jpg	bambam_11	bambam_11@gmail.com	bambam_11pswd
12	bombom	http://localhost:3000/uploads/woman.jpg	bombom_12	bombom_12@gmail.com	bombom_12pswd
13	adam	http://localhost:3000/uploads/deer.jpg	adam_13	adam_13@gmail.com	adam_13pswd
14	spatko	\N	spatko	spatko@gmail.com	$2b$10$nSzi5EeplES/7/QfBkHd7u5mmTZD.SGRb/9bysL9ErfZfMbZzfgBC
16	spatko2	\N	spatko2	spatko2@gmail.com	$2b$10$GoThLL/yPyO2NhvCdt3QgOt0CcCpkpEz8tc6oY5BTAsq1MFXF7UZi
17	Hruben	\N	hruben	hruben@gmail.com	$2b$10$OaRk5F7KxogFZUMDK6bbmemmseAa18XerTQq7oi/W.hUrQ1CRwNUO
18	Viva	\N	vivagmail	viva@gmail.com	$2b$10$vr/pMoH7FjOBhDlajkSM9uKsd71bQdVkAAnQWLifI/bij2W7DLvgy
20	Markiian Shpak	\N	shpakmark	shpakmark@gmail.com	$2b$10$2MsPmKwM35CR5MRzvVKAR.T/tUCS1RxxNJ/4HyxlLxG6NIyUCWk0q
19	Maru	http://localhost:3000/uploads/catowl4.png	maru	maru@gmail.com	$2b$10$ZKB/nXhJ1kC6qK/3YQJ9BurFMO7.m5D/BTZHzZUPs0WD0T98SwOh6
22	Svin	\N	svinn	svinn@gmail.com	$2b$10$jCFGVPc7BXEWdAa5vtxeTOGoHNeKjGLdECHX5vJQ9IYePKewDBhRa
23	rum	\N	rum	rum@gmail.com	$2b$10$oFJCtEjJkxZMHX1LAzZPVei.fxax2aQpXUSb.qa1XJQt91wxxEiOO
\.


--
-- Data for Name: auction; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.auction (id, image, author_id, title, description, start_time, end_time, starting_bid, min_bid_step, is_autobuy, autobuy_price, is_open, winner_id) FROM stdin;
35	http://localhost:3000/uploads/1761666638877-Image (1).jpg	19	Cool paper	really cool paper	2025-10-28 15:50:38.931+00	2025-10-31 15:50:38.931+00	10	1	t	30	f	\N
11	http://localhost:3000/uploads/goatskull.png	19	skull	hahaha	2025-11-01 10:00:00+00	2025-11-13 10:00:00+00	7	1	f	\N	t	\N
12	http://localhost:3000/uploads/goatskull.png	19	skull	hahaha	2025-11-01 10:00:00+00	2025-11-13 10:00:00+00	7	1	f	\N	t	\N
4	http://localhost:3000/uploads/goatskull.png	2	Goat Skull Auction	A rare goat skull from the mountains	2025-09-01 10:00:00+00	2025-09-15 10:00:00+00	\N	\N	f	\N	f	\N
5	http://localhost:3000/uploads/moth.jpg	3	Moth Wings Collection	Beautiful intricately patterned moth wings	2025-09-03 12:00:00+00	2025-09-20 12:00:00+00	\N	\N	f	\N	f	\N
6	http://localhost:3000/uploads/2b-arch-wallpaper-no-text.png	4	2B Arch Wallpaper	High resolution wallpaper inspired by 2B from Nier	2025-08-25 09:00:00+00	2025-09-30 09:00:00+00	\N	\N	f	\N	f	\N
7	http://localhost:3000/uploads/spider.jpg	5	Spider Sculpture	Handmade spider sculpture in metal	2025-09-05 14:00:00+00	2025-09-25 14:00:00+00	\N	\N	f	\N	f	22
8	http://localhost:3000/uploads/woman.jpg	6	Portrait Painting	Oil painting portrait of a woman	2025-09-07 16:00:00+00	2025-09-22 16:00:00+00	\N	\N	f	\N	f	22
9	http://localhost:3000/uploads/deer.jpg	7	Deer in Forest	Photograph of deer in a forest setting	2025-09-10 08:00:00+00	2025-09-24 08:00:00+00	\N	\N	f	\N	f	\N
3	http://localhost:3000/uploads/goatskull.png	1	something	he told something	2023-07-04 12:05:33+00	2025-09-20 23:00:00+00	\N	\N	f	\N	f	\N
32	http://localhost:3000/uploads/1761318850041-skull-wallpaper.png	19	skull	it's a skull	2025-10-24 15:14:10.085+00	2025-10-27 16:14:10.085+00	15	1	t	49	f	\N
33	http://localhost:3000/uploads/1761330403482-wallpaperflare.com_wallpaper(18).jpg	19	nito nito		2025-10-24 18:26:43.485+00	2025-10-25 18:26:43.485+00	10	1	f	0	f	\N
34	http://localhost:3000/uploads/1761650499560-Image.jpg	19	asd	sadas	2025-10-28 11:21:39.834+00	2025-10-29 11:21:39.834+00	8	1	f	0	f	\N
36	http://localhost:3000/uploads/1761935332854-cosmos.jpg	19	blackhole	a big blackhole	2025-10-31 18:28:52.863+00	2025-11-03 18:28:52.863+00	5	1	f	0	f	\N
37	http://localhost:3000/uploads/1761941521352-2b-arch-wallpaper-no-text.png	19	sdf	sdfsfsdfsf	2025-10-31 20:12:01.363+00	2025-11-01 20:12:01.363+00	4	1	f	0	f	22
38	http://localhost:3000/uploads/1762689406675-wallpaperflare.com_wallpaper(29).jpg	22	aaa	aaaaaaaaaaaaaaaa	2025-11-09 11:56:46.685+00	2025-11-10 11:56:46.685+00	5	1	f	0	t	\N
39	http://localhost:3000/uploads/1762706806916-wp11906362-hollow-knight-pc-wallpapers.jpg	23	Something cool	A desc	2025-11-09 16:46:46.922+00	2025-11-09 16:48:46.922+00	15	2	f	0	f	22
\.


--
-- Data for Name: bid; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.bid (id, auction_id, account_id, price, bid_time) FROM stdin;
1	37	8	25	2025-11-01 17:41:38.425299+00
2	37	9	30	2025-11-01 17:41:50.625475+00
3	37	12	40	2025-11-01 17:41:56.275449+00
4	37	3	55	2025-11-04 11:17:10.330404+00
5	37	19	99	2025-11-04 11:25:04.76895+00
8	7	22	55	2025-11-04 11:37:22.027607+00
10	8	22	44	2025-11-04 11:41:38.674352+00
11	8	22	55	2025-11-04 11:42:49.55936+00
12	37	22	100	2025-11-06 12:56:43.706558+00
13	38	22	5	2025-11-09 11:56:58.788119+00
14	38	22	6	2025-11-09 13:54:12.372989+00
15	38	22	6	2025-11-09 16:23:31.516579+00
16	39	19	16	2025-11-09 16:47:15.178415+00
17	39	22	19	2025-11-09 16:47:41.324002+00
18	39	23	20	2025-11-09 18:38:15.479213+00
19	39	23	21	2025-11-09 18:40:20.709076+00
20	39	23	22	2025-11-09 18:40:44.187559+00
21	39	23	23	2025-11-09 18:42:52.23904+00
\.


--
-- Name: account_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.account_id_seq', 23, true);


--
-- Name: auction_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.auction_id_seq', 39, true);


--
-- Name: bid_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.bid_id_seq', 21, true);


--
-- Name: account account_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.account
    ADD CONSTRAINT account_email_key UNIQUE (email);


--
-- Name: account account_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.account
    ADD CONSTRAINT account_pkey PRIMARY KEY (id);


--
-- Name: account account_username_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.account
    ADD CONSTRAINT account_username_key UNIQUE (username);


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
-- Name: bid fk_account; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bid
    ADD CONSTRAINT fk_account FOREIGN KEY (account_id) REFERENCES public.account(id) ON DELETE RESTRICT;


--
-- Name: auction fk_account; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auction
    ADD CONSTRAINT fk_account FOREIGN KEY (author_id) REFERENCES public.account(id) ON DELETE CASCADE;


--
-- Name: bid fk_auction; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bid
    ADD CONSTRAINT fk_auction FOREIGN KEY (auction_id) REFERENCES public.auction(id) ON DELETE CASCADE;


--
-- Name: auction fk_winner; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auction
    ADD CONSTRAINT fk_winner FOREIGN KEY (winner_id) REFERENCES public.account(id) ON DELETE SET NULL;


--
-- PostgreSQL database dump complete
--

\unrestrict K9atpbQWMRPSSVhXMrwz34rcYq8yJMsiiylQBWLc5puIpJJ8xA3NGRq0OeuIlLS

