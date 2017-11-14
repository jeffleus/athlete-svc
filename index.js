var Athletes = require('./Athletes');

var args = process.argv.slice(2);
//console.log(process.argv);

var ath = {
	AthleteID: 2936, 
	firstName: "Kelvin VT",
	lastName: "Kersey"
};

var id = '06237664';		//'704127186';
var filter = ('MBB').split(',');
console.log("FILTER: ", filter);

//Athletes.delete(1165).then(function(result) {
//Athletes.update(ath).then(function(student) {
//Athletes.create(ath).then(function(student) {
Athletes.get(id).then(function(student) {
	//console.log(result);
	console.log(student);
	return;
}).catch(function(err) {
	console.error(err);
	return;
}).finally(function() {
	Athletes.close();
	return;
});

function _logTest(id, filter) {
    console.log('ID: ', id);
    console.log('FILTER: ', filter);
};