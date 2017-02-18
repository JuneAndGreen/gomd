'use strict';

const fs = require('fs');
const path = require('path');

const markdown = require('markdown').markdown;
const parse = require('tooltpl').parse;

const htmlTemplate = fs.readFileSync(path.join(__dirname, './template.html'), 'utf8');
const cssTemplate = fs.readFileSync(path.join(__dirname, './template.css'), 'utf8');
const htmlFunc = parse(htmlTemplate);
const cssFunc = parse(cssTemplate);

class Previewer {
  constructor(filePath) {
    this.dir = process.cwd();
    this.filePath = '';
    this.watch = false;
    this.cssPath = '';
  }

  setFilePath(filePath) {
    try {
      fs.accessSync(filePath);
      this.filePath = filePath;
    } catch(err) {
      this.filePath = path.join(this.dir, filePath || '');
    }
  }

  setWatch(watch) {
    this.watch = !!watch;
  }

  setCssPath(cssPath) {
    try {
      fs.accessSync(cssPath);
      this.cssPath = cssPath;
    } catch(err) {
      this.cssPath = path.join(this.dir, cssPath || '');
    }
  }

  do() {
    if(!this.filePath) return;

    if(this.watch) this.watchFile();
    else this.render();
  }

  watchFile() {
    this.render();

    fs.watch(this.filePath, (event) => {
      if(event === 'change') {
        console.log(`文件变化：${this.filePath}`);

        this.render();
      }
    });
  }

  render() {
    let text = fs.readFileSync(this.filePath, 'utf8');
    let html = markdown.toHTML(text);

    let css = '';
    if(this.cssPath) {
      css = fs.readFileSync(this.cssPath, 'utf8');
    }

    css = cssFunc({
      css
    })

    html = htmlFunc({
      css,
      html
    });

    fs.writeFileSync(path.join(path.dirname(this.filePath), path.basename(this.filePath, '.md')) + '.html', html);
  }

};

module.exports = Previewer;