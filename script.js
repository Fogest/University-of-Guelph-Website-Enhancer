
var content = '<input type="button" id="export" name="export" value="Export Schedule" class="shortButton" accesskey="E">';
$(".submit").append(content);

$("#export").click(function() {
	if(typeof delimitedMeetingInfo !== 'undefined') {
		if(delimitedMeetingInfo != '') {
			alert("HERE");
		}
		else error();
	}
	else error();
});

function error() {
	alert("The data has not yet been retrieved. Please hit the button again in a few seconds!");
}