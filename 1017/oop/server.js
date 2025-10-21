
require('dotenv').config();
const express = require('express');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const cors = require('cors');

const app = express();
const port = 3000;

// CORS 설정
app.use(cors());
app.use(express.json());

// Gemini API 클라이언트 초기화
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// POST 요청을 처리할 /chat 엔드포인트
app.post('/chat', async (req, res) => {
    try {
        const userMessage = req.body.message;

        // For text-only input, use the gemini-1.5-flash model
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

        // 대화의 맥락을 추가하여 프롬프트를 구성합니다.
        const prompt = `당신은 전문 헬스 트레이너입니다. 다음 사용자의 질문에 대해 친절하고 상세하게 답변해주세요. 운동 방법, 식단, 부상 예방 등 건강 관련 질문에만 답변해야 합니다. 그 외의 질문에는 "저는 운동 관련 질문에만 답변할 수 있습니다."라고 응답하세요. 질문: ${userMessage}`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        
        res.json({ reply: text });

    } catch (error) {
        console.error("Error calling Gemini API:", error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(port, () => {
    console.log(`서버가 http://localhost:${port} 에서 실행 중입니다.`);
});
