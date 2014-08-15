/* Meeting Information Functions */

function getMeetCourse(info) {
	var meetCourse = trim(info[1]);
	return meetCourse;
}

function getMeetEnd(info) {
	var meetEnd = trim(info[3]);
	return meetEnd;
}

function getMeetMethod(info) {
	if (!getMeetDatesOnly(info)) {
		var meetMethod = trim(info[4]);
		return meetMethod
	}
}

function getMeetDays(info) {
	if (!getMeetDatesOnly(info)) {
		var meetDays = trim(info[5]);
		return meetDays;
	}
}

function getMeetTime(info) {
	if (!getMeetDatesOnly(info)) {
		var meetTime = trim(info[6]);
		return meetTime
	}
}

function getMeetLocation(info) {
	if (!getMeetDatesOnly(info)) {
		var meetLocation = trim(info[7]);
		return meetLocation;
	}
}

function getMeetBuilding(info) {
	if (!getMeetDatesOnly(info)) {
		var meetLocation = getMeetLocation(info);
		loc = meetLocation.split(', ');
		if (loc.length > 1) {
			return loc[0];
		} else {
			return false;
		}
	}
}

function getMeetRoom(info) {
	if (!getMeetDatesOnly(info)) {
		var meetLocation = getMeetLocation(info);
		loc = meetLocation.split(', ');
		if (loc.length > 1) {
			return loc[1];
		} else {
			return loc[0];
		}
	}
}

function getMeetDatesOnly(info) {
	if (info.length > 4) {
		return false;
	} else {
		return true;
	}
}

function getMeetTimeStart(info, format) {
	if (!getMeetDatesOnly(info)) {
		var meetTime = getMeetTime(info);
		return convertTime(meetTime.split(' - ')[0], format);
	}
}

function getMeetTimeEnd(info, format) {
	if (!getMeetDatesOnly(info)) {
		var meetTime = getMeetTime(info);
		return convertTime(meetTime.split(' - ')[1], format);
	}
}

function convertTime(time, format) {
	if (format == 'minutes') {
		timeHour = parseInt(time.substring(0,2), 10);
		timeMinute = parseInt(time.substring(3,5), 10);
		timeMeridian = time.substring(5,6);
		if (timeMeridian == 'P' && timeHour < 12) {
			timeHour = timeHour + 12;
		}
		return timeHour*60 + timeMinute;
	} else {
		return time;
	}
}

function getMeetDayPos(meetDay) {
	dayPos = false;
	if (meetDay == 'Sun') {
		dayPos = 0;
	} else if (meetDay == 'Mon') {
		dayPos = 1;
	} else if (meetDay == 'Tues') {
		dayPos = 2;
	} else if (meetDay == 'Wed') {
		dayPos = 3;
	} else if (meetDay == 'Thur') {
		dayPos = 4;
	} else if (meetDay == 'Fri') {
		dayPos = 5;
	} else if (meetDay == 'Sat') {
		dayPos = 6;
	}
	return dayPos;
}

function getMeetSemester(meetEnd) {
	parts = meetEnd.split('/');
	year = parts[0].substring(2,4);
	month = parts[1];
	var term = '';
	if (month <= 4) {
		term = 'W';
	} else if (month <= 8) {
		term = 'S';
	} else if (month <= 12) {
		term = 'F';
	}
	var semester = term + year;
	return semester;
}

function insertSemester(meetEnd) {
	var semesterText = getMeetSemester(meetEnd);
	var semester = document.getElementById('semester');
	semester.appendChild(document.createTextNode(semesterText));
}

function insertName() {
	nameIdText = trim(window.opener.document.getElementById('VAR2').firstChild.nodeValue);
	nameText = trim(nameIdText.replace(/^\d{7}(.*)/, '$1'));
	var name = document.getElementById('studentname');
	name.appendChild(document.createTextNode(nameText));
}

