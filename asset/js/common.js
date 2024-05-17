if (!localStorage.getItem('loginToken')) {
    window.location.href = 'login.html';
}
let logoutBtn = document.getElementById('logout-btn');
logoutBtn.addEventListener("click", logout);
function logout() {
    localStorage.removeItem('loginToken');
    window.location.reload();
}