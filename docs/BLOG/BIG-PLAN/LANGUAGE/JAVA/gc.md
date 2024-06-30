# GC 知识点

## GC历代版本

Young   OLD

serial  serial
pawnew  cms
ps      ps
c1      c1

serial是串行版本
pawnew是serial的多线程版本
ps是专注于客户端的（提高了吞吐率,就是总的gc时间变少了，但是单次gc时间增长了)
cms是c1前最强gc，标记清除算法
c1是目前最强gc，使用标记复制算法

## CMS GC

Young区分为 E区，S0,S1区，比例大概 8:1:1 ，核心思想是绝大多数对象活不久
Old区只有一块，使用标记清除算法
新创建的对象放E区，扫描一轮活下来的对象交替放S0,S1
E0写满出发YoungGC，清理E，s0区，将活下来的对象赋值到S2区（轮换)
被复制到S2区的对象年龄+1，超过6岁将直接被复制到老年区
大对象也会直接分配到老年区，一般是超过S0区一半大小的对象
O区写满触发FullGc
1. 标记所有从root对象出发可达的对象(需要stw)
2. 并发标记所有可达对象
3. 修正第二轮的标记 (需要stw)
4. 清理所有垃圾对象

## G1 GC

大部分逻辑和CMS一致，下面是区别
新增region概念，每个1-32m,大约2000个region，大小可配置
每个region是离散的并不顺序存储
每个region携带rset，记录了其他region引用当前region的记录
如果单个对象大于一半的region容量小于1个region容量，分配一个单独的region，并标记为H（大对象)
如果单个对象大于1个region的容量，申请几个连续的region，并标记为H
YoungGc流程几乎不变
Old区Gc叫mixGc，跟CMS流程几乎一致，区别有两个
1. 在扫描完root region后，下一步标记所有携带root region引用的region，之后在并发标记阶段，只对上一轮被标记了的region进行扫描，未标记的直接清理
2. 在清理的时候，并不保证100%清理，优先清理垃圾占用率高的region