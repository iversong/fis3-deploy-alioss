/**
 * fis3-deploy-alioss
 */

var ALY = require("aliyun-sdk");
var aliyunoss = null;

function uploadOss(bucket, release, content, file,callback) {
  var subpath = file.subpath;
  var objkey = release.replace(/^\//, '');
  var contenttype = "";
  if(file.isJsLike)
  {
    contenttype = "application/javascript";
  }
  if(file.isCssLike)
  {
    contenttype = "text/css";
  }
  aliyunoss.putObject({
    Bucket: bucket,
    Key: objkey,
    Body: content,
    AccessControlAllowOrigin: '',
    ContentType: contenttype,
    CacheControl: 'cache',         // 参考: http://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.9
    ContentDisposition: '',           // 参考: http://www.w3.org/Protocols/rfc2616/rfc2616-sec19.html#sec19.5.1
    ContentEncoding: 'utf-8',         // 参考: http://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.11
    ServerSideEncryption: '',
    Expires: 60
  },function (err, data) {
      if(err){
        console.log('error:', err);
      } else {
        var time = '[' + fis.log.now(true) + ']';
        process.stdout.write(
            ' uploadoss - '.green.bold +
            time.grey + ' ' + 
            subpath.replace(/^\//, '') +
            ' >> '.yellow.bold +
           objkey + "---"+contenttype+
            '\n'
        );
        callback();
      }
  });
}

/**
 * deploy-alioss 插件接口
 * @param  {Object}   options  插件配置
 * @param  {Object}   modified 修改了的文件列表（对应watch功能）
 * @param  {Object}   total    所有文件列表
 * @param  {Function} next     调用下一个插件
 * @return {undefined}
 */
module.exports = function(options, modified, total, callback, next) {
  if (!options.accessKey && !options.secretKey) {
    throw new Error('options.accessKey and options.secretKey is required!');
  } else if (!options.bucket) {
    throw new Error('options.bucket is required!');
  }

  aliyunoss = new ALY.OSS({
    "accessKeyId": options.accessKey,
    "secretAccessKey": options.secretKey,
    securityToken: "",
    endpoint: 'http://oss-cn-hangzhou.aliyuncs.com',
    apiVersion: '2013-10-15'
  });

  var steps = [];

  modified.forEach(function(file) {
    var reTryCount = options.retry;
    steps.push(function(next) {
      var _upload = arguments.callee;

      uploadOss(options.bucket, file.getHashRelease(), file.getContent(), file, function(error){
        if (error) {
          if (!--reTryCount) {
            throw new Error(error);
          } else {
            upload();
          }
        } else {
          next(); //由于是异步的如果后续还需要执行必须调用 next
        }
      });
    });
  });
  fis.util.reduceRight(steps, function(next, current) {
    return function() {
      current(next);
    };
  }, callback)();
};

module.exports.options = {
  // 允许重试两次。
  retry: 2
};