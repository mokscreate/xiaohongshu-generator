import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.post('/api/generate', async (req, res) => {
  try {
    const { prompt } = req.body;

    console.log('收到生成请求');

    const response = await fetch('https://api.minimax.chat/v1/text/chatcompletion_v2', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.VITE_MINIMAX_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'abab6.5s-chat',
        messages: [{ role: 'user', content: prompt }],
        tokens_to_generate: 2048,
        temperature: 0.9,
        top_p: 0.95
      })
    });

    const data = await response.json();
    console.log('API 响应状态:', response.status);
    console.log('API 响应数据:', data);

    if (data.choices && data.choices[0]) {
      res.json({ success: true, content: data.choices[0].message.content });
    } else {
      res.status(500).json({
        success: false,
        error: data.base_resp?.status_msg || data.message || '生成失败'
      });
    }
  } catch (error) {
    console.error('服务器错误:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`后端服务运行在 http://localhost:${PORT}`);
});
