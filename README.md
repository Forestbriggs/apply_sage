# ApplySage
"Where Job Applications Meet Insight"

Checkout the [live version](https://applysage.onrender.com/) of this project.

ApplySage is a custom job application tracker built with Flask, React, and PostgreSQL containerized with Docker.

## Tech Stack

### Universal
- Docker

### Frontend
- React
- React Router
- React Charts
- React Toastify
- React Hook Form
- Yup
- Redux
- Tailwind CSS
- Typescript

### Backend
- Flask
- SQLAlchemy
- PostgreSQL
- WTForms
- Pandas
- Alembic

## Screenshots
### None yet

## Features
- [x] User authentication
- [x] User authorization
- [x] Application creation
- [x] Application editing
- [x] Application deletion
- [x] Company creation
- [x] Company editing
- [x] Company deletion

## Future Features
- [ ] Application status tracking
- [ ] Application interview scheduling
- [ ] Note Taking
- [ ] Reminders
- [ ] Application documents

## Getting Started

#### How to start
1. Clone this repository.
2. Install dependencies.

   ```bash
   pipenv install -r requirements.txt
   ```
3. Create a .env file based on the example with proper settings for your development environment.
4. Get into your pipenv, migrate your database, seed your database, and run your
   Flask app:

   ```bash
   pipenv shell
   ```

   ```bash
   flask db upgrade
   ```

   ```bash
   flask seed all
   ```

   ```bash
   flask run
   ```
5. In a second terminal you need to start your react app

   ```bash
   cd react-vite
   npm install
   npm run dev
   ```
