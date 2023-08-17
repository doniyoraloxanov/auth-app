import { USERS_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/auth`,
        method: "POST",
        body: data,
      }),
    }),

    register: builder.mutation({
      query: (data) => {
        console.log("register slice", data);
        return {
          url: `${USERS_URL}`,
          method: "POST",
          body: data,
        };
      },
    }),

    logout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: "POST",
      }),
    }),

    getUsers: builder.query({
      query: () => ({
        url: `${USERS_URL}`,
      }),
      providesTags: ["User"],
      keepUnusedDataFor: 5,
    }),

    getUserById: builder.query({
      query: (userId) => ({
        url: `${USERS_URL}/${userId}`,
      }),
      providesTags: ["User"],
    }),

    deleteUser: builder.mutation({
      query: (userIds) => {
        console.log("userIds", userIds);
        return {
          url: `${USERS_URL}/${userIds}}`,
          method: "DELETE",
          body: userIds,
        };
      },

      providesTags: ["User"],
    }),

    blockUser: builder.mutation({
      query: (userIds) => {
        console.log("Block", userIds);
        return {
          url: `${USERS_URL}/${userIds}`,
          method: "PUT",
          body: userIds,
        };
      },
      invalidatesTags: ["User"],
    }),

    unblockUser: builder.mutation({
      query: (userIds) => {
        console.log("Unblock", userIds);
        return {
          url: `${USERS_URL}/${userIds}`,
          method: "PATCH",
          body: userIds,
        };
      },
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useGetUsersQuery,
  useGetUserByIdQuery,
  useDeleteUserMutation,
  useBlockUserMutation,
  useUnblockUserMutation,
} = usersApiSlice;
