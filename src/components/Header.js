import React from "react";
import { getUser } from "../services/userAPI";

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

  componentDidUpdate() {
  }

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
      </header>
    );
  }
}

export default Header;
