import {wrapper,switchToMain} from "../spa.js"

function createBackgroundApp() {
  wrapper.appendChild(createBackground("stars"));
  wrapper.appendChild(createBackground("twinkling"));
}

function createBackground(className) {
  let base = document.createElement('div');
  base.className = className;
  return base;
}

function createButtonOK(caption, callback, className) {
  let buttonOK = document.createElement('a');
  buttonOK.className = className;
  buttonOK.textContent = caption;
  buttonOK.onclick = callback;
  return buttonOK;
}

function createButtonSave(caption, key) {
  let buttonSave = document.createElement('a');
  buttonSave.textContent = caption;
  buttonSave.id='btn-save'
  buttonSave.addEventListener('click', saveSelection.bind(this, key), false);
  return buttonSave;
}

function saveSelection(key) {
  const selection = document.getElementsByTagName('input');
  const value = Array.from(selection).filter(selection => selection.checked == true)[0].value;
  localStorage.setItem(key, value);
  alert('Your choice is saved!');
  switchToMain();
}

function createContainer(classNameContainer, classNameTitle, caption, callback, key, arg) {
  let container = document.createElement('div');
  let title = document.createElement('h1');
  container.className = classNameContainer;
  title.className = classNameTitle;
  title.textContent = caption;
  container.appendChild(title);
  container.appendChild(callback(arg));
  container.appendChild(createButtonSave("SAVE", key));
  container.appendChild(createButtonOK("CLOSE", switchToMain));
  return container;
}

function createInput(id, name, value, checked) {
  let input = document.createElement('input');
  input.type = "radio";
  input.id = id;
  input.name = name;
  input.value = value;
  input.checked = checked;
  return input;
}

function createLabel(htmlFor, imgSrc, className) {
  let label = document.createElement('label');
  let img = document.createElement('img');
  label.htmlFor = htmlFor;
  img.src = imgSrc;
  img.className = className;
  label.appendChild(img);
  return label;
}

export {createBackgroundApp,createButtonOK,createButtonSave,createContainer,createInput,createLabel}