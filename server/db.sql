-- run the contents of this file to create the required databases,tables and types;

-- login from command prompt
-- note: this may not work , you have to add path to environment and/or system variables to make it work (google this)
--login command
psql -U postgress
-- will ask for password , enter password

-- create the database 
create database dbmsproject

--move into database
\c dbmsproject

-- can use
\x ON
-- for pretty printing output in cmd line

-- view all tables in database
SELECT table_name
FROM information_schema.tables
WHERE table_type = 'BASE TABLE'
  AND table_schema = 'public'
  -- table_catalog = {current database name in single quotes}
  AND table_catalog = 'dbmsproject';



-- DDL COMMANDS
-- create composite address type
create type address as (
    street_address varchar(255),
    city varchar(255)
);


-- customer table
create table customer (
    customer_id uuid primary key default uuid_generate_v4(),
    customer_name varchar(255) not null,
    customer_email varchar(255) not null,
    customer_password varchar(255) not null,
    customer_address address
);

-- seller table
create table seller (
    seller_id uuid primary key default uuid_generate_v4(),
    seller_name varchar(255) not null,
    seller_email varchar(255) not null,
    seller_password varchar(255) not null,
    seller_isVerified boolean default false
);

-- contact info type
create type contact_info as (
    email varchar(255),
    phone varchar(255)
);

-- store table
create table store (
    store_id uuid primary key default uuid_generate_v4(),
    store_name varchar(255) not null,
    store_address address not null,
    store_contact contact_info not null,
    store_isVerified boolean default false,
    store_seller_id uuid not null,
    foreign key(store_seller_id) references seller(seller_id)
);

-- generic medicine table
create table generic_medicine(
    generic_medicine_id uuid primary key default uuid_generate_v4(),
    generic_medicine_name varchar(255) not null,
    generic_medicine_main_inegredient varchar(255),
    generic_medicine_side_effects varchar(600)[]
);

-- manufacturer table
create table manufacturer(
    manufacturer_id uuid primary key default uuid_generate_v4(),
    manufacturer_name varchar(400) not null,
    manufacturer_contact contact_info not null
);

-- brand medicine table
create table brand_medicine(
    brand_medicine_id uuid primary key default uuid_generate_v4(),
    brand_medicine_name varchar(500) not null,
    brandgeneric_medicine_id uuid not null,
    brandmanufacturer_id uuid not null,
    medication_type varchar(255) not null,
    dosage varchar(255) not null,
    price_per_unit numeric(10,6) default 0,
    foreign key(brandmanufacturer_id) references manufacturer(manufacturer_id),
    foreign key(brandgeneric_medicine_id) references brand_medicine(brand_medicine_id)
);




