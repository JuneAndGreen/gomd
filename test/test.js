'use strict';

const path = require('path');
const gomd = require('../index');

const mdPath = path.join(__dirname, './test.md');
const cssPath = path.join(__dirname, './test.css');
const outputPath = path.join(__dirname, './my.html');
const templatePath = path.join(__dirname, './template.html');

gomd({
    input: mdPath,
    output: outputPath,
    css: cssPath,
    watch: true,
    title: 'test',
    template: templatePath,
});