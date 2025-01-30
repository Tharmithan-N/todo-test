// import React, { useState } from 'react';
// import { Form, Input, Button, notification } from 'antd';

// const CreateTaskForm = ({ onTaskCreated }) => {
//   const [form] = Form.useForm(); // Initialize the form
//   const [loading, setLoading] = useState(false); // State to track form submission

//   const handleSubmit = async () => {
//     try {
//       setLoading(true);
//       const values = await form.validateFields(); // Ensure all validations pass before submission
//       const { title, description } = values;

//       const task = { title, description };
//       const response = await fetch('http://localhost:5000/tasks', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(task),
//       });

//       if (!response.ok) {
//         throw new Error('Failed to create task');
//       }

//       const newTask = await response.json();
//       onTaskCreated(newTask); // Pass the new task to the parent
//       form.resetFields(); // Reset form fields after submission

//       notification.success({
//         message: 'Task Created Successfully',
//         description: `The task "${newTask.title}" has been added.`,
//       });
//     } catch (error) {
//       console.error('Error creating task:', error);
//       notification.error({
//         message: 'Error',
//         description: 'Failed to create task. Please try again later.',
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Form
//       form={form}
//       layout="vertical"
//       className="mb-8"
//       onFinish={handleSubmit} // Triggers validation first
//     >
//       <h2 className="text-xl font-bold mb-4">Create New Task</h2>

//       <Form.Item
//         name="title"
//         label="Task Title"
//         rules={[
//           { required: true, message: 'Please input the task title!' },
//           { max: 100, message: 'Title must be less than 100 characters' },
//         ]}
//       >
//         <Input placeholder="Task Title" />
//       </Form.Item>

//       <Form.Item
//         name="description"
//         label="Task Description"
//         rules={[
//           { required: true, message: 'Please input the task description!' },
//           { max: 150, message: 'Description must be less than 150 characters' },
//         ]}
//       >
//         <Input.TextArea
//           placeholder="Task Description"
//           autoSize={{ minRows: 4, maxRows: 6 }}
//         />
//       </Form.Item>

//       <Form.Item>
//         <Button
//           type="primary"
//           htmlType="submit"
//           block
//           loading={loading} // Disable button while submitting
//           className="bg-blue-500 text-white hover:bg-blue-700"
//         >
//           {loading ? 'Submitting...' : 'Add Task'}
//         </Button>
//       </Form.Item>
//     </Form>
//   );
// };

// export default CreateTaskForm;


import React, { useState } from 'react';

const CreateTaskForm = ({ onTaskCreated }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission
    if (!title.trim() || !description.trim()) {
      alert('Please fill in both fields');
      return;
    }

    try {
      setLoading(true);
      const task = { title, description };
      const response = await fetch('http://localhost:5000/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(task),
      });

      if (!response.ok) {
        throw new Error('Failed to create task');
      }

      const newTask = await response.json();
      onTaskCreated(newTask);
      setTitle('');
      setDescription('');
      alert(`Task "${newTask.title}" has been added successfully!`);
    } catch (error) {
      console.error('Error creating task:', error);
      alert('Failed to create task. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8 p-4 border rounded-lg shadow-lg max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Create New Task</h2>
      
      <label className="block mb-2 font-semibold">Task Title</label>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-2 border rounded mb-4"
        placeholder="Task Title"
        maxLength={100}
        required
      />
      
      <label className="block mb-2 font-semibold">Task Description</label>
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full p-2 border rounded mb-4"
        placeholder="Task Description"
        maxLength={150}
        rows={4}
        required
      />
      
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-700"
        disabled={loading}
      >
        {loading ? 'Submitting...' : 'Add Task'}
      </button>
    </form>
  );
};

export default CreateTaskForm;
