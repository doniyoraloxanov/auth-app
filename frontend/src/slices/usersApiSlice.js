/* eslint-disable no-undef */
import { USERS_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        //**********  LOGIN   ***********/
        login: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/auth`,
                method: "POST",
                body: data,
            }),
        }),

        //**********  REGISTER   ***********/
        register: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}`,
                method: "POST",
                body: data,
            }),
        }),

        //**********  LOGOUT   ***********/
        logout: builder.mutation({
            query: () => ({
                url: `${USERS_URL}/logout`,
                method: "POST",
            }),
        }),

        //**********  GET ALL USERS   ***********/
        getUsers: builder.query({
            query: () => ({
                url: `${USERS_URL}`,
            }),
            providesTags: ["User"],
            keepUnusedDataFor: 5,
        }),

        // //**********  GET USER BY ID   ***********/
        getUserById: builder.query({
            query: (userId) => ({
                url: `${USERS_URL}/${userId}`,
            }),
            providesTags: ["User"],
        }),

        //**********  DELETE USER   ***********/
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

        //**********  BLOCK USER   ***********/
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

        //**********  UNBLOCK USER   ***********/
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
