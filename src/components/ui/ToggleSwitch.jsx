import './ToggleSwitch.css'

function ToggleSwitch({ checked, label, onChange }) {
  return (
    <button
      className={`toggle-switch${checked ? ' toggle-switch--checked' : ''}`}
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

export default ToggleSwitch
