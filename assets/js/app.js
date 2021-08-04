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

/*Active and remove menu*/
const navLink = document.querySelectorAll('.nav_link');

function linkAction() {
    navLink.forEach(n => n.classList.remove('active'));
    this.classList.add('active');
}

navLink.forEach(n => n.addEventListener('click', linkAction));