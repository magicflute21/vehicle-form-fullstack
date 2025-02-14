--
-- PostgreSQL database dump
--

-- Dumped from database version 17.2
-- Dumped by pg_dump version 17.2

-- Started on 2025-02-14 17:21:27

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
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
-- TOC entry 218 (class 1259 OID 16688)
-- Name: car_models; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.car_models (
    id bigint NOT NULL,
    series_id bigint,
    name character varying(255)
);


ALTER TABLE public.car_models OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 16687)
-- Name: car_models_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.car_models ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.car_models_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 220 (class 1259 OID 16694)
-- Name: manufacturers; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.manufacturers (
    id bigint NOT NULL,
    name character varying(255)
);


ALTER TABLE public.manufacturers OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 16693)
-- Name: manufacturers_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.manufacturers ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.manufacturers_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 222 (class 1259 OID 16700)
-- Name: series; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.series (
    id bigint NOT NULL,
    manufacturer_id bigint,
    name character varying(255)
);


ALTER TABLE public.series OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 16699)
-- Name: series_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.series ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.series_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 4859 (class 0 OID 16688)
-- Dependencies: 218
-- Data for Name: car_models; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.car_models (id, series_id, name) FROM stdin;
1	1	C 160
2	1	C 180
3	1	C 200
4	1	C 220
5	2	315
6	2	316
7	2	317
8	2	318
9	2	319
10	4	518
11	4	520
12	4	523
13	4	524
14	4	525
15	7	Q2
16	7	Q3
17	7	Q4
18	7	Q5
19	7	Q7
20	8	RS4
21	8	RS5
22	8	RS6
\.


--
-- TOC entry 4861 (class 0 OID 16694)
-- Dependencies: 220
-- Data for Name: manufacturers; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.manufacturers (id, name) FROM stdin;
1	Mercedes-Benz
2	BMW
3	Audi
4	Citroën
5	Muu
\.


--
-- TOC entry 4863 (class 0 OID 16700)
-- Dependencies: 222
-- Data for Name: series; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.series (id, manufacturer_id, name) FROM stdin;
1	1	C klass
2	2	3 seeria
3	2	4 seeria
4	2	5 seeria
5	3	A seeria
6	3	e-tron
7	3	Q seeria
8	3	RS seeria
9	3	TT
\.


--
-- TOC entry 4869 (class 0 OID 0)
-- Dependencies: 217
-- Name: car_models_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.car_models_id_seq', 22, true);


--
-- TOC entry 4870 (class 0 OID 0)
-- Dependencies: 219
-- Name: manufacturers_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.manufacturers_id_seq', 5, true);


--
-- TOC entry 4871 (class 0 OID 0)
-- Dependencies: 221
-- Name: series_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.series_id_seq', 9, true);


--
-- TOC entry 4706 (class 2606 OID 16692)
-- Name: car_models car_models_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.car_models
    ADD CONSTRAINT car_models_pkey PRIMARY KEY (id);


--
-- TOC entry 4708 (class 2606 OID 16698)
-- Name: manufacturers manufacturers_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.manufacturers
    ADD CONSTRAINT manufacturers_pkey PRIMARY KEY (id);


--
-- TOC entry 4710 (class 2606 OID 16704)
-- Name: series series_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.series
    ADD CONSTRAINT series_pkey PRIMARY KEY (id);


--
-- TOC entry 4712 (class 2606 OID 16710)
-- Name: series fk4ab75xjxw5xhxh2aidklx2vom; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.series
    ADD CONSTRAINT fk4ab75xjxw5xhxh2aidklx2vom FOREIGN KEY (manufacturer_id) REFERENCES public.manufacturers(id);


--
-- TOC entry 4711 (class 2606 OID 16705)
-- Name: car_models fklde9xdmljx1mwjyanii8ius65; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.car_models
    ADD CONSTRAINT fklde9xdmljx1mwjyanii8ius65 FOREIGN KEY (series_id) REFERENCES public.series(id);


-- Completed on 2025-02-14 17:21:27

--
-- PostgreSQL database dump complete
--

