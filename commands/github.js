async function githubCommand(sock, chatId) {
    const repoInfo = `
╭━===========================
┃ 📌 BLACK BOT REPO INFO 📌
┃ ⭐ Total Stars: 1,264
┃ 🍴 Total Forks: 5,610
┃ 🕰 Updated: 31/07/2025
╰━===========================
*ғᴏʀᴋ ᴀɴᴅ sᴛᴀʀ ᴛʜᴇ ʀᴇᴘᴏ*

> https://github.com/hamidanoo/BLACK-BOT

For more info contact : +923039573226

®2025 Hᴀᴍɪᴅ Sʜᴀʜ 🔥

> ᴘᴏᴡᴇʀᴇᴅ ʙʏ Hᴀᴍɪᴅ Sʜᴀʜ  👻

`;

    try {
        await sock.sendMessage(chatId, {
            text: repoInfo,
            contextInfo: {
                forwardingScore: 1,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363418156081092@newsletter',
                    newsletterName: 'Hᴀᴍɪᴅ Sʜᴀʜ',
                    serverMessageId: -1
                }
            }
        });
    } catch (error) {
        console.error('Error in github command:', error);
        await sock.sendMessage(chatId, { 
            text: '❌ Error fetching repository information.' 
        });
    }
}

module.exports = githubCommand;
