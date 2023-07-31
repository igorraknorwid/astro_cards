export function capitalizeFirstLetterInEveryWord(input: string): string {
  if (!input || input.length === 0) {
    return input;
  }

  const words = input.split(" ");
  const capitalizedWords = words.map((word) => {
    if (word.length > 0) {
      return word.charAt(0).toUpperCase() + word.slice(1);
    } else {
      return word;
    }
  });

  return capitalizedWords.join(" ");
}
