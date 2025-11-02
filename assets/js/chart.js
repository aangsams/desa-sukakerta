/**
 * Fungsi bantuan untuk memformat angka menjadi format mata uang Rupiah.
 * @param {number} angka - Angka yang akan diformat.
 * @returns {string} String yang sudah diformat (mis: "Rp 1.000.000").
 */
function formatRupiah(angka) {
	return new Intl.NumberFormat("id-ID", {
		style: "currency",
		currency: "IDR",
		minimumFractionDigits: 0,
		maximumFractionDigits: 0,
	}).format(angka);
}

/**
 * Titik masuk utama. Memuat semua data JSON yang diperlukan saat halaman siap.
 */
document.addEventListener("DOMContentLoaded", function () {
	// Tentukan path ke file-file data Anda
	const urlPenduduk = "assets/data/penduduk.json";
	const urlApbdes = "assets/data/apbdes2024.json";

	// Gunakan Promise.all untuk memuat semua file JSON
	// Ini lebih efisien karena memuat file secara paralel
	Promise.all([
		fetch(urlPenduduk).then((response) => response.json()),
		fetch(urlApbdes).then((response) => response.json()),
	])
		.then(([dataPenduduk, dataApbdes]) => {
			// Setelah kedua file berhasil dimuat, panggil fungsi untuk membuat grafik
			// Fungsi ini akan mengecek apakah elemen grafiknya ada di halaman
			buatGrafikPenduduk(dataPenduduk);
			buatGrafikApbdes(dataApbdes);
		})
		.catch((error) => {
			console.error("Error saat memuat file JSON:", error);
			// Anda bisa menampilkan pesan error di UI jika mau
		});
});

/**
 * Membuat grafik Gender (doughnut) dan Pekerjaan (bar)
 * @param {object} data - Data dari penduduk.json
 */
function buatGrafikPenduduk(data) {
	// === GRAFIK GENDER (Dinamis) ===
	const genderCtxEl = document.getElementById("genderChart");
	if (genderCtxEl) {
		try {
			const genderCtx = genderCtxEl.getContext("2d");
			new Chart(genderCtx, {
				type: "doughnut",
				data: {
					labels: ["Laki-laki", "Perempuan"],
					datasets: [
						{
							data: [
								data.gender.laki_laki,
								data.gender.perempuan,
							],
							backgroundColor: ["#2E7D32", "#FBC02D"],
							borderWidth: 1,
						},
					],
				},
				options: {
					plugins: {
						legend: {
							position: "bottom",
						},
					},
				},
			});
		} catch (e) {
			console.error("Gagal membuat Grafik Gender:", e);
		}
	}

	// === GRAFIK PEKERJAAN (Dinamis) ===
	const pekerjaanCtxEl = document.getElementById("pekerjaanChart");
	if (pekerjaanCtxEl) {
		try {
			// --- Memproses data pekerjaan ---
			const labelsPekerjaan = data.pekerjaan.map((item) => item.nama);
			const dataPekerjaan = data.pekerjaan.map((item) => item.jumlah);

			const pekerjaanCtx = pekerjaanCtxEl.getContext("2d");
			new Chart(pekerjaanCtx, {
				type: "bar",
				data: {
					labels: labelsPekerjaan,
					datasets: [
						{
							label: "Jumlah Penduduk",
							data: dataPekerjaan,
							backgroundColor: "#2E7D32",
							borderRadius: 6,
						},
					],
				},
				options: {
					scales: {
						y: {
							beginAtZero: true,
						},
					},
					plugins: {
						legend: {
							display: false,
						},
					},
				},
			});
		} catch (e) {
			console.error("Gagal membuat Grafik Pekerjaan:", e);
		}
	}
}

/**
 * Memperbarui kartu ringkasan dan membuat grafik APBDes
 * @param {object} data - Data dari apbdes2024.json
 */
