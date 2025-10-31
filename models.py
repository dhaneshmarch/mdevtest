import sqlite3
import os

DATABASE = 'database.db'

def get_db_connection():
    conn = sqlite3.connect(DATABASE)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    conn = get_db_connection()
    
    # Create tasks table
    conn.execute('''
        CREATE TABLE IF NOT EXISTS tasks (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            description TEXT,
            status TEXT DEFAULT 'Pending'
        )
    ''')
    
    # Check if we need to seed data
    existing_tasks = conn.execute('SELECT COUNT(*) FROM tasks').fetchone()[0]
    
    if existing_tasks == 0:
        # Seed some initial data
        sample_tasks = [
            ('Learn Flask', 'Complete Flask tutorial and build a simple app', 'Pending'),
            ('Setup Database', 'Create SQLite database with proper schema', 'Done'),
            ('Write Tests', 'Add unit tests for all API endpoints', 'Pending'),
            ('Deploy App', 'Deploy the application to production server', 'Pending')
        ]
        
        for task in sample_tasks:
            conn.execute(
                'INSERT INTO tasks (title, description, status) VALUES (?, ?, ?)',
                task
            )
    
    conn.commit()
    conn.close()

if __name__ == '__main__':
    init_db()
    print("Database initialized successfully!")
