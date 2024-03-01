import React, { createContext, useState } from 'react'
export const EventContext=createContext()
export const EventContexProvider = ({children}) => {
  const [event, setEvent] = useState({})
  const addEvent=(payload)=>{
    setEvent(payload)
  }
  const deleteEvent=()=>{
    setEvent({})
  }
  return (
    <EventContext.Provider value={{addEvent,deleteEvent,event,setEvent}}>
      {children}
    </EventContext.Provider>
  )
}
