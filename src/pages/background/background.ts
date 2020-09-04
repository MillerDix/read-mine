chrome.runtime.onInstalled.addListener(function () {
    chrome.contextMenus.create({
        id: 'ROOT',
        title: 'Read-Mine',
    });

    chrome.contextMenus.create({
        id: 'SAVE_PROGRESS',
        title: 'Save Read Progress',
        parentId: 'ROOT',
    });

    chrome.contextMenus.create({
        id: 'FOCUS_SEARCH',
        title: 'Focus Search',
        parentId: 'ROOT',
        onclick: () => { }
    });
});

chrome.contextMenus.onClicked.addListener(function (info, tab) {
    console.log(info, tab);
    switch (info.menuItemId) {
        case 'SAVE_PROGRESS':
            chrome.tabs.executeScript({
                code: `
                    chrome.runtime.sendMessage({
                        type: 'START_RECORD',
                        message: {
                            pageUrl: window.location.href,
                            avlScroll: (document.body.scrollHeight || document.documentElement.scrollHeight) - (document.documentElement.clientHeight || document.body.clientHeight),
                            read: document.documentElement.scrollTop || document.body.scrollTop
                        }
                    });
                    
                    window.onbeforeunload = function() {
                        chrome.runtime.sendMessage({
                            type: 'TAB_CLOSING',
                            message: {
                                pageUrl: window.location.href,
                                avlScroll: (document.body.scrollHeight || document.documentElement.scrollHeight) - (document.documentElement.clientHeight || document.body.clientHeight),
                                read: document.documentElement.scrollTop || document.body.scrollTop
                            }
                        });
                    }
                `
            });
            break;

        case 'FOCUS_SEARCH':
            chrome.tabs.executeScript({
                code: `
                    console.log('focus btn on clicked');
                    console.log(document.querySelector('input'));
                    const inputs = document.querySelectorAll('input');
                    // check largest input
                    let square = 0;
                    let largestInput = null;
                    inputs.forEach(item => {
                       let currentStyle = window.getComputedStyle(item);
                       let s = parseInt(currentStyle.width.replace(/px/, ''), 10) * parseInt(currentStyle.height.replace(/px/, ''), 10);
                        if(s >= square) {
                            largestInput = item;
                            square = s;
                        }
                    });

                    largestInput.focus();
                `
            });

        default:
            break;
    }

});

chrome.runtime.onMessage.addListener(function (data) {
    if (data.type === 'START_RECORD') {
        let record = {};
        let { pageUrl, ...restMsg } = data.message;
        record[pageUrl] = { ...restMsg };

        chrome.storage.local.set(record, function () {
            console.log(chrome.storage.local.get(function (x) {
                console.log(x);
            }));
        });
    }
});

// chrome.runtime.onMessage.addListener(function(data) {
//     console.log('----------FOCUS SEARCH----------');
//     if(data.type === 'FOCUS_SEARCH') {
//         let { document } = data.message;
//         console.log(document.querySelector('input'));
//     }
// });

chrome.runtime.onMessage.addListener(function (data) {
    if (data.type === 'TAB_CLOSING') {
        console.log('----------tab closing----------');
        let record = {};
        let { pageUrl, ...restMsg } = data.message;
        record[pageUrl] = { ...restMsg };

        chrome.storage.local.set(record, function () {
            console.log(chrome.storage.local.get(function (x) {
                console.log(x);
            }));
        });
    }
});

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    console.log(changeInfo);

    if (changeInfo.url) {
        chrome.storage.local.get(function (locals) {
            let watchList = Object.keys(locals);
            if (watchList.includes(changeInfo.url)) {
                let scrollTop = locals[changeInfo.url].scrollTop;
                console.log('will be scrolled');
                chrome.tabs.executeScript(tabId, {
                    code: `
                        window.scrollTo(0, ${scrollTop});
                        window.onbeforeunload = function() {
                            chrome.runtime.sendMessage({
                                type: 'TAB_CLOSING',
                                message: {
                                    pageUrl: window.location.href,
                                    avlScroll: (document.body.scrollHeight || document.documentElement.scrollHeight) - (document.documentElement.clientHeight || document.body.clientHeight),
                                    read: document.documentElement.scrollTop || document.body.scrollTop
                                }
                            });
                        }
                    `
                });
            }
        });
    }
});

// chrome.tabs.onRemoved.addListener(function(tabId) {
//     chrome.tabs.executeScript(tabId, {
//         code: `
//             console.log('tab removed: ${tabId}');
//         `
//     });

// })
console.log('read-mine bg.js');