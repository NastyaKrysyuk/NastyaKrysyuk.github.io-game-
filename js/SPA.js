import {game} from './game.js';
import {createGamePage} from './module/module-gamePage.js';
import {createMainPage} from './module/module-mainPage.js';
import {createChooseHeroPage} from './module/modul-heroPage.js';
import {createChooseBackgroundPage} from './module/modul-backgroundPage.js';
import {createRulesPage} from './module/module-rulesPage.js';
import {createRecordPage} from './module/module-recordsPage.js';


const wrapper = document.getElementById("wrapper");
window.onhashchange = renderNewState;

function renderNewState() {
  const hash = window.location.hash;
  let state = decodeURIComponent(hash.substr(1));

  if (state === '') {
    state = { page: 'Main' };
  } else {
    state = JSON.parse(state);
  }
  document.getElementById('wrapper').innerHTML = '';

  switch (state.page) {
    case 'Game':
      createGamePage();
      game.start();
      break;
    case 'Main':
      createMainPage();
      break;
    case 'ChooseHero':
      createChooseHeroPage();
      break;
    case 'ChooseBackground':
      createChooseBackgroundPage();
      break;
    case 'Rules':
      createRulesPage();
      break;
    case 'Records':
      createRecordPage();
      break;
  }
}

function switchToState(state) {
  location.hash = encodeURIComponent(JSON.stringify(state));
}
function switchToGame() {
  switchToState({ page: 'Game' });
}
export function switchToMain() {
  game.gameOver(false);
  switchToState({ page: 'Main' });
}
function switchToHero() {
  switchToState({ page: 'ChooseHero' });
}
function switchToBackground() {
  switchToState({ page: 'ChooseBackground' });
}
function switchToRules() {
  switchToState({ page: 'Rules' });
}
function switchToRecords() {
  switchToState({ page: 'Records' });
}

renderNewState();

export{switchToGame,switchToHero,switchToBackground,switchToRules,switchToRecords,wrapper}