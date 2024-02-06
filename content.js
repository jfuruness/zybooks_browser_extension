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
          margin: 175px 0px 1775px 0px !important;
          padding: 0 !important;
        }
      `;
      document.head.appendChild(style);
      //document.body.style.zoom = "150%";
      // Apply transform scale instead of zoom
      document.documentElement.style.transformOrigin = "center center";
      document.documentElement.style.transform = "scale(1.3)";
      //document.documentElement.style.zoom = "150%";
    } else {
      // Remove the injected CSS
      const existingStyleElement = document.getElementById("myExtensionStyle");
      existingStyleElement.remove();
      //document.body.style.zoom = "100%";
      // Reset transform scale
      document.documentElement.style.transform = "scale(1)";
      document.documentElement.style.transformOrigin = "";
      //document.documentElement.style.zoom = "100%";
    }
  }
});
