import { useEffect, useState } from 'react';
import {  useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function User() {
  const [newUserData, setNewUserData] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    const allUsers = async () => {
      try {
        const id = localStorage.getItem("userData")
        console.log(id)
        const res = await fetch(`https://easy-gray-seahorse-shoe.cyclic.app/checkuser/${id}`);
        const res1 = await res.json();
        setNewUserData(res1.user);
      } catch (error) {
        console.log(error);
      }
    };
    allUsers();
  }, []);
  
  

  const handleUpdate = async (e) => {
    e.preventDefault();

  if (
      newUserData.name.length !== 0 &&
      newUserData.email.length !== 0 &&
      newUserData.phone.length !== 0 
    ) {
      try {
        await axios.patch(`https://easy-gray-seahorse-shoe.cyclic.app/login`, newUserData);
        localStorage.setItem('user',(newUserData.name))
        alert("Account Updeted. We've updated your account for you.");
        navigate('/');
      } catch (error) {
        console.log(error);
      }
    } else {
      alert('Please enter all fields');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-purple-900">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-4xl text-center mb-8 text-purple-900">USER</h1>
        <form className="space-y-4">
          <div>
            <label className="block text-gray-700">User Name</label>
            <input
              type="text"
              className="w-full px-4 py-2 rounded border focus:outline-none focus:border-purple-500"
              value={newUserData.name}
              onChange={(e) =>
                setNewUserData({ ...newUserData, name: e.target.value })
              }
            />
          </div>
          <div>
            <label className="block text-gray-700">Email address</label>
            <input
              type="email"
              className="w-full px-4 py-2 rounded border focus:outline-none focus:border-purple-500"
              value={newUserData.email}
              onChange={(e) =>
                setNewUserData({ ...newUserData, email: e.target.value })
              }
            />
          </div>
          <div>
            <label className="block text-gray-700">Phone number</label>
            <input
              type="tel"
              className="w-full px-4 py-2 rounded border focus:outline-none focus:border-purple-500"
              value={newUserData.phone}
              onChange={(e) =>
                setNewUserData({ ...newUserData, phone: e.target.value })
              }
            />
          </div>
          <div className="space-y-4">
            <button
              onClick={handleUpdate}
              className="w-full bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 focus:outline-none focus:shadow-outline-purple"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}