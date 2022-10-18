const WORDS_PER_MINUTE = 200;

export function getReadingTime(content?: string) {
  if (!content) {
    return 0;
  }

  const cleanedContent = content.replace(/<\/?[^>]+(>|$)/g, "");

  const numberOfWords = cleanedContent.split(/\s/g).length;

  return Math.ceil(numberOfWords / WORDS_PER_MINUTE);
}
