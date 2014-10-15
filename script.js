var pageTitle = $(document).find("title").text();
var regex = /^Schedule/;
var abrv = '{"AC":"Athletic Centre","ANCC":"OVC Animal Cancer Centre","ANNU":"Animal Science","BWH":"Blackwood Hall","CAF":"Central Animal Facility","CRB":"OVC Clinical Research","CRSC":"Crop Science","DH":"Day Hall","EBA":"Environmental Biology Annex 1","ECBA":"Edmund C. Bovey Building","FS":"Food Science","GRHM":"Graham Hall","HUTT":"H.L. Hutt Building","JHNH":"Johnston Hall","JTP":"John T. Powell Building","LA":"Landscape Architecture","LABL":"lab Animal Building","MAC":"Macdonald Hall","MACN":"MacNaughton","MACS":"Macdonald Stewart Hall","MASS":"Massey Hall","MCKN":"MacKinnon","MCLN":"J.D. Maclachlan","MINS":"Macdonald Institute","MLIB":"Mclaughlin Library","MSAC":"Macdonald Stewart Art Centre","OVCM":"Ontario Veterinary College","REYN":"Reynolds Building","RICH":"Richards Building","ROZH":"Rozanski Hall","SSC":"Science Complex","THRN":"A.A. Thornbrough Building","VSER":"Vehicle Services","WMEM":"War Memorial Hall","ZAV":"Zavitz Hall","ZOOB":"Zoology Annex 2"} '
abrv = jQuery.parseJSON(abrv);

if (regex.test(pageTitle)) {
    var content = '<input type="button" id="export" name="export" value="Export Schedule" class="shortButton" accesskey="E">' +
        '<div id="exportPopup"><span class="title">Download iCal file</span></br>' +
        '<span class="subtitle">(You can export this to most calendar applications)</span></br>' +
        '<button type="button" class="button" id="icalDownload">Download</button></br>' +
        '<button type="button" class="button" id="closeExportWindow">Close</button>' +
        '</div>';
    $(".submit").append(content);

    $("#export").click(function () {
        if (typeof delimitedMeetingInfo !== 'undefined') {
            if (delimitedMeetingInfo != '') {
                $("#exportPopup").fadeIn("slow");
            } else error();
        } else error();
    });

    $("#icalDownload").click(function () {
        createDownload();
    });

    $("#closeExportWindow").click(function () {
        $("#exportPopup").fadeOut("slow");
    });
}

function error() {
    alert("The data has not yet been retrieved. Please hit the button again in a few seconds!");
}

function getFullBuildingName(shortForm) {
	return abrv[shortForm];
}

function createDownload() {
    var ical = [createAllEvents(getFormattedDataArray())];
    var download = new Blob(ical, {
        type: 'text/calendar'
    });
    var url = URL.createObjectURL(download);
    window.location.replace(url);
}

function createAllEvents(data) {
    var results = 'BEGIN:VCALENDAR\n';
    results += 'VERSION:2.0\n';
    results += 'PRODID:-//Justin Visser/jhvisser.com//iCal Export v1.0//EN\n';
    for (var i = 0; i < data.length; ++i) {
        if (getCourseType(data[i]) != 'EXAM') results += createIndividualIcalEvent(data[i]);
    }
    results += 'END:VCALENDAR';
    return results;
}

function createIndividualIcalEvent(data) {
    var eventIcal = 'BEGIN:VEVENT\n';
    eventIcal += 'DTSTART:' + correctStartTime(data) + '\n';
    eventIcal += 'DTEND:' + correctEndTime(data) + '\n';
    eventIcal += 'RRULE:FREQ=WEEKLY;UNTIL=20140403T000000;WKST=SU;BYDAY=' + convertArrayOfDatesToICSFormat(getArrayOfDates(getCourseDates(data))) + '\n';
    eventIcal += 'SUMMARY:' + getCourseCode(data) + '(' + getCourseType(data) + ')' + '\n';
    eventIcal += 'LOCATION:' + getCourseLocation(data) + ', University of Guelph\n';
    eventIcal += 'DESCRIPTION:' + getCourseCode(data) + '\n';
    eventIcal += 'END:VEVENT\n';
    return eventIcal;
}

