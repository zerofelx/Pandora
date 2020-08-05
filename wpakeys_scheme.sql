create table wpa_keys (
    ID integer not null AUTO_INCREMENT,
    ESSID varchar(40) not null,
    BSSID char(17) not null,
    psw1 varchar(30) not null,
    psw2 varchar(30) not null,
    model varchar(30),
    primary key(ID)
);

create table pwneds_admin (
    ID integer not null AUTO_INCREMENT,
    username varchar(30) not null,
    psw varchar(50) not null,
    primary key(ID)
)