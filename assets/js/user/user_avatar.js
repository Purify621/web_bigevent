// 1.1 获取裁剪区域的 DOM 元素
var $image = $("#image");
// 1.2 配置选项
const options = {
  // 纵横比
  aspectRatio: 1,
  // 指定预览区域
  preview: ".img-preview",
};

// 1.3 创建裁剪区域
$image.cropper(options);

//为上传按钮绑定点击事件
$('#btnChooseImage').on('click',function(e){
  // 自动点击隐藏的 flie表单 来上传文件
  $('#file').click()
})

//为文件选择框绑定事件
$('#file').on('change',function(e){
  
  //1、拿到用户选择的文件
  let file = e.target.files[0]
  //2、将文件转化为路径
  let imgURL = URL.createObjectURL(file)
  $image
   .cropper('destroy')      // 销毁旧的裁剪区域
   .attr('src', imgURL)  // 重新设置图片路径
   .cropper(options)        // 重新初始化裁剪区域
  
})

//确定按钮
$('#btnUploadImage').on('click',function(){
  // 获取到裁剪区域的图片
  var dataURL = $image
    // 创建一个 Canvas 画布
      .cropper('getCroppedCanvas', { 
        width: 100,
        height: 100
      })
      // 将 Canvas 画布上的内容，转化为 base64 格式的字符串
      .toDataURL('image/png')
  
  // 发起请求上传头像
  $.ajax({
    type:'POST',
    url:'/my/update/avatar',
    data:{avatar:dataURL},
    success:function(res){
      if(res.status !==0 ){
        return layui.layer.msg('上传头像失败')
      }
      layui.layer.msg('更换头像成功')
      //调用 主页面的渲染函数重新获取用户信息
      window.parent.getUserInfo()
    }
  })
})