import {createBackgroundApp,createContainer,createInput,createLabel} from "./modul-helper-function.js"
import {wrapper} from "../spa.js"

function createChooseBackgroundPage() {
  createBackgroundApp();
  wrapper.appendChild(createContainer("choose", "text-content", "choose a background", createFormBackground, "background"));
}

function createFormBackground() {
  let form = document.createElement('form');
  form.name = "myform"
  form.appendChild(createInput("background1", "background", "background", true));
  form.appendChild(createLabel("background1", "img/background/background1.png", "background-img"));
  form.appendChild(createInput("background2", "background", "background1", false));
  form.appendChild(createLabel("background2", "img/background/background2.png", "background-img"));
  form.appendChild(createInput("background3", "background", "background2", false));
  form.appendChild(createLabel("background3", "img/background/background3.png", "background-img"));
  return form;
}

export {createChooseBackgroundPage}