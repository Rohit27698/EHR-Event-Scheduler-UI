import React, { useEffect, useState } from 'react';
import Calender from './Calender';
import DateTimeDisplay from './DateAndTImeDisplay';

export default function Dashboard() {
  const [events, setEvents] = useState([]);
  
  const fetchData = async () => {
    await fetch("https://easy-gray-seahorse-shoe.cyclic.app/allEvents/data")
    .then((res) => res.json())
    .then((res) => setEvents(res.events));
  }

  useEffect(() => {
    fetchData();
  }, []);
  

  // Sorting events by start time
  const sortedEvents = [...events].sort((a, b) => new Date(a.startTime) - new Date(b.startTime));

  return (
    <div className="flex flex-col md:flex-row bg-purple-900 ">
      {/* Calendar */}
      <div className="md:w-1/2 p-4">
        <Calender />
      </div>

      {/* Event list */}
      <div className="md:w-1/2  p-2 overflow-auto min h-screen" style={{ maxHeight: 'calc(100vh - 80px)' }}>
        <ul className="divide-y divide-gray-200" style={{ height: '100%' }}>
          {sortedEvents.map((event) => (
            <li key={event._id} className="py-2">
              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="px-2 py-3 sm:px-4">
                  <div className="flex justify-between">
                    <h3 className="text-base font-semibold leading-5 text-gray-900">{event.title}</h3>
                    <p className="text-xs text-gray-500">{event.creator_name}</p>
                  </div>
                  <p className="mt-1 max-w-xs text-xs text-gray-500">{event.description}</p>
                </div>
                <div className="border-t border-gray-200 px-2 py-2 sm:px-4">
                  <dl className="grid grid-cols-2 gap-x-2 gap-y-4 sm:grid-cols-2">
                    <div className="sm:col-span-1">
                      <dt className="text-xs font-medium text-gray-500">Start Time</dt>
                      <dd className="mt-1 text-xs text-gray-900"><DateTimeDisplay dateTime={event.startTime} /></dd>
                    </div>
                    <div className="sm:col-span-1">
                      <dt className="text-xs font-medium text-gray-500">Status</dt>
                      <dd className="mt-1 text-xs text-gray-900">{event.status ? '✔️' : '⏱️'}</dd>
                    </div>
                  </dl>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
