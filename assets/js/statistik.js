/**
 * =================================================================
 * DATA STATISTIK KEPENDUDUKAN DESA SUKAKERT
 * (assets/js/statistik.js)
 * =================================================================
 *
 * File ini berisi semua data dan konfigurasi Chart.js untuk
 * halaman 'pages/data/statistik.html'.
 *
 */

// Data Dummy (NANTI GANTI DENGAN DATA ASLI DARI DATABASE)
const dataStatistik = {
	// Poin 1: Data Total
	total: {
		kk: 1234,
		warga: 3823,
		laki: 1940,
		perempuan: 1883,
	},
	// Poin 7: Jenis Kelamin
	jenisKelamin: {
		labels: ["Laki-laki", "Perempuan"],
		data: [1940, 1883],
		colors: ["#3B82F6", "#EC4899"], // Biru, Pink
	},
	// Poin 8: Kelompok Umur
	kelompokUmur: {
		labels: [
			"0-5 (Balita)",
			"6-18 (Sekolah)",
			"19-59 (Produktif)",
			"60+ (Lansia)",
		],
		data: [350, 900, 2100, 473],
		colors: ["#10B981", "#F59E0B", "#2E7D32", "#6366F1"],
	},
	// Poin 6: Agama
	agama: {
		labels: ["Islam", "Kristen", "Katolik", "Hindu", "Buddha"],
		data: [3810, 5, 2, 1, 5],
		colors: ["#2E7D32", "#3B82F6", "#F59E0B", "#EF4444", "#8B5CF6"],
	},
	// Poin 13: Status Perkawinan
	perkawinan: {
		labels: ["Kawin", "Belum Kawin", "Cerai Hidup", "Cerai Mati"],
		data: [2500, 1100, 123, 100],
		colors: ["#2E7D32", "#F59E0B", "#EF4444", "#6B7280"],
	},
	// Poin 11: Warga Negara
	wargaNegara: {
		labels: ["WNI", "WNA"],
		data: [3823, 0],
		colors: ["#2E7D32", "#EF4444"],
	},
	// Poin 10: Jamkesmas
	jamkesmas: {
		labels: ["Penerima BPJS PBI", "Non-Penerima"],
		data: [1200, 2623],
		colors: ["#10B981", "#D1D5DB"],
	},
	// Poin 5: Pekerjaan (Horizontal Bar)
	pekerjaan: {
		labels: [
			"Petani",
			"Buruh Harian",
			"Karyawan Swasta",
			"Wirausaha",
			"PNS/TNI/Polri",
			"Pelajar/Mahasiswa",
			"Mengurus Rumah Tangga",
			"Lainnya",
		],
		data: [750, 400, 350, 280, 50, 900, 800, 293],
		colors: "#2E7D32",
	},
	// Poin 3: Pendidikan KK (Bar)
	pendidikanKK: {
		labels: [
			"Tidak/Blm Sekolah",
			"SD Sederajat",
			"SMP Sederajat",
			"SMA Sederajat",
			"D1-D3",
			"S1/D4",
			"S2/S3",
		],
		data: [150, 400, 300, 320, 30, 30, 4],
		colors: "#3B82F6",
	},
	// Poin 4: Pendidikan Ditempuh (Donut)
	pendidikanDitempuh: {
		labels: ["PAUD", "TK", "SD", "SMP", "SMA", "Perguruan Tinggi"],
		data: [50, 70, 400, 250, 200, 80],
		colors: [
			"#8B5CF6",
			"#EC4899",
			"#10B981",
			"#3B82F6",
			"#F59E0B",
			"#6366F1",
		],
	},
	// Poin 12: Data Pemilih (Bar)
	pemilih: {
		labels: ["Sukamanah", "Sukasari", "Cidoyang"],
		data: [800, 750, 1300],
		colors: ["#2E7D32", "#FBC02D", "#0288D1"],
	},
	// Poin 9: Data Raskin (Tabel)
	raskin: [
		{ dusun: "Sukamanah", jumlah: 85 },
		{ dusun: "Sukasari", jumlah: 70 },
		{ dusun: "Cidoyang", jumlah: 110 },
	],
};

/**
 * =================================================================
 * FUNGSI INISIALISASI
 * =================================================================
 */
document.addEventListener("DOMContentLoaded", function () {
	// Poin 1: Set Teks Statistik Total
	document.getElementById("total-kk").textContent =
		dataStatistik.total.kk.toLocaleString("id-ID");
	document.getElementById("total-warga").textContent =
		dataStatistik.total.warga.toLocaleString("id-ID");
	document.getElementById("total-laki").textContent =
		dataStatistik.total.laki.toLocaleString("id-ID");
	document.getElementById("total-perempuan").textContent =
		dataStatistik.total.perempuan.toLocaleString("id-ID");

	// Panggil semua fungsi untuk membuat chart
	buatChartPie("chartJenisKelamin", dataStatistik.jenisKelamin);
	buatChartBar("chartKelompokUmur", dataStatistik.kelompokUmur, false); // false = bukan horizontal
	buatChartPie("chartAgama", dataStatistik.agama);
	buatChartDonut("chartPerkawinan", dataStatistik.perkawinan);
	buatChartPie("chartWargaNegara", dataStatistik.wargaNegara);
	buatChartDonut("chartJamkesmas", dataStatistik.jamkesmas);
	buatChartBar("chartPekerjaan", dataStatistik.pekerjaan, true); // true = horizontal
	buatChartBar("chartPendidikanKK", dataStatistik.pendidikanKK, false);
	buatChartDonut("chartPendidikanDitempuh", dataStatistik.pendidikanDitempuh);
	buatChartBar("chartPemilih", dataStatistik.pemilih, false);

	// Poin 9: Isi Tabel Raskin
	const tabelRaskinBody = document.getElementById("tabelRaskin");
	let totalRaskin = 0;
	if (tabelRaskinBody) {
		dataStatistik.raskin.forEach((item) => {
			totalRaskin += item.jumlah;
			tabelRaskinBody.innerHTML += `
        <tr class="hover:bg-gray-50">
          <td class="px-4 py-3">${item.dusun}</td>
          <td class="px-4 py-3 text-center">
            <span class="px-3 py-1 text-sm font-medium bg-yellow-100 text-yellow-800 rounded-full">
              ${item.jumlah} KK
            </span>
          </td>
        </tr>
      `;
		});
		// Tambah baris total
		tabelRaskinBody.innerHTML += `
      <tr class="font-bold bg-gray-100 border-t-2 border-gray-300">
        <td class="px-4 py-3">TOTAL</td>
        <td class="px-4 py-3 text-center">${totalRaskin} KK</td>
      </tr>
    `;
	}
});

