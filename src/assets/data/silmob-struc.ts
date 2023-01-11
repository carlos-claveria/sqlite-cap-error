export const silMobStruc = `
PRAGMA foreign_keys = off;
BEGIN TRANSACTION;

DROP TABLE IF EXISTS config;

CREATE TABLE config (
    clave VARCHAR (30)  PRIMARY KEY,
    tipo  CHAR (1)      DEFAULT 'S',
    valor VARCHAR (128),
    descripcion VARCHAR (255)
)
WITHOUT ROWID;


DROP TABLE IF EXISTS fotos;

CREATE TABLE fotos (
    idco    INTEGER       NOT NULL,
    modo    CHAR (1)      NOT NULL,
    foto    VARCHAR (255) NOT NULL,
    parte   INTEGER,
    finsert INTEGER
);


DROP TABLE IF EXISTS historicos;

CREATE TABLE historicos (
    idco       INTEGER      NOT NULL,
    emision    CHAR (7)     NOT NULL,
    lanterior  INTEGER      NOT NULL,
    lactual    INTEGER      NOT NULL,
    consumo    INTEGER      NOT NULL,
    incidencia INTEGER      NOT NULL,
    contador   VARCHAR (30),
    PRIMARY KEY (
        idco,
        emision
    )
)
WITHOUT ROWID;


DROP TABLE IF EXISTS incidencias;

CREATE TABLE incidencias (
    cincid     INTEGER      PRIMARY KEY
                            NOT NULL,
    incidencia VARCHAR (50) NOT NULL
);


DROP TABLE IF EXISTS lecturas;

CREATE TABLE lecturas (
    idco       INTEGER      NOT NULL
                            PRIMARY KEY,
    cpobla     INTEGER      NOT NULL,
    ano        INTEGER      NOT NULL,
    periodo    INTEGER      NOT NULL,
    bloque     INTEGER      NOT NULL,
    ruta       INTEGER      NOT NULL,
    orden      INTEGER      NOT NULL,
    poliza     VARCHAR (30) NOT NULL
                            DEFAULT '',
    abonado    VARCHAR (60) NOT NULL
                            DEFAULT '',
    direccion  VARCHAR (60) NOT NULL
                            DEFAULT '',
    adicional  VARCHAR (60) DEFAULT '',
    nota       TEXT         DEFAULT '',
    contador   VARCHAR (30) DEFAULT '',
    calibre    INTEGER      DEFAULT 0,
    lat        REAL         DEFAULT NULL,
    lon        REAL         DEFAULT NULL,
    lecnuevo   INTEGER      DEFAULT NULL,
    contnuevo  VARCHAR (30) DEFAULT NULL,
    precinto   VARCHAR (30) DEFAULT NULL,
    numparte   VARCHAR (30) DEFAULT NULL,
    lanterior  INTEGER      DEFAULT NULL,
    lactual    INTEGER      DEFAULT NULL,
    incidencia INTEGER      DEFAULT NULL,
    consumo    INTEGER      DEFAULT NULL,
    media      INTEGER      DEFAULT NULL,
    finsert    INTEGER,
    fupdate    INTEGER,
    estado     CHAR (1)     DEFAULT 'P',
    updcount   INTEGER      DEFAULT 0 
)
WITHOUT ROWID;


DROP TRIGGER IF EXISTS lecturas_finsert;
CREATE TRIGGER lecturas_finsert
         AFTER UPDATE OF lanterior,
                         lactual,
                         incidencia
            ON lecturas
      FOR EACH ROW
          WHEN NEW.finsert IS NULL
BEGIN
    UPDATE lecturas
       SET finsert = strftime('%s', 'now') 
     WHERE idco = old.idco;
END;


DROP TRIGGER IF EXISTS lecturas_fupdate;
CREATE TRIGGER lecturas_fupdate
         AFTER UPDATE OF lanterior,
                         lactual,
                         incidencia
            ON lecturas
      FOR EACH ROW
BEGIN
    UPDATE lecturas
       SET fupdate = strftime('%s', 'now'),
           updcount = updcount + 1
     WHERE idco = OLD.idco;
END;

COMMIT TRANSACTION;
PRAGMA foreign_keys = on;
`;