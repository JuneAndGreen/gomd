'use strict';

const fs = require('fs');
const path = require('path');

const marked = require('marked');
const highlight = require('highlight.js');
const parse = require('tooltpl').parse;

const renderer = new marked.Renderer();

// 重写渲染图片方法
renderer.image = function(href, title, text) {
  return `<p class="image-wrapper"><img src="${href}" alt="${title}" title="${title}"></p>`;
};

marked.setOptions({
  renderer,
  highlight: function(code) {
    return highlight.highlightAuto(code).value;
  }
});

const htmlTemplate = fs.readFileSync(path.join(__dirname, './template.html'), 'utf8');
const cssTemplate = fs.readFileSync(path.join(__dirname, './template.css'), 'utf8');
const htmlFunc = parse(htmlTemplate);
const cssFunc = parse(cssTemplate);

// 补全路径
function formatPath(filePath) {
  if(filePath.indexOf('/') === -1 && filePath.indexOf('\\') === -1) {
    return `./${filePath}`;
  } else {
    return filePath;
  }
}

// 是否是绝对路径
function isAbsolute(filePath) {
  return filePath.indexOf('.') !== 0; 
}

class Previewer {
  constructor(filePath) {
    this.dir = process.cwd();
    this.filePath = '';
    this.watch = false;
    this.cssPath = '';
    this.outputPath = '';
  }

  setFilePath(filePath) {
    filePath = formatPath(filePath);

    if(isAbsolute(filePath)) {
      this.filePath = filePath;
    } else {
      this.filePath = path.join(this.dir, filePath || '');
    }
  }

  setWatch(watch) {
    this.watch = !!watch;
  }

  setCssPath(cssPath) {
    cssPath = formatPath(cssPath);

    if(isAbsolute(cssPath)) {
      this.cssPath = cssPath;
    } else {
      this.cssPath = path.join(this.dir, cssPath || '');
    }
  }

  setOutputPath(outputPath) {
    outputPath = formatPath(outputPath);

    if(isAbsolute(outputPath)) {
      this.outputPath = outputPath;
    } else {
      this.outputPath = path.join(this.dir, outputPath || '');
    }
  }

  do() {
    if(!this.filePath) return;

    if(this.watch) {
      this.render();
      if(this.filePath) this.watchFile(this.filePath);
      if(this.cssPath) this.watchFile(this.cssPath);
    } else {
      this.render();
    }
  }

  watchFile(filePath) {
    fs.watch(filePath, (event) => {
      if(event === 'change') {
        console.log(`文件变化：${filePath}`);

        this.render();
      }
    });
  }

  render() {
    let text = fs.readFileSync(this.filePath, 'utf8');
    let html = marked(text);

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

    let outputPath = this.outputPath || path.join(path.dirname(this.filePath), path.basename(this.filePath, '.md')) + '.html';
    fs.writeFileSync(outputPath, html);

    console.log('生成html文件：' + outputPath);
  }

};

module.exports = Previewer;