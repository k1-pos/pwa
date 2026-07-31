// ==========================================================================
// [APP.JS] - PERANGKAI UTAMA UNTUK SEMUA ANGGOTA
// ==========================================================================
const { createApp, ref, computed } = Vue;

createApp({
  setup() {
    // State Navigasi & Auth (Anggota 1 & 2)
    const page = ref("login");
    const username = ref("");
    const password = ref("");
    const userRole = ref("");

    // State QRIS & Struk Pembayaran (Anggota 4)
    const showQRIS = ref(false);
    const showReceipt = ref(false);
    const currentTransactionId = ref("");
    const paymentMethod = ref("CASH");
    const cashReceived = ref(0);
    const lastReceiptData = ref([]);
    const totalBackup = ref(0);
    const cashReceivedBackup = ref(0);

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
      } else {
        alert("Username atau Password salah! (Gunakan: admin/admin atau kasir1/kasir1)");
      }
    };

    const doLogout = () => {
      page.value = "login";
      username.value = "";
      password.value = "";
      userRole.value = "";
    };

    // Hubungkan Logika Kasir, Pembayaran & Admin dari File Lain milik Anggota (navigasi.js, kasir.js, pembayaran.js, admin.js)
    const addToCart = (produk) => addToCartLogic(produk, keranjang);
    const changeQty = (item, change) => changeQtyLogic(item, change, products, removeItem);
    const removeItem = (item) => removeItemLogic(item, products, keranjang, undoItemCache);
    const undoDelete = () => undoDeleteLogic(undoItemCache, keranjang);
    const addNewProduct = () => addNewProductLogic(newProduct, products);
    const deleteProduct = (id) => deleteProductLogic(id, products);

    // Hitung Total Belanja & Kembalian
    const totalHarga = computed(() => {
      return keranjang.value.reduce((total, item) => total + item.harga * item.qty, 0);
    });

    const cashChange = computed(() => {
      return cashReceived.value - totalHarga.value;
    });

    // Fitur Transaksi QRIS & Cash
    const initiatePayment = () => {
      currentTransactionId.value = Math.floor(Date.now() / 1000).toString();
      if (paymentMethod.value === "CASH") {
        if (cashReceived.value < totalHarga.value) {
          alert("Uang tunai kurang dari total tagihan!");
          return;
        }
        finalizeTransaction();
      } else {
        showQRIS.value = true;
      }
    };

    const finalizeTransaction = () => {
      lastReceiptData.value = [...keranjang.value];
      totalBackup.value = totalHarga.value;
      cashReceivedBackup.value = cashReceived.value;
      showQRIS.value = false;
      showReceipt.value = true;
    };

    const closeReceipt = () => {
      keranjang.value = [];
      cashReceived.value = 0;
      showReceipt.value = false;
      page.value = "dashboard";
    };

    return {
      page,
      username,
      password,
      userRole,
      products,
      newProduct,
      keranjang,
      totalHarga,
      showQRIS,
      showReceipt,
      currentTransactionId,
      paymentMethod,
      cashReceived,
      cashChange,
      lastReceiptData,
      totalBackup,
      cashReceivedBackup,
      doLogin,
      doLogout,
      addToCart,
      changeQty,
      removeItem,
      undoDelete,
      addNewProduct,
      deleteProduct,
      initiatePayment,
      finalizeTransaction,
      closeReceipt
    };
  },
}).mount("#app");