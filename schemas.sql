create table PUBLIC_NOTICE
(
    id               int auto_increment primary key,
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

create table APPLICATION_STATUS
(
    id                        int auto_increment primary key,
    created_at                timestamp(6) default CURRENT_TIMESTAMP(6) not null,
    updated_at                timestamp(6) default CURRENT_TIMESTAMP(6) not null,
    application_number        varchar(255)                              not null,
    status                    varchar(255)                              not null,
    final_value               tinyint                                   not null
);


create table czech_dictionary
(
    id            int auto_increment primary key,
    original      varchar(100) not null,
    transcription varchar(100) null,
    translated    varchar(100) not null,
    category      varchar(20)  not null,
    type          varchar(20)  not null
);


