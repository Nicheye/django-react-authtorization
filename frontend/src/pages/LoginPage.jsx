import React,{useContext} from 'react'
import AuthContext from '../context/AuthContext';

const LoginPage = () => {
  let {loginUser} = useContext(AuthContext)
  return (
	<div>
		<form action="" onSubmit={loginUser}>
			<input type="text" name='username' placeholder='Enter Username' />
			<input type="password" name='password' placeholder='Enter password' />
			<button type='submit'>send</button>
		</form>
	</div>
  )
}

export default LoginPage; 