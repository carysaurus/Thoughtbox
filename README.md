# Thoughtbox

Welcome to **Thoughtbox** — a whimsical, web-based notes and ideas management app. Organize your thoughts into boxes, capture new ideas, and archive items for later reflection.

---

## Features

- **Boxes for your Thoughts:** Group related ideas together.
- **Notes inside Boxes:** Capture new thoughts, edit them, or let them rest in the Archive.
- **Archive & Unarchive:** Tuck away old ideas, or rediscover them later.
- **Interactive Reordering:** Move your Notes up or down — your creativity, your rules.
- **Whimsical Toast Messages:** Delightful notifications for every action—because your ideas deserve flair.
- **Responsive Design:** Works beautifully on desktop and mobile. Scroll through your Boxes horizontally on small screens.

---

## Tech Stack

- **Backend:** Node.js & Express
- **Database:** MongoDB with Mongoose
- **Authentication:** Passport.js (Local Strategy)
- **Templating:** EJS
- **Frontend Magic:** Vanilla JS, CSS Flexbox, Feather Icons
- **Dev Helpers:** Nodemon

---

## Getting Started (Local Development)

1. **Clone the repository:**

git clone https://github.com/carysaurus/Thoughtbox.git
cd thoughtbox

2. **Install dependencies:**

npm install

This will install all required packages, including:

- ejs
- express
- express-session
- feather-icons
- method-override
- mongoose
- passport
- passport-local

3. **Start the Server**

npm run dev

4. **Open your Browser:**

The server will start on http://localhost:3000 by default.

---

## How to Use

- Sign up or log in.
- Create a Box and name it something fun!
- Add Thoughts — little sparks of creative inspiration.
- Reorder, Archive, or Delete — organize your mental playground your way.
- Check the Archive when you want to revisit past ideas.
- Watch Toast Messages pop up with whimsy and encouragement!

---

## Folder Layout

.
├── config/ # Colour themes, note types
├── models/ # Schema and models for boxes, notes, and users
├── public/ # JS, CSS, images, static assets
├── routers/ # Express routes
├── views/ # EJS templates
├── server.js # Entry point
└── package.json
