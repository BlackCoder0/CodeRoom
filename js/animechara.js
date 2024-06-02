//此处添加文本
n_msgs = ["疯狂戴夫的“花哨小玩意”正式营业了！",
    "看看我的小店！你会注意到我进了些新货！", 
    "嗯，好吧，希望你能活过今晚！",
    "伙计，那些僵尸还在源源不断的来袭啊！",
    "你赢得了这份至高的荣誉，现在我把禅境花园赠与你！",
    "祝你玩得愉快！",
    "你好，我的邻居！<br>我的名字叫疯狂的戴夫。<br>但你叫我疯狂的戴夫就行了。",
    "呃，你还等什么呢？",
    ];
jQuery(document).ready(function(){
        if(isPC()&&(!checkClosed())){
            var $node = $("<div class='animechara'><span class='message' id='message'>博士，能再见到您......真是太好了。今后我们同行的路还很长，所以，请您多多关照！</span><div class='chara'></div></div>")
            //防止重载
            if($('.animechara').length<=0){
                $(".game-bg").after($node);
            }
            randchat();
            var autoloop = setInterval(randchat,15000);
    }
    $(".chara").click(function() {    
        randchat();
    });
});
/*
jQuery(document).ready(function(){
    $(".chara").mousedown(function(e) {
        if (e.which == 3) {
            randchat(1);
        }
    });
});
*/
jQuery(document).ready(function(){
    var _move = false;
    var ismove = false; //移动标记
    var _x, _y; //鼠标离控件左上角的相对位置
    $(".animechara").mousedown(function(e) {
        _move = true;
        _x = e.pageX - parseInt($(".animechara").css("left"));
        _y = e.pageY - parseInt($(".animechara").css("top"));
    });
    $(document).mousemove(function(e) {
        if (_move) {
            var x = e.pageX - _x;
            var y = e.pageY - _y;
            var wx = $(window).width() - $('.animechara').width();
            var dy = $(document).height() - $('.animechara').height();
            if (x >= 0 && x <= wx && y > 0 && y <= dy) {
                $(".animechara").css({
                    top: y,
                    left: x
                }); //控件新位置
                ismove = true;
            }
        }
    }).mouseup(function() {
        _move = false;
    });
});

function showMessage(a, b) {
	// 持续时间
    if (b == null) b = 8000;
    $("#message").hide().stop();
    $("#message").html(a);
    $("#message").fadeIn();
    $("#message").fadeTo("1", 1);
    $("#message").fadeOut(b);
};
var facenum = 5;
function setface(a) {
    $(".chara").removeClass().addClass("chara");
    /*
    switch(a){
        case 1: $(".chara").removeClass().addClass("chara chara1"); break;
        //case 2: $(".chara") break;
        case 3: $(".chara").removeClass().addClass("chara chara2"); break;
        case 4: $(".chara").removeClass().addClass("chara chara3"); break;
        default:break;
    } 
    */
}
//默认随机聊天
function randchat(b) {
   if(b==null){
    var i = Math.floor(Math.random() * n_msgs.length);
    showMessage(n_msgs[i]);
   }else{
    setface(parseInt(Math.random() * facenum))
    }
  }

  function isPC(){
    var UserAgent = navigator.userAgent.toLowerCase();
    var isiPad = UserAgent.match(/ipad/i) == "ipad";
    var isiPhone = UserAgent.match(/iphone os/i) == "iphone os";
    var isUc = UserAgent.match(/ucweb/i) == "ucweb";
    var isAndroid = UserAgent.match(/android/i) == "android";
    var iswechat = UserAgent.match(/MicroMessenger/i) == "micromessenger";
    if(!(isAndroid||isUc||isiPad||isiPhone||iswechat))
        return true;
    else
        return false;
  }
//检查Cookie取反
  function checkClosed(){
      if(document.cookie.length>0){
      var varible = "animecharaisclosed"+"=";
      var decodedCookie = decodeURIComponent(document.cookie);
      var tmp = decodedCookie.split(';');
      var s;
      for(i=0;i<tmp.length;i++){
          var a = tmp[i];
          while(a.charAt(0)==''){
              a=a.substring(1);
          }
          if(a.indexOf(varible)==0){
              s=a.substring(varible.length,a.length);
          }
      }
    }else{
        return false;
    }
      if(s==="true")
        return true;
      else
        return false;
  }
$('#btn_closeanimechara').click(function animeClosed(){
      document.cookie = "animecharaisclosed=true";
      console.log("模块:看板娘:看板娘已在该生命周期关闭，重新启动浏览器可重新加载");
      window.location.close()
  });
$('#btn_reloadanimechara').click(function(){
    document.cookie = "animecharaisclosed=false";
    console.log("模块:看板娘:看板娘已重新启动，页面即将刷新");
    window.location.reload()
});
