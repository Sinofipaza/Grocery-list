document.addEventListener('DOMContentLoaded', function() {
    const todoForm = document.getElementById('todo-form');
    const todoInput = document.getElementById('todo-input');
    const todoList = document.getElementById('todo-list');
    const emptyState = document.getElementById('empty-state');
    
    let todos = JSON.parse(localStorage.getItem('todos')) || [];
    renderTodos();
    
    todoForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const todoText = todoInput.value.trim();
        if (todoText === '') return;
        
        const newTodo = {
            id: Date.now(),
            text: todoText,
            completed: false
        };
        
        todos.push(newTodo);
        saveTodos();
        renderTodos();
        
        todoInput.value = '';
    });
    
    todoList.addEventListener('click', function(e) {
        if (e.target.classList.contains('checkbox')) {
            const todoId = parseInt(e.target.closest('.todo-item').dataset.id);
            toggleTodo(todoId);
        }
    });
    
    todoList.addEventListener('click', function(e) {
        if (e.target.classList.contains('delete-btn')) {
            const todoId = parseInt(e.target.closest('.todo-item').dataset.id);
            deleteTodo(todoId);
        }
    });
    
    function toggleTodo(id) {
        todos = todos.map(todo => {
            if (todo.id === id) {
                return { ...todo, completed: !todo.completed };
            }
            return todo;
        });
        
        saveTodos();
        renderTodos();
    }
    
    function deleteTodo(id) {
        todos = todos.filter(todo => todo.id !== id);
        saveTodos();
        renderTodos();
    }
    
    function saveTodos() {
        localStorage.setItem('todos', JSON.stringify(todos));
    }
    
    // Render todos to the DOM
    function renderTodos() {
        todoList.innerHTML = '';
        
        if (todos.length === 0) {
            emptyState.style.display = 'block';
        } else {
            emptyState.style.display = 'none';
            
            todos.forEach(todo => {
                const todoItem = document.createElement('li');
                todoItem.classList.add('todo-item');
                if (todo.completed) {
                    todoItem.classList.add('completed');
                }
                todoItem.dataset.id = todo.id;
                
                todoItem.innerHTML = `
                    <div class="checkbox-container">
                        <input type="checkbox" class="checkbox" ${todo.completed ? 'checked' : ''}>
                    </div>
                    <span class="todo-text">${todo.text}</span>
                    <button class="delete-btn">×</button>
                `;
                
                todoList.appendChild(todoItem);
            });
        }
    }
});