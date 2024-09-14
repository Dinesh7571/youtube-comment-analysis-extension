const express = require('express');
const axios = require('axios');  // Assuming Google Gemini might use HTTP calls like OpenAI
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());  
const PORT = 3000;
const { GoogleGenerativeAI } = require('@google/generative-ai')

const API_KEY = "AIzaSyAFhCp277S_XyF6cbQ2OzUgIEfkHo8ORvU";
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// const  comments =['Anyone in 2023 listening this master piece', 'No guns, no nudity what a masterpiece ️', 'Koi to hoga jo ise Aaj bhi sunta hoga', 'Legends are watching in 2024-25****Like button', '2024 wale  listeners  Punjabiaa di gal ta wakhari hondi ay', 'Old is gold', 'Anyone in 2024 listening this master piece', '2024 kon kon sun rha he like maro', '2:44 best lines.', 'Anyone in 2024 ?', 'The OG Punjabi songs of that time ', "2024 'ਚ ਸੁਨਣ ਆਲੇ\nAnyone Listen in 2024", 'Even in 2023 I prefer this song over many of the modern song, top notch singing', 'Never forgets that song vibe in 2024!', 'Anyone listing 2024', 'Legend are waiting for odhi aankh bhi kamini ......', 'Such a masterpiece! what a cool vibe !', 'I loved tha era I listened to this song today and listened to it 20+times  I loved that song vibes', '2024 bale hajari lgado', 'Where is this legend these days.  I want to listen him more.', 'Nostalgia back in childhood', '2024 wale aa jaao idhar', 'After India lost in finals yesterday this song heel me', 'Most of us came for the verse @ 2:45 ️', 'Give attendance who are watching in APRIL 2023.️️', 'जय श्री राम जय श्री राम जय श्री राम जय श्री राम जय…ी राम जय श्री राम जय श्री राम जय श्री राम मित्रों', '2:40 ON FIRE', '10 june 2024 ko kon dekh rha h', 'This is exactly what Punjabi Songs should be', 'Song loved by the young generation of 2010s', 'Who is listening this masterpiece in 2024', "It's 2024 and still masterpiece", "That's the real Punjabi music", 'Anyone will listen this masterpiece song in (2025)', 'Good to see good music getting noticed even after so long', 'December 2023 attendence', 'Anyone watching this on new year2024', 'In love with this song ️ , what a vibe ️', 'I had worked in this song , as a side dancer , sti…emembering that day gives me too much Nostalgia ️', 'Anyone can listen this masterpiece in 2024', 'Who come here after listing this  masterpiece on  insta reel', 'This is called new year song  n we will meet soon ️️', 'Ye song ko mai hit hone se pahle se sun raha hu', 'This guy has a truly punjabi voice', 'Listened full song only 4 ____Ohdi ankh v kamini mera dil v kamina....', "It's 2023 and listen this masterpiece", 'Kon kon 2025 me bhi sunega', '2024 Which legend is listening to the song 2024 This is what is playing', 'Nostalgia, when i used to play it on boofer on repeat. Golden days', '𝑨𝒏𝒚𝒐𝒏𝒆 𝒊𝒏 2024', 'Legends still here ️', 'Such nostalgia. ️ Cant even describe in words!', 'Kya vibe hai iss song mein bahot underrated hai', 'No autotune like a Tony kakkar such a real voice', '2023 kon sun rah h', '1 min silent for Puja', 'Ye kaha chhup rha tha 2023 tk excellent voice', '2:42 that is all the felling of song', 'Who is listening this song in 2024', "What a legendary song..  that's a vibe"]


app.post('/', async (req, res) => {
  try {
    const {comments}=req.body
    // Prepare the prompt with clear instructions
    const prompt = `
      do sentiment analysis on this and give the percentge of positive ,negative & neutral coments in this json nothing other than jis format {positive:?,negative:?,neutral:?}: ${JSON.stringify(comments)}
    `;

    const result = await model.generateContent(prompt);
    const rawText = result.response.candidates[0].content.parts[0].text;
    const cleanedText = rawText.replace(/```json|```/g, '').trim();
    
    // Parse the cleaned JSON string to an object
    const parsedPercentages = JSON.parse(cleanedText);

    // Send the parsed JSON response containing only the percentages
    res.json(parsedPercentages); 
    
  } catch (error) {
    console.log(error);
    res.status(500).send('Error processing the request');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});
