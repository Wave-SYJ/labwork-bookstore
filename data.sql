INSERT INTO t_user(id, password, role, username)
VALUES (gen_random_uuid(), '$2a$10$ST6RV0W1ZOiF/CZT6yzS4u0yVqzGDCPiOTOD4zCqDIT7QBvzHyAvu', 1, 'admin');

INSERT INTO t_language(id, name)
VALUES (gen_random_uuid(), '中文'),
       (gen_random_uuid(), '英文'),
       (gen_random_uuid(), '法文'),
       (gen_random_uuid(), '德文'),
       (gen_random_uuid(), '日文'),
       (gen_random_uuid(), '葡萄牙文'),
       (gen_random_uuid(), '西班牙文'),
       (gen_random_uuid(), '阿拉伯文'),
       (gen_random_uuid(), '韩文');