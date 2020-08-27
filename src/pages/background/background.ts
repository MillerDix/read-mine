chrome.runtime.onInstalled.addListener(function () {
    chrome.contextMenus.create({
        title: 'save to read-mine',
        onclick: () => console.log('save to read-mine triggered')
    })
});