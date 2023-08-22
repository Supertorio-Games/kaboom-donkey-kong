import k from "@/game";

export default () => {
  // Sprites and Animations
  k.loadSprite("startGraphic", "sprites/start-screen.png");

  k.loadSprite("donkeyKong", "sprites/donkey-kong.png", {
    sliceX: 2,
    anims: {
      idle: { from: 0, to: 0 },
      stomp: { from: 0, to: 1, loop: true },
    },
  });

  k.loadSprite("plumber", "sprites/mario.png", {
    sliceX: 7,
    anims: {
      idle: { from: 0, to: 0 },
      walk: { from: 0, to: 3, loop: true },
      jump: { from: 4, to: 4 },
      climb: { from: 5, to: 6, loop: true },
      climbIdle: { from: 5, to: 5 },
    },
  });

  k.loadSprite("hammer", "sprites/hammer.png", {
    sliceX: 4,
  });

  k.loadSprite("pauline", "sprites/pauline.png");

  k.loadSprite("barrel", "sprites/barrel.png", {
    sliceX: 3,
    anims: {
      roll: { from: 0, to: 1, loop: true },
      fall: { from: 2, to: 2 },
    },
  });

  k.loadSprite("fireball", "sprites/fireball.png");

  k.loadSpriteAtlas("sprites/levels.png", {
    level1: {
      x: 0,
      y: 0,
      width: 192,
      height: 160,
    },
    level2: {
      x: 192,
      y: 0,
      width: 192,
      height: 160,
    },
  });

  k.loadSprite("numbers", "sprites/numbers.png", {
    sliceX: 20,
  });

  // Fonts
  k.loadBitmapFont("unscii", "fonts/unscii_8x8.png", 8, 8)

  // Audio Files
  k.loadSound("die", "sounds/dk-a2600_die.ogg");
  k.loadSound("jump", "sounds/dk-a2600_jump.ogg");
  k.loadSound("over", "sounds/dk-a2600_over.ogg");
  k.loadSound("victory", "sounds/dk-a2600_victory.ogg");
  k.loadSound("walk", "sounds/dk-a2600_walk.ogg");
};
