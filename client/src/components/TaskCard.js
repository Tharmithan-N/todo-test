import React, { useState } from 'react';
import { Button, notification, Card, Modal } from 'antd';

const TaskCard = ({ task, onTaskCompleted }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleComplete = () => {
    setIsModalVisible(false);

    fetch(`http://localhost:5000/tasks/${task.id}/complete`, {
      method: 'PUT',
    })
      .then((response) => response.json())
      .then(() => {
        notification.success({
          message: 'Task Completed',
          description: `The task "${task.title}" has been marked as completed.`,
        });

        onTaskCompleted(task.id); // Remove task from the list
      })
      .catch((error) => {
        console.error('Error marking task as completed:', error);
        notification.error({
          message: 'Error',
          description: 'There was an issue completing the task. Please try again later.',
        });
      });
  };

  return (
    <Card className="task-card" bordered={false} style={{ marginBottom: '20px' }}>
      <h3 className="font-semibold text-lg">{task.title}</h3>
      <p>{task.description}</p>
      <div className="mt-4">
        <Button type="primary" onClick={showModal} style={{ width: '100%' }}>
          Mark as Done
        </Button>
      </div>

      <Modal
        title="Confirm Task Completion"
        visible={isModalVisible}
        onOk={handleComplete}
        onCancel={handleCancel}
        okText="Yes"
        cancelText="No"
      >
        <p>Are you sure you want to mark the task "{task.title}" as completed?</p>
      </Modal>
    </Card>
  );
};

export default TaskCard;
