import { Provider } from 'react-redux';
import { ThemeProvider, createTheme } from '@mui/material';
import { store } from './store/store';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Navigation } from './routes/Navigation';

function App() {
  const theme = createTheme();

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Navigation />
      </ThemeProvider>
    </Provider>
  );
}

export default App;

// ramita
