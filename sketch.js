var mode;
let X = 305;
let Y = 130;
let paper_X = 308;
let paper_Y = 260;
let money_X = 360;
let money_Y = 215;
let diamond_X;
let diamond_Y;
var pkey = 'd';
let time = 0;
let point = 0;
let fakePoint = 0;
var AmongUs;
let gost_X = 30;
let gost_Y = 10;
let gost2_X = 570;
let gost2_Y = 430;
var direction;
var direction2;

function preload(){
    startBackground = loadImage("startBackground.png");
    gameBackground = loadImage("background.png");
    game2Background = loadImage("map.png");
    paper = loadImage("paper.png");
    rule = loadImage("rule.png");
    money = loadImage("money.png");
    stand_1 = loadImage("AmongUs_1.png");
    walk_1 = loadImage("AmongUs_2.png");
    walkUp_1 = loadImage("AmongUs_5.png");
    stand_2 = loadImage("AmongUs_3.png");
    walk_2 = loadImage("AmongUs_4.png");
    walkUp_2 = loadImage("AmongUs_6.png");
    die = loadImage("AmongUs_7.png");
    diamond = loadImage("diamond.png");
    gost_1 = loadImage("gost_1.png");
    gost_2 = loadImage("gost_2.png");
    loadIMG = loadImage("loading.png");
    gameover = loadImage("gameover.png");
}

function setup(){
    createCanvas(640, 480);
    mode = 'start';
    image(startBackground, 0, 0);
    stroke(255);
    fill(255);
    textSize(15);
    text('Click anywhere to start', width/3+45, height/1.3);
}

function draw(){
    //srart
    if(mode === 'game_1'){
        time += 1;
        if(time>=120){
            //rule
            image(paper, paper_X, paper_Y, 30, 30);
            tutorial(paper_X, paper_Y, 'paper');
            if(fakePoint === 1){
                image(rule, 140, 80);
                stroke(255);
                fill(0);
                textSize(10);
                text('Click anywhere', 290, 420);
            }
        }
        if(fakePoint===2 && time>=600){
            //money
            image(money, money_X, money_Y, 30, 20);
            collect(money_X, money_Y);
            if(point === 1){
                money_X = 270;
                money_Y = 170;
                image(money, money_X, money_Y, 30, 20);
            }
            if(point === 2){
                money_X = 255;
                money_Y = 230;
                image(money, money_X, money_Y, 30, 20);
            }
            if(point === 3 && time >= 1500){
                loading();
            }
            if(point === 3 && time >= 1800){
                mode = 'game_2';
                play2();
            }
        }

        //point
        stroke(255);
        fill(0);
        textSize(12);
        text('Your Point', 520, 30);
        fill(255);
        textSize(20);
        text(point, 600, 33);

        //wall
        if(X<=200)
            X += 10;
        if(X>=410)
            X -= 10;
        if(Y<=120)
            Y += 10;
        if(Y>=280)
            Y -= 10;
    }
    if(mode === 'game_2'){
        time += 1;
        //gost
        moveGost(gost_X, gost_Y, 1);
        moveGost(gost2_X, gost2_Y, 2);
        if(keyIsPressed){
            image(game2Background, 0, 0);
            if(key==='d'){
                image(walk_1, X, Y, 30, 40);
            }
            if(key==='a'){
                image(walk_2, X, Y, 30, 40);
            }
            if(key==='w'){
                if(pkey==='d'){
                    image(walkUp_1, X, Y, 30, 40);
                }
                if(pkey==='a'){
                    image(walkUp_2, X, Y, 30, 40);
                }
            }
            if(key==='s'){
                if(pkey==='d'){
                    image(walkUp_1, X, Y, 30, 40);
                }
                if(pkey==='a'){
                    image(walkUp_2, X, Y, 30, 40);
                }
            }
        }
        if(direction === 'd'){
            image(gost_1, gost_X, gost_Y, 40, 50);
        }
        if(direction === 'a'){
            image(gost_2, gost_X, gost_Y, 40, 50);
        }
        if(direction2 === 'd'){
            image(gost_1, gost2_X, gost2_Y, 40, 50);
        }
        if(direction2 === 'a'){
            image(gost_2, gost2_X, gost2_Y, 40, 50);
        }
        //tochGost
        touchGost(gost_X, gost_Y);
        touchGost(gost2_X, gost2_Y);
        if(point <= 0){
            time = 0;
            mode = 'die';
        }
        //money, diamond
        if(time === 1){
            money_X = random(610);
            money_Y = random(460);
            diamond_X = random(610);
            diamond_Y = random(450);
        }
        if(time>=300 && time<720){
            image(money, money_X, money_Y, 30, 20);
            image(diamond, diamond_X, diamond_Y, 30, 30);
        }
        if(time === 720){
            time = 0;
            image(game2Background, 0, 0);
            if(pkey === 'a'){
                image(stand_2, X, Y, 30, 40);
            } else{
                image(stand_1, X, Y, 30, 40);
            }
        }
        collect(money_X, money_Y);
        collect_2(diamond_X, diamond_Y);

        //point
        stroke(255);
        fill(0);
        textSize(12);
        text('Your Point', 520, 30);
        fill(255);
        textSize(20);
        text(point, 600, 33);
        
        //wall
        if(X<=10){
            if(Y>=180 && Y<=230){
                if(X<=-40){
                    X=610;
                }
            } else{
                X += 10;
            } 
        }
        if(X>=600){
            if(Y>=180 && Y<=230){
                if(X>=620){
                    X=-20;
                }
            } else{
                X -= 10;
            }
        }
        if(Y<=0)
            Y += 10;
        if(Y>=440)
            Y -= 10;
        
        //table
        if(Y>=170 && Y<=270){
            if(X===240){
                X -= 10;
            }
            if(X===350){
                X += 10;
            }
        }
        if(X>=240 && X<=350){
            if(Y===170){
                Y -= 10;
            }
            if(Y===270){
                Y += 10;
            }
        }
        if(Y>=30 && Y<=130){
            if(X===100){
                X -= 10;
            }
            if(X===210){
                X += 10;
            }
            if(X===370){
                X -= 10;
            }
            if(X===480){
                X += 10;
            }
        }
        if(Y>=320 && Y<=420){
            if(X===100){
                X -= 10;
            }
            if(X===210){
                X += 10;
            }
            if(X===370){
                X -= 10;
            }
            if(X===480){
                X += 10;
            }
        }
        if(X>=100 && X<=190){
            if(Y===20){
                Y -= 10;
            }
            if(Y===130){
                Y += 10;
            }
            if(Y===310){
                Y -= 10;
            }
            if(Y===420){
                Y += 10;
            }
        }
        if(X>=370 && X<=460){
            if(Y===20){
                Y -= 10;
            }
            if(Y===130){
                Y += 10;
            }
            if(Y===310){
                Y -= 10;
            }
            if(Y===420){
                Y += 10;
            }
        }
    }
    if(mode === 'die'){
        time += 1;
        if(time>=0 && time <120){
            image(game2Background, 0, 0);
            image(die, X, Y, 30, 40);
        }
        if(time === 120){
            image(gameover, 0, 0);
            stroke(255);
            fill(255);
            textSize(15);
            text('Press Enter to restart', width/3+40, height/1.2);
        }
    }
    //restart
    if(mode === 'start'){
        image(startBackground, 0, 0);
        stroke(255);
        fill(255);
        textSize(15);
        text('Click anywhere to start', width/3+45, height/1.3);
    }
}

