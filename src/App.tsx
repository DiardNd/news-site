import './App.css';
import { Route, Routes } from 'react-router-dom';

import { Homepage } from './pages/Homepage/Homepage';
import { Userpage } from './pages/Userpage/Userpage';
import { Layout } from './pages/Layout/Layout';
import { NotFoundPage } from './pages/NotFoundPage/NotFoundPage';
import { Postpage } from './pages/Postpage/Postpage';
import ModalWindow from './components/ModalWindow/ModalWindow';

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
						path='/users'
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
