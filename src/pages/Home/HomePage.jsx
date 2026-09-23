import { useEffect, useState } from 'react'
import './HomePage.css'

const discoveredDevices = [
  { id: 'curtain', icon: 'curtain', name: 'Smart Curtain Track', detail: 'Ventana Principal · Listo para vincular' },
  { id: 'lamp', icon: 'light', name: 'Philips Hue Lightstrip', detail: 'Sala · Listo para vincular' },
]

function HomeIcon({ name, size = 28 }) {
  const common = { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true }
  const paths = {
    light: <><path d="M9 18h6" /><path d="M10 22h4" /><path d="M8.2 14.2A7 7 0 1 1 15.8 14.2c-.9.8-1.3 1.6-1.3 2.8H9.5c0-1.2-.4-2-1.3-2.8Z" /></>,
    curtain: <><path d="M5 3h14" /><path d="M7 3v15h10V3" /><path d="M5 21h14" /><path d="M10 7h4M10 11h4M10 15h4" /></>,
    device: <><rect x="4" y="5" width="11" height="10" rx="1" /><path d="M2 18h15M17 9h4v10h-7v-7h3Z" /></>,
    sunrise: <><path d="M4 18h16M6 14h12" /><path d="M12 4v3M5.6 7.6l2.1 2.1M18.4 7.6l-2.1 2.1" /><path d="M8 14a4 4 0 0 1 8 0" /></>,
    bed: <><path d="M3 19V9h4a3 3 0 0 1 3 3v2" /><path d="M3 15h18v4M7 15v-3h8a3 3 0 0 1 3 3M5 19v2M19 19v2" /></>,
    close: <><path d="m6 6 12 12M18 6 6 18" /></>,
  }
  return <svg {...common}>{paths[name]}</svg>
}

function MiniToggle({ label }) {
  const [checked, setChecked] = useState(true)
  return <button className={`home-toggle${checked ? ' home-toggle--on' : ''}`} type="button" role="switch" aria-checked={checked} aria-label={label} onClick={() => setChecked((value) => !value)}><span /></button>
}

function DeviceCard({ icon, title, source }) {
  return (
    <article className="connected-device">
      <span className="connected-device__icon"><HomeIcon name={icon} /></span>
      <button className="connected-device__menu" type="button" aria-label={`Opciones de ${title}`}>⋮</button>
      <h3>{title}</h3>
      <p>{source}</p>
      <small><i /> Conectado</small>
    </article>
  )
}

function RoutineConnection({ icon, title, detail }) {
  return (
    <article className="routine-connection">
      <span className="routine-connection__icon"><HomeIcon name={icon} size={25} /></span>
      <div><h3>{title}</h3><p>{detail}</p></div>
      <div className="routine-connection__controls">
        <span><HomeIcon name="light" size={23} /></span><MiniToggle label={`Luz en ${title}`} />
        <span><HomeIcon name="curtain" size={23} /></span><MiniToggle label={`Cortinas en ${title}`} />
      </div>
    </article>
  )
}

function AddDeviceModal({ onClose }) {
  const [selectedDevice, setSelectedDevice] = useState(null)

  useEffect(() => {
    const closeOnEscape = (event) => { if (event.key === 'Escape') onClose() }
    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [onClose])

  return (
    <div className="device-modal__backdrop" role="presentation" onMouseDown={onClose}>
      <section className="device-modal" role="dialog" aria-modal="true" aria-labelledby="add-device-title" onMouseDown={(event) => event.stopPropagation()}>
        <header className="device-modal__header">
          <span className="device-modal__header-icon"><HomeIcon name="light" /></span>
          <div><h2 id="add-device-title">Conectar dispositivo</h2><p>Detectando dispositivos inteligentes compatibles en tu red local (Matter, Zigbee, Wi-Fi).</p></div>
          <button className="device-modal__close" type="button" onClick={onClose} aria-label="Cerrar modal"><HomeIcon name="close" size={20} /></button>
        </header>
        <div className="device-modal__scanner"><span aria-hidden="true">●</span><span>Buscando dispositivos cercanos...</span><strong>2 encontrados</strong></div>
        <span className="device-modal__filter">Todos</span>
        <div className="device-modal__results">
          {discoveredDevices.map((device) => <article className={`found-device${selectedDevice === device.id ? ' found-device--selected' : ''}`} key={device.id}><span className="found-device__icon"><HomeIcon name={device.icon} size={25} /></span><div><h3>{device.name}</h3><p>{device.detail}</p></div><button type="button" onClick={() => setSelectedDevice(device.id)}>{selectedDevice === device.id ? 'Elegido' : 'Elegir'}</button></article>)}
        </div>
        <footer className="device-modal__footer"><button type="button" onClick={onClose}>Cancelar</button><button className="device-modal__connect" type="button" disabled={!selectedDevice} onClick={onClose}>⌁ Vincular seleccionado</button></footer>
      </section>
    </div>
  )
}

function HomePage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  return (
    <main className="app-page home-page">
      <div className="home-content">
        <h1>Integración inteligente</h1>
        <section className="devices-section" aria-labelledby="devices-heading">
          <header><h2 id="devices-heading">Dispositivos conectados</h2><button className="add-device-button" type="button" onClick={() => setIsModalOpen(true)}><span>＋</span> Agregar</button></header>
          <div className="devices-grid"><DeviceCard icon="light" title="Luz Cuarto" source="Philips Hue" /><DeviceCard icon="curtain" title="Cortinas inteligentes" source="Lutron Serena" /><button className="connection-help" type="button"><span><HomeIcon name="device" size={34} /></span>Problemas con la conexión?</button></div>
        </section>
        <section className="routine-integrations" aria-labelledby="routines-heading"><h2 id="routines-heading">Integración con rutinas</h2><div><RoutineConnection icon="sunrise" title="Entre Semana" detail="Lun - Vie · 6:30 am" /><RoutineConnection icon="bed" title="Fin de Semana" detail="Sáb - Dom · 8:30 AM" /></div></section>
      </div>
      {isModalOpen && <AddDeviceModal onClose={() => setIsModalOpen(false)} />}
    </main>
  )
}

export default HomePage
