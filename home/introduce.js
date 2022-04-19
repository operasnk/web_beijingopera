
$(function () {
    //wow动画插件启动
    if($(".wow").length) {
        // 启动wow插件列表页鼠标移动到元素时产生css动画的插件
        var wow = new WOW({
            boxClass: 'wow',
            animateClass: 'animated',
            offset: 0,
            mobile: true,
            live: true
        });
        wow.init();
    }
});
//两种加载后执行的方法，我选择全部元素全部加载后执行
window.onload=function(){

    //首页的轮播部分
    if($(".index_side_box").length){
        var time=120;
        var side_box = $(".index_side_box");
        var slide_one = $(".ul_one");
        var slide_two = $(".ul_two");

        //如果首页盒子宽度大于轮播的盒子宽度执行循环移动方法
        //console.log(slide_one.innerWidth());
        if(slide_one.innerWidth()>side_box.innerWidth()){

            slide_two.html(slide_one.html());
            /*文章左移*/
            function Marquee(){
                if(side_box.scrollLeft() >= slide_one.width()){
                    side_box.scrollLeft(0);
                }
                else{
                    side_box.scrollLeft(side_box.scrollLeft()+1);
                }
            }

            /*文章左移*/
            //两秒后调用
            var sliding=setInterval(Marquee,time)
            side_box.hover(function() {
                //鼠标移动DIV上停止
                clearInterval(sliding);
            },function(){
                //离开继续调用
                sliding=setInterval(Marquee,time);
            });
        }
    }
    //页面获得随机数修改背景图片
    random_bg_pic();
    function random_bg_pic(){
        //console.log(Math.floor(Math.random()*10)+1);
        var index=Math.floor(Math.random()*12)+1;
        //console.log(index+'.png');
        var url='url(img/bg_pic/bg_'+index+'.png)';
        //console.log('url(../img/'+index+'.png)');
        $(".bg_pic").css('background-image',url);
    }

};


























