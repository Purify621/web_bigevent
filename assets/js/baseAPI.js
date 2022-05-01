/*  注意 每次调用 $.get() $.post() $.ajax() 的时候
    会先调用 ajaxPrefilter 这个函数
    在这个函数中，可以拿到我们个ajax的配置对象
    优化请求路径
*/
$.ajaxPrefilter(function (options) {
  options.url = "http://www.liulongbin.top:3007" + options.url;
});
