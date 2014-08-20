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

function createAllEvents(data) {
	var results = '';
	for(i=0;i < data.length;++i) {
		if(getCourseType(data[i]) != 'EXAM')
			results += createIndividualIcalEvent(data[i]);
        }
	return results;
}

function createIndividualIcalEvent(data) {
        var eventIcal = 'BEGIN:VEVENT\n';
        eventIcal += 'DTSTART:' + toICSFormat(getCourseStart(data),getCourseTime(data,'start')) + '\n';
        eventIcal += 'DTEND:' + toICSFormat(getCourseStart(data),getCourseTime(data,'end')) + '\n';
        eventIcal += 'RRULE:FREQ=WEEKLY;UNILT=20141129T000000;WKST=SU;BYDAY=MO,TU\n';
        eventIcal += 'SUMMARY:' + getCourseCode(data) + '('+ getCourseType(data) + ')' + '\n';
        eventIcal += 'LOCATION:' + getCourseLocation(data) + ', University of Guelph\n';
        eventIcal += 'DESCRIPTION:' + getCourseCode(data) + ' this is a much longer description....\n';
        eventIcal += 'END:VEVENT\n';
        return eventIcal;
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

function toICSFormat(date, time) {
    var timeCont = [],
        dateCont = [];

    if (time.toLowerCase().indexOf('pm') != -1) {

        timeCont = time.toLowerCase().replace('pm', 00).split(':'); //assuming from your question seconds is never mentioned but only hh:mm i.e. hours and minutes
        timeCont[0] = (parseInt(timeCont[0]) + 12) % 24;
    } else {
        timeCont = time.toLowerCase().replace('am', 00).split(':');
    }
    dateCont = date.split('/');

    return dateCont.join('') + 'T' + timeCont.join('');
}

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

function getCourseTime(data,startOrEnd) {
	var re = /^((?:0[1-9]|1[012]):[0-5][0-9][AP]M) - ((?:0[1-9]|1[012]):[0-5][0-9][AP]M)$/; 
	var match = re.exec(data[6]);
	if(startOrEnd == 'start') {
		return trim(match[1]);
	} else if(startOrEnd == 'end') {
		return trim(match[2]);
	}
}

function getCourseLocation(data) {
	return trim(data[7]);
}
