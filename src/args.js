'use strict';

const path = require('path');

const Previewer = require('./previewer');
const config = require('../package.json');

const helpInfo = `
  Usage: ${config.name} [options] <filePath>

  Options:
    -h, --help                   输出使用指南
    -v, --version                输出版本信息
    -w, --watch                  监听markdown文件变化
    -c <cssPath>                 自定义样式
`;

class Args {
  constructor(args) {
    this.args = args;
    this.filePath = '';
    this.cssPath = '';

    this.commandMap = {
      help: false,
      version: false,
      watch: false,
      css: false
    };

    this.previewer = new Previewer();
    this.init();
  }

  // 初始化
  init() {
    if(!this.args.length) {
      return this.help();
    } else if(this.args.length >= 1) {
      this.args.forEach((arg, index) => {
        arg = (arg || '').trim();
        this.setArg(arg, this.args[index + 1]);
      });
    }

    this.do();
  }

  // 设置指令和参数
  setArg(arg, nextArg) {
    if(!arg) return;

    if(path.extname(arg) === '.md') {
      // markdown 文件
      this.filePath = arg;
      return;
    } else if(/\-{1,2}[a-z]/.test(arg)) {
      // 其他参数
      switch(arg) {
        case '-v':
        case '--version':
          this.commandMap.version = true;
          break;
        case '-c':
          if(nextArg && path.extname(nextArg) === '.css') {
            this.commandMap.css = true;
            this.cssPath = nextArg
          }
          break;
        case '-w':
        case '--watch':
          this.commandMap.watch = true;
          break;
        case '-h':
        case '--help':
        default:
          this.commandMap.help = true;
          break;
      }
    }
  }

  do() {
    let commands = Object.keys(this.commandMap);
    for(let command of commands) {
      if(this.commandMap[command]) this[command]();
    }

    if(this.filePath) {
      this.previewer.setFilePath(this.filePath);
      this.previewer.do();
    }
  }

  // 是否为单一指令
  only(type) {
    let commands = Object.keys(this.commandMap);
    for(let command of commands) {
      if(this.commandMap[command] && command !== type) return false;
    }

    return true;
  }

  // 帮助信息
  help() {
    if(this.only('help') && !this.filePath) console.log(helpInfo);
  }

  // 版本信息
  version() {
    if(this.only('version') && !this.filePath) console.log(`v${config.version}`);
  }

  // 监听变化
  watch() {
    this.previewer.setWatch(true);
  }

  // 自定义样式
  css() {
    this.previewer.setCssPath(this.cssPath);
  }
}

module.exports = Args;
