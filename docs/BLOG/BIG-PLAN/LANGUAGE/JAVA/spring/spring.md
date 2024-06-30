# Spring 知识点

## IOC

### 原理

1. 把对象的生命周期管理由用户本身下沉到了spring框架（控制反转）
2. 对什么的控制？对对象的创建的控制
3. 对什么的反转？对象创建本身的反转，由spring创建

### Bean生命周期

#### Bean的创建  

1. 运行时通过扫描包含注解的类或者方法，获取声明需要spring托管的类
1.1 生成BeanDefinitions，包含了bean的所有相关信息,放到BeanDefinitionMap中
1.2 遍历BeanDefinitions，开始创建bean
2. 构造对象，推断构造方法，反射获取构造方法，生成实例
3. 填充属性，主要依靠三级缓存实现
3.1 初始化实例，分3部分，实现了awre接口的bean注入容器相关信息；执行BeanPostProcessor处理器（beforeInit(PostConstract)，AfterInit(PreDestroy),用户自定义的...）；执行bean的初始化方法实现了InitailingBean接口的afterpropertiesSet方法；
4. 注册销毁,注册registerDisposbleBean方法，注册Bean
5. 将构造好的Bean放入单例池，可以被获取使用了

#### Bean的销毁

1. 执行PostBeforeDestruction处理器（Bean中定义的PreDestroy方法）
2. 执行自定义的BeanDestroy方法（实现了DisposbleBean接口的DestroyMethod方法）

## Spring怎么解决的Bean循环引用

通过3级缓存解决。核心通过缓存给了出口，避免了死锁（其实2级缓存就可以，之所以3级是因为还有AOP(隐式依赖)）

1. 在A的依赖注入阶段，发现依赖了B，从3级缓存中尝试寻找B，如果没找到，把自己放到3级缓存中，开始创建B
2. B依赖注入阶段发现依赖了A，同样从3级缓存中找A，找到了A，将A放到2级缓存，把自己放到1级缓存，返回继续创建A
3. A通过1级缓存拿到了创建好了的B，自己也创建好了，将自己放到1级缓存

## 双亲委派模型

1. 加载类的时候，一层一层向上寻找，首先是通过AppClassLoader -> ExtClassLoader -> BootstrapClassloader

### 怎么打破双亲委派模型

1. 重写loadclass 方法（自定义classloader）
2. spi

### 为什么要打破双亲委派模型

tomcat可以同时部署N个web应用，可能每个应用都有一个同名的类，如果不打破就无法通过默认的classloader加载到第二个应用里的类

案例：JDBC驱动/web容器（tomcat）

## AOP原理



## JDK AOP VS CGLIB AOP

