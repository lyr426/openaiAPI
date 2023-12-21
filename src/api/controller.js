const OpenAI = require('openai');
require('dotenv').config();

const openai = new OpenAI({
    apiKey: process.env.API_KEY
}); 

exports.getImage = (req, res) => {
    const { text } = req.body;  
    console.log(text); 
    textToImage(text);
};

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
        const imageUrl = response.output.url;
    
        // 이미지 다운로드 및 처리 (여기서는 예시로 콘솔에 이미지 URL 출력)
        console.log('Image URL:', imageUrl);
        return imageUrl
        // 만약 실제로 이미지를 다운로드하거나 저장하고 싶다면 여기서 다운로드 또는 저장 코드를 추가하세요.
    } catch (error) {
        console.error('Error:', error);
        return error
    }
}

// const textPrompt = 'A cat sitting on a cloud';
// // 텍스트를 이미지로 변환
// textToImage(textPrompt);
    