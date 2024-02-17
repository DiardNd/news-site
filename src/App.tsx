import { Route, Routes } from 'react-router-dom';

import { ModalWindow } from './components/ModalWindow';
import { Homepage } from './pages/Homepage';
import { Layout } from './pages/Layout';
import { NotFoundPage } from './pages/NotFoundPage';
import { Postpage } from './pages/Postpage';
import { Userpage } from './pages/Userpage';

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
            path='/posts/:id'
            element={<Postpage />}
          />
          <Route
            path='/users/:id'
            element={<Userpage />}
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
