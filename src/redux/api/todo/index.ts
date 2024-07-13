import { url } from 'inspector';
import { api as index } from '..';

const api = index.injectEndpoints({
	endpoints: (build) => ({
		getTodos: build.query<TODO.GetResponse, TODO.GetRequest>({
			query: () => ({
				method: 'GET'
			}),
			providesTags: ['todo']
		}),
		postTodo: build.mutation<TODO.PostResponse, TODO.PostRequest>({
			query: (newData) => ({
				method: 'POST',
				body: newData
			}),
			invalidatesTags: ['todo']
		}),
		deleteTodo: build.mutation<TODO.DeleteResponse, TODO.DeleteRequest>({
			query: (id) => ({
				url: `/${id}`,
				method: 'DELETE'
			}),
			invalidatesTags: ['todo']
		})
	})
});
export const { useGetTodosQuery, usePostTodoMutation, useDeleteTodoMutation } =
	api;
