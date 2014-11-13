function injectScript(file, node) {
    var th = document.getElementsByTagName(node)[0];
    var s = document.createElement('script');
    s.setAttribute('type', 'text/javascript');
    s.setAttribute('src', file);
    th.appendChild(s);
}

function readInFile() {
	var data = '';
	$.getJSON(chrome.extension.getURL('resources/terms.json'), function( data ) {
		
	    return data;
	});
}
console.log(readInFile());
injectScript( chrome.extension.getURL('script.js'), 'body');


