import React, { useState, useEffect } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Textarea,
} from '@chakra-ui/react';

const EditTodoModalComponents = ({ isOpen, onClose, onSave, initialTask }) => {
  const [editedTask, setEditedTask] = useState(initialTask);

  // Update the editedTask state when the initialTask prop changes
  useEffect(() => {
    setEditedTask(initialTask);
  }, [initialTask]);

  const handleSave = () => {
    onSave(editedTask);
    onClose();
  };


  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Task</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
        <Textarea
  value={editedTask}
  onChange={(e) => setEditedTask(e.target.value)}
  onKeyDown={(e) => {
    // Check if the pressed key is Enter or Space
    if (e.key === 'Enter' || (e.key === ' ' && !editedTask.trim())) {
      e.preventDefault();
    }
  }}
/>

        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleSave}>
            Save
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EditTodoModalComponents;
