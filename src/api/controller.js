const OpenAI = require('openai');
const request = require('request-promise'); 
require('dotenv').config();

const openai = new OpenAI({
    apiKey: process.env.API_KEY
}); 

exports.getImage = (req, res) => {
    const { text } = req.body;  
    console.log(text); 
    const url = textToImage(text);
    res.status(200).send(url); 
};

exports.getTranslate = (req, res) => {
    const { query } = req.body; 
    console.log(query)
    const response = translate(query);
    const translatedText = response.message.result;
    res.status(200).send(translatedText); 
}

async function textToImage(prompt, quality = 'standard', size = '1024x1024', n = 1){
    try {
        // DALL·E 3 API 호출을 위한 요청 설정
        const response = await openai.images.generate({
          model: 'dall-e-3',
          prompt,
        //   quality,
        //   size,
          n
        });
    
        // 이미지 URL 받아오기
        console.log(response);
        const imageUrl = response.created.data[0].url;
    
        // 이미지 다운로드 및 처리 (여기서는 예시로 콘솔에 이미지 URL 출력)
        console.log('Image URL:', imageUrl);
        return imageUrl
    } catch (error) {
        console.error('Error:', error);
        return error
    }
}

async function translate(query) {
    const client_id = process.env.NAVER_CLIENT_ID;
    const client_secret = process.env.NAVER_CLIENT_SECRET;  
    const api_url = 'https://openapi.naver.com/v1/papago/n2mt';
    const options = {
        url: api_url,
        form: {'source':'ko', 'target':'en', 'text':query},
        headers: {'X-Naver-Client-Id':client_id, 'X-Naver-Client-Secret': client_secret}
     };

     try{
        const response = await request.post(options); 
        console.log(response);
        const translatedText = response.message.result;

        return response;
     } catch (error) {
        console.error('Error:', error); 
        return error; 
     }
}