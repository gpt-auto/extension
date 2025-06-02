// Function to scrape the quiz content
function scrapeQuizContent() {
  // Find all quiz elements - try multiple selectors
  const quizElements = document.querySelectorAll('.quiz_sortable, .question_text, .question_holder, .question');
  
  if (quizElements.length === 0) {
    return null;
  }

  let result = `help me answer the questions i will provide after this message consecutively. I will attach a pdf file on this message that has the information or data for each provided question. Questions can be a multiple choice, true/false, or fill in the blanks. in the event that it's a multiple choice, just give back the answer in bold letters exactly as provided (If it’s a question with calculations involved, give me your solution and answer it with Python. Follow the format: Given -> Formula -> Substitute -> Final answer always rounded in 2 decimal places (from python).), if it's fill in the blanks, you will just give me the word that i will type in the blank and no other extra unnecessary words. in the event that you can not find the answer in the pdf i attached or if there is no pdf attachment, you can search the internet if and only if the question provided wasn't available or attached.\n\n`;
  // let result = "";
  let contentFound = false;
  const processedQuestions = new Set(); // Track already processed questions to avoid duplicates
  
  quizElements.forEach((quizElement, index) => {
    // Try multiple approaches to find question text
    let questionText = "";
    let questionTextElement = quizElement.querySelector('.header > .text > .question_text');
    
    if (!questionTextElement) {
      // Try alternative selectors
      questionTextElement = quizElement.querySelector('.question_text') || 
                            quizElement.querySelector('.question_prompt') ||
                            quizElement.querySelector('.display_question');
    }
    
    if (questionTextElement) {
      // Get the question text
      questionText = questionTextElement.textContent.trim();
      
      // Find any images in the question
      const images = questionTextElement.querySelectorAll('img');
      let imageUrls = [];
      images.forEach(img => {
        if (img.src) {
          imageUrls.push(img.src);
        }
      });
      
      // Skip if we've already processed this question
      if (processedQuestions.has(questionText)) {
        return;
      }
      
      // Add to processed set
      processedQuestions.add(questionText);
      
      contentFound = true;
      result += `Question:\n${questionText}\n`;
      
      // Add image URLs if present
      if (imageUrls.length > 0) {
        result += `\nImage URLs:\n${imageUrls.join('\n')}\n`;
      }
      
      result += '\n';
      
      // Get the answer choices
      result += `Group of choices:\n`;
      
      // Try multiple answer selectors
      let answerElements = quizElement.querySelectorAll('.answer .answer_label, .answers .answer_label');
      
      if (answerElements.length === 0) {
        // Try more alternative selectors
        answerElements = quizElement.querySelectorAll('.answer_row .answer_label, .answer_text, .answers .answer_text');
      }
      
      if (answerElements.length > 0) {
        answerElements.forEach((answerElement, i) => {
          const answerText = answerElement.textContent.trim();
          result += `${i + 1}. ${answerText}\n`;
        });
      } else {
        // Last resort - look for any list items or similar elements that might contain answers
        const possibleAnswers = quizElement.querySelectorAll('li, .option, [type="radio"] + label, [type="checkbox"] + label');
        if (possibleAnswers.length > 0) {
          possibleAnswers.forEach((answerElement, i) => {
            const answerText = answerElement.textContent.trim();
            result += `${i + 1}. ${answerText}\n`;
          });
        } else {
          result += `[No answer choices found]\n`;
        }
      }
    }
  });
  
  if (!contentFound) {
    return null;
  }
  
  return result.trim();
}

// Function to copy text to clipboard
function copyToClipboard(text) {
  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.style.position = 'fixed';
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand('copy');
  document.body.removeChild(textarea);
}

// Function to load username from username.txt
function loadUsername() {
  fetch(chrome.runtime.getURL('username.txt'))
    .then(response => response.text())
    .then(text => {
      const username = text.trim();
      // Create a hidden element to store the username
      let usernameElement = document.getElementById('username-value');
      if (!usernameElement) {
        usernameElement = document.createElement('div');
        usernameElement.id = 'username-value';
        usernameElement.style.display = 'none';
        document.body.appendChild(usernameElement);
      }
      usernameElement.textContent = username;
    })
    .catch(error => {
      console.error('Error loading username:', error);
    });
}

function post(text) {
  // Read username from username.txt
  const username = document.querySelector('#username-value')?.textContent.trim() || 'gg';
  
  fetch(`https://api-htmd.onrender.com/api/${username}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      text: text
    })
  })
  .catch(error => {
    console.error('Error posting content:', error);
  });
}

// Function to try scraping the quiz
function tryToScrapeQuiz() {
  const quizContent = scrapeQuizContent();
  if (quizContent) {
    // copyToClipboard(quizContent);
    post(quizContent);
    return true;
  } else {
    return false;
  }
}

// Run when the page is fully loaded
window.onload = function() {
  // Load username first
  loadUsername();
  
  setTimeout(() => {
    tryToScrapeQuiz();
  }, 2000);
};

// Add keyboard shortcut listener (backtick key)
document.addEventListener('keydown', function(event) {
  // Check if backtick key (`) is pressed
  if (event.key === '`') {
    tryToScrapeQuiz();
  }
}); 