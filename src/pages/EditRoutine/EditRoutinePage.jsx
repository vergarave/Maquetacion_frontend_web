import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import ToggleSwitch from '../../components/ui/ToggleSwitch.jsx'
import useRoutines from '../../context/useRoutines.js'
import lightCurveIcon from '../../assets/edit-routine/light-curve.svg'
import gradientTexture from '../../assets/edit-routine/gradient-texture.svg'
import lightCurveOverlay from '../../assets/edit-routine/light-curve-overlay.svg'
import playIcon from '../../assets/edit-routine/play.svg'
import soundscapeIcon from '../../assets/edit-routine/soundscape.svg'
import selectDecoration from '../../assets/edit-routine/select-decoration.svg'
import chevronDown from '../../assets/edit-routine/chevron-down.svg'
import smartWakeIcon from '../../assets/edit-routine/smart-wake.svg'
import './EditRoutinePage.css'

const defaultNewRoutine = {
  name: 'Nueva rutina',
  days: 'Lun - Dom',
  time: '7:00',
  enabled: true,
  sunriseDuration: 30,
  sound: 'Bosque',
  soundRamp: 20,
  wakeDetection: true,
  smartSnooze: true,
  intensity: 45,
}

function SettingRange({ label, value, suffix, min, max, onChange }) {
  return (
    <label className="setting-range">
      <span className="setting-range__label">
        <span>{label}</span>
        <strong>
          {value} {suffix}
        </strong>
      </span>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
      />
    </label>
  )
}

function LightCurveSection({ duration, onDurationChange }) {
  return (
    <section className="editor-card light-curve-section">
      <header className="editor-card__header">
        <h2>
          <img src={lightCurveIcon} alt="" aria-hidden="true" />
          Light Curve
        </h2>
        <span className="editor-card__badge">{duration} min Sunrise</span>
      </header>

      <div className="light-curve-graph" aria-label="Curva de intensidad de luz">
        <img
          className="light-curve-graph__texture"
          src={gradientTexture}
          alt=""
          aria-hidden="true"
        />
        <img
          className="light-curve-graph__overlay"
          src={lightCurveOverlay}
          alt=""
          aria-hidden="true"
        />
        <div className="light-curve-graph__labels" aria-hidden="true">
          <span>0m</span>
          <span>15m</span>
          <span>30m</span>
        </div>
      </div>

      <SettingRange
        label="Sunrise Duration"
        value={duration}
        suffix="mins"
        min={0}
        max={75}
        onChange={onDurationChange}
      />
    </section>
  )
}

function SoundscapeSection({ sound, ramp, onSoundChange, onRampChange }) {
  return (
    <section className="editor-card soundscape-section">
      <h2 className="editor-card__title">
        <img src={soundscapeIcon} alt="" aria-hidden="true" />
        Soundscape
      </h2>

      <label className="sound-select">
        <span>Sonido de ambiente</span>
        <span className="sound-select__control">
          <select value={sound} onChange={(event) => onSoundChange(event.target.value)}>
            <option>Bosque</option>
            <option>Lluvia</option>
            <option>Olas</option>
          </select>
          <img
            className="sound-select__decoration"
            src={selectDecoration}
            alt=""
            aria-hidden="true"
          />
          <img
            className="sound-select__chevron"
            src={chevronDown}
            alt=""
            aria-hidden="true"
          />
        </span>
      </label>

      <SettingRange
        label="Aumento sonido"
        value={ramp}
        suffix="mins"
        min={0}
        max={30}
        onChange={onRampChange}
      />
    </section>
  )
}

function SmartWakeSection({ detection, snooze, onDetectionChange, onSnoozeChange }) {
  return (
    <section className="editor-card smart-wake-section">
      <h2 className="editor-card__title">
        <img src={smartWakeIcon} alt="" aria-hidden="true" />
        Smart Wake
      </h2>

      <div className="smart-setting">
        <span>Detección de despertar</span>
        <ToggleSwitch
          checked={detection}
          label="Detección de despertar"
          onChange={onDetectionChange}
        />
      </div>
      <div className="smart-setting">
        <span>Smart Snooze</span>
        <ToggleSwitch
          checked={snooze}
          label="Smart Snooze"
          onChange={onSnoozeChange}
        />
      </div>
    </section>
  )
}

function LivePreview({ time, intensity }) {
  const [playing, setPlaying] = useState(false)

  return (
    <aside className="live-preview">
      <header>
        <h2>Live Preview</h2>
        <button
          type="button"
          aria-label={playing ? 'Pausar vista previa' : 'Reproducir vista previa'}
          aria-pressed={playing}
          onClick={() => setPlaying((current) => !current)}
        >
          <img src={playIcon} alt="" aria-hidden="true" />
        </button>
      </header>

      <div className={`preview-stage${playing ? ' preview-stage--playing' : ''}`}>
        <div className="preview-orb" />
        <strong>{time}</strong>
      </div>

      <div className="intensity-meter">
        <div>
          <span>Intensity</span>
          <span>{intensity}%</span>
        </div>
        <div className="intensity-meter__track">
          <span style={{ width: `${intensity}%` }} />
        </div>
      </div>
    </aside>
  )
}

function EditRoutinePage() {
  const navigate = useNavigate()
  const { routineId = 'weekdays' } = useParams()
  const { routines, createRoutine, updateRoutine } = useRoutines()
  const savedRoutine = routines.find((routine) => routine.id === routineId)
  const isNewRoutine = routineId === 'nueva' || !savedRoutine
  const routine = savedRoutine ?? defaultNewRoutine
  const [sunriseDuration, setSunriseDuration] = useState(
    routine.sunriseDuration,
  )
  const [sound, setSound] = useState(routine.sound)
  const [soundRamp, setSoundRamp] = useState(routine.soundRamp)
  const [wakeDetection, setWakeDetection] = useState(routine.wakeDetection)
  const [smartSnooze, setSmartSnooze] = useState(routine.smartSnooze)
  const intensity = routine.intensity

  const saveRoutine = () => {
    const settings = {
      sunriseDuration,
      sound,
      soundRamp,
      wakeDetection,
      smartSnooze,
      intensity,
    }

    if (isNewRoutine) {
      createRoutine({ ...defaultNewRoutine, ...settings })
    } else {
      updateRoutine(routineId, settings)
    }

    navigate('/rutinas')
  }

  return (
    <main className="app-page edit-routine-page">
      <header className="edit-routine-heading">
        <h1>Editar Rutina</h1>
        <p>Crea tu rutina perfecta</p>
      </header>

      <div className="edit-routine-controls">
        <LightCurveSection
          duration={sunriseDuration}
          onDurationChange={setSunriseDuration}
        />
        <div className="settings-grid">
          <SoundscapeSection
            sound={sound}
            ramp={soundRamp}
            onSoundChange={setSound}
            onRampChange={setSoundRamp}
          />
          <SmartWakeSection
            detection={wakeDetection}
            snooze={smartSnooze}
            onDetectionChange={() => setWakeDetection((current) => !current)}
            onSnoozeChange={() => setSmartSnooze((current) => !current)}
          />
        </div>
      </div>

      <div className="preview-column">
        <LivePreview time={routine.time} intensity={intensity} />
        <button
          className="save-routine-button"
          type="button"
          onClick={saveRoutine}
        >
          Guardar Rutina
        </button>
      </div>
    </main>
  )
}

export default EditRoutinePage
