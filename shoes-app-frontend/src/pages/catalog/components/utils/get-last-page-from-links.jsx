export const getLastPageFromLinks = (links) => {
     const linkArray = links.split(', ');

     const lastLink = linkArray.find((link) => link.includes('rel="last"'));

     if (!lastLink) {
          return 1;
     }

     const match = lastLink.match(/_page=(\d+)/);

     return match ? Number(match[1]) : 1;
};
