import './App.css'
import { Route, Routes } from 'react-router-dom'
import { Homepage } from './pages/Homepage'
import { Userpage } from './pages/Userpage'
import { Auth } from './components/Auth/Auth'
import { Layout } from './pages/Layout'

function App() {
	return (
		<>
			<Auth></Auth>
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
