#!/usr/bin/env bash
rm -rf ./target

babel ./index.js --out-dir ./target/ --copy-files
babel ./application/api --out-dir ./target/application/api --copy-files
babel ./application/index.js --out-dir ./target/ --copy-files
babel ./migrations --out-dir ./target/migrations --copy-files
babel ./modules --out-dir ./target/modules --copy-files
babel ./scripts --out-dir ./target/scripts --copy-files

cp -r ./application/static ./target/application/static
cp -r ./migrations/sqls ./target/migrations/sqls
cp ./package.json ./target/package.json

NODE_ENV=production ./node_modules/.bin/webpack -p --config ./target/modules/config/data/common/webpack.js