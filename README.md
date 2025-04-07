# Meal Planner App

**Plan your meals, discover new recipes, and simplify your grocery shopping!**

This application is designed to streamline your weekly meal planning process. You can browse and save recipes, assign meals to specific days of the week, and automatically generate a shopping list based on your chosen meals. Say goodbye to mealtime stress and hello to organized, delicious eating!

## Features

- **Recipe Management:**
  - Browse a collection of recipes (future: add, edit, delete).
  - View detailed recipe information (ingredients, instructions, cooking time, etc.).
  - Save your favorite recipes for easy access.
- **Weekly Meal Planning:**
  - Assign recipes to specific days of the week (e.g., Monday: Spaghetti, Tuesday: Chicken Stir-Fry).
  - View your entire weekly meal plan at a glance.
  - Easily rearrange meals if your schedule changes.
- **Smart Shopping List Generation:**
  - Automatically create a shopping list based on the ingredients in your chosen weekly meals.
  - Organize the shopping list by category (e.g., produce, dairy, pantry).
  - (Future) Mark items as purchased.
  - (Future) Add custom items to the shopping list.
- **User Accounts:**
  - Secure user accounts to save your recipes and meal plans.
  - (Future) Option to share meal plans with family members.
- **Responsive Design:**
  - The app is designed to work on all devices, from desktop to mobile.

## Tech Stack

This project utilizes a modern and robust tech stack:

- **Frontend:** [React](https://react.dev/) with [Next.js](https://nextjs.org/)
  - Next.js provides server-side rendering, routing, and other features for a fast and efficient user experience.
- **Database:** [NeonDB](https://neon.tech/) (PostgreSQL)
  - NeonDB offers a serverless, scalable, and developer-friendly PostgreSQL database.
- **Database Schema and Querying:** [Prisma](https://www.prisma.io/)
  - Prisma provides a type-safe and intuitive way to interact with the database, simplifying data modeling and querying.
- **Authentication:** [Better Auth](https://better-auth.dev/)
  - Better Auth provides a secure and easy-to-use authentication system for managing user accounts.
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
  - Tailwind CSS is a utility-first CSS framework that allows for rapid UI development and consistent styling.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (version 18 or higher recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- A NeonDB account and database set up.
- A Better Auth account and project set up.

### Installation

1.  **Clone the repository:**

    ```bash
    git clone <repository-url>
    cd mealplanner
    ```

2.  **Install dependencies:**

    ```bash
    npm install # or yarn install
    ```

3.  **Set up environment variables:**

    - Create a `.env.local` file in the root directory.
    - Add the following environment variables (replace with your actual values):

    ```
    DATABASE_URL="your_neon_db_connection_string"
    BETTER_AUTH_SECRET="your_better_auth_secret"
    BETTER_AUTH_URL="your_better_auth_url"
    # ... other environment variables
    ```

4.  **Run Prisma migrations:**

    ```bash
    npx prisma migrate dev --name init
    ```

    This will create the necessary tables in your database.

5.  **Start the development server:**

    ```bash
    npm run dev # or yarn dev
    ```

    This will start the development server, and you can access the app at `http://localhost:3000`.

### Project structure

    - `app/`: Contains the Next.js application code.
        - `api/`: API routes for server-side logic.
        - `components/`: Reusable UI components.
        - `lib/`: Utility functions and helper modules.
        - `pages/`: Next.js pages.
    - `prisma/`: Prisma schema and migrations.
    - `public/`: Static assets (images, etc.).
    - `styles/`: Global CSS styles.
    - `utils/`: Utility functions and helper modules.
    - `.env.local`: Environment variables.
    - `package.json`: Project dependencies and scripts.
    - `README.md`: Project documentation.

## Contributing

Contributions are welcome! If you'd like to contribute to the project, please follow these steps:

1.  Fork the repository.
2.  Create a new branch for your feature or bug fix.
3.  Make your changes and commit them with clear messages.
4.  Push your branch to your forked repository.
5.  Submit a pull request.

## Future Enhancements

- **Recipe Creation:** Allow users to add their own recipes.
- **Recipe Editing:** Allow users to edit their own recipes.
- **Recipe Deletion:** Allow users to delete their own recipes.
- **Advanced Search:** Implement more advanced search filters for recipes (e.g., by cuisine, dietary restrictions, ingredients).
- **Meal Plan Sharing:** Allow users to share their meal plans with others.
- **Shopping List Enhancements:**
  - Mark items as purchased.
  - Add custom items to the shopping list.
  - Import shopping lists from other apps.
- **Nutritional Information:** Display nutritional information for recipes.
- **Scaling:** Improve the app's scalability to handle a large number of users and recipes.
- **Testing:** Add unit and integration tests.

## License

MIT

## Contact

Henrik Falla - henrik.falla@gmail.com

