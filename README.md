
## `Star`是什么?

`Star`是 STock Analysis and Research tool 的简称，主要用于A股股票追踪分析。`star`目前的主要作用是根据您所设定的股票目标价及当前价计算出相对该**目标价**的上涨空间，即`(目标价-当前价)/当前价x100%`，然后将此上涨空间按顺序排列方便您从中找到上涨空间最大的股票作为买入参考。`star`不提供股价预测和股票交易服务，目前只是单纯的计算，所以它的价值很大程度上取决于您所设定的目标价的有效性，目标价可以选择近期股票的最高价格或者分析师给出的价格，在大牛市里面这样的目标价还是比较容易达到的。同时`star`还具有股票基本报价信息查询、看盘、股票董监高持股信息批量查询、查阅未来30日财经日历等功能，未来可能会加入更多功能，也欢迎大家[反馈建议](https://github.com/hustcer/star/issues/new)。


## Donating

Support this project and [others by hustcer][gratipay] via [gratipay][].

[![Support via Gratipay][gratipay-badge]][gratipay]

[gratipay-badge]: https://raw.githubusercontent.com/hustcer/htmldemo/master/gittip.png
[gratipay]: https://gratipay.com/hustcer/


## 安装及使用

`Star`是基于`node.js`的所以先要安装`node.js`, 推荐您使用最新版本的`node.js`，同时最好使用 Mac/Linux系统，Windows下目前还没测试过，理论上可以使用，如果具体使用过程中遇到问题也可以[在此反馈](https://github.com/hustcer/star/issues/new)；具体安装步骤如下：

1. 安装 [node.js](https://nodejs.org/), version >= 0.12.5，始终建议您采用最新版本的 `node.js`;
1. 安装`star`: `sudo npm i -g star`，注意一定记得加上 `-g` 参数，这样在任意路径下都可以调用`star`命令，否则可能找不到可执行文件;
1. 运行`star`: 直接执行 `star` 即可，第一次运行的时候需要加`-f`或`--file`参数指定股票数据文件(推荐采用绝对路径,详见后文说明)，之后可以省略该参数;
1. 更多帮助可以参考: `star --help`;

注意：如果`npm`安装很慢(由于一些众所周知的原因)，可以使用[`cnpm`](https://npm.taobao.org/)代替，下同；

## 升级

本工具会不定时更新，升级方法如下：

1. 【可选】升级node.js, 建议您使用[`nvm`](https://github.com/creationix/nvm)来管理node这样升级起来很方便，mac下也可以使用[`brew`](http://brew.sh/)来安装、升级node；
2. 更新 `star`：`sudo npm update -g star`;

## 具体功能列表

### 股票追踪

- 设置股票的买入价、卖出价、目标价、星级、备注等，可以自动获取股票的当前价格并且计算距离目标价的上涨空间：`(目标价-当前价)/当前价x100%`，上涨空间最大的股票通常也是最有利可图的，这也是本工具的最主要功能，方便快速决定值得买入的股票；
- 支持两个股票信息获取数据源：腾讯和新浪股票数据源，万一其中一个有问题可以通过`-d`或`--data`参数切换到另一个；
- 可以按照股票的代码、星级、当前价、当前涨幅、上涨空间、市值、PE、PB等条件进行升、降序排序，其中后三项排序只有在采用腾讯数据接口的时候才支持；
- 股票数据比较多的时候可以设置每次显示多少条数据(通过`-l`或`--limit`参数)，并且进行分页(通过`-p`或`--page`参数)；
- 可以设置是否关注、持有某股票，并根据这些条件进行过滤：可以显示所有股票(-a, --all)、只显示持有的股票(-o, --hold)、只显示不再关注的股票(-I, --ignore)；
- 可以通过`-e`或`--exclude`参数排除所有证券代码以300,600,002或者000开头的股票，多个前缀之间以','或者'，'分隔；
- 可以通过`-c`或`--contain`参数只显示所有证券代码以300,600,002或者000开头的股票，多个前缀之间以','或者'，'分隔；
- 可以通过`-f`或`--file`参数指定股票文件路径，并自动保存该路径，下次执行命令的时候不必重复输入；
- 可以通过`-g`或`--grep`参数对股票列表里的股票名、备注字段进行搜索、过滤，多个关键词之间以','或者'，'分隔；
- 可以通过`-L`或`--lte`参数过滤出当前价到目标价的上涨空间百分比小于等于指定百分比的股票；
- 可以通过`-G`或`--gte`参数过滤出当前价到目标价的上涨空间百分比大于等于指定百分比的股票；
- 可以通过`-U`或`--under`参数过滤出股票星级等于或在指定星级之下的股票；
- 可以通过`-A`或`--above`参数过滤出股票星级等于或在指定星级之上的股票；

### 股票报价查询

- 通过证券代码查询相应股票的基本报价信息，多个代码之间以','或者'，'分隔，一次最多查询20个，例如：`star 300315,600048，600015`；

### 股票报价自动更新/看盘

- 可以通过`-w`或`--watch`参数看盘，在该模式下股票报价数据会自动更新，目前更新时间间隔为3.6秒，例如：`star -w 601179,600118,600893,000712,002625`，最终执行效果类似于在终端执行`top`命令；
- 每次输入这些股票代码可能比较麻烦，所以为了方便起见可以修改股票配置文件的 `watchList` 部分内容，详见后文说明，这样每次只需要执行`star -w` 命令即可；
- 如果 `watchList` 部分内容为空则自动会查找 `symbols` 部分股票里面 `hold` 为 `true` 的部分股票；
- 需要说明的是，目前看盘时股票数目有限制，最多同时观察20只股票，这个数目在大多数情况下已经足够了，加上这个限制主要是为了减少数据请求的次数；

### 董监高持股变动信息批量查询

- 可以通过`-i`或`--insider`参数加上对应的证券代码，查询相应股票的高管交易记录，多个代码之间以','或者'，'分隔，支持对深市主板、中小板、创业板及沪市股票的董监高持股变动信息进行查询；
- 可以通过`--from 2014/01/01 --to 2015/07/09`参数限定高管交易记录的查询起始时间，默认从当前时间开始往前推一年；
- 可以通过`--span 6m`参数限定高管交易记录的查询时间跨度月数，取值范围从`1m`到`24m`，`6m`表示从现在开始往前推6个月，默认为`12m`，例如：`star -i 000768,002456,600118,300036 --span 3m`；
- 需要注意的是目前一次最多可以查询20只股票，如果你有更多股票可以分多次进行查询，加上这个限制同样是为了减少数据请求次数和服务器压力；
- 【BTW】如果你需要查询美股内部交易数据可以通过[命令行工具`inq`](https://github.com/hustcer/inq)或者[Web服务TraceInvest](http://traceinvest.com)

### 未来30日财经日历

- 可以通过`-C`或`--cal`参数查询中国股市未来30日题材前瞻；

### 其它

- 还有更多功能正在酝酿之中，同时也欢迎大家广泛提建议；

## 股票数据文件说明

`Star`的运行需要一个股票数据文件，如果未指定股票数据文件默认情况下会使用当前目录下的 [`symbols.yaml`](https://github.com/hustcer/star/blob/master/symbols.yaml) 文件，该文件采用`yaml`语法编写，修改的时候尤其要注意缩进问题，否则可能会解析错误。一个典型的股票数据文件格式说明如下：

### 股票追踪数据说明

```yaml
symbols:
  -
    name      : '掌趣科技'            # <字符串>公司名称
    code      : '300315'             # <字符串>证券代码，必填，不可错
    cheap     : 16                   # <数字>买点价位，在此价格附近买入有利可图
    expensive : 22                   # <数字>卖点价位，在此价格附近可以卖出获利了结
    target    : 23                   # <数字>目标价位
    star      : 3                    # <数字>股票评级，越高越值得购买，范围：1~5
    hold      : false                # <true/false> true 表示当前持有该股票,反之不持有
    watch     : true                 # <true/false>是否关注此股票，如果 true 则关注，否则忽略
    comment   : '手游;高送转;自设目标'  # <字符串>行业/概念/题材等备注,后期可用于搜索过滤
  -
    name      : '启明星辰'
    code      : '002439'
    cheap     : 50
    expensive : 88
    target    : 78
    star      : 3
    hold      : false
    watch     : true
    comment   : '计算机;信息安全;腾讯合作;分析师推荐'
```

### 股票报价自动更新/看盘数据格式说明

```yaml
# 通过`star.js -w`或`star.js --watch`看盘时如果没有传入证券代码参数则从这里取得看盘股票列表
# 如果 watchList 列表为空或者不存在则从 symbols 列表中获取 hold 为 true 的股票
watchList:
  -
    name :  '安信信托'
    code :  '600816'
  -
    name :  '中航飞机'
    code :  '000768'
  -
    name :  '华胜天成'
    code :  '600410'
  -
    name :  '中国卫星'
    code :  '600118'
  -
    name :  '中航动力'
    code :  '600893'
  -
    name :  '锦龙股份'
    code :  '000712'
```

## 运行截图

1. 帮助文档
![](https://github.com/hustcer/star/blob/master/snapshot/help.png)

2. 股票筛选结果
![](https://github.com/hustcer/star/blob/master/snapshot/snapshot.png)

3. 股票基本报价信息查询
![](https://github.com/hustcer/star/blob/master/snapshot/query.png)

4. 股票看盘(报价数据自动更新)
![](https://github.com/hustcer/star/blob/master/snapshot/watch.png)

5. 批量查询股票董监高增减持信息
![](https://github.com/hustcer/star/blob/master/snapshot/insider.png)

6. 中国股市未来30日题材前瞻
![](https://github.com/hustcer/star/blob/master/snapshot/cal.png)
