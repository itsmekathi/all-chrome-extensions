window.prompt("Content script loaded");
chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        window.confirm("Message Received : ", JSON.stringify(request));
        console.log(sender.tab ?
            "from a content script:" + sender.tab.url :
            "from the extension");
        sendResponse({ name: 'vault-extension' });
    });