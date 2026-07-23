const addToCartLogic = (produk, keranjang) => {
    if (produk.stok <= 0) {
        alert("Stok produk habis!");
        return;
    }
    const item = keranjang.value.find(i => i.id === produk.id);
    if (item) { 
        item.qty++; 
    } else { 
        keranjang.value.push({ id: produk.id, nama: produk.nama, harga: produk.harga, qty: 1 }); 
    }
    produk.stok--;
};

const changeQtyLogic = (item, change, products, removeItemFn) => {
    const produkAsli = products.value.find(p => p.id === item.id);
    
    if (change === 1) {
        if (produkAsli.stok <= 0) {
            alert("Stok di gudang tidak mencukupi!");
            return;
        }
        item.qty += 1;
        produkAsli.stok -= 1;
    } else if (change === -1) {
        item.qty -= 1;
        produkAsli.stok += 1;
        if (item.qty <= 0) {
            removeItemFn(item);
        }
    }
};