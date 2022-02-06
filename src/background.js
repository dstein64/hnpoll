// WARN: For functions that are called from the options page, proper scope is
// necessary (e.g., using a function declaration beginning with a 'function',
// or using a function expression beginning with 'var', but not a function
// expression beginning with 'let' or 'const').

function defaultOptions() {
    const options = Object.create(null);
    options['sort'] = true;
    return options;
}

// Set missing options using defaults.
chrome.storage.local.get({options: {}}, function(storage) {
    const options = storage.options;
    const defaults = defaultOptions();
    const keys = Object.keys(defaults);
    for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        if (!(key in options)) {
            options[key] = defaults[key];
        }
    }
    chrome.storage.local.set({options: options});
});
