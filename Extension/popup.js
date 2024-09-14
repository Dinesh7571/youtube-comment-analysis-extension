chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    const { positiveCount, negativeCount } = message;
    const totalComments = positiveCount + negativeCount;
  
    // Calculate percentages
    const positivePercentage = ((positiveCount / totalComments) * 100).toFixed(2);
    const negativePercentage = ((negativeCount / totalComments) * 100).toFixed(2);
  
    // Update the HTML with the results
    document.getElementById('positive').textContent = `Positive Comments: ${positivePercentage}% (${positiveCount} out of ${totalComments})`;
    document.getElementById('negative').textContent = `Negative Comments: ${negativePercentage}% (${negativeCount} out of ${totalComments})`;
  });
  