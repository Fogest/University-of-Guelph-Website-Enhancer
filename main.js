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
//console.log(readInFile());
injectScript( chrome.extension.getURL('script.js'), 'body');

/*
$.getJSON("https://gist.githubusercontent.com/Fogest/29fca2c77a09d272ed7c/raw/7a34efdaabc8ca0a8078d2f83e2d0cab3de20276/terms.json",function(data) {
	data = jQuery.parseJSON(data);
	console.log(data);

	chrome.storage.local.set({'terms': data}, function() {
          // Notify that we saved.
          console.log('Settings saved');

        chrome.storage.local.get('terms', function (result) {
            console.log(result.terms);
        });

        });
});

*/