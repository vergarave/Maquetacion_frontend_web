import { useState } from 'react'
import './ProfilePage.css'

function SunriseMark({ small = false }) {
  return (
    <span className={`profile-sun${small ? ' profile-sun--small' : ''}`} aria-hidden="true">
      ☼
    </span>
  )
}

function Toggle({ checked, onChange, label }) {
  return (
    <button
      className={`profile-toggle${checked ? ' profile-toggle--on' : ''}`}
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

function Device({ type, name, lastSeen }) {
  return (
    <article className="device-pill">
      <span className="device-pill__icon" aria-hidden="true">{type}</span>
      <span>
        <strong>{name}</strong>
        <small>{lastSeen}</small>
      </span>
    </article>
  )
}

function ProfilePage() {
  const [name, setName] = useState('Nombre Apellido')
  const [email, setEmail] = useState('ejemplo@example.com')
  const [morningNotifications, setMorningNotifications] = useState(true)
  const [ambientSounds, setAmbientSounds] = useState(true)
  const [temperatureUnit, setTemperatureUnit] = useState('c')
  const [saved, setSaved] = useState(false)

  const saveProfile = (event) => {
    event.preventDefault()
    setSaved(true)
  }

  return (
    <main className="app-page profile-page">
      <div className="profile-content">
        <h1>Perfil</h1>

        <div className="profile-grid">
          <div className="profile-grid__identity">
            <section className="profile-card identity-card" aria-label="Información de perfil">
              <SunriseMark />
              <h2>{name || 'Nombre Apellido'}</h2>
              <p>{email || 'ejemplo@example.com'}</p>
            </section>

            <section className="profile-card details-card" aria-labelledby="details-title">
              <h2 id="details-title"><span aria-hidden="true">♙</span> Detalles personales</h2>
              <form onSubmit={saveProfile}>
                <label>
                  Nombre Completo
                  <input value={name} onChange={(event) => { setName(event.target.value); setSaved(false) }} />
                </label>
                <label>
                  E-mail
                  <input type="email" value={email} onChange={(event) => { setEmail(event.target.value); setSaved(false) }} />
                </label>
                <button className="save-profile" type="submit">{saved ? 'Cambios guardados' : 'Guardar cambios'}</button>
              </form>
            </section>
          </div>

          <div className="profile-grid__settings">
            <section className="profile-card devices-card" aria-labelledby="devices-title">
              <h2 id="devices-title"><span aria-hidden="true">▣</span> Dispositivos conectados</h2>
              <div className="devices-list">
                <Device type="▯" name="iPhone 15 Pro" lastSeen="Hace 15 minutos" />
                <Device type="▰" name={<>MacBook Pro<br />M2</>} lastSeen="Hace 45 minutos" />
              </div>
            </section>

            <section className="profile-card preferences-card" aria-labelledby="preferences-title">
              <h2 id="preferences-title"><span aria-hidden="true">☷</span> Preferencias</h2>
              <div className="preference-row">
                <span>Notificaciones en la mañana</span>
                <Toggle checked={morningNotifications} onChange={() => setMorningNotifications((value) => !value)} label="Notificaciones en la mañana" />
              </div>
              <div className="preference-row preference-row--description">
                <span><strong>Sonidos de ambiente</strong><small>Reproduce tonos ambientales durante la transición.</small></span>
                <Toggle checked={ambientSounds} onChange={() => setAmbientSounds((value) => !value)} label="Sonidos de ambiente" />
              </div>
              <div className="preference-row temperature-row">
                <span><strong>Unidades temperatura</strong><small>Personalización termómetro</small></span>
                <label
                  className={`temperature-switch temperature-switch--${temperatureUnit}`}
                >
                  <input
                    type="checkbox"
                    role="switch"
                    checked={temperatureUnit === 'f'}
                    aria-label={`Unidad de temperatura: grados ${temperatureUnit === 'c' ? 'Celsius' : 'Fahrenheit'}`}
                    onChange={(event) => setTemperatureUnit(event.target.checked ? 'f' : 'c')}
                  />
                  <span className="temperature-switch__option">°C</span>
                  <span className="temperature-switch__option">°F</span>
                </label>
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  )
}

export default ProfilePage
