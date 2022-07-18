/**
 * Prepares for the build in the GitHub Actions environment.
 */

const fs = require('fs');

function updateFile(filename, replacements) {
    return new Promise(function(resolve) {
        fs.readFile(filename, 'utf-8', function(err, data) {
            var regex, replaceStr;
            if (err) {
                throw (err);
            } else {
                regex = new RegExp("(\\" + 'let' + "\\s* ]*" + replacements[0].rule + "\\s*=\\s*)([^\\n;}]+)([\\s*;}])");
                    replaceStr = "$1" + replacements[0].replacer + "$3";
                    data = data.replace(regex, replaceStr);

            }
            fs.writeFile(filename, data, 'utf-8', function(err) {

                if (err) {
                    throw (err);
                } else {
                    resolve();
                }
            });
        });
    })
}

updateFile("canvas-controller.js", [{
    rule: 'DETA_KEY',
    replacer: process.env.DEEZ_NUTS
}], function (err) {
    console.log(err);
});