
let isCssInjected = false;

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.toggleCss) {
    const tabId = sender.tab.id;
    toggleCss(tabId);
  }
});

function toggleCss(tabId) {
  if (isCssInjected) {
    // Remove the injected CSS
    chrome.scripting.executeScript({
      target: { tabId: tabId },
      function: () => {
        const existingStyleElement = document.getElementById("myExtensionStyle");
        if (existingStyleElement) {
          existingStyleElement.remove();
        }
        console.log('Resetting zoom to 100%');
        document.body.style.zoom = "100%";
      },
    });
    isCssInjected = false;
  } else {
    // Inject the CSS
    chrome.scripting.insertCSS({
      target: { tabId: tabId },
      files: ["content.css"],
    });
    // Execute script to adjust zoom level to 80% and log action
    chrome.scripting.executeScript({
      target: {tabId: tabId},
      function: () => {
        console.log('Setting zoom to 150%');
        document.body.style.zoom = "150%";
      },
    });
    isCssInjected = true;
  }
}
