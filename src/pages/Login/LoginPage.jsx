import { useNavigate } from 'react-router-dom'
import './LoginPage.css'

function LoginPage() {
  const navigate = useNavigate()

  const handleSubmit = (event) => {
    event.preventDefault()
    navigate('/dashboard')
  }

  return (
    <main className="login-page">
      <section className="login-panel" aria-labelledby="login-title">
        <div className="login-content">
          <div className="login-brand">
            <span className="login-brand__mark material-symbols" aria-hidden="true">
              wb_sunny
            </span>
            <h1 id="login-title">Amanecer</h1>
            <p>Bienvenido de vuelta</p>
          </div>

          <form className="login-form" onSubmit={handleSubmit}>
            <label>
              <span className="sr-only">Correo</span>
              <input type="email" name="email" placeholder="Correo" autoComplete="email" />
            </label>
            <label>
              <span className="sr-only">Contraseña</span>
              <input type="password" name="password" placeholder="Contraseña" autoComplete="current-password" />
            </label>
            <button className="login-form__recovery" type="button">Reestablecer contraseña</button>
            <button className="login-form__submit" type="submit">Ingresar</button>
            <p className="login-form__registration">No tienes cuenta? <button type="button">Registrate.</button></p>
          </form>
        </div>
      </section>
    </main>
  )
}

export default LoginPage
