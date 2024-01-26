import './App.css'
import { Auth } from './components/Auth/Auth'
import { Front } from './components/Front/Front'
import { Route, Routes, Link } from 'react-router-dom'
import { Homepage } from './pages/Homepage'

function App() {
	return (
		<>
			<Auth></Auth>
			{/* <Front></Front> */}
			<Routes>
				<Route path='/' element={<Homepage />} />
			</Routes>
		</>
	)
}

export default App
