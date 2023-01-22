export default class Infomation {
	constructor(game, config) {
		this.game = game;
		this.config = config;
		Infomation.makeBgGraphics(game, config);
	}

	static makeBgGraphics(game, config) {
		let graphics = game.make.graphics();
		graphics.fillStyle(0x000000, 0.5);
		graphics.fillRect(0, 0, config.width, 200);
		graphics.generateTexture("infoBg", config.width, 200);
		return graphics;
	}

	showEnd() {
		this.bg = this.game.add.sprite(this.config.halfWidth, this.config.halfHeight, "infoBg");
		this.text = this.game.add.text(this.config.halfWidth - 55, this.config.halfHeight - 20, "おわり", { fontSize: "40px", fill: "#fff" });
	}

	showPause() {
		this.bg = this.game.add.sprite(this.config.halfWidth, this.config.halfHeight, "infoBg");
		this.text = this.game.add.text(this.config.halfWidth - 120, this.config.halfHeight - 20, "いちじていし", { fontSize: "40px", fill: "#fff" });
	}

	clear() {
		if (this.bg) {
			this.bg.destroy();
		}
		if (this.text) {
			this.text.destroy();
		}
	}
}
