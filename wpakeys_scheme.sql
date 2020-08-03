create table wpa_keys (
    ID integer not null AUTO_INCREMENT,
    ESSID varchar(40) not null,
    BSSID char(17) not null,
    psw1 varchar(30) not null,
    psw2 varchar(30) not null,
    primary key(ID)
);
