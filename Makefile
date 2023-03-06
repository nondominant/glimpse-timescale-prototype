all: run_docker
run_docker: build_docker
	docker run -p 8000:4000 -p 23:22 real:database2
build_docker: 
	@docker build -t real:database2 .
