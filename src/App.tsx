import './App.css'
import { Route, Routes } from 'react-router-dom'
import { Homepage } from './pages/Homepage'
import { Userpage } from './pages/Userpage'

import { Layout } from './pages/Layout'
import ModalWindow from './components/ModalWindow/ModalWindow'

function App() {
	return (
		<>
			<ModalWindow />
			<Routes>
				<Route path='/' element={<Layout />}>
					<Route index element={<Homepage />} />
					<Route path='/users' element={<Userpage />} />
				</Route>
			</Routes>
		</>
	)
}

export default App
