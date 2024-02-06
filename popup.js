
document.getElementById("toggleCssButton").addEventListener("click", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    const tab = tabs[0];
    chrome.tabs.sendMessage(tab.id, { toggleCss: true });
  });
});
