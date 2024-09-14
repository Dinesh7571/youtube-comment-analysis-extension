let buttonAdded = false;

async function scrapeAndAnalyzeComments() {
  // Extract comments from the page
  const comments = [...document.querySelectorAll('yt-attributed-string#content-text')].map(el => el.textContent.trim());

  if (comments.length === 0) {
    alert('No comments found');
    return;
  }

  console.log('Extracted Comments:', comments);

  // Update the button to show loading state
  const analyzeButton = document.getElementById('analyzeButton');
  analyzeButton.textContent = 'Analyzing...';
  analyzeButton.style.backgroundColor = '#cccccc'; // Gray out button during loading

  try {
    const response = await fetch('https://youtube-comment-analysis-extension.onrender.com/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ comments }),
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json(); // Parse the API response (percentages of positive, negative, neutral)
    console.log('Sentiment Analysis Result:', data);

    // Update the button with the result
    analyzeButton.textContent = `Positive: ${data.positive}%`;
    analyzeButton.style.backgroundColor = '#4CAF50'; // Green button for success
    analyzeButton.title = `Negative: ${data.negative}% | Neutral: ${data.neutral}%`;

  } catch (error) {
    console.error('Error:', error);

    // Update the button to indicate failure
    analyzeButton.textContent = 'Failed';
    analyzeButton.style.backgroundColor = '#f44336'; // Red button for error
    analyzeButton.title = 'Failed to analyze comments. Please try again.';
  }
}

function addAnalyzeButton() {
  // Check if the current page is a YouTube video watch page
  if (window.location.pathname.startsWith('/watch') && !buttonAdded) {
    // Create the "Analyze Comments" button
    const analyzeButton = document.createElement('button');
    analyzeButton.id = 'analyzeButton'; // Add an ID for easy access
    analyzeButton.textContent = 'Analyze Comments';
    analyzeButton.style = `
      position: fixed;
      bottom: 20px;
      right: 20px;
      width: 200px;
      height: 50px;
      background-color: #ff0000;
      color: white;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      font-size: 14px;
      font-weight: bold;
      z-index: 9999;
      transition: background-color 0.3s, color 0.3s;
    `;

    // Add event listener to handle click
    analyzeButton.addEventListener('click', scrapeAndAnalyzeComments);

    // Append the button to the body
    document.body.appendChild(analyzeButton);
    buttonAdded = true; // Mark button as added
  }
}

// Observe DOM changes with optimization
function observeDOM() {
  const targetNode = document.querySelector('#contents'); // Adjust selector if needed
  if (!targetNode) return; // Exit if target node is not available

  const config = { childList: true, subtree: true };

  const observer = new MutationObserver((mutations) => {
    for (let mutation of mutations) {
      if (mutation.type === 'childList') {
        addAnalyzeButton(); // Re-check if button needs to be added
      }
    }
  });

  observer.observe(targetNode, config);
}

// Initialize the script
window.addEventListener('load', () => {
  addAnalyzeButton();
  observeDOM();
});
