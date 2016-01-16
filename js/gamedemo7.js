var canvas;
var over = 0;
var jikiOpacity,tekiopacity;


function setup(){
  canvas = createCanvas(window.innerWidth,
                        window.innerHeight);
  canvas.canvas.style.height = null;
  canvas.canvas.style.width = null;
  colorMode(RGB,256);
  rock = loadImage("picture/rock2.gif");
  block = loadImage("picture/block.gif");
  shibahu = loadImage("picture/sibahu.gif");
  goal1 = loadImage("picture/goal2.gif");//http://free-illustrations.gatag.net/tag/%E5%85%A5%E3%82%8A%E5%8F%A3
  water = loadImage("picture/water2.gif");
  keyw = loadImage("picture/keyinwater3.gif");
  locked = loadImage("picture/locked.gif");
  warp1 = loadImage("picture/warp2.gif");
  goal2 = loadImage("picture/goalw.gif")
}

function draw() {
  field();    //フィールドを描画
  drawjiki();   //自機の描画
  timecount();  //敵の移動のためのカウント。敵の動きを管理
  warp(jiki[h][0],jiki[h][1]);
  gameover();   //ゲームオーバーか判定
  istouchedteki();    //敵に追いつかれたか判定
  goal(jiki[h][0],jiki[h][1]);   //ゴールに到達したかどうか判定
  changepage();
}

