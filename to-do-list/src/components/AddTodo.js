import React, { useState } from 'react';
import { HStack, Input, Button, useToast, Box, VStack, FormControl, FormLabel } from '@chakra-ui/react';
import { nanoid } from 'nanoid';

const AddTodoComponents = ({ todos, addTodo }) => {
  const [isFormVisible, setFormVisible] = useState(false);
  const [content, setContent] = useState('');


  const toast = useToast();

  const toggleFormVisibility = () => {
    setFormVisible(!isFormVisible);
    setContent(''); // Reset content when toggling visibility
   
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedContent = content.trim();

    if (!trimmedContent) {
      toast({
        title: 'No content',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
      return;
    }

    if (
      todos.find(
        (todo) =>
          todo.body.trim().toLowerCase() === trimmedContent.toLowerCase() ||
          todo.body.trim() === trimmedContent
      )
    ) {
      toast({
        title: 'Duplicate content',
        description: 'This task already exists in the to-do list.',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
      return;
    }

    if (!window.confirm('Are you sure you want to add this to the to-do list?')) {
      return;
    }

    const todo = {
      id: nanoid(),
      body: content,
    };

    addTodo(todo);
    toggleFormVisibility();
  };


  
  
  return (
    <Box>
      {isFormVisible ? (
        <form onSubmit={handleSubmit}>
          <VStack mt="8" align="start">
            <FormControl>
              <FormLabel>Input Task</FormLabel>
              <Input
                variant="filled"
                placeholder="Enter your task"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                onKeyPress={(e) => {
                  // Check if the pressed key is the space key and content is empty
                  if (e.key === ' ' && !content.trim()) {
                    e.preventDefault();
                  }
                }}
              />
            </FormControl>
            <HStack>
              <Button type="submit" colorScheme="cyan" px="8">
                Add Todo
              </Button>
              <Button onClick={toggleFormVisibility} colorScheme="gray" px="8">
                Cancel
              </Button>
            </HStack>
          </VStack>
        </form>
      ) : (
        <HStack mt="8">
          <Button onClick={toggleFormVisibility} colorScheme="cyan" px="8">
            Add New Task
          </Button>
        </HStack>
      )}
    </Box>
  );
};

export default AddTodoComponents;