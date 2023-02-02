import Phaser from "phaser";
import TetrisConfig from "./tetris_config.js";
import Shape from "./shape.js";
import * as graphicsUtil from "./graphics_util.js";

export function createSide(vue, shapeTypeQueue) {
	let phaserConfig = {
		parent: "side",
		type: Phaser.AUTO,
		width: 98,
		height: 156,
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
	let config = new TetrisConfig(4, 4, 12);
	let shiftCount = 0;
	let nextShapes = [];

	function preload() {
		graphicsUtil.loadAllImages(this);
		graphicsUtil.makeAxisGraphics(this, config);
	}

	function create() {
		renderShapes(this);
	}

	function update() {
		if (shapeTypeQueue.shiftCount > shiftCount) {
			nextShapes.forEach((shape) => {
				shape.disable();
			});
			nextShapes = [];
			renderShapes(this);
			shiftCount = shapeTypeQueue.shiftCount;
		}
	}

	function renderShapes(game) {
		let y = 13;
		shapeTypeQueue.types.forEach((type) => {
			let shape = new Shape(game, config, type);
			shape.incPoint(24, y + type.rows * config.blockSize);
			nextShapes.push(shape);
			y = y + type.rows * config.blockSize + 10;
		});
	}
}
