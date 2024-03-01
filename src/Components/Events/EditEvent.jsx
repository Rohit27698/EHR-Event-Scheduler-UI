import React, {  useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { EventContext } from '../../context/EventContexProvider';
import { Input } from '@chakra-ui/react';

const EditEvent = () => {
  const {setEvent ,event}=useContext(EventContext)
  const nav = useNavigate();

  const handleInputChange = (e) => {
    setEvent({
      ...event,
      [e.target.name]: e.target.value,
    });
  };

  const handleCheckboxChange = (e) => {
    setEvent({
      ...event,
      [e.target.name]: e.target.checked,
    });
  };

  const handleUpdateEvent = async () => {
    try {
      const token = localStorage.getItem("token")
      await fetch(`https://easy-gray-seahorse-shoe.cyclic.app/events/${event._id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          "Authorization" : `Bearer ${token}`
        },
       
        body: JSON.stringify({status:event.status,title:event.title,description:event.description,endTime:event.endTime,startTime:event.startTime}),

      });
      nav('/event')

    } catch (error) {
      console.error('Error Updating Event', error.message);
    }
  };

  return (
    <div className="min-h-screen  justify-center bg-purple-900 p-20">
         <div className="max-w-md mx-auto mt-auto p-6 bg-neutral-200 rounded-md shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Edit Event</h2>
      <form>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">
            Title:
          </label>
          <input
            type="text"
            name="title"
            value={event.title}
            onChange={handleInputChange}
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">
            Description:
          </label>
          <textarea
            id="description"
            name="description"
            value={event.description}
            onChange={handleInputChange}
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
            value={event.startTime}
            onChange={handleInputChange}
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
            value={event.endTime}
            onChange={handleInputChange}
          />

        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">
            Status:
          </label>
          <input
            type="checkbox"
            name="status"
            checked={event.status}
            onChange={handleCheckboxChange}
            className="mt-1 p-2"
          />
        </div>
        <button
          type="button"
          onClick={handleUpdateEvent}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Update Event
        </button>
      </form>
    </div>

    </div>
   
  );
};

export default EditEvent;
