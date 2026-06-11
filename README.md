# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

# Talent Search Portal - Frontend

## Overview

Talent Search Portal Frontend is a modern web application built using React.js that allows recruiters to manage candidate information efficiently.

The application consumes REST APIs exposed by the Spring Boot backend.

---

## Features

- Dashboard
- Candidate Listing
- Candidate Search
- Add Candidate
- Update Candidate
- Delete Candidate
- Resume Upload
- Responsive UI
- API Integration

---

## Tech Stack

| Technology | Version |
|------------|----------|
| React.js | Latest |
| JavaScript | ES6+ |
| Axios | Latest |
| HTML5 | Latest |
| CSS3 | Latest |
| Bootstrap | Latest |

---

## Project Structure

src

├── components

├── pages

├── services

├── assets

└── App.js

---

## Screenshots

### Dashboard

(Add Screenshot)

### Candidate List

(Add Screenshot)

### Candidate Search

(Add Screenshot)

---

## Installation

Clone Repository

```bash
git clone <frontend-repo-url>
```

Navigate

```bash
cd talent-search-frontend
```

Install Dependencies

```bash
npm install
```

Run Application

```bash
npm start
```

Application URL

```text
http://localhost:3000
```

---

## Backend Integration

Update API URL:

```javascript
const API_URL = "http://localhost:9090/api";
```

---

## Future Enhancements

- Authentication
- Dark Mode
- Dashboard Analytics
- Candidate Resume Viewer
- Advanced Search Filters
- Notifications

---

## Author

Karthik A N

GitHub:
https://github.com/Ankarthik0011
