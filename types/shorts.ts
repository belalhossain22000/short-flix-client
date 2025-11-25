export interface Short {
  success: boolean;
  id: number;
  title: string;

  videoUrl: string;

  tags: string[];
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
