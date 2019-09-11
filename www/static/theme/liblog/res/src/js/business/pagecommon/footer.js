/**
 * Created by saucxs on 2017/10/8.
 */
$(window).scroll(function() {
    if ($(this).scrollTop() != 0) {
        $('#back-top').fadeIn();
    } else {
        $('#back-top').fadeOut();
    }
});

var chatRobotFlag = false;
$(document).on('click',function(e){
    $('.chat-room').fadeOut();
    chatRobotFlag = !chatRobotFlag;
});
$('.chat-room').on('click',function(e){
    e.stopPropagation();
});

$("#chat-robot").on('click', function(e) {
    e.stopPropagation();
    if(!chatRobotFlag){
        $('.chat-room').fadeIn();
        $('.robot-time').text(toNomalTime(new Date().getTime()));
    }else{
        $('.chat-room').fadeOut();
    }
    chatRobotFlag = !chatRobotFlag;
})

function toNomalTime(item){
    var date = new Date(parseInt(item));
    var Y = date.getFullYear() + '-';
    var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
    var D = date.getDate() + ' ';
    var h = (date.getHours()<10?'0'+date.getHours(): date.getHours()) + ':';
    var m = (date.getMinutes()<10?'0'+date.getMinutes(): date.getMinutes()) + ':';
    var s = (date.getSeconds()<10?'0'+date.getSeconds(): date.getSeconds());
    return Y+M+D+h+m+s;
}

$(".input-box").keydown(function(event){
    if(event.keyCode === 13){
        sendMessage()
    }
})
$(".input-box").keyup(function(event){
    var message = $(".input-box").val();
    if(message.trim() !== ''){
        $(".chat-room .input-box").removeClass("tip-input")
    }else{
        $(".chat-room .input-box").addClass("tip-input")
    }
})

function sendMessage(){
    var message = $(".input-box").val();
    var newData = {
        message: message,
        __CSRF__: G_csrf
    }
    if(message.trim() !== ''){
        var html_div = '        <div class="section-box-you">\n' +
            '            <div>\n' +
            '                <div>\n' +
            '                    <span class="robot-time">'+ toNomalTime(new Date().getTime()) +'</span>\n' +
            '                    <span class="robot-name">大佬007</span>\n' +
            '                </div>\n' +
            '                <div class="word-content">' + message + '</div>\n' +
            '            </div>\n' +
            '            <a class="section-icon" href="/login.html">\n' +
            '                <svg class="icon" aria-hidden="true">\n' +
            '                    <use xlink:href="#iconniu"></use>\n' +
            '                </svg>\n' +
            '            </a>\n' +
            '        </div>';
        $(".section").append(html_div);
        $.ajax({
            url: '/robot/index/robotchat',
            data: newData,
            type: 'POST',
            success: function (json) {
                var html_div = '        <div class="section-box">\n' +
                    '            <a class="section-icon" href="https://github.com/saucxs/chat-robot" target="_blank">\n' +
                    '                <svg class="icon" aria-hidden="true">\n' +
                    '                    <use xlink:href="#iconrobot"></use>\n' +
                    '                </svg>\n' +
                    '            </a>\n' +
                    '            <div>\n' +
                    '                <div>\n' +
                    '                    <span class="robot-name">' + json.user + '</span>\n' +
                    '                    <span class="robot-time">'+ toNomalTime(new Date().getTime()) +'</span>\n' +
                    '                </div>\n' +
                    '                <div class="word-content">' + json.data + '</div>\n' +
                    '            </div>\n' +
                    '        </div>';
                $(".section").append(html_div);
                $(".section").animate({ scrollTop: $(document).height() }, 1000);
                $(".input-box").val("");
                $(".chat-room .input-box").removeClass("tip-input")
            }
        })
    }else{
        $(".chat-room .input-box").addClass("tip-input")
    }
}
$("#send-message").on('click', function () {
    sendMessage()
})

// 获取github star数
$.ajax({
    url: 'https://api.github.com/repos/saucxs/nodeJSBlog',
    type: 'GET',
    success: function(json) {
        if (json) {
            $("#gitcount").html(json.stargazers_count);
        }
    }
})
$("#back-top").on("click", function() { $("html,body").animate({ scrollTop: "0" }), 1000})
    //搜索
$(".search-show").on('click', function() {
    $(".site-search").toggleClass('active')
    $(this).find(".fa-search").toggleClass('fa-remove');
})
$(".collect_btn").bind('click', function() {
    var _this = $(this);
    var link = window.location.pathname;
    var newData = {
        url: link,
        title: $("#article-title").html(),
        author: $("#loginname").val(),
        flag: _this.attr("flag"),
        cid: _this.attr("cid"),
        createtime: new Date(),
        type: _this.attr("itype"),
        aid: _this.attr("aid"),
        __CSRF__: G_csrf
    }
    $.ajax({
        url: '/personal/index/savecollect',
        data: newData,
        type: 'POST',
        success: function(json) {
            if (json.errno === 0) {
                if (json.data.status === 0) {
                    _this.attr("cid", "");
                    _this.removeClass("cancel");
                    _this.val("收藏");
                } else if (json.data.status === 1) {
                    _this.attr("cid", json.data.cid);
                    _this.addClass("cancel");
                    _this.val("取消收藏");
                }

            } else {
                alert(json.errmsg)
            }
        }
    })
})

