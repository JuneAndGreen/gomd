'use strict';

const Args = require('./src/args');

module.exports = function(options) {
    let input = options.input;
    let output = options.output;
    let watch = options.watch;
    let css = options.css;

    if(!input) throw new Error('请输入markdown文件路径');

    let args = [input];
    if(css) args.push('-c', css);
    if(watch) args.push('-w');
    if(output) args.push('-o', output);

    new Args(args);
}