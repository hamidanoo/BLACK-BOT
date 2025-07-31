const { ttdl } = require("ruhend-scraper");
const axios = require('axios');

const processedMessages = new Set();

async function tiktokCommand(sock, chatId, message) {
    try {
        if (processedMessages.has(message.key.id)) return;
        processedMessages.add(message.key.id);
        setTimeout(() => processedMessages.delete(message.key.id), 5 * 60 * 1000);

        const text = message.message?.conversation || message.message?.extendedTextMessage?.text;
        if (!text) return await sock.sendMessage(chatId, { text: "Please provide a TikTok link for the video." });

        const url = text.split(' ').slice(1).join(' ').trim();
        if (!url) return await sock.sendMessage(chatId, { text: "Please provide a TikTok link for the video." });

        const tiktokPatterns = [
            /https?:\/\/(?:www\.)?tiktok\.com\//,
            /https?:\/\/(?:vm\.)?tiktok\.com\//,
            /https?:\/\/(?:vt\.)?tiktok\.com\//,
            /https?:\/\/(?:www\.)?tiktok\.com\/@/,
            /https?:\/\/(?:www\.)?tiktok\.com\/t\//
        ];

        const isValidUrl = tiktokPatterns.some(pattern => pattern.test(url));
        if (!isValidUrl) {
            return await sock.sendMessage(chatId, { text: "That is not a valid TikTok link. Please provide a valid TikTok video link." });
        }

        await sock.sendMessage(chatId, {
            react: { text: '🔄', key: message.key }
        });

        let downloadSuccess = false;

        // --- 🥇 Primary: TikWM API ---
        try {
            const response = await axios.get('https://tikwm.com/api/', {
                params: { url: url },
                headers: {
                    'User-Agent': 'Mozilla/5.0'
                }
            });

            const result = response.data;
            if (result && result.data && result.data.play) {
                await sock.sendMessage(chatId, {
                    video: { url: result.data.play },
                    mimetype: "video/mp4",
                    caption: "*Downloaded by Black Bot 💀*"
                }, { quoted: message });

                downloadSuccess = true;
            }
        } catch (err) {
            console.warn('API failed:', err.message);
        }

        // --- 🥈 Secondary: ruhend-scraper ---
        if (!downloadSuccess) {
            try {
                const downloadData = await ttdl(url);

                if (downloadData?.data?.length > 0) {
                    for (const media of downloadData.data.slice(0, 3)) {
                        const mediaUrl = media.url;
                        const isVideo = /\.(mp4|mov|avi|mkv|webm)$/i.test(mediaUrl) || media.type === 'video';

                        if (isVideo) {
                            await sock.sendMessage(chatId, {
                                video: { url: mediaUrl },
                                mimetype: "video/mp4",
                                caption: "*Downloaded by Black Bot*"
                            }, { quoted: message });
                        } else {
                            await sock.sendMessage(chatId, {
                                image: { url: mediaUrl },
                                caption: "*Downloaded by Black Bot 💀*"
                            }, { quoted: message });
                        }
                    }
                    downloadSuccess = true;
                }
            } catch (fallbackErr) {
                console.warn('ruhend-scraper fallback failed:', fallbackErr.message);
            }
        }

        // --- ❌ Final Error Message ---
        if (!downloadSuccess) {
            await sock.sendMessage(chatId, {
                text: "Unable to download the TikTok video ⚠️ Please try again later or use a different link."
            });
        }

    } catch (error) {
        console.error('Error in TikTok command:', error);
        await sock.sendMessage(chatId, {
            text: "An unexpected error occurred while processing your request 🚫"
        });
    }
}

module.exports = tiktokCommand;
