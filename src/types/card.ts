interface ITheme {
  title: string;
  _id: string;
}

interface IYear {
  title: string;
}

export interface ICard {
  _id: string;
  title: string;
  image_slug: string;
  theme: ITheme;
  subtheme?: ITheme;
  slug: string;
  warning: string;
  years: IYear[];
}

export interface INavigation {
  cards: ICard[];
  year: string | null;
}
