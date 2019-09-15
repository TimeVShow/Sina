//单独写js文件的时候$(function())必加
$(function(){
    //监听内容的实时输入
    //实时监听的固定写法
    $("body").delegate(".comment","propertychange input",function(){
        //监听发布按钮的点击需要设置disabled的值 不然没有办法操作
        if($(this).val().length>0){
            $(".send").prop("disabled",false);
        }else{
            $(".send").prop("disabled",true);
        }
    });
    //监听发布按钮的点击
    $(".send").click(function(){
        //获取用户所输入的内容
        var $text = $(".comment").val();
        var $weibo = create_elee($text);
        $(".messegeList").prepend($weibo);
    });
    //监听顶按钮的点击
    //调用函数的时候不需要用到小括号
    $("body").delegate(".like","click",test);
    $("body").delegate(".unlike","click",function(){
        $(this).text(parseInt($(this).text())+1);
    });
    $("body").delegate(".delete","click",function(){
        //parent方法只能找到父元素，想要找到指定的父元素，只有用parents方法
        $(this).parents(".info").remove();
    });
    //创建发布内容的节点
    function create_elee(text){
        var time = formatTime();
        var $weibo = $("<div class=\"info\">\n" +
            "            <p class=\"infoText\">\n" +
             text+
            "            </p>\n" +
            "            <p class=\"infoOperation\">\n" +
            "                <span class=\"infoTime\">"+time+"</span>\n" +
            "                <span class=\"infoHandle\">\n" +
            "                        <a href=\"javascript:;\" class=\"like\">0</a>\n" +
            "                        <a href=\"javascript:;\" class=\"unlike\">0</a>\n" +
            "                        <a href=\"javascript:;\" class=\"delete\">删除</a>\n" +
            "                    </span>\n" +
            "            </p>\n" +
            "        </div>")
        return $weibo;
    };
    //拼凑时间
    function formatTime(){
        var date = new Date();
        var year = date.getFullYear();
        var month = date.getMonth();
        var day = date.getDay();
        var hour = date.getHours();
        var minutes = date.getMinutes();
        var seconds = date.getSeconds();
        var arr = [year+"-",
            month+1+"-",
            day+" ",
            hour+":",
            minutes+":",
            seconds];
        //join() 方法用于把数
        // 元素是通过指定的分组中的所有元素放入一个字符串。
        //         //隔符进行分隔的。
        return arr.join("");
    };
    function test(){
        //直接设置元素的内容的值用text方法
        $(this).text(parseInt($(this).text())+1);
    }
});