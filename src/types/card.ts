interface ITheme {
  title: string;
  _id: string;
}

interface IThemes {
  themes2: ITheme[];
}

interface IYear {
  title: string;
}

export interface ICard {
  _id: string;
  title: string;
  image_slug: string;
  theme: ITheme;
  theme2?: ITheme[];
  subtheme?: ITheme;
  slug: string;
  warning: string;
  years: string[];
}

export interface ICardData {
  _id: string;
  title: string;
  image_slug: string;
  theme: ITheme;
  theme2?: ITheme[];
  subtheme?: ITheme;
  slug: string;
  warning: string;
  years: IYear[];
}

export interface INavigation {
  cards: ICard[];
  year: string | null;
}
