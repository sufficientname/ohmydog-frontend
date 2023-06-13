import { Link } from "react-router-dom";

export default function Navbar({ logout, userDetail }) {
  const isLogged = Object.keys(userDetail).length;
  const isStaff = isLogged && userDetail.is_staff;
  const isCustomer = isLogged && !userDetail.is_staff;

  return (
    <div className="navbar">
      <ul>
        <li>
          <Link className="active" to="/home">
            Home
          </Link>
        </li>
        {isStaff ? (
          <>
            <li>
              <Link to="/admin/users">Clientes</Link>
            </li>
            {/* <li>
              <Link to="/admin/pets">Mascotas</Link>
            </li> */}
            <li>
              <Link to="/admin/appointments">Turnos</Link>
            </li>
            <li>
              <Link to="/admin/adoptions">Adopciones</Link>
            </li>
          </>
        ) : null}

        {isCustomer ? (
          <>
            <li>
              <Link to="/pets">Mascotas</Link>
            </li>
            <li>
              <Link to="/appointments">Turnos</Link>
            </li>
            <li>
              <Link to="/adoptions">Adopciones</Link>
            </li>
          </>
        ) : null}

        {!isLogged ? (
          <>
            <li>
              <Link to="/adoptions">Adopciones</Link>
            </li>
          </>
        ) : null}

        {isLogged ? (
          <li>
            <Link to="/login" onClick={logout}>
              Cerrar Sesion{`(${userDetail.email})`}
            </Link>
          </li>
        ) : (
          <li>
            <Link to="/login">Iniciar sesion</Link>
          </li>
        )}
      </ul>
    </div>
  );
}
