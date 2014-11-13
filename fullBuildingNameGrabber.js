var data = {}
$("p a abbr").each(function(index) {

	data[$(this).text().trim()] = $(this).attr("title").trim();
});
console.log(JSON.stringify(data));