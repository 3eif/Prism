/* eslint-disable no-unused-vars */
const Discord = require('discord.js');
const figlet = require('figlet');
const mongoose = require('mongoose');

const Event = require('../../structures/Event');

mongoose.connect(process.env.MONGO_URL, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

module.exports = class Ready extends Event {
	constructor(...args) {
		super(...args);
	}

	async run() {

		this.client.user.setActivity('with Patreons', { type: 'PLAYING' });

		if (this.client.shard.ids[0] == this.client.shard.count - 1) {

			const promises = [
				this.client.shard.fetchClientValues('guilds.cache.size'),
				this.client.shard.broadcastEval('this.guilds.cache.reduce((prev, guild) => prev + guild.memberCount, 0)'),
			];

			return Promise.all(promises)
				.then(async results => {
					const totalGuilds = results[0].reduce((prev, guildCount) => prev + guildCount, 0);
					const totalMembers = results[1].reduce((prev, memberCount) => prev + memberCount, 0);

					figlet(this.client.user.username, function(err, data) {
						if (err) {
							console.log('Something went wrong...');
							console.dir(err);
							return;
						}
						console.log(data);
					});

					this.client.log(`Prism is online: ${this.client.shard.count} shards, ${totalGuilds} servers and ${totalMembers} members.`);
				});
		}
	}
};