//フィールド三次配列
var fieldarray = new Array();
fieldarray = [
  [
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1,0,0,0,0,0,1,1,1,1,1,1,1,1,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,1,1,1,1,1,1,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,1],
    [1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,1],
    [1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1],
    [1,1,1,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1],
    [1,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,1,1,1,1,1,1,0,0,0,0,0,0,0,1,1,1,1,1,1,0,0,0,0,0,0,1,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,1,1,1,1,1,1,1,0,0,0,0,0,1,1,1,1,1,1,1,1,1,0,0,0,0,1,1,1,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,1,1,1,1,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,0,0,0,0,1,1,1,1,1,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,1,1,1,1,1,1,0,0,0,0,0,0,1,1,1,1,1,1,1,1,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,1,1,1,1,1,1,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,0,0,1],
    [1,1,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,1,1,1,1,1,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,0,0,1],
    [1,1,1,1,0,0,0,0,0,0,0,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,0,0,0,0,0,0,0,1],
    [1,1,1,1,1,1,0,0,0,0,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,0,0,0,0,0,0,1],
    [1,1,1,1,1,1,1,0,0,0,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,0,0,0,0,0,1],
    [1,1,1,1,1,1,1,1,0,0,0,1,1,1,1,1,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,0,0,0,0,1],
    [1,1,1,1,1,1,1,1,1,0,0,0,1,1,1,0,0,0,0,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,0,0,0,1],
    [1,1,1,1,1,1,1,1,1,0,0,0,0,1,0,0,0,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1],
    [1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1],
    [1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,1,1,1,1,1,1,0,0,0,0,0,1,1,1,1,1,1,1,0,0,0,1,0,0,0,0,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,1,1,1,1,1,1,1,0,0,0,0,0,0,1,1,1,1,1,0,0,0,1,1,1,0,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
  ],[
    [4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4],
    [4,3,3,3,22,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,3,4,4,4,4,4,4,4,10,3,3,3,3,3,4],
    [4,3,3,3,3,4,4,4,4,4,4,4,3,3,3,3,3,3,3,3,3,3,3,3,3,4,4,4,4,4,4,4,4,4,3,3,3,4,4,4,4,4,4,3,3,3,3,3,3,4],
    [4,3,3,3,3,4,4,4,4,4,4,4,34,3,3,3,3,3,3,3,3,3,3,3,3,4,4,4,4,4,4,4,4,3,3,3,3,3,4,4,4,4,4,4,4,4,4,3,3,4],
    [4,3,3,3,3,4,4,4,4,4,4,4,3,3,3,3,3,3,3,3,3,3,3,3,3,4,4,4,4,4,4,4,17,3,3,3,3,3,18,4,4,4,4,4,4,4,4,3,3,4],
    [4,3,3,3,3,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,3,3,3,3,3,3,3,3,3,3,3,4,4,3,3,3,3,3,4,4,4,4,4,4,4,4,4,3,3,4],
    [4,3,3,3,3,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,3,3,3,3,3,3,3,3,3,3,35,4,4,4,3,3,3,4,4,4,4,4,4,4,4,4,4,4,4,4],
    [4,23,3,3,3,4,4,4,4,3,3,3,3,3,3,3,3,3,32,4,3,3,3,3,3,3,3,3,3,3,3,4,4,4,4,3,4,4,4,4,4,4,4,4,4,4,4,4,4,4],
    [4,4,4,4,4,4,4,4,4,3,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4],
    [4,4,4,4,4,4,4,4,4,3,4,4,29,3,3,3,4,4,11,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4],
    [4,4,4,4,4,4,4,4,4,3,4,4,3,3,3,3,4,4,3,4,27,3,3,3,3,3,3,3,3,3,3,3,4,4,4,4,4,4,4,4,4,4,3,3,3,16,4,4,4,4],
    [4,4,3,3,3,3,3,4,4,3,4,4,3,3,3,3,4,4,3,4,4,4,4,4,4,4,4,4,4,4,4,3,4,4,4,4,4,4,4,4,3,3,3,3,4,4,4,4,4,4],
    [4,4,3,4,4,4,3,4,4,3,4,4,3,3,3,3,4,4,3,4,4,4,4,4,4,4,4,4,4,4,4,3,4,4,4,4,4,4,3,3,3,3,4,4,4,4,4,4,4,4],
    [4,4,3,3,4,3,3,4,4,3,4,4,3,3,3,3,4,4,3,4,4,3,3,3,3,3,3,4,4,4,4,3,4,4,4,4,3,3,3,3,4,4,4,4,4,4,4,4,4,4],
    [4,4,3,3,4,3,3,4,4,3,4,4,3,3,3,3,4,4,3,4,4,3,3,3,3,3,3,4,4,4,4,3,4,3,3,3,3,3,4,4,4,4,4,4,4,4,4,4,4,4],
    [4,4,3,14,4,13,3,4,4,3,4,4,3,3,3,3,4,4,3,4,4,3,3,3,3,7,3,4,4,4,4,3,4,4,4,4,3,3,3,3,4,4,4,4,4,4,4,4,4,4],
    [4,4,4,4,4,4,4,4,4,3,4,4,3,3,3,3,4,4,3,4,4,3,3,3,3,3,3,4,4,4,4,3,4,4,4,4,4,4,3,3,3,3,4,4,4,4,4,4,4,4],
    [4,4,3,19,4,3,3,4,4,3,4,4,3,3,3,3,4,4,3,4,4,4,4,4,4,4,4,4,4,4,4,3,4,4,4,4,4,4,4,4,3,3,3,3,4,4,4,4,4,4],
    [4,4,3,3,4,3,3,4,4,3,4,4,3,3,3,3,4,4,3,4,4,4,4,4,4,4,4,4,4,4,4,3,4,4,4,4,4,4,4,4,4,4,3,3,3,15,4,4,4,4],
    [4,4,3,3,4,3,3,4,4,33,4,4,30,3,3,31,4,4,3,4,28,3,3,3,3,3,3,3,3,3,3,3,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4],
    [4,4,3,4,4,4,3,4,4,4,4,4,4,4,4,4,4,4,3,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4],
    [4,4,3,3,3,3,3,4,4,12,3,3,3,3,3,3,3,3,3,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4],
    [4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,3,3,3,25,4,4,4,3,3,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4],
    [4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,3,3,3,3,4,4,4,3,3,4,4,4,4,20,3,3,3,3,3,3,3,3,3,4,4,4],
    [4,4,4,4,4,4,4,4,4,4,4,3,3,3,4,4,4,3,3,3,3,3,3,3,3,3,3,3,4,4,4,3,3,4,4,4,4,3,3,3,3,3,3,3,3,3,3,4,4,4],
    [4,3,3,3,3,3,3,8,4,4,4,3,3,3,4,4,4,3,3,3,3,3,3,3,3,3,3,3,4,4,4,3,3,4,4,4,4,3,3,3,3,3,3,3,3,3,3,4,4,4],
    [4,3,3,3,3,3,3,3,4,4,4,3,3,3,4,4,4,3,3,3,3,3,3,3,3,3,3,3,4,4,4,3,3,4,4,4,4,3,3,3,3,3,3,3,3,3,3,4,4,4],
    [4,3,3,3,3,3,3,3,4,4,4,3,3,24,4,4,4,4,4,4,4,4,4,4,3,3,3,3,4,4,4,3,3,4,4,4,4,21,3,3,3,3,3,3,3,3,3,4,4,4],
    [4,3,3,3,3,3,3,9,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,3,3,3,26,4,4,4,3,3,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4],
    [4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4]
  ],[
    [4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4],
    [4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,3,3,4,4,3,3,3,3,3,3,4,3,3,3,34,3,3,4,4],
    [4,4,4,4,4,4,3,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,3,3,3,3,3,3,4,4,3,3,4,4,3,3,3,3,3,3,4,3,3,3,3,3,3,4,4],
    [4,4,4,4,4,3,3,3,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,3,3,3,3,3,3,3,3,3,3,4,4,3,3,4,4,3,3,4,3,3,3,3,3,3,4,4],
    [4,4,4,4,3,3,3,3,3,4,4,4,4,4,4,4,4,4,4,4,4,4,4,3,3,3,3,3,3,3,3,3,3,4,4,3,3,4,4,3,3,4,3,3,3,3,3,3,4,4],
    [4,4,4,3,3,3,3,3,3,3,4,4,4,4,4,4,4,4,4,4,4,4,4,3,3,3,3,3,3,4,4,3,3,4,4,3,3,4,4,3,3,4,4,4,3,3,4,4,4,4],
    [4,4,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,4,4,3,3,4,4,3,3,4,4,3,3,4,4,4,3,3,4,4,4,4],
    [4,4,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,4,4,3,3,4,4,3,3,4,4,3,3,4,4,4,3,3,4,4,4,4],
    [4,4,4,3,3,3,3,3,3,3,4,4,4,4,4,4,4,4,4,4,4,4,4,3,3,3,3,3,3,4,4,3,3,4,4,3,3,4,4,3,3,4,4,4,3,3,4,4,4,4],
    [4,4,4,4,3,3,3,3,3,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,3,3,4,4,3,3,4,4,3,3,4,4,4,3,3,4,4,4,4],
    [4,4,4,4,4,3,3,3,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,3,3,3,3,3,3,4,4,3,3,4,4,4,3,3,4,4,4,4],
    [4,4,4,4,4,4,3,4,4,4,3,3,3,3,3,3,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,3,3,3,3,3,3,4,4,3,3,4,4,4,3,3,4,4,4,4],
    [4,4,4,4,4,4,3,4,4,4,3,4,4,4,3,3,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,3,3,4,4,4,3,3,4,4,4,4],
    [4,4,4,4,4,4,3,4,4,4,3,4,4,4,4,3,4,3,3,3,3,3,3,3,3,3,3,4,4,4,4,4,4,4,4,4,4,4,4,3,3,4,4,4,3,3,4,4,4,4],
    [4,4,4,4,4,3,3,3,3,3,3,3,4,4,4,3,4,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,4,4,4,3,3,4,4,4,4],
    [4,4,4,4,4,3,3,4,4,4,3,3,4,4,4,3,4,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,4,4,4,3,3,4,4,4,4],
    [4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,3,4,3,3,3,3,3,3,3,3,3,3,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,3,3,4,4,4,4],
    [4,4,4,4,4,4,4,4,4,4,4,4,4,4,3,3,4,3,3,3,3,3,3,3,3,3,3,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,3,3,4,4,4,4],
    [4,4,4,3,3,3,3,3,3,3,3,3,3,3,3,3,4,4,4,4,4,4,4,3,3,3,3,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,3,3,4,4,4,4],
    [4,4,4,3,3,3,3,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,3,3,3,3,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,3,3,4,4,4,4],
    [4,4,4,3,3,3,3,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,3,3,3,3,4,4,4,4,4,4,4,4,4,4,4,4,4,3,3,4,4,4,4],
    [4,4,4,6,3,3,3,4,4,4,4,3,3,3,3,3,3,3,4,4,4,4,4,4,4,4,4,4,4,3,3,3,3,4,4,4,4,4,4,4,4,4,4,4,3,3,4,4,4,4],
    [4,4,4,4,4,4,4,4,4,4,4,3,3,3,3,3,3,3,4,4,4,4,4,3,3,3,3,4,4,4,4,3,3,3,3,4,4,4,4,4,4,4,4,4,3,3,4,4,4,4],
    [4,4,4,4,4,4,4,4,4,4,4,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,4,4,4,4,4,4,3,3,3,3,4,4,4,4,4,4,4,3,3,4,4,4,4],
    [4,3,3,3,3,3,3,3,3,4,4,3,3,3,3,3,3,3,3,3,3,3,3,3,3,7,3,4,4,4,4,4,4,4,4,3,3,3,3,3,4,4,4,4,3,3,4,4,4,4],
    [4,3,3,3,3,3,3,3,3,4,4,3,3,3,3,3,3,3,4,4,4,4,4,3,3,3,3,4,4,4,4,4,4,4,4,4,4,3,3,3,3,3,3,3,3,3,3,3,4,4],
    [4,3,3,3,3,3,3,3,3,4,4,3,3,3,3,3,3,3,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,3,3,3,3,3,3,3,3,3,4,4],
    [4,3,3,3,3,3,3,3,3,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,3,3,3,3,3,3,3,3,3,4,4],
    [4,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,4,4],
    [4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4]
  ],[
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,1,1,1,1,1,1,1,0,0,1,0,0,0,0,0,0,1,1,1,1,1,0,0,1,1,1,1,1,0,0,1,1,1,1,1,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,0,1,0,0,0,1,0,0,1,0,0,0,1,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,0,1,0,0,0,1,0,0,1,0,0,0,1,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,0,1,0,0,0,1,0,0,1,0,0,0,1,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,0,1,0,0,0,1,0,0,1,0,0,0,1,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,0,1,0,0,0,1,0,0,1,0,0,0,1,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,0,1,0,0,0,1,0,0,1,0,0,0,1,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,0,1,0,0,0,1,0,0,1,0,0,0,1,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,0,1,0,0,0,1,0,0,1,0,0,0,1,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,0,1,0,0,0,1,0,0,1,0,0,0,1,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,0,1,0,0,0,1,0,0,1,0,0,0,1,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,0,1,0,0,0,1,0,0,1,0,0,0,1,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,1,1,1,1,1,0,0,1,1,1,1,1,0,0,1,1,1,1,1,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,0,1,0,0,0,1,0,0,1,0,1,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,0,1,0,0,0,1,0,0,1,0,1,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,0,1,0,0,0,1,0,0,1,0,1,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,0,1,0,0,0,1,0,0,1,0,1,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,0,1,0,0,0,1,0,0,1,0,0,1,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,0,1,0,0,0,1,0,0,1,0,0,1,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,0,1,0,0,0,1,0,0,1,0,0,1,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,0,1,0,0,0,1,0,0,1,0,0,1,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,0,1,0,0,0,1,0,0,1,0,0,1,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,0,1,0,0,0,1,0,0,1,0,0,0,1,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,0,1,0,0,0,1,0,0,1,0,0,0,1,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,1,1,1,1,1,1,1,0,0,1,1,1,1,1,0,0,1,1,1,1,1,0,0,1,0,0,0,1,0,0,1,0,0,0,1,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
  ]
];


