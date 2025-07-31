const { downloadMediaMessage } = require("@whiskeysockets/baileys");

module.exports = async function(sock, chatId, message) {
  try {
    const quotedInfo = message.message?.extendedTextMessage?.contextInfo;
    const targetJid = quotedInfo?.participant;

    if (!quotedInfo || !targetJid) {
      await sock.sendMessage(chatId, {
        text: "❌ Please reply to someone's message to get their profile picture."
      });
      return;
    }

    let imageUrl;
    try {
      imageUrl = await sock.profilePictureUrl(targetJid, 'image');
    } catch {
      imageUrl = "https://files.catbox.moe/ntqtnt.jpg";
    }

    const fakeVCard = {
      key: {
        fromMe: false,
        participant: '0@s.whatsapp.net',
        remoteJid: "status@broadcast"
      },
      message: {
        contactMessage: {
          displayName: "Hᴀᴍɪᴅ Sʜᴀʜ ✅",
          vcard: "BEGIN:VCARD\nVERSION:3.0\nFN: Hᴀᴍɪᴅ Sʜᴀʜ ✅\nORG: Bʟᴀᴄᴋ Bᴏᴛ;\nTEL;type=CELL;type=VOICE;waid=923039573226:+92 303 9573226\nEND:VCARD",
          jpegThumbnail: Buffer.from([])
        }
      }
    };

    await sock.sendMessage(chatId, {
      image: { url: imageUrl },
      caption: `🖼️ Profile Picture of @${targetJid.split('@')[0]}`,
      contextInfo: {
        mentionedJid: [targetJid],
        forwardingScore: 5,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterName: "Hᴀᴍɪᴅ Sʜᴀʜ",
          newsletterJid: "120363418156081092@newsletter"
        }
      }
    }, { quoted: fakeVCard });

  } catch (err) {
    console.error("❌ Error in getpp command:", err);
    await sock.sendMessage(chatId, {
      text: "⚠️ Failed to fetch profile picture."
    });
  }
};
