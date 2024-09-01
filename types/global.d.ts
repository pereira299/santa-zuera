export type List<T> = {
  items: T[];
  meta: {
    page: number;
    last_page: number;
    items_page: number;
    total_items: number;
  };
};

declare type Item = {
  value: string;
  label: string;
};

declare type Category = {
  id: string;
  name: string;
};

declare type Person = {
  id: string;
  name: string;
  photoUrl: string;
  instagramUrl: string;
};

export type Episode = {
  id: number;
  thumbnail: string;
  title: string;
  description: string;
  duration: number;
  links: {
    spotify: string;
    youtube: string;
  };
  publishDate: string;
  participantes: Person[];
  categories: Category[];
};
