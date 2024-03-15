// ==UserScript==
// @name           GitHub Repository File Loader (Greasemonkey Console and Buttons)
// @namespace      http://www.example.com/
// @description    Fetches files from a GitHub repository, embeds them as buttons, and logs their content to the Greasemonkey console
// @include        *
// @grant          GM_xmlhttpRequest
// ==/UserScript==

// Create a div to contain the Greasemonkey console
var gmConsoleContainer = document.createElement('div');
gmConsoleContainer.style.position = 'fixed';
gmConsoleContainer.style.bottom = '0';
gmConsoleContainer.style.left = '0';
gmConsoleContainer.style.width = '100%';
gmConsoleContainer.style.maxHeight = '200px';
gmConsoleContainer.style.overflow = 'auto';
gmConsoleContainer.style.backgroundColor = '#f4f4f4';
gmConsoleContainer.style.borderTop = '1px solid #ccc';
document.body.appendChild(gmConsoleContainer);

// Create an input field for users to enter JavaScript code
var codeInput = document.createElement('input');
codeInput.type = 'text';
codeInput.style.width = '80%';
codeInput.style.margin = '10px';
gmConsoleContainer.appendChild(codeInput);

// Create a button to execute the code
var runButton = document.createElement('button');
runButton.textContent = 'Run';
runButton.addEventListener('click', function() {
    try {
        var code = codeInput.value;
        var result = eval(code);
        if (result !== undefined) {
            codeInput.value = result; // Set the result as the value of the input field
        }
    } catch (error) {
        var errorDiv = document.createElement('div');
        errorDiv.textContent = 'Error: ' + error;
        errorDiv.style.color = 'red';
        gmConsoleContainer.appendChild(errorDiv);
        console.error('Error:', error); // Log the error to the Greasemonkey console
    }
});
gmConsoleContainer.appendChild(runButton);

// Rest of the script remains unchanged

(function() {
    // Define the GitHub repository owner, repository name, and branch
    var owner = 'lostpackets';
    var repo = 'greasemonkey-scripts';
    var branch = 'gg';

    // Fetch the repository contents using GitHub API
    var apiUrl = `https://api.github.com/repos/${owner}/${repo}/contents?ref=${branch}`;
    GM_xmlhttpRequest({
        method: 'GET',
        url: apiUrl,
        onload: function(response) {
            if (response.status === 200) {
                var files = JSON.parse(response.responseText);
                createFileButtons(files);
            } else {
                console.error('Failed to fetch repository contents. Status:', response.status);
            }
        },
        onerror: function(error) {
            console.error('Error fetching repository contents:', error);
        }
    });

    // Function to create file buttons and load file content
    function createFileButtons(files) {
        var buttonContainer = document.createElement('div');
        buttonContainer.style.position = 'fixed';
        buttonContainer.style.top = '0';
        buttonContainer.style.right = '0';
        buttonContainer.style.backgroundColor = '#f4f4f4';
        document.body.appendChild(buttonContainer);

        files.forEach(function(file) {
            if (file.type === 'file' && file.name.endsWith('.js')) {
                var fileButton = document.createElement('button');
                fileButton.textContent = file.name;
                fileButton.addEventListener('click', function() {
                    fetchAndLogFileContent(file.download_url, file.name);
                });
                buttonContainer.appendChild(fileButton);
            }
        });
    }

    // Function to fetch and display file content in the input field
    function fetchAndLogFileContent(fileUrl, fileName) {
        GM_xmlhttpRequest({
            method: 'GET',
            url: fileUrl,
            onload: function(response) {
                if (response.status === 200) {
                    var fileContent = response.responseText;
                    codeInput.value = fileContent; // Set the file content as the value of the input field
                } else {
                    console.error('Failed to fetch file content. Status:', response.status);
                }
            },
            onerror: function(error) {
                console.error('Error fetching file content:', error);
            }
        });
    }
})();
