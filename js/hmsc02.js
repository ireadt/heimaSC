//hmsc02.html
// 商品块
function downTime(){
    var time=5*60*60;
    var timer=null;
    var skTime=document.querySelector('.sk_time');
    var spans=skTime.querySelectorAll('span');
    timer=setInterval(function(){
        if(time<=0){
            clearInterval(timer);
            return false;
        }
        time --;

        var h=Math.floor(time/3600);
        var m=Math.floor(time%3600/60);
        var s=time%60;
        console.log(h);
        console.log(m);
        console.log(s);
        spans[0].innerHTML=Math.floor(h/10);
        spans[1].innerHTML=h%10;
        spans[3].innerHTML=Math.floor(m/10);
        spans[4].innerHTML=m%10;
        spans[6].innerHTML=Math.floor(s/10);
        spans[7].innerHTML=s%10;
    },1000);
}
// 左侧栏
window.onload=function(){
    leftSwipe();
    itcast.iScroll({
        swipeDom:document.querySelector('.hm_category_right'),
        swipeType:'y',
        swipeDistance:100
    });
};
function leftSwipe(){
    var parentBox=document.querySelector('.hm_category_left');
    var childBox=parentBox.querySelector('ul');
    var parentHeight=parentBox.offsetHeight;
    var childHeight=childBox.offsetHeight;

    var maxPosition=0;
    var minPosition=parentHeight=childHeight;
    var distance=150;

    var maxSwipe=maxPosition+150;
    var minSwipe=minPosition-150;

    var addTransition=function(){
        childBox.style.webkitTransition="all .2s";
        childBox.style.transition="all .2s";
    };

    var removeTransition=function(){
        childBox.style.webkitTransition="none";
        childBox.style.transition="none";
    };
    var setTranslateY=function(translateY){
        childBox.style.webkitTransition="translateY("+translateY+"px)";
        childBox.style.transition="translateY("+translateY+"px))";
    };
    var startY=0;
    var move=0;
    var distanceY=0;

    var currY=0;
    childBox.addEventListener('touchstart',function(e){
        startY=e.touches[0].clientY;
    });
    childBox.addEventListener('touchmove',function(e){
       moveY=e.touches[0].clientY;
       distanceY=movey-startY;
       if((currY+distanceY)<maxSwipe&&(currY+distanceY)>minSwipe){
           removeTransition();

           setTranslateY(currY+distanceY);
       }
    });
    window.addEventListener('touchend',function(e){
        if((currY+distanceY)>maxPosition){
            currY=maxPosition;
            this.addTransition();
            setTranslateY(currY);
        }
        else if((curry+distanceY)<minPosition){
            currY=minPosition;
            addTransition();
            setTranslateY(currY);
        }
        else{
            currY=currY+distanceY;
        }
        startY=0;
        moveY=0;
        distanceY=0;
    });
    var lis=childBox.querySelectorAll('li');
    itcast.tap(childBox,function(e){
        for(var i=0;i<lis.length;i++){
            lis[i].className="";
            lis[i].index=i;
        }
        var li=e.target.parentNodt;
        li.className='now';
        console.log(li.index);
        var translateY=-li.index*50;

        if(translateY>minPosition){
            currY=translateY;
            addTransition();
            setTranslateY(currY);
        }
        else{
            currY=minPosition;
            addTransition();
            setTranslateY(currY);
        }
    });
}