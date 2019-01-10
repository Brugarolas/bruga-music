export const str = (obj) => obj.toString();

// export const sanitize = (str) => str.replace(/\+/g, '%252B').replace(/ /g, '+');
export const sanitize = (str) => str.replace(/\+/g, '%2B').replace(/ /g, '%20');
