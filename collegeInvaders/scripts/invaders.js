var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser', { preload: preload, create: create, update: update, render: render });

function preload() {

    game.load.image('bullet', 'assets/final/bullet.png');
    game.load.image('enemyBullet', 'assets/final/enemyBullet.png');
    //game.load.spritesheet('invader', 'assets/final/trustee.png', 32, 32);
    game.load.image('ship', 'assets/NewAssets/Images/Student_Sprite.png' , 28 ,28) ;
    game.load.spritesheet('kaboom', 'assets/NewAssets/explode.png', 128, 128);
    game.load.image('starfield', 'assets/final/background.png');
    game.load.image('wall', 'assets/final/wall.png');
    game.load.image('heart', 'assets/final/Life.png');
    
    game.load.spritesheet('invader', 'assets/final/NewPiskelJim.png', 128, 128);
    game.load.spritesheet('invader2', 'assets/final/NewPiskel.png', 128, 128);
    game.load.spritesheet('invader3', 'assets/final/NewPiskelBald.png', 128, 128);
    game.load.spritesheet('invader4', 'assets/final/trustee.png', 64,64,1);

    //Audio

    game.load.audio('explodeSound', 'assets/final/explodeSound.mp3');
    game.load.audio('playerHurtSound', 'assets/final/playerHurt.mp3');
    game.load.audio('backgroundMusic', 'assets/final/backgroundMusic.mp3');
    game.load.audio('gameOver', 'assets/final/gameOver.mp3');


    game.load.spritesheet('volumeButton', 'assets/final/volumeButton.png', 50, 50);


}


var player;
var aliens;
var bullets;
var bulletTime = 0;
var cursors;
var fireButton;
var explosions;
var starfield;
var score = 0;
var scoreString = '';
var scoreText;
var lives;
var enemyBullet;
var firingTimer = 0;
var stateText;
var livingEnemies = [];
var base;
var aKey;
var dKey;
var tween;
var volumeButton;
var volumeOn;
var explodeSound;
var playerHurtSound;
var backgroundMusic;
var gameOver;

function create() {

    



    game.physics.startSystem(Phaser.Physics.ARCADE);

    //  The scrolling starfield background
    starfield = game.add.tileSprite(0, 0, 800, 600, 'starfield');





    createBullets();
    createHero();
    

    createAliens();
    addEnemyMovement()

    createWalls ();

    createUI();


    //  An explosion pool
    explosions = game.add.group();
    explosions.createMultiple(30, 'kaboom');
    explosions.forEach(setupInvader, this);

    //  And some controls to play the game with
    addInputs();




    // this.addMenuOption(playMusic ? 'Mute Music' : 'Play Music', function (target) {
    //     playMusic = !playMusic;
    //     target.text = playMusic ? 'Mute Music' : 'Play Music';
    //     musicPlayer.volume = playMusic ? 1 : 0;
    //   });


    //sound
    explodeSound = game.add.audio('explodeSound');
    playerHurtSound = game.add.audio('playerHurtSound');
    backgroundMusic = game.add.audio('backgroundMusic');
    gameOver = game.add.audio('gameOver');

    backgroundMusic.play();
    backgroundMusic.loop = true;

    volumeButton = game.add.button(10 , 50, 'volumeButton', test, this, );


}

function test(){
    
    if(volumeOn){
        explodeSound.volume = 0;
        playerHurtSound.volume = 0;
        backgroundMusic.volume = 0;
        gameOver.volume = 0;
        volumeButton.frame = 1;
    }else{
        explodeSound.volume = 1;
        playerHurtSound.volume = 1;
        backgroundMusic.volume = 1;
        gameOver.volume = 1;
        volumeButton.frame = 0;
    }

    volumeOn = !volumeOn;
}

