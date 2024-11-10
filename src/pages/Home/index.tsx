import React, { useState, useEffect } from 'react';
import {
	Box,
	Button,
	FormControl,
	Grid,
	IconButton,
	InputLabel,
	MenuItem,
	Select,
	SelectChangeEvent,
	Typography,
} from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Slider from 'react-slick'; // Certifique-se de importar o Slider corretamente
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
	hideModal,
	showModal,
} from '../../store/modules/ModalContext/modalContextSlice';
import { Modal } from './components/Modal';
import { fetchTimes } from '../../store/modules/Time/timeSlice';
import { fetchDisciplines } from '../../store/modules/Discipline/disciplineSlice';
import SimpleCard from './components/Card';
import DeleteIcon from '@mui/icons-material/Delete';
import LoginModal from './components/LoginModal';
import { loginUser } from '../../store/modules/User/userSlice';
import SimpleCardSlider from './components/SimpleCardSlider';

// Defina as configurações do Slider (carrossel)
const sliderSettings = {
	dots: true,
	infinite: false,
	speed: 500,
	slidesToShow: 1,
	slidesToScroll: 1,
	initialSlide: 0,
};

type CardData = {
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
};

const Home = () => {
	const [selectedButton, setSelectedButton] = useState<string | null>(
		'infos',
	);
	const [cards, setCards] = useState<CardData[]>([]);
	const [loginModalOpen, setLoginModalOpen] = useState(false); // Estado para controlar a visibilidade do modal de login
	const [actionType, setActionType] = useState<'add' | 'delete' | null>(null); // Tipo da ação (adicionar ou excluir)
	const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
	const [showCreateModal, setShowCreateModal] = useState(false);
	const { context, isOpen } = useAppSelector((state) => state.context);
	const [selectedPelotao, setSelectedPelotao] = useState(1);

	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(fetchTimes());
		dispatch(fetchDisciplines());

		// Recupera os cards do LocalStorage ao carregar a página
		const savedCards = localStorage.getItem('cards');
		if (savedCards) {
			setCards(JSON.parse(savedCards));
		}
		const loggedIn = localStorage.getItem('isLoggedIn');
		if (loggedIn) {
			setIsLoggedIn(true);
		}
	}, [dispatch]);

	useEffect(() => {
		// Sempre que o estado dos cards mudar, salva no LocalStorage
		if (cards.length > 0) {
			localStorage.setItem('cards', JSON.stringify(cards));
		}
	}, [cards]);

	const handleButtonClick = (buttonName: string) => {
		setSelectedButton(buttonName);
	};

	const handleSave = (data: CardData) => {
		setCards((prevCards) => [...prevCards, data]);
	};

	// Função para limpar os cards
	const clear = () => {
		if (isLoggedIn) {
			setCards([]); // Limpa todos os cards
			localStorage.removeItem('cards'); // Remove os cards do LocalStorage
		} else {
			setActionType('delete');
			setLoginModalOpen(true); // Abre o modal de login para confirmação
		}
	};

	// Função para adicionar novo card
	const addCard = () => {
		if (isLoggedIn) {
			setLoginModalOpen(false); // Não abre o modal de login se já estiver logado
			dispatch(showModal('create')); // Agora abre o modal de criação após o login
		} else {
			setActionType('add');
			setLoginModalOpen(true); // Abre o modal de login para confirmação
		}
	};

	const handleLoginSubmit = (username: string, password: string) => {
		// Dispara a ação loginUser passando as credenciais
		dispatch(loginUser({ username, password }))
			.unwrap()
			.then((response) => {
				console.log('Resposta do login:', response); // Adicione este log para verificar a resposta
				if (response.success && response.data) {
					setIsLoggedIn(true); // Marca o login como realizado
					localStorage.setItem('isLoggedIn', 'true'); // Salva o status de login no localStorage

					// Abre o modal de criação após login bem-sucedido
					if (actionType === 'add') {
						setLoginModalOpen(false);
						setShowCreateModal(true);
					} else if (actionType === 'delete') {
						clear(); // Executa a exclusão dos cards após login
						alert('Ação permitida! Excluindo os cards.');
					}
				} else {
					console.log('Credenciais incorretas ou falha na resposta');
					alert('Credenciais incorretas.');
				}
			})
			.catch((error) => {
				console.log('Erro ao realizar login:', error); // Adicione este log para verificar o erro
				alert('Erro ao realizar login: ' + error.message);
			});
	};

	const groupCardsByDateAndPelotao = (cards: CardData[], pelotao: number) => {
		const filteredCards = cards.filter((card) => card.pelotao === pelotao); // Filtra pelos cards do pelotão selecionado

		const grouped = filteredCards.reduce<{ [key: string]: CardData[] }>(
			(acc, card) => {
				const date = card.date;
				if (!acc[date]) {
					acc[date] = [];
				}
				acc[date].push(card);
				return acc;
			},
			{},
		);

		// Adiciona a ordem aos cards
		Object.keys(grouped).forEach((date) => {
			grouped[date].forEach((card, index) => {
				card.order = `${index + 1}º`;
			});
		});

		return grouped;
	};

	// Filtra e agrupa os cards de acordo com o pelotão selecionado
	const groupedCards = groupCardsByDateAndPelotao(cards, selectedPelotao);

	const handleOptionChange = (event: SelectChangeEvent<number>) => {
		setSelectedPelotao(event.target.value as number);
	};

	return (
		<>
			<Box
				sx={{
					width: '100%',
					height: '100vh',
					display: 'flex',
					flexDirection: 'column',
					p: 2,
				}}
			>
				<Grid
					container
					spacing={{ xs: 2, sm: 2, md: 2 }}
					columns={{ xs: 12, sm: 12, md: 12 }}
				>
					<Grid item xs={12} sm={12} md={12}>
						<Typography
							component="h1"
							variant="h4"
							sx={{ fontWeight: 700 }}
						>
							Aulas da semana
						</Typography>
					</Grid>

					<Grid item xs={12} sm={12} md={12}>
						<Typography
							component="h1"
							variant="subtitle1"
							color="GrayText"
							sx={{ fontWeight: 700 }}
						>
							Cronograma
						</Typography>
					</Grid>

					<Grid item xs={12} sm={12} md={12}>
						<Box
							sx={{
								width: '100%',
								display: 'flex',
								justifyContent: 'space-around',
								alignItems: 'center',
							}}
						>
							<Button
								variant="contained"
								sx={{
									flex: 1,
									backgroundColor:
										selectedButton === 'infos'
											? 'black'
											: 'white',
									color:
										selectedButton === 'infos'
											? 'white'
											: 'black',
									'&:hover': {
										backgroundColor:
											selectedButton === 'infos'
												? 'black'
												: 'grey',
									},
								}}
								onClick={() => handleButtonClick('infos')}
							>
								Infos
							</Button>

							<Button
								variant="contained"
								sx={{
									flex: 1,
									backgroundColor:
										selectedButton === 'download'
											? 'black'
											: 'white',
									color:
										selectedButton === 'download'
											? 'white'
											: 'black',
									'&:hover': {
										backgroundColor:
											selectedButton === 'download'
												? 'black'
												: 'grey',
									},
								}}
								onClick={() => handleButtonClick('download')}
							>
								Download
							</Button>

							<Button
								variant="contained"
								sx={{
									flex: 1,
									backgroundColor:
										selectedButton === 'utilitarios'
											? 'black'
											: 'white',
									color:
										selectedButton === 'utilitarios'
											? 'white'
											: 'black',
									'&:hover': {
										backgroundColor:
											selectedButton === 'utilitarios'
												? 'black'
												: 'grey',
									},
								}}
								onClick={() => handleButtonClick('utilitarios')}
							>
								Utilitários
							</Button>
						</Box>
					</Grid>

					<Grid item xs={12} sm={12} md={12}>
						<Button variant="contained" fullWidth>
							Atualizações
						</Button>
					</Grid>

					<Grid item xs={12} sm={12} md={12}>
						<Button
							variant="contained"
							fullWidth
							size="large"
							sx={{
								background: '#000',
								color: '#fff',
							}}
						>
							Calendário de Provas
						</Button>
					</Grid>

					<Grid
						item
						xs={12}
						sm={12}
						md={12}
						sx={{
							display: 'flex',
							justifyContent: 'space-between', // Distribui os itens entre a esquerda e a direita
							alignItems: 'center', // Alinha os itens verticalmente no centro
						}}
					>
						{/* Botão de Adicionar à esquerda */}
						<Box sx={{ display: 'flex', alignItems: 'center' }}>
							<IconButton
								sx={{ alignSelf: 'flex-start' }}
								onClick={() => addCard()}
							>
								<AddCircleOutlineIcon
									fontSize="large"
									sx={{
										color: '#000',
									}}
								/>
							</IconButton>

							{/* Botão de Excluir à esquerda */}
							<IconButton
								onClick={() => clear()}
								sx={{
									ml: 2,
								}}
							>
								<DeleteIcon fontSize="large" color="error" />
							</IconButton>
						</Box>

						<FormControl sx={{ width: 150, height: 40 }}>
							<Select
								value={selectedPelotao}
								onChange={handleOptionChange}
								label="Pelotão"
								sx={{
									backgroundColor: 'black', // Fundo preto
									color: 'white', // Texto branco
									height: 40,
									'& .MuiSelect-icon': {
										color: 'white', // Cor do ícone
									},
									'& .MuiOutlinedInput-root': {
										'& fieldset': {
											borderColor: 'white', // Cor da borda
										},
										'&:hover fieldset': {
											borderColor: 'white', // Cor da borda ao passar o mouse
										},
									},
									'& .MuiMenuItem-root': {
										backgroundColor: 'black', // Fundo preto para as opções
										color: 'white', // Texto branco nas opções
										'&:hover': {
											backgroundColor: 'white', // Fundo branco ao passar o mouse
											color: 'black', // Texto preto ao passar o mouse
										},
									},
								}}
							>
								{Array.from({ length: 8 }, (_, index) => (
									<MenuItem key={index} value={index + 1}>
										{index + 1}º Pelotão
									</MenuItem>
								))}
							</Select>
						</FormControl>
					</Grid>

					<Grid item xs={12} sm={12} md={12}>
						{Object.keys(groupedCards).map((date) => (
							<Box
								key={date}
								sx={{
									mt: 3,
									width: '100%',
									display: 'flex',
									flexDirection: 'column',
									alignItems: 'center',
								}}
							>
								{/* Usando o SimpleCardSlider para renderizar os cards */}
								<SimpleCardSlider cards={groupedCards[date]} />
							</Box>
						))}
					</Grid>
				</Grid>
			</Box>

			{/* Modal de criação de card */}
			<Modal
				onSave={handleSave}
				open={isOpen && context === 'create'} // Verifica se o modal de criação deve ser aberto
				onClose={() => dispatch(hideModal())}
				pelotao={selectedPelotao}
			/>

			{/* Modal de login */}
			<LoginModal
				open={loginModalOpen}
				onClose={() => setLoginModalOpen(false)}
				onSubmit={handleLoginSubmit}
			/>
		</>
	);
};

export default Home;
