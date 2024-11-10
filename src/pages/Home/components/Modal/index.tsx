import {
	Box,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	TextField,
} from '@mui/material';
import { useState } from 'react';
import { enqueueSnackbar } from 'notistack';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import { hideModal } from '../../../../store/modules/ModalContext/modalContextSlice';

type CardData = {
	startTime: number;
	endTime: number;
	date: string;
	instructor: string;
	patent: string;
	discipline: string;
	foundStartTimeValue: string;
	foundEndTimeValue: string;
	pelotao: number;
};

interface ModalProps {
	open: boolean;
	onClose: () => void;
	onSave: (data: CardData) => void;
	pelotao: number;
}

export const Modal = ({ onSave, onClose, open, pelotao }: ModalProps) => {
	const [date, setDate] = useState('');
	const [startTime, setStartTime] = useState('');
	const [endTime, setEndTime] = useState('');
	const [name, setName] = useState('');
	const [instructor, setInstructor] = useState('');
	const [foundStartTimeValue, setFoundStartTimeValue] = useState('');
	const [foundEndTimeValue, setFoundEndTimeValue] = useState('');

	const dispatch = useAppDispatch();
	const { context, isOpen } = useAppSelector((state) => state.context);
	const loggedUser = useAppSelector((state) => state.user);
	const times = useAppSelector((state) => state.time.times);
	const disciplines = useAppSelector((state) => state.discipline.data);

	const closeModal = () => {
		dispatch(hideModal());
	};

	const handleSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
		ev.preventDefault();

		const startTimeNumber = Number(startTime);
		const endTimeNumber = Number(endTime);

		if (isNaN(startTimeNumber)) {
			enqueueSnackbar(
				'Por favor, insira um número válido para o primeiro tempo.',
				{ variant: 'error' },
			);
			return;
		}

		const foundStartTime = times.find(
			(time) => time.number === startTimeNumber,
		);
		const foundEndTime = times.find(
			(time) => time.number === endTimeNumber,
		);

		if (foundStartTime && foundEndTime) {
			enqueueSnackbar(
				`Tempo encontrado: ${foundStartTime.number} - ${foundStartTime.startTime} - ${foundEndTime.endTime}`,
				{ variant: 'success' },
			);

			setFoundStartTimeValue(foundStartTime.startTime);
			setFoundEndTimeValue(foundEndTime.endTime);
		} else {
			enqueueSnackbar('Tempo não encontrado para o número informado.', {
				variant: 'error',
			});
		}

		const foundDiscipline = disciplines.find(
			(discipline) => discipline.instructor === instructor,
		);

		if (foundDiscipline) {
			const { name, instructor, patent } = foundDiscipline;
			enqueueSnackbar(
				`Disciplina encontrada: Nome - ${name}, Instrutor - ${instructor}, Patente - ${patent}`,
				{ variant: 'success' },
			);

			// Passa a disciplina corretamente
			const newCardData: CardData = {
				date,
				startTime: Number(startTime),
				endTime: Number(endTime),
				instructor: instructor,
				patent: patent,
				discipline: name, // Passa o name da disciplina encontrado
				foundStartTimeValue: foundStartTime!.startTime,
				foundEndTimeValue: foundEndTime!.endTime,
				pelotao,
			};

			onSave(newCardData); // Call onSave with new card data
			onClose();
		} else {
			enqueueSnackbar(
				'Disciplina não encontrada para o instrutor informado.',
				{ variant: 'error' },
			);
		}

		// Limpar campos
		setName('');
		setStartTime('');
		setEndTime('');
		setDate('');
		closeModal();
	};

	return (
		<Dialog open={isOpen}>
			<Box component={'form'} onSubmit={handleSubmit}>
				{context !== 'delete' && (
					<>
						<DialogTitle>
							{context === 'create' && 'Criar aula'}
							{context === 'edit' && 'Editar aula'}
						</DialogTitle>

						<DialogContent>
							<TextField
								autoFocus
								margin="dense"
								name="date"
								id="date"
								label="Data"
								type="date"
								fullWidth
								variant="filled"
								onChange={(ev) => setDate(ev.target.value)}
								value={date}
								InputLabelProps={{
									shrink: true,
								}}
							/>

							<TextField
								margin="dense"
								name="startTime"
								id="startTime"
								label="Primeiro Tempo"
								type="text"
								fullWidth
								variant="filled"
								onChange={(ev) => setStartTime(ev.target.value)}
								value={startTime}
							/>
							<TextField
								margin="dense"
								id="endTime"
								name="endTime"
								label="Último Tempo"
								type="text"
								fullWidth
								variant="filled"
								onChange={(ev) => setEndTime(ev.target.value)}
								value={endTime}
							/>

							<TextField
								margin="dense"
								id="name"
								name="name"
								label="Instrutor"
								type="text"
								fullWidth
								variant="filled"
								onChange={(ev) =>
									setInstructor(ev.target.value)
								}
								value={instructor}
							/>
						</DialogContent>
						<DialogActions>
							<Button
								type="button"
								variant="outlined"
								onClick={closeModal}
							>
								Cancelar
							</Button>
							<Button
								type="submit"
								color="success"
								variant="contained"
							>
								Salvar
							</Button>
						</DialogActions>
					</>
				)}
			</Box>
		</Dialog>
	);
};
