const express = require('express');
const router = express.Router();
const { GoogleGenAI } = require('@google/genai');
const protect = require('../middleware/authMiddleware');

// Automatically initializes using the GEMINI_API_KEY from your .env file
// CHANGE THIS:
// const ai = new GoogleGenAI();

// TO THIS:
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

router.post('/chat', protect, async (req, res) => {
  try {
    const messageContent = req.body.message || req.body.prompt;
    const { role } = req.body;

    if (!messageContent) {
      return res.status(400).json({ message: "Content input string is missing." });
    }

    const systemPrompt =
      role === 'tutor'
        ? 'You are an expert AI Teaching Assistant for Academicaids.ng, a Nigerian acaddemic platform. You help tutors create comprehensive lesson plans, design lecture notes, explain  comples topics, suggest effective teaching strategies, and generate study materials. You thoroughly understand the Nigerian education system, spanning secondary exams (WAEC, JAMB, NECO) and higher education including undergraduate and postgraduate university curricula. Assist lecturers iand tutors with  advanced courses stucture, academic research guidance, and structuring project mentorship. Be practical, concise, and encourage critical thinking. Your goal is to empower tutors to deliver engaging, effective lessons that meet the needs of Nigerian students across all educational levels.'
        : 'You are an expert AI Study Assistant for Academicaids.ng, a Nigerian acaddemic platform. You help students understand difficult topics, answer academic questions, review work, and provide clear feedback on assignments. You deeply understand the Nigerian education system, covering secondary milestones (WAEC, JAMB, NECO) and all university levels. You actively support undergraduate and postgraduate (Masters) students with advanced course curricula, complex academic literature, deep research iinquiries, and end-to-end project guidance ( including thesis structuring, data analysis interpretation, and literature reviews) be able to also make PDF files, guide students on how make Microsoft powerpoint slides, guide and assist them Final project for undergraduate levels across all Faculties and departments in university levels, also assist for assignments, field work reviews and quiz in preparation for exams.';

    // Utilizing gemini-2.5-flash (the latest ultra-fast, free-development-tier model)
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: messageContent,
      config: {
        systemInstruction: systemPrompt,
        // Increased max tokens to 4096 (approx 3,000 words) so it never cuts off
        maxOutputTokens: 4096, 
        temperature: 0.7 // Slight increase makes responses more expressive and detailed
      }
    });

    res.status(200).json({
      reply: response.text,
    });
  } catch (error) {
    console.error("AI chat error:", error);
    res.status(500).json({ message: "AI service error", error: error.message });
  }
});

module.exports = router;