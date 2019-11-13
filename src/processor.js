const fs = require('fs');
const marked = require('marked');
const _ = require('lodash');

const { 
    changeExtention,
    readFile
} = require('./fs');

class Converter {
    constructor() {

    }

    static convert(element, tpl, outputDir) {
        let path = element.path;
        let name = element.name;

        let data = readFile(`${path}/${name}`);
        path = changeExtention(`${outputDir}/${name}`, '.html');

            fs.writeFile(path, _.template(tpl)({
                content: marked(data)
            }), err => {
                if (err) throw err;
                    
                console.log("The file was saved!");
            });
    }
}

module.exports = Converter;