import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { Divider, Icon, IconButton } from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PersonIcon from '@mui/icons-material/Person';
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import EditIcon from '@mui/icons-material/Edit';

interface SimpleCardProps {
	startTime: number;
	endTime: number;
	date: string;
	instructor: string;
	patent: string;
	discipline: string;
	foundStartTimeValue: string;
	foundEndTimeValue: string;
	order?: string;
	pelotao: number;
}

export default function SimpleCard({
	startTime,
	endTime,
	date,
	instructor,
	patent,
	discipline,
	foundStartTimeValue,
	foundEndTimeValue,
	order,
}: SimpleCardProps) {
	// Criar objeto de data
	const dateObj = new Date(date);

	// Adicionar 1 dia à data
	dateObj.setDate(dateObj.getDate() + 1);

	// Formatar a data para o formato dd/mm/aaaa
	const formattedDate = dateObj.toLocaleDateString('pt-BR');

	// Obter o dia da semana
	const dayOfWeek = dateObj.toLocaleDateString('pt-BR', {
		weekday: 'long',
	});

	return (
		<Box
			sx={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				flexDirection: 'column',
				p: 2,
			}}
		>
			<Typography
				component="h2"
				variant="h5"
				sx={{ fontWeight: 600, mb: 3, color: '#000' }}
			>
				{dayOfWeek}
			</Typography>

			<Paper
				elevation={3}
				sx={{
					width: 280,
					height: 400,
					p: 2,
					borderRadius: 8,
					textAlign: 'center',
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'space-between',
				}}
			>
				{/* Circle with number */}
				<Box
					sx={{
						width: 130,
						height: 130,
						borderRadius: '50%',
						border: '5px solid #0071e3',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						color: '#0071e3',
						fontSize: '4rem',
						fontWeight: 'bold',
					}}
				>
					{`${order}`}
				</Box>

				{/* Time range */}
				<Typography
					component="h1"
					variant="h5"
					sx={{ fontWeight: 700 }}
				>
					{`${foundStartTimeValue} às ${foundEndTimeValue}`}
				</Typography>

				<Typography
					variant="h6"
					sx={{
						fontSize: '0.9rem',
						color: '#0071e3',
						marginTop: -5,
					}}
				>
					{/* Exibe os tempos como "startTime° a endTime° Tempo" */}
					{`${startTime}° a ${endTime}° Tempo`}
				</Typography>

				<Divider
					sx={{
						width: '80%',
						borderWidth: '1px',
						mt: -3,
					}}
				/>

				{/* Instructor and rank */}
				<Box
					sx={{
						width: '80%',
						mt: -2,
					}}
				>
					<Box
						sx={{
							width: '100%',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'flex-start',
							mb: 1,
							gap: 1,
						}}
					>
						<lord-icon
							src="https://cdn.lordicon.com/kthelypq.json"
							trigger="loop"
							delay="2000"
							style={{ width: '30px', height: '30px' }}
						></lord-icon>

						<Typography
							variant="body2"
							sx={{
								fontWeight: 500,
								color: '#828d9c',
								fontSize: '0.9rem',
							}}
						>
							<span
								style={{
									backgroundColor: 'rgba(127, 255, 67, 0.2)',
									border: 'solid 1px green',
									padding: 1,
									borderRadius: '5px',
									color: '#000',
									fontWeight: 700,
								}}
							>
								{patent}
							</span>{' '}
							{instructor}
						</Typography>
					</Box>

					{/* Subject */}
					<Box
						sx={{
							width: '100%',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'flex-start',
							mb: 1,
							gap: 1,
						}}
					>
						<lord-icon
							src="https://cdn.lordicon.com/zyzoecaw.json"
							trigger="loop"
							delay="6000"
							state="morph-book"
							style={{ width: '30px', height: '30px' }}
						></lord-icon>

						<Typography
							variant="body2"
							sx={{
								fontWeight: 500,
								color: '#828d9c',
								fontSize: '0.9rem',
							}}
						>
							{discipline}
						</Typography>
					</Box>

					{/* Date */}
					<Box
						sx={{
							width: '100%',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'flex-start',
							mt: 1,
							gap: 1,
						}}
					>
						<lord-icon
							src="https://cdn.lordicon.com/abfverha.json"
							trigger="loop"
							delay="7000"
							state="morph-calendar"
							style={{ width: '30px', height: '30px' }}
						></lord-icon>

						<Typography
							variant="body2"
							sx={{
								fontWeight: 500,
								color: '#828d9c',
								fontSize: '0.9rem',
							}}
						>
							{formattedDate}
						</Typography>
					</Box>
				</Box>
			</Paper>
		</Box>
	);
}
