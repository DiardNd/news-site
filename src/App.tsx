import { Route, Routes } from 'react-router-dom';

import { ModalWindow } from './components/ModalWindow';
import { Homepage } from './pages/Homepage';
import { Layout } from './pages/Layout';
import { NotFoundPage } from './pages/NotFoundPage';
import { UserPage } from './pages/UserPage';

function App() {
  return (
    <>
      <ModalWindow />
      <Routes>
        <Route
          path='/'
          element={<Layout />}>
          <Route
            index
            element={<Homepage />}
          />
          <Route
            path='/users/:id'
            element={<UserPage />}
          />
          <Route
            path='*'
            element={<NotFoundPage />}
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;
