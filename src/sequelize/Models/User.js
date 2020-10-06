const { Sequelize, DataTypes } = require("sequelize");

module.exports.userInit = function (db) {
	return db.define("user", Fields, TableOptions);
};

const createHooks = {
	beforeCreate: (user) => {
		console.log("beforeCreate");
		user.dataValues.name = user.dataValues.firstname + ' ' + user.dataValues.lastname;
	},
	beforeUpdate: (user) => {
		console.log("beforeUpdate");
		let lastname = user.fields.findIndex(el => el === 'lastname');
		let firstname = user.fields.findIndex(el => el === 'firstname');
		let reqParams = Object.assign(user.attributes)
		let reqModel = Object.assign(user.model)

		async function getPramas() {
			res = await reqModel.findOne({ where: { email: reqParams.email }, }).then((res) => {

			if (lastname === -1)
				lastname = res.dataValues.lastname

			if (lastname === 1)
				lastname = reqParams.lastname

			if (firstname === -1)
				firstname = res.dataValues.firstname

			if (firstname === 1)
				firstname = reqParams.firstname

			reqParams.name = firstname + ' ' + lastname;

			user.attributes = reqParams;
			user.fields.push('name');
			return user
			}).catch(err => {console.log(err)})
		}

	if (lastname === -1 && firstname === 1 || firstname === -1 && lastname === 1 ) {
			return getPramas();
		} else {
			user.fields.push('name');
		user.attributes.name = user.attributes.firstname + ' ' + user.attributes.lastname;
		return user
	}
	},
	beforeBulkCreate: (user) => {
			console.log("beforeBulkCreate");
		user.dataValues.name = user.dataValues.firstname + ' ' + user.dataValues.lastname;
	},
	beforeBulkUpdate: async function (user)  {
		console.log("beforeBulkUpdate");
		let lastname = user.fields.findIndex(el => el === 'lastname');
		let firstname = user.fields.findIndex(el => el === 'firstname');
		let reqParams = Object.assign(user.attributes)
		let reqModel = Object.assign(user.model)

		async function getPramas() {
			res = await reqModel.findOne({ where: { email: reqParams.email }, }).then((res) => {

			if (lastname === -1)
				lastname = res.dataValues.lastname

			if (lastname === 1)
				lastname = reqParams.lastname

			if (firstname === -1)
				firstname = res.dataValues.firstname

			if (firstname === 1)
				firstname = reqParams.firstname

			reqParams.name = firstname + ' ' + lastname;

			user.attributes = reqParams;
			user.fields.push('name');
			return user
			}).catch(err => {console.log(err)})
		}

	if (lastname === -1 && firstname === 1 || firstname === -1 && lastname === 1 ) {
			return getPramas();
		} else {
			user.fields.push('name');
		user.attributes.name = user.attributes.firstname + ' ' + user.attributes.lastname;
		return user
	}
	},
	beforeValidate: () => {
		console.log("VALIDATE START");
	},
	afterValidate: () => {
		console.log("VALIDATE STOP");
	},
};

const createScopes = {
	idby2(value) {
		return {
			where: {
				id: Math.floor(value / 2),
			},
		};
	},
	random() {
		return {
			where: {
				id: Math.floor(Math.random() * 100),
			},
		};
	},
	accessLevel(value) {
		return {
			where: {
				accessLevel: {
					[Op.gte]: value,
				},
			},
		};
	},
};

const TableOptions = {
	modelName: "User",
	comment: "A TABLE FULL OF USERS",
	hooks: createHooks,
	defaultScope: {},
	scopes: createScopes,
	//sequelize,
};

const Fields = {
	id: {
		type: DataTypes.INTEGER,
		unique: true,
		primaryKey: true,
		autoIncrement: true,
		validate: {
			isNull: { msg: "Must be Empty or null Autoinc" },
		},
	},
	firstname: {
		type: DataTypes.STRING,
		allowNull: false,
		comment: "Firstname not null",
		validate: {
			notEmpty: { msg: "Must be an String not Empty" },
		},
	},
	lastname: {
		type: DataTypes.STRING,
		comment: "Lastname not null",
		allowNull: false,
		validate: {
			notEmpty: { msg: "Must be an String not Empty" },
		},
	},
	email: {
		type: DataTypes.STRING,
		allowNull: false,
		unique: true,
		comment: "Email not null unique secondary index",
		set(value) {
      this.setDataValue('email', value.toLowerCase());
    },
		validate: {
			isEmail: { msg: "Must be an valid Email" },
		},
	},
	name: {
		type: DataTypes.STRING,
		allowNull: true
	},
	createdAt: { type: DataTypes.DATE, defaultValue: Sequelize.NOW },
	updatedAt: { type: DataTypes.DATE, defaultValue: Sequelize.NOW },
};

module.exports.Fields = Fields;
