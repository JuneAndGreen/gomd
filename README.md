# gomd

一个简单的将markdown转为html的命令行工具。

## 安装

```bash
npm install --save gomd
```

或

```bash
npm install -g gomd
```

## 使用方式1

```js
const gomd = require('gomd');

gomd({
    watch: true, // 是否监听markdown文件变化
    input: 'xxx', // 输入markdown文件路径
    output: 'xxx', // 输出html文件路径
    css: 'xxx', // 自定义输入样式路径
    template: 'xxx', // 自定义输出文件的模板路径
    title: 'xxx', // 自定义输入标题
})

```

## 使用方式2

```
  Usage: gomd [options] <filePath>

  Options:
    -h, --help                   输出使用指南
    -v, --version                输出版本信息
    -w, --watch                  监听markdown文件变化
    -c <cssPath>                 自定义输入样式，此样式会覆盖默认生成的样式
    -o <htmlPath>                自定义输出文件
    -t <titleName>               自定义输出文件的标题
    -T <templatePath>            自定义输出文件模板
```

直接将markdown文件转为html文件：

```bash
gomd ./my.md
```

监听markdown文件变化，同时指定自定义样式和自定义输出文件

```bash
gomd ./my.md -w -c ./my.css -o ./my.html
```

## 模板

如果不指定输出文件的模板，则会使用内置模板生成html文件。你可以自定义模板，模板里会注入三个参数：`title`、`html`和`css`，分别对应标题、html内容和样式内容。

> 模板采用tooltpl模板，语法可参考：[https://github.com/JuneAndGreen/tooltpl](https://github.com/JuneAndGreen/tooltpl)。

## 协议

MIT
