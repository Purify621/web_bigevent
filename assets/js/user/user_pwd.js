$(function(){
    //表单验证
    layui.form.verify({
        password:function(value){
            if(value === $('#form_pwd [name=oldPwd]').val()){
                return "新旧密码不能相同"
            }
            if(value !== $('#form_pwd [name=newPwd]').val()){
                return "两次输入的密码不一致"
            }
        } 
        ,pass: [
            /^[\S]{6,12}$/
            ,'密码必须6到12位，且不能出现空格'
          ] 
    })
    
    //监听表单提交事件
    $('#form_pwd').on('submit',function(e){
        e.preventDefault()
        $.ajax({
            type:'POST',
            url:'/my/updatepwd',
            data:$(this).serialize(),
            success:function(res){
                if(res.status !== 0){
                    return layui.layer.msg(res.message)
                }
                //重置表单数据
                $('#form_pwd')[0].reset()
                //调用父元素的跳转函数，以当重置完密码后让用户重新登录
                /*
                如果不使用该方法 直接用 location.href 跳转
                可能会因为 iframe 标签的缘故导致跳转到 iframe 标签里面 而不是 login 页面
                 */
                window.parent.rLogin()              
            }
        })
    })
})