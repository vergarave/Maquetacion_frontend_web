import { useState } from 'react'
import RoutinesContext from './RoutinesContext.js'

const initialRoutines = [
  {
    id: 'weekdays',
    name: 'Entre Semana',
    days: 'Lun - Vie',
    time: '6:30',
    enabled: true,
    sunriseDuration: 30,
    sound: 'Bosque',
    soundRamp: 20,
    wakeDetection: true,
    smartSnooze: true,
    intensity: 45,
  },
  {
    id: 'weekend',
    name: 'Fin de semana',
    days: 'Sab - Dom',
    time: '8:30',
    enabled: true,
    sunriseDuration: 30,
    sound: 'Bosque',
    soundRamp: 20,
    wakeDetection: true,
    smartSnooze: true,
    intensity: 45,
  },
]

function RoutinesProvider({ children }) {
  const [routines, setRoutines] = useState(initialRoutines)

  const toggleRoutine = (id) => {
    setRoutines((current) =>
      current.map((routine) =>
        routine.id === id
          ? { ...routine, enabled: !routine.enabled }
          : routine,
      ),
    )
  }

  const updateRoutine = (id, changes) => {
    setRoutines((current) =>
      current.map((routine) =>
        routine.id === id ? { ...routine, ...changes } : routine,
      ),
    )
  }

  const createRoutine = (routine) => {
    const id = `custom-${Date.now()}`
    setRoutines((current) => [...current, { ...routine, id }])
    return id
  }

  return (
    <RoutinesContext.Provider
      value={{ routines, toggleRoutine, updateRoutine, createRoutine }}
    >
      {children}
    </RoutinesContext.Provider>
  )
}

export default RoutinesProvider
