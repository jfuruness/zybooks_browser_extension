
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
      },
    });
    isCssInjected = false;
  } else {
    // Inject the CSS
    chrome.scripting.insertCSS({
      target: { tabId: tabId },
      files: ["content.css"],
    });
    isCssInjected = true;
  }
}
