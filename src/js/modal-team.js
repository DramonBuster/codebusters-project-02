const btnShowTeam = document.querySelector('.footer__team');
const lightBox = document.querySelector('.team__lightbox');
const btnTeamModalClose = document.querySelector('.team__modal--close');
const body = document.querySelector('body');
let btn = document.querySelector('#toTop');

btnShowTeam.addEventListener('click', onTeamModalOpen);

function onTeamModalOpen() {
  lightBox.classList.remove('is-hidden');
  body.classList.add('modal-open');
    btn.classList.remove('show');

  btnTeamModalClose.addEventListener('click', onTeamModalClose);
  lightBox.addEventListener('click', evt => {
    if (evt.target.classList.contains('team__lightbox')) {
      onTeamModalClose();
    }
  });

  window.addEventListener('keydown', evt => {
    if (evt.code === 'Escape') {
      onTeamModalClose();
    }
  });
}

function onTeamModalClose() {
  btnTeamModalClose.removeEventListener('click', onTeamModalClose);
  lightBox.removeEventListener('click', evt => {
    if (evt.target.classList.contains('team__lightbox')) {
      onTeamModalClose();
    }
  });
  window.removeEventListener('keydown', evt => {
    if (evt.code === 'Escape') {
      onTeamModalClose();
    }
  });

  lightBox.classList.add('is-hidden');
  body.classList.remove('modal-open');
}
