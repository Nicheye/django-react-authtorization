import { createContext,useState,useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import {json, useNavigate } from 'react-router-dom'
const AuthContext = createContext()
export default AuthContext;

export const AuthProvider = ({children}) => {
	
	let [authTokens,setauthTokens] = useState(() =>localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null)
	let [user,setUser] = useState(localStorage.getItem('authTokens') ? jwtDecode(localStorage.getItem('authTokens')) : null)

	let [loading,setLoading] = useState(true)
	const history = useNavigate()
	let loginUser = async (e ) =>{
		e.preventDefault()
		console.log('Form submitted')
		let response = await fetch('http://127.0.0.1:8000/api/token/',{
			method:'POST',
			headers:{
				'Content-Type':'application/json'
			},
			body:JSON.stringify({'username':e.target.username.value,'password':e.target.password.value})
		})
		let data = await response.json()
		if (response.status ===200){
			setauthTokens(data)
			setUser(jwtDecode(data.access))
			localStorage.setItem('authTokens',JSON.stringify(data))
			history("/")
		}
		else{
			alert('Something went wrong')
		}
	}
	let logoutUser = ()=>{
		setauthTokens(null)
		setUser(null)
		localStorage.removeItem('authTokens',JSON.stringify(data))
		history("/login")
	}
	let updateToken = async () =>{
		console.log('Update token application')
		let response = await fetch('http://127.0.0.1:8000/api/token/refresh/',{
			method:'POST',
			headers:{
				'Content-Type':'application/json'
			},
			body:JSON.stringify({'refresh':authTokens?.refresh})
		})
		let data = await response.json()

		if (response.status ===200){
			setauthTokens(data)
			setUser(jwtDecode(data.access))
			localStorage.setItem('authTokens',JSON.stringify(data))
		}
		else{
			logoutUser()
		}

		if (loading){
			setLoading(false)
		}
	}
	let contextData = {

		user:user,
		loginUser:loginUser,
		logoutUser:logoutUser
	}
	useEffect(()=> {
		if (loading){
			updateToken()
		}
		let fourMinutes =1000*60*4
		let interval = setInterval(()=>{
			if (authTokens){
				updateToken()
			}
		},fourMinutes)
		return ()=> clearInterval(interval)
	},[authTokens,loading])
	return (
		<AuthContext.Provider value={contextData}>
			{loading ? null: children}
		</AuthContext.Provider>
	)
}