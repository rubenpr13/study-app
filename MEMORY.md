# Memoria del proyecto

Registro de lo que se ha hecho en Study App y de las decisiones tomadas. Las reglas actuales de la app están en `CLAUDE.md`.

## Historial

### 2026-10-28: Primera versión
- Proyecto creado desde cero con Vite 5 + React 18, a mano (sin la plantilla de Vite) para no dejar archivos de ejemplo.
- Funcionalidades: temporizador que arranca solo en 25:00, presets Corto (25/5) y Largo (50/10), pestañas Concentración / Descanso corto / Descanso largo con contador de sesiones, y botones Play/Pausa y Detener.
- El tiempo se calcula con una hora de fin y `Date.now()` (hora local), para que no se desfase con la pestaña en segundo plano.
- Creado `CLAUDE.md` con los comandos, la estructura y las reglas del proyecto.
- Proyecto conectado al vault de Obsidian: notas `Study App`, `Study App - Registro` y `Study App - Aprendizajes técnicos` capturadas en `00 - Inbox/`. Permiso de acceso al vault en `.claude/settings.local.json`.

## Decisiones pendientes de revisar
Las tomé yo porque el encargo no las especificaba:
- [ ] Al terminar el descanso largo se vuelve a Concentración.
- [ ] Tras un cambio automático de modo, el siguiente temporizador arranca solo.
- [ ] Cambiar de pestaña o de preset reinicia el tiempo y lo deja en pausa.
- [ ] Detener pausa y vuelve al inicio del modo actual, sin sumar sesión.
- [ ] Los contadores no se guardan al recargar la página.

Cuando revises una, márcala con `[x]` o pide el cambio, y actualizaré también `CLAUDE.md`.
