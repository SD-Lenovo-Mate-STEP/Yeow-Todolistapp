import { VStack, Box, Heading } from '@chakra-ui/react';
import TodoComponents from './components/Todo';
import AddTodoComponents from './components/AddTodo';
import EditTodoModalComponents from './components/EditModal'; 
import './App.css';

import { useState, useEffect } from 'react';

function App() {
  const [todos, setTodos] = useState(() => JSON.parse(localStorage.getItem('todos')) || []);
  const [isEditing, setIsEditing] = useState(false);
  const [editTodoId, setEditTodoId] = useState(null);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  function deleteTodo(id) {
    const newTodos = todos.filter((todo) => {
      return todo.id !== id;
    });

    setTodos(newTodos);
  }

  function addTodo(todo) {
    setTodos([...todos, todo]);
  }

  function editTodo(id) {
    setEditTodoId(id);
    setIsEditing(true);
  }

  return (
    
      <VStack p='4' borderRadius='md' >
      <Box>
        <Heading mb='8' fontWeight='extrabold' size='2xl' bgGradient='linear(to-r, cyan.400, purple.400, pink.400)' bgClip='text'>TO-DO-LIST-APP </Heading>
      </Box>

      <TodoComponents todos={todos} deleteTodo={deleteTodo} editTodo={editTodo} />

      <AddTodoComponents todos={todos} addTodo={addTodo} />

      <EditTodoModalComponents
        isOpen={isEditing && editTodoId !== null}
        onClose={() => setIsEditing(false)}
        onSave={(updatedTask) => {
          const updatedTodos = todos.map((todo) =>
            todo.id === editTodoId ? { ...todo, body: updatedTask } : todo
          );
          setTodos(updatedTodos);
          setIsEditing(false);
        }}
        initialTask={todos.find((todo) => todo.id === editTodoId)?.body || ''}
      />
    </VStack>
  );
}

export default App;