let div = document.createElement("div");
div.id = 'toolbar';
document.body.appendChild(div);

fetch(chrome.runtime.getURL('index.html'))
    .then((response) => response.text())
    .then((data) =>{
        document.getElementById('toolbar').innerHTML = data;
        let css = chrome.runtime.getURL('style.css');
        let link = document.createElement("link");
        link.rel = 'stylesheet';
        link.type = 'text/css';
        link.href = css;
        document.head.appendChild(link);
    });