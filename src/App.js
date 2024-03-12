import React, { useState } from 'react';
import { FaSpotify } from 'react-icons/fa';
import './App.css'; // Assume you have your styles in App.css

function App() {
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [mockRecentlyPlayed, setMockRecentlyPlayed] = useState([
    { id: 1, title: 'Song 1', artist: 'Artist 1', audio: 'audio_url_1', image: "C:/Users/lenovo/Pictures/image1.jpg" },
    { id: 2, title: 'Song 2', artist: 'Artist 2', audio: 'audio_url_2', image: "C:/Users/lenovo/Pictures/image3.jpg" },
    { id: 3, title: 'Song 3', artist: 'Artist 3', audio: 'audio_url_3', image: "C:/Users/lenovo/Pictures/image4.jpg" },
  ]);
  const [selectedSong, setSelectedSong] = useState(null);
  const [originalRecentlyPlayed] = useState(mockRecentlyPlayed);

  const playlists = ['For You', 'Top Tracks', 'Favorite', 'Recently Played'];

  const handlePlaylistSelect = (playlist) => {
    setSelectedPlaylist(playlist);
    if (playlist === 'Recently Played') {
      setMockRecentlyPlayed(originalRecentlyPlayed);
    } else {
      setMockRecentlyPlayed([]);
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    const filteredList = originalRecentlyPlayed.filter(
      (song) =>
        song.title.toLowerCase().includes(event.target.value.toLowerCase()) ||
        song.artist.toLowerCase().includes(event.target.value.toLowerCase())
    );
    
    setMockRecentlyPlayed(filteredList);
  };

  const playSong = (song) => {
    
    console.log(`Playing: ${song.title} - ${song.artist}`);
    setSelectedSong(song);
  };

  return (
    <div className="app">
      <div className="sidebar">
      <div className="spotify-icon">
          <FaSpotify />
          <span>Spotify</span>
        </div>
        {playlists.map((playlist, index) => (
          <div
            key={index}
            className={`playlist ${selectedPlaylist === playlist ? 'selected' : ''}`}
            onClick={() => handlePlaylistSelect(playlist)}
          >
            {playlist}
          </div>
        ))}
      </div>
      <div className="main">
        <div className="header">
          <h1>{selectedPlaylist || 'Recently Played'}</h1>
        </div>
        <input
          type="text"
          className="search-bar"
          placeholder="Search"
          value={searchTerm}
          onChange={handleSearch}
        />
        <div className="content">
          {selectedPlaylist === 'Recently Played' && (
            <div className="recently-played">
              {mockRecentlyPlayed.map((song) => (
                <div key={song.id} className="song" onClick={() => playSong(song)}>
                  <p>
                  {/* <img src={song.image} alt={`${song.title} - ${song.artist}`} /> */}
                  {/* <p>{song.title} - {song.artist}</p> */}
                  <img src={song.image} alt={`${song.title} - ${song.artist}`} className="circle-image" />

                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="right-sidebar">
        {selectedSong && (
          <div className="selected-song playlist-image img">
            <p>
            <img src={selectedSong.image} alt={`${selectedSong.title} - ${selectedSong.artist}`} />
            {/* <p>{selectedSong.title} - {selectedSong.artist}</p> */}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