function mouseClicked(){
    if(mode === 'start'){
        image(gameBackground, 0, 0, 640, 480);
        image(stand_1, X, Y, 30, 40);
        mode = 'game_1';
    }
    if(fakePoint === 1){
        fakePoint = 2;
        image(gameBackground, 0, 0, 640, 480);
        image(stand_1, X, Y, 30, 40);
    }
}

function keyPressed(){
    //right
    if(key === 'd'){
        pkey = 'd';
        X += 10;
        if(mode === 'game_1'){
            image(gameBackground, 0, 0, 640, 480);
            image(walk_1, X, Y, 30, 40);
        }
        if(mode === 'game_2'){
            image(game2Background, 0, 0, 640, 480);
            image(walk_1, X, Y, 30, 40);
        }
    }
    //left
    if(key === 'a'){
        pkey = 'a';
        X -= 10;
        if(mode === 'game_1'){
            image(gameBackground, 0, 0, 640, 480);
            image(walk_2, X, Y, 30, 40);
        }
        if(mode === 'game_2'){
            image(game2Background, 0, 0, 640, 480);
            image(walk_2, X, Y, 30, 40);
        }
    }
    //up
    if(key === 'w'){
        Y -= 10;
        if(mode === 'game_1'){
            image(gameBackground, 0, 0, 640, 480);
            if(pkey === 'd'){
                image(walkUp_1, X, Y, 30, 40);
            } else{
                image(walkUp_2, X, Y, 30, 40);
            }
        }
        if(mode === 'game_2'){
            image(game2Background, 0, 0, 640, 480);
            if(pkey === 'd'){
                image(walkUp_1, X, Y, 30, 40);
            } else{
                image(walkUp_2, X, Y, 30, 40);
            }
        } 
    }
    //down
    if(key === 's'){
        Y += 10;
        if(mode === 'game_1'){
            image(gameBackground, 0, 0, 640, 480);
            if(pkey === 'd'){
                image(walkUp_1, X, Y, 30, 40);
            } else{
                image(walkUp_2, X, Y, 30, 40);
            }
        }
        if(mode === 'game_2'){
            image(game2Background, 0, 0, 640, 480);
            if(pkey === 'd'){
                image(walkUp_1, X, Y, 30, 40);
            } else{
                image(walkUp_2, X, Y, 30, 40);
            }
        }
    }
    if(keyCode === 13){
        time = 0;
        point = 0;
        X = 300;
        Y = 130;
        money_X = 360;
        money_Y = 215;
        mode = 'start';
    }
}

