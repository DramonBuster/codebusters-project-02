//FT-03 По нажатию на кнопку "My Library" отрисовывается библиотека пользователя
const btnMyLibrary = document.querySelector('.library');
const btnHome = document.querySelector('.home');
const header = document.querySelector('.page-header');


btnMyLibrary.addEventListener('click', changeLibraryThemeHeader);

function changeLibraryThemeHeader() {
    header.classList.add('library-header');
    btnMyLibrary.classList.add('current');
    btnHome.classList.remove('current');
}