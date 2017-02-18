'use strict';

const path = require('path');
const Args = require('../src/args');

const mdPath = path.join(__dirname, './test.md');
const cssPath = path.join(__dirname, './test.css');

new Args([mdPath, '-c', cssPath, '-w']);