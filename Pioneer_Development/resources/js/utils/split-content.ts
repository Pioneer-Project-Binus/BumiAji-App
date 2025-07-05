export const splitContentIntoPages = (content: string, wordsPerPage: number = 500): string[] => {
  const textContent = content.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
  const words = textContent.split(' ');
  if (words.length <= wordsPerPage) {
    return [content];
  }
  const paragraphs = content.split('\n').filter(p => p.trim());
  const pages: string[] = [];
  let currentPage = '';
  let currentWordCount = 0;
  for (let i = 0; i < paragraphs.length; i++) {
    const paragraph = paragraphs[i];
    const paragraphWords = paragraph.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim().split(' ').length;
    if (currentWordCount + paragraphWords > wordsPerPage && currentPage) {
      pages.push(currentPage);
      currentPage = paragraph;
      currentWordCount = paragraphWords;
    } else {
      currentPage += (currentPage ? '\n' : '') + paragraph;
      currentWordCount += paragraphWords;
    }
  }
  if (currentPage) {
    pages.push(currentPage);
  }
  return pages.length > 0 ? pages : [content];
};

export const formatContent = (content: string): string => {
  if (!content) return '';
  const hasHtmlTags = /<[^>]*>/g.test(content);
  
  if (hasHtmlTags) {
    // Summernote ini
    return content;
  } else {
    // Formatting secara manual
    let formattedContent = content
      .replace(/\n\s*\n/g, '</p><p>')
      .replace(/\n/g, '<br>')
      .trim();
    if (!formattedContent.startsWith('<p>')) {
      formattedContent = '<p>' + formattedContent + '</p>';
    }
    formattedContent = formattedContent.replace(/<p>\s*<\/p>/g, '');
    return formattedContent;
  }
}; 