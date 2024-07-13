import './_style.scss';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Layout } from '../layout/layout';
import { Details } from '../components/details/details';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="pokemon/:id" element={<Details />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
