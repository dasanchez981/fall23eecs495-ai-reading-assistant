// This script runs in the background as soon as the extension is installed
// All the logs can be found by navigating to chrome://extensions and clicking on service worker

// This adds custom menu items to user's right click menu
function setupContextMenu() {
    console.log("Added context items to menu")
    chrome.contextMenus.create({
      id: 'summarize-text',
      title: 'Summarize 📚📝',
      contexts: ['selection']
    });
    chrome.contextMenus.create({
        id: 'text-to-speech',
        title: 'Speak 🗣️💬🔊',
        contexts: ['selection']
    });
    chrome.contextMenus.create({
        id: 'text-focus',
        title: 'Text Focus 👀🔍',
        contexts: ['selection']
    });
    chrome.contextMenus.create({
      id: 'text-unfocus',
      title: 'Reset Page Focus ❌🔍',
      contexts: ['selection']
  });
  }
  //whenever a tab's url is updated, this runs in the tab whose url was changed. 
  //inserts a css file for ancestor styling so webpage has access to the css file
  chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    if (changeInfo.status == 'complete') {
        chrome.scripting.insertCSS({
            target: {tabId: tabId},
            files: ["focus-style.css"]
        });
        chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
          console.log("In query tabs")
          if (tabs[0].url.match('https:\/\/.*.wikipedia.org\/.*')) {
            console.log("Tab match")
            chrome.runtime.sendMessage({
              name: 'tab-loaded',
              data: { tabId: tabId }
            });
          }
        });   
    }
  })



     

 
  // Ensures clicking on icon leads to extension opening in sidePanel
  chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true })

  // Extension needs to be refreshed to activate any changes here
  chrome.runtime.onInstalled.addListener(() => {
    console.log("Installed extension")
    setupContextMenu();
  });

  // Triggers whenever a context menu item is clicked, sends data to App.tsx for functionality
  chrome.contextMenus.onClicked.addListener((data, tab) => {
    console.log("Clicked on context menu item")
    // Open the SidePanel so that message can be received
    chrome.sidePanel.open({ windowId: tab.windowId })
    setTimeout(() => { 
    // Now only process menu item functionality
    if (data.menuItemId === 'summarize-text') {
      console.log("Sending message to summarize to App.tsx!")
      chrome.runtime.sendMessage({
          name: 'summarize-text',
          data: { value: data.selectionText }
      });
    }
    else if (data.menuItemId === 'text-to-speech') {
        console.log("Sending message to active tab to speak to App.tsx!")
        // Get the active tab
        // chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        //   var activeTab = tabs[0];
        //   console.log("Active tab below:")
        //   console.log(activeTab)
          
        //   // Check if there is an active tab
        //   if (activeTab) {
        //       // Send a message to the active tab
        //       // chrome.tabs.sendMessage(activeTab.id, { name: 'text-to-speech', data: { value: data.selectionText }});
        //       chrome.runtime.sendMessage({
        //         name: 'text-to-speech',
        //         data: { value: data.selectionText }
        //       });
        //     } else {
        //       console.error('No active tab found.');
        //   }
        // });
        // async function sendMessageToActiveTab() {
        //   // console.log("Sending out message to tab")
        //   // const [tab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true });
        //   // console.log("Active tab below:")
        //   // console.log(tab)
        //   // console.log(tab.status)
        //   // chrome.tabs.sendMessage(tab.id, {
        //   //   name: 'text-to-speech',
        //   //   data: { value: data.selectionText }
        //   // });
        //   // const response = await chrome.tabs.sendMessage(tab.id, message);
        //   // chrome.tabs.onUpdated.addListener(function (updatedTabId, info) {
        //   //   if (info.status === 'complete' && updatedTabId === tab.id) {
        //   //     console.log("Tab is loaded");
        //   //     chrome.tabs.sendMessage(updatedTabId, {
        //   //       name: 'text-to-speech',
        //   //       data: { value: data.selectionText }
        //   //     });
        //   //   }
        //   // });
          
        //   // console.log("Response below:")
        //   // console.log(response)
        //   // TODO: Do something with the response.
        // }
        // sendMessageToActiveTab()

        // console.log(tab)
        // console.log(tab.status)
        
        // chrome.tabs.sendMessage(tab.id, {
        //   name: 'text-to-speech',
        //   data: { value: data.selectionText }
        // });
        
        
        // Solution that sent multiple messages:
        chrome.runtime.sendMessage({
            name: 'text-to-speech',
            data: { value: data.selectionText }
        });
    }
    else if (data.menuItemId === 'text-focus') {
        console.log("Sending message to focus text to App.tsx!")
        chrome.runtime.sendMessage({
            name: 'text-focus',
            data: { value: data.selectionText }
        });
        // May need unique ids to eliminate span later
        chrome.scripting.executeScript({
          target: { tabId: tab.id},
          func: () => {
            console.log("executing focus script on webpage");
            // var selection= window.getSelection()?.getRangeAt(0);
            // var selectedText = selection?.extractContents();
            // var span= document.createElement("span"); //this span surrounds the highlighted text
            // span.style.backgroundColor = "yellow";
            // span.appendChild(selectedText);
            // selection?.insertNode(span);

            // Issue with multiple spans of same id, id needs to be unique
            const selectedText = window.getSelection();
            const selectedRange = selectedText.getRangeAt(0);
            let span = document.createElement("span");
            span.classList.add('ancestor');
            span.appendChild(selectedRange.extractContents());
            selectedRange.insertNode(span)
            var ancestors = document.querySelectorAll('.ancestor');
            
            // Iterate through all ancestors
            for (var j = 0; j < ancestors.length; j++) {
              
              // Get descendants of specific ancestor
              var descendants = ancestors[j].querySelectorAll('*');
              // Set ancestor span properties
              // ancestors[j].style.backgroundColor = 'yellow';
              // ancestors[j].style.fontFamily = 'Comic Sans MS';
              // ancestors[j].style.fontSize = '12px'; // 2vw
              //ancestors[j].style.lineHeight = '500%';
              ancestors[j].classList.add('ancestor'); 
              // Iterate through all descendants of that ancestor
              for (var i = 0; i < descendants.length; i++) {
                console.log("Going through descendants now!!");
                console.log(descendants[i]);
                // Set properties of descendant span
                // descendants[i].style.backgroundColor = 'yellow';
                // descendants[i].style.fontFamily = 'Comic Sans MS'; // Your styles here
                // descendants[i].style.fontSize = '12px'; // 2vw
                //descendants[i].style.lineHeight = '500%';
                descendants[i].classList.add('ancestor');
              }
                // span.style.backgroundColor = "yellow";
            }; 
          }
        });
      }else if(data.menuItemId === 'text-unfocus'){
        chrome.scripting.executeScript({
          target: { tabId: tab.id },
          func: () => {
            alert("You are about to reset text focus on the whole webpage. OK?")
            var focusedElements = document.querySelectorAll('.ancestor');
            for(var j = 0; j < focusedElements.length; j++)
            {
              //can try removing spans themselves too
              focusedElements[j].classList.remove('ancestor');
            }
          }
        });
      }
    // Expected output: "Success!"
    }, 250);
    // Pause execution for 5 seconds
    console.log('Done pausing execution for 250ms'); 
  });

  

  // TODO: Fix bug with having many tabs open causes duplicate messages to be sent out 
  // probably issue with extension not being limited to specific tab
  // chrome.runtime.sendMessage may be too general for us
  // https://developer.chrome.com/docs/extensions/reference/tabs/ can help
  // Below code can be tried out to fix:
  // chrome.tabs.sendMessage(tab.id, {action: "write", data: getData()}, function (response) { 
  //   console.log(response,"!!!!");});