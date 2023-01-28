module.exports = {
	publicPath: process.env.NODE_ENV === 'production' ? '/tetorisaurus/' : '/',
	css: {
		loaderOptions: {
			scss: {
				prependData: `@import "@/assets/scss/common.scss";`,
			},
		},
	},
};
