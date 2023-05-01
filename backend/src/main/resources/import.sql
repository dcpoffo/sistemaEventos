-- para o ORACLE: ZERA OS AUTOINCREMENTOS 
alter table participante MODIFY(id generated as identity (start with 1));
alter table event MODIFY(id generated as identity (start with 1));
alter table event_review MODIFY(id generated as identity (start with 1));
alter table ROLE MODIFY(id generated as identity (start with 1));

INSERT INTO ROLE (ROLE) values ('ROLE_ADMIN');
INSERT INTO ROLE (ROLE) values ('ROLE_ACADEMICO');
INSERT INTO ROLE (ROLE) values ('ROLE_ORGANIZADOR');

INSERT INTO FILE_DATA(NAME, TYPE, FILE_PATH) VALUES ('profile.png', 'png', 'D:\SISTEMAS\React\Evento\images\1\diego.png');
INSERT INTO FILE_DATA(NAME, TYPE, FILE_PATH) VALUES ('profile.png', 'png', 'D:\SISTEMAS\React\Evento\images\2\maryane.png');
INSERT INTO FILE_DATA(NAME, TYPE, FILE_PATH) VALUES ('profile.png', 'png', 'D:\SISTEMAS\React\Evento\images\3\arthur.png');
INSERT INTO FILE_DATA(NAME, TYPE, FILE_PATH) VALUES ('profile.png', 'png', 'D:\SISTEMAS\React\Evento\images\4\saulo.png');
INSERT INTO FILE_DATA(NAME, TYPE, FILE_PATH) VALUES ('profile.png', 'png', 'D:\SISTEMAS\React\Evento\images\5\darlan.png');


insert into participante (name, email, tipo, password, PROFILE_IMAGE_ID) values ('Diego','diego@gmail.com','ACADEMICO','$2a$12$r2kzbWrMIFbl2.J9MAVtVOT83gFpdfz4BMjVlXrv6OdMc7dlvp9qW',1);
insert into participante_role (participante_id, role_id) values (1,2);

insert into participante (name, email, tipo, password,PROFILE_IMAGE_ID) values ('Maryane','maryanne@gmail.com','ACADEMICO','$2a$12$r2kzbWrMIFbl2.J9MAVtVOT83gFpdfz4BMjVlXrv6OdMc7dlvp9qW',2);
insert into participante_role (participante_id, role_id) values (2,2);

insert into participante (name, email, tipo, password,PROFILE_IMAGE_ID) values ('Arthur','arthur@gmail.com','ORGANIZADOR','$2a$12$r2kzbWrMIFbl2.J9MAVtVOT83gFpdfz4BMjVlXrv6OdMc7dlvp9qW',3);
insert into participante_role (participante_id, role_id) values (3,3);

insert into participante (name, email, tipo, password,PROFILE_IMAGE_ID) values ('Saulo','saulo@gmail.com','ORGANIZADOR','$2a$12$r2kzbWrMIFbl2.J9MAVtVOT83gFpdfz4BMjVlXrv6OdMc7dlvp9qW',4);
insert into participante_role (participante_id, role_id) values (4,3);

insert into participante (name, email, tipo, password,PROFILE_IMAGE_ID) values ('Darlan','dcpoffo@gmail.com','ORGANIZADOR','$2a$12$r2kzbWrMIFbl2.J9MAVtVOT83gFpdfz4BMjVlXrv6OdMc7dlvp9qW',5);
insert into participante_role (participante_id, role_id) values (5,1);

--(TO_DATE('2023-03-01', 'yyyy-mm-dd'))
-- insert into event (name, campus, start_Date, end_Date, details, folder, score) values ('Show do KISS','Hard Rock Live Florianopolis', TO_DATE('2023-04-28','yyyy-mm-dd'),TO_DATE('2023-04-28','yyyy-mm-dd'),'Show do KISS - Hard Rock Live Florianopolis', 'https://blackwaterviagens.com.br/wp-content/uploads/2023/01/kiss-turne.jpg', 0.0);
-- insert into event (name, campus, start_Date, end_Date, details, folder, score) values ('Show do Scorpions','Arena Petry - Florianopolis',TO_DATE('2023-09-28','yyyy-mm-dd'),TO_DATE('2023-09-28','yyyy-mm-dd'),'Show do SCORPIONS - Arena Petry ', 'https://www.makilacrowley.com.br/wp-content/uploads/ngg_featured/Cartaz_Excursoes_Scorpions_2019_Floripa_9375.jpg', 0.0);

-- insert into participantes_events (event_id, participante_id) values (1,1);
-- insert into participantes_events (event_id, participante_id) values (1,2);
-- insert into participantes_events (event_id, participante_id) values (1,3);
-- insert into participantes_events (event_id, participante_id) values (2,2);
-- insert into participantes_events (event_id, participante_id) values (2,3);

-- insert into event_review (text, rate_value, event_id, participante_id) values ('avaliação dia', 8, 1, 1);
-- insert into event_review (text, rate_value, event_id, participante_id) values ('avaliação dia 20/3', 7, 1, 2);
-- insert into event_review (text, rate_value, event_id, participante_id) values ('avaliação dia 20/3', 10, 1, 3);