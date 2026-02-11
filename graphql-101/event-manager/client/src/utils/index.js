export const clipText = (string, wordCount = 15) => {
  const words = string.split(" ");
  if (words.length > wordCount) {
    return words.slice(0, wordCount - 1).join(" ");
  } else {
    return string;
  }
};
