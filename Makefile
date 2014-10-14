# I tend to keep project bash commands I use often in Makefiles for quick 
# autocompletion and to not forget, feel free to extent/change at will.

build: clean
	@grunt build

run_mock: build
	@chromium-browser --incognito dist/demo-ui.html

run_testnet: build
	@chromium-browser --incognito dist/demo-eng.html

run_mainnet: build
	# TODO

clean:
	@rm -rf build
	@rm -rf dist

install_modules:
	@npm install

uninstall_modules:
	@rm -rf node_modules

list_wallets:
	@cat testwallets.txt
