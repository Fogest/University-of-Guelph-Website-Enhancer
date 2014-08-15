var pageTitle = $(document).find("title").text();
var regex = /^Schedule/; 

if(regex.test(pageTitle)) {
	var content = '<input type="button" id="export" name="export" value="Export Schedule" class="shortButton" accesskey="E"><div class="exportPopup">This is a test</div>';
	$(".submit").append(content);

	$("#export").click(function() {
		if(typeof delimitedMeetingInfo !== 'undefined') {
			if(delimitedMeetingInfo != '') {
				$(".exportPopup").fadeIn("slow");
			}
			else error();
		}
		else error();
	});
}

function error() {
	alert("The data has not yet been retrieved. Please hit the button again in a few seconds!");
}
