var config = {
  type: Phaser.AUTO,
  width: window.innerWidth,
  height: window.innerHeight,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 640 },
      debug: false
    }
  },
  scene: {
    preload: preload,
    create: create,
    update: update
  }
};

var player;
var playerJumpSound;
var platforms;
var cursors;

var game = new Phaser.Game(config);

function preload() {
  this.load.image('playerImage', './assets/playerImage.png');
  this.load.audio('playerJumpSound', './assets/playerJumpSound.wav');
}

function create() {
  playerJumpSound = this.sound.add('playerJumpSound');

  // The player and its settings
  player = this.physics.add.sprite(100, 450, 'playerImage');
  player.displayHeight = 64;
  player.displayWidth = 64;

  //  Player physics properties. Give the little guy a slight bounce.
  player.setBounce(0.2);
  player.setCollideWorldBounds(true);

  //  Input Events
  cursors = this.input.keyboard.createCursorKeys();
}

function update() {
  if (cursors.left.isDown) {
    player.setVelocityX(-160);
    player.flipX = true;
  }
  else if (cursors.right.isDown) {
    player.setVelocityX(160);
    player.flipX = false;
  }
  else {
    player.setVelocityX(0);
  }

  if (cursors.up.isDown && player.body.blocked.down) {
    player.setVelocityY(-480);
    playerJumpSound.play();
  }
}