/**
 * =================================================================
 * FUNGSI GENERATOR CHART
 * =================================================================
 */

// Opsi default untuk semua chart agar konsisten
const defaultOptions = {
	responsive: true,
	maintainAspectRatio: false,
	plugins: {
		legend: {
			position: "bottom",
			labels: {
				padding: 15,
				boxWidth: 12,
			},
		},
		tooltip: {
			callbacks: {
				label: function (context) {
					const label = context.label || "";
					const value = context.parsed;
					const total = context.chart.data.datasets[0].data.reduce(
						(a, b) => a + b,
						0
					);
					const percentage = ((value / total) * 100).toFixed(1) + "%";
					return ` ${label}: ${value.toLocaleString(
						"id-ID"
					)} (${percentage})`;
				},
			},
		},
	},
};

// Opsi khusus untuk Pie/Donut
const pieOptions = {
	...defaultOptions,
	cutout: "0%", // Ini akan jadi Pie
};

// Opsi khusus untuk Donut
const donutOptions = {
	...defaultOptions,
	cutout: "50%", // Ini akan jadi Donut
};

// Opsi khusus untuk Bar Chart Vertikal
const barOptions = {
	...defaultOptions,
	indexAxis: "x", // 'x' untuk bar vertikal
	plugins: {
		legend: {
			display: false, // Sembunyikan legenda untuk bar chart
		},
		tooltip: {
			callbacks: {
				label: function (context) {
					return ` ${
						context.label
					}: ${context.parsed.y.toLocaleString("id-ID")}`;
				},
			},
		},
	},
	scales: {
		x: { grid: { display: false } },
		y: { beginAtZero: true },
	},
};

// Opsi khusus untuk Bar Chart Horizontal
const horizontalBarOptions = {
	...defaultOptions,
	indexAxis: "y", // 'y' untuk bar horizontal
	plugins: {
		legend: {
			display: false,
		},
		tooltip: {
			callbacks: {
				label: function (context) {
					return ` ${
						context.label
					}: ${context.parsed.x.toLocaleString("id-ID")}`;
				},
			},
		},
	},
	scales: {
		x: { beginAtZero: true },
		y: { grid: { display: false } },
	},
};

/**
 * Fungsi untuk membuat Chart Tipe PIE
 * @param {string} canvasId - ID dari elemen <canvas>
 * @param {object} data - Objek berisi { labels, data, colors }
 */
function buatChartPie(canvasId, data) {
	const ctx = document.getElementById(canvasId);
	if (!ctx) return;
	new Chart(ctx, {
		type: "pie",
		data: {
			labels: data.labels,
			datasets: [
				{
					data: data.data,
					backgroundColor: data.colors,
					borderWidth: 1,
					borderColor: "#fff",
				},
			],
		},
		options: pieOptions,
	});
}

/**
 * Fungsi untuk membuat Chart Tipe DONUT
 * @param {string} canvasId - ID dari elemen <canvas>
 * @param {object} data - Objek berisi { labels, data, colors }
 */
function buatChartDonut(canvasId, data) {
	const ctx = document.getElementById(canvasId);
	if (!ctx) return;
	new Chart(ctx, {
		type: "doughnut",
		data: {
			labels: data.labels,
			datasets: [
				{
					data: data.data,
					backgroundColor: data.colors,
					borderWidth: 1,
					borderColor: "#fff",
				},
			],
		},
		options: donutOptions,
	});
}

/**
 * Fungsi untuk membuat Chart Tipe BAR (Vertikal / Horizontal)
 * @param {string} canvasId - ID dari elemen <canvas>
 * @param {object} data - Objek berisi { labels, data, colors }
 * @param {boolean} isHorizontal - true jika horizontal, false jika vertikal
 */
function buatChartBar(canvasId, data, isHorizontal = false) {
	const ctx = document.getElementById(canvasId);
	if (!ctx) return;
	new Chart(ctx, {
		type: "bar",
		data: {
			labels: data.labels,
			datasets: [
				{
					label: "Jumlah", // Label ini tidak tampil, tapi bagus untuk tooltip
					data: data.data,
					backgroundColor: data.colors,
					borderRadius: 4,
				},
			],
		},
		options: isHorizontal ? horizontalBarOptions : barOptions,
	});
}
