// ==========================================================================
function toggleDrawer() {
    const drawer = document.getElementById('drawer');
    const overlay = document.getElementById('overlay');
    if (!drawer) return;
    const isOpen = drawer.classList.toggle('open');
    if(overlay) overlay.classList.toggle('active', isOpen);
}

function closeDrawer() {
    const drawer = document.getElementById('drawer');
    if (drawer) {
        drawer.classList.remove('open');
        document.getElementById('overlay').classList.remove('active');
    }
}

function triggerRefresh() {
    const btn = document.querySelector('.refresh-btn');
    if(btn) btn.style.transform = 'rotate(360deg)';
    setTimeout(() => { window.location.reload(); }, 300);
}