// 个人头像下来效果
$('#nav-tabs').delegate('li', 'click', function() {
    var _this = $(this);
    var pid = _this.attr('pid');
    $('#nav-tabs').find('li').removeClass('active');
    $('.tab-pane').removeClass('active');
    $('.tab-pane').hide();
    _this.addClass('active');
    $('#' + pid).show();
})
$("#userInfo").on('mouseover', function() {
    $("#userMenu").show();
})
$("#userInfo").on('mouseout', function() {
        $("#userMenu").hide();
    })
/* 右侧tab切换*/
var otb = document.getElementById("tb");
if (otb) {
    var oLi = document.getElementById("tb").getElementsByTagName("li");
    var oUl = document.getElementById("tb-main").getElementsByTagName("div");
    for (var i = 0; i < oLi.length; i++) {
        oLi[i].index = i;
        oLi[i].onmouseover = function() {
            for (var n = 0; n < oLi.length; n++)
                oLi[n].className = "";
            this.className = "cur";
            for (var n = 0; n < oUl.length; n++)
                oUl[n].style.display = "none";
            oUl[this.index].style.display = "block";
        }
    }
}

/*二维码显示*/
$("#wechatIcon").on('click', function() {
    console.log($('#wechat').css('display'), '-=-=-=-=-=-')
    if( $('#wechat').css('display') === 'block'){
        $('#wechat').hide();
    }else{
        $('#wechat').show();
    }
})

/*判断当前浏览器类型和版本*/
function browserCheck() {
    var userAgentString = window.navigator && window.navigator.userAgent || this.http && this.http.userAgent() || '',
        match2 = userAgentString.match(/Android|BlackBerry|iPhone|iPad|iPod|IEMobile|Mobile/);
    var browsers = [
        ['Edge', /Edge\/([0-9\._]+)/],
        ['Yandexbrowser', /YaBrowser\/([0-9\._]+)/],
        ['Chrome', /(?!Chrom.*OPR)Chrom(?:e|ium)\/([0-9\.]+)(:?\s|$)/],
        ['Crios', /CriOS\/([0-9\.]+)(:?\s|$)/],
        ['Firefox', /Firefox\/([0-9\.]+)(?:\s|$)/],
        ['Opera', /Opera\/([0-9\.]+)(?:\s|$)/],
        ['Opera', /OPR\/([0-9\.]+)(:?\s|$)$/],
        ['IE', /Trident\/7\.0.*rv\:([0-9\.]+)\).*Gecko$/],
        ['IE', /MSIE\s([0-9\.]+);.*Trident\/[4-7].0/],
        ['IE', /MSIE\s([6-8]\.0)/],
        ['bb10', /BB10;\sTouch.*Version\/([0-9\.]+)/],
        ['Android', /Android\s([0-9\.]+)/],
        ['IOS', /Version\/([0-9\._]+).*Mobile.*Safari.*/],
        ['Safari', /Version\/([0-9\._]+).*Safari/],
        ['UCBrowser', /UCBrowser\/([0-9\._]+)/]
    ];
    var check = {};
    for (var i = 0; i < browsers.length; i++) {
        if (browsers[i][1].test(userAgentString)) {
            var match = browsers[i][1].exec(userAgentString);
            var version = match && match[1].split(/[._]/).slice(0, 3);
            if (version.length < 3) {
                version.length = 3;
                version[2] = 0
            }
            check = {
                browser: browsers[i][0],
                version: version[0],
                mobile: browsers[i][0] == 'Android' || browsers[i][0] == 'IOS' || browsers[i][0] == 'bb10' || (match2 && match2[0]) || false
            }
        }
    }
    return check
}
var currentBrowser = browserCheck();
var bigTitle = document.getElementById('big-title');
var span = bigTitle.getElementsByTagName('span')[0];
var mask = document.getElementById('mask');
var upgradeContent = document.getElementById('upgradeContent');
if (currentBrowser.mobile) {
    console.log('当前是移动端');
    $('#wechatIcon').fadeIn();
    $('#wechat').fadeOut();
} else if( (currentBrowser.browser == "Chrome" && currentBrowser.version < 40) ||
    (currentBrowser.browser == "Firefox" && currentBrowser.version < 50) ||
    (currentBrowser.browser == "IE" && currentBrowser.version < 10) ||
    (currentBrowser.browser == "Safari" && currentBrowser.version < 11)
){
    // 显示“当前浏览器的类型（currentBrowser.browser）和版本（currentBrowser.version）”
    mask.style.display = 'block';
    upgradeContent.style.display = 'block';
    span.innerHTML = currentBrowser.browser + currentBrowser.version;
} else{
    //支持的浏览器类型，正常显示
    $('#wechatIcon').fadeIn();
    $('#wechat').fadeOut();
    mask.style.display = 'none';
    upgradeContent.style.display = 'none';

}



