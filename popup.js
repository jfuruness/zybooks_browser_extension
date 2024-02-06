
document.getElementById("toggleCssButton").addEventListener("click", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    const tab = tabs[0];
    chrome.tabs.sendMessage(tab.id, { toggleCss: true });
  });
});

// popup.js
var phrases = [
  "Wubba lubba dub dub!",
  "I want that mcnugget sauce morty!",
  "I turned myself into a pickle morty!",
  "Because I'm A Scientist. Because I Invent, Transform, Create, And Destroy For A Living, And When I Don't Like Something About The World, I Change It.",
  "Isn't it obvious Morty? I fucked a planet.",
  "I think you have to think ahead and live in the moment",
  "Yeah, sure, I mean if you spend all day shuffling words around, you can make anything sound bad, Morty.",
  "Wait for the ramp, Morty. They love the slow ramp. It really gets their dicks hard.",
];

var toggleButton = document.getElementById("toggleCssButton");

toggleButton.addEventListener("click", function () {
  var randomIndex = Math.floor(Math.random() * phrases.length);
  var randomPhrase = phrases[randomIndex];
  while(randomPhrase == toggleButton.textContent){
    randomIndex = Math.floor(Math.random() * phrases.length);
    randomPhrase = phrases[randomIndex];
  }
  toggleButton.textContent = randomPhrase;
});
