create table vendors(
-- serial is like auto increment
vendorId serial primary key,
vendorName varchar(100),
vendorIsLocal boolean,
-- you could've used float. numeric(10,2) means there will be 8 numbers then comma then 2 numbers in decimal part
vendorCost numeric(10,2),
-- DOB: date of birth
vendorDOB date
)

-- Create
insert into vendors (vendorname, vendorislocal, vendorcost, vendordob)
values ('lili', true, 12.12, '2004-2-1');

-- Read
select * from vendors;

-- Update
update vendors set vendorname='meow' where vendorname='lili';

-- Delete
delete from vendors where vendorid=1;