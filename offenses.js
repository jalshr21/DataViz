
//var arrestChart = dc.barChart('#arrest-chart');

d3.csv('all_states_racegender.csv', function (data) {
	
var ndx = crossfilter(data);

var schoolDim = ndx.dimension(function (d) { return d.LEA_STATE; });
var bogus_dim = {};
var able_male_arr = schoolDim.group().reduceSum(function (d) { return d.TOT_DISCWODIS_ARR_M; });
var able_female_arr = schoolDim.group().reduceSum(function (d) { return d.TOT_DISCWODIS_ARR_F; });
var disable_male_arr = schoolDim.group().reduceSum(function (d) { return d.TOT_DISCWDIS_ARR_IDEA_M; });
var disable_female_arr = schoolDim.group().reduceSum(function (d) { return d.TOT_DISCWDIS_ARR_IDEA_F; });


var able_male_suspension = schoolDim.group().reduceSum(function (d) { return d.TOT_DISCWODIS_ISS_M; });
var able_female_suspension = schoolDim.group().reduceSum(function (d) { return d.TOT_DISCWODIS_ISS_F; });
var disable_male_suspension = schoolDim.group().reduceSum(function (d) { return d.TOT_DISCWDIS_ISS_IDEA_M; });
var disable_female_suspension = schoolDim.group().reduceSum(function (d) { return d.TOT_DISCWDIS_ISS_IDEA_F; });

//Expulsions
/*TODO: please create a third column which represents the sum in our CSV
column 1: males w/o disabilities: TOT_DISCWODIS_EXPWE_M + TOT_DISCWODIS_EXPWOE_M
column 2: females w/o disabilities: TOT_DISCWODIS_EXPWE_W + TOT_DISCWODIS_EXPWOE_W
column 3: males with disabilities: TOT_DISCWODIS_EXPWE_IDEA_M + TOT_DISCWODIS_EXPWE_IDEA_M
column 4: females with disabilities: TOT_DISCWODIS_EXPWE_IDEA_F + TOT_DISCWODIS_EXPWOE_IDEA_F
*/
var arrestChart = dc.barChart("#arrest-chart");
var suspensionChart = dc.barChart("#suspension-chart");
//var expulsionChart = dc.barChart("#expulsion-chart");

arrestChart
    .dimension(schoolDim)
    .width(1500)
    .group(able_male_arr, 'Able Males')
    .x(d3.scale.ordinal())
    .xUnits(dc.units.ordinal)
    .stack(able_female_arr, 'Able Female')
    .stack(disable_male_arr, 'Disabled Male')
    .stack(disable_female_arr, 'Disabled Female')
    .elasticY(true)
    .legend(dc.legend().x(400).y(5).itemHeight(15))
    .margins({top: 10, right: 50, bottom: 30, left: 40})

suspensionChart
    .dimension(schoolDim)
    .width(1500)
    .height(200)
    .group(able_male_suspension, 'Able Males')
    .x(d3.scale.ordinal())
    .xUnits(dc.units.ordinal)
    .stack(able_female_suspension, 'Able Female')
    .stack(disable_male_suspension, 'Disabled Male')
    .stack(disable_male_suspension, 'Disabled Female')
    .elasticY(true)
    .legend(dc.legend().x(400).y(5).itemHeight(15))
    .margins({top: 10, right: 50, bottom: 30, left: 40})


/*expulsionChart
    .dimension(schoolDim)
    .width(1500)
    .height(200)
    .group(able_male, 'Able Males')
    .x(d3.scale.ordinal())
    .xUnits(dc.units.ordinal)
    .stack(able_female, 'Able Female')
    .stack(disable_male, 'Disabled Male')
    .stack(disable_male, 'Disabled Female')
    .legend(dc.legend().x(400).y(5).itemHeight(15))*/
 
dc.renderAll();
dc.redrawAll();
});



