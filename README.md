# gomd

一个简单的将markdown转为html的命令行工具。

## 安装

```bash
npm install -g gomd
```

## 使用

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
