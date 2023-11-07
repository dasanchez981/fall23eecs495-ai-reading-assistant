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
  }
  
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
        console.log("Sending message to speak to App.tsx!")
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
              ancestors[j].style.lineHeight = '500%';

              // Iterate through all descendants of that ancestor
              for (var i = 0; i < descendants.length; i++) {
                console.log("Going through descendants now!!");
                console.log(descendants[i]);
                // Set properties of descendant span
                // descendants[i].style.fontFamily = 'Comic Sans MS'; // Your styles here
                // descendants[i].style.fontSize = '12px'; // 2vw
                descendants[i].style.lineHeight = '500%';
              }
                // span.style.backgroundColor = "yellow";
            }; 
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