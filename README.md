# Event Management Platform - Frontend

## Overview

This is the frontend part of the Event Management Platform built using **React.js**. The platform allows users to create, manage, and delete events, as well as sign up, log in, and view a list of their events.

### Features

- **User Authentication**: Implemented JWT-based authentication (sign-up, login).
- **Event Management**: Users can create, edit, and delete events.
- **Event Listing**: Display a list of events with basic filtering by date and search functionality based on the event title.
- **Responsive UI**: A mobile-first, user-friendly interface.
- **Protected Routes**: Users can only access their own events after logging in.
- **State Management**: Utilized **Redux** for state management across the app.

---

## Tech Stack

- **Frontend**: React.js
- **State Management**: Redux (for global state management)
- **UI Framework**: **Tailwind CSS** (for utility-first styling) and **ShadCN** (for component design)
- **Authentication**: JWT (JSON Web Token)
- **API Client**: Axios (to interact with the backend)

---

## Installation

1. **Clone the repository**:

   git clone https://github.com/PeerMohammad07/Eventify-Frontend.git
   
   cd event-management-platform/frontend

2. **Install dependencies**:

    npm install

3. **Environment Variables**:

    VITE_BACKEND_URL = "http://localhost:3000"

4. **Run the development server**:

   npm run dev