function correctStartTime(data) {
    var re = /\B(AM|PM)/gm;
    var subst = ' $1';

    var fullDate = getCourseStart(data) + ' ' + getCourseTime(data, 'start');
    var originalDate = new Date(fullDate.replace(re, subst));
    var date = new Date(getCourseStart(data));
    var sameDay = false;
    var dates = getArrayOfDates(getCourseDates(data));
    for (var i = 0; i < dates.length; ++i) {
        if (getDateVal(dates[i]) == date.getDay()) {
            sameDay = true;
            break;
        }
    }
    if (sameDay == false) {
        while (getDateVal(dates[0]) != date.getDay()) {
            date.setDate(date.getDate() + 1);
        }
    }
    var pre = date.getFullYear().toString() + ((date.getMonth() + 1) < 10 ? "0" + (date.getMonth() + 1).toString() : (date.getMonth() + 1).toString()); 
    pre += ((date.getDate() + 1) < 10 ? "0" + date.getDate().toString() : date.getDate().toString());

	var post = originalDate.getHours() < 10 ? ("0" + originalDate.getHours().toString()) : (originalDate.getHours().toString());
	if(originalDate.getMinutes() == 0)
		post += "0000";
	else {
		post += originalDate.getMinutes() < 10 ? ("0" + originalDate.getMinutes().toString()) : (originalDate.getMinutes().toString() + "00");	
	}
    return pre + "T" + post;
}

function correctEndTime(data) {
    var re = /\B(AM|PM)/gm;
    var subst = ' $1';

    var fullDate = getCourseStart(data) + ' ' + getCourseTime(data, 'end');
    var originalDate = new Date(fullDate.replace(re, subst));
    var date = new Date(getCourseStart(data));
    var sameDay = false;
    var dates = getArrayOfDates(getCourseDates(data));
    for (var i = 0; i < dates.length; ++i) {
        if (getDateVal(dates[i]) == date.getDay()) {
            sameDay = true;
            break;
        }
    }
    if (sameDay == false) {
        while (getDateVal(dates[0]) != date.getDay()) {
            date.setDate(date.getDate() + 1);
        }
    }
    var pre = date.getFullYear().toString() + ((date.getMonth() + 1) < 10 ? "0" + (date.getMonth() + 1).toString() : (date.getMonth() + 1).toString()); 
    pre += ((date.getDate() + 1) < 10 ? "0" + date.getDate().toString() : date.getDate().toString());

	var post = originalDate.getHours() < 10 ? ("0" + originalDate.getHours().toString()) : (originalDate.getHours().toString());
	if(originalDate.getMinutes() == 0)
		post += "0000";
	else {
		post += originalDate.getMinutes() < 10 ? ("0" + originalDate.getMinutes().toString()) : (originalDate.getMinutes().toString() + "00");	
	}
    return pre + "T" + post;
}

function getDateVal(input) {
    var otherVal = 0;
    switch (input) {
        case 'Mon':
            otherVal = 1;
            break;
        case 'Tues':
            otherVal = 2;
            break;
        case 'Wed':
            otherVal = 3;
            break;
        case 'Thur':
            otherVal = 4;
            break;
        case 'Fri':
            otherVal = 5;
            break;
        case 'Sat':
            otherVal = 6;
            break;
        case 'Sun':
            otherVal = 0;
            break;
        default:
            otherVal = 0;
    }
    return otherVal;
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

function getFormattedDataArray() {
    var results = [];
    for (var i = 0; i < delimitedMeetingInfo.length; ++i) {
        results.push(delimitedMeetingInfo[i].split("|"));
    }
    return results;
}

function convertArrayOfDatesToICSFormat(date) {
    var results = [];
    for (var i = 0; i < date.length; ++i) {
        switch (date[i]) {
            case 'Mon':
                results.push('MO');
                break;
            case 'Tues':
                results.push('TU');
                break;
            case 'Wed':
                results.push('WE');
                break;
            case 'Thur':
                results.push('TH');
                break;
            case 'Fri':
                results.push('FR');
                break;
            case 'Sat':
                results.push('SA');
                break;
            case 'Sun':
                results.push('SU');
                break;
            default:
                results.push('Days of the week incorrect');
        }
    }
    return results.join();
}

function getArrayOfDates(date) {

    return date.replace(/\s/g, "").split(",");
}

function getCourseCode(data) {
    return data[1];
}

function getCourseStart(data) {
    return data[2];
}

function getCourseEnd(data) {
    return data[3];
}

function getCourseType(data) {
    return data[4];
}

function getCourseDates(data) {
    return data[5];
}

function getCourseTime(data, startOrEnd) {
    var re = /^((?:0[1-9]|1[012]):[0-5][0-9][AP]M) - ((?:0[1-9]|1[012]):[0-5][0-9][AP]M)$/;
    var match = re.exec(data[6]);
    if (startOrEnd == 'start') {
        return match[1];
    } else if (startOrEnd == 'end') {
        return match[2];
    }
}

function getCourseLocation(data) {
	var location = data[7].split(",")[0];
	var room = data[7].split(",")[1];
	console.log(getFullBuildingName(location) + " (" + location + ")" + "," + room);
    return getFullBuildingName(location) + " (" + location + ")" + "," + room;
}