var h,i,j;
h = 0;
function field() {
  for (var i = 0; i < 30; i++) {
    for (var j = 0; j < 50; j++) {
      if (fieldarray[h][i][j] == 1) {
        image(rock,j*25,i*25);
      }else if(fieldarray[h][i][j] == 2){
        image(goal1,j*25,i*25);
      }else if (fieldarray[h][i][j] == 3) {
        image(water,j*25,i*25);
      }else if (fieldarray[h][i][j] == 4) {
        image(block,j*25,i*25);
      }else if (fieldarray[h][i][j] == 5) {
        image(warp1,j*25,i*25);
      }else if (fieldarray[h][i][j] == 6) {
        image(keyw,j*25,i*25);
      }else if (fieldarray[h][i][j] == 7) {
        image(goal2,j*25,i*25);
      }else if (fieldarray[h][i][j] == 34) {
        image(locked,j*25,i*25);
      }else if (fieldarray[h][i][j] >= 8) {
        image(warp1,j*25,i*25);
      }else {
        image(shibahu,j*25,i*25);
      }
    }
  }
}

//キー押された時の動作をそれぞれ指定
function keyPressed() {
  if (keyCode === UP_ARROW || keyCode === DOWN_ARROW || keyCode === LEFT_ARROW || keyCode === RIGHT_ARROW) {
    movejiki();
  }
}

