# ApplySage
"Where Job Applications Meet Insight"

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