function update() {

    //game.scale.pageAlignHorizontally = true;
    //game.scale.pageAlignVertically = true;
    game.scale.refresh();
  
      //  Scroll the background
      //starfield.tilePosition.y += 2;
  
      if (player.alive)
      {
          //  Reset the player, then check for movement keys
          player.body.velocity.setTo(0, 0);
  
          if ((cursors.left.isDown || aKey.isDown) && player.body.x > 2)
          {
              player.body.velocity.x = -200;
          }
          else if ((cursors.right.isDown || dKey.isDown) && player.body.x <765)
          {
              player.body.velocity.x = 200;     
          }
  
          //  Firing?
          if (fireButton.isDown)
          {
              fireBullet();
          }
  
          if (game.time.now > firingTimer)
          {
              enemyFires();
          }
  
          //  Run collision
          game.physics.arcade.overlap(bullets, aliens, collisionHandler, null, this);
          game.physics.arcade.overlap(enemyBullets, player, enemyHitsPlayer, null, this);
          game.physics.arcade.overlap(bullets, base, collisionWallPlayer, null, this);
          game.physics.arcade.overlap(enemyBullets, base, collisionWallEnemy, null, this);
      }
  
  }
  
  function render() {

  
      //used to see hitbox of player
      //game.debug.body(player);
  
      //bullets.forEach(game.debug.body,game.debug,"#dd00dd",false);
      //base.forEach(game.debug.body,game.debug,"#dd00dd",false);
      //aliens.forEach(game.debug.body,game.debug,"#dd00dd",false);
      //base.forEach(game.debug.body,game.debug,"#dd00dd",false);
  
  }
  


function createAliens () {
    
    //  The baddies!
    aliens = game.add.group();
    aliens.enableBody = true;
    aliens.physicsBodyType = Phaser.Physics.ARCADE;

    //for (var y = 0; y < 4; y++)
   //{   
        /*
        for (var x = 0; x < 10; x++)
        {
            var alien = aliens.create(x * 60, y * 50, 'invader4');
            alien.anchor.setTo(0.5, 0.5);
            alien.animations.add('fly', [ 0, 1], 1, true);
            alien.play('fly');
            alien.body.moves = false;
            alien.body.setSize(30,40,48,40);
        }
        */
        

        

        for (var x = 0; x < 10; x++)
        {
            var alien4 = aliens.create(x * 59, 0 * 50, 'invader4');
            //alien4.scale.setTo(.7,.7);
            alien4.anchor.setTo(.4, .7);
            alien4.animations.add('fly', [ 0, 1], 1, true);
            alien4.play('fly');
            alien4.body.moves = false;
            alien4.body.setSize(45,40,10,10);
        }


        for (var x = 0; x < 10; x++)
        {
            var alien3 = aliens.create(x * 60, 1 * 50, 'invader');
            alien3.anchor.setTo(0.5, 0.5);
            alien3.animations.add('fly', [ 0, 1], 1, true);
            alien3.play('fly');
            alien3.body.moves = false;
            alien3.body.setSize(32,40,48,40);
        }

        for (var x = 0; x < 10; x++)
        {
            var alien2 = aliens.create(x * 60, 2 * 50, 'invader2');
            alien2.scale.setTo(.8,.8);
            alien2.anchor.setTo(0.5, 0.45);
            alien2.animations.add('fly', [ 0, 1], 1, true);
            alien2.play('fly');
            alien2.body.moves = false;
            alien2.body.setSize(35,50,48,30);
        }

        for (var x = 0; x < 10; x++)
        {
            var alien1 = aliens.create(x * 60, 3 * 50, 'invader3');
            alien1.anchor.setTo(0.5, 0.5);
            alien1.animations.add('fly', [ 0, 1], 1, true);
            alien1.play('fly');
            alien1.body.moves = false;
            alien1.body.setSize(30,40,50,40);
        }

    //}

    aliens.x = 60;
    aliens.y = 70;


}
/*
// create walls
function createWalls (){
    base = game.add.group();
    base.enableBody = true;
    base.physicsBodyType = Phaser.Physics.ARCADE;
    for(var x=1; x< 5; x++){
        var  wall = base.create(160*x, 500, 'wall');
        wall.anchor.setTo(0.5, 0.5);
        //resizing image 
        wall.scale.setTo(.8);
        //changing hitbox to match resized image
        wall.body.setSize(88,45,20,40);
   }
}
*/
// create walls
function createWalls (){
    base = game.add.group();
    base.enableBody = true;
    base.physicsBodyType = Phaser.Physics.ARCADE;
    for(var x=1; x< 5; x++){
    for(var y=-20; y < 41; y+=20){
    for(var z =-20;z < 1; z+=20){
        var  wall = base.create(160*x+y, 500+z, 'wall');
        wall.health = 100;
        wall.anchor.setTo(0.5, 0.5);
        //resizing image 
        wall.scale.setTo(.25);
        //changing hitbox to match resized image
        wall.body.setSize(80,50,25,40);
   }}}
}


