export default class TetrisConfig {
    constructor(row, col, blockSize) {
        this.row = row;
		this.col = col;
		this.blockSize = blockSize;
		this.width = this.blockSize * this.col;
		this.height = this.blockSize * this.row;
		this.blockHalfSize = this.blockSize / 2;
		this.blockScale = this.blockSize / 24;
		this.halfWidth = this.width / 2;
		this.halfHeight = this.height / 2;
		this.blockSteps = [this.blockHalfSize];
		for (let i = 1; i < this.row; i++) {
			this.blockSteps.push(this.blockSize * i + this.blockHalfSize);
		}
		this.grid = [];
		for (let i = 0; i < this.row; i++) {
			this.grid.push(this.blockSize * i);
		}
    }

    
}