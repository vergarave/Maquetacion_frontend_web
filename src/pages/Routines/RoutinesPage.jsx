import { useState } from 'react'
import lightIcon from '../../assets/routines/light.svg'
import musicIcon from '../../assets/routines/music.svg'
import addIcon from '../../assets/routines/add.svg'
import './RoutinesPage.css'

const initialRoutines = [
  {
    id: 'weekdays',
    name: 'Entre Semana',
    days: 'Lun - Vie',
    time: '6:30',
    enabled: true,
  },
  {
    id: 'weekend',
    name: 'Fin de semana',
    days: 'Sab - Dom',
    time: '8:30',
    enabled: true,
  },
]

function RoutineSwitch({ checked, label, onChange }) {
  return (
    <button
      className={`routine-switch${checked ? ' routine-switch--checked' : ''}`}
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={onChange}
    >
      <span />
    </button>
  )
}

function RoutineCard({ routine, onToggle }) {
  return (
    <article className="routine-card">
      <header className="routine-card__header">
        <div>
          <h2>{routine.name}</h2>
          <p>{routine.days}</p>
        </div>
        <RoutineSwitch
          checked={routine.enabled}
          label={`${routine.enabled ? 'Desactivar' : 'Activar'} ${routine.name}`}
          onChange={onToggle}
        />
      </header>

      <div className="routine-card__time">
        <strong>{routine.time}</strong>
        <span>AM</span>
      </div>

      <footer className="routine-card__footer" aria-label="Acciones de la rutina">
        <img src={lightIcon} alt="Luz" />
        <img src={musicIcon} alt="Música" />
      </footer>
    </article>
  )
}

function RoutinesPage() {
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

  return (
    <main className="app-page routines-page">
      <h1>Tus rutinas</h1>

      <div className="routines-grid">
        {routines.map((routine) => (
          <RoutineCard
            routine={routine}
            onToggle={() => toggleRoutine(routine.id)}
            key={routine.id}
          />
        ))}

        <button className="add-routine-card" type="button">
          <span className="add-routine-card__icon">
            <img src={addIcon} alt="" aria-hidden="true" />
          </span>
          <span>Agregar rutina</span>
        </button>
      </div>
    </main>
  )
}

export default RoutinesPage
