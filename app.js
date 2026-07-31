// ==========================================================================
// [APP.JS] - PERANGKAI UTAMA UNTUK SEMUA ANGGOTA
// ==========================================================================
const { createApp, ref, computed } = Vue;

createApp({
  setup() {
    // State Navigasi & Auth
    const page = ref("login");
    const username = ref("");
    const password = ref("");
    const userRole = ref("");

    // Data Produk & Keranjang (Anggota 3 & 6)
    const keranjang = ref([]);
    const undoItemCache = ref(null);
    const newProduct = ref({ nama: "", harga: null, stok: null, icon: "☕" });
    const products = ref([
      { id: 1, nama: "Kopi Hitam", harga: 10000, stok: 15, icon: "☕" },
      { id: 2, nama: "Teh Manis", harga: 5000, stok: 20, icon: "🍵" },
      { id: 3, nama: "Roti Bakar", harga: 12000, stok: 10, icon: "🍞" },
    ]);

    // Fungsi Login & Logout
    const doLogin = () => {
      if ((username.value === "admin" && password.value === "admin") || (username.value === "kasir1" && password.value === "kasir1")) {
        userRole.value = username.value.includes("admin") ? "admin" : "kasir";
        page.value = "dashboard";
        alert("Login Berhasil!");
      } else {
        alert("Username atau Password salah!");
      }
    };

    const doLogout = () => {
      page.value = "login";
      username.value = "";
      password.value = "";
      userRole.value = "";
    };

    // Hubungkan Logika Kasir, Pembayaran & Admin dari File Lain
    const addToCart = (produk) => addToCartLogic(produk, keranjang);
    const changeQty = (item, change) => changeQtyLogic(item, change, products, removeItem);
    const removeItem = (item) => removeItemLogic(item, products, keranjang, undoItemCache);
    const undoDelete = () => undoDeleteLogic(undoItemCache, keranjang);
    const addNewProduct = () => addNewProductLogic(newProduct, products);
    const deleteProduct = (id) => deleteProductLogic(id, products);

    // Hitung Total Belanja
    const totalHarga = computed(() => {
      return keranjang.value.reduce((total, item) => total + item.harga * item.qty, 0);
    });

    return {
      page,
      username,
      password,
      userRole,
      products,
      newProduct,
      keranjang,
      totalHarga,
      doLogin,
      doLogout,
      addToCart,
      changeQty,
      removeItem,
      undoDelete,
      addNewProduct,
      deleteProduct,
    };
  },
}).mount("#app");
