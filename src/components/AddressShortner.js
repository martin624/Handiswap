export function shortenTextWithParentheses(text, maxLength) {
    // Check if text is undefined or not a string
    if (typeof text !== 'string' || !text) {
      return ''; // Return an empty string if text is invalid
    }
  
    // Check if text length is already less than or equal to maxLength
    if (text.length <= maxLength) {
      return text; // Return the original text if it's already short enough
    }
  
    // Calculate the length of the first half of the text (excluding parentheses and ellipsis)
    const firstHalfLength = Math.floor((maxLength - 5) / 2); // -5 to account for "(...)"
  
    // Calculate the length of the second half of the text (excluding parentheses and ellipsis)
    const secondHalfLength = Math.ceil((maxLength - 5) / 2); // -5 to account for "(...)"
  
    // Extract the first and last parts of the text
    const firstHalf = text.slice(0, firstHalfLength);
    const secondHalf = text.slice(-secondHalfLength);
  
    // Construct the shortened text with parentheses in the middle
    const shortenedText = `${firstHalf}...${secondHalf}`;
  
    return shortenedText;
}