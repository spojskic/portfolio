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

    /*This is for removing menu on click on mobile*/
    const navMenu = document.getElementById('nav-menu');
    navMenu.classList.remove('show_menu');
}

navLink.forEach(n => n.addEventListener('click', linkAction));

/*Auto write text*/

const iAm = document.getElementById('autoWrite');
let index = 0;


const texts = ['Web Developer    ', 'Gym Addict    ', 'Anime Fan    ', 'Gamer    ']

let wordCounter = 0;
let text = texts[wordCounter];


function writeText() {
    iAm.innerText = text.slice(0, index);
    index++;

    if (index > text.length) {
        index = 1;
        wordCounter++;
        text = texts[wordCounter];
        if (wordCounter === 3) {
            wordCounter = 0;
            text = texts[wordCounter];
        }
    }
}

setInterval(writeText, 150);
