import React from 'react'
import {Link, useNavigate} from 'react-router-dom'

const Navbar = ({authenticated,logout,onCreate}) => {
  const navigate = useNavigate();
  return (
    <div>
      <nav className="navbar navbar-expand-sm navbar-light bg-light">
    <a className="navbar-brand" > <big>Explore</big> </a>
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    
    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
      <div className="navbar-nav ml-auto mr-5">
        
        
        
      <Link to="/" className="nav-link active">Home</Link>
          {!authenticated ?(<>
          
          <Link to="/register"className="nav-link">Register</Link>
          <Link to="/login" className='nav-link'>Login</Link>
          </>)
          :<>
            <Link to="/dashboard" className='nav-link'>DashBoard</Link>
            <Link to="/"onClick={logout} className='nav-link'>Logout</Link>
            <Link to="/addBook"><button className="btn btn-primary"onClick={onCreate} style={{margin:"auto",cursor:"pointer"}}>Create Book</button></Link>
            </>
          }
          
          
            
          
        
      </div>
    </div>
    </nav>
    </div>
  )
}

export default Navbar
