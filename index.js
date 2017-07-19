'use strict';

const Args = require('./src/args');

module.exports = function(options) {
    let input = options.input;
    let output = options.output;
    let watch = options.watch;
    let css = options.css;
    let template = options.template;
    let title = options.title;

    if(!input) throw new Error('请输入markdown文件路径');

    let args = [input];
    if(css) args.push('-c', css);
    if(watch) args.push('-w');
    if(output) args.push('-o', output);
    if(template) args.push('-T', template);
    if(title) args.push('-t', title);

    new Args(args);
}