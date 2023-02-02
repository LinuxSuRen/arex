const process = require("child_process");

process.exec('wasm-pack build --out-dir ../arex-rs-pkg',{ cwd:'./packages/arex-rs' }, function(error, stdout, stderr) {
    console.log(stdout,stderr)
});