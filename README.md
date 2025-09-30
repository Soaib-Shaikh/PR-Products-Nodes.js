# PR-Products-Nodes.js

A Node.js-based product management system for handling categories, subcategories, extra categories, and products with image uploads and a client-side interface.

## Deployment

Link here: https://pr-products-nodes-js.onrender.com

## Features
- Category, Subcategory, Extra Category, and Product management
- Image upload functionality for each entity
- Admin and client-side controllers
- RESTful API routing
- EJS templating for views
- Organized folder structure for scalability

## Technology Stack
- **Node.js**
- **Express.js**
- **MongoDB** (assumed from schema naming)
- **EJS** (Embedded JavaScript templates)
- **Bootstrap** (UI styling)
- **Multer** (for image uploads)

## Folder Structure
```
configs/           # Database configuration
controllers/       # Business logic for admin, category, client, etc.
middlewares/       # Middleware (e.g., image upload)
models/            # Mongoose schemas for entities
public/            # Static assets (images, JS, CSS, etc.)
routers/           # Express route definitions
uploads/           # Uploaded images organized by entity
views/             # EJS templates for UI
```

## Getting Started
1. Clone the repository
2. Run `npm install` to install dependencies
3. Configure your database in `configs/db.js`
4. Start the server: `node index.js`

Feel free to update this README with more details as your project evolves.
