export interface ITitleItem {
  title: string;
  total: number;
  isActive: boolean;
}

export interface ISegregatedTitleItem {
  letter: string;
  items: ITitleItem[];
  isActive: boolean;
}
