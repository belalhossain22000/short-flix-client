export interface Short {
  id: number;
  title: string;
  description?: string;
  videoUrl: string;
  thumbnail?: string;
  tags: string[];
  views?: number;
  likes?: number;
  createdAt?: string;
}

export interface ShortsResponse {
  data: {
    data: Short[];
    meta?: {
      page: number;
      limit: number;
      total: number;
    };
  };
}
