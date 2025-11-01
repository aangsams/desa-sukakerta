/** @type {import('tailwindcss').Config} */
export default {
	content: [
		"./index.html",
		"./profil.html",
		"./statistik.html",
		"./transparansi.html",
		"./layanan.html",
		"./lapak.html",
		"./galeri.html",
		"./components/**/*.html",
		"./assets/js/**/*.js",
	],
	theme: {
		extend: {
			colors: {
				primary: "#2E7D32", // Hijau daun
				secondary: "#FBC02D", // Kuning padi
				accent: "#0288D1", // Biru langit
				base: "#F9FAFB", // Background
				textmain: "#374151", // Abu gelap
				"primary-dark": "#256628", // Varian hijau tua
				"secondary-light": "#FFF59D", // Kuning muda
			},
			fontFamily: {
				sans: ["Poppins", "Inter", "sans-serif"],
				heading: ["Poppins", "sans-serif"],
			},
			boxShadow: {
				soft: "0 4px 12px rgba(0,0,0,0.06)",
				medium: "0 6px 16px rgba(0,0,0,0.1)",
			},
			borderRadius: {
				xl: "1rem",
				"2xl": "1.5rem",
			},
			container: {
				center: true,
				padding: "1rem",
			},
		},
	},

	plugins: [require("daisyui")],

	daisyui: {
		themes: [
			{
				desa: {
					primary: "#2E7D32",
					secondary: "#FBC02D",
					accent: "#0288D1",
					neutral: "#374151",
					"base-100": "#F9FAFB",
					info: "#0288D1",
					success: "#4CAF50",
					warning: "#FFB300",
					error: "#D32F2F",
				},
			},
		],
	},
};
