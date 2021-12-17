create table t_book
(
    id       uuid              not null
        primary key,
    image    varchar(255),
    isbn     varchar(255)      not null,
    language varchar(255)      not null,
    press    varchar(255),
    price    numeric(19, 2)    not null,
    title    varchar(255)      not null,
    count    integer default 1 not null
);

alter table t_book
    owner to root;

create table t_author
(
    id      uuid         not null
        primary key,
    country varchar(255),
    name    varchar(255) not null,
    role    varchar(255) not null,
    book_id uuid
        constraint fkl6ruskguqw74hf5tk461tj844
        references t_book
);

alter table t_author
    owner to root;

create table t_category
(
    id      uuid         not null
        primary key,
    name    varchar(255) not null,
    book_id uuid
        constraint fklsgp594v03khg4e9l6mnc6wjp
        references t_book
);

alter table t_category
    owner to root;

create table t_user
(
    id       uuid         not null
        primary key,
    password varchar(255) not null,
    role     integer      not null,
    username varchar(255) not null
        constraint uk_jhib4legehrm4yscx9t3lirqi
        unique
);

alter table t_user
    owner to root;

create table t_order
(
    id           uuid               not null
        constraint order_pk
        primary key,
    time         date default now() not null,
    number       integer            not null,
    target_place varchar(255)       not null,
    book_id      uuid               not null
        constraint order_t_book_id_fk
        references t_book
        on update cascade on delete cascade,
    user_id      uuid               not null
        constraint order_t_user_id_fk
        references t_user
        on update cascade on delete cascade,
    credit_card  varchar(32)        not null
);

alter table t_order
    owner to root;

create unique index order_id_uindex
    on t_order (id);

