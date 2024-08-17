const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('かも')
		.setDescription('botが感想を言います'),
	execute: async function(interaction) {
		await interaction.reply('うまそう');
	},
};