//〜自機について〜
var jiki = new Array();
//jiki = [[200,450],[25,625],[1000,675],[625,350]];
jiki = [[25,700],[25,625],[300,525],[150,525]];
jikiOpacity = 256;
function drawjiki() {
  fill(256,100,100,jikiOpacity);
  noStroke();
  rect(jiki[h][0],jiki[h][1],25,25);
}
function movejiki() {
  if (keyCode === UP_ARROW) {
    jiki[h][1] = atariup(jiki[h][0],jiki[h][1]);
  }
  if (keyCode === DOWN_ARROW) {
    jiki[h][1] = ataridown(jiki[h][0],jiki[h][1]);
  }
  if (keyCode === LEFT_ARROW) {
    jiki[h][0] = atarileft(jiki[h][0],jiki[h][1]);
  }
  if (keyCode === RIGHT_ARROW) {
    jiki[h][0] = atariright(jiki[h][0],jiki[h][1]);
  }
}


//〜敵機について〜
//〜敵についてのデータ配列〜
var teki = new Array();
teki = [
        [[25,100],[1100,650],[25,600],[1000,300]],
        [[0,0],[0,0],[0,0],[0,0]],
        [[25,100],[1200,400],[25,600],[900,300]],
        [[0,0],[0,0],[0,0],[0,0]]
       ];
