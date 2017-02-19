# ejs模板引擎语法

github地址：[https://github.com/tj/ejs](https://github.com/tj/ejs)

## 表格测试

|头1|头2|头3|
|:--|:--:|--:|
|测试|测试|测试|
|测试测试测试测试|测试测试测试测试|测试测试测试测试|

## 图片测试

![蜡笔小新](./test.jpg)

## 测试有序列表

1. 哈哈哈
2. 嗬嗬嗬

## 测试引用

> 今天天气不错今天天气不错今天天气不错今天天气不错今天天气不错今天天气不错今天天气不错今天天气不错

```
假如代码太长假如代码太长假如代码太长假如代码太长假如代码太长假如代码太长假如代码太长假如代码太长假如代码太长假如代码太长假如代码太长假如代码太长假如代码太长假如代码太长假如代码太长假如代码太长假如代码太长假如代码太长假如代码太长假如代码太长假如代码太长假如代码太长
```

## 介绍

ejs是一种简单实用的**模板引擎**，在前端或者后端（nodejs）均可以使用。其语法类似jsp和php，可以在html代码中编写js代码，从而生成对应的html文件。

## 例子

```html
<% if (user) { %>
  <h2><%= user.name %></h2>
<% } %>
```

## 用法

```javascript
ejs.compile(str, options);
// => Function

ejs.render(str, options);
// => str
```

其中`options`中可配置项有：

* `cache`： 编译好的模板函数会被缓存，需要传入`filename`
* `filename`： 和`cache`一起使用，作为缓存时的键值
* `context`： 编译后生成的模板函数执行上下文
* `compileDebug`： 当值为`false`不编译调试器，否则会跟踪编译信息
* `client`： 是否返回独立编译函数
* `debug`： 输出生成的函数体
* `open`： 自定义开始标签
* `close`：  自定义结束标签
* 其他添加的参数均为模板参数

## 语法

* <% %>： 用于js控制流，没有输出
* <%= %>： 输出转义的值到模板中
* <%- %>： 输出不转义的值到模板中
* <%# %>： 注释语句
* <%%： 输出'<%'的文本，相当于'<%'的转义形式
* <% -%>或<%= -%>或<%- -%>： 修剪掉换行符

## 包含其他模板

使用include指令可以把其他模板包含进来。 (这个要求 'filename' 选项。)举个例子，你如果你已经有了 "./views/users.ejs" 和 "./views/user/show.ejs"这个两个模板，你可以在users.ejs中用include指令把show.ejs包含到users.ejs中，如：

```html
<div>
  <% include user/show %>
</div>
```

在编译之后并不会产生io操作，所有模板都是在编译时包含进来，因此他们可以共享变量。

## 自定义分隔符

自定义分割符号可以应用在一个模板中，或者是全局范围内。

```javascript
var ejs =require('ejs'),
    users = ['geddy', 'neil', 'alex'];

ejs.render('??= users.join(" | "); ??', {users: users}, {open:'??',close:'??'});  // => 'geddy | neil | alex'

// 或者

ejs.delimiter ='$';
ejs.render('$= users.join(" | "); $', {users: users});  // => 'geddy | neil | alex'
```

## 过滤器

### 使用

针对插入的变量可以使用过滤器对插值进行修饰，使用过滤器的方式如下：

```html
<!-- users = [{ name: 'tj' }, { name: 'mape' }, { name: 'guillermo' }] -->
<p><%=: users | map:'name' | join %></p>
```
输出：

```html
<p>Tj, Mape, Guillermo</p>
```

### 支持的过滤器

* first：取数组第一个元素
* last：取数组最后一个元素
* capitalize：返回首字母大写的字符串
* downcase：小写转换
* upcase：大写转换
* sort：排序
* sort_by:'prop'：安卓某属性排序
* size：返回数组长度
* length：返回字符串长度
* plus:n：加上n
* minus:n：减去n
* times:n：乘以n
* divided_by:n：除以n
* join:'val'：连接字符串
* truncate:n：截取前n个字符
* truncate_words:n：截取前n个单词
* replace:pattern,substitution：字符串替换
* prepend:val：合并，并追加在前面
* append:val：合并，并追加在后面
* map:'prop'：返回数组中由属性prop的值组成的数组
* reverse：逆序排列
* get:'prop'：取属性值

### 添加自定义过滤器

```javascript
ejs.filters.last = function(obj) {
  return obj[obj.length - 1];
};
```

