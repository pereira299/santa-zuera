export declare type List<T> = {
  items: T[];
  meta: {
    page: number;
    last_page: number;
    items_page: number;
    total_items: number;
  };
};

export declare type Item = {
  value: string;
  label: string;
};

export declare type Category = {
  id: string;
  name: string;
};

export declare type Person = {
  id: string;
  name: string;
  photoUrl: string;
  instagramUrl: string;
};

export declare type Episode = { 
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
