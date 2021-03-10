> 💡**停止维护**：本插件已作为官方插件的一部分提供，请改用 [koishi-plugin-image-search](https://koishi.js.org/plugins/other/image-search.html)

# iqdb for Koishi

**Koishi iqdb 搜图插件**（`koishi-plugin-iqdb` ~~征名启事~~）是一个为[koishi](https://github.com/koishijs/koishi)设计的使用<http://iqdb.org>进行搜图的插件。

## 安装

安装插件，详见 [官方指南](https://koishi.js.org/guide/context.html)。

```bash
# Via yarn
yarn add koishi-plugin-iqdb
# Or via npm
npm install koishi-plugin-iqdb
```

## 需求

~~有网就行。~~

## 配置

本插件有以下配置项。

### `alias`

为指令配置别名。您也可以直接使用`App.command('iqdb').alias()`配置此项。

类型：`String[]`

默认：`[]`

### `commandAuthority`

操作搜图所需的权限。

类型：`Number`

默认：`1`

### `unsafeAuthority`

允许不健全的图片结果显示（`--unsafe`）所需的权限。

类型：`Number`

默认：`1`

## 预览

![iqdb_sample.jpg](https://i.loli.net/2021/03/01/XhmxIgc97be5R1k.jpg)
