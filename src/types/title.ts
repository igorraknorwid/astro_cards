export interface ITitleItem {
  title: string;
  total: number;
}

export interface ISegregatedTitleItem {
  letter: string;
  items: ITitleItem[];
  isActive: boolean;
}
