import { Link } from "react-router-dom"

function Navbar() {

  return (
    <div className='navbar'>
      <ul>
        <li><Link className="active" to="/home">Home</Link></li>
        <li><Link to="/pets">Mascotas</Link></li>
        <li><Link to="/appointments">Turnos</Link></li>
        <li><Link to="/login">Iniciar sesion</Link></li>
      </ul>
    </div> 
  )
}

export default Navbar
