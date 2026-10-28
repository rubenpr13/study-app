# Study App

Web para estudiar con la técnica Pomodoro. Hecha con Vite + React 18, en JavaScript (sin TypeScript) y con CSS normal.

Historial y decisiones pendientes de revisar: @MEMORY.md. Al terminar un cambio, añade una entrada con la fecha local al historial de ese archivo.

## Comandos
- `npm install`: instala las dependencias
- `npm run dev`: servidor de desarrollo en http://localhost:5173
- `npm run build`: compila a `dist/`; úsalo para comprobar que todo funciona
- `npm run preview`: sirve la versión compilada

No hay tests ni linter configurados.

## Estructura
- `src/App.jsx`: toda la lógica y la interfaz, en un único componente
- `src/App.css`: todos los estilos; los colores son variables en `:root` y el acento cambia por modo (`.modo-foco`, `.modo-descansoCorto`, `.modo-descansoLargo`)
- `src/main.jsx`: monta `<App />`

## Reglas del temporizador (no cambiarlas sin pedirlo)
- Cuenta atrás hasta `00:00`. Arranca solo al abrir la web, en Concentración con 25 min.
- Presets: Corto = 25 min de foco / 5 min de descanso; Largo = 50 / 10. El Descanso largo dura siempre 30 min y solo se activa a mano.
- Al llegar a 00:00 se pasa de Concentración a Descanso corto, y de cualquier descanso a Concentración. El siguiente temporizador arranca solo.
- Una sesión solo se suma cuando el temporizador termina, nunca al pausar, detener o cambiar de modo.
- Cambiar de pestaña o de preset reinicia el tiempo y lo deja en pausa. Detener pausa y vuelve al inicio del modo actual.
- El tiempo se calcula con la hora local del usuario (`Date.now()` y una hora de fin), nunca UTC ni hora del servidor. Así no se desfasa aunque la pestaña esté en segundo plano.
- Los contadores viven en memoria y no se guardan.

## Segundo cerebro (vault de Obsidian)
Vault: `C:\Users\ruben\iCloudDrive\iCloud~md~obsidian\Rpinazo`. Antes de escribir en él, lee su `AGENTS.md` y sigue sus reglas (plantilla, propiedades, carpetas sensibles…).
- **Guardar**: a medida que avance la sesión, vuelca en el vault lo que se aprenda o decida, sin esperar a que te lo pidan. Las notas del proyecto se capturan en `00 - Inbox/` (decidido por Rubén el 2026-10-28):
  - `Study App`: qué es, estado y pendientes (actualizar)
  - `Study App - Registro`: una entrada por sesión (solo añadir)
  - `Study App - Aprendizajes técnicos`: lo aprendido (actualizar)
  - Si Rubén mueve estas notas al procesar el Inbox, búscalas por nombre en el vault.
- **Consultar**: para buscar información, empieza por `06 - Wiki/index.md`. Hay notas útiles en `01 - Proyectos/MyStudyDiaryApp/` (fechas locales, Git, Claude Code) y en `06 - Wiki/Conceptos/` (HTML, CSS, Flexbox, Git).

## Estilo de trabajo
- El usuario está empezando a programar: código simple y claro, nombres y comentarios en español, sin abstracciones innecesarias.
- Todos los textos de la interfaz, en español.
- No añadir funcionalidades que no se hayan pedido (sonidos, notificaciones, localStorage, ajustes, librerías nuevas…).
- Diseño limpio y moderno; tiene que verse bien en el móvil.
- Preguntar cualquier tipo de duda o cosa que no esté clara.
