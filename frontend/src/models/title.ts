// Shapes returned by the REAflix API.
export type ImageSet = Record<string, string>; // e.g. { w342: url, w780: url }

export interface TitleCard {
  slug: string;
  title: string;
  year: number;
  maturity: string;
  runtime_min: number;
  genres: string[];
  top10_rank: number | null;
  poster: ImageSet;
  backdrop: ImageSet;
}

export interface TitleDetails extends TitleCard {
  description: string;
  credit: string;
  license: string;
  source_url: string;
}

export interface ContinueItem extends TitleCard {
  progress: number; // 0..1
  position: number; // seconds
}

export interface BrowseRow {
  slug: string;
  name: string;
  titles: TitleCard[];
}

export interface StreamLink {
  url: string;
  expiresAt: number; // unix seconds
  resumeAt?: number; // seconds
}

export type Ratings = Record<string, 1 | -1>;
