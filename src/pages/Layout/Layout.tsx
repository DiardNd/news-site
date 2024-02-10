import { Outlet } from 'react-router-dom'
import { Header } from '../../components/Header/Header'

export const Layout = (): JSX.Element => {
	return (
		<>
			<Header />
			<Outlet />
			<footer>{new Date().getFullYear()}</footer>
		</>
	)
}
