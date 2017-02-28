var commonjs = require('./_commonjs');
var amd = require('./_amd');
import es6 from './_es6';

var ensurePromise = new Promise(function(resolve) { 
    require.ensure(['./_ensure'], function(require) {
        var data = require('./_ensure');
        resolve(data);
    });
});

const importStatic = import('./_import');

//const context = require.context('./', false, /(import|ensure)\.js$/);
//context.keys().forEach(key => context(key))

const moduleName = '_import';
const dynamicImport = import(`./${moduleName}`);


Promise.all([ensurePromise, importStatic, dynamicImport])
    .then(([ensure, importStatic, dynamicImport]) => {
        print(
            `Common JS:\t${commonjs}`,
            `AMD:\t\t${amd}`,
            `ES6 modules:\t${es6}`,
            `Ensure syntax:\t${ensure}`,
            `Import syntax:\t${importStatic.default}`,
            `Dynamic import:\t${dynamicImport.default}`
        );
    });

function print(...args) {
    const log = document.getElementById('log');
    log.innerHTML = args.join('\n');
}