tekiopacity = 256;

function drawteki() {
  if (h == 1 || h == 3) {
    tekiopacity = 0;
  }
  fill(256,256,50,tekiopacity);
  noStroke();
  for (var i = 0; i < 4; i++) {
    rect(teki[h][i][0],teki[h][i][1],25,25);
  }
}

function moveteki() {
  for (var i = 0; i < 4; i++) {
    random = Math.floor(Math.random()*2);
    var kyoriX,kyoriY;
    kyoriX = kyori(teki[h][i][0],jiki[h][0]);
    kyoriY = kyori(teki[h][i][1],jiki[h][1]);
    if (kyoriX < kyoriY && teki[h][i][1]<= jiki[h][1]) {
      teki[h][i][1] = ataridown(teki[h][i][0],teki[h][i][1]);
    }else if (kyoriX < kyoriY && jiki[h][1] <= teki[h][i][1]) {
      teki[h][i][1] = atariup(teki[h][i][0],teki[h][i][1]);
    }else if (kyoriY < kyoriX && teki[h][i][0] <= jiki[h][0]) {
      teki[h][i][0] = atariright(teki[h][i][0],teki[h][i][1]);
    }else if (kyoriY < kyoriX && jiki[h][0] <= teki[h][i][0]) {
      teki[h][i][0] = atarileft(teki[h][i][0],teki[h][i][1]);
    }else if (kyoriX == kyoriY) {
      if (random == 0 && teki[h][i][1] <= jiki[h][1]) {
        teki[h][i][1] = ataridown(teki[h][i][0],teki[h][i][1]);
      }else if (random == 0 && jiki[h][1] <= teki[h][i][1]) {
        teki[h][i][1] = atariup(teki[h][i][0],teki[h][i][1]);
      }else if (random == 1 && teki[h][i][0] <= jiki[h][0]) {
        teki[h][i][0] = atariright(teki[h][i][0],teki[h][i][1]);
      }else if (random == 1 && jiki[h][0] <= teki[h][i][0]) {
        teki[h][i][0] = atarileft(teki[h][i][0],teki[h][i][1]);
      }
    }
  }
}

function moveteki2() {
  for (var i = 0; i < 4; i++) {
    random = Math.floor(Math.random()*2);
    var kyoriX,kyoriY;
    kyoriX = kyori(teki[h][i][0],jiki[h][0]);
    kyoriY = kyori(teki[h][i][1],jiki[h][1]);
    kyuoriU = EuclideanDistance(jiki[h][0],jiki[h][1],teki[h][i][0],teki[h][i][1]) //敵と自機のユークリッド距離
    if (kyuoriU < 50) {　　//ユークリッド距離が600になったら動き出す。
      if (kyoriX < kyoriY && teki[h][i][1]<= jiki[h][1]) {
        teki[h][i][1] += 25;
      }else if (kyoriX < kyoriY && jiki[h][1] <= teki[h][i][1]) {
        teki[h][i][1] -= 25;
      }else if (kyoriY < kyoriX && teki[h][i][0] <= jiki[h][0]) {
        teki[h][i][0] += 25;
      }else if (kyoriY < kyoriX && jiki[h][0] <= teki[h][i][0]) {
        teki[h][i][0] -= 25;
      }else if (kyoriX == kyoriY) {
        if (random == 0 && teki[h][i][1] <= jiki[h][1]) {
          teki[h][i][1] += 25;
        }else if (random == 0 && jiki[h][1] <= teki[h][i][1]) {
          teki[h][i][1] -= 25;
        }else if (random == 1 && teki[h][i][0] <= jiki[h][0]) {
          teki[h][i][0] += 25;
        }else if (random == 1 && jiki[h][0] <= teki[h][i][0]) {
          teki[h][i][0] -= 25;
        }
      }
    }
  }
}

