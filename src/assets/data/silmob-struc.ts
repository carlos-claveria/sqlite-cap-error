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


`;
