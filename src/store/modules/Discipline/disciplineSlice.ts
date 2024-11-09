// disciplineSlice.ts
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import serviceApi from '../../../configs/services/api';
import { Discipline, DisciplineState } from '../../types/Discipline';
import { AxiosError } from 'axios';
import { ResponseDiscipline } from '../../types/ResponseRequest';

const initialState: DisciplineState = {
	data: [],
	loading: false,
	error: null,
};

export const fetchDisciplines = createAsyncThunk(
	'discipline/fetchDisciplines',
	async (_, { rejectWithValue }) => {
		try {
			const response = await serviceApi.get('/discipline');
			const responseApi = response.data as ResponseDiscipline;
			if (responseApi.success) {
				return responseApi.data;
			}
			return rejectWithValue('Failed to load disciplines');
		} catch (error) {
			if (error instanceof AxiosError && error.response) {
				return rejectWithValue(error.response.data.message);
			}
			return rejectWithValue('Unexpected error occurred');
		}
	},
);

export const disciplineSlice = createSlice({
	name: 'discipline',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchDisciplines.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchDisciplines.fulfilled, (state, action) => {
				state.loading = false;
				state.data = action.payload || [];
				state.error = null;
			})
			.addCase(fetchDisciplines.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload as string;
			});
	},
});

export default disciplineSlice.reducer;
