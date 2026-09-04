# Booksite

A modern, editorial-style reading experience built for people who love discovering good stories.

Booksite is a frontend reading platform where readers can explore books by genre and mood, save books for later, and read directly in the browser with persistent reading progress.

## Live Demo

https://booksite-rihannah.vercel.app/

## Overview

Booksite was designed around a simple idea:

> Finding a good book should feel as enjoyable as reading one.

Instead of overwhelming readers with a large catalogue, Booksite focuses on a small curated collection presented through a calm, immersive interface.

Readers can:

- Discover featured books
- Browse books by genre
- Explore books based on mood
- View detailed book information
- Save books for later
- Read books directly in the browser
- Track reading progress
- Continue reading from where they stopped
- Switch between dark and light themes

## Features

### Discover

The homepage introduces readers to the collection through:

- Featured books
- Mood-based discovery
- Continue Reading
- Editorial-style book presentation

### Library

Browse the available collection and filter books by genre.

Current genres include:

- Science Fiction
- Romance
- Magical Realism
- Historical Fiction
- Poetry

### Browse by Mood

Books can also be discovered based on how the reader feels.

Examples include:

- Hopeful
- Dreamy
- Emotional
- Bittersweet
- Strange
- Nostalgic
- Reflective
- Soft

### Saved Books

Readers can save books they want to return to later.

Saved books persist using browser local storage, so they remain available after refreshing the page.

### Online Reader

Each book has its own reading experience with:

- Chapter navigation
- Reading progress
- Previous and next chapter controls
- Reading settings
- Persistent scroll position
- Automatic scroll-to-top when changing chapters

### Continue Reading

Booksite remembers reading progress locally.

When a reader leaves a book and returns to the Discover page, books they've started appear in the Continue Reading section so they can pick up where they left off.

### Theme Switching

Booksite supports both:

- Dark mode
- Light mode

The visual system uses warm charcoal tones for dark mode and warm cream tones for light mode.

### Responsive Design

The interface is designed to work across:

- Desktop
- Tablet
- Mobile

The reading experience is also optimized for smaller screens.

## Tech Stack

### Frontend

- React
- Vite
- Tailwind CSS
- React Router
- Framer Motion
- Lucide React

### Storage

- Browser Local Storage

Local storage is currently used for:

- Saved books
- Reading progress
- Reader state

### Deployment

- Vercel

## Project Structure

src/
├── assets/
│   └── books/
│
├── components/
│   ├── Navbar.jsx
│   ├── Footer.jsx
│   ├── Hero.jsx
│   ├── MoodLibrary.jsx
│   ├── EditorsPicks.jsx
│   ├── ContinueReading.jsx
│   └── ...
│
├── data/
│   ├── books.js
│   └── bookContent.js
│
├── hooks/
│   └── useReadingProgress.js
│
├── layouts/
│   └── MainLayout.jsx
│
├── pages/
│   ├── Home.jsx
│   ├── Genres.jsx
│   ├── GenreResults.jsx
│   ├── MoodResults.jsx
│   ├── BookDetails.jsx
│   ├── Reader.jsx
│   ├── SavedBooks.jsx
│   ├── About.jsx
│   └── NotFound.jsx
│
├── App.jsx
├── index.css
└── main.jsx

## Getting Started

### Clone the repository

git clone https://github.com/adeoyerihanat6-prog/Booksite.git

### Navigate into the project

cd Booksite

### Install dependencies

npm install

### Start the development server

npm run dev

The app will be available at the local development URL provided by Vite.

### Build for production

npm run build

## Design Direction

Booksite intentionally avoids the typical bright, heavily animated book-library aesthetic.

The interface is inspired by:

- Late-night reading
- Quiet libraries
- Editorial websites
- Printed books
- Warm paper
- Minimal interfaces

The dark theme uses a warm near-black rather than pure black, while the light theme uses a warm cream instead of pure white.

The goal is to make the interface feel calm enough that the content remains the focus.

## Current Book Collection

### Quiet Between Stars

A science-fiction story about distance, memory, and finding home somewhere beyond the stars.

### Things We Never Said

A contemporary romance about old friendships, unfinished conversations, and the things people struggle to say.

### A Map of Somewhere

A magical-realism story where a mysterious map leads its owner through forgotten memories.

### The Last Sunday

A historical-fiction story set in a Nigerian town, exploring family, expectations, and the choices that shape generations.

### Letters to the Moon

An epistolary story about old letters, unfinished dreams, and choosing what to carry into the future.

## What I Learned

Building Booksite helped me work through several areas of frontend development, including:

- React component architecture
- Client-side routing
- Persistent state with local storage
- Building a browser-based reading experience
- Managing reading progress
- Responsive layouts
- Theme systems
- Accessibility considerations
- Animation with Framer Motion
- Production builds with Vite
- Deploying React applications with Vercel

One of the biggest lessons from the project was that building a feature isn't just about making it work once.

It also has to survive:

- Refreshes
- Navigation
- Different screen sizes
- Empty states
- Invalid routes
- Production builds
- Real user interactions

## Future Improvements

Possible future improvements include:

- User accounts
- Cloud-synced reading progress
- A larger book catalogue
- Book search
- Book recommendations
- Reading history
- Reviews and ratings
- Bookmarks within chapters
- More advanced reader settings
- Backend-powered content management

## Author

Built by **Rihannah**.

Full-stack web developer learning, building, breaking things, and figuring them out along the way.

GitHub:

https://github.com/adeoyerihanat6-prog

## License

This project was created as a personal learning and portfolio project.