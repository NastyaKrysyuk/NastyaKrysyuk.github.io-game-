import { createBackgroundApp } from "./modul-helper-function.js"
import {
  switchToGame,
  switchToHero,
  switchToBackground,
  switchToRules,
  switchToRecords,
  wrapper
} from "../spa.js"

function createMainPage() {
  createBackgroundApp();
  wrapper.appendChild(createLogo());
  wrapper.appendChild(createNavigation("main-nav__items", "main-nav"));
}

function createLogo() {
  let logo = document.createElement("object");
  logo.type = "image/svg+xml";
  logo.data = "img/logo/double-ringed-orb.svg"
  return logo;
}

function createNavigation(classNameList, classNameNav) {
  let navgation = document.createElement('nav');
  let list = document.createElement('ul')
  list.className = classNameList;
  navgation.className = classNameNav;
  list.appendChild(createItem("Start game", switchToGame, "start-game"))
  list.appendChild(createItem("Choose a hero", switchToHero))
  list.appendChild(createItem("Choose a background", switchToBackground))
  list.appendChild(createItem("Rules and controls", switchToRules))
  list.appendChild(createItem("Records", switchToRecords))
  navgation.appendChild(list);
  return navgation;
}

function createItem(title, hashChange, id) {
  let item = document.createElement('li');
  let href = document.createElement('a');
  href.textContent = title;
  href.id = id
  href.onclick = hashChange;
  item.appendChild(href);
  return item;
}

export { createMainPage }