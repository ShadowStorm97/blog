# KAFKA 知识点

## 特点

### 高性能

分区并行

### 高可用

分布式+数据副本

### 一致性

最终一致性

## KAFKA的消息模型

### TOPIC、Partition、Replica

1个Topic可以有N个Partition、1个Partition可以有N个Replica

#### 建联过程

1. 客户端通过链接地址，请求broker的Meta信息
2. 通过Meta信息，调整客户端的参数，包括buffer size等等参数
3. 通过Meta信息，获取TopicMeta信息
4. 根据Topic Meta信息，获取当前要消费的leader replica的节点信息
5. 发起上一步获取的Broker节点的建联
6. 从leader replica消费数据

#### 消费者组

- 消费者组记录了每个消费者当前消费的情况，包括topic、Partition、offset
- 同一个个消费者组中，每个消费者独占一个Partition
- 若新增消费者、或退出消费者，会发生消费者组的冲平衡，只会变更消费关系

### 副本机制

- 1个Partition可以配置N个副本，保证高可用
- 多个Replica只有一个Replica提供读写，叫主副本
- 从副本只从副本同步数据，不提供读写

#### 副本选主

- 一般是通过在ZK争抢一个临时节点
- 也可以通过写入随机数，较大的数当选

#### 数据同步

- 

#### ISR机制

- IN Sync Replicas，在同步水位中的副本们
- ISR会配置一个水位，符合要求的副本会被纳入
- 不符合同步水位的副本会被踢出ISR
- 如果有主副本挂掉，从ISR中挑选一个升级为主副本

### 重平衡

#### 消费者组重平衡

- 一般是消费者组的成员发生了变更，新增或下线了消费者
- 逻辑上的变更是调整了从属关系
- 物理上的变更是调整了链接的broker节点

#### 主副本重平衡

- 有多种情况，主副本被ISR踢出算一种
- 主副本没有被ISR踢出，但是全部节点宕机重启也会触发

(实战)[https://time.geekbang.org/column/article/98948]
(源码)[https://time.geekbang.org/column/article/222935]

## 拓展阅读

[面试题1](https://www.xiaogenban1993.com/blog/23.06/kafka_kafka%E9%9D%A2%E8%AF%95)

[面试题2](https://time.geekbang.org/column/article/246934)