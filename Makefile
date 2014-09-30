# I tend to keep project bash commands I use often in Makefiles for quick 
# autocompletion and to not forget, feel free to extent/change at will.

run:
	chromium-browser --incognito dist/demo-eng.html

clean:
	rm -rf build
	rm -rf dist

build: clean
	grunt build

install_modules:
	npm install

uninstall_modules:
	rm -rf node_modules

