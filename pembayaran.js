const removeItemLogic = (item, products, keranjang, undoItemCache) => {
    const produkAsli = products.value.find(p => p.id === item.id);
    undoItemCache.value = { itemData: { ...item }, produkAsliRef: produkAsli };
    produkAsli.stok += item.qty; 
    keranjang.value = keranjang.value.filter(i => i.id !== item.id);

    const undoBar = document.getElementById('undoBar');
    if(undoBar) undoBar.classList.add('show');
};

const undoDeleteLogic = (undoItemCache, keranjang) => {
    if (!undoItemCache.value) return;
    const cache = undoItemCache.value;
    cache.produkAsliRef.stok -= cache.itemData.qty;
    keranjang.value.push(cache.itemData);
    document.getElementById('undoBar').classList.remove('show');
};