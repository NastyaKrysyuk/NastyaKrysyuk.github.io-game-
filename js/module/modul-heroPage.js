import {createBackgroundApp,createContainer,createInput,createLabel} from "./modul-helper-function.js"
import {wrapper} from "../spa.js"

function createChooseHeroPage() {
  createBackgroundApp();
  wrapper.appendChild(createContainer("choose", "text-content", "Choose a hero", createFormHero, "character"));
}

function createFormHero() {
  let form = document.createElement('form');
  form.name = "myform"
  form.appendChild(createInput("character1", "character", "character", true));
  form.appendChild(createLabel("character1", "img/character.png"));
  form.appendChild(createInput("character2", "character", "character1", false));
  form.appendChild(createLabel("character2", "img/character1.png"));
  form.appendChild(createInput("character3", "character", "character2", false));
  form.appendChild(createLabel("character3", "img/character2.png"));
  return form;
}

export {createChooseHeroPage}