# Proyecto de UX - Maquetación Frontend Web

Este repositorio corresponde a una aplicación de React JS desarrollada como prototipo de experiencia de usuario (UX) para una interfaz web de rutinas, dashboard y flujo de autenticación visual.

Es un proyecto frontend prototipo, pensado para mostrar la maquetación, navegación y flujo de la aplicación, no para autenticación real ni conexión con backend.

## Tecnologías utilizadas

- React JS
- Vite
- React Router DOM
- CSS modular/customizado

## Requisitos previos

Antes de ejecutar el proyecto, asegúrate de tener instalado:

- Node.js 18 o superior
- npm

Puedes verificarlo con:

```bash
node -v
npm -v
```

## Instalación de dependencias

Desde la raíz del proyecto, ejecuta:

```bash
npm install
```

Esto instalará todas las dependencias necesarias para correr la aplicación.

## Cómo correr el proyecto

En la raíz del proyecto, ejecuta:

```bash
npm run dev
```

Luego abre en tu navegador la siguiente dirección:

```text
http://localhost:5173
```

Si el puerto 5173 está ocupado, Vite podría abrir otro puerto disponible y te lo indicará en la terminal.

## Importante sobre el login

Este proyecto no tiene un login funcional. La vista de inicio está diseñada únicamente para mostrar la experiencia de usuario y la propuesta visual del producto.

Por lo tanto, para revisar el flujo UX, simplemente se debe hacer clic en el botón de "Continuar" o en la opción correspondiente que aparezca en la pantalla de login.

No se requiere ingresar credenciales reales ni autenticación backend.

## Scripts disponibles

En este proyecto puedes usar estos comandos:

```bash
npm run dev
npm run build
npm run preview
npm run lint
```

### Descripción breve

- `npm run dev`: ejecuta la aplicación en modo desarrollo.
- `npm run build`: genera una versión optimizada para producción.
- `npm run preview`: sirve la build localmente para revisión.
- `npm run lint`: revisa el código con ESLint.

## Estructura general del proyecto

```text
src/
  components/
  context/
  pages/
  App.jsx
  main.jsx
```