var t = 0;
function timecount() {
  if (t > 20) {
    t = 0;
    moveteki2();
    drawteki();
  } else {
    t += 1;
    drawteki();
  }
}

//当たり判定について　上下右左専門に設置。それぞれ進める場合は指定された方向に座標を変更。
function atariup(hanteichiX,hanteichiY) {
  var hairetuX = (hanteichiX/25);
  var hairetuY = (hanteichiY/25);
  if (fieldarray[h][hairetuY - 1][hairetuX] != 1 && fieldarray[h][hairetuY - 1][hairetuX] != 4) {
    return hanteichiY -= 25;
  }else {
    return hanteichiY;
  }
}
function ataridown(hanteichiX,hanteichiY) {
  var hairetuX = (hanteichiX/25);
  var hairetuY = (hanteichiY/25);
  if (fieldarray[h][hairetuY + 1][hairetuX] != 1 && fieldarray[h][hairetuY + 1][hairetuX] != 4) {
    return hanteichiY += 25;
  }else {
    return hanteichiY;
  }
}
function atarileft(hanteichiX,hanteichiY) {
  var hairetuX = (hanteichiX/25);
  var hairetuY = (hanteichiY/25);
  if (fieldarray[h][hairetuY][hairetuX - 1] != 1 && fieldarray[h][hairetuY][hairetuX - 1] != 4) {
    return hanteichiX -= 25;
  }else {
    return hanteichiX;
  }
}
function atariright(hanteichiX,hanteichiY) {
  var hairetuX = (hanteichiX/25);
  var hairetuY = (hanteichiY/25);
  if (fieldarray[h][hairetuY][hairetuX + 1] != 1 && fieldarray[h][hairetuY][hairetuX + 1] != 4) {
    return hanteichiX += 25;
  }else {
    return hanteichiX;
  }
}

//距離をもとめる関数
function kyori(p1,p2) {
  return Math.abs(p1 - p2);
}

//ユークリッド距離をもとめる関数
function EuclideanDistance(x1,y1,x2,y2) {
  return Math.sqrt(Math.pow((x2-x1),2) + Math.pow((y2-y1),2));
}

