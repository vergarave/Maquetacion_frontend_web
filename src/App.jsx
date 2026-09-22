import { useState } from 'react'
import dashboardIcon from './assets/dashboard/dashboard.svg'
import routinesIcon from './assets/dashboard/routines.svg'
import homeIcon from './assets/dashboard/home.svg'
import profileIcon from './assets/dashboard/profile.svg'
import logoutIcon from './assets/dashboard/logout.svg'
import chartHeadingIcon from './assets/dashboard/chart-heading.svg'
import wakeChart from './assets/dashboard/wake-chart.svg'
import rhythmIcon from './assets/dashboard/insight-rhythm.svg'
import snoozeIcon from './assets/dashboard/insight-snooze.svg'
import './App.css'

const navigation = [
  { label: 'Dashboard', icon: dashboardIcon, active: true },
  { label: 'Rutinas', icon: routinesIcon },
  { label: 'Hogar', icon: homeIcon },
  { label: 'Perfil', icon: profileIcon },
]

function SideNavigation() {
  return (
    <aside className="side-navigation" aria-label="Navegacion principal">
      <div className="brand">
        <div className="brand__mark" aria-hidden="true">
          <span className="material-symbols">wb_sunny</span>
        </div>
        <span className="brand__name">Amanecer</span>
      </div>

      <nav className="nav-links">
        {navigation.map((item) => (
          <button
            className={`nav-link${item.active ? ' nav-link--active' : ''}`}
            type="button"
            key={item.label}
            aria-current={item.active ? 'page' : undefined}
          >
            <img src={item.icon} alt="" aria-hidden="true" />
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      <button className="nav-link nav-link--logout" type="button">
        <img src={logoutIcon} alt="" aria-hidden="true" />
        <span>Logout</span>
      </button>
    </aside>
  )
}

function WakeUpChart() {
  const [range, setRange] = useState('month')

  return (
    <section className="chart-card" aria-labelledby="wake-up-title">
      <header className="chart-card__header">
        <div>
          <div className="chart-card__title-row">
            <img src={chartHeadingIcon} alt="" aria-hidden="true" />
            <h2 id="wake-up-title">Wake-up Times</h2>
          </div>
          <p>Over the last 30 days</p>
        </div>

        <div className="range-toggle" aria-label="Rango del grafico">
          <button
            className={range === 'month' ? 'is-active' : ''}
            type="button"
            onClick={() => setRange('month')}
          >
            Month
          </button>
          <button
            className={range === 'week' ? 'is-active' : ''}
            type="button"
            onClick={() => setRange('week')}
          >
            Week
          </button>
        </div>
      </header>

      <div className="chart-area">
        <div className="chart-y-labels" aria-hidden="true">
          <span>8:00 AM</span>
          <span>7:00 AM</span>
          <span>6:00 AM</span>
        </div>
        <div className="chart-plot">
          <img src={wakeChart} alt="Grafico de horas de despertar de los ultimos 30 dias" />
          <div className="chart-x-labels" aria-hidden="true">
            <span>Oct 1</span>
            <span>Oct 15</span>
            <span>Today</span>
          </div>
        </div>
      </div>
    </section>
  )
}

function ConsistencyCard() {
  return (
    <section className="consistency-card" aria-labelledby="consistency-title">
      <h2 id="consistency-title">Consistencia</h2>
      <div className="progress-ring" aria-label="85 por ciento de consistencia">
        <div className="progress-ring__inner">
          <strong>85</strong>
          <span>%</span>
        </div>
      </div>
      <strong className="consistency-card__status">Buen ritmo!</strong>
      <p>Te estas despertando a tu manera</p>
    </section>
  )
}

function InsightCard({ icon, title, children }) {
  return (
    <article className="insight-card">
      <div className="insight-card__icon">
        <img src={icon} alt="" aria-hidden="true" />
      </div>
      <div>
        <h3>{title}</h3>
        <p>{children}</p>
      </div>
    </article>
  )
}

function App() {
  return (
    <div className="dashboard-shell">
      <SideNavigation />

      <main className="dashboard-main">
        <h1>Dashboard</h1>
        <WakeUpChart />

        <div className="dashboard-summary">
          <ConsistencyCard />
          <div className="insights-list">
            <InsightCard icon={rhythmIcon} title="Ritmo semanal">
              Te despiertas 15 minutos antes todos los martes. ¡Un buen día para
              programar un entrenamiento por la mañana!
            </InsightCard>
            <InsightCard icon={snoozeIcon} title="Reducción de Snooze">
              ¡Progreso increíble! Esta semana has usado la alarma pospuesta un
              20 % menos en comparación con el mes pasado.
            </InsightCard>
          </div>
        </div>
      </main>
    </div>
  )
}

export default App
