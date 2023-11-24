const API_URL = process.env.API_URL;

module.exports = {
	reactStrictMode: true,
	images: {
		domains: ["specials-images.forbesimg.com"],
		remotePatterns: [
			{
				protocol: "https",
				hostname: "specials-images.forbesimg.com",
				port: "",
				pathname: "/imageserve/**",
			},
		],
	},
	async rewrites() {
		return [
			{
				source: "/api/billionaires",
				destination: `${API_URL}`,
			},
			{
				source: "/api/billionaires/:id",
				destination: `${API_URL}/person/:id`,
			},
		];
	},
};
