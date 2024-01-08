const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const request = require('request-promise'); 
const OpenAI = require('openai');
const wait = require('node:timers/promises').setTimeout;

require('dotenv').config();
const openai = new OpenAI({
    apiKey: process.env.API_KEY
}); 

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
        let translated_text = ''; 
        let image_url = 'https://user-images.githubusercontent.com/67030031/217006974-dc983d3b-3d1a-459a-a733-0e255fee0422.png'; 
        const client_id = process.env.NAVER_CLIENT_ID;
        const client_secret = process.env.NAVER_CLIENT_SECRET;  
        const api_url = 'https://openapi.naver.com/v1/papago/n2mt';
        const options = {
            url: api_url,
            form: {'source':'ko', 'target':'en', 'text':text},
            headers: {'X-Naver-Client-Id':client_id, 'X-Naver-Client-Secret': client_secret}
         };
        await interaction.deferReply();
        await wait(5_000);
    
         try{
            const response = await request.post(options); 
            // var translatedText = response.message.result;
            translated_text = JSON.parse(response).message.result.translatedText;
            console.log(translated_text);
         } catch (error) {
            console.error('Error:', error); 
         }  

         try {
            const response = await openai.images.generate({
              model: 'dall-e-2',
              prompt: translated_text,
              size: '256x256'
            });
            console.log(response);
            image_url = response.data[0].url;
        } catch (error) {
            console.error('Error:', error);
            return error
        }

        const exampleEmbed = new EmbedBuilder()
            .setTitle(text)
            .setImage(image_url);

        await interaction.followUp({ embeds: [exampleEmbed] });
	},
};
