import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  IApiResponse,
  IPizzaUpdate,
  IProductData,
} from "../core/interface/api.interface";

/**
 * Holds all the API callbacks
 * @returns RTK Implementation for backend
 */

export const posApi = createApi({
  reducerPath: "posApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/products",
    prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  tagTypes: ["Product"],
  endpoints: (builder) => ({
    getAllProduct: builder.query<IApiResponse, void>({
      query: (request) => {
        return {
          url: "/",
          method: "GET",
        };
      },
      providesTags: ["Product"],
      keepUnusedDataFor: 0,
    }),

    saveProduct: builder.mutation<IApiResponse, Object>({
      query: (request) => {
        return {
          url: "/add",
          method: "POST",
          body: JSON.stringify(request),
        };
      },
      invalidatesTags: ["Product"],
    }),
    deleteProduct: builder.mutation<IApiResponse, string>({
      query: (Id) => {
        return {
          url: `/${Id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["Product"],
    }),

    updateProduct: builder.mutation<
      IApiResponse,
      { id: string; data: IPizzaUpdate }
    >({
      query: ({ id, data }) => {
        return {
          url: `/${id}`,
          method: "PUT",
          body: JSON.stringify(data),
        };
      },
      invalidatesTags: ["Product"],
    }),
  }),
});

export const {
  useGetAllProductQuery,
  useSaveProductMutation,
  useDeleteProductMutation,
  useUpdateProductMutation,
} = posApi;
