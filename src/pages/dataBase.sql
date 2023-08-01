-- Setup

-- Assume DB = postgresql

-- Given the table:

CREATE TABLE something
(
    id uuid NOT NULL,
    name  CHARACTER VARYING(255) NOT NULL,
    email CHARACTER VARYING(255) NOT NULL,
    phone CHARACTER VARYING(255),
    birthday DATE,
    age INTEGER
);

-- create a trigger/function which will calculate the age on insert or modify given the birthday
CREATE OR REPLACE FUNCTION update_age()
RETURNS TRIGGER AS
$$
BEGIN
    NEW.age := DATE_PART('year', CURRENT_DATE) - DATE_PART('year', NEW.birthday);
    RETURN NEW;
END;
$$
LANGUAGE plpgsql;

CREATE TRIGGER update_age_trigger
BEFORE INSERT OR UPDATE ON something
FOR EACH ROW
EXECUTE FUNCTION update_age();