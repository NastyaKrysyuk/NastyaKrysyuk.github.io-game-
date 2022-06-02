import {createBackgroundApp,createButtonOK} from "./modul-helper-function.js"
import {wrapper,switchToMain} from "../spa.js"

function createRulesPage() {
  createBackgroundApp();
  wrapper.appendChild(createTextContent("text-content"))
  wrapper.appendChild(createButtonOK("CLOSE", switchToMain));
}

function createTextContent(className) {
  let container = document.createElement('div');
  let caption = document.createElement("h1");
  caption.className = className;
  caption.textContent = "Rules";
  container.id = "wrap-records";
  container.appendChild(caption);
  getPageRules({ url: './rules.html' })
    .then(
      result => container.innerHTML += result
    )
    .catch(
      () => container.innerHTML += "Oh, no :( Something went wrong, please try again later"
    );
  return container;
}

function getPageRules(options) {
  return new Promise(function (resolve, reject) {
    $.ajax(options).done(resolve).fail(reject);
  });
}

export {createRulesPage}