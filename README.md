# 书籍管理后端系统

### 介绍

书籍管理

---

### 接口介绍

### 搜索书籍

地址: /api/novels/search

请求方式: GET

请求参数:

| 参数名 | 介绍 |
| --- | --- |
| title | 书名 |
| source | 数据源 |

### 获取书籍详情信息

地址: /api/novels/getNovelInfo

请求方式: GET

请求参数:

| 参数名 | 介绍 |
| --- | --- |
| title | 书名 |
| source | 数据源 |
| sourceUrl | 数据源地址 |

### 获取书籍章节详情内容

地址: /api/novels/chaptercontent

请求方式: GET

请求参数:

| 参数名 | 介绍 |
| --- | --- |
| novelId | 书籍id |
| chapterindex | 章节序号 |