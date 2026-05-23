# 🍰 Piece of Cake

Welcome to **Piece of Cake**, a dynamic and interactive full-stack web platform built using the Django framework. This project is a tailored culinary companion designed to help users seamlessly discover, manage, and customize recipes.

From a polished, modern UI to a robust database structure on the backend, this platform makes managing recipes a complete piece of cake.

---

## 🚀 Features

* **User Authentication & Accounts:** Secure signup, login, and profile management for distinct users.
* **Recipe Explorer:** Browse an extensive network of culinary ideas with deep search functionality.
* **Dynamic Recipe Management:** Registered users can effortlessly add, edit, and update their own recipe listings, complete with ingredient tallies and directions.
* **Media & Asset Management:** Dedicated support for dynamic culinary imagery uploads.
* **Modern UI/UX:** A clean, responsive design utilizing sophisticated frontend styling.

---

## 🛠️ Tech Stack & Languages

* **Backend:** Python / Django (32.5%)
* **Frontend Templating:** HTML (30.8%)
* **Styling & Aesthetics:** CSS / Custom Styles (29.8%)
* **Client-Side Interactivity:** JavaScript (6.9%)
* **Database:** SQLite3 (Development)

---

## 📁 Repository Structure

The project follows standard Django architecture patterns, cleanly separating logic, assets, and templates:

```text
├── account/            # User authentication, profiles, and account logic
├── djangoproject/      # Core project configuration files (settings, urls)
├── recipes/            # Recipe app housing core views, models, and logic
├── static/             # Static assets (CSS, JS, branding images)
├── templates/          # Global HTML templates and UI layout designs
├── media/recipes/      # User-uploaded recipe images
├── db.sqlite3          # Local development database
├── manage.py           # Django command-line utility
└── requirements.txt    # Project dependencies and packages

```

---

## ⚙️ Installation & Local Setup

To get this project up and running locally, follow these steps:

1. **Clone the Repository**
```bash
git clone https://github.com/farahibrahim776/Yarab.git
cd Yarab

```


2. **Set Up a Virtual Environment (Recommended)**
```bash
python -m venv venv
# Activate on Windows:
venv\Scripts\activate
# Activate on macOS/Linux:
source venv/bin/activate

```


3. **Install Dependencies**
```bash
pip install -r requirements.txt

```


4. **Run Database Migrations**
```bash
python manage.py migrate

```


5. **Start the Development Server**
```bash
python manage.py runserver

```


Open your browser and navigate to `http://127.0.0.1:8000/`.

---

A special thanks to the team members who contributed to building, styling, and refining this project through its development phases.
