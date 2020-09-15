create table public_notice
(
    id               int auto_increment
        primary key,
    created_at       timestamp(6) default CURRENT_TIMESTAMP(6) not null,
    updated_at       timestamp(6) default CURRENT_TIMESTAMP(6) not null,
    full_name        varchar(255)                              not null,
    notice_number    varchar(255)                              not null,
    valid            tinyint                                   not null,
    expired          tinyint                                   not null,
    first_name       varchar(255)                              null,
    last_name        varchar(255)                              null,
    other_last_name  varchar(255)                              null,
    other_first_name varchar(255)                              null,
    url              varchar(255)                              null
);

