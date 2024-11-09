import React from 'react';
import { Grid } from '@mui/material';
import Slider from 'react-slick'; // Certifique-se de que 'react-slick' está instalado
import SimpleCard from '../Card';

// Adicionando as configurações do Slider
const sliderSettings = {
	dots: true, // Adiciona indicadores de navegação
	infinite: false, // Não vai rodar infinitamente
	speed: 500,
	slidesToShow: 1, // Exibe um card por vez
	slidesToScroll: 1, // Move um card por vez
	initialSlide: 0, // Inicia no primeiro card
	centerMode: true, // Centraliza o card visível
	centerPadding: '0', // Remove o padding em torno do card
	focusOnSelect: true, // Permite selecionar o card ao clicar
	responsive: [
		{
			breakpoint: 1024,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1,
			},
		},
		{
			breakpoint: 600,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1,
			},
		},
	],
};

interface Card {
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

interface SimpleCardSliderProps {
	cards: Card[];
}

const SimpleCardSlider: React.FC<SimpleCardSliderProps> = ({ cards }) => {
	return (
		<Grid item xs={12} sm={12} md={12}>
			{/* Renderiza o Slider/carrossel */}
			<Slider {...sliderSettings}>
				{cards.map((card, index) => (
					<div
						key={index}
						style={{ display: 'flex', justifyContent: 'center' }}
					>
						<SimpleCard
							startTime={card.startTime}
							endTime={card.endTime}
							date={card.date}
							instructor={card.instructor}
							patent={card.patent}
							discipline={card.discipline}
							foundStartTimeValue={card.foundStartTimeValue}
							foundEndTimeValue={card.foundEndTimeValue}
							order={card.order}
						/>
					</div>
				))}
			</Slider>
		</Grid>
	);
};

export default SimpleCardSlider;