function buatGrafikApbdes(data) {
	try {
		// === 1. PERBARUI KONTEN DINAMIS (KARTU, JUDUL, PDF) ===
		// Elemen-elemen ini mungkin tidak ada di setiap halaman,
		// jadi kita cek 'if (element)' untuk menghindari error.

		const tahunEl = document.getElementById("apbdes-tahun");
		if (tahunEl) tahunEl.textContent = data.tahun;

		const pdfLinkEl = document.getElementById("apbdes-pdf-link");
		if (pdfLinkEl) pdfLinkEl.href = data.dokumenPdf;

		const pdfTextEl = document.getElementById("apbdes-pdf-text");
		if (pdfTextEl)
			pdfTextEl.textContent = `Lihat Dokumen Lengkap (PDF ${data.tahun})`;

		// Kartu Pendapatan
		const pend = data.ringkasan.pendapatan;
		const pendPersen = ((pend.realisasi / pend.anggaran) * 100).toFixed(0);
		const pendAnggaranEl = document.getElementById("pendapatan-anggaran");
		if (pendAnggaranEl)
			pendAnggaranEl.textContent = `Anggaran: ${formatRupiah(
				pend.anggaran
			)}`;

		const pendRealisasiEl = document.getElementById("pendapatan-realisasi");
		if (pendRealisasiEl)
			pendRealisasiEl.textContent = `Realisasi: ${formatRupiah(
				pend.realisasi
			)}`;

		const pendBarEl = document.getElementById("pendapatan-bar");
		if (pendBarEl) pendBarEl.style.width = `${pendPersen}%`;

		const pendPersenEl = document.getElementById("pendapatan-persen");
		if (pendPersenEl)
			pendPersenEl.textContent = `${pendPersen}% terealisasi`;

		// Kartu Belanja
		const bel = data.ringkasan.belanja;
		const belPersen = ((bel.realisasi / bel.anggaran) * 100).toFixed(0);
		const belAnggaranEl = document.getElementById("belanja-anggaran");
		if (belAnggaranEl)
			belAnggaranEl.textContent = `Anggaran: ${formatRupiah(
				bel.anggaran
			)}`;

		const belRealisasiEl = document.getElementById("belanja-realisasi");
		if (belRealisasiEl)
			belRealisasiEl.textContent = `Realisasi: ${formatRupiah(
				bel.realisasi
			)}`;

		const belBarEl = document.getElementById("belanja-bar");
		if (belBarEl) belBarEl.style.width = `${belPersen}%`;

		const belPersenEl = document.getElementById("belanja-persen");
		if (belPersenEl) belPersenEl.textContent = `${belPersen}% terealisasi`;

		// Kartu Pembiayaan
		const pemb = data.ringkasan.pembiayaan;
		const pembAnggaranEl = document.getElementById("pembiayaan-anggaran");
		if (pembAnggaranEl)
			pembAnggaranEl.textContent = `Anggaran: ${formatRupiah(
				pemb.anggaran
			)}`;

		const pembRealisasiEl = document.getElementById("pembiayaan-realisasi");
		if (pembRealisasiEl)
			pembRealisasiEl.textContent = `Realisasi: ${formatRupiah(
				pemb.realisasi
			)}`;

		// === 2. BUAT GRAFIK APBDES ===

		const commonOptions = {
			responsive: true,
			scales: {
				y: {
					beginAtZero: true,
					grid: { color: "rgba(229, 231, 235, 0.5)" },
					ticks: {
						callback: function (value) {
							if (value >= 1000000000)
								return value / 1000000000 + " M";
							if (value >= 1000000)
								return value / 1000000 + " Jt";
							if (value >= 1000) return value / 1000 + " Rb";
							return value;
						},
					},
				},
				x: {
					grid: { display: false },
				},
			},
			plugins: {
				legend: { position: "bottom" },
				tooltip: {
					backgroundColor: "#1F2937",
					padding: 12,
					titleFont: { size: 14, weight: "bold" },
					bodyFont: { size: 12 },
					cornerRadius: 6,
					callbacks: {
						label: function (context) {
							let label = context.dataset.label || "";
							if (label) label += ": ";
							if (context.parsed.y !== null) {
								label += formatRupiah(context.parsed.y);
							}
							return label;
						},
					},
				},
			},
		};

		const commonDatasetProps = {
			borderWidth: 1,
			borderRadius: 4,
		};

		// Grafik Pendapatan
		const incomeCtxEl = document.getElementById("incomeChart");
		if (incomeCtxEl) {
			new Chart(incomeCtxEl, {
				type: "bar",
				data: {
					labels: data.charts.pendapatan.labels,
					datasets: [
						{
							label: "Anggaran (Rp)",
							data: data.charts.pendapatan.anggaran,
							backgroundColor: "rgba(156, 163, 175, 0.5)",
							borderColor: "rgba(156, 163, 175, 1)",
							...commonDatasetProps,
						},
						{
							label: "Realisasi (Rp)",
							data: data.charts.pendapatan.realisasi,
							backgroundColor: "#2E7D32",
							borderColor: "#2E7D32",
							...commonDatasetProps,
						},
					],
				},
				options: commonOptions,
			});
		}

		// Grafik Belanja
		const expenseCtxEl = document.getElementById("expenseChart");
		if (expenseCtxEl) {
			new Chart(expenseCtxEl, {
				type: "bar",
				data: {
					labels: data.charts.belanja.labels,
					datasets: [
						{
							label: "Anggaran (Rp)",
							data: data.charts.belanja.anggaran,
							backgroundColor: "rgba(156, 163, 175, 0.5)",
							borderColor: "rgba(156, 163, 175, 1)",
							...commonDatasetProps,
						},
						{
							label: "Realisasi (Rp)",
							data: data.charts.belanja.realisasi,
							backgroundColor: "#D32F2F",
							borderColor: "#D32F2F",
							...commonDatasetProps,
						},
					],
				},
				options: commonOptions,
			});
		}
	} catch (e) {
		console.error("Gagal memproses data APBDes:", e);
	}
}
