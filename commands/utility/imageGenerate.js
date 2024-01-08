const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const request = require('request-promise'); 
require('dotenv').config();

module.exports = {
	data: new SlashCommandBuilder()
		.setName('이미지생성')
        .setDescription('입력한 문장으로 이미지를 생성해주는 기능')
        .addStringOption(option => 
            option
                .setName('text')
                .setDescription('생성할 이미지에 대한 설명을 입력')
                .setRequired(true)),
	async execute(interaction) {
        const text = interaction.options.getString('text') ?? '문장은 필수 입력'; 
        const translated_text = ''; 
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
            translated_text = JSON.parse(response).message.result.translatedText;
            console.log(translated_text);
            await interaction.reply("번역된 문장: " + translated_text);
         } catch (error) {
            console.error('Error:', error); 
         }  

        const exampleEmbed = new EmbedBuilder()
            .setTitle(text)
            .setImage('https://user-images.githubusercontent.com/56033943/217758183-6fb570ed-cd49-461a-a62b-124be2ab1a61.png');

        await interaction.reply({ embeds: [exampleEmbed] });
	},
};
