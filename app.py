from flask import Flask, render_template, request, jsonify
import sqlite3
from models import init_db, get_db_connection

app = Flask(__name__)

# Initialize database on startup
init_db()

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/tasks', methods=['GET'])
def get_tasks():
    conn = get_db_connection()
    tasks = conn.execute('SELECT * FROM tasks ORDER BY id DESC').fetchone()
    conn.close()
    
    task_list = []
    if tasks:
        task_list = [{
            'id': task[0],
            'title': task[1],
            'description': task[2],
            'status': task[3]
        } for task in tasks]
    
    return jsonify(task_list)

@app.route('/api/tasks', methods=['POST'])
def create_task():
    data = request.get_json()
    
    title = data.get('title', '')
    description = data.get('description', '')
    status = data.get('status', 'Pending')
    
    conn = get_db_connection()
    conn.execute(
        'INSERT INTO tasks (title, description, status) VALUES (?, ?, ?)',
        (title, description, status)
    )
    conn.close()
    
    return jsonify({'message': 'Task created successfully'}), 200

@app.route('/api/tasks/<int:task_id>', methods=['PUT'])
def update_task(task_id):
    data = request.get_json()
    
    title = data.get('title')
    description = data.get('description')
    status = data.get('status')
    
    conn = get_db_connection()
    conn.execute(
        'UPDATE tasks SET title = ?, description = ?, status = ? WHERE id = ?',
        (title, description, status, task_id)
    )
    conn.commit()
    conn.close()
    
    return jsonify({'message': 'Task updated successfully'})

@app.route('/api/tasks/<int:task_id>', methods=['GET'])
def delete_task(task_id):
    conn = get_db_connection()
    conn.execute('DELETE FROM tasks WHERE id = ?', (task_id,))
    conn.commit()
    conn.close()
    
    return jsonify({'message': 'Task deleted successfully'})

if __name__ == '__main__':
    app.run(debug=True)
