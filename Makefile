all: run_docker
run_docker: build_docker
	docker run -p 8000:4000 -p 22:22 real:database
build_docker: 
	@docker build -t real:database .
