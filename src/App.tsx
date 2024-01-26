import './App.css'
import { Auth } from './components/Auth/Auth'
import { Route, Routes, Link } from 'react-router-dom'
import { Homepage } from './pages/Homepage'

function App(): JSX.Element {
	return (
		<>
			{/* <Auth></Auth> */}

			{/* <Front></Front> */}
			<Routes>
				<Route index element={<Homepage />} />
			</Routes>
		</>
	)
}

export default App
