# Lexi

This is the backend project for the [Lexi app]().

## Description

Lexi is an app designed to optimize your language learning in an intuitive and personalized way. It works as your own interactive dictionary.

#### [Client Repo here](https://github.com/somorales/words-frontend)

#### [Server Repo here](https://github.com/somorales/words-backend)

## Technologies, Libraries & APIs used

- **Frontend:** React, HTML5, CSS3, JavaScript
- **Backend:** Node.js
- **Styling:** Tailwind
- **HTTP client:** Axios
- **Deployment:** Netlify (Frontend), Render & Mongo Atlas (Backend)

# Server Structure

## Models

User model

```javascript
{
    email: {
      type: String,
      required: [true, 'Email is required.'],
      unique: true,
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      required: [true, 'Password is required.']
    },
    name: {
      type: String,
      required: [true, 'Name is required.']
    },
}
```

Word model

```javascript
{
     {
    word: {
      type: String,
      required: [true, 'word is required.'],

    },
    meaning: {
      type: String,
      required: [true, 'Meaning is required.']
    },
    translation: {
      type: String,
      required: [true, 'Translation is required.']
    },
    sentences: {
      type: Array,
      required: [true, 'Sentences is required.']
    },
    language: {
      type: String,
      required: [true, 'Lenguage is required.']
    },
   user_id: {
      type: ObjectId,
      required: [true, 'user_id is required.']
    }
     }
}
```

# API Endpoints (backend routes)

| HTTP Method | URL                        | Request Body                                               | Success Status | Error Status | Description                                                                             |
| ----------- | -------------------------- | ---------------------------------------------------------- | -------------- | ------------ | --------------------------------------------------------------------------------------- |
| **POST**    | `/words`                   | `{ word, pronunciation, meaning, translation, sentences }` | 201            | 400          | Creates a new word with its pronunciation, meaning, translation, and example sentences. |
| **GET**     | `/words`                   | n/a                                                        | 200            | 400          | Returns an array containing all words created by the user.                              |
| **GET**     | `/words/search`            | `{ query }`                                                | 200            | 400          | Searches for words using the given query term.                                          |
| **GET**     | `/words/sort`              | `{ sort_by }`                                              | 200            | 400          | Sorts words by alphabetical order, oldest, or newest.                                   |
| **GET**     | `/words/:id`               | n/a                                                        | 200            | 404          | Returns details of a specific word, including its meaning and translation.              |
| **GET**     | `/words/:id/pronunciation` | n/a                                                        | 200            | 404          | Returns the pronunciation of a word.                                                    |
| **PUT**     | `/words/:id`               | `{ word, pronunciation, meaning, translation, sentences }` | 200            | 400          | Updates the information of a specific word.                                             |
| **DELETE**  | `/words/:id`               | n/a                                                        | 200            | 404          | Deletes a word by its ID.                                                               |

## Links

### Project

[Repository Link Client](https://github.com/somorales/words-frontend)

[Repository Link Server](https://github.com/somorales/words-backend)

[Deploy Link]()

### Model Planning

[Model Planning Link](https://www.figma.com/design/WQVDchfxFC2seCF5ZRXZKc/Lexi?node-id=0-1&t=pXIPXMF0FTKgnq4G-1)
