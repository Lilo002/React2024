import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Main } from './pages/main/main.tsx';
import { ControlledForm } from './pages/controlled-form/controlled-form.tsx';
import { UncontrolledForm } from './pages/uncontrolled-form/uncontrolled-form.tsx';
import Layout from './components/layout/layout.tsx';
import { Provider } from 'react-redux';
import { store } from './utils/store/store.ts';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Main />,
      },
      {
        path: 'first',
        element: <ControlledForm />,
      },
      {
        path: 'second',
        element: <UncontrolledForm />,
      },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
