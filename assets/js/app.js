/*Show menu*/
const showMenu = (toggleId, navID) => {
    const toggle = document.getElementById(toggleId);
    nav = document.getElementById(navID);

    if (toggle && nav) {
        toggle.addEventListener('click', () => {
            nav.classList.toggle('show_menu')
        })
    }
}

showMenu('nav-toggle', 'nav-menu');