install:
	npm ci

build:
	rm -rf dist
	NODE_ENV=production npx webpack

lint:
	npx eslint .

lint-fix:	
	npx eslint --fix .

develop:
	npx webpack serve 