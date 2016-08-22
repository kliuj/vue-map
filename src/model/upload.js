/*
上传图片
*/
import store from "./store.js"
let baseStore = new store()
export default class Upload {
  constructor() {

  }
  localImg (e,resolve) {
        let self = this;
        let imgArray = e.target,
            maxSize= 4194304;//限制大小4M
        if (!imgArray.files.length) return;
        $("#qhCommonLoading").show();
        var files = Array.prototype.slice.call(imgArray.files);
        files.forEach(function (file, i) {
            if (!/\/(?:jpeg|png|jpg)/i.test(file.type)) {
              $("#qhCommonLoading").hide();
              resolve({success:false,msg:'只支持png或jpg格式图片'})
            };

            var reader = new FileReader();

            reader.onload = function () {
                var result = this.result;
                var img = new Image();
                img.src = result;

                //如果图片大小小于200kb，则直接上传
                if (result.length <= maxSize) {
                    self.file = result;
                    img = null;
                    resolve( {result:result, file:file,success:true});
                }else{
                    $("#qhCommonLoading").hide();
                    resolve({success:false,msg:'图片大小不能超过2M！'})
                }

//                图片加载完毕之后进行压缩，然后上传
                // if (img.complete) {
                //     callback();
                // } else {
                //     img.onload = callback;
                // }
                //
                // function callback() {
                //     var data = compress(img);
                //
                //     $(li).css("background-image", "url(" + data + ")");
                //
                //       self.upload(data, file);
                //
                //     img = null;
                // }

            };

            reader.readAsDataURL(file);
        })
  }
  //上传文件
  upload(result, ofile,url,$dom,resolve) {
      var text = window.atob(result.split(",")[1]);
      var buffer = new ArrayBuffer(text.length);
      var ubuffer = new Uint8Array(buffer);
      var pecent = 0 , loop = null;
      for (var i = 0; i < text.length; i++) {
          ubuffer[i] = text.charCodeAt(i);
      }
      var Builder = window.WebKitBlobBuilder || window.MozBlobBuilder;
      var blob;
      if (Builder) {
          var builder = new Builder();
          builder.append(buffer);
          blob = builder.getBlob(ofile.type);
      } else {
          blob = new window.Blob([buffer], {type: ofile.type});
      }

      var xhr = new XMLHttpRequest();
      var formdata = new FormData();
      // formdata.append("IdentityCardPhoto1", blob,ofile.name);
      formdata.append($dom, blob,ofile.name);
      var UploadImageRequest = Object.assign({"UserInfo":baseStore.getStore('userinfo')},baseStore.getStore('deviceInfo'));
      var info = new Blob([JSON.stringify(UploadImageRequest)], { type: "application/json"});
      formdata.append("UploadImageRequest", info);
      xhr.open('post', url);
      xhr.send(formdata);
      xhr.onreadystatechange = function () {
            //成功上传
            $("#qhCommonLoading").hide();
           if (xhr.readyState == 4 && xhr.status == 200) {

               resolve(xhr.responseText)
           }else if(xhr.readyState == 4 && xhr.status != 200){
              console.log(xhr.readyState )
              console.log(xhr.status )
              resolve({Success:false,Message:'上传图片失败'})
           }
       };
  }
  //压缩
  compress (img) {
        var initSize = img.src.length;
        var width = img.width;
        var height = img.height;

        //如果图片大于四百万像素，计算压缩比并将大小压至400万以下
        var ratio;
        if ((ratio = width * height / 4000000)>1) {
            ratio = Math.sqrt(ratio);
            width /= ratio;
            height /= ratio;
        }else {
            ratio = 1;
        }

        canvas.width = width;
        canvas.height = height;

//        铺底色
        ctx.fillStyle = "#fff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        //如果图片像素大于100万则使用瓦片绘制
        var count;
        if ((count = width * height / 1000000) > 1) {
            count = ~~(Math.sqrt(count)+1); //计算要分成多少块瓦片

//            计算每块瓦片的宽和高
            var nw = ~~(width / count);
            var nh = ~~(height / count);

            tCanvas.width = nw;
            tCanvas.height = nh;

            for (var i = 0; i < count; i++) {
                for (var j = 0; j < count; j++) {
                    tctx.drawImage(img, i * nw * ratio, j * nh * ratio, nw * ratio, nh * ratio, 0, 0, nw, nh);

                    ctx.drawImage(tCanvas, i * nw, j * nh, nw, nh);
                }
            }
        } else {
            ctx.drawImage(img, 0, 0, width, height);
        }

        //进行最小压缩
        var ndata = canvas.toDataURL("image/jpeg", 0.1);

        console.log("压缩前：" + initSize);
        console.log("压缩后：" + ndata.length);
        console.log("压缩率：" + ~~(100 * (initSize - ndata.length) / initSize) + "%");

        tCanvas.width = tCanvas.height = canvas.width = canvas.height = 0;

        return ndata;
    }
}
