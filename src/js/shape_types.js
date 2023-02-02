const SHAPE_TYPES = [
	{
		name: "type0",
		blocks: [
			{ x: 0, y: 0 },
			{ x: 0, y: 1 },
			{ x: 0, y: 2 },
			{ x: 1, y: 1 },
		],
		cols: 2,
		rows: 3,
	},
	{
		name: "type1",
		blocks: [
			{ x: 0, y: 0 },
			{ x: 0, y: 1 },
			{ x: 1, y: 1 },
			{ x: 1, y: 2 },
		],
		cols: 2,
		rows: 3,
	},
	{
		name: "type2",
		blocks: [
			{ x: 1, y: 0 },
			{ x: 1, y: 1 },
			{ x: 0, y: 1 },
			{ x: 0, y: 2 },
		],
		cols: 2,
		rows: 3,
	},
	{
		name: "type3",
		blocks: [
			{ x: 0, y: 0 },
			{ x: 1, y: 0 },
			{ x: 0, y: 1 },
			{ x: 1, y: 1 },
		],
		cols: 2,
		rows: 2,
	},
	{
		name: "type4",
		blocks: [
			{ x: 0, y: 0 },
			{ x: 1, y: 0 },
			{ x: 1, y: 1 },
			{ x: 1, y: 2 },
		],
		cols: 2,
		rows: 3,
	},
	{
		name: "type5",
		blocks: [
			{ x: 0, y: 0 },
			{ x: 1, y: 0 },
			{ x: 2, y: 0 },
			{ x: 3, y: 0 },
		],
		cols: 4,
		rows: 1,
	},
	{
		name: "type6",
		blocks: [
			{ x: 0, y: 0 },
			{ x: 0, y: 1 },
			{ x: 1, y: 0 },
			{ x: 0, y: 2 },
		],
		cols: 2,
		rows: 3,
	},
];

export default class ShapeTypeQueue {
	static limit = 3;
	constructor() {
		this.types = [];
		for (let i = 0; i < ShapeTypeQueue.limit; i++) {
			this.types.push(SHAPE_TYPES[ShapeTypeQueue.random()]);
		}
		this.shiftCount = 0;
	}

	shift() {
		this.types.push(SHAPE_TYPES[ShapeTypeQueue.random()]);
		this.shiftCount++;
		return this.types.shift();
	}

	static random() {
		return Math.floor(Math.random() * SHAPE_TYPES.length);
	}
}
