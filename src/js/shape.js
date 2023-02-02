import * as util from "./util.js";

export default class Shape {
	constructor(game, config, type) {
		this.config = config;

        this.width = type.cols * config.blockSize;
        this.height = type.rows * config.blockSize;

		let shape = game.physics.add.group();
		const adjust = config.blockHalfSize + config.blockSize * (type.cols / 2 - 1);

		let shapeCenterX = config.halfWidth;
		if (type.cols % 2 === 1) {
			shapeCenterX += config.blockHalfSize;
		}

		let shapeCenterY = type.rows * config.blockSize * -1 + (type.rows * config.blockSize) / 2;

		this.axis = shape.create(shapeCenterX, shapeCenterY, "axis");
		type.blocks.forEach((block) => {
			const x = config.blockSize * block.x + config.halfWidth - adjust;
			const y = (config.blockSize * block.y + config.blockHalfSize) * -1;
			let sprite = shape.create(x, y, type.name);
			sprite.setScale(config.blockScale);
		});

		this.physicsGroup = shape;
		this.hasOdd = type.cols % 2 === 1 || type.rows % 2 === 1;
		this.xOdd = type.cols % 2 === 1;
	}

	getPhysicsGroup() {
		return this.physicsGroup;
	}

	getBlocks() {
		return this.physicsGroup.getChildren();
	}

	rotate() {
        let length = this.width;
        if (this.direction % 2 === 1) {
            length = this.height;
        }
        let left = this.axis.x - length / 2;
        let right = this.axis.x + length / 2 + (this.xOdd ? this.config.blockHalfSize : 0);
        if (left < 0) {
            this.physicsGroup.incX(this.config.blockSize);
        }
        if (right > this.config.width) {
            this.physicsGroup.incX((right - this.config.width) * -1);
        }

        if (this.hasOdd) {
			if (this.xOdd) {
				this.physicsGroup.incX(this.config.blockHalfSize);
			} else {
				this.physicsGroup.incX(this.config.blockHalfSize * -1);
			}
			this.xOdd = !this.xOdd;
		}
		this.physicsGroup.rotateAround(this.axis, 90 * (Math.PI / 180) * -1);
        this.direction = (this.direction + 1) % 4;

	}

	adjustX() {
		this.getBlocks().forEach((block) => {
			if (block != this.axis) {
				let x = util.approximation(this.config.blockSteps, block.x);
				block.setX(x);
			}
		});
	}

	collided() {
		let touching = false;
		this.getBlocks().forEach((block) => {
			if (!touching && block != this.axis) {
				if (block.body.touching.down || block.y >= this.config.height - this.config.blockHalfSize) {
					touching = true;
				}
			}
		});
		return touching;
	}

	incPoint(x, y) {
		this.physicsGroup.incXY(x, y);
	}

	setVelocityY(velocity) {
		this.physicsGroup.setVelocityY(velocity);
	}

	moveLeft() {
		const leftLimit = this.config.blockHalfSize;
		if (leftLimit < this.getMinX()) {
			this.physicsGroup.incX(this.config.blockSize * -1);
		}
	}

	moveRight() {
		const rightLimit = this.config.width - this.config.blockHalfSize;
		if (rightLimit > this.getMaxX()) {
			this.physicsGroup.incX(this.config.blockSize);
		}
	}

	getMinX() {
		let minX = 99999;
		this.getBlocks().forEach((block) => {
			minX = block.x < minX ? block.x : minX;
		});
		return minX;
	}

	getMaxX() {
		let maxX = 0;
		this.getBlocks().forEach((block) => {
			maxX = block.x > maxX ? block.x : maxX;
		});
		return maxX;
	}

	getMinY() {
		let minY = 99999;
		this.getBlocks().forEach((block) => {
			minY = block.y < minY ? block.y : minY;
		});
		return minY;
	}

	disable() {
		this.getBlocks().forEach((block) => {
			block.disableBody(true, true);
		});
	}
}
