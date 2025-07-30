const settings = require('../settings');
const fs = require('fs');
const path = require('path');
const more = String.fromCharCode(8206);
const readmore = more.repeat(4001);

async function helpCommand(sock, chatId, message) {
    const helpMessage = `
╭━━━《 *BLACK PRO TECH* 》━━━━━┈⊷
┃❍⁠⁠╭──────────────
┃❍⁠⁠│▸  *Usᴇʀ* : Hamid Hussain👻 
┃❍⁠⁠│▸  *ʙᴀɪʟᴇʏs* : 𝐌𝐮𝐥𝐭𝐢 𝐝𝐞𝐯𝐢𝐜𝐞
┃❍⁠⁠│▸  *𝖳ʏᴘᴇ* : 𝐍𝐨𝐝𝐞𝐣𝐬
┃❍⁠⁠│▸  *ᴘʟᴀᴛғᴏʀᴍ* : 𝐇𝐞𝐫𝐨𝐤𝐮
┃❍⁠⁠│▸  *ᴏᴡɴᴇʀ ɴᴜᴍʙᴇʀ* : +923039573226
┃❍⁠⁠│▸  *ᴍᴏᴅᴇ* : |.|
┃❍⁠⁠│▸  *ᴄᴏᴍᴍᴀɴᴅs* : 214
┃❍⁠⁠│▸  *𝖣ᴇᴠᴇʟᴏᴘᴇʀ* : Hamid Hussain
┃❍⁠⁠│▸  *𝖵ᴇʀsɪᴏɴ* : 𝟏.𝟎.𝟎
┃❍⁠⁠╰──────────────
╰━━━━━━━━━━━━━━━━━━━┈⊷
${readmore}
*𝐀𝐯𝐚𝐢𝐥𝐥𝐚𝐛𝐥𝐞 𝐜𝐨𝐦𝐦𝐚𝐧𝐝𝐬:*
╭━━━━━━━━━━━━━━━┈⊷
┃  *General Commands*:
║ • help or .menu
║ • ping
║ • alive
║ • tts <text>
║ • owner
║ • joke
║ • quote
║ • fact
║ • weather <city>
║ • news
║ • attp <text>
║ • lyrics <song_title>
║ • 8ball <question>
║ • groupinfo
║ • staff or .admins 
║ • vv
║ • trt <text> <lang>
║ • ss <link>
║ • jid
╰━━━━━━━━━━━━━━━┈⊷
╭━━━━━━━━━━━━━━━┈⊷
┃ *Admin Commands*:
║ • ban @user
║ • promote @user
║ • demote @user
║ • mute <minutes>
║ • unmute
║ • delete or .del
║ • kick @user
║ • warnings @user
║ • warn @user
║ • antilink
║ • antibadword
║ • clear
║ • tag <message>
║ • tagall
║ • chatbot
║ • resetlink
║ • welcome <on/off>
║ • goodbye <on/off>
╰━━━━━━━━━━━━━━━┈⊷
╭━━━━━━━━━━━━━━━┈⊷
┃ *Owner Commands*:
║ • mode
║ • autostatus
║ • clearsession
║ • .antidelete
║ • cleartmp
║ • setpp <reply to image>
║ • autoreact
╰━━━━━━━━━━━━━━━┈⊷
╭━━━━━━━━━━━━━━━━┈⊷
┃ *Image/Sticker Commands*:
║ • blur <image>
║ • simage <reply to sticker>
║ • sticker <reply to image>
║ • tgsticker <Link>
║ • meme
║ • take <packname> 
║ • emojimix <emj1>+<emj2>
╰━━━━━━━━━━━━━━━┈⊷ 
╭━━━━━━━━━━━━━━━┈⊷
┃ *Game Commands*:
║ ❐ .tictactoe @user
║ ❐ .hangman
║ ❐ .guess <letter>
║ ❐ .trivia
║ ❐ .answer <answer>
║ ❐ .truth
║ ❐ .dare
╰━━━━━━━━━━━━━━━┈⊷
╭━━━━━━━━━━━━━━━┈⊷
┃ *AI Commands*:
║ ❐  .gpt <question>
║ ❐  .gemini <question>
║ ❐  .imagine <prompt>
║ ❐  .flux <prompt>
╰━━━━━━━━━━━━━━━┈⊷
╭━━━━━━━━━━━━━━━━┈⊷
┃ *Fun Commands*:
║ ❐ .compliment @user
║ ❐ .insult @user
║ ❐ .flirt 
║ ❐ .shayari
║ ❐ .goodnight
║ ❐ .roseday
║ ❐ .character @user
║ ❐ .wasted @user
║ ❐ .ship @user
║ ❐ .simp @user
║ ❐ .stupid @user [text]
╰━━━━━━━━━━━━━━━┈⊷
╭━━━━━━━━━━━━━━━┈⊷
┃ *Textmaker*:
║ • metallic <text>
║ • ice <text>
║ • snow <text>
║ • impressive <text>
║ • matrix <text>
║ • light <text>
║ • neon <text>
║ • devil <text>
║ • purple <text>
║ • thunder <text>
║ • leaves <text>
║ • 1917 <text>
║ • arena <text>
║ • hacker <text>
║ • sand <text>
║ • blackpink <text>
║ • glitch <text>
║ • fire <text>
╰━━━━━━━━━━━━━━━┈⊷
╭━━━━━━━━━━━━━━┈⊷
┃ *Downloader*:
║ • play <song_name>
║ • song <song_name>
║ • instagram <link>
║ • facebook <link>
║ • tiktok <link>
║ • video <song name>
║ • ytmp4 <Link>
╰━━━━━━━━━━━━━━━┈⊷
╭━━━━━━━━━━━━━━━┈⊷
┃ *Github Commands:*
║ • git
║ • github
║ • sc
║ • script
║ • repo
╰━━━━━━━━━━━━━━━┈⊷

> BLACK PRO TECH👻`;

    try {
        const imagePath = path.join(__dirname, '../assets/bot_image.jpg');
        const audioUrl = "https://files.catbox.moe/sd3ljy.mp3"; // put your audio mp3 link here by caseyrhodes 

        if (fs.existsSync(imagePath)) {
            const imageBuffer = fs.readFileSync(imagePath);

            await sock.sendMessage(chatId, {
                image: imageBuffer,
                caption: helpMessage,
                contextInfo: {
                    forwardingScore: 1,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: '120363302677217436@newsletter',
                        newsletterName: 'BLACK-BOT',
                        serverMessageId: -1
                    }
                }
            }, { quoted: message });
        } else {
            console.error('Bot image not found at:', imagePath);
            await sock.sendMessage(chatId, {
                text: helpMessage,
                contextInfo: {
                    forwardingScore: 1,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: '120363302677217436@newsletter',
                        newsletterName: 'POWERED BY HAMID HUSSAIN',
                        serverMessageId: -1
                    }
                }
            }, { quoted: message });
        }

        // 🔊 Send audio message after menu
        await sock.sendMessage(chatId, {
            audio: { url: audioUrl },
            mimetype: 'audio/mpeg',
            ptt: true
        }, { quoted: message });

    } catch (error) {
        console.error('Error in help command:', error);
        await sock.sendMessage(chatId, { text: helpMessage });
    }
}

module.exports = helpCommand;

//msee iko hivi don't edit just add url mp3 there you are done fitty bro made by muller friend\\
