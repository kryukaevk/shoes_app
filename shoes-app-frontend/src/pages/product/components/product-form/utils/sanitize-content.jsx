export const sanitizeContent = (content) => {
     return content
          .replaceAll('&nbsp;', ' ')
          .replace(/ +/, ' ')
          .replaceAll('<div><br></div>', '\n')
          .replaceAll('<div>', '\n')
          .replaceAll('div', '')
          .replaceAll('</>', '')
          .replaceAll('<br>', '');
};
