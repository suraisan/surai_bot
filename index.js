// hey.jsのmodule.exportsを呼び出します。
const heyFile = require('./commands/hey.js');
const heyFile2 = require('./commands/hey2.js');
const heyFile3 = require('./commands/hey3.js');

// discord.jsライブラリの中から必要な設定を呼び出し、変数に保存します
const { Client, Events, GatewayIntentBits, inlineCode } = require('discord.js');

// 設定ファイルからトークン情報を呼び出し、変数に保存します
const { guildId, token, channelId, voiceChannelId, voiceChannelId2} = require('./config.json'); //voiceChannelId=授乳室、voiceChannelId2=JKおさんぽ

// クライアントインスタンスと呼ばれるオブジェクトを作成します
const client = new Client({
	intents: [
        GatewayIntentBits.Guilds, 
        GatewayIntentBits.MessageContent, 
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildVoiceStates,
    ]
});


// クライアントオブジェクトが準備OKとなったとき一度だけ実行されます
client.once(Events.ClientReady, c => {
	console.log(`準備OKです! ${c.user.tag}がログインします。`);
});

//スラッシュコマンドに応答するには、interactionCreateのイベントリスナーを使う必要があります
client.on(Events.InteractionCreate, async interaction => {

    // スラッシュ以外のコマンドの場合は対象外なので早期リターンさせて終了します
    // コマンドにスラッシュが使われているかどうかはisChatInputCommand()で判断しています
    if (!interaction.isChatInputCommand()) return;

    // heyコマンドに対する処理
    if (interaction.commandName === heyFile.data.name) {
        try {
            await heyFile.execute(interaction);
        } catch (error) {
            console.error(error);
            if (interaction.replied || interaction.deferred) {
                await interaction.followUp({ content: 'コマンド実行時にエラーになりました。', ephemeral: true });
            } else {
                await interaction.reply({ content: 'コマンド実行時にエラーになりました。', ephemeral: true });
            }
        }
    } else if(interaction.commandName === heyFile2.data.name){

        try {
            await heyFile2.execute(interaction);
        } catch (error) {
            console.error(error);
            if (interaction.replied || interaction.deferred) {
                await interaction.followUp({ content: 'コマンド実行時にエラーになりました。', ephemeral: true });
            } else {
                await interaction.reply({ content: 'コマンド実行時にエラーになりました。', ephemeral: true });
            }
        }
    
    } else if(interaction.commandName === heyFile3.data.name){

        try {
            await heyFile3.execute(interaction);
        } catch (error) {
            console.error(error);
            if (interaction.replied || interaction.deferred) {
                await interaction.followUp({ content: 'コマンド実行時にエラーになりました。', ephemeral: true });
            } else {
                await interaction.reply({ content: 'コマンド実行時にエラーになりました。', ephemeral: true });
            }
        }
    
    } else {
        
        console.error(`${interaction.commandName}というコマンドには対応していません。`);

    }
});

//メッセージに反応
client.on('messageCreate', async message => {
    if (message.author.bot) {
        return;
    }

    else if (message.content == "おい") {
        message.reply("笑える");
    }

    else if (message.content == "かも") {
        message.reply("うまそう");
    }

    else if (message.content == "しゃぶれ") {
        message.reply("ジュルッジュルルルルルルルルル！！！グッポ！グッポグッポグッポ！ジュッジュボルルルルル！！！ジュッポジュッポ！！！グッポ！グッポ！ジュボジュルルルルル！");
    }

    else if (
        message.content == "きもすじ" || 
        message.content == "おおすじ" || 
        message.content == "たかすじ" ||
        message.content == "あつすじ" ||
        message.content == "さむすじ" 
    ) {
        message.reply("ぎ");
    }

    else if (message.content == "おやすみ"){
        message.reply("すんみヌス");
    }
});

//入退室ログ
client.on("voiceStateUpdate", (oldState, newState) => {

    if (oldState.guild.id !== guildId) return;
    const channel = oldState.member.guild.channels.cache.get(channelId);
  
    if (oldState.channelId === null && newState.channelId !== null) {
        return channel.send(
            `📥**【参加】** ${inlineCode(oldState.member.nickname)} さんが <#${newState.channelId}> に入室しました。<t:${Math.floor(Date.now() / 1000)}:T>`
        );
    } else if (oldState.channelId !== null && newState.channelId === null) {
        return channel.send(
            `📤**【退出】** ${inlineCode(newState.member.nickname)} さんが <#${oldState.channelId}> から退出しました。<t:${Math.floor(Date.now() / 1000)}:T>`
        );
        
    } else if (oldState.channelId !== null && newState.channelId !== null && oldState.channelId !== newState.channelId) {
        return channel.send(
            `↔️**【移動】** ${inlineCode(newState.member.nickname)} さんが <#${oldState.channelId}> から <#${newState.channelId}> に移動しました。<t:${Math.floor(Date.now() / 1000)}:T>`
    
        );
    }

});

// ログインします
client.login(token);