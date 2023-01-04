let activeTab = null

chrome.runtime.onConnectExternal.addListener(function(port) {
    console.log("onConnectExternal", port)

    chrome.tabs.onActivated.addListener((info) =>{
        activeTab = info.tabId
        console.log("onActivated", info)
        chrome.tabs.get(info.tabId,(tab => {
            port.postMessage({
                kind: 'tab-change-response',
                data: tab
            });
            console.log("info: ", tab)
        }))

        chrome.tabs.query({currentWindow: true}, tabs => {
            port.postMessage({
                kind: 'all-tabs-response',
                data: tabs
            });
        });

    });

    chrome.tabs.onRemoved.addListener((tabId, removedInfo) =>{
        chrome.tabs.query({currentWindow: true}, tabs => {
            port.postMessage({
                kind: 'all-tabs-response',
                data: tabs
            });
        });
    })

    chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) =>{
        if (changeInfo.title || changeInfo.status === 'complete'){
            chrome.tabs.query({currentWindow: true}, tabs => {
                port.postMessage({
                    kind: 'all-tabs-response',
                    data: tabs
                });
            });
        }
        if (changeInfo.title || changeInfo.status === 'complete' && tab.active){
            chrome.tabs.get(tabId,(tab => {
                console.log('tab-change-response', tab)
                port.postMessage({
                    kind: 'tab-change-response',
                    data: tab
                });
            }))
        }
        console.log("onUpdated", tabId, changeInfo, tabId)
    })

    port.onMessage.addListener(function(msg) {
        console.log('new message:: ', msg)

        if (msg.kind === 'all-tabs-request') {
            chrome.tabs.query({currentWindow: true}, tabs => {
                port.postMessage({
                    kind: 'all-tabs-response',
                    data: tabs
                });
                console.log('all-tabs-request:: ', tabs)
            });
        }
        if (msg.kind === 'open-request-existing-tab') {
            chrome.tabs.update(msg.tab, {active: true})
        }
        if (msg.kind === 'open-request-new-tab') {
            chrome.tabs.create({
                url: msg.url
            });
        }
        if (msg.kind === 'open-request') {
            chrome.tabs.query({currentWindow: true, url: msg.data.url}, tabs => {
                if (tabs.length > 0){
                    chrome.tabs.update(tabs[0].id, {active: true})
                }else{
                    if (msg.data.option === 'new'){
                        chrome.tabs.create({
                            url: msg.data.url
                        });
                    }else{
                        chrome.tabs.query({currentWindow: true, active: true}, tabs => {
                            chrome.tabs.update(tabs[0].id, {url: msg.data.url})
                        })
                    }

                }
            })
        }
    })
})
