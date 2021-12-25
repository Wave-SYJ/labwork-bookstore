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

INSERT INTO public.t_user (id, password, role, username) VALUES ('72274048-a4e6-4e46-be56-b1716b5971cf', '$2a$10$ST6RV0W1ZOiF/CZT6yzS4u0yVqzGDCPiOTOD4zCqDIT7QBvzHyAvu', 1, 'admin');

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

INSERT INTO public.t_book (id, image, isbn, language, press, price, title, count) VALUES ('6c6242db-63f0-48e3-976c-348e2a90d087', 'http://img3m3.ddimg.cn/44/1/29254643-1_u_12.jpg', '9787547732250', '中文', '北京日报出版社', 199.50, '罗马帝国衰亡史', 1);
INSERT INTO public.t_book (id, image, isbn, language, press, price, title, count) VALUES ('8256a675-3888-4d93-bb92-f628ec5d0f40', 'http://img3m5.ddimg.cn/91/24/29251225-2_u_3747.jpg', '9787114166082', '中文', '人民交通出版社', 34.40, '韩愈传', 1);
INSERT INTO public.t_book (id, image, isbn, language, press, price, title, count) VALUES ('34eaf7cf-f477-449a-9baf-5d59a8f89ef2', 'http://img3m8.ddimg.cn/70/0/28499398-1_w_3.jpg', '9787111635253', '中文', '机械工业出版社', 104.20, '系统分析与设计', 4);
INSERT INTO public.t_book (id, image, isbn, language, press, price, title, count) VALUES ('377917c5-e15e-4de5-948c-33b58aee1934', 'http://img3m0.ddimg.cn/88/28/23733160-1_b_9.jpg', '9787551123426', '中文', '花山文艺出版社', 11.70, '儒林外史', 1);
INSERT INTO public.t_book (id, image, isbn, language, press, price, title, count) VALUES ('c4be3e6f-a00c-4079-baaf-61136491984e', 'http://img3m7.ddimg.cn/36/29/25126137-1_w_9.jpg', '9787538754865', '中文', '时代文艺出版社', 33.60, '昆虫记', 5);
INSERT INTO public.t_book (id, image, isbn, language, press, price, title, count) VALUES ('e0bf8c9f-b274-4557-9342-d75fc7d2d160', 'http://img3m5.ddimg.cn/30/21/23828835-1_w_16.jpg', '9787533681661', '中文', '安徽教育出版社', 20.80, '水浒传', 9);


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

INSERT INTO public.t_category (id, name, book_id) VALUES ('9cfca071-304f-400d-a566-acb2ffa19ab2', '语文', 'c4be3e6f-a00c-4079-baaf-61136491984e');
INSERT INTO public.t_category (id, name, book_id) VALUES ('b99f5d1f-cd71-426d-818d-04371ba425e4', '科学', 'c4be3e6f-a00c-4079-baaf-61136491984e');
INSERT INTO public.t_category (id, name, book_id) VALUES ('b1e0e3bf-a604-450d-8285-d8962fe8fdb4', '童书', 'e0bf8c9f-b274-4557-9342-d75fc7d2d160');
INSERT INTO public.t_category (id, name, book_id) VALUES ('bf88ca15-ec07-463f-b145-c1c36e54aa57', '文学', 'e0bf8c9f-b274-4557-9342-d75fc7d2d160');
INSERT INTO public.t_category (id, name, book_id) VALUES ('f2ba25af-b97d-4a90-8f54-36cd38e7e53c', '语文', 'e0bf8c9f-b274-4557-9342-d75fc7d2d160');
INSERT INTO public.t_category (id, name, book_id) VALUES ('fc29cdd0-98ab-4a14-9660-d8c062e3c428', '小说', '377917c5-e15e-4de5-948c-33b58aee1934');
INSERT INTO public.t_category (id, name, book_id) VALUES ('f5f69259-9ebb-4068-8666-4db41e4cb26c', '文学', '377917c5-e15e-4de5-948c-33b58aee1934');
INSERT INTO public.t_category (id, name, book_id) VALUES ('c7caa028-35a4-4546-b230-7c696af3a1ae', '传记', '8256a675-3888-4d93-bb92-f628ec5d0f40');
INSERT INTO public.t_category (id, name, book_id) VALUES ('28999af2-cc16-436e-937a-c3edebadfe6f', '语文', '8256a675-3888-4d93-bb92-f628ec5d0f40');
INSERT INTO public.t_category (id, name, book_id) VALUES ('18eaf8fe-7922-42f6-bc14-865928dd289b', '历史', '6c6242db-63f0-48e3-976c-348e2a90d087');
INSERT INTO public.t_category (id, name, book_id) VALUES ('f48c1df2-2d87-47a2-b24d-8f71ba213fc1', '计算机', '34eaf7cf-f477-449a-9baf-5d59a8f89ef2');
INSERT INTO public.t_category (id, name, book_id) VALUES ('f5c79516-3f9e-4457-8df7-7ad69941ecc0', '网络', '34eaf7cf-f477-449a-9baf-5d59a8f89ef2');

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

INSERT INTO public.t_author (id, country, name, role, book_id) VALUES ('73d1170c-ecca-4106-b7a0-f90772da38ed', '法', '法布尔', '著', 'c4be3e6f-a00c-4079-baaf-61136491984e');
INSERT INTO public.t_author (id, country, name, role, book_id) VALUES ('37471808-e924-4bb4-b71e-d4bd404500a2', null, '陈筱卿', '译', 'c4be3e6f-a00c-4079-baaf-61136491984e');
INSERT INTO public.t_author (id, country, name, role, book_id) VALUES ('b6bf2107-42b2-4318-90b0-bd734ebb2f44', '明', '施耐庵', '著', 'e0bf8c9f-b274-4557-9342-d75fc7d2d160');
INSERT INTO public.t_author (id, country, name, role, book_id) VALUES ('72ee69e7-6609-4ca9-be48-d5dfd7024e58', '清', '吴敬梓', '著', '377917c5-e15e-4de5-948c-33b58aee1934');
INSERT INTO public.t_author (id, country, name, role, book_id) VALUES ('446a606c-b3d9-4478-8eca-95fb4fd3bf10', null, '王路', '著', '8256a675-3888-4d93-bb92-f628ec5d0f40');
INSERT INTO public.t_author (id, country, name, role, book_id) VALUES ('2432d05f-c089-47f3-8ec6-27ce068b2d4e', '英', '爱德华·吉本', '著', '6c6242db-63f0-48e3-976c-348e2a90d087');
INSERT INTO public.t_author (id, country, name, role, book_id) VALUES ('541bc411-adc8-41ab-9319-3221762cf778', null, '读客文化', '出品', '6c6242db-63f0-48e3-976c-348e2a90d087');
INSERT INTO public.t_author (id, country, name, role, book_id) VALUES ('f584d0e3-36e5-4640-b892-10b5c5cea0f2', '美', '肯尼斯·肯德尔', '著', '34eaf7cf-f477-449a-9baf-5d59a8f89ef2');

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

