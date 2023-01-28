<template>
	<div id="app" :class="`level${speedLevel}`">
		<div class="wall wall1"></div>
		<div class="wall wall2"></div>
		<div class="wall wall3"></div>
		<div class="wall wall4"></div>
		<div class="wall wall5"></div>

		<div class="gameContainer">
			<div class="leftSide">
				<div class="side scoreBoard">
					<img src="@/assets/logo.png" class="logo" />
					<p class="scoreBoard_text">Play Tetris for free. Browser-based online Tetris game.</p>
					<hr />

					<div class="scoreBoard_score">
						<img src="@/assets/crown.svg" class="icon" />
						<p class="head">SCORE</p>
						<div class="scoreBoard_score_card">
							<img src="@/assets/score_cards.png" />
							<span class="num">{{ formattedScore }}</span>
						</div>
					</div>
					<hr />

					<div class="scoreBoard_level">
						<p class="head">SPEED LEVEL</p>
						<ul>
							<li :class="speedLevel >= 1 ? 'active' : ''"></li>
							<li :class="speedLevel >= 2 ? 'active' : ''"></li>
							<li :class="speedLevel >= 3 ? 'active' : ''"></li>
							<li :class="speedLevel >= 4 ? 'active' : ''"></li>
							<li :class="speedLevel >= 5 ? 'active' : ''"></li>
						</ul>
					</div>
				</div>

				<div class="side stateBoard">
					<button type="button" class="btn" @click="play"><span class="mini">Space</span>PLAY<img src="@/assets/play.svg" /></button>
					<button type="button" class="btn" @click="stop"><span class="mini">Shift</span>STOP<img src="@/assets/stop.svg" /></button>
				</div>
			</div>

			<div class="main">
				<div id="game"></div>
			</div>

			<div class="side rightSide">
				<p class="head">NEXT</p>
				<div id="side"></div>
				<div class="control">
					<img src="@/assets/control.svg" class="icon" />
					<p class="head">CONTROL</p>
					<div class="control_btn">
						<button type="button" class="btn control_btn_up" @click="tern"><img src="@/assets/tern.svg" /></button>
						<button type="button" class="btn control_btn_left" @click="left"><img src="@/assets/left.svg" /></button>
						<button type="button" class="btn control_btn_right" @click="right"><img src="@/assets/right.svg" /></button>
						<button type="button" ref="dropBtn" class="btn control_btn_drop"><img src="@/assets/drop.svg" /></button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import "modern-css-reset/dist/reset.css";
import ShapeTypeQueue from "./js/shape_types.js";
import * as main from "./js/main.js";
import * as side from "./js/side.js";

let shapeTypeQueue = new ShapeTypeQueue();

export default {
	name: "App",
	components: {},
	data() {
		return {
			status: "ready",
			score: 0,
			speedLevel: 1,
			dropInterval: null,
		};
	},
	created() {
		main.createMain(this, shapeTypeQueue);
		side.createSide(this, shapeTypeQueue);
	},
	mounted() {
		this.$refs.dropBtn.onmousedown = this.drop;
		this.$refs.dropBtn.onmouseup = this.dropEnd;
	},
	computed: {
		formattedScore() {
			return ("0000" + this.score).slice(-4);
		},
	},
	methods: {
		play() {
			this.status = "start";
			main.setPlay();
		},
		stop() {
			this.status = "pause";
			main.setStop();
		},
		tern() {
			if (this.status == "start") {
				main.tern();
			}
		},
		left() {
			if (this.status == "start") {
				main.left();
			}
		},
		right() {
			if (this.status == "start") {
				main.right();
			}
		},
		drop() {
			console.log("drop");
			if (this.status != "start") {
				return;
			}
			this.dropInterval = setInterval(() => {
				main.drop();
			}, 20);
		},
		dropEnd() {
			if (this.status != "start") {
				return;
			}
			clearInterval(this.dropInterval);
			main.dropEnd();
		},
	},
};
</script>

<style lang="scss">
#game {
	background-color: rgba(245, 245, 245, 0.4);
	border: 1px solid #121212;
	line-height: 0;
}
</style>
