const Sequelize = require('sequelize');
const GeocodeModel = require('../models.geocode/geocode');
const axios = require('axios');

let geocode;
const initDB = () => {
	const pgsql = new Sequelize('geoapi_test', 'postgres', 'abc123', {
		host: 'localhost',
		dialect: 'postgres',
		logging: false,
	});
	geocode = GeocodeModel(pgsql, Sequelize);
};
initDB();

module.exports = {
	name: 'catch',
	description: 'Explore the world, and catch Pokemon!',
	expectsArgs: true,
	usage: '<location to explore>',
	async execute(message, args) {
		try {
			const inputLocation = args.join(' ').replace(',', ' ').toLowerCase();

			console.log(inputLocation);

			const location = await geocode.findOne({ where: { name: inputLocation } });
			const coordinates = location.coordinate.coordinates;
			console.log(coordinates);
			// sendReply(message, );
		}
		catch(err) {
			console.log(err);
		}
	},
};

const parseArgs = (args) => {
	const totalArgs = args.length;

	let query = '';
	let defCount;

	// Build query
	for(let i = 0; i < totalArgs - 1; i++) {
		const arg = args[i];

		query += arg + ' ';
	}

	const lastArg = args[totalArgs - 1];
	defCount = parseInt(lastArg);
	if(isNaN(defCount)) {
		query += lastArg;
		defCount = 1;
	}

	return {
		query,
		defCount,
	};
};

const reply = async (message, term, defCount) => {
	try{
		const rawHtml = await getRawHtml(term);
		const definitions = getDefinitions(rawHtml, defCount);
		const formattedReply = format(term, definitions);
		sendReply(message, formattedReply);
	}
	catch(err) {
		sendReply(message, 'Sorry!!\nI couldn\'t find that word...');
	}
};

const getRawHtml = async (term) => {
	const url = process.env.URBAN_DICTIONARY_URL + term;
	const response = await axios.get(url);

	return response.data;
};
const getDefinitions = (html, defCount) => {
	const $ = cheerio.load(html);

	const defList = [];

	$('#content').find('.def-panel').each((i, entry) => {
		if(i === defCount) return false;

		const def = $(entry).find('.meaning').text();
		const example = $(entry).find('.example').text();

		defList.push({
			def,
			example,
		});
	});

	return defList;
};

const format = (term, defList) => {
	const header = `DEFINE '${term}'`;
	const divider = '-'.repeat(Math.floor(header.length * 1.2));

	const definitions = defList.map((entry, i) => `${i + 1}. ${entry.def.replace(/\[|\]/g, '').replace(/\n/g, '\n')}\n\t\tEXAMPLE\n\t\t------------\n\t\t${entry.example.replace(/\[|\]/g, '').replace(/\n/g, '\n\t\t')})\n\n`).join('');
	const reply = `${header}\n${divider}\n${definitions}\n\n`;

	return reply;
};
const sendReply = (message, reply) => {
	message.channel.send(reply, { split: true });
};