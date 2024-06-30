# Spring-boot 知识点

## 自动装配

### 原理

#### 解决了什么问题

解决了外部依赖组件如何集成到Spring容器中的问题。
如果没有自动装配，需要自行将使用到的外部依赖的核心Bean进行声明定义，但依赖也有自己的依赖，声明核心Bean不简单。通过自动装配，将如何生命核心Bean的控制权移交到外部依赖本身。此时有两种starter，一种是spring管理的，一种是第三方自行提供的。使用方只需要在POM中声明即可。

#### 如何实现的

1. spring-boot预先定义了常见的100多种外部依赖的start，包含了autoconfig和conditional，
2. 前者描述了如何声明核心Bean，后者给出了自动加载到容器中的必要条件（核心类全路径）
3. 通过classloader加载必要条件的类来判断项目是否引用到了这个第三方依赖，从而决定是否加载到容器中。

## spi

