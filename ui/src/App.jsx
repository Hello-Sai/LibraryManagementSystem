import './App.css';
import Books from './components/Books';
import Navbar from './components/Navbar';
import Login from './pages/Login'
import {BrowserRouter as Router,Routes,Route,Link} from 'react-router-dom'
import Register from './pages/Register';
import { useEffect, useState } from 'react';
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import AddBook from './components/AddBook'
axios.defaults.withCredentials = true
function App() {
  const API = axios.create({
    baseURL:"http://127.0.0.1:8000/",
  })
  const [books,setBooks]=useState([
    {
      title:"",
      description:"",
      category:"",
    }
  ])
  const [render,setRender] = useState(false)
  
 
  const [msg,setMsg] = useState("")
  const [user,setUser] = useState({ 
      
      user:(localStorage.getItem("user"))?(() =>localStorage.getItem("user")):null,
      token:(localStorage.getItem("access"))?(() =>localStorage.getItem("access")):null,
      authenticated:localStorage.getItem("user")?true:false,
      books:[]
    }
  )
  const createBook = (data) =>{
    API.post("accounts/books/",{user:localStorage.getItem("user"),description:data.desc,title:data.title,category:data.category},{headers:{
      'Authorization':'Bearer '+ localStorage.getItem("access")
    }})
    .then(res =>{
      setBooks([...books,res.data])      
    })
    .catch(err =>{console.log(err)
      if(err.response.status ==400)
        alert("please provide valid data")
      else if(err.response.status==401){
        logout()
        alert("Your session has Expired")
      }
      else
        alert("some error occurred please try again")
    })
  }
  useEffect(() =>{
    if(user.authenticated)
    {   
      const getBooks = () =>{
    
        API.get("accounts/books/",{
          headers:{
            'Authorization':'Bearer '+ localStorage.getItem("access")
          }})
        .then(res =>{
          alert(JSON.stringify(...res.data))
        })
        .catch(error =>{
            if(error.response?.status == 401)
            {  
              document.getElementById("msg").innerHTML="<h1 style={'text-align':'center','color':'red'}>User Must be Login inorder to access books</h1>";
              logout()
            }
            else
              document.getElementById("msg").innerHTML="<h1 style={'text-align':'center'}>Please Check Your Internet Connection</h1>";  
        })
      }
      const fetchBooks =getBooks()
      setRender(true)
      console.log("fetching is : "+JSON.stringify(fetchBooks))
    }
    else
    { 
      alert("please Login to Access books")
    }
  },[user.authenticated,books])

  const signUp = (data) => {
      API.post("accounts/register",{...data})
      .then((res) => {
        if(res.data.status ==200)
        {  
          setUser(res.data.user,res.data.access,...user)
          alert("Successfully registered")
        }
        else
        {  
          setMsg(res.data)
        }
      })
      .catch(error => console.error(error))
  }

  const signIn = (data) => {
  
    API.post("accounts/login",{...data})
    .then((res) => {
      console.log(res)
        localStorage.setItem("access",res.data.access)
        localStorage.setItem("user",res.data.user)
        setUser({...user,authenticated:true})
        res.headers["Authorization"] = "Bearer "+res.data.access
    })
    .catch(error => {
      if(error?.response)
        setMsg("Invalid EMail / Password")
      else
        document.getElementById("msg","please Check your Server Connection")})
}
  const logout = () =>{
    
    localStorage.removeItem("access")
    localStorage.removeItem("user")
    setUser({user:null,books:null,token:null,authenticated:false})
  }
  return (
  <div>

    <Router>
    <Navbar authenticated={user.authenticated} logout={logout}/>
    
    <Routes>
    <Route path="/" exact  />
      {user.authenticated ?<>
          {render && <Route path='/dashboard'  element={<Books  books={books}/>}/>}
          <Route path="/addBook" element={<AddBook onAdd={createBook}/>} />
          </>
          :(<>
          
          <Route path='/register'element={<Register msg={msg}  onRegister = {signUp}/>} />
          <Route path="/login" element={<Login msg={msg} onLogin={signIn}/>} /></>)}
    </Routes>
    
    <h3 id="msg" style={{position:"absolute",left:0,bottom:0,right:0}} className='end text-center'></h3>   
  
  
    
  </Router>
  
</div>

  );
}

export default App;
