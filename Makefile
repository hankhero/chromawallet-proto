# I tend to keep project bash commands I use often in Makefiles for quick 
# autocompletion and to not forget, feel free to extent/change at will.

run_mock:
	@chromium-browser --incognito dist/demo-ui.html

run_testnet:
	@chromium-browser --incognito dist/demo-eng.html

run_mainnet:
	# TODO

clean:
	@rm -rf build
	@rm -rf dist

build: clean
	@grunt build

install_modules:
	@npm install

uninstall_modules:
	@rm -rf node_modules

list_wallets:
	@cat testwallets.txt
