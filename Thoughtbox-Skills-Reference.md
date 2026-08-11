# Thoughtbox — Skills & Techniques Reference
*Created by Carys Richards · © 2025*

---

## Languages & Technologies
- **JavaScript (ES6+)** — server-side (Node.js) and client-side (Vanilla JS)
- **HTML5** — via EJS server-side templating
- **CSS3** — custom styling, theming, layout, and animation
- **SQL-equivalent concepts** — applied through MongoDB document modelling and querying
- **Git** — version control with a dedicated deploy branch

---

## Backend Skills (Node.js & Express)

### Server Setup
- **Express.js** — created and configured a full HTTP server with `app.listen()` and environment-based port selection
- **Middleware stacking** — chained multiple middleware layers: JSON body parsing, URL-encoded forms, static file serving, session management, and Passport initialization
- **`method-override`** — enabled RESTful PUT and DELETE methods from HTML forms, which only natively support GET and POST
- **`dotenv`** — managed sensitive credentials (database URI, session secret) via `.env` environment variables, kept out of version control

### Routing Architecture
- **Modular Express routers** — split routes into five dedicated files: `authRouter`, `boxRouter`, `noteRouter`, `pageRouter`, `configRouter`
- **RESTful API design** — consistent use of GET, POST, PUT, and DELETE HTTP methods mapped to CRUD operations
- **Route parameterization** — dynamic URL segments (e.g. `/notes/:id`, `/boxes/order/:id/left`) for resource-specific actions
- **Redirect-after-POST pattern** — all state-changing routes redirect on success to prevent form resubmission

### Authentication & Security
- **Passport.js Local Strategy** — implemented username/password authentication using the `passport-local` package
- **PBKDF2 password hashing** — used Node.js built-in `crypto.pbkdf2()` with SHA-256 and 310,000 iterations (industry-standard security)
- **Random salt generation** — `crypto.randomBytes()` creates a unique salt per user to prevent rainbow table attacks
- **Timing-safe comparison** — `crypto.timingSafeEqual()` prevents timing attacks during password verification
- **Session serialization** — `passport.serializeUser` / `deserializeUser` to persist login state across requests
- **Auto-login after registration** — new users are immediately authenticated after account creation with `req.login()`

### Session Management
- **`express-session`** — configured persistent login sessions with a secret key, `resave: false`, and `saveUninitialized: false`
- **Session-based flash messages** — stored toast message keys in `req.session.toastMessage` and consumed them on the next page render

### Error Handling
- **`try/catch` blocks** throughout all async route handlers
- **HTTP status codes** — appropriate use of 400 (bad request), 401 (unauthenticated), and 500 (server error)
- **Descriptive `console.error` logging** for debugging without exposing errors to the client

---

## Database Skills (MongoDB & Mongoose)

### Schema Design
- **Three Mongoose schemas** — `User`, `Box`, and `Note`, each with typed fields, validation rules, and defaults
- **Field validation** — `required`, `unique`, `enum`, `trim`, `lowercase`, and `default` constraints applied at the schema level
- **Nested subdocuments** — `image` field on Note contains nested `src` and `desc` fields
- **Array fields** — `tags` and `list` stored as arrays of strings within a single document
- **Mongoose timestamps** — `{ timestamps: true }` auto-manages `createdAt` and `updatedAt` on Box and Note schemas

### Document Relationships
- **`ObjectId` references** — `userId` and `boxId` fields on Note link documents across collections using `ref`
- **Ownership associations** — every Box and Note stores its creator's `userId`, enforcing per-user data isolation

### Querying
- **`findOne`, `findById`, `findByIdAndUpdate`, `findByIdAndDelete`** — full suite of Mongoose query methods across both resources
- **MongoDB query operators** — `$gt` and `$lt` used in ordering logic to find the adjacent item above or below a given order value
- **Chained `.sort()` and `.select()`** — targeted queries that retrieve only the fields needed (e.g. fetching only the `order` field of the last item)
- **Order swap algorithm** — custom logic to find an adjacent document and swap `order` values atomically, implementing drag-free reordering

### Performance
- **Database indexing** — `noteSchema.index({ boxId: 1 })` added for faster note lookups within a given box

---

## Frontend Skills (Vanilla JavaScript)

### Language Features (ES6+)
- **ES6 Modules** — full `import`/`export` architecture across multiple frontend JS files
- **`async` / `await`** — all database interactions written with modern async patterns
- **Destructuring** — used throughout for clean extraction from `req.body` and objects
- **Arrow functions** and concise callback syntax
- **Array methods** — `.map()`, `.filter()`, `.split()`, `Array.from()` for processing tags and list items

