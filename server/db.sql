
-- download extension
create table customer (
    customer_id uuid primary key default uuid_generate_v4(),
    customer_name varchar(255) not null,
    customer_email varchar(255) not null,
    customer_password varchar(255) not null
)