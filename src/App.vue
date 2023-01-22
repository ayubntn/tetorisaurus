<template>
	<div id="app">
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
					<button type="button" class="btn">PLAY</button>
					<button type="button" class="btn">STOP</button>
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
						<button type="button" class="btn control_btn_drop" @click="drop"><img src="@/assets/drop.svg" /></button>
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
			score: 0,
			speedLevel: 1,
		};
	},
	created() {
		main.createMain(this, shapeTypeQueue);
		side.createSide(this, shapeTypeQueue);
	},
	computed: {
		formattedScore() {
			return ("0000" + this.score).slice(-4);
		},
	},
	methods: {
		tern() {
			main.tern();
		},
		left() {
			main.left();
		},
		right() {
			main.right();
		},
		drop() {
			main.drop();
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
