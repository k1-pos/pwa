// ==========================================================================
// [TUGAS ANGGOTA 6] - MANAJEMEN STOK GUDANG & LAPORAN
// ==========================================================================
const addNewProductLogic = (newProduct, products) => {
    if(!newProduct.value.nama || !newProduct.value.harga || !newProduct.value.stok) return;
    products.value.push({
        id: Date.now(),
        nama: newProduct.value.nama,
        harga: newProduct.value.harga,
        stok: newProduct.value.stok,
        icon: newProduct.value.icon
    });
    newProduct.value = { nama: '', harga: null, stok: null, icon: '☕' };
};

const deleteProductLogic = (id, products) => {
    if(confirm('Hapus produk ini?')) {
        products.value = products.value.filter(p => p.id !== id);
    }
};