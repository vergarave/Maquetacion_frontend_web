import { Link } from 'react-router-dom'
import ToggleSwitch from '../../components/ui/ToggleSwitch.jsx'
import useRoutines from '../../context/useRoutines.js'
import lightIcon from '../../assets/routines/light.svg'
import musicIcon from '../../assets/routines/music.svg'
import addIcon from '../../assets/routines/add.svg'
import './RoutinesPage.css'

function RoutineCard({ routine, onToggle }) {
  return (
    <article className="routine-card">
      <Link
        className="routine-card__edit-link"
        to={`/rutinas/${routine.id}/editar`}
        aria-label={`Editar rutina ${routine.name}`}
      >
        <header className="routine-card__header">
          <div>
            <h2>{routine.name}</h2>
            <p>{routine.days}</p>
          </div>
        </header>

        <div className="routine-card__time">
          <strong>{routine.time}</strong>
          <span>AM</span>
        </div>

        <footer className="routine-card__footer" aria-label="Acciones de la rutina">
          <img src={lightIcon} alt="Luz" />
          <img src={musicIcon} alt="Música" />
        </footer>
      </Link>

      <ToggleSwitch
        checked={routine.enabled}
        label={`${routine.enabled ? 'Desactivar' : 'Activar'} ${routine.name}`}
        onChange={onToggle}
      />
    </article>
  )
}

function RoutinesPage() {
  const { routines, toggleRoutine } = useRoutines()

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

        <Link className="add-routine-card" to="/rutinas/nueva/editar">
          <span className="add-routine-card__icon">
            <img src={addIcon} alt="" aria-hidden="true" />
          </span>
          <span>Agregar rutina</span>
        </Link>
      </div>
    </main>
  )
}

export default RoutinesPage
