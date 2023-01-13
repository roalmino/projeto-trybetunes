import React from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import Loading from './Loading';

class Login extends React.Component {
  state = {
    name: '',
    loading: false,
  };

  montagem = () => {
    const { name } = this.state;
    const { history } = this.props;
    this.setState({ loading: true }, async () => {
      await createUser({ name });
      history.push('/search');
    });
  };

  handleChange = ({ target }) => {
    const { value } = target;
    this.setState({
      name: value,
    });
  };

  render() {
    const { loading, name } = this.state;
    const isDisable = name.length > 2;
    return loading ? (
      <Loading />
    ) : (
      <div data-testid="page-login">
        Login
        <form>
          <label htmlFor="input-login">
            Nome:
            <input
              type="text"
              name="name"
              data-testid="login-name-input"
              onChange={ this.handleChange }
              id="input-login"
            />
          </label>
          <button
            type="button"
            data-testid="login-submit-button"
            disabled={ !isDisable }
            onClick={ () => this.montagem() }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.string,
  }),
}.isRequired;

export default Login;
