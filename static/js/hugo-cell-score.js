$(document).ready(function() {
total = [0, 0];
count = [0, 0];
steps = [[], []];
streak = [[], [], 0, null];

$("div.cycle-score").each(function() {
    var res = parseFloat($(this).data("res"));
    var enl = parseFloat($(this).data("enl"));

    winner = (res > enl) ? 0 : 1;
    if (streak[3] == null)
        streak[3] = winner;
    if (streak[3] == winner)
        streak[2]++;
    else {
        streak[streak[3]].push(streak[2]);
        streak[2] = 1;
        streak[3] = winner;
    }
    
    total[0] += res;
    total[1] += enl;

    steps[0].push(res);
    steps[1].push(enl);

    count[res > enl ? 0 : 1]++;

});

//add the final streak
streak[streak[3]].push(streak[2]);

// "breakdown" is the line graph of checkpoints in a cycle
updateBreakdown = function(div) {
    var cycle = $(div).data("title");

    $(".breakdown .title").html(cycle);

    $.get("/api/cycle/" + cycle, function(data) {
        cycleBreakdownChart.data.datasets[0].data = data.scores.res;
        cycleBreakdownChart.data.datasets[1].data = data.scores.enl;
        cycleBreakdownChart.update();
    });
}

// "scoreboard" is the tiles of cycle winners
updateScoreboard = function(div) {
    $(".cycle-score").addClass("faded");
    $(div).removeClass("faded");

    var res = parseFloat($(div).data("res"));
    var enl = parseFloat($(div).data("enl"));

    $(".scoreboard .title").html($(div).data("title"));

    if (parseInt(res) >= 1000) {
        $(".scoreboard .res span").html(parseInt(res / 1000) + "k");
    } else {
        $(".scoreboard .res span").html(parseInt(res));
    }

    if (parseInt(enl) >= 1000) {
        $(".scoreboard .enl span").html(parseInt(enl / 1000) + "k");
    } else {
        $(".scoreboard .enl span").html(parseInt(enl));
    }

    if ($(div).data("res") > $(div).data("enl")) {
        $(".scoreboard .info .res").addClass("winner");
        $(".scoreboard .info .enl").removeClass("winner");
    }
    else {
        $(".scoreboard .info .enl").addClass("winner");
        $(".scoreboard .info .res").removeClass("winner");
    }
};

$("div.cycle-score").click(function() {
    updateScoreboard(this);
});

$("div.cycle-score").dblclick(function() {
    updateBreakdown(this);
});

$("div.cycle-score").mouseover(function() {
    updateScoreboard(this);
});

$(".longest-streak .res span").html(Math.max.apply(null, streak[0]));
$(".longest-streak .enl span").html(Math.max.apply(null, streak[1]));
(Math.max.apply(null, streak[0]) > Math.max.apply(null, streak[1])) ? $(".longest-streak .res").addClass("winner") : $(".longest-streak .enl").addClass("winner");

$(".cycles-won .res span").html(count[0]);
$(".cycles-won .enl span").html(count[1]);

var cycleBreakdownChart = new Chart(document.getElementById("cycle-breakdown-chart"), {
    type: 'line',
    data: { 
        labels: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35],
        datasets: [{
            borderColor: "#00BFFF",
            data: [],
            fill: false,
            label: "RES"
        },
        {
            borderColor: "#2BED1B",
            data: [],
            fill: false,
            label: "ENL"
        }],
    }
});

(total[0] > total[1]) ? $(".cycles-won .res").addClass("winner") : $(".cycles-won .enl").addClass("winner");
cyclesWonChart = new Chart(document.getElementById("cycles-won-chart"), {
    type: 'doughnut',
    data: { 
        labels: ["RES", "ENL"],
        datasets: [{
            data: count,
            backgroundColor: ["#00BFFF", "#2BED1B"],
            borderColor: "#000",
            borderWidth: 0
        }]
    }
});

$(".cumulative-mu .res span").html(total[0].toLocaleString());
$(".cumulative-mu .enl span").html(total[1].toLocaleString());
totalMUChart = new Chart(document.getElementById("total-mu-chart"), {
    type: 'bar',
    data: { 
        labels: ["RES", "ENL"],
        datasets: [{
            data: total,
            backgroundColor: ["#00BFFF", "#2BED1B"],
            borderColor: "#000",
            borderWidth: 0
        }]
    },
    options: {
	plugins: {
		legend: {
			display: false
		},
		tooltips: {
			callbacks: {
				label: function(tooltipItem) {
					return tooltipItem.yLabel;
				}
			}
		}
	}
    },
    legendCallback: function(chart) {
        return "";
    }
});

(total[0] > total[1]) ? $(".cumulative-mu .res").addClass("winner") : $(".cumulative-mu .enl").addClass("winner");

});
