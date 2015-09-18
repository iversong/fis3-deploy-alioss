# fis3 aliyun oss 部署插件

FIS 静态资源部署Aliyun Oss插件。

## 安装

全局安装或者本地安装都可以。

```
npm install fis3-deploy-alioss or npm install fis3-deploy-alioss -g
```

## 使用方法

使用统一的 deploy 插件配置方法

```js
fis.match('*.js', {
    deploy: fis.plugin('alioss', {
        accessKey: '在阿里云OSS申请的 accessKeyId',
        secretKey: '在阿里云OSS申请的 secretAccessKey',
        bucket: '你的存储空间名称',
        ossServer: '[可选，不填写默认为杭州节点]'
    })
})
```

参数中ossServer配置服务器地址

- 根据你的 oss 实例所在地区选择填入
  杭州：http://oss-cn-hangzhou.aliyuncs.com
  北京：http://oss-cn-beijing.aliyuncs.com
  青岛：http://oss-cn-qingdao.aliyuncs.com
  深圳：http://oss-cn-shenzhen.aliyuncs.com
  香港：http://oss-cn-hongkong.aliyuncs.com

- 注意：如果你是在阿里云 ECS 上连接 OSS，可以使用内网地址，速度快，没有带宽限制。
  杭州：http://oss-cn-hangzhou-internal.aliyuncs.com
  北京：http://oss-cn-beijing-internal.aliyuncs.com
  青岛：http://oss-cn-qingdao-internal.aliyuncs.com
  深圳：http://oss-cn-shenzhen-internal.aliyuncs.com
  香港：http://oss-cn-hongkong-internal.aliyuncs.com

## 参考

[Aliyun Oss Api 手册](http://imgs-storage.cdn.aliyuncs.com/help/oss/oss%20api%2020140828.pdf)