all: help

help: ## This List
	@echo "Available Make Commands"
	@echo "======================="
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m make %-10s\033[0m %s\n", $$1, $$2}'

build: ## transpile /src -> /lib
	yarn build

build-watch: ## watch /src then transpile /src -> /lib
	yarn build -- -w

test: ## runs the tests
	yarn test

test-watch: ## watch /src then runs the tests
	yarn test -- --watch
