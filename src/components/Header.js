import React from "react";
import { getUser } from "../services/userAPI";
import { Link } from "react-router-dom";

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      name: "",
      loading: true,
    };

    this.logado = this.logado.bind(this);
  }

  componentDidMount() {
    this.logado();
  }

  componentDidUpdate() {}

  logado = async () => {
    const nome = await getUser();
    this.setState({
      name: nome.name,
      loading: false,
    });
  };

  render() {
    const { name, loading } = this.state;
    return (
      <header data-testid="header-component">
        <p data-testid="header-user-name">{loading ? "Carregando..." : name}</p>
        <nav>
          <ul>
            <li>
              <Link to={"/search"} data-testid="link-to-search">
                Pesquisa
              </Link>
            </li>
            <li>
              <Link to={"/favorites"} data-testid="link-to-favorites">
                Favoritos
              </Link>
            </li>
            <li>
              <Link to={"/profile"} data-testid="link-to-profile">
                Perfil
              </Link>
            </li>
          </ul>
        </nav>
      </header>
    );
  }
}

export default Header;
