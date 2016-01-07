var canvas;
var a;
var over = 0;
var ms1,ms2,keika;
var i = 0;

function setup(){
  canvas = createCanvas(window.innerWidth,
                        window.innerHeight);
  canvas.canvas.style.height = null;
  canvas.canvas.style.width = null;
  colorMode(RGB,256);
}

function draw() {
  field();    //フィールドを描画
  jiki();   //自機の描画
  timecount();    //敵の移動のためのカウント。敵の動きを管理
  gameover();   //ゲームオーバーか判定
  istouchedteki();    //敵に追いつかれたか判定
  goal();   //ゴールに到達したかどうか判定
}

function field() {
  fill(0,200,256,256);
  rect(0,0,1200,700);
  for (var i = 0; i < 49; i++) {    //縦線を繰り返しで描画
    line(25*i,0,25*i,700);
  }
  for (var i = 0; i < 29; i++) {    //横線を繰り返しで描画
    line(0,25*i,1200,25*i);
  }
}

//キー押された時の動作をそれぞれ指定
function keyPressed() {
  if (keyCode === UP_ARROW || keyCode === DOWN_ARROW || keyCode === LEFT_ARROW || keyCode === RIGHT_ARROW) {
    movejiki();
    //moveteki();
  }
}

//〜自機について〜
var jikiX = 200;
var jikiY = 450;
function jiki() {
  fill(256,100,100,256);
  rect(jikiX,jikiY,25,25);
}
function movejiki() {
  if (keyCode === UP_ARROW) {
    jikiY = atariup(jikiY);
  }
  if (keyCode === DOWN_ARROW) {
    jikiY = ataridown(jikiY);
  }
  if (keyCode === LEFT_ARROW) {
    jikiX = atarileft(jikiX);
  }
  if (keyCode === RIGHT_ARROW) {
    jikiX = atariright(jikiX);
  }
}

//〜敵機について〜
var tekiX = 0;
var tekiY = 100;
var tekiXX = 1100;
var tekiYY = 650;
var random;
function teki() {
  fill(256,256,50,256);
  rect(tekiX,tekiY,25,25);
  rect(tekiXX,tekiYY,25,25);
}

function moveteki1() {
  random = Math.floor(Math.random()*2);
  var kyoriX,kyoriY;
  kyoriX = kyori(tekiX,jikiX);
  kyoriY = kyori(tekiY,jikiY);
  if (kyoriX < kyoriY && tekiY <= jikiY) {
    tekiY = ataridown(tekiY);
  }else if (kyoriX < kyoriY && jikiY <= tekiY) {
    tekiY = atariup(tekiY);
  }else if (kyoriY < kyoriX && tekiX <= jikiX) {
    tekiX = atariright(tekiX);
  }else if (kyoriY < kyoriX && jikiX <= tekiX) {
    tekiX = atarileft(tekiX);
  }else if (kyoriX == kyoriY) {
    if (random == 0 && tekiY <= jikiY) {
      tekiY = ataridown(tekiY);
    }else if (random == 0 && jikiY <= tekiY) {
      tekiY = atariup(tekiY);
    }else if (random == 1 && tekiX <= jikiX) {
      tekiX = atariright(tekiX);
    }else if (random == 1 && jikiX <= tekiX) {
      tekiX = atarileft(tekiX);
    }
  }
}

function moveteki2() {
  random = Math.floor(Math.random()*2);
  var kyoriXX,kyoriYY;
  kyoriXX = kyori(tekiXX,jikiX);
  kyoriYY = kyori(tekiYY,jikiY);
  if (kyoriXX < kyoriYY && tekiYY <= jikiY) {
     tekiYY = ataridown(tekiYY);
  }else if (kyoriXX < kyoriYY && jikiY <= tekiYY) {
     tekiYY = atariup(tekiYY);
  }else if (kyoriYY < kyoriXX && tekiXX <= jikiX) {
     tekiXX = atariright(tekiXX);
  }else if (kyoriYY < kyoriXX && jikiX <= tekiXX) {
     tekiXX = atarileft(tekiXX);
  }else if (kyoriXX == kyoriYY) {
    if (random == 0 && tekiYY <= jikiY) {
       tekiYY = ataridown(tekiYY);
    }else if (random == 0 && jikiY <= tekiYY) {
       tekiYY = atariup(tekiYY);
    }else if (random == 1 && tekiXX <= jikiX) {
       tekiXX = atariright(tekiXX);
    }else if (random == 1 && jikiX <= tekiXX) {
       tekiXX = atarileft(tekiXX);
    }
  }
}

function timecount() {
  if (i > 20) {
    i = 0;
    moveteki1();
    moveteki2();
  } else {
    i += 1;
    teki();
  }
}

//当たり判定について　上下右左専門に設置。それぞれ進める場合は指定された方向に座標を変更。
function atariup(hanteichiY) {
  if (hanteichiY != 0) {
    return hanteichiY -= 25;
  }else {
    return hanteichiY;
  }
}
function ataridown(hanteichiY) {
  if (hanteichiY != 675) {
    return hanteichiY += 25;
  }else {
    return hanteichiY;
  }
}
function atarileft(hanteichiX) {
  if (hanteichiX != 0) {
    return hanteichiX -= 25;
  }else {
    return hanteichiX;
  }
}
function atariright(hanteichiX) {
  if (hanteichiX != 1175) {
    return hanteichiX += 25;
  }else {
    return hanteichiX;
  }
}


function kyori(p1,p2) {
  return Math.abs(p1 - p2);
}


//ゴールについて
function goal() {
  if (jikiX == 1175 && jikiY == 0) {
    fill(50,256,50,256);
    rect(0,0,1200,700);
  }
}


//ゲームオーバーについて
var kyoriX2,kyoriY2;
function istouchedteki() {
  kyoriX2 = kyori(tekiX,jikiX);
  kyoriY2 = kyori(tekiY,jikiY);
  if (kyoriX2 == 0 && kyoriY2 <= 50) {
    over = 256;
  }else if (kyoriX2 <= 50 && kyoriY2 == 0) {
    over = 256;
  }
}
function gameover() {
  fill(256,50,50,over);
  rect(0,0,1200,700);
}