function warp(jikiX,jikiY) {
    var hairetuX3 = (jikiX/25);
    var hairetuY3 = (jikiY/25);
    if (fieldarray[h][hairetuY3][hairetuX3] == 6){
      fieldarray[h][1][45] = 5;
      fieldarray[h][14][20] = 3;
    }else if (fieldarray[h][hairetuY3][hairetuX3] == 5) {
      jiki[h][0] = 300;
      jiki[h][1] = 600;
    }else if (fieldarray[h][hairetuY3][hairetuX3] == 8) {
      jiki[h][0] = 450;
      jiki[h][1] = 525;
    }else if (fieldarray[h][hairetuY3][hairetuX3] == 9) {
      jiki[h][0] = 1175;
      jiki[h][1] = 125;
    }else if (fieldarray[h][hairetuY3][hairetuX3] == 10) {
      jiki[h][0] = 100;
      jiki[h][1] = 275;
    }else if (fieldarray[h][hairetuY3][hairetuX3] == 11) {
      jiki[h][0] = 425;
      jiki[h][1] = 625;
    }else if (fieldarray[h][hairetuY3][hairetuX3] == 12) {
      jiki[h][0] = 1150;
      jiki[h][1] = 625;
    }else if (fieldarray[h][hairetuY3][hairetuX3] == 13) {
      jiki[h][0] = 825;
      jiki[h][1] = 350;
    }else if (fieldarray[h][hairetuY3][hairetuX3] == 14) {
      jiki[h][0] = 25;
      jiki[h][1] = 625;
    }else if (fieldarray[h][hairetuY3][hairetuX3] == 15) {
      jiki[h][0] = 125;
      jiki[h][1] = 425;
    }else if (fieldarray[h][hairetuY3][hairetuX3] == 15) {
      jiki[h][0] = 25;
      jiki[h][1] = 625;
    }else if (fieldarray[h][hairetuY3][hairetuX3] == 16) {
      jiki[h][0] = 875;
      jiki[h][1] = 25;
    }else if (fieldarray[h][hairetuY3][hairetuX3] == 17) {
      jiki[h][0] = 100;
      jiki[h][1] = 275;
    }else if (fieldarray[h][hairetuY3][hairetuX3] == 18) {
      jiki[h][0] = 1200;
      jiki[h][1] = 25;
    }else if (fieldarray[h][hairetuY3][hairetuX3] == 19) {
      jiki[h][0] = 25;
      jiki[h][1] = 625;
    }else if (fieldarray[h][hairetuY3][hairetuX3] == 20) {
      jiki[h][0] = 25;
      jiki[h][1] = 25;
    }else if (fieldarray[h][hairetuY3][hairetuX3] == 21) {
      jiki[h][0] = 275;
      jiki[h][1] = 600;
    }else if (fieldarray[h][hairetuY3][hairetuX3] == 22) {
      jiki[h][0] = 875;
      jiki[h][1] = 100;
    }else if (fieldarray[h][hairetuY3][hairetuX3] == 23) {
      jiki[h][0] = 25;
      jiki[h][1] = 625;
    }else if (fieldarray[h][hairetuY3][hairetuX3] == 23) {
      jiki[h][0] = 25;
      jiki[h][1] = 625;
    }else if (fieldarray[h][hairetuY3][hairetuX3] == 24) {
      jiki[h][0] = 25;
      jiki[h][1] = 625;
    }else if (fieldarray[h][hairetuY3][hairetuX3] == 25) {
      jiki[h][0] = 825;
      jiki[h][1] = 350;
    }else if (fieldarray[h][hairetuY3][hairetuX3] == 26) {
      jiki[h][0] = 775;
      jiki[h][1] = 350;
    }else if (fieldarray[h][hairetuY3][hairetuX3] == 27) {
      jiki[h][0] = 525;
      jiki[h][1] = 350;
    }else if (fieldarray[h][hairetuY3][hairetuX3] == 28) {
      jiki[h][0] = 375;
      jiki[h][1] = 225;
    }else if (fieldarray[h][hairetuY3][hairetuX3] == 29) {
      jiki[h][0] = 1150;
      jiki[h][1] = 625;
    }else if (fieldarray[h][hairetuY3][hairetuX3] == 30) {
      jiki[h][0] = 25;
      jiki[h][1] = 625;
    }else if (fieldarray[h][hairetuY3][hairetuX3] == 31) {
      jiki[h][0] = 225;
      jiki[h][1] = 175;
    }else if (fieldarray[h][hairetuY3][hairetuX3] == 32) {
      jiki[h][0] = 825;
      jiki[h][1] = 350;
    }else if (fieldarray[h][hairetuY3][hairetuX3] == 33) {
      jiki[h][0] = 25;
      jiki[h][1] = 25;
    }
}


//ゴールについて
var c = 0;
function goal(jikiX,jikiY) {
  var hairetuX2 = (jikiX/25);
  var hairetuY2 = (jikiY/25);
  if (fieldarray[h][hairetuY2][hairetuX2] == 2 || fieldarray[h][hairetuY2][hairetuX2] == 7) {
    if (c > 60) {
      c = 0;
      h += 1;
      jikiOpacity = tekiopacity = 256;
    }else {
      t = 0;
      jikiOpacity = tekiopacity = 0;
      c += 1;
    }
  }
}


//ゲームオーバーについて
function istouchedteki() {
  var kyoritjX,kyoritjY
  for (var i = 0; i < 4; i++) {
    kyoritjX = kyori(teki[h][i][0],jiki[h][0]);
    kyoritjY = kyori(teki[h][i][1],jiki[h][1]);
    if (h == 0 || h == 2) {
      if (kyoritjX + kyoritjY <= 25) {
        over = 256;
      }
    }
  }
}

function gameover() {
  fill(256,50,50,over);
  rect(0,0,1250,750);
}

function changepage(){
  if (h == 3) {
    if (c > 400) {
      c = 0;
      window.location.href = "clear.html";
    }else {
      t = 0;
      c += 1;
    }
  }
}

function kokodoko() {
  for (var i = 0; i < 30; i++) {
    for (var j = 0; j < 50; j++) {
      if (fieldarray[h][i][j] == 99) {
        return "(" + j*25 + "," + i*25 + ")";
      }
    }
  }
}
