import Phaser from "phaser";
import TetrisConfig from "./tetris_config.js";
import Board from "./board.js";
import Infomation from "./infomation.js";
import Shape from "./shape.js";
import * as graphicsUtil from "./graphics_util.js";

let shape;
let baseSpeed = 30;
let speed = baseSpeed;

export function createMain(vue, shapeTypeQueue) {
	let isKeyDown = false;
	let status = "ready";
	let cursors;
	let config = new TetrisConfig(22, 10, 24);
	let phaserConfig = {
        parent: 'game',
		type: Phaser.AUTO,
		width: config.width,
		height: config.height,
		physics: {
			default: "arcade",
			arcade: {
				debug: false,
			},
		},
		scene: {
			preload: preload,
			create: create,
			update: update,
		},
		backgroundColor: 0xffffff,
        transparent: true
	};
	new Phaser.Game(phaserConfig);
	let board;
	let infomation;

	function preload() {
		graphicsUtil.loadAllImages(this);
		graphicsUtil.makeAxisGraphics(this, config);
	}

	function create() {
		board = new Board(this, config);
		infomation = new Infomation(this, config);
		this.add.grid(config.width / 2, config.height / 2, config.width, config.height, config.blockSize, config.blockSize, 0xeeeeee, 0, 0xeeeeee, 0.2);
		cursors = this.input.keyboard.createCursorKeys();

		this.anims.create({
			key: "light",
			frames: this.anims.generateFrameNumbers("lightImage", { start: 0, end: 8 }),
			frameRate: 10,
			repeat: 1,
		});
	}

	function update() {
		if (status == "ready" || status == "pause") {
			if (cursors.space.isDown) {
				setStart();
				infomation.clear();
				this.physics.resume();
			}
		} else if (status == "start") {
			if (cursors.shift.isDown) {
				setPause();
				infomation.showPause();
				this.physics.pause();
			}
		}

		if (status != "start" || board.considering) {
			return;
		}

		if (!shape) {
			shape = new Shape(this, config, shapeTypeQueue.shift());
			this.physics.add.collider(shape.getPhysicsGroup(), board.getStaticBlocks());
		}

		shape.setVelocityY(speed + vue.speedLevel * 30);
		cursorOperation();
		// 回転により微妙にX軸がずれるので補正
		shape.adjustX();

		if (shape.collided()) {
			if (shape.getMinY() <= 0) {
				infomation.showEnd();
				status = "end";
			}
			board.stack(shape);
			vue.score += board.deleteCompLine(() => {
				shape = null;
				vue.speedLevel = Math.floor(vue.score / 10) + 1;
			});
		}
	}

	function cursorOperation() {
		if (cursors.left.isDown) {
			if (!isKeyDown) {
				shape.moveLeft();
				isKeyDown = true;
			}
		} else if (cursors.right.isDown) {
			if (!isKeyDown) {
				shape.moveRight();
				isKeyDown = true;
			}
		} else if (cursors.up.isDown) {
			if (!isKeyDown) {
				isKeyDown = true;
				shape.rotate();
			}
		} else if (cursors.down.isDown) {
			speed = baseSpeed * 4 < 200 ? 200 : baseSpeed * 4;
		} else {
			isKeyDown = false;
			speed = baseSpeed;
		}
	}

    function setStart() {
        status = 'start';
        vue.status = 'start';
    }

    function setPause() {
        status = 'pause';
        vue.status = 'pause';   
    }
}

export function tern() {
    shape.rotate();
}

export function left() {
    shape.moveLeft();
}

export function right() {
    shape.moveRight();
}

export function drop() {
    speed = baseSpeed * 4 < 200 ? 200 : baseSpeed * 4;
}