import React, { useEffect, useState } from 'react';
import EventCard from './EventCard';

const Events = () => {
  const [events, setEvents] = useState([])
  const fetchData = async () => {
    const token = localStorage.getItem("token")
    await fetch("https://easy-gray-seahorse-shoe.cyclic.app/events", {
      method: "GET",
      headers: {
        "content-type": "application/json",
        "Authorization": `Bearer ${token}`
      },
    })
      .then((res) => res.json())
      .then((res) => setEvents(res.events))
  }
  events.sort((a, b) => {
    return new Date(a.startTime) - new Date(b.startTime);
  });
  useEffect(() => {
    fetchData();

  }, [])

  const handleDelete = async (_id) => {
    try {
      const token = localStorage.getItem("token")
      await fetch(`https://easy-gray-seahorse-shoe.cyclic.app/events/${_id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${token}`
        },
      });

      alert('Event Deleted successfully');
      fetchData();


    } catch (error) {
      console.error('Error Deleting Event', error.message);
    }

  };

  const handleCompleted = async (_id, status) => {
    if (status === false) {
      try {
        const token = localStorage.getItem("token")
        await fetch(`https://easy-gray-seahorse-shoe.cyclic.app/events/${_id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${token}`
          },

          body: JSON.stringify({ status: true }),
        });
        fetchData();


      } catch (error) {
        console.error('Error Updating Event', error.message);
      }
    } else {
      try {
        const token = localStorage.getItem("token")
        await fetch(`https://easy-gray-seahorse-shoe.cyclic.app/events/${_id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${token}`
          },

          body: JSON.stringify({ status: false }),
        });
        fetchData();


      } catch (error) {
        console.error('Error Updating Event', error.message);
      }
    }
  };

  return (
    <div className="min-h-screen bg-purple-900">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {events?.map((event) => (
          <EventCard
            key={event._id}
            _id={event._id}
            title={event.title}
            status={event.status}
            description={event.description}
            startTime={event.startTime}
            endTime={event.endTime}
            onDelete={handleDelete}
            onCompleted={handleCompleted}
            event={event}
          />
        ))}
      </div>

    </div>
  );
};

export default Events;
