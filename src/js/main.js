import Phaser from "phaser";
import TetrisConfig from "./tetris_config.js";
import Board from "./board.js";
import Infomation from "./infomation.js";
import Shape from "./shape.js";
import * as graphicsUtil from "./graphics_util.js";

let shape;
let baseSpeed = 20;
let speed = baseSpeed;
let scene;
let isBtnDown = false;

export function createMain(vue, shapeTypeQueue) {
	let isKeyDown = false;
	let cursors;
	let config = new TetrisConfig(22, 10, 24);
	let phaserConfig = {
		parent: "game",
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
		transparent: true,
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
		scene = this;
		if (vue.status == "ready" || vue.status == "pause") {
			if (cursors.space.isDown) {
				vue.status = "start";
				this.physics.resume();
			}
		} else if (vue.status == "start") {
			if (cursors.shift.isDown) {
				vue.status = "pause";
				this.physics.pause();
			}
		}

		if (vue.status != "start" || board.considering) {
			return;
		}

		if (!shape) {
			shape = new Shape(this, config, shapeTypeQueue.shift());
			this.physics.add.collider(shape.getPhysicsGroup(), board.getStaticBlocks());
		}

		shape.setVelocityY(speed + vue.speedLevel * baseSpeed);
		cursorOperation();
		// 回転により微妙にX軸がずれるので補正
		shape.adjustX();

		if (shape.collided()) {
			if (shape.getMinY() <= 0) {
				infomation.showEnd();
				vue.status = "end";
			}
			board.stack(shape);
			let row = board.deleteCompLine(() => {
				shape = null;
				vue.speedLevel = Math.floor(vue.score / 1000) + 1;
			});
			if (row > 1) {
				const multiNum = row / 10 + 1;
				vue.score += Math.floor(row * 100 * multiNum);
			} else {
				vue.score += row * 100;
			}
		}
	}

	function cursorOperation() {
		if (isBtnDown) {
			return;
		}
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
	isBtnDown = true;
	speed = baseSpeed * 4 < 200 ? 200 : baseSpeed * 4;
}

export function dropEnd() {
	isBtnDown = false;
	speed = baseSpeed;
}

export function setPlay() {
	scene.physics.resume();
}

export function setStop() {
	scene.physics.pause();
}
