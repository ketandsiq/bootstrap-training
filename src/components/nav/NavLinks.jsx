import "bootstrap/dist/css/bootstrap.min.css";

const NavLinks = () => {
  return (
    <nav className="navbar navbar-expand justify-content-center">
      <div className="">
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav text-center">
            <li className="nav-item">
              <a className="nav-link " href="/home">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/login">
                Login
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/gallery">
                Gallery
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavLinks;
