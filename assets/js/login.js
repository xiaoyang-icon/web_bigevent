$(function () {

    //点击去 “注册账号” 的链接
    $('#link_reg').on('click', function () {
        $('.login-box').hide()
        $('.reg-box').show()
    });

    //点击去 “登录账号” 的链接
    $('#link_login').on('click', function () {
        $('.reg-box').hide();
        $('.login-box').show()
    });

    //从 layui 中获取 form 元素
    var form = layui.form
    var layer = layui.layer
    //通过 form.verify() 自定义校验规则
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        repwd: function (value) {
            var pwd = $('.reg-box [name=password]').val()
            if (pwd !== value) {
                return '两次输入的密码不一致'
            }
        }
    });

    // //监听注册表单的提交事件
    $('#form_reg').on('submit', function (e) {
        //阻止默认表单的提交行为
        e.preventDefault()
        //发起 ajax 的 POST 请求
        $.post('http://ajax.frontend.itheima.net/api/reguser', {
            username: $('#form_reg [name=username]').val(),
            password: $('#form_reg [name=password]').val()
        },
            function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg('注册成功，请登录')
                //模拟人的点击行为
                $('#link_login').click()
            })
    });

    //监听登录表单的提交事件
    $('#form_login').submit(function (e) {
        e.preventDefault()
        $.ajax({
            url: '/api/login',
            method: 'POST',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('用户登录失败')
                }
                layer.msg('用户登录成功')
                //将登录成功得到的 token 字符串，保存到localStorage 中
                localStorage.setItem('token', res.token)
                // 跳转到后台主页
                location.href = '/index.html'
            }
        })
    });

})