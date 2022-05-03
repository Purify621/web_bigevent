$(function(){
    //定义验证规则
    layui.form.verify({
        nickname:function(value){
            if(value.length > 6){
                return "用户名应在 1~6位之间"
            }
        }
    })
    //初始化基本信息
    getuser()
    //监听表单的提交事件
    $('#form_user').on('submit',function(e){
        e.preventDefault()
        $.ajax({
            type:'POST',
            url:'/my/userinfo',
            //快速获取表单数据
            data:$(this).serialize(),
            success:function(res){
                if(res.status !== 0){
                    return layui.layer.msg('提交信息失败')
                }
                console.log(res.message)
                //调用父页面的方法，重新渲染用户的头像和用户的信息
                window.parent.getUserInfo()
            }
        })
    })
    
    //重置按钮
    $('#form_user [type=reset]').on('click',function(e){
        //阻止表单默认提交行为
        e.preventDefault()
        //在调用获取信息方法重新给表单赋值，即可重置表单
        getuser()
    })
})
//初始化用户的基本信息函数
function getuser(){
    $.ajax({
        type:'GET',
        url:'/my/userinfo',
        success:function(res){
            if(res.status !== 0){
                return layui.layer.msg('获取用户信息失败')
            }
            //使用 layui 快速为表单复制
            //使用该属性请查看官方文档
            layui.form.val('formUser',{
                'username':res.data.username,
                'nickname':res.data.nickname,
                'email':res.data.email,
                'id':res.data.id
            })
        }
    })

}