const Discord = require('discord.js');

module.exports = class Client extends Discord.Client {
    constructor() {
        super({
            disableMentions: 'everyone',
            messageCacheMaxSize: 50,
            messageCacheLifetime: 60,
            messageSweepInterval: 120,
        });

        this.settings = require('../../config/settings.js');
        this.colors = require('../../config/colors.js');
        this.channelList = require('../../config/channels.js');

        this.shardMessage = require('./../utils/shardMessage.js');

        this.environment = process.env.NODE_ENV;
    }

    log(msg) {
        console.log(`[${new Date().toLocaleString()}] > ${msg}`);
    }

    async login(token = this.token) {
        super.login(token);
    }
};