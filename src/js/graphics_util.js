export function loadAllImages(game) {
    game.load.image("type0", "img/block0.png");
    game.load.image("type1", "img/block1.png");
    game.load.image("type2", "img/block2.png");
    game.load.image("type3", "img/block3.png");
    game.load.image("type4", "img/block4.png");
    game.load.image("type5", "img/block5.png");
    game.load.image("type6", "img/block6.png");
    game.load.spritesheet("lightImage", "img/pipo-btleffect008.png", { frameWidth: 120, frameHeight: 120 });
}

export function makeAxisGraphics(game, config) {
    let graphics = game.make.graphics();
    graphics.fillStyle(0x000000, 1.0);
    graphics.fillPoint(config.blockSize, config.blockSize, 1);
    graphics.generateTexture("axis", 1, 1);
    return graphics;
}