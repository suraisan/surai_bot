// SlashCommandBuilder という部品を discord.js からインポートしています。
// これにより、スラッシュコマンドを簡単に構築できます。
const { SlashCommandBuilder } = require('discord.js');

// 以下の形式にすることで、他のファイルでインポートして使用できるようになります。
module.exports = {
	data: new SlashCommandBuilder()
		.setName('しゃぶれ')
		.setDescription('しゃぶります'),
	execute: async function(interaction) {
		await interaction.reply('ジュルッジュルルルルルルルルル！！！グッポ！グッポグッポグッポ！ジュッジュボルルルルル！！！ジュッポジュッポ！！！グッポ！グッポ！ジュボジュルルルルル！');
	},
};

// module.exportsの補足
// キー・バリューの連想配列のような形で構成されています。
//
// module.exports = {
//    キー: バリュー,
//    キー: バリュー,
// };
//