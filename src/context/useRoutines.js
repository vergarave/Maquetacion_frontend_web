import { useContext } from 'react'
import RoutinesContext from './RoutinesContext.js'

function useRoutines() {
  const context = useContext(RoutinesContext)

  if (!context) {
    throw new Error('useRoutines must be used inside RoutinesProvider')
  }

  return context
}

export default useRoutines
