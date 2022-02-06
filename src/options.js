let curTimer = null;
const statusMessage = function(message, time) {
    time = (typeof time === 'undefined') ? 1500 : time;
    const element = document.getElementById('status');
    if (curTimer)
        clearTimeout(curTimer);
    element.innerText = message;
    const timer = setTimeout(function() {
        element.innerText = '';
        curTimer = null;
    }, time);
    curTimer = timer;
};

const saveOptions = function() {
    const options = Object.create(null);
    options['sort'] = document.getElementById('sort-checkbox').checked;
    chrome.storage.local.set({options: options});
};

const loadOptions = function(options) {
    document.getElementById('sort-checkbox').checked = options['sort'];
    // Options must be saved when loaded to keep everything in sync (since there
    // is no specific "save" button"). onchange/oninput won't fire when loading
    // options with javascript, so trigger saveOptions manually.
    saveOptions();
};

document.addEventListener('DOMContentLoaded', function() {
    chrome.storage.local.get(['options'], function(storage) {
        const initOpts = storage.options;
        // Restore saved options.
        loadOptions(initOpts);

        // Load default options.
        document.getElementById('defaults').addEventListener('click', function() {
            const defaults = chrome.extension.getBackgroundPage().defaultOptions();
            loadOptions(defaults);
            statusMessage('Defaults Loaded', 1200);
        });

        document.getElementById('revert').addEventListener('click', function() {
            loadOptions(initOpts);
            statusMessage('Options Reverted', 1200);
        });
    });

    // Decouple label for touch devices, since clicking shows the tooltip.
    if (window.matchMedia('(pointer: coarse)').matches) {
        let toRemove = new Set(['sort-checkbox']);
        let labels = document.getElementsByTagName('label');
        for (let i = 0; i < labels.length; ++i) {
            if (toRemove.has(labels[i].htmlFor))
                labels[i].removeAttribute('for');
        }
    }
});

// Save options on any user input.
(function() {
    for (const input of document.getElementsByTagName('input')) {
        input.addEventListener('change', saveOptions);
        input.addEventListener('input', saveOptions);
    }
})();

document.getElementById('version').innerText = chrome.runtime.getManifest().version;