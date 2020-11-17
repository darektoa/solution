document.addEventListener('DOMContentLoaded', function () {
	var elems = document.querySelectorAll('.sidenav');
	M.Sidenav.init(elems);
	var dateEl = document.querySelectorAll('.datepicker');
	M.Datepicker.init(dateEl);
	var timeEl = document.querySelectorAll('.timepicker');
	M.Timepicker.init(timeEl);
});
