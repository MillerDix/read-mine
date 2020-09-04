// chrome.contextMenus.onClicked.addListener(function(info) {
//     console.log('content.js: option item clicked', info);
// });

console.log('content.js');
chrome.runtime.sendMessage({
    type: 'START_RECORD',
    message: {
        pageUrl: window.location.href,
        scrollTop: document.documentElement.scrollTop,
        offsetHeight: document.documentElement.offsetHeight
    }
});

window.onbeforeunload = function() {
    chrome.runtime.sendMessage({
        type: 'TAB_CLOSING',
        message: {
            pageUrl: window.location.href,
            scrollTop: document.documentElement.scrollTop,
            offsetHeight: document.documentElement.offsetHeight
        }
    });
}