import { ITitleItem } from "../../types/title";

export function segregateArrayByTitle(
  arr: ITitleItem[]
): { letter: string; items: ITitleItem[]; isActive: boolean }[] {
  const result: { [key: string]: ITitleItem[] } = arr.reduce(
    (result: { [key: string]: ITitleItem[] }, current: ITitleItem) => {
      const title = current.title.charAt(0).toUpperCase();
      if (!result[title]) {
        result[title] = [];
      }
      result[title].push(current);
      return result;
    },
    {}
  );

  return Object.entries(result)
    .map(([letter, items]) => ({
      letter,
      items,
      isActive: false,
    }))
    .sort((a, b) => a.letter.localeCompare(b.letter));
}
