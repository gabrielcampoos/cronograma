import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { Icon, IconButton } from '@mui/material';
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
	order: string;
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
				p: 2,
			}}
		>
			<Paper
				elevation={3}
				sx={{
					width: 300,
					height: 400,
					p: 3,
					borderRadius: 2,
					textAlign: 'center',
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'space-between',
				}}
			>
				<Typography
					component="h2"
					variant="h6"
					sx={{ fontWeight: 700, mb: 1, color: '#3f51b5' }}
				>
					{dayOfWeek}
				</Typography>

				{/* Circle with number */}
				<Box
					sx={{
						width: 90,
						height: 90,
						borderRadius: '50%',
						border: '2px solid #3f51b5',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						color: '#3f51b5',
						fontSize: '2rem',
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
						fontWeight: 500,
						mt: 1,
						fontSize: '1rem',
					}}
				>
					{/* Exibe os tempos como "startTime° a endTime° Tempo" */}
					{`${startTime}° a ${endTime}° Tempo`}
				</Typography>

				{/* Instructor and rank */}
				<Box
					sx={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						mb: 1,
					}}
				>
					<Icon
						sx={{
							mr: 0.5,
							color: '#3f51b5',
						}}
					>
						<PersonIcon />
					</Icon>
					<Typography variant="body2">
						<span
							style={{
								backgroundColor: 'rgba(127, 255, 67, 0.2)',
								border: 'solid 1px green',
								padding: 3,
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
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						mb: 1,
					}}
				>
					<Icon
						sx={{
							mr: 0.5,
							color: '#3f51b5',
						}}
					>
						<LocalLibraryIcon />
					</Icon>
					<Typography variant="body2" sx={{ fontWeight: 'bold' }}>
						{discipline}
					</Typography>
				</Box>

				{/* Date */}
				<Box
					sx={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						mt: 1,
					}}
				>
					<CalendarTodayIcon
						sx={{
							color: 'gray',
							fontSize: '1rem',
							mr: 0.5,
						}}
					/>
					<Typography variant="body2" color="text.secondary">
						{formattedDate}
					</Typography>
				</Box>
			</Paper>
		</Box>
	);
}
