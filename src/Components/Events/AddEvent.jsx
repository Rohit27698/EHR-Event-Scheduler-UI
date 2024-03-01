import { Input } from '@chakra-ui/react';
import { useContext, useState } from 'react';
// import axios from 'axios'; 
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContextProvider';





const AddEvent = () => {
  const {user}=useContext(AuthContext)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: false,
    startTime: '',
    endTime: "",
    creator_name:user
  });
  const nav = useNavigate()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();


    try {
      const token = localStorage.getItem("token")
      await fetch('https://easy-gray-seahorse-shoe.cyclic.app/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(formData),
      });

      alert('Event added successfully');

      setFormData({
        title: '',
        description: '',
        startTime: "",
        endTime: ""

      });

      nav("/event")
    } catch (error) {
      console.error('Error adding Event', error.message);
    }

  };

  return (
    <div className="min-h-screen p-20 justify-center bg-purple-900" >
      <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-neutral-200 p-8 rounded-md shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Add Event</h2>
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700 text-sm font-medium mb-2">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full border rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-700 text-sm font-medium mb-2">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows="4"
            className="w-full border rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
          ></textarea>
        </div>

        <div className="mb-4">
          <label htmlFor="startTime" className="block text-gray-700 text-sm font-medium mb-2">
            Start Time
          </label>
          <Input
            placeholder="Select Date and Time"
            size="md"
            type="datetime-local"
            name="startTime"
            value={formData.startTime}
            onChange={handleChange}
          />

        </div>
        <div className="mb-4">
          <label htmlFor="endTime" className="block text-gray-700 text-sm font-medium mb-2">
            End Time
          </label>
          <Input
            placeholder="Select Date and Time"
            size="md"
            type="datetime-local"
            name="endTime"
            value={formData.endTime}
            onChange={handleChange}
          />

        </div>



        <button
          type="submit"
          className="w-full bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 focus:outline-none focus:shadow-outline-purple mt-10"
        >
          Add Event
        </button>
      </form>
    </div>
  );
};

export default AddEvent;
