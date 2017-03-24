'use strict';
var Sequelize = require('sequelize');
var sequelize = new Sequelize('FuelStation_EDA', 'callsheetadmin', 'Eraser$17', {
	host: 'callsheet-mysql.cn6x6nhayn9c.us-west-2.rds.amazonaws.com',
	port: 3306,
    pool: {
        max: 10,
        min: 1,
        idle: 100
    }
});

var Athlete = sequelize.define('athlete', {
  AthleteID: { 
	  type: Sequelize.INTEGER, 
	  primaryKey: true, 
	  autoincrement: true, 
	  field: 'StudentSportID' 
  }, 
  firstName: { type: Sequelize.STRING, field: 'firstname' }, 
  lastName: { type: Sequelize.STRING, field: 'lastname' }, 
  schoolid: { type: Sequelize.STRING, field: 'schoolsidnumber' },
  sportCode: { type: Sequelize.STRING, field: 'SportCodeID' }
}, {
	tableName: 'StudentSport'
});

module.exports.get = function(id) {
    if (!id) return _getAll();
    console.log('STUDENT: calling getSingle with id: ' + id);
    return sequelize.sync().then(function() {
        return Athlete.findById(id).then(function(student) {
            console.info('STUDENT: student-sport record found');
            return {
                count: (student)?1:0,
                students: [ (student)?student.dataValues:null ]
            };
        })
    });
}

function _getAll() {
    console.log('STUDENT: calling getAll because no id provided');
	return sequelize.sync().then(function() {
		return Athlete.findAndCountAll().then(function(result) {
			var students = [];
			result.rows.forEach(function(studentRow) {
				students.push(studentRow.dataValues);
			});
			return {
				count: result.count,
				students: students
			};
		});
	});
}

module.exports.create = function(json) {
	return sequelize.sync().then(function() {
		console.info('STUDENT: create a new student using JSON provided');
		console.error('need to add json validation to student creation');
		var ath = json;//JSON.parse(json);
		return Athlete.create(ath).then(function(student) {
			console.info('student successfully created');
			return student;
		});
	});
};

module.exports.update = function(json) {
	return sequelize.sync().then(function() {
		console.info('STUDENT: update a single student using JSON provided');
		console.error('need to add json validation to student update');
		var ath = json;//JSON.parse(json);
		return Athlete.update(
			ath,
			{ where: { AthleteID: ath.AthleteID } }
		).then(function(result) {
			console.info('STUDENT: student successfully updated');
			return result;
		});
	});
};

module.exports.delete = function(id) {
	return sequelize.sync().then(function() {
		console.info('STUDENT: delete a student by id');
		return Athlete.destroy({ where: { AthleteID: id } }).then(function(count) {
			console.info('STUDENT: ' + count.toString() + ' students successfully deleted');
			return count;
		});
	});
};

module.exports.close = function() {
	sequelize.close();
};