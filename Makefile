all:
	echo hello, this is makefile 

build:
	docker-compose build
	
rights:

down:
	docker-compose down
up:
	docker-compose up -d

restart: down up	

init: rights build

rebuild: down db-rights build
