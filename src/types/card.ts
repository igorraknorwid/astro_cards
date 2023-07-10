interface ITheme {
  title: string;
  _id: string;
}

export interface ICard {
  _id: string;
  title: string;
  image_slug: string;
  theme: ITheme;
}

export interface INavigation {
  cards: ICard[];
  year: string | null;
}
