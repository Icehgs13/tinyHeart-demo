//海葵
var aneObj = function(){
    //start point, control point, end point(sin)
    this.rootx = [];//定义海葵的x位置
    this.headx = [];
    this.heady = [];
    this.amp = [];
    this.alpha = 0;
    // this.len = [];//定义海葵的高度
}
//设置数量是50
aneObj.prototype.num = 50;

aneObj.prototype.init = function(){
    for (var i = 0; i < this.num; i++){

        this.rootx[i] = i * 16 + Math.random() * 20;//random返回0-1之间的值
        this.headx[i] = this.rootx[i];
        this.heady[i] = canHeight - 250 + Math.random() * 50;
        this.amp[i] = Math.random() * 50 +50;
        // this.len[i] = 200 + Math.random() * 50;
    }
}

//绘制海葵
aneObj.prototype.draw = function()
{
    this.alpha += deltaTime * 0.0008;
    var l = Math.sin(this.alpha); // -1 到 1之间
    ctx2.save();
    ctx2.globalAlpha = "0.6";
    ctx2.lineWidth = 20;
    ctx2.strokeStyle = "#3b154e";
    ctx2.lineCap = "round";
    for (var i = 0; i < this.num; i++)
    {
        //beginPath, moveTo, lineTo, stroke, strokeStyle, lineWidth, lineCap, globalAlpha
        ctx2.beginPath();
        ctx2.moveTo(this.rootx[i], canHeight);
        // ctx2.lineTo(this.rootx[i], canHeight - this.len[i]);
        this.headx[i] = this.rootx[i] + l * this.amp[i];
        ctx2.quadraticCurveTo(this.rootx[i],canHeight - 100, this.headx[i],this.heady[i]);
        ctx2.stroke();

    }
    ctx2.restore();
}