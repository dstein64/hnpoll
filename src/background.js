const defaultOptions = function() {
    const options = Object.create(null);
    options['sorting'] = 'none';
    return options;
};

chrome.storage.local.get(['options'], function(storage) {
    const options = storage.options;
    const defaults = defaultOptions();
    // Set missing options using defaults.
    for (const key of Object.keys(defaults)) {
        if (!(key in options)) {
            options[key] = defaults[key];
        }
    }
    // Remove keys not in defaults.
    for (const key of Object.keys(options)) {
        if (!(key in defaults)) {
            delete options[key];
        }
    }
    chrome.storage.local.set({options: options});
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    const method = request.method;
    if (method === 'getDefaultOptions') {
        sendResponse(defaultOptions());
    }
});
