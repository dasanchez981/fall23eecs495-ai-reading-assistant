
if(!(document.getElementsByTagName("html")[0].style.marginLeft == "380px")){
    let originHTML = document.getElementsByTagName("html")[0].style.marginLeft = "380px";
    let iframe = document.createElement("iframe");
    iframe.id = 'extensionSidebar';
    document.body.appendChild(iframe);

    let extURL = chrome.runtime.getURL('index.html');
    iframe.src=extURL;
    iframe.scrolling="no";

    iframe.style="position: fixed; top: 0; height: 100%; left: 0; width: 354px; padding:10px 13px; background-color:#D3D9DE; z-index: 99999; margin: 0;";
}else{
    document.getElementsByTagName("html")[0].style.marginLeft = "0px";
    document.getElementById('extensionSidebar').remove();
}


