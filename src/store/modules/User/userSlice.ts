import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User, UserState } from '../../types/User';
import serviceApi from '../../../configs/services/api';
import { ResponseLogin } from '../../types/ResponseRequest';
import { AxiosError } from 'axios';

const initialState: UserState = {
	id: '',
	username: '',
	token: '',
	isLogged: false,
	loading: false,
};

export const loginUser = createAsyncThunk(
	'user/login',
	async (login: User, { dispatch }) => {
		try {
			const response = await serviceApi.post('/login', login);

			const responseApi = response.data as ResponseLogin;

			return responseApi;
		} catch (error) {
			if (error instanceof AxiosError) {
				const response = error.response?.data as ResponseLogin;

				return response;
			}

			return {
				success: false,
				message: 'Erro inesperado.',
			};
		}
	},
);

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUser: (state, action) => {
			return {
				...state,
				id: action.payload.id,
				username: action.payload.username,
				token: action.payload.token,
				isLogged: true,
			};
		},

		logoutUser: () => {
			return initialState;
		},
	},

	extraReducers: (builder) => {
		builder.addCase(loginUser.pending, (state) => {
			return {
				...state,
				loading: true,
			};
		});

		builder.addCase(loginUser.fulfilled, (state, action) => {
			const payload = action.payload as ResponseLogin;

			if (payload.success && payload.data) {
				localStorage.setItem('userLogged', payload.data.token);

				return {
					...state,
					id: payload.data.id,
					username: payload.data.username,
					token: payload.data.token,
					isLogged: true,
					loading: false,
				};
			}

			if (!payload.success) {
				return initialState;
			}
		});

		builder.addCase(loginUser.rejected, () => {
			return initialState;
		});
	},
});

export const { setUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;
