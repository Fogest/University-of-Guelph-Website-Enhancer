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


/*
The data retrieved is odd so I am turning it into a slightly easier to work with model.
The array looks like the following in each position:

0: Ordered value for when the information appears in list
1: Course code
2: Course start date
3: Course end date
4: Type of class (IE: SEM, LEC, LAB, EXAM)
5: Comma seperated list of the days of the week in which the class takes place. (Note appreviations used on days of week)
6: Time the class runs to and from.
7: The abbreviated building location and room.

*/

function exportToIcal() {
	var data = getFormattedDataArray();
	console.log(getCourseCode(data[0]));
	console.log(getCourseStart(data[0]));
	console.log(getCourseEnd(data[0]));
	console.log(getCourseType(data[0]));
	console.log(getCourseDates(data[0]));
	console.log(getCourseTime(data[0]));
	console.log(getCourseLocation(data[0]));
}

function getFormattedDataArray() {
	var results = [];
	for(i=0;i < delimitedMeetingInfo.length;++i) {
		results.push(delimitedMeetingInfo[i].split("|"));
	}
	return results;
}

function getCourseCode(data) {
	return trim(data[1]);
}

function getCourseStart(data) {
	return trim(data[2]);
}

function getCourseEnd(data) {
	return trim(data[3]);
}

function getCourseType(data) {
	return trim(data[4]);
}

function getCourseDates(data) {
	return trim(data[5]);
}

function getCourseTime(data) {
	return trim(data[6]);
}

function getCourseLocation(data) {
	return trim(data[7]);
}