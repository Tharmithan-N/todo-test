// import React, { useState } from 'react';
// import { Button, notification, Card, Modal } from 'antd';

// const TaskCard = ({ task, onTaskCompleted }) => {
//   const [isModalVisible, setIsModalVisible] = useState(false);

//   const showModal = () => {
//     setIsModalVisible(true);
//   };

//   const handleCancel = () => {
//     setIsModalVisible(false);
//   };

//   const handleComplete = () => {
//     setIsModalVisible(false);

//     fetch(`http://localhost:5000/tasks/${task.id}/complete`, {
//       method: 'PUT',
//     })
//       .then((response) => response.json())
//       .then(() => {
//         notification.success({
//           message: 'Task Completed',
//           description: `The task "${task.title}" has been marked as completed.`,
//         });

//         onTaskCompleted(task.id); // Remove task from the list
//       })
//       .catch((error) => {
//         console.error('Error marking task as completed:', error);
//         notification.error({
//           message: 'Error',
//           description: 'There was an issue completing the task. Please try again later.',
//         });
//       });
//   };

//   return (
//     <Card className="task-card" bordered={false} style={{ marginBottom: '20px' }}>
//       <h3 className="font-semibold text-lg">{task.title}</h3>
//       <p>{task.description}</p>
//       <div className="mt-4">
//         <Button type="primary" onClick={showModal} style={{ width: '100%' }}>
//           Mark as Done
//         </Button>
//       </div>

//       <Modal
//         title="Confirm Task Completion"
//         visible={isModalVisible}
//         onOk={handleComplete}
//         onCancel={handleCancel}
//         okText="Yes"
//         cancelText="No"
//       >
//         <p>Are you sure you want to mark the task "{task.title}" as completed?</p>
//       </Modal>
//     </Card>
//   );
// };

// export default TaskCard;


import React, { useState } from 'react';

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
        alert(`Task "${task.title}" has been marked as completed.`);
        onTaskCompleted(task.id); // Remove task from the list
      })
      .catch((error) => {
        console.error('Error marking task as completed:', error);
        alert('There was an issue completing the task. Please try again later.');
      });
  };

  return (
    <div className="task-card" style={{ border: '1px solid #ccc', padding: '15px', marginBottom: '20px', borderRadius: '5px' }}>
      <h3 style={{ fontWeight: 'bold', fontSize: '18px' }}>{task.title}</h3>
      <p>{task.description}</p>
      <div style={{ marginTop: '15px' }}>
        <button onClick={showModal} style={{ width: '100%', padding: '10px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
          Mark as Done
        </button>
      </div>

      {isModalVisible && (
        <div className="modal" style={{ position: 'fixed', top: '0', left: '0', width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div className="modal-content" style={{ background: 'white', padding: '20px', borderRadius: '5px', textAlign: 'center' }}>
            <h4>Confirm Task Completion</h4>
            <p>Are you sure you want to mark the task "{task.title}" as completed?</p>
            <button onClick={handleComplete} style={{ marginRight: '10px', padding: '8px 16px', backgroundColor: 'green', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Yes</button>
            <button onClick={handleCancel} style={{ padding: '8px 16px', backgroundColor: 'red', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>No</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskCard;
