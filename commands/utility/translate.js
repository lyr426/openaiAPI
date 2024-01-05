const { SlashCommandBuilder } = require('discord.js');
const request = require('request-promise'); 
const wait = require('node:timers/promises').setTimeout;
require('dotenv').config();

module.exports = {
	data: new SlashCommandBuilder()
		.setName('번역')
        .setDescription('한글을 영어로 번역해주는 기능')
        .addStringOption(option => 
            option
                .setName('text')
                .setDescription('번역할 문장을 입력')
                .setRequired(true)),
	async execute(interaction) {
        const text = interaction.options.getString('text') ?? '문장은 필수 입력'; 
        //await interaction.deferReply();
        //const translated_text = translate(text); 
        // await wait(5_000);
        const client_id = process.env.NAVER_CLIENT_ID;
        const client_secret = process.env.NAVER_CLIENT_SECRET;  
        const api_url = 'https://openapi.naver.com/v1/papago/n2mt';
        const options = {
            url: api_url,
            form: {'source':'ko', 'target':'en', 'text':text},
            headers: {'X-Naver-Client-Id':client_id, 'X-Naver-Client-Secret': client_secret}
         };
    
         try{
            const response = await request.post(options); 
            // var translatedText = response.message.result;
            const translated_text = JSON.parse(response).message.result.translatedText;
            console.log(translated_text);
            await interaction.reply(translated_text);
         } catch (error) {
            console.error('Error:', error); 
         }

		//await interaction.editReply(translated_text);
	},
};
