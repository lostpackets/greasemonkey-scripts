const mathAsciiRegex = /`([^`]*)`/g;
const allMatches = Array.from(document.body.innerText.matchAll(mathAsciiRegex), match => match[1]);
const concatenatedMatches = allMatches.join(', ');
console.log(concatenatedMatches);
