/** @type {import('tailwindcss').Config} */
module.exports = {
	// NOTE: Update this to include the paths to all of your component files.
	content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
	presets: [require("nativewind/preset")],
	theme: {
		extend: {
			colors: {
				"viking-orange": "#FF8C00",
				"viking-blue": "#4169E1",
				"viking-purple": "#8A2BE2",
			},
			// maxWidth: {
			// 	"game-board": "320px",
			// },
		},
	},
	plugins: [],
};
