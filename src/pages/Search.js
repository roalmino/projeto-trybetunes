import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      list: '',
      artist: '',
      loading: false,
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    e.preventDefault();
    this.setState({ loading: true }, this.seachArtist);
  }

  handleChange = ({ target }) => {
    const { value } = target;
    this.setState({
      name: value,
    });
  };

  async seachArtist() {
    const { name } = this.state;
    const response = await searchAlbumsAPI(name);
    this.setState({ list: response, name: '', artist: name, loading: false });
  }

  render() {
    const { name, artist, loading, list } = this.state;
    const isDisable = name.length > 1;

    return (
      <>
        <Header />
        {loading ? (
          'Carregando...'
        ) : (
          <>
            {' '}
            <div data-testid="page-search">Search</div>
            <form>
              <input
                data-testid="search-artist-input"
                onChange={ this.handleChange }
                value={ name }
              />
              <button
                type="button"
                data-testid="search-artist-button"
                disabled={ !isDisable }
                onClick={ this.handleClick }
              >
                Pesquisar
              </button>
            </form>
            {artist ? (
              <div>
                <h1>{`Resultado de álbuns de: ${artist}`}</h1>
                {list.length > 0 ? (
                  <ul>
                    {list.map(({ collectionName, collectionId }) => (
                      <li key={ collectionName }>
                        <Link
                          data-testid={ `link-to-album-${collectionId}` }
                          to={ `album/${collectionId}` }
                        >
                          {collectionName}
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>Nenhum álbum foi encontrado</p>
                )}
              </div>
            ) : (
              ''
            )}
          </>
        )}
      </>
    );
  }
}

export default Search;
