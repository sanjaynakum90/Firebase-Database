
<img width="1920" height="869" alt="image" src="https://github.com/user-attachments/assets/c7ecaafb-be96-4a62-9537-441ef3464a08" />

---

# 🔥 Firebase User Manager (React + Redux Toolkit)

A simple **User Management CRUD application** built with **React**, **Redux Toolkit**, **Firebase Firestore**, and **Vite**.
This project demonstrates how to add, view, edit, delete, and search users in real time using Firebase as a backend.

---



## ✨ Features

* ➕ Add new users (Name & optional Email)
* ✏️ Edit existing users
* 🗑️ Delete users
* 🔍 Search users by name or email
* 🔄 Real-time Firestore updates
* 📦 Centralized state management using Redux Toolkit
* ⚡ Fast development setup with Vite

---

## 🖼️ Screenshots

### User Manager UI

![User Manager UI](./screenshots/user-manager-ui.png)

### Firebase Firestore Database

![Firestore Database](./screenshots/firestore-users.png)

> *(You can place screenshots inside a `screenshots/` folder and update paths accordingly.)*

---

## 🛠️ Tech Stack

* **Frontend:** React, Vite
* **State Management:** Redux Toolkit
* **Backend / Database:** Firebase Firestore
* **Styling:** CSS
* **Tooling:** ESLint, npm

---

## 📂 Project Structure

```bash
src/
├── assets/
├── Components/
├── Features/
│   └── User/
│       └── userSlice.js
├── Firebase/
│   └── config.js
├── Store/
├── App.jsx
├── main.jsx
├── App.css
├── index.css
```

---

## 🔥 Firebase Setup

1. Create a project in **Firebase Console**

2. Enable **Firestore Database**

3. Create a collection named `users`

4. Add the following fields to documents:

   ```json
   {
     "name": "sanjay",
     "email": "sanjay@gmail.com"
   }
   ```

5. Create a `.env` file in the root directory:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

---
## 🧠 Redux Logic

* All user-related operations are handled inside `userSlice.js`
* Async actions interact directly with Firestore
* State stays in sync with real-time database changes

---

## 📌 Future Improvements

* ✅ Firebase Authentication
* 📄 Pagination
* 🧪 Unit & integration tests
* 🎨 UI improvements with Tailwind or Material UI
* 🔐 Role-based access control

---

## 🤝 Contributing

Contributions are welcome!
Feel free to fork the repo, open issues, or submit pull requests.

---


If you want, I can also:

* Add **badges** (Vite, Firebase, Redux)
* Write a **short README version**
* Optimize it for **recruiter portfolios**
* Create a **screenshots folder structure**


