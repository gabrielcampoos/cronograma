import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Time, TimeState } from '../../types/Time';
import serviceApi from '../../../configs/services/api';
import { ResponseTime } from '../../types/ResponseRequest';
import { AxiosError } from 'axios';
import { RootState } from '../..';

const initialState: TimeState = {
	times: [], // Array para armazenar os tempos
	loading: false,
};

export const fetchTimes = createAsyncThunk(
	'time/fetchAll',
	async (_, { dispatch }) => {
		try {
			const response = await serviceApi.get('/time');
			const responseApi = response.data as ResponseTime;
			return responseApi;
		} catch (error) {
			if (error instanceof AxiosError) {
				const response = error.response?.data as ResponseTime;
				return response;
			}

			return {
				success: false,
				message: 'Erro inesperado.',
			};
		}
	},
);

export const updateTime = createAsyncThunk(
	'time/update',
	async (
		{
			id,
			number,
			startTime,
			endTime,
		}: { id: string; number: number; startTime: string; endTime: string },
		{ rejectWithValue, getState },
	) => {
		try {
			const headers = {
				'Content-Type': 'application/json',
				token: localStorage.getItem('userLogged'),
			};

			// Envia a requisição PUT com o token no cabeçalho
			const response = await serviceApi.put(
				`/time/${id}`,
				{
					number,
					startTime,
					endTime,
				},
				{
					headers,
				},
			);

			return response.data;
		} catch (error) {
			if (error instanceof AxiosError) {
				return rejectWithValue(error.response?.data);
			}
			return rejectWithValue({ message: 'Erro inesperado.' });
		}
	},
);

export const timeSlice = createSlice({
	name: 'time',
	initialState,
	reducers: {
		resetTimes: () => {
			return initialState;
		},
	},

	extraReducers: (builder) => {
		builder.addCase(fetchTimes.pending, (state) => {
			state.loading = true;
		});

		builder.addCase(fetchTimes.fulfilled, (state, action) => {
			const payload = action.payload as ResponseTime;

			if (payload.success && payload.data) {
				return {
					...state,
					times: payload.data, // Armazena a lista de tempos no estado
					loading: false,
				};
			}

			if (!payload.success) {
				return initialState;
			}
		});

		builder.addCase(fetchTimes.rejected, () => {
			return initialState;
		});

		// Caso de sucesso para a atualização de tempo
		builder.addCase(updateTime.fulfilled, (state, action) => {
			const updatedTime = action.payload as Time; // O payload de resposta da API
			const index = state.times.findIndex(
				(time) => time.id === updatedTime.id,
			);
			if (index !== -1) {
				state.times[index] = updatedTime; // Substitui o tempo atualizado no estado
			}
		});

		// Caso de erro para a atualização de tempo
		builder.addCase(updateTime.rejected, (state, action) => {
			console.error('Erro ao atualizar tempo:', action.payload);
		});
	},
});

export const { resetTimes } = timeSlice.actions;
export default timeSlice.reducer;
