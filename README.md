# Music Fullstack Application

A full-stack web application for managing music library built with the MERN stack.

## 🚀 Features
- Add, edit, and delete songs
- Real-time statistics dashboard  
- Advanced filtering
- Responsive design
- Redux state management

## 🛠️ Tech Stack
- React 18 + TypeScript
- Redux Toolkit + Redux Saga
- Node.js + Express
- MongoDB + Mongoose
- Emotion CSS-in-JS



A fullstack MERN application for managing music catalog with statistics.

Data Flow:
User interacts with a component (clicks a button)

Component dispatches a Redux action (fetchSongsStart())

Saga intercepts the action and calls the API service

API service makes HTTP request to backend

Backend responds with data

Saga dispatches success action with data (fetchSongsSuccess(data))

Reducer updates the state with new data

Components re-render with updated data
## Project Structure
