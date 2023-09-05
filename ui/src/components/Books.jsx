
import React  from 'react'
const Books = ({books}) => {
  const image =<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvac_K2-8clhlResP0eDCVpRYSVbh0vuEMQQ&usqp=CAU" className="card-img-top" alt="ImG 1"/>
  return (
    <div>
        <div className="container">
  <div className="d-flex flex-row justify-content-between text-center">
  <nav className="navbar navbar-light bg-light">
      
  </nav>
  
  </div>
  </div>
      <div className="container">
      
        

        { books ? (books.map((book,index) =>(
          <div className="card mr-3" style={{width: "18rem"}}>
        <div key={index}>{image}
          <div className='card-body' >
            <h5 className='card-title'>{book.title}</h5>
            <h6 className='card-text'>{book.category}</h6>
            <p className='card-body'>{book.description}</p>
            <button className='btn btn-primary' onClick={() => alert("Order Successfully Placed")}>Order</button>
          </div>
        </div>
        </div>))):(
          <div className='text-center'>No Books are Found Create one</div>
        )}
        {console.log(books)}
      </div>
  <div>
{/*<button className="btn btn-outline-primary
"onClick={addBooks} style={{margin:"auto",cursor:"pointer"}}>add</button>*/}

    </div>
    </div>
  )
}

export default Books
