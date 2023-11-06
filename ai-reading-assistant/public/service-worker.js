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
  
  // Extension needs to be refreshed to activate any changes here
  chrome.runtime.onInstalled.addListener(() => {
    console.log("Installed extension")
    setupContextMenu();
  });

  // Triggers whenever a context menu item is clicked, sends data to App.tsx for functionality
  chrome.contextMenus.onClicked.addListener((data) => {
    console.log("Clicked on context menu item")

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
    }
  });

  // TODO: Fix bug with having many tabs open causes duplicate messages to be sent out 
  // probably issue with extension not being limited to specific tab
  // chrome.runtime.sendMessage may be too general for us
  // https://developer.chrome.com/docs/extensions/reference/tabs/ can help
  // Below code can be tried out to fix:
  // chrome.tabs.sendMessage(tab.id, {action: "write", data: getData()}, function (response) { 
  //   console.log(response,"!!!!");});

  // TODO: Issue-> context menu items appear once installed even when side panel closed
  // Solution: Catch this condition (i.e. when user clicks on summarize) 
  // and alert user with popup to open side panel for context menu functionality