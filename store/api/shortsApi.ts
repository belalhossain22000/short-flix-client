import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import type { Short, ShortsResponse } from "@/types/shorts"

export const shortsApi = createApi({
  reducerPath: "shortsApi",
  baseQuery: fetchBaseQuery({
    // baseUrl: "http://localhost:4000/api",
    // baseUrl: "http://139.59.163.31:4000/api",
    baseUrl: "https://short-flix-server.vercel.app/api",
  }),
  tagTypes: ["Shorts"],
  endpoints: (builder) => ({
    getShorts: builder.query<
      ShortsResponse,
      { page?: number; limit?: number; search?: string; tag?: string }
    >({
      query: ({ page = 1, limit = 20, search = "", tag = "" }) => {
        const params = new URLSearchParams({
          page: String(page),
          limit: String(limit),
          ...(search && { search }),
          ...(tag && { tag }),
        });
        return `/shorts?${params}`;
      },
      providesTags: ["Shorts"],
    }),
    getShortById: builder.query<Short, number>({
      query: (id) => `/shorts/${id}`,
    }),
    addShort: builder.mutation<
      Short,
      { title: string; videoUrl: string; tags: string[] }
    >({
      query: (body) => ({
        url: "/shorts",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Shorts"],
    }),
  }),
});

export const { useGetShortsQuery, useGetShortByIdQuery, useAddShortMutation } = shortsApi
