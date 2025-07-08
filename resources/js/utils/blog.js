export const createExcerpt = (htmlString, limit = 250) => {
  if (!htmlString) return '';
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = htmlString;
  const text = tempDiv.textContent || tempDiv.innerText || '';
  const cleanedText = text.replace(/(\\s*[\r\n]+\\s*|\\s+)/g, ' ').trim();
  if (cleanedText.length <= limit) return cleanedText;
  return cleanedText.substring(0, limit) + '...';
}; 
