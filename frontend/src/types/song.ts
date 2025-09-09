export interface Song {
  _id?: string;
  title: string;
  artist: string;
  album: string;
  genre: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface SongStatistics {
  totalSongs: number;
  totalArtists: number;
  totalAlbums: number;
  totalGenres: number;
  songsPerGenre: { _id: string; count: number }[];
  artistStats: { artist: string; songs: number; albums: number }[];
  albumStats: { artist: string; album: string; songs: number }[];
}

export interface FilterOptions {
  genre?: string;
  artist?: string;
  album?: string;
}