drop table patient

create table city(
cityid serial primary key,
cityname varchar(20)
);

create table speciality(
specialityid serial primary key,
specialityname varchar(20)
);

create table patient(
patientid serial primary key,
patientfirstname varchar(20),
patientlastname varchar(20),
cityid int references city(cityid) on delete cascade
);

create table doctor(
doctorid serial primary key,
doctorfirstname varchar(20),
doctorfamilyname varchar(20),
specialityid int references speciality(specialityid) on delete cascade,
cityid int references city(cityid) on delete cascade
);

create table patient_doctor(
patientid int references patient(patientid) on delete cascade,
doctorid int references doctor(doctorid) on delete cascade,
primary key (patientid, doctorid)
);

insert into city(cityname) values('Sour');
insert into speciality(specialityname) values('Cardiology');
insert into patient(patientfirstname, patientlastname,cityid) values('Marilyn','Hig',5);
insert into doctor(doctorfirstname,doctorfamilyname, specialityid, cityid) values('Lyla', 'Neal', 5, 5);
insert into patient_doctor(patientid, doctorid) values(5,5);

select * from speciality;
select * from city;
select * from doctor;
select * from patient;
select * from patient_doctor;