function setupInvader (invader) {

    invader.anchor.x = 0.5;
    invader.anchor.y = 0.5;
    invader.animations.add('kaboom');

}

function descend() {

    if(aliens.y <= 200)
        aliens.y += 10;

}


//colision function for when player bullet hits a wall
function collisionWallPlayer(bullet, base){
    bullet.kill();
    
}

//colision function for when enemy bullet hits a wall
function collisionWallEnemy(enemyBullet, base){
    enemyBullet.kill();
    //base.kill();
    base.damage(50);
}

function collisionHandler (bullet, alien) {

    //  When a bullet hits an alien we kill them both

    explodeSound.play();
    bullet.kill();
    alien.kill();

    //  Increase the score
    score += 20;
    scoreText.text = scoreString + score;

    //  And create an explosion :)
    var explosion = explosions.getFirstExists(false);
    explosion.reset(alien.body.x, alien.body.y);
    explosion.play('kaboom', 30, false, true);

    if (aliens.countLiving() == 0)
    {
        score += 1000;
        scoreText.text = scoreString + score;


        aliens.callAll('revive');
        aliens.x = 60;
        aliens.y = 70;

        //enemyBullets.callAll('kill');
        //stateText.text = "YOU WON! \n Click to restart";
        //stateText.visible = true;

        //the "click to restart" handler
        //game.input.onTap.addOnce(restart,this);
    }

}

function enemyHitsPlayer (player,bullet) {
    playerHurtSound.play();

    bullet.kill();

    live = lives.getFirstAlive();

    if (live)
    {
        live.kill();
    }

    //  And create an explosion :)
    var explosion = explosions.getFirstExists(false);
    explosion.reset(player.body.x, player.body.y);
    explosion.play('kaboom', 30, false, true);

    // When the player dies
    if (lives.countLiving() < 1)
    {

        backgroundMusic.stop();
        gameOver.play();

        player.kill();
        enemyBullets.callAll('kill');
        bullets.callAll('kill');
        

 
        tween.pause();
        //the "click to restart" handler
        stateText.text=" GAME OVER! \n Click to restart";
        stateText.visible = true;
        game.input.onTap.addOnce(restart,this);
        
    }

}

function enemyFires () {

    //  Grab the first bullet we can from the pool
    enemyBullet = enemyBullets.getFirstExists(false);

    livingEnemies.length=0;

    aliens.forEachAlive(function(alien){

        // put every living enemy in an array
        livingEnemies.push(alien);
    });


    if (enemyBullet && livingEnemies.length > 0)
    {

        var random=game.rnd.integerInRange(0,livingEnemies.length-1);

        // randomly select one of them
        var shooter=livingEnemies[random];
        // And fire the bullet from this enemy
        enemyBullet.reset(shooter.body.x, shooter.body.y);

        game.physics.arcade.moveToObject(enemyBullet,player,120);
        firingTimer = game.time.now + 2000;
    }

}

