# Quickbite

This is the backend project for the [Quickbite app](https://qbite.netlify.app/).

## Description

Quickbite is the app that turns your favorite recipes into fast, organized shopping lists—making cooking easier from the very first step.

#### [Client Repo here](https://github.com/somorales/quickbite-frontend)

#### [Server Repo here](https://github.com/somorales/quickbite-backend)

## Technologies, Libraries & APIs used

- **Frontend:** React, HTML5, CSS3, JavaScript
- **Backend:** Node.js, OpenAI API
- **Styling:** Tailwind
- **HTTP client:** Axios
- **Deployment:** Netlify (Frontend), Render & Mongo Atlas (Backend)

# Server Structure

## Models

User model

```javascript
({
  email: {
    type: String,
    required: [true, "Email is required."],
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: [true, "Password is required."],
  },
  name: {
    type: String,
    required: [true, "Name is required."],
  },
  basket: [{ type: Schema.Types.ObjectId, ref: "Recipe" }],
  favorites: [{ type: Schema.Types.ObjectId, ref: "Recipe" }],
});
```

Word model

```javascript
({
  name: {
    type: String,
    required: [true, "Recipe name is required."],
    trim: true,
  },
  image: {
    type: String,
    required: [true, "Image URL is required."],
  },
  cooking_time_minutes: {
    type: Number,
    required: [true, "Cooking time (in minutes) is required."],
  },
  ingredients: {
    type: [String],
    required: [true, "Ingredients are required."],
  },
  preparation: {
    type: String,
    required: [true, "Preparation steps are required."],
  },
  dietary_style: {
    type: String,
    enum: DIETARY_STYLES,
    required: [true, "Dietary style must be defined."],
  },
  cuisine: {
    type: String,
    enum: CUISINES,
    required: [true, "Cuisine must be defined."],
  },
  popularity: {
    type: Number,
    min: 0,
    max: 5,
    default: 0,
  },
}),
  {
    timestamps: true,
  };
```

# API Endpoints (backend routes)

# 📘 API Documentation

| HTTP Method | URL                            | Request Body                                           | Success Status | Error Status | Description                                                |
| ----------- | ------------------------------ | ------------------------------------------------------ | -------------- | ------------ | ---------------------------------------------------------- |
| **GET**     | `/recipes`                     | `?cooking_time, dietary_style, cuisine, name, sort_by` | 200            | 400          | Returns all recipes with optional filtering and sorting.   |
| **GET**     | `/recipes/:id`                 | N/A                                                    | 200            | 404          | Returns the details of a specific recipe by its ID.        |
| **GET**     | `/favorites`                   | N/A                                                    | 200            | 404          | Returns the authenticated user's list of favorite recipes. |
| **POST**    | `/favorites`                   | `{ "recipeId": "string" }`                             | 200            | 400          | Adds a recipe to the user's favorites list.                |
| **DELETE**  | `/favorites/recipes/:recipeId` | N/A                                                    | 204            | 404          | Removes a recipe from the user's favorites by recipe ID.   |
| **GET**     | `/basket`                      | N/A                                                    | 200            | 404          | Returns the authenticated user's recipe basket.            |
| **POST**    | `/basket`                      | `{ "recipeId": "string" }`                             | 200            | 400          | Adds a recipe to the user's basket.                        |
| **DELETE**  | `/basket/recipes/:recipeId`    | N/A                                                    | 204            | 404          | Removes a recipe from the user's basket by recipe ID.      |

---

## 🔐 Notes

##

This route (`POST /ingredients`) uses OpenAI's `gpt-4o-mini` model to generate a consolidated grocery list from a list of meals.

### How it works

- **Input**: An array of meals, each with:
  - `name`: the meal's name
  - `quantity`: how many times it will be eaten
  - `ingredients`: an array of ingredient names
- **Processing**:
  - The server formats a natural language prompt from the meals.
  - Sends the prompt to OpenAI with a strict JSON schema.
  - The model returns a structured list that:
    - Multiplies ingredients by frequency
    - Combines duplicates
- **Output Example**:
  ```json
  {
    "elements": [
      { "ingredient": "tomato", "quantity": 5 },
      { "ingredient": "rice", "quantity": 2 }
    ]
  }
  ```

## Links

### Project

[Repository Link Client](https://github.com/somorales/quickbite-frontend)

[Repository Link Server](https://github.com/somorales/quickbite-backend)

[Deploy Link](https://qbite.netlify.app/)
