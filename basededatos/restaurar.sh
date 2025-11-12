PGPASSWORD=123qwe dropdb -h localhost -p 5432 -U postgres sresbd
PGPASSWORD=123qwe createdb -h localhost -p 5432 -U postgres sresbd
PGPASSWORD=123qwe psql -h localhost -p 5432 -U postgres -d sresbd -f tablas.sql
PGPASSWORD=123qwe psql -h localhost -p 5432 -U postgres -d sresbd -f datos.sql