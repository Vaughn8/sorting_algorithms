const histogram_ref = document.getElementById("histogram");
const arr_size = 50;
const num_range = 10
var x = []
var y = [];

// Generate random array
for (let i = 0; i < arr_size; i++) {
    x[i] = i;
    y[i] = Math.floor(Math.random() * num_range) + 1;
}

// Generate a chart
histogram = new Chart(histogram_ref, {
    type: 'bar',
    data: {
	labels: x,
	datasets: [{
	    data: y,
	    backgroundColor: 'rgba(75, 0, 130)'
	}]
    },
    options: {
	scales: {
	    yAxes: [{
		ticks: {
		    beginAtZero: true
		}
	    }]
	},
	legend: {
	    display: false
	},
	animations: {
	    duration: 500
	}
    }
})

/**
 * Apply a color to all bars in the histogram, with some of them being
 * different
 *
 * @param {chart}		Chart to update (will change dataset)
 * @param {indicies_to_outline}	Array of indexes in the dataset to change
 */
function update_colors(chart, indicies_to_outline) {
    bgColor = [];
    
    // First, set everything to one color...
    for (let i = 0; i < arr_size; i++) {
	bgColor[i] = 'rgba(75, 0, 130)'
    }

    // ...Then, color the specificly chosen indicies another color
    indicies_to_outline.forEach((index) => {
	bgColor[index] = 'rgba(255, 192, 203)'
    });
    
    chart.data.datasets[0].backgroundColor = bgColor;
}

/**
 * Update the chart with the new values, with optional timer.
 *
 * @param {chart}		The chart to edit (WILL MODIFY THE DATASET)
 */
function update_chart_data(chart) {
    chart.data.datasets[0].data = y;
    chart.update('none');
    return new Promise(resolve => {
	setTimeout(() => {
	    resolve('resolved');
	}, 1);
    });
};

/**
 * Bubble sort algorithm, with visualization update.
 *
 * @param {arr}			The array to sort, directly referenced
 */
async function bubble_sort(arr) {

    is_sorted = false;
    do_not_count = 1;
    
    while (!is_sorted) {
	is_sorted = true;
	for (let i = 0; i < arr.length - do_not_count; i++) {

	    // Updating colors and graph
	    update_colors(histogram, [i, i+1]);
	    await update_chart_data(histogram);

	    
	    if (arr[i] > arr[i + 1]) {
		is_sorted = false;
		
		// Swap values
		arr[i] = arr[i] - arr[i + 1];
		arr[i + 1] = arr[i] + arr[i + 1];
		arr[i] = arr[i + 1] - arr[i];

		// Updating colors and graph...again
		update_colors(histogram, [i, i+1]);
		await update_chart_data(histogram);
	    }
	}
	do_not_count++;
    }

    // Updating colors and graph one final time
    update_colors(histogram, x);
    await update_chart_data(histogram);
};

bubble_sort(y)
