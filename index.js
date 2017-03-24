var Athletes = require('./Athletes');

var args = process.argv.slice(2);
//console.log(process.argv);

var ath = {
	AthleteID: 1165, 
	firstName: "Garrett",
	lastName: "Leininger",
	sportCode: "MBB",
	schoolid: "111222333"
};

Athlete.delete(1165).then(function(result) {
//Athlete.update(ath).then(function(student) {
//Athlete.create(ath).then(function(student) {
//Athlete.get(args[0]).then(function(student) {
	console.log(result);
	//console.log(student);
	return;
}).catch(function(err) {
	console.error(err);
	return;
}).finally(function() {
	Athlete.close();
	return;
});