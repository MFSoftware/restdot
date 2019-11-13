const fs = require('fs');

function scanDir(inputDir) {
    fs.readdir(inputDir, (err, elements) => {
        if (err) throw err;

        return elements;
    });
}

function readFile(path) {
    return fs.readFileSync(path, 'utf8');
}

function exists(path) {
    return fs.existsSync(path);
}

function isDirectory(path) {
    return fs.lstatSync(path).isDirectory();
}

function changeExtention(str, ext) {
    return str.substr(0, str.lastIndexOf('.')) + ext;
}

function createDirTree(path) {
    let tree = [];

    fs.readdirSync(path).forEach(element => {
        let p = `${path}/${element}`;

        if (isDirectory(p))
            tree.push({ type: 'dir', path, elements: createDirTree(p), name: element });
        else tree.push({ type: 'file', path, name: element });
    });

    return tree;
}

function makeDir(path) {
    fs.mkdirSync(path);
}

module.exports = { isDirectory, exists, readFile, scanDir, changeExtention, createDirTree, makeDir };