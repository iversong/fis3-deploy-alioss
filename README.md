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
        bucket: '你的存储空间名称'
    })
})
```

## 参考

[Aliyun Oss Api 手册](http://imgs-storage.cdn.aliyuncs.com/help/oss/oss%20api%2020140828.pdf)
