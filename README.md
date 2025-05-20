# 🗒️ App de Gestión de Tareas – Zustand

**Desarrollador:** Eros Mariotti  

---

## 📖 Descripción del Proyecto

Esta aplicación de **Single Page Application (SPA)** está diseñada para proporcionar una experiencia ágil y moderna en la gestión de tareas diarias. Con una interfaz sencilla e intuitiva, permite:

- **Crear**, **leer**, **actualizar** y **eliminar** tareas en tiempo real.  
- Mantener el estado de la aplicación de forma reactiva y escalable gracias a **Zustand**.  
- Integrarse con un servidor de prueba gracias a **JSON-Server** o cualquier API RESTful.  

La combinación de **React 18**, **Vite** y **TypeScript** garantiza un arranque ultrarrápido, tipado estricto y un flujo de trabajo optimizado para desarrolladores.

---

## 🚀 Tecnologías Utilizadas

| Categoría           | Herramienta / Librería                           |
| ------------------- | ------------------------------------------------ |
| **Framework**       | React 18                                         |
| **Build / Dev**     | Vite                                             |
| **Estado Global**   | Zustand                                          |
| **Lenguaje**        | TypeScript                                       |
| **Estilos**         | CSS Modules                                      |
| **Consumo HTTP**    | Axios                                            |
| **Mock API**        | JSON-Server                                      |
| **Control de Versiones** | Git / GitHub                               |

---

## 🎯 Características Principales

1. **Listado Dinámico**  
   Al cargar la aplicación, se muestran todas las tareas almacenadas, con paginación o scroll infinito según el volumen.  
2. **Alta de Tareas**  
   Un formulario modal permite añadir nueva información, validada tanto en cliente como en servidor.  
3. **Edición Inline**  
   Las tareas pueden editarse de forma in-place o a través de un modal con confirmación de cambios.  
4. **Eliminación Segura**  
   Incluye diálogos de confirmación y manejo de errores para evitar borrados accidentales.  
5. **Selección de Tarea Activa**  
   Marcar una tarea como “activa” para destacarla en el listado.  
6. **Persistencia de Estado**  
   Gracias a Zustand, el estado es compartido entre componentes sin necesidad de “prop drilling”.  

---

