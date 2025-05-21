# 🚀 TodoApp - Tu Aplicación de Gestión de Tareas con Zustand

![React](https://img.shields.io/badge/React-18-blue?logo=react) ![Vite](https://img.shields.io/badge/Vite-Fast-yellow?logo=vite) ![TypeScript](https://img.shields.io/badge/TypeScript-Strict-blue?logo=typescript) ![Zustand](https://img.shields.io/badge/Zustand-State_Mgmt-purple) ![CSS_Modules](https://img.shields.io/badge/CSS-Modules-green)

**TodoApp** es una Single Page Application (SPA) moderna y ágil, diseñada para ayudarte a organizar tus actividades diarias de manera eficiente. Con una interfaz intuitiva y funcionalidades potentes, gestionar tus tareas nunca ha sido tan fácil.

---

## 📋 Índice

1.  [🌟 Características Destacadas](#-características-destacadas)
2.  [🛠️ Stack Tecnológico](#️-stack-tecnológico)
3.  [⚙️ Requisitos Previos](#️-requisitos-previos)
4.  [🚀 Puesta en Marcha](#-puesta-en-marcha)
    - [📦 Instalación](#-instalación)
    - [🔧 Configuración (Variables de Entorno)](#-configuración-variables-de-entorno)
    - [▶️ Ejecución](#️-ejecución)
5.  [📜 Scripts Disponibles](#-scripts-disponibles)
6.  [📁 Estructura del Proyecto](#-estructura-del-proyecto)
7.  [🧑‍💻 Autor](#-autor)

---

## 🌟 Características Destacadas

- **📝 Gestión Completa de Tareas (CRUD)**: Crea, visualiza, actualiza y elimina tareas fácilmente.
- **✅ Estados de Tareas**: Marca tareas como pendientes o completadas. Opción para completar todas las tareas de golpe.
- **💾 Almacenamiento Flexible**:
  - **Backend API**: Se integra con cualquier API RESTful si `VITE_API_URL` está configurada.
  - **LocalStorage**: Funciona offline o en modo demo guardando los datos en el navegador si `VITE_API_URL` no está definida. Los IDs se generan con `crypto.randomUUID()`.
- **💅 Interfaz Moderna e Intuitiva**: Diseño limpio con CSS Modules y mejoras visuales como checkboxes personalizados.
- **🔔 Notificaciones**: Alertas visuales (con `SweetAlert2`) para confirmar acciones o reportar errores.
- **⚛️ Estado Global con Zustand**: Manejo eficiente y reactivo del estado de la aplicación, minimizando el "prop drilling".
- **⚡ Rápida y Eficiente**: Construida con Vite para un desarrollo y HMR ultrarrápidos.
- **🔒 Tipado Estricto**: Código más robusto y mantenible gracias a TypeScript.

---

## ⚙️ Requisitos Previos

Antes de comenzar, asegúrate de tener instalado lo siguiente en tu sistema:

- [Node.js](https://nodejs.org/) (versión LTS recomendada, ej. v18.x o superior)
- [npm](https://www.npmjs.com/) (generalmente viene con Node.js) o [yarn](https://yarnpkg.com/)

---

## 🚀 Puesta en Marcha

Sigue estos pasos para tener el proyecto funcionando en tu máquina local.

### 📦 Instalación

1.  **Clona el repositorio:**

    ```bash
    git clone https://github.com/tu-usuario/TodoApp-UTN-MDS.git
    cd TodoApp-UTN-MDS
    ```

    _(Reemplaza `tu-usuario` con el nombre de usuario o la URL correcta del repositorio)_

2.  **Instala las dependencias:**

    Usando npm:

    ```bash
    npm install
    ```

    O usando yarn:

    ```bash
    yarn install
    ```

### 🔧 Configuración (Variables de Entorno)

La aplicación puede funcionar con un backend API o utilizar `localStorage`. Esto se controla mediante una variable de entorno:

1.  Crea un archivo `.env` en la raíz del proyecto.
2.  Define la variable `VITE_API_URL` (opcional):

    - **Para usar un backend API**:

      ```env
      VITE_API_URL=http://localhost:3000/tareas
      ```

      (Ajusta la URL a tu endpoint de API. Si usas el `db.json` provisto y JSON-Server, esta sería la URL típica).

    - **Para usar LocalStorage**:
      Simplemente **no definas** `VITE_API_URL` en el archivo `.env` o déjalo vacío. La aplicación detectará su ausencia y recurrirá a `localStorage`.

### ▶️ Ejecución

1.  **Iniciar el servidor de desarrollo (con Vite):**

    Usando npm:

    ```bash
    npm run dev
    ```

    O usando yarn:

    ```bash
    yarn dev
    ```

    Esto iniciará la aplicación en modo de desarrollo, generalmente en `http://localhost:5173`.

2.  **(Opcional) Iniciar JSON-Server si usas el backend mock:**

    Si deseas utilizar el archivo `db.json` como un backend mock con JSON-Server, puedes ejecutar (en otra terminal):

    ```bash
    npx json-server --watch db.json --port 3000
    ```

    Asegúrate de que el puerto coincida con tu `VITE_API_URL` si lo configuraste.

---

## 📜 Scripts Disponibles

En el `package.json`, encontrarás los siguientes scripts principales:

- `npm run dev`: Inicia el servidor de desarrollo de Vite.
- `npm run build`: Compila la aplicación para producción en la carpeta `dist/`.
- `npm run lint`: Ejecuta ESLint para analizar el código en busca de problemas.
- `npm run preview`: Sirve la build de producción localmente para previsualización.

---

## 📁 Estructura del Proyecto (Simplificada)

```text
TodoApp-UTN-MDS/
├── public/               # Archivos estáticos
├── src/
│   ├── components/       # Componentes React (UI y de pantalla)
│   ├── hooks/            # Hooks personalizados (ej. useTareas)
│   ├── http/             # Lógica de comunicación HTTP (ej. tareas.ts)
│   ├── store/            # Stores de Zustand (ej. tareaStore.ts)
│   ├── type/             # Definiciones de tipos TypeScript (ej. Itarea.ts)
│   ├── App.tsx           # Componente raíz de la aplicación
│   ├── main.tsx          # Punto de entrada de la aplicación
│   └── index.css         # Estilos globales
├── .env.example          # Ejemplo de archivo de variables de entorno (si es necesario)
├── eslint.config.js      # Configuración de ESLint
├── package.json          # Dependencias y scripts del proyecto
├── tsconfig.json         # Configuración de TypeScript
└── vite.config.ts        # Configuración de Vite
```

---

¡Gracias por usar TodoApp! Si tienes alguna pregunta o sugerencia, no dudes en abrir un issue.
