window.onload = function () {
  console.log(
    "%cHello from your Chrome extension!",
    "color: #fff; background: red; font-size: 20px; padding: 5px;",
  );
};

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.toggleCss) {
    if (!document.getElementById("myExtensionStyle")) {
      // Inject the CSS
      const style = document.createElement("style");
      style.id = "myExtensionStyle";
      style.textContent = `
        /* Your CSS rules here */
        #breadcrumbs {
          display: none !important;
        }
        #pageTitleDiv {
          display: none !important;
        }
        /* Set the body and html elements to occupy 100% of viewport height */
        html, body {
          height: 100%;
          margin: 0;
          padding: 0;
          overflow: hidden;
        }
        /* Make the iframe occupy the entire viewport */
        iframe {
          width: 100%;
          height: 100%;
          border: none;
        }
        #main #content #containerdiv,
        .container {
          margin: 0 !important;
          padding: 0 !important;
        }
      `;
      document.head.appendChild(style);
    } else {
      // Remove the injected CSS
      const existingStyleElement = document.getElementById("myExtensionStyle");
      existingStyleElement.remove();
    }
  }
});
