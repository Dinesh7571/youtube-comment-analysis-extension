// chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
//     const positiveCount = 0;
//     const negativeCount = 0;
  
//     // Analyze each comment
//     for (let comment of message.comments) {
//       const sentiment = await analyzeComment(comment); // Call the OpenAI API
//       if (sentiment.includes('positive')) {
//         positiveCount++;
//       } else {
//         negativeCount++;
//       }
//     }
  
//     // Send the result to the popup or content script to display
//     chrome.runtime.sendMessage({ positiveCount, negativeCount });
//   });
  
//   // Sentiment analysis function (same as above)
//   async function analyzeComment(comment) {
//     const response = await fetch('https://api.openai.com/v1/chat/completions', {
//       method: 'POST',
//       headers: {
//         'Authorization': `Bearer ${API_KEY}`, // Replace with your API key
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({
//         model: 'gpt-4',
//         messages: [{ role: 'system', content: 'Classify the comment as positive or negative.' }, { role: 'user', content: comment }]
//       })
//     });
//     const data = await response.json();
//     return data.choices[0].message.content.trim();
//   }
  