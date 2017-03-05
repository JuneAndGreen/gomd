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
    css: 'xxx', // 自定义样式路径
})

```

## 使用方式2

```
  Usage: gomd [options] <filePath>

  Options:
    -h, --help                   输出使用指南
    -v, --version                输出版本信息
    -w, --watch                  监听markdown文件变化
    -c <cssPath>                 自定义样式
    -o <htmlPath>                自定义输出文件
```

直接将markdown文件转为html文件：

```bash
gomd ./my.md
```

监听markdown文件变化，同时指定自定义样式和自定义输出文件

```bash
gomd ./my.md -w -c ./my.css -o ./my.html
```

## 协议

MIT
