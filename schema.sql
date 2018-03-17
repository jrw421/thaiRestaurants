DROP DATABASE IF EXISTS orchard10;

CREATE DATABASE orchard10;

USE orchard10;

CREATE TABLE items (
  id int NOT NULL AUTO_INCREMENT,
  name varchar(500) NOT NULL,
  -- score varchar(500) NOT NULL,
  grade varchar(500) NOT NULL,
  cuisine varchar(500) NOT NULL,
  zipcode varchar(500) NOT NULL,
  PRIMARY KEY (ID)
);

CREATE TABLE zips (
  id int NOT NULL AUTO_INCREMENT,
  zipcode varchar(500) NOT NULL,
  count int NOT NULL,
  PRIMARY KEY (ID)
);
