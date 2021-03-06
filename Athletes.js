'use strict';
var Sequelize = require('sequelize');
var Config = require('./Config')();
var sequelize = new Sequelize('FuelStation_STAN', Config.username, Config.password, {
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
  sportCode: { type: Sequelize.STRING, field: 'SportCodeID' },
  isArchived: { type: Sequelize.BOOLEAN, field: 'isArchived' }
}, {
	tableName: 'StudentSport'
});

module.exports.get = function(id,filter) {
    if (!id) return _getAll(filter);
    console.log('ATHLETE: calling getSingle with id: ' + id);
	var where = { where: { schoolid: id, isArchived: 0 } };
	console.info(where);
    return sequelize.sync().then(function() {
		return Athlete.findAll(where).then(function(result) {
        //return Athlete.findById(id).then(function(athlete) {
            console.info('ATHLETE: athlete-sport record found');
			console.info(result);
			var athlete = (result.length > 0) ? result[0] : null;
            return {
                count: (athlete)?1:0,
                athletes: [ (athlete)?athlete.dataValues:null ]
            };
        })
    });
}

function _getAll(filter) {
    console.log('ATHLETE: calling getAll because no id provided');
	return sequelize.sync().then(function() {
        if (filter) {
            var filterOption = {
                where: {
                    SportCodeID: filter 
                } 
            };
            return Athlete.findAndCountAll(filterOption);
        } else return Athlete.findAndCountAll();
    }).then(function(result) {
		//return Athlete.findAndCountAll().then(function(result) {
        var athletes = [];
        result.rows.forEach(function(athleteRow) {
            athletes.push(athleteRow.dataValues);
        });
        return {
            count: result.count,
            athletes: athletes
        };
	});
}

module.exports.create = function(json) {
	return sequelize.sync().then(function() {
		console.info('ATHLETE: create a new athlete using JSON provided');
		console.error('need to add json validation to athlete creation');
		var ath = json;//JSON.parse(json);
		return Athlete.create(ath).then(function(athlete) {
			console.info('athlete successfully created');
			return athlete;
		});
	});
};

module.exports.update = function(json) {
	return sequelize.sync().then(function() {
		console.info('ATHLETE: update a single athlete using JSON provided');
		console.error('need to add json validation to athlete update');
		var ath = json;//JSON.parse(json);
        console.log(ath);
		return Athlete.update(
			ath,
			{ where: { AthleteID: ath.AthleteID } }
		).then(function(result) {
			console.info('ATHLETE: athlete successfully updated');
			return result;
		});
	});
};

module.exports.delete = function(id) {
	return sequelize.sync().then(function() {
		console.info('ATHLETE: delete a athlete by id');
		return Athlete.destroy({ where: { schoolid: id } }).then(function(count) {
			console.info('ATHLETE: ' + count.toString() + ' athletes successfully deleted');
			return count;
		});
	});
};

module.exports.close = function() {
	sequelize.close();
};