import './_style.scss';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Layout } from '../layout/layout';
import { Details } from '../components/details/details';
import { ErrorPage } from '../components/404/404';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="pokemon/:id" element={<Details />} />
        </Route>
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
}

export default App;
