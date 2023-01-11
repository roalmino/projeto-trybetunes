import React from "react";
import Header from "../components/Header";
import MusicCard from "../components/MusicCard";
import getMusics from "../services/musicsAPI";

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      album: {},
      loading: true,
    };
  }

  componentDidMount() {
    const prop = this.props;
    const { id } = prop.match.params;
    this.getAlbum(id);
  }

  getAlbum = async (id) => {
    const response = await getMusics(id);
    this.setState({ album: response, loading: false });
  };

  render() {
    const { album, loading } = this.state;
    return (
      <>
        <Header />
        {loading ? (
          "Carregando..."
        ) : (
          <div data-testid="page-album">
            <h1 data-testid="artist-name">{album[0].artistName}</h1>
            <h2 data-testid="album-name">{album[0].collectionName}</h2>
            {album.map((music, index) => {
              if (index > 0) return <MusicCard music={music} />;
            })}
          </div>
        )}
      </>
    );
  }
}

export default Album;
