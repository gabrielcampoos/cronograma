import CssBaseline from '@mui/material/CssBaseline';
import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import { Provider } from 'react-redux';
import { store } from './store';
import { SnackbarProvider } from 'notistack';
import { createTheme, ThemeProvider } from '@mui/material';

const theme = createTheme({
	typography: {
		fontFamily: ' Inter Tight, sans-serif',
	},
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<Provider store={store}>
			<CssBaseline />
			<ThemeProvider theme={theme}>
				<SnackbarProvider>
					<App />
				</SnackbarProvider>
			</ThemeProvider>
		</Provider>
	</React.StrictMode>,
);
