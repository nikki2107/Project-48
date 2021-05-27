var plr,plr_animation;
var obstacle,obstacle_animation;
var coin,coin_animation;
var gameState = "PLAY";
var score;
var bg;
function preload(){
  plr_animation = loadAnimation("Run1.png","Run2.png","Run3.png","Run4.png","Run5.png","Run6.png","Run7.png","Run8.png","Run9.png")
  
  obstacle_animation = loadImage("obstacle.png");
  
  coin_animation = loadImage("coin.png")
  bg = loadImage("bg.png");
}

function setup(){
  createCanvas(400,400)
  plr = createSprite(100,300,20,20)
  plr.addAnimation("plr" ,plr_animation)
  plr.scale=0.2
  plr.debug = true
  plr.setCollider("rectangle",-100,-20,200,240);
  ground = createSprite(300,350,600,10)
  
  ground.visible = false;
  score = 0;
  coinGroup = createGroup();
  obsGroup = createGroup();
}

function draw(){
  background(bg)
                            
  if (gameState === "PLAY"){
    if(keyDown("space") && plr.y >= 290){
     plr.velocityY = -8;
    }
   if(plr.isTouching(coinGroup)){
      score = score+1
     coinGroup.destroyEach();
      }
    if(plr.isTouching(obsGroup)){
     gameState="END"
    }
  }
  plr.velocityY = plr.velocityY + 0.4
  plr.collide(ground);
  plr.display();
  obs();
  coin1();
  drawSprites();
  textSize(27)
  fill("green")
  text("Score : "+score,260,60)
  
 if(gameState==="END"){
  coinGroup.destroyEach();
  obsGroup.destroyEach();
  plr.visible=false;
  plr.velociyY  = 0;

  
   fill("red")
  textSize(24)
      text("GAME OVER",110,120)
    text(   " PRESS 'R' TO RESTART",60,180)
    if(keyDown('r')){
       reset();
 }
 }
}

function obs(){
  if(frameCount%133===0){
    obstacle = createSprite(400,320,20,20);
    obstacle.addImage(obstacle_animation);
    obstacle.scale = 0.04
    obstacle.velocityX = -4
   
    obsGroup.add(obstacle);
   
  }
}

function coin1(){
  if(frameCount%70===0){
    coin = createSprite(400,220,20,20);
    coin.addImage(coin_animation);
    coin.scale = 0.09
    coin.velocityX = -4
    coinGroup.add(coin);
  }
}

function reset(){
  if(keyDown('r') && gameState === "END"){
    gameState = "PLAY"
     
     }
}
