export type List<T> = {
  items: T[];
  meta: {
    page: number;
    last_page: number;
    items_page: number;
    total_items: number;
  };
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
    date: Date;
    participants: string[];
    categories: string[];
}