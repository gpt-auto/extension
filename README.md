# Quiz Scraper Chrome Extension

A Chrome extension that automatically detects quiz questions and answer choices on web pages and copies them to the clipboard in a formatted way.

## Features

- Automatically detects quiz content on web pages
- Formats questions and answers into a clean, readable format
- Copies the formatted content to your clipboard
- Works automatically on page load and when new content is added
- Can be manually triggered via the extension popup

## Installation

1. Download or clone this repository
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" by toggling the switch in the top right corner
4. Click "Load unpacked" and select the folder containing this extension
5. The extension should now appear in your Chrome toolbar

## Usage

The extension works in two ways:

1. **Automatic mode**: When you load a page containing quiz content, the extension will automatically detect it, format it, and copy it to your clipboard.

2. **Manual mode**: Click on the extension icon in your Chrome toolbar and press the "Scrape Current Page" button to manually trigger the scraping process.

## Expected Output Format

```
Question:
[Question text]

Group of choices:
1. [Answer choice 1]
2. [Answer choice 2]
3. [Answer choice 3]
4. [Answer choice 4]

-------------------
```

## Troubleshooting

- If the extension doesn't detect quiz content automatically, try using the manual scrape button
- Make sure the page has fully loaded before scraping
- Check the console for any error messages

## License

MIT 