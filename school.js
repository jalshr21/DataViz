var genderChart = dc.pieChart('#gender-chart');
var raceChart = dc.pieChart('#race-chart');
var subjectChart = dc.barChart('#subject-chart');
var schoolTable = dc.dataTable('.dc-data-table');

d3.csv('race.csv', function (data) {
	var ndx = crossfilter(data);
    // var all = ndx.groupAll();
    var genderDimension = ndx.dimension(function (d) {
        return d.LEA_STATE;
    });
    var genderGroup = raceDimension.group().reduceSum(function(d) {
  	return d.GenderValue;
	});

    var raceDimension = ndx.dimension(function(d){
    	return d.Race;
    });
	var raceGroup = raceDimension.group().reduceSum(function(d) {
  	return d.Value;
	});

	genderChart
    .width(768)
    .height(480)
    .slicesCap(8)
    .innerRadius(100)
    .dimension(genderDimension)
    .group(genderGroup)
    .legend(dc.legend()) 
    .ordinalColors(['#bf5b17','#f0027f','#7fc97f','#beaed4','#ffff99','#386cb0','#fdc086']);
         
    genderChart.render();

    
    raceChart
    .width(768)
    .height(480)
    .slicesCap(8)
    .innerRadius(100)
    .dimension(raceDimension)
    .group(raceGroup)
    .legend(dc.legend()) 
    .ordinalColors(['#bf5b17','#f0027f','#7fc97f','#beaed4','#ffff99','#386cb0','#fdc086']);
         
    raceChart.render();


});

