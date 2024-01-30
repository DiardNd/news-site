import './App.css'
import { Route, Routes } from 'react-router-dom'
import { Homepage } from './pages/Homepage'
import { Header } from './components/Header/Header'

function App() {
	return (
		<>
			<Header></Header>
			<Routes>
				<Route index element={<Homepage />} />
			</Routes>
		</>
	)
}

export default App
