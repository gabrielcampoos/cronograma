import React, { useState } from 'react';
import { Modal, Box, TextField, Button, Typography } from '@mui/material';

interface LoginModalProps {
	open: boolean;
	onClose: () => void;
	onSubmit: (username: string, password: string) => void;
}

const LoginModal = ({ open, onClose, onSubmit }: LoginModalProps) => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const handleLogin = () => {
		// Validação simples do login
		if (username && password) {
			onSubmit(username, password); // Envia as credenciais para o componente pai
		} else {
			alert('Por favor, insira o nome de usuário e a senha.');
		}
	};

	return (
		<Modal open={open} onClose={onClose}>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					padding: 3,
					width: 300,
					margin: 'auto',
					backgroundColor: 'white',
					borderRadius: 2,
					boxShadow: 3,
					position: 'absolute',
					top: '50%',
					left: '50%',
					transform: 'translate(-50%, -50%)', // Centraliza o modal
				}}
			>
				<Typography variant="h6" gutterBottom>
					Login
				</Typography>
				<TextField
					label="Username"
					variant="outlined"
					fullWidth
					value={username}
					onChange={(e) => setUsername(e.target.value)}
					sx={{ mb: 2 }}
				/>
				<TextField
					label="Password"
					type="password"
					variant="outlined"
					fullWidth
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					sx={{ mb: 2 }}
				/>
				<Button
					variant="contained"
					color="primary"
					onClick={handleLogin}
				>
					Entrar
				</Button>
			</Box>
		</Modal>
	);
};

export default LoginModal;
