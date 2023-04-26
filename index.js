const histogram_ref = document.getElementById("histogram");
const arr_size = 11;
const num_range = 10
const x = []
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
 * Update the chart with the new values, with optional timer.
 *
 * @param {chart}		The chart to edit (WILL MODIFY THE DATASET)
 */
function update_chart_data(chart) {
    chart.data.datasets[0].data = y;
    chart.update();
    return new Promise(resolve => {
	setTimeout(() => {
	    resolve('resolved');
	}, 200);
    });
};


// The Bubble Sort Algorithm
/**
 * Bubble sort algorithm, with visualization update.
 *
 * @return			The array to sort, directly referenced
 */
async function bubble_sort(arr) {

    is_sorted = false;
    do_not_count = 1;
    
    while (!is_sorted) {
	is_sorted = true;
	for (let i = 0; i < arr.length - do_not_count; i++) {
	    await update_chart_data(histogram);
	    if (arr[i] > arr[i + 1]) {
		is_sorted = false;
		
		// Swap values
		arr[i] = arr[i] - arr[i + 1];
		arr[i + 1] = arr[i] + arr[i + 1];
		arr[i] = arr[i + 1] - arr[i];
	    }
	}
	do_not_count++;
    }
};

bubble_sort(y)
