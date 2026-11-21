# Mi iA · tu IA personal

App instalable (PWA) con su propio icono. Te conoce por **todo** lo que guarda tu **Neural Brain**: tus cerebros, tus recuerdos de **Nova Hub** y **VORTEX**, tus bots de **Nova Bot Lab**, tu **Google Calendar** y **Gmail** (si los conectas) y su propia memoria de tus conversaciones.

**En vivo:** https://soobroon-beep.github.io/mi-ia/

## Qué tiene
- **Chat** con historial de conversaciones. Aprende de cada una (guarda lo que tú cuentas de ti, sin repetir) y de tus 👍/👎. Propone acciones que tú confirmas: vigilar, recordar, enseñar a un cerebro, mejora para un bot.
- **Crecimiento**: un núcleo de neuronas que crece con lo que sabe, nivel, etapa, gráficas y su red neuronal.
- **Vigilancias**: lo que vigila por ti, informes y alertas (resumen diario 8:00 y revisión de bots 21:00 de inicio).
- **Bots**: cuál mejora y cuál no, análisis con IA y mejoras propuestas.
- **Memoria**, **Conexiones** (todas tus apps y su estado en vivo) y una **Guía** hecha con tus datos.

## Cómo está armada
- **Una sola memoria**: Mi iA usa el mismo proyecto de Firebase que Neural Brain (`neural-brain-148a4`, `users/{uid}/brains/_core`). No tiene base propia.
- **Una sola lógica**: los prompts y el aprendizaje viven en Neural Brain (`ai-core-lib.js`, `brain-learn.js`, `graphs.js`) y esta app los carga desde ahí; el aprendizaje nocturno también corre allá (`scripts/learn.js`).
- `index.html` + `shell.js` (cuenta, datos, navegación) · `app.js` (la IA) · `base.css` (el mismo diseño de Neural Brain) + `app.css` · `sw.js` · `manifest.json` · `icons/`.

## Instalar en el celular
Chrome → ⋮ → **Agregar a la pantalla principal** → **Instalar**. Atajos al dejar presionado el icono: Nuevo chat, Vigilancias, Mis bots.
