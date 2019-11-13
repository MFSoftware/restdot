#! /usr/bin/env node

const fs = require('fs');

const { 
    createDirTree,
    exists,
    makeDir
} = require('../src/fs');

const Converter = require('../src/processor');

let inputDir = '', outputDir = '';
let tpl = '<%=content%>';

if (exists('.restdot')) {
    const config = JSON.parse(fs.readFileSync('.restdot', 'utf8'));

    inputDir = config.inputDir || 'docs';
    outputDir = config.outputDir || 'build/docs';

    if (!exists(outputDir)) { // Create output dir if not exists
        let tmp = '';
        outputDir.substr(2).split('/').forEach(sf => {
            tmp += sf + '/';
            makeDir(tmp);
        });
    }

    createDirTree(inputDir).forEach(element => {
        if (element.type == 'file' && element.name.endsWith('.md')) // Check if element is file with MD extention
            Converter.convert(element, tpl, outputDir);
        else {
            let subElements = element.elements;
            subElements.forEach(sub => {
                if (sub.type === 'file' && sub.name.endsWith('.md')) {
                    let di = sub.path.replace(inputDir, '');
                    di = `${outputDir}/${di}`;

                    if (!exists(di)) makeDir(di);

                    Converter.convert(sub, tpl, di);
                }
            });
        }
    });
}