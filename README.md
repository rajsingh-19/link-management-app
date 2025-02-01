# Link Management App

## Setup Instructions

### Prerequisites
  Node.js (v16+ recommended)
  npm or yarn

### Installation
    Clone the repository:
    git clone <repository-url>
    cd link-management-app

### Install dependencies:
    npm install
    ### or
    yarn install

### Start the development server:
    npm run dev
    ### or
    yarn dev

### Open the application in your browser at http://localhost:5173/ (default Vite port).


## About
This web application allows users to create, manage, and analyze shortened URLs with advanced link distribution and account management features. Users can register, track analytics for each link, and manage their accounts efficiently. The system ensures security with password hashing and authentication, and provides insights into user engagement through click tracking and analytics.

## Features Implemented
1. URL Shortening

    Users can input a long URL and generate a unique shortened version.

    Uses a hash/random string generator to create short links (6-8 digit alphanumeric).

    Users can set expiration dates for their links.

2. User Management

    User registration and login with email and password.

    Passwords are securely hashed before storing.
   
    Account settings include:

    Update Profile:

    Users can update their name and email.
   
    If a user updates their email, they are logged out automatically.
   
    Delete Account:

    Users can delete their account, which removes all associated links and data.

3. Dashboard

    Users can view their shortened URLs along with:
   
    Original URL.
   
    Shortened URL.
   
    Click analytics.
   
    Options to edit or delete links.

4. Click Tracking

    Tracks metadata for each click:
   
    Timestamp.
   
    IP address.
   
    User agent (browser and OS details).
   
    Summarized click data is displayed in the dashboard.

5. Link Management

    Users can:
   
    Edit the original URL or its alias.
   
    Delete individual links.

6. Analytics
   
    Provides detailed analytics for each shortened link, including:
   
    Device type (mobile, desktop, tablet).
   
    Browser details.

7. Responsive Design

    Ensures the platform works seamlessly on both desktop and mobile devices.

8. Pagination

    Pagination is implemented for links and analytics to improve usability.

***************************************************************************
## Live Link : https://linkmanagement.netlify.app/
