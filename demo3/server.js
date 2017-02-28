const express = require("express");
const path = require("path");
const fs = require("fs");
const exec = require('child_process').exec;

const PORT = process.env.PORT || 8081;

const app = express();
const rootDir = path.resolve(path.join(__dirname, 'dist'));
const publicDir = path.resolve(path.join(__dirname, 'public'));

function execPhp() {
    return new Promise((resolve, reject)=> {
        exec(`php -f index.php`, (err, stdout)=>
            err ? reject(err) : resolve(stdout)
        );
    });
}


app.get("/", function(req, res) {
    execPhp().then(
        (data)=> res.send(data),
        (err)=> res.status(500).send(err)
    );
});
app.use(express.static(rootDir));
app.use(express.static(publicDir));

app.listen(PORT, function () {
  /* eslint no-console: 0 */
  console.log(`Application server started at http://localhost:${PORT}`);
});
