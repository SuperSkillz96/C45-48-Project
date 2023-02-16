var PLAY = 0;
var END = 1;
var gameState = PLAY;
var cannon, player;
var cannon_img, player_img;
var candy, candy_img, candyGroup;
var road_img;
var restart, gameOver;
var restart_img, gameOver_img;
var currentFrameCount = 0;
var edges;
var score = 0;
var frameCountControl = 50;

function preload() {
  cannon_img = loadImage('cannon.png');
  player_img = loadImage("player_img.png");
  candy_img = loadImage('candy.png');
  road_img = loadImage('road_img.png');
  gameOver_img = loadImage('gameover_img.png');
  restart_img = loadImage('restart_img.png');
}


function setup() {
  createCanvas(800,800);

  edges = createEdgeSprites();

  cannon = createSprite(400, 100, 80, 80);
  cannon.addImage(cannon_img);
  cannon.scale = 0.4;

  player = createSprite(400, 700, 80, 80);
  player.addImage(player_img);
  player.scale = 0.4;
  player.setCollider('rectangle', 0, 0, 350, 150);

  gameOver = createSprite(400, 250, 50, 50);
  gameOver.addImage(gameOver_img);
  gameOver.scale = 0.6;
  gameOver.visible = false;

  restart = createSprite(400, 400, 50, 50);
  restart.addImage(restart_img);
  restart.scale = 0.06;
  restart.visible = false;

  candyGroup = new Group();

  score = 0
}


function draw() {
  background(road_img);

  //player.debug = true;

  fill('yellow')
  text('Score: ' + score, 50, 50)

  if(gameState == PLAY) {

    score = Math.round(frameCount / 10);

    if(keyDown('a')) {
      cannon.x -= 6
    }
    if(keyDown('d')) {
      cannon.x += 6
    }
    if(keyDown(LEFT_ARROW)) {
      player.x -= 4
    }
    if(keyDown(RIGHT_ARROW)) {
      player.x += 4
    }

    cannon.collide(edges);
    player.collide(edges);

    createCandy();

    if(candyGroup.collide(player)) {
      gameState = END;
    } 
  }

  else if(gameState == END) {
    candyGroup.destroyEach();
    restart.visible = true;
    gameOver.visible = true;
  }

  if(mousePressedOver(restart)) {
    gameState = PLAY;
    restart.visible = false;
    gameOver.visible = false;
    cannon.x = 400;
    cannon.y = 100;
    player.x = 400;
    player.y = 700;
    score = 0;
  }

  drawSprites();
}

function createCandy() {
  if(keyDown('q') && frameCount > currentFrameCount + frameCountControl) {
    currentFrameCount = frameCount;
    candy = createSprite(cannon.x, cannon.y + 130)
    candy.addImage(candy_img);
    candy.scale = 0.1;
    candy.velocityY = 3.5;
    candy.lifetime = 400;
    candyGroup.add(candy);

    if(score >= 50) {
      candy.velocityY = 4.5;
      frameCountControl = 45;
    }
  }
}