/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
			colors: {
				"viking-orange": "#FF8C00",
				"viking-blue": "#4169E1",
				"viking-purple": "#8A2BE2",
			},
			maxWidth: {
				"game-board": "320px",
			},
		},
	},
	plugins: [],
};
