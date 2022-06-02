import { createBackgroundApp, createButtonOK } from "./modul-helper-function.js"
import { wrapper, switchToMain } from "../spa.js"

function createRecordPage() {
  createBackgroundApp();
  wrapper.appendChild(getRecords("text-content"));
  wrapper.appendChild(createButtonOK("CLOSE", switchToMain));
}

function getRecords(className) {
  let container = document.createElement('div');
  let caption = document.createElement("h1");
  caption.className = className;
  caption.textContent = "Records";
  container.id = "wrap-records";
  container.appendChild(caption);

  const ref = firebase.database().ref("list/");
  const getData = (ref) => {
    return new Promise((resolve, reject) => {
      const onError = () => reject(new Error('Something went wrong!'));
      const onData = snap => resolve(snap.val());
      ref.on("value", onData, onError);
    });
  };

  getData(ref)
    .then((records) => {
      let arr=[];
      for (let key in records) {
        arr.push({
          userName: records[key].name,
          userScore: records[key].score
        })
      }
      return arr;
    })
    .then(data => {
      data.sort((a, b) => a.userScore < b.userScore ? 1 : -1);
      data.forEach(item=>{
        container.innerHTML += `<p>${item.userName}<span>:</span>${item.userScore}</p>`
      })
    })
  return container;
}

export { createRecordPage }