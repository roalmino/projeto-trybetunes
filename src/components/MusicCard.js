import React from "react";
import { addSong } from "../services/favoriteSongsAPI";

class MusicCard extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      check: false,
    };
  }

  handleCheck = () => {
    this.setState({ loading: true, check: true }, this.addMusictoFav);
  };

  addMusictoFav = async () => {
    const { music } = this.props;
    await addSong(music);
    this.setState({ loading: false });
  };

  render() {
    const { music } = this.props;
    const { loading, check } = this.state;
    return (
      <div>
        {loading ? (
          "Carregando..."
        ) : (
          <div>
            <p>{music.trackName}</p>
            <audio
              data-testid="audio-component"
              src={music.previewUrl}
              controls
            >
              <track kind="captions" />O seu navegador não suporta o elemento{" "}
              <code>audio</code>.
            </audio>
            <label htmlFor={music.trackId}>
              Favorita
              <input
                type="checkbox"
                id={music.trackId}
                data-testid={`checkbox-music-${music.trackId}`}
                onChange={this.handleCheck}
                checked={check}
              />
            </label>
          </div>
        )}
      </div>
    );
  }
}

export default MusicCard;
