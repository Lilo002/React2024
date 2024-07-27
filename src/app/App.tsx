import './_style.scss';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Layout } from '../layout/layout';
import { Details } from '../components/details/details';
import { ErrorPage } from '../components/404/404';
import { ThemeProvider } from '../components/themeProvider/themeProvider';
import { Provider } from 'react-redux';
import { setupStore } from '../store/store';

export function App() {
  return (
    <Provider store={setupStore()}>
      <ThemeProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route path="pokemon/:id" element={<Details />} />
            </Route>
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </Provider>
  );
}
