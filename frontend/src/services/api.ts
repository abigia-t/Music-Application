// Import TypeScript interfaces for type safety
import { Song, SongStatistics, FilterOptions } from '../types';

// Base API URL - points to backend server
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

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
export const fetchSongs = async (filters?: FilterOptions): Promise<Song[]> => {
  // Create query parameters from filters
  const queryParams = new URLSearchParams();
  
  if (filters?.genre) queryParams.append('genre', filters.genre);
  if (filters?.artist) queryParams.append('artist', filters.artist);
  if (filters?.album) queryParams.append('album', filters.album);
  
  // Build the URL with query parameters
  const url = `${API_BASE_URL}/songs?${queryParams.toString()}`;
  
  // Make the API request
  const response = await fetch(url);
  return handleResponse(response);
};

// GET song statistics
export const fetchStatistics = async (): Promise<SongStatistics> => {
  const response = await fetch(`${API_BASE_URL}/songs/stats`);
  return handleResponse(response);
};

// GET a single song by ID
export const fetchSong = async (id: string): Promise<Song> => {
  const response = await fetch(`${API_BASE_URL}/songs/${id}`);
  return handleResponse(response);
};

// POST create a new song
export const createSong = async (song: Omit<Song, '_id'>): Promise<Song> => {
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
  const response = await fetch(`${API_BASE_URL}/songs/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updates),
  });
  return handleResponse(response);
};

// DELETE a song by ID
export const deleteSong = async (id: string): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/songs/${id}`, {
    method: 'DELETE',
  });
  
  // Handle response (DELETE might return 204 No Content)
  await handleResponse(response);
};