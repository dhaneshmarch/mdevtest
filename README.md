# Todo List App - Debugging Challenge

This is a full-stack Todo List application built with Flask (Python), SQLite, and Vanilla JavaScript. The app allows users to create, read, update, and delete tasks through a RESTful API.

## Features

- Add new tasks with title, description, and status
- View all tasks in a clean interface
- Edit existing tasks
- Delete tasks
- RESTful API endpoints for all CRUD operations
- SQLite database with pre-seeded sample data

## Tech Stack

- **Backend**: Python Flask
- **Database**: SQLite
- **Frontend**: HTML, CSS, Vanilla JavaScript
- **API**: RESTful endpoints using fetch()

## Setup Instructions

### Prerequisites
- Python 3.7 or higher
- pip (Python package installer)

### Installation

1. **Clone or download this repository**

2. **Create a virtual environment**
   ```bash
   python -m venv venv
   ```

3. **Activate the virtual environment**
   
   On macOS/Linux:
   ```bash
   source venv/bin/activate
   ```
   
   On Windows:
   ```bash
   venv\Scripts\activate
   ```

4. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

5. **Initialize the database**
   ```bash
   python models.py
   ```

6. **Run the application**
   ```bash
   python app.py
   ```
   
   Or alternatively:
   ```bash
   flask run
   ```

7. **Open your browser**
   Navigate to `http://127.0.0.1:5000` to use the application.

## API Endpoints

- `GET /` - Serve the main HTML page
- `GET /api/tasks` - Get all tasks
- `POST /api/tasks` - Create a new task
- `PUT /api/tasks/<id>` - Update an existing task
- `DELETE /api/tasks/<id>` - Delete a task

## Project Structure

```
├── app.py              # Main Flask application
├── models.py           # Database models and initialization
├── database.db         # SQLite database (created automatically)
├── requirements.txt    # Python dependencies
├── templates/
│   └── index.html     # Main HTML template
├── static/
│   ├── style.css      # CSS styling
│   └── script.js      # JavaScript frontend logic
└── README.md          # This file
```

## Debugging Challenge

**⚠️ IMPORTANT: This application contains intentional bugs for debugging assessment purposes.**

### Instructions for Candidates

You have **90 minutes** to find and fix as many issues as possible in this codebase. The bugs are realistic issues that could occur in a real development environment and span multiple layers:

- Backend API issues
- Database operations
- Frontend JavaScript problems
- Integration between frontend and backend
- HTTP methods and status codes
- Data validation and error handling

### Your Task

1. **Setup the application** following the instructions above
2. **Test the functionality** - try to add, view, edit, and delete tasks
3. **Identify bugs** when things don't work as expected
4. **Fix the issues** you find
5. **Document your fixes** in a file called `FIXES.md`

### Documentation Format

Create a `FIXES.md` file and document each bug you fix using this format:

```markdown
## Bug #1: [Brief Description]
**Location**: [File name and line number]
**Issue**: [What was wrong]
**Fix**: [What you changed]
**Impact**: [How this affected functionality]
```

### Evaluation Criteria

- Number of bugs identified and fixed
- Quality of fixes (proper solutions vs. quick hacks)
- Understanding of the root cause
- Clear documentation of changes
- Code quality and best practices

Good luck! Remember to test your fixes to ensure they work correctly.

## Expected Functionality (When Working Correctly)

- Tasks should load automatically when the page opens
- Adding a new task should immediately show it in the list
- Editing a task should update it in place
- Deleting a task should remove it from the list
- All operations should work without page refreshes
- Error messages should display for failed operations
