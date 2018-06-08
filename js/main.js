var can1;
var can2;

var canWidth;
var canHeight;

var ctx1;
var ctx2;

var lastTime;
var deltaTime;

//定义背景图
var bgPic = new Image();

//定义海葵,果实,大鱼
var ane;
var fruit;
var mom;
var baby;

//定义鼠标位置
var mx;
var my;

//定义小鱼尾巴的序列帧
var babyTail = [];

//定义小鱼眨眼睛数组
var babyEye = [];

//定义一个小鱼身体的数组
var babyBody = [];

//同理定义大鱼的尾巴,眼睛,身体
var momTail = [];
var momEye = [];
var momBodyOrange = [];
var momBodyBlue = [];

var data;

var wave;
var helo;

var dust;//定义漂浮物
var dustPic = [];//定义漂浮物图片数组


//body加载完了就执行game这个函数,game就是入口
document.body.onload = game;
function game(){
    init();
    lastTime = Date.now();
    deltaTime = 0;
    gameloop();

    bgPic.src = "./src/background.jpg";
}

function init(){
    //获得canvas
    can1 = document.getElementById("canvas1");
    ctx1 = can1.getContext("2d");
    can2 = document.getElementById("canvas2");
    ctx2 = can2.getContext("2d");

    //因为大鱼在画布一上所以这里用画布一来监听鼠标移动
    can1.addEventListener('mousemove',onMouseMove, false);

    canWidth = can1.width;
    canHeight = can1.height;

    //新建海葵对象并且初始化
    ane = new aneObj();
    ane.init();

    fruit = new fruitObj();
    fruit.init();

    mom = new momObj();
    mom.init();

    baby = new babyObj();
    baby.init();

    mx = canWidth * 0.5;
    my = canHeight * 0.5;

    //小于尾巴的序列帧
    for (var i = 0; i < 8; i++){
        babyTail[i] = new Image();
        babyTail[i].src = "./src/babyTail" + i + ".png";
    }

    //小鱼眼睛
    for (var i = 0; i < 2; i++){
        babyEye[i] = new Image();
        babyEye[i].src = "./src/babyEye" + i + ".png";
    }

    //小鱼身体
    for (var  i = 0; i < 20; i++){
        babyBody[i] = new Image();
        babyBody[i].src = "./src/babyFade" + i + ".png";
    }

    //大鱼的尾巴
    for (var i = 0; i < 8; i++){
        momTail[i] = new Image();
        momTail[i].src = "./src/bigTail" + i + ".png";
    }

    //大鱼的眼睛
    for (var i = 0; i < 2; i++){
        momEye[i] = new Image();
        momEye[i].src = "./src/bigEye" + i + ".png";
    }
    //大鱼的身体


    data = new dataObj();

    for (var i = 0; i < 8; i++){
        momBodyOrange[i] = new Image();
        momBodyBlue[i] = new Image();
        momBodyOrange[i].src = "./src/bigSwim" + i + ".png";
        momBodyBlue[i].src = "./src/bigSwimBlue" + i + ".png";
    }

    //分数样式
    ctx1.font = "20px Verdana";
    ctx1.textAlign = "center";

    wave = new waveObj();
    wave.init();

    helo = new heloObj();
    helo.init();

    for (var i = 0; i < 7; i++)
    {
        dustPic[i] = new Image();
        dustPic[i].src = "./src/dust"+i+".png";
    }
    dust = new dustObj();
    dust.init();

}

function gameloop() {
    //requestAnimationFrame会根据机器的性能来觉得刷新的频率
    requestAnimationFrame(gameloop);//setInterval,setTimeout,frame per second
    var now = Date.now();
    deltaTime = now - lastTime;
    lastTime = now;
    //优化,避免出现食物过大
    if (deltaTime > 40) deltaTime = 40;


    //绘制背景,海葵
    drawBackground();
    ane.draw();
    fruitMonitor();
    fruit.draw();

    //每一次绘制需要把前边的内容清空一下,清空的大小是0,0到全画布
    ctx1.clearRect(0,0,canWidth,canHeight);
    mom.draw();
    baby.draw();

    //大鱼和食物碰撞,即吃果实的函数
    momFruitsCollision();
    //检测大鱼和小鱼的碰撞检测
    momBabyCollision();

    data.draw();

    wave.draw();

    helo.draw();

    dust.draw();
}

function onMouseMove(e)
{
    if (!data.gameOver)
    {
        if (e.offsetX || e.layerX){
            mx = e.offSetX == undefined ? e.layerX : e.offSetX;
            my = e.offSetY == undefined ? e.layerY : e.offSetY;

        }
    }

}