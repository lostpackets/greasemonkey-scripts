// ==UserScript==
// @name           Embedded Developer Console
// @namespace      http://www.example.com/
// @description    Embeds a simplified developer console onto the webpage
// @include        *
// @grant          none
// ==/UserScript==

(function() {
    // Create a div to contain the console
    var consoleContainer = document.createElement('div');
    consoleContainer.style.position = 'fixed';
    consoleContainer.style.bottom = '0';
    consoleContainer.style.left = '0';
    consoleContainer.style.width = '100%';
    consoleContainer.style.maxHeight = '200px';
    consoleContainer.style.overflow = 'auto';
    consoleContainer.style.backgroundColor = '#f4f4f4';
    consoleContainer.style.borderTop = '1px solid #ccc';
    document.body.appendChild(consoleContainer);

    // Override the console.log method to capture its output
    var originalLog = console.log;
    console.log = function(...args) {
        originalLog.apply(console, args); // Log to the browser console
        var logOutput = args.map(arg => {
            if (typeof arg === 'object') {
                return JSON.stringify(arg);
            } else {
                return arg;
            }
        }).join(' '); // Convert arguments to strings
        var logDiv = document.createElement('div');
        logDiv.textContent = logOutput;
        consoleContainer.appendChild(logDiv); // Log to the embedded console
    };

    // Create an input field for users to enter JavaScript code
    var codeInput = document.createElement('input');
    codeInput.type = 'text';
    codeInput.style.width = '80%';
    codeInput.style.margin = '10px';
    consoleContainer.appendChild(codeInput);

    // Create a button to execute the code
    var runButton = document.createElement('button');
    runButton.textContent = 'Run';
    runButton.addEventListener('click', function() {
        try {
            eval(codeInput.value);
        } catch (error) {
            var errorDiv = document.createElement('div');
            errorDiv.textContent = 'Error: ' + error;
            errorDiv.style.color = 'red';
            consoleContainer.appendChild(errorDiv);
            console.error('Error:', error); // Log the error to the console
        }
    });
    consoleContainer.appendChild(runButton);
})();
