// WARN: For functions that are called from the options page, proper scope is
// necessary (e.g., using a function declaration beginning with a 'function',
// or using a function expression beginning with 'var', but not a function
// expression beginning with 'let' or 'const').

function defaultOptions() {
    const options = Object.create(null);
    options['sorting'] = 'none';
    return options;
}

chrome.storage.local.get({options: {}}, function(storage) {
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
