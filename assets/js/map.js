document.addEventListener("DOMContentLoaded", function () {
	// Koordinat tengah Peta
	const desaSukakerta = [-7.145544225495087, 108.21370969734988];

	// Inisialisasi peta
	const map = L.map("map").setView(desaSukakerta, 14);

	// --- PERUBAHAN DI SINI: Mengganti Tile Layer ---
	// Sebelumnya: L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", ...)
	// Sekarang: Menggunakan layer satelit Esri World Imagery
	L.tileLayer(
		"https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
		{
			attribution:
				"Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community",
			maxZoom: 18,
		}
	).addTo(map);

	// --- 1. PENANDA (MARKER) UTAMA ---
	const marker = L.marker(desaSukakerta).addTo(map);
	marker
		.bindPopup("<b>Desa Sukakerta</b><br>Kec. Panumbangan, Kab. Ciamis")
		.openPopup(); // Langsung buka popup ini

	// --- 2. TAMBAHAN MARKER TEMPAT PENTING ---

	const coordsBalaiDesa = [-7.1464646138911885, 108.21314313084818];
	const markerBalaiDesa = L.marker(coordsBalaiDesa).addTo(map);
	markerBalaiDesa.bindPopup("<b>Kantor Desa Sukakerta</b>");

	const coordsGedungDakwah = [-7.147966238341924, 108.21101821600854];
	const markerMasjid = L.marker(coordsGedungDakwah).addTo(map);
	markerMasjid.bindPopup("<b>Gedung Dakwah</b>");

	const coordsSekolah = [-7.146636192955685, 108.21239501257453];
	const markerSekolah = L.marker(coordsSekolah).addTo(map);
	markerSekolah.bindPopup("<b>SDN 1 Sukakerta</b>");

	// --- 3. BATAS WILAYAH (GEOJSON) ---

	// Nama file GeoJSON Anda (pastikan ada di folder yang sama)
	const urlGeoJSON = "assets/js/map.geojson";

	// Fungsi untuk memberi gaya pada batas wilayah
	function styleBatas(feature) {
		return {
			color: "#2f7f33", // Warna garis batas (hijau tua)
			weight: 3, // Ketebalan garis
			opacity: 0.8, // Opasitas garis
			fillColor: "#2f7f33", // Warna isian di dalam batas
			fillOpacity: 0.1, // Opasitas isian (10%)
		};
	}

	// Memuat file GeoJSON dan menambahkannya ke peta
	fetch(urlGeoJSON)
		.then((response) => response.json())
		.then((data) => {
			L.geoJSON(data, {
				style: styleBatas, // Terapkan gaya yang sudah dibuat
			}).addTo(map);
		})
		.catch((err) => {
			console.error("Error: Gagal memuat file GeoJSON.", err);
			console.warn(
				"Pastikan file '" + urlGeoJSON + "' ada di folder yang benar."
			);
		});
});
