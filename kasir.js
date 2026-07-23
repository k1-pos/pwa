const addToCartLogic = (produk, keranjang) => {
    if (produk.stok <= 0) return;
    const item = keranjang.value.find(i => i.id === produk.id);
    if (item) {
        item.qty++;
    } else {
        keranjang.value.push({ id: produk.id, nama: produk.nama, harga: produk.harga, qty: 1 });
    }
    produk.stok--;
};


const changeQtyLogic = (item, change, products, removeItem) => {
    const produkAsli = products.value.find(p => p.id === item.id);
    if (change === 1 && produkAsli.stok <= 0) return;
    item.qty += change;
    produkAsli.stok -= change;
    if (item.qty <= 0) removeItem(item);
};