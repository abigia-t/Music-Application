// Import TypeScript interfaces for type safety
import { Song, SongStatistics, FilterOptions } from '../types';

// Base API URL - points to backend server on port 5000
const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://music-application-x0li.onrender.com';

// Helper function to handle API responses consistently
const handleResponse = async (response: Response): Promise<any> => {
  // Check if the response is successful (status code 200-299)
  if (!response.ok) {
    // Try to parse error message from response
    let errorMessage = `HTTP error! status: ${response.status}`;
    
    try {
      const errorData = await response.json();
      errorMessage = errorData.message || errorMessage;
    } catch {
      // If response is not JSON, use default error message
    }
    
    throw new Error(errorMessage);
  }
  
  // For DELETE requests that might not return content
  if (response.status === 204) {
    return null;
  }
  
  // Parse and return JSON response for successful requests
  return response.json();
};

// GET all songs with optional filtering
export const fetchSongs = async (filters?: FilterOptions): Promise<{ songs: Song[] }> => {
  // Create query parameters from filters
  const queryParams = new URLSearchParams();
  
  if (filters?.genre) queryParams.append('genre', filters.genre);
  if (filters?.artist) queryParams.append('artist', filters.artist);
  if (filters?.album) queryParams.append('album', filters.album);
  // if (filters?.page) queryParams.append('page', filters.page.toString());
  // if (filters?.limit) queryParams.append('limit', filters.limit.toString());
  
  // Build the URL with query parameters
  const url = `${API_BASE_URL}/songs?${queryParams.toString()}`;
  
  console.log('API: Fetching songs from:', url);
  
  // Make the API request
  const response = await fetch(url);
  return handleResponse(response);
};

// GET song statistics
export const fetchStatistics = async (): Promise<SongStatistics> => {
  console.log('API: Fetching statistics from:', `${API_BASE_URL}/songs/statistics`);
  
  const response = await fetch(`${API_BASE_URL}/songs/statistics`);
  const data = await handleResponse(response);
  console.log('API: Statistics response:', data);
  return data;
};

// GET a single song by ID
export const fetchSong = async (id: string): Promise<Song> => {
  console.log('API: Fetching song:', `${API_BASE_URL}/songs/${id}`);
  
  const response = await fetch(`${API_BASE_URL}/songs/${id}`);
  return handleResponse(response);
};

// POST create a new song
export const createSong = async (song: Omit<Song, '_id'>): Promise<Song> => {
  console.log('API: Creating song:', `${API_BASE_URL}/songs`, song);
  
  const response = await fetch(`${API_BASE_URL}/songs`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(song),
  });
  return handleResponse(response);
};

// PUT update an existing song
export const updateSong = async (id: string, updates: Partial<Song>): Promise<Song> => {
  console.log('API: Updating song:', `${API_BASE_URL}/songs/${id}`, updates);
  
  const response = await fetch(`${API_BASE_URL}/songs/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updates),
  });
  
  const data = await handleResponse(response);
  console.log('API: Update response:', data);
  return data;
};

// DELETE a song by ID
export const deleteSong = async (id: string): Promise<void> => {
  console.log('API: Deleting song:', `${API_BASE_URL}/songs/${id}`);
  
  const response = await fetch(`${API_BASE_URL}/songs/${id}`, {
    method: 'DELETE',
  });
  
  // Handle response (DELETE might return 204 No Content)
  await handleResponse(response);
  console.log('API: Delete successful for song:', id);
};