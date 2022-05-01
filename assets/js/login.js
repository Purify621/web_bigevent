//入口函数
$(function () {
  //去注册标签
  $("#link_reg").on("click", function () {
    $(".login-box").hide();
    $(".reg-box").show();
  });

  //去登录标签
  $("#link_login").on("click", function () {
    $(".reg-box").hide();
    $(".login-box").show();
  });

  // 获取到 layui 的form属性
  let form = layui.form;
  let layer = layui.layer
  form.verify({
    // 自定义了 pwd 的校验规则
    pwd: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],
    // 判读两次密码输入是否一致
    repwd: function(value){
        // 通过value形参获取到 当前密码的值，在与上面的密码进行判断
        let $ps =  $('#ps').val()
        if($ps !== value){
            return '两次输入的密码不一致'
        }
    },
  });

    //监听注册表单的提交事件
    $('#freg').on('submit',function(e){
        //阻止默认行为
        e.preventDefault()
        //发起ajax请求
        $.ajax({
            type:'POST',
            url:'/api/reguser',
            data:{username:$('#freg [name=username]').val(),password:$('#freg [name=password]').val()},
            success:function(res){
                if(res.status !== 0){
                    return layer.msg(res.message);
                }
                layer.msg(res.message);
                //注册成功后清空表单
                $('#freg')[0].reset()
                //自定跳转到登录窗口
                $("#link_login").click()
            }
        })
    })

    //监听登录表单的提交事件
    $('#flogin').on('submit',function(e){
        e.preventDefault()
        $.ajax({
            type:'POST',
            url:'/api/login',
            data:$(this).serialize(),
            success:function(res){
                if(res.status !== 0){
                    return layer.msg('登录失败');
                }
                layer.msg('登录成功')

                //将登录成功的token值存储到本地
                localStorage.setItem('token',res.token)

                location.href='index.html'
            }
        })
    })

});
