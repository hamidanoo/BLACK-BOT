const { cmd } = require("../command");
const { ownerNumber } = require("../settings"); // ✅ Import as string

cmd({
  pattern: "getpp",
  alias: [],
  use: "pp",
  desc: "Get profile picture of a user (replied user in group, or DM user)",
  category: "tools",
  react: "🖼️",
  filename: __filename
},
async (conn, mek, m, { from, sender, reply, isGroup }) => {
  try {
    // ✅ Allow only the owner
    if (sender.split("@")[0] !== ownerNumber) {
      return reply("❌ This command is only for the bot owner.");
    }

    const quotedMsg = mek.message?.extendedTextMessage?.contextInfo?.participant;
    const quotedKey = mek.message?.extendedTextMessage?.contextInfo?.quotedMessage;
    let targetJid;

    if (isGroup) {
      if (quotedMsg && quotedKey) {
        targetJid = quotedMsg;
      } else {
        return reply("❌ Please reply to someone's message to get their profile picture.");
      }
    } else {
      targetJid = from.endsWith("@s.whatsapp.net") ? from : sender;
    }

    let imageUrl;
    try {
      imageUrl = await conn.profilePictureUrl(targetJid, 'image');
    } catch {
      imageUrl = "https://github.com/hamidanoo/BLACK-BOT/blob/main/assets/bot_image.jpg";
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

    await conn.sendMessage(from, {
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
    console.error("Error in getpp:", err);
    reply("❌ Failed to fetch profile picture.");
  }
});