function keyReleased(){
    //right
    if(key === 'd'){
        if(mode === 'game_1'){
            image(gameBackground, 0, 0, 640, 480);
            image(stand_1, X, Y, 30, 40);
        }
        if(mode === 'game_2'){
            image(game2Background, 0, 0, 640, 480);
            image(stand_1, X, Y, 30, 40);
        }
    }
    //left
    if(key === 'a'){
        if(mode === 'game_1'){
            image(gameBackground, 0, 0, 640, 480);
            image(stand_2, X, Y, 30, 40);
        }
        if(mode === 'game_2'){
            image(game2Background, 0, 0, 640, 480);
            image(stand_2, X, Y, 30, 40);
        }
    }
    //up
    if(key === 'w'){
        if(mode === 'game_1'){
            image(gameBackground, 0, 0, 640, 480);
            if(pkey === 'd'){
                image(stand_1, X, Y, 30, 40);
            } else{
                image(stand_2, X, Y, 30, 40);
            }
        }
        if(mode === 'game_2'){
            image(game2Background, 0, 0, 640, 480);
            if(pkey === 'd'){
                image(stand_1, X, Y, 30, 40);
            } else{
                image(stand_2, X, Y, 30, 40);
            }
        }
    }
    //down
    if(key === 's'){
        if(mode === 'game_1'){
            image(gameBackground, 0, 0, 640, 480);
            if(pkey === 'd'){
                image(stand_1, X, Y, 30, 40);
            } else{
                image(stand_2, X, Y, 30, 40);
            }
        }
        if(mode === 'game_2'){
            image(game2Background, 0, 0, 640, 480);
            if(pkey === 'd'){
                image(stand_1, X, Y, 30, 40);
            } else{
                image(stand_2, X, Y, 30, 40);
            }
        }
    }
}

function collect(x, y){
    if(X>= x-10 && X<=x+20){
        if(Y>=y-10 && Y<=y+10){
            money_X = 640;
            money_Y = 0;
            if(mode === 'game_1'){
                image(gameBackground, 0, 0, 640, 480);
            }
            if(mode === 'game_2'){
                image(game2Background, 0, 0, 640, 480);
            }
            if(pkey === 'a'){
                image(stand_2, X, Y, 30, 40);
            } else{
                image(stand_1, X, Y, 30, 40);
            }
            point += 1;
        }
    }
}

function collect_2(x, y){
    if(X>= x-10 && X<=x+20){
        if(Y>=y-10 && Y<=y+10){
            diamond_X = 640;
            diamond_Y = 0;
            if(mode === 'game_1'){
                image(gameBackground, 0, 0, 640, 480);
            }
            if(mode === 'game_2'){
                image(game2Background, 0, 0, 640, 480);
            }
            if(pkey === 'a'){
                image(stand_2, X, Y, 30, 40);
            } else{
                image(stand_1, X, Y, 30, 40);
            }
            point += 3;
        }
    }
}

function tutorial(x, y){
    if(X>= x-10 && X<=x+20){
        if(Y>=y-10 && Y<=y+10){
            paper_X = 640;
            paper_Y = 0;
            image(gameBackground, 0, 0, 640, 480);
            if(pkey === 'a'){
                image(stand_2, X, Y, 30, 40);
            } else{
                image(stand_1, X, Y, 30, 40);
            }
            fakePoint += 1;
        }
    }
}

function moveGost(x, y, gost){
    if(x===30 && y>=10 && y<430){
        if(gost === 1){
            direction = 'd';
            gost_Y += 1;
        }
        if(gost === 2){
            direction2 = 'd';
            gost2_Y += 1;
        }
    }
    if(y===430 && x>=30 && x<570){
        if(gost === 1){
            direction = 'd';
            gost_X += 1;
        }
        if(gost === 2){
            direction2 = 'd';
            gost2_X += 1;
        }
    }
    if(x===570 && y>10 && y<=430){
        if(gost === 1){
            direction = 'a';
            gost_Y -= 1;
        }
        if(gost === 2){
            direction2 = 'a';
            gost2_Y -= 1;
        }
    }
    if(y===10 && x>30 && x<=570){
        if(gost === 1){
            direction = 'a';
            gost_X -= 1;
        }
        if(gost === 2){
            direction2 = 'a';
            gost2_X -= 1;
        }
    }
    image(game2Background, 0, 0, 640, 480);
    if(pkey === 'd'){
        image(stand_1, X, Y, 30, 40);
    } else{
        image(stand_2, X, Y, 30, 40);
    } 
}

function touchGost(x, y){
    if(X>= x-10 && X<=x+30){
        if(Y>=y-10 && Y<=y+40){
            X = 290;
            Y = 100;
            point -= 3;
        }
    }
}

function loading(){
    image(loadIMG, 0, 0);
}

function play2(){
    X = 290;
    Y = 100;
    image(game2Background, 0, 0);
    image(stand_1, X, Y, 30, 40);
    time = 0;
}