function fireBullet () {

    //  To avoid them being allowed to fire too fast we set a time limit
    if (game.time.now > bulletTime)
    {
        //  Grab the first bullet we can from the pool
        bullet = bullets.getFirstExists(false);

        if (bullet)
        {
            //  And fire it
            bullet.reset(player.x, player.y + 8);
            bullet.body.velocity.y = -400;
            bulletTime = game.time.now + 200;
        }
    }

}

function resetBullet (bullet) {

    //  Called if the bullet goes out of the screen
    bullet.kill();

}


//restarts the game
function restart () {

    //  A new level starts

    tween.resume();
    //resets the life count
    lives.callAll('revive');
    //  And brings the aliens back from the dead :)
    aliens.callAll('revive');
    aliens.x = 60;
    aliens.y = 70;

    //resets walls
    base.callAll('revive');

    //revives the player
    player.revive();
    //hides the text
    stateText.visible = false;

    score-=score;
    scoreText.text = "Score : " + score;

    backgroundMusic.play();

}

//creates enemy and player bullet groups
function createBullets(){
    //  Player bullet group
    bullets = game.add.group();
    bullets.enableBody = true;
    bullets.physicsBodyType = Phaser.Physics.ARCADE;
    bullets.createMultiple(30, 'bullet');
    bullets.setAll('anchor.x',  0.5 );
    bullets.setAll('anchor.y', 1);
    bullets.setAll('outOfBoundsKill', true);
    bullets.setAll('checkWorldBounds', true);

    // The enemy's bullets
    enemyBullets = game.add.group();
    enemyBullets.enableBody = true;
    enemyBullets.physicsBodyType = Phaser.Physics.ARCADE;
    enemyBullets.createMultiple(30, 'enemyBullet');
    enemyBullets.setAll('anchor.x', 1);
    enemyBullets.setAll('anchor.y', 1);
    enemyBullets.setAll('outOfBoundsKill', true);
    enemyBullets.setAll('checkWorldBounds', true);

}

//creating player 
function createHero(){
    //  The hero! 
    player = game.add.sprite(400, 560, 'ship'); 
    //changes size of player
    player.scale.setTo(.15,.15);
    player.anchor.setTo(0.5, 0.5);
    game.physics.enable(player, Phaser.Physics.ARCADE);
    //changes hitbox to match size change
    player.body.setSize(220,350,175,185);

}

//creating user interface showing score and lives
function createUI(){
    //  The score
    scoreString = 'Score : ';
    scoreText = game.add.text(10, 0, scoreString + score, { font: '34px Arial', fill: '#fff' });

    //  Lives
    lives = game.add.group();
    game.add.text(game.world.width - 90, 0, 'Lives: ', { font: '30px Arial', fill: '#000000' });

    //  Text
    stateText = game.add.text(game.world.centerX,game.world.centerY,' ', { font: '84px Arial', fill: '#fff' });
    stateText.anchor.setTo(0.5, 0.5);
    stateText.visible = false;
    

    for (var i = 0; i < 3; i++)
    {
        var heart = lives.create(game.world.width - 80 + (30 * i), 60, 'heart');
        //heart.scale.setTo(.1,.1);
        heart.anchor.setTo(0.5, 0.5);
        //heart.alpha = 0.8;
    }
    

}

//adding listeners for certain keys
function addInputs(){
    cursors = game.input.keyboard.createCursorKeys();
    fireButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    aKey = game.input.keyboard.addKey(Phaser.Keyboard.A);
    dKey = game.input.keyboard.addKey(Phaser.Keyboard.D);
}

//adds horizontal movement to aliens and moves down on repeat
function addEnemyMovement(){
        //  All this does is basically start the invaders moving. Notice we're moving the Group they belong to, rather than the invaders directly.
        tween = game.add.tween(aliens).to( { x: 200 }, 1000, Phaser.Easing.Linear.None, true, 0, 1000, true);
        //var tween = game.add.tween(aliens).to( { x: 200 }, 200, Phaser.Easing.Linear.None, true, 0, 1000, true);
    
        //  When the tween loops it calls descend
        tween.onRepeat.add(descend, this);
}