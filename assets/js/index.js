$(function(){
    //获取用户信息
    getUserInfo()

    //点击退出
    $('#delogin').on('click',function(){
        layui.layer.confirm('确定退出吗?', function(index){
            // 清除掉本地存储的 token 数据
            localStorage.removeItem('token')
            location.href='./login.html'
            layui.layer.close(index);
        });
    })
})

//获取用户的基本信息
function getUserInfo(){
    $.ajax({
        type:'GET',
        url:'/my/userinfo',
        success:function(res){
            if(res.status !== 0){
                return console.log(res.message);
            }
            // 渲染用户信息函数
            readerAventg(res.data)
        }
    })
}

function readerAventg(user){
    // 判断是否有昵称 有则显示，没有则显示用户名
    let user1 = user.nickname || user.username

    $('.welcome').html(`&nbsp欢迎&nbsp&nbsp${user1}`)
    // 判断图片是否有地址，有则显示图片，没有则显示默认图片
    if(user.user_pic !== null){
        // 渲染用户头像
        $('.layui-nav-img').attr('src',user.user_pic).show()
        $('.round').hide()
    }
    else{
        //渲染文本头像
        $('.layui-nav-img').hide()
        // 获取到用户名的首字母，转位大写 显示到 文本头像上
        let text = user1[0].toUpperCase()
        $('.round').text(text.toUpperCase())
    }
}

//子页面跳转回login页面
function rLogin(){
    location.href='../login.html'
}