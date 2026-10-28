import { useEffect, useState } from "react";

// ----- Configuración -----

// Duraciones (en minutos) de cada preset
const PRESETS = {
  corto: { foco: 25, descanso: 5 },
  largo: { foco: 50, descanso: 10 },
};

// El descanso largo siempre dura 30 minutos
const DESCANSO_LARGO = 30;

// Nombre que se ve en pantalla para cada modo
const NOMBRES_MODO = {
  foco: "Concentración",
  descansoCorto: "Descanso corto",
  descansoLargo: "Descanso largo",
};

// ----- Funciones de ayuda -----

// Devuelve cuántos segundos dura un modo según el preset elegido
function obtenerDuracion(modo, preset) {
  if (modo === "foco") return PRESETS[preset].foco * 60;
  if (modo === "descansoCorto") return PRESETS[preset].descanso * 60;
  return DESCANSO_LARGO * 60;
}

// Convierte segundos en texto "MM:SS" (por ejemplo 1500 -> "25:00")
function formatearTiempo(segundos) {
  const minutos = Math.floor(segundos / 60);
  const resto = segundos % 60;
  return `${String(minutos).padStart(2, "0")}:${String(resto).padStart(2, "0")}`;
}

// ----- Componente principal -----

export default function App() {
  const [preset, setPreset] = useState("corto");
  const [modo, setModo] = useState("foco");
  const [segundosRestantes, setSegundosRestantes] = useState(obtenerDuracion("foco", "corto"));
  const [enMarcha, setEnMarcha] = useState(true); // true = empieza solo al abrir la web
  const [sesiones, setSesiones] = useState({ foco: 0, descansoCorto: 0, descansoLargo: 0 });

  // 1) Cuenta atrás: mientras esté en marcha, se actualiza cada segundo.
  // Guardamos la hora local de fin y calculamos lo que falta con Date.now().
  // Así el tiempo es exacto aunque el navegador ralentice la pestaña en segundo plano.
  useEffect(() => {
    if (!enMarcha) return;

    const horaFin = Date.now() + segundosRestantes * 1000;

    const intervalo = setInterval(() => {
      const quedan = Math.max(0, Math.round((horaFin - Date.now()) / 1000));
      setSegundosRestantes(quedan);
    }, 1000);

    // Al pausar o cambiar de modo, paramos el intervalo anterior
    return () => clearInterval(intervalo);
    // Solo se reinicia al pausar/reanudar o al cambiar de modo (no en cada segundo)
  }, [enMarcha, modo]);

  // 2) Cuando el temporizador llega a 00:00: sumamos la sesión y cambiamos de modo
  useEffect(() => {
    if (segundosRestantes > 0) return;

    // Solo aquí se suma la sesión: cuando el temporizador ha terminado
    setSesiones((anteriores) => ({ ...anteriores, [modo]: anteriores[modo] + 1 }));

    // Concentración -> Descanso corto; cualquier descanso -> Concentración
    const siguienteModo = modo === "foco" ? "descansoCorto" : "foco";
    setModo(siguienteModo);
    setSegundosRestantes(obtenerDuracion(siguienteModo, preset));
  }, [segundosRestantes]);

  // ----- Acciones de los botones -----

  function alternarPlayPausa() {
    setEnMarcha(!enMarcha);
  }

  function detener() {
    setEnMarcha(false);
    setSegundosRestantes(obtenerDuracion(modo, preset));
  }

  function cambiarModo(nuevoModo) {
    setEnMarcha(false);
    setModo(nuevoModo);
    setSegundosRestantes(obtenerDuracion(nuevoModo, preset));
  }

  function cambiarPreset(nuevoPreset) {
    setEnMarcha(false);
    setPreset(nuevoPreset);
    setSegundosRestantes(obtenerDuracion(modo, nuevoPreset));
  }

  // ----- Interfaz -----

  return (
    <main className={`app modo-${modo}`}>
      <div className="tarjeta">
        <h1 className="titulo">Study App</h1>

        {/* Pestañas de modo con su contador de sesiones */}
        <nav className="pestanas">
          {Object.keys(NOMBRES_MODO).map((clave) => (
            <button
              key={clave}
              className={`pestana ${modo === clave ? "activa" : ""}`}
              onClick={() => cambiarModo(clave)}
            >
              {NOMBRES_MODO[clave]}
              <span className="contador">{sesiones[clave]}</span>
            </button>
          ))}
        </nav>

        {/* Temporizador */}
        <p className="tiempo">{formatearTiempo(segundosRestantes)}</p>

        {/* Botones de control */}
        <div className="controles">
          <button className="boton boton-principal" onClick={alternarPlayPausa}>
            {enMarcha ? "Pausa" : "Play"}
          </button>
          <button className="boton boton-secundario" onClick={detener}>
            Detener
          </button>
        </div>

        {/* Presets predefinidos */}
        <div className="presets">
          <button
            className={`preset ${preset === "corto" ? "activo" : ""}`}
            onClick={() => cambiarPreset("corto")}
          >
            <strong>Corto</strong>
            <span>25 min foco · 5 min descanso</span>
          </button>
          <button
            className={`preset ${preset === "largo" ? "activo" : ""}`}
            onClick={() => cambiarPreset("largo")}
          >
            <strong>Largo</strong>
            <span>50 min foco · 10 min descanso</span>
          </button>
        </div>
      </div>
    </main>
  );
}
