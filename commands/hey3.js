const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('しゃぶれ')
		.setDescription('しゃぶります'),
	execute: async function(interaction) {
		await interaction.reply('ジュルッジュルルルルルルルルル！！！グッポ！グッポグッポグッポ！ジュッジュボルルルルル！！！ジュッポジュッポ！！！グッポ！グッポ！ジュボジュルルルルル！');
	},
};