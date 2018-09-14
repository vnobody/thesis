$.ajax({
	type: "GET",
	url: "IO_results.csv",
	dataType: "text",
	success: function(data) {
		var dataArray = processData(data);
		var datasets = dataArray.datasets;
		console.log(dataArray.datasets);
		for (var i=0; i<datasets.length-1; i++) {
			console.log(datasets[i]);
			var $chartsDiv = $('#chartsContainer');
			var canvas = '<canvas id="myChart_' + i + '"></canvas>'
			$chartsDiv.append(canvas);
			var ctx = $('#myChart_' + i)[0].getContext('2d');
			var chart = new Chart(ctx, {
				// The type of chart we want to create
				type: 'bar',

				// The data for our dataset
				data: {
					labels: dataArray.labels,
					datasets: [{
						label: datasets[i].splice(0,1),
						backgroundColor: 'rgb(255, 99, 132)',
						borderColor: 'rgb(255, 99, 132)',
						data: datasets[i],
					}]
				},

				// Configuration options go here
				options: {}
			});
		}
	}
});

function processData(allText) {
	var allTextLines = allText.split(/\r\n|\n/);
	var headers = allTextLines[0].split(',').splice(1);
	var lines = {};
	var datasets = [];

	for (var i=1; i<allTextLines.length; i++) {
		var data = allTextLines[i].split(',');
		datasets.push(data);
	}
	lines.labels = headers;
	lines.datasets = datasets;
	return lines;
}