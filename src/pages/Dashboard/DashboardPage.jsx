import { useState } from 'react'
import chartHeadingIcon from '../../assets/dashboard/chart-heading.svg'
import wakeChart from '../../assets/dashboard/wake-chart.svg'
import rhythmIcon from '../../assets/dashboard/insight-rhythm.svg'
import snoozeIcon from '../../assets/dashboard/insight-snooze.svg'
import './DashboardPage.css'

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

        <div className="range-toggle" aria-label="Rango del gráfico">
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
          <img
            src={wakeChart}
            alt="Gráfico de horas de despertar de los últimos 30 días"
          />
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

function DashboardPage() {
  return (
    <main className="app-page dashboard-page">
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
            ¡Progreso increíble! Esta semana has usado la alarma pospuesta un 20
            % menos en comparación con el mes pasado.
          </InsightCard>
        </div>
      </div>
    </main>
  )
}

export default DashboardPage