### DOM Manipulation
- Querying elements with `querySelector` and `getElementById`
- Toggling visibility states with `classList.add` / `.remove` (using a `collapsed` class pattern)
- Data attributes (`data-note-id`, `data-box-id`) for linking DOM elements to their database records

### Events & Interactivity
- **`event.stopPropagation()`** — prevents click events from bubbling and accidentally closing open menus
- Click event listeners for menus, delete confirmations, collapse/expand, and reorder controls
- **Mutual exclusion logic** — closing any open menu or delete dialog before opening a new one

### UI Features Built
- **Toast notification system** — server-sets a session key; client reads and displays a themed message on page load
- **Collapsible note bodies** — toggle expand/collapse with server-side persistence of state
- **Context menus** — per-note and per-box dropdown menus with mutual exclusion (only one open at a time)
- **Reorder controls** — up/down arrows for notes and left/right arrows for boxes, wired to PUT routes

---

## CSS Skills

### Layout
- **CSS Flexbox** — used for the main page layout, box columns, note stacking, and header/footer
- **Responsive design** — horizontal scrolling for boxes on small screens; layout adapts for mobile and desktop

### Theming Architecture
- **CSS Custom Properties** (variables in `:root`) — centralized color palette with 8 complete themes: Light, Pink, Blue, Green, Orange, Purple, Teal, and Gold
- **Class-based theming** — colour theme applied via a dynamic class on `.box` and `.note` elements, driving border, background, scrollbar, and text colour simultaneously
- **Custom scrollbar styling** — per-theme `scrollbar-color` property for a polished, consistent look

### Modular CSS Structure
- Files split by purpose: `reset.css`, `typography.css`, `page.css`, `animations.css`, `buttons.css`, `colourVars.css`, `colourThemes.css`
- Component files: `boxes.css`, `boxMenu.css`, `boxForms.css`, `notes.css`, `noteMenu.css`, `noteForms.css`, `auth.css`
- Single `main.css` entry point importing all partials

### Animation
- **CSS `@keyframes`** — custom animations for UI transitions and toast messages
- Smooth open/close transitions for menus and forms

---

## Templating (EJS)

- **EJS (Embedded JavaScript Templates)** — server-side HTML rendering with JavaScript expressions
- **Partial/component system** — reusable EJS partials for `header`, `footer`, `toast`, `head`, plus separate partials for each form and card type
- **Dynamic rendering** — boxes and notes rendered from database data passed into templates
- **Conditional rendering** — template logic to show/hide UI elements based on state (e.g. archived vs. active, note type)

---

## Software Architecture & Practices

### MVC-Inspired Pattern
- **Models** — Mongoose schemas in `/models`
- **Views** — EJS templates in `/views` with a `/partials` subfolder for components
- **Routers (Controllers)** — Express route handlers in `/routers`

### Separation of Concerns
- **Config files** — `colourThemes.js` and `noteTypes.js` define app-wide constants independently of logic
- **Reusable partials** — every UI component (note card, box card, forms, toast) is its own EJS partial
- **Static assets** — CSS, JS, and images served cleanly from `/public`

### Project Structure
- Organised directories: `/models`, `/views`, `/routers`, `/public`, `/config`
- `server.js` as a clean entry point — only wires together middleware, routes, and database connection

---

## Features Implemented (End-to-End)

- User registration, login, and logout with session persistence
- Full CRUD for Boxes — create, rename, reorder (left/right), archive, and delete
- Full CRUD for Notes with three distinct content types: **text**, **list**, and **image**
- Archive and unarchive system for both Boxes and Notes, with a dedicated archived view
- Note ordering — move notes up/down within a box, with order persisted to the database
- Collapsible note bodies — expand/collapse state saved per note
- Tag system — comma-separated tags stored as arrays and displayed on each note
- 8-colour theming — applied independently to each Box and Note
- Toast notification system — contextual messages for every user action
- Responsive layout — works on desktop and mobile

---

## Project Organization & Development

- Organised asset folders: `css/` (with base and component subfolders), `js/` (with boxes and notes subfolders), `assets/`
- Config files for colour themes and note types — easy to extend without touching logic
- README with setup instructions, feature list, and tech stack
- Git version control with a separate `deploy` branch for production
- VS Code workspace settings committed for consistent development environment

---

*This document is intended as a resume-building reference — each item above represents a concrete, demonstrable skill from the Thoughtbox codebase.*
