'use strict';

const path = require('path');

const Easycmd = require('easycmd');

const Previewer = require('./previewer');
const config = require('../package.json');


let cmdConfig = {
    version: config.version,
    help: `
        Usage: ${config.name} [options] <filePath>

        Options:
            -h, --help                   输出使用指南
            -v, --version                输出版本信息
            -w, --watch                  监听markdown文件变化
            -c <cssPath>                 自定义输入样式，此样式会覆盖默认生成的样式
            -o <htmlPath>                自定义输出文件
            -t <titleName>               自定义输出文件的标题
            -T <templatePath>            自定义输出文件模板
    `,
    options: [
        { alias: 'w', name: 'watch' },
        { alias: 'c', hasParam: true },
        { alias: 'o', hasParam: true },
        { alias: 't', hasParam: true },
        { alias: 'T', hasParam: true },
    ]
};

class Args {
    constructor(args) {
        this.previewer = new Previewer();
        this.easycmd = new Easycmd(cmdConfig);

        let result = this.easycmd.run(args);
        let { params, cmds } = result;

        cmds.forEach(cmd => {
            if (cmd.alias && this['_' + cmd.alias]) this['_' + cmd.alias](cmd.value);
        });

        this.previewer.setFilePath(result.params[0]);
        this.previewer.do();
    }

    // 监听变化
    _w(flag) {
        this.previewer.setWatch(flag);
    }

    // 自定义输入样式
    _c(cssPath) {
        this.previewer.setCssPath(cssPath);
    }

    // 自定义输出文件
    _o(outputPath) {
        this.previewer.setOutputPath(outputPath);
    }

    // 自定义输出文件的标题
    _t(titleName) {
        this.previewer.setTitle(titleName);
    }

    // 自定义输出文件模板
    _T(templatePath) {
        this.previewer.setTemplate(templatePath);
    }
}

module.exports = Args;
