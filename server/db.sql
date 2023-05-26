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