import {Route, useNavigate,Routes} from 'react-router-dom'
import {useContext} from 'react'
import AuthContext from '../context/AuthContext'
const PrivateRoute = ({children,...rest}) =>{
	console.log("Private route works")
	const authenticated = false
	let {user} = useContext(AuthContext)
	return (
		<Routes>
		<Route {...rest}>{!authenticated ? useNavigate('/login') : children}</Route>
		</Routes>
	)
}
export default PrivateRoute;