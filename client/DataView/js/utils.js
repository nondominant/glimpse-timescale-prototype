
var showChart = function(){
	let el = document.getElementById("chart_panel");
	if (el.classList.contains("overlayup")) {
		el.classList.remove("overlayup");
		el.classList.add("overlaydown");
	} else {
		el.classList.remove("overlaydown");
		el.classList.add("overlayup");
	}
}

