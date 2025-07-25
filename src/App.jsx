import { useState } from "react";
import { Card, CardContent } from "./components/ui/card";
import { Button } from "./components/ui/button";
import { RadioGroup, RadioGroupItem } from "./components/ui/radio-group";
import { Input } from "./components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircleIcon, XCircleIcon } from 'lucide-react';


const questions = [
  {
    question: "¿Cuál es el propósito de las Client Variables en OutSystems?",
    options: ["Almacenar datos persistentes en el servidor.", "Compartir datos entre usuarios.", "Guardar información específica del usuario en el cliente.", "Guardar datos globales del módulo."],
    answer: 2
  },
  {
    question: "¿Qué tipo de relaciones se puede definir entre entidades en OutSystems?",
    options: ["Uno a uno, uno a muchos, muchos a muchos.", "Solo uno a muchos.", "Solo muchos a muchos.", "Solo uno a uno."],
    answer: 0
  },
  {
    question: "¿Qué widget usarías para mostrar una lista de registros?",
    options: ["Dropdown.", "Table.", "Form.", "Input."],
    answer: 1
  },
  {
    question: "¿Cuál es el objetivo del evento OnChange en un Dropdown?",
    options: ["Actualizar los datos del servidor.", "Reiniciar el formulario.", "Reaccionar a un cambio de selección.", "Ejecutar una validación global."],
    answer: 2
  },
  {
    question: "¿Qué componente permite dividir la lógica visual en partes reutilizables?",
    options: ["Screen.", "Entity.", "Block.", "Aggregate."],
    answer: 2
  },
  {
    question: "¿Cuál es la diferencia entre una Client Action y una Server Action?",
    options: ["La Client Action solo se usa en Web tradicional.", "La Server Action corre en el navegador.", "La Client Action corre en el navegador y la Server en el servidor.", "No hay diferencia."],
    answer: 2
  },
  {
    question: "¿Qué propiedad permite que un Aggregate se ejecute bajo demanda?",
    options: ["Start Fetching.", "Only On Trigger.", "Only On Demand.", "Auto Run."],
    answer: 2
  },
  {
    question: "¿Qué significa marcar una Entity como Public?",
    options: ["Puede ser usada por otros módulos.", "Puede ser accedida desde un navegador.", "Se muestra como una API.", "Permite relaciones externas."],
    answer: 0
  },
  {
    question: "¿Cuál es el propósito del evento OnInitialize en una Screen?",
    options: ["Cargar la interfaz.", "Establecer variables o lógica inicial.", "Guardar datos.", "Actualizar el estado de sesión."],
    answer: 1
  },
  {
    question: "¿Qué estructura OutSystems se usa para agrupar lógicamente funcionalidad?",
    options: ["Application.", "Module.", "Entity.", "Theme."],
    answer: 1
  },
  {
    question: "¿Qué componente OutSystems se usa para capturar entrada de datos?",
    options: ["Input.", "Table.", "Label.", "Container."],
    answer: 0
  },
  {
    question: "¿Qué acción debes usar para validar que un campo obligatorio ha sido llenado?",
    options: ["CheckRequired().", "ValidForm().", "Form.Valid.", "ValidateInput()."],
    answer: 2
  },
  {
    question: "¿Qué rol mínimo se requiere para acceder a una Screen protegida por Roles?",
    options: ["Anonymous.", "Registered.", "El rol especificado.", "Default."],
    answer: 2
  },
  {
    question: "¿Qué herramienta OutSystems te permite verificar los datos de una variable en tiempo real?",
    options: ["Service Studio Debugger.", "Integration Studio.", "Lifetime.", "Forge."],
    answer: 0
  },
  {
    question: "¿Qué permite la función de 'Expose Read Only' en una Entity?",
    options: ["Modificar atributos.", "Permitir relaciones externas.", "Acceder sin modificar desde otros módulos.", "Ocultar la Entity."],
    answer: 2
  },
  {
    question: "¿Qué evento del ciclo de vida de una Screen se activa justo antes de que la Screen se muestre al usuario?",
    options: [
      "OnReady",
      "OnInitialize",
      "OnRender",
      "OnDestroy"
    ],
    answer: 0
  },
  {
    question: "En una relación de muchos a muchos (N:N), ¿qué Entity se debe crear para representar esta relación?",
    options: [
      "Una Entity con atributos duplicados de ambas entidades.",
      "Una Entity con dos atributos de tipo identificador, uno por cada entidad relacionada.",
      "Una Entity con una clave primaria y un atributo de tipo texto.",
      "Una Entity con solo un atributo compuesto."
    ],
    answer: 1
  },
  {
    question: "¿Cuál es el propósito del nodo 'Trigger Event' en un Block?",
    options: [
      "Notificar a la Screen que algo ha ocurrido dentro del Block.",
      "Iniciar una nueva Screen.",
      "Llamar una Client Action desde el Block.",
      "Obtener datos desde una fuente externa."
    ],
    answer: 0
  },
  {
    question: "¿Qué se debe hacer para que un Aggregate se actualice cuando un usuario selecciona un nuevo valor en un Dropdown?",
    options: [
      "Nada, se actualiza automáticamente.",
      "Crear un Client Action y usar un 'Refresh Data' sobre el Aggregate.",
      "Reiniciar la Screen.",
      "Usar un Data Action con evento de cambio."
    ],
    answer: 1
  },
  {
    question: "¿Qué sucede si en una Client Action se invoca un Aggregate que no devuelve resultados y no hay controladores de excepción definidos?",
    options: [
      "Se lanza una excepción de tipo DatabaseException.",
      "Se ejecuta el flujo RecordNotFound si está definido.",
      "La acción continúa normalmente sin errores.",
      "El sistema redirige al usuario a la pantalla anterior."
    ],
    answer: 2
  },
  {
    question: "¿Cuál es la forma correcta de utilizar un Block reutilizable con parámetros de entrada en múltiples Screens?",
    options: [
      "Definir el Block en cada Screen sin parámetros.",
      "Usar Client Variables para pasar los datos.",
      "Pasar los valores como parámetros al insertar el Block.",
      "Utilizar eventos para enviar valores al Block."
    ],
    answer: 2
  },
  {
    question: "¿Qué propiedad del widget Dropdown se utiliza para mostrar correctamente el nombre del elemento?",
    options: [
      "SourceEntity.Label",
      "OptionsText",
      "TextProperty",
      "DataLabel"
    ],
    answer: 1
  },
  {
    question: "¿Qué estructura lógica se utiliza para manejar errores cuando una Client Action puede fallar?",
    options: [
      "Try-Catch",
      "If-Else anidado",
      "Handler de Excepciones",
      "Switch con logs"
    ],
    answer: 2
  },
  {
    question: "¿Cuál es el efecto de establecer la propiedad \"Function\" en \"Yes\" dentro de una Client Action?",
    options: [
      "Limita la Action a un solo uso por módulo.",
      "Permite su uso en expresiones como una función.",
      "Impide su uso en Server Actions.",
      "Obliga a declarar parámetros de salida."
    ],
    answer: 1
  },
  {
    question: "¿Cuál es la mejor forma de estructurar una aplicación en OutSystems para facilitar el mantenimiento y la reutilización?",
    options: [
      "Incluir toda la lógica en un solo módulo.",
      "Separar por tipo de usuario.",
      "Aplicar arquitectura en capas con módulos base, core y end-user.",
      "Duplicar la lógica en cada módulo para mayor independencia."
    ],
    answer: 2
  },
  {
    question: "¿Qué ocurre si marcas una Screen como 'Anonymous' en sus roles de acceso?",
    options: [
      "Solo los usuarios autenticados pueden acceder.",
      "Cualquier usuario puede acceder sin autenticación.",
      "La Screen es accesible solo desde bloques internos.",
      "La Screen se comporta como pública entre módulos."
    ],
    answer: 1
  },
  {
    question: "¿Qué herramienta en Service Studio permite seguir paso a paso la ejecución de una lógica?",
    options: [
      "Profiler",
      "Debugger",
      "Trace Logger",
      "Monitoring Console"
    ],
    answer: 1
  },
  {
    question: "¿Qué propiedad del Form garantiza que no se envíen datos inválidos al servidor?",
    options: [
      "Editable",
      "Enabled",
      "Valid",
      "Mandatory"
    ],
    answer: 2
  },
  {
    question: "¿Qué función permite verificar si un valor se encuentra dentro de una lista de valores?",
    options: [
      "Contains",
      "IndexOf",
      "In",
      "ListContains"
    ],
    answer: 3
  },
  {
    question: "¿Cómo se puede compartir lógica entre múltiples módulos en OutSystems?",
    options: [
      "Mediante Blocks duplicados.",
      "Exportando e importando Entities.",
      "Creando Server Actions públicas en módulos core.",
      "Utilizando Client Actions únicamente."
    ],
    answer: 2
  },
  {
    question: "¿Qué componente se utiliza para mostrar una lista de registros en una Screen de forma tabular?",
    options: [
      "List Widget",
      "Table Records",
      "Form",
      "Dropdown"
    ],
    answer: 1
  },
  {
    question: "¿Cuál es el propósito de una Aggregate Join en OutSystems?",
    options: [
      "Duplicar los datos obtenidos.",
      "Combinar registros relacionados de múltiples Entities.",
      "Eliminar registros duplicados.",
      "Filtrar registros por clave primaria."
    ],
    answer: 1
  },
  {
    question: "¿Cuál es el resultado de aplicar un Group By en un Aggregate?",
    options: [
      "Eliminar duplicados automáticamente.",
      "Combinar todos los registros en uno solo.",
      "Agrupar registros según una clave y permitir agregaciones.",
      "Aplicar filtros complejos con expresiones."
    ],
    answer: 2
  },
  {
    question: "¿Qué opción describe mejor la relación entre una Screen y un Block?",
    options: [
      "Un Block puede contener Screens.",
      "Una Screen no puede contener Blocks.",
      "Un Block puede ser reutilizado en múltiples Screens.",
      "Una Screen actúa como Block en otros módulos."
    ],
    answer: 2
  },
  {
    question: "¿Qué tipo de Action se utiliza para ejecutar lógica en el servidor desde una aplicación Reactive?",
    options: [
      "Client Action",
      "Server Action",
      "Logic Block",
      "Data Action"
    ],
    answer: 1
  },
  {
    question: "¿Qué propiedad permite establecer un valor por defecto en un Input Widget?",
    options: [
      "Default",
      "InputValue",
      "Variable",
      "Source"
    ],
    answer: 2
  },
  {
    question: "¿Cuál es el rol de una Entity Local en OutSystems?",
    options: [
      "Persistir datos en la base de datos del servidor.",
      "Compartir datos entre múltiples aplicaciones.",
      "Almacenar datos temporalmente en el cliente.",
      "Definir tipos complejos de datos."
    ],
    answer: 2
  },
  {
    question: "¿Qué se debe hacer para mostrar mensajes personalizados al usuario?",
    options: [
      "Usar la función ShowMessage().",
      "Agregar un Message Widget y establecer su valor dinámicamente.",
      "Utilizar Client Variables para almacenar el mensaje.",
      "Insertar el texto directamente en un Expression Widget."
    ],
    answer: 1
  },
  {
    question: "¿Cómo se define la clave primaria en una Entity?",
    options: [
      "Se selecciona cualquier atributo como clave primaria.",
      "El atributo con la propiedad IsKey = True.",
      "OutSystems define automáticamente el primer atributo.",
      "Debe tener el nombre Id y ser de tipo Long Integer."
    ],
    answer: 1
  },
  {
    question: "¿Cuál es el propósito de los bloques de validación en un Form?",
    options: [
      "Aplicar estilos al formulario.",
      "Separar la lógica en partes reutilizables.",
      "Ejecutar lógica al hacer clic en un botón.",
      "Controlar que los datos ingresados cumplan ciertas condiciones."
    ],
    answer: 3
  },
  {
    question: "¿Qué significa que una Action sea 'Public' en OutSystems?",
    options: [
      "Puede usarse en cualquier módulo sin restricciones.",
      "Se puede invocar desde otros módulos que tengan dependencia declarada.",
      "Solo puede usarse en el módulo actual.",
      "Está visible para usuarios sin autenticación."
    ],
    answer: 1
  },
  {
    question: "¿Cuál es el uso principal del componente Switch en una lógica?",
    options: [
      "Ejecutar varias condiciones de forma secuencial.",
      "Validar datos de entrada.",
      "Separar visualmente bloques de lógica.",
      "Seleccionar entre múltiples caminos según una expresión."
    ],
    answer: 3
  },
  {
    question: "¿Cómo se puede controlar el acceso a una Screen para ciertos usuarios?",
    options: [
      "Usando condicionales dentro del Preparation.",
      "Agregando roles requeridos en las propiedades de la Screen.",
      "Utilizando Client Variables de tipo booleano.",
      "Insertando un login manual en cada Screen."
    ],
    answer: 1
  },
  {
    question: "¿Qué método se usa para depurar errores de ejecución en Service Studio?",
    options: [
      "Test Unitario.",
      "Debugger con breakpoints.",
      "Compilación previa del módulo.",
      "Registro manual de eventos."
    ],
    answer: 1
  },
  {
    question: "¿Qué módulo es ideal para definir Entities compartidas entre múltiples aplicaciones?",
    options: [
      "Módulo UI",
      "Módulo Core",
      "Módulo End-User",
      "Módulo Client"
    ],
    answer: 1
  },
  {
    question: "¿Qué componente permite dividir la lógica en partes reutilizables dentro de una Screen?",
    options: [
      "Client Action",
      "Server Action",
      "Block",
      "Aggregate"
    ],
    answer: 2
  },
  {
    question: "¿Qué se debe hacer para evitar que un usuario sin rol acceda a una Screen?",
    options: [
      "Agregar una validación personalizada.",
      "Ocultar el enlace de navegación.",
      "Asignar el rol en la propiedad Roles de la Screen.",
      "Agregar lógica condicional en el OnInitialize."
    ],
    answer: 2
  },
  {
    question: "¿Qué componente permite organizar visualmente el contenido en filas y columnas?",
    options: [
      "Form",
      "Container",
      "Table Records",
      "Grid"
    ],
    answer: 3
  },
  {
    question: "¿Qué tipo de Join debería usarse si queremos traer solo los registros que tienen correspondencia en ambas entidades?",
    options: [
      "Left Join",
      "Inner Join",
      "Outer Join",
      "Right Join"
    ],
    answer: 1
  },
  {
    question: "¿Cuál es el propósito del widget Feedback Message?",
    options: [
      "Mostrar mensajes de validación en formularios.",
      "Mostrar información al usuario como errores o confirmaciones.",
      "Redirigir al usuario a otra pantalla.",
      "Controlar condiciones en Client Actions."
    ],
    answer: 1
  }
];

export default function QuizApp() {
  const [userName, setUserName] = useState("");
  const [started, setStarted] = useState(false);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState(Array(questions.length).fill(null));
  const [submitted, setSubmitted] = useState(false);

  const handleSelect = (value) => {
    const selected = parseInt(value);
    if (answers[current] !== selected) {
      const newAnswers = [...answers];
      newAnswers[current] = selected;
      setAnswers(newAnswers);
    }
  };

  const handleNext = () => {
    if (current === questions.length - 1) {
      const result = {
        name: userName,
        score,
        total: questions.length,
        percentage: Math.round((score / questions.length) * 100),
        date: new Date().toLocaleString()
      };
      const existing = JSON.parse(localStorage.getItem("examResults") || "[]");
      existing.push(result);
      localStorage.setItem("examResults", JSON.stringify(existing));
      setSubmitted(true);
    } else {
      setCurrent((prev) => prev + 1);
    }
  };

  const handleStart = () => setStarted(true);

  const score = answers.reduce((acc, a, i) => acc + (a === questions[i].answer ? 1 : 0), 0);
  const progress = ((current + 1) / questions.length) * 100;

  if (!started) {
    return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-gray-100 font-sans px-4">
        <Card className="max-w-md w-full">
          <CardContent className="p-6 space-y-4">
            <h1 className="text-3xl font-bold">Simulador de Examen</h1>
            <p>Ingresa tu nombre para comenzar:</p>
            <Input
              type="text"
              placeholder="Tu nombre"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
            <p>
            <Button onClick={handleStart} disabled={!userName.trim()}>
              Comenzar
            </Button>
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (submitted) {
    const score = answers.filter((ans, idx) => ans === questions[idx].answer).length;
    return (
      <div className="min-h-screen flex items-start justify-center bg-gray-900 text-gray-100 font-sans px-4 py-8">
        <Card className="max-w-3xl w-full bg-white text-black">
          <CardContent className="p-6 space-y-6">
            {/* Resultado global */}
            <p className="text-2xl font-bold">
              Resultado de {userName}: {score} de {questions.length} correctas ({Math.round((score / questions.length) * 100)}%)
            </p>

            {/* Resumen detallado por pregunta */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Resumen detallado</h3>
              {questions.map((q, idx) => {
                const userAns = answers[idx];
                return (
                  <div key={idx} className="mb-6 p-4 border rounded bg-gray-50">
                    <p className="font-semibold mb-2">
                      {idx + 1}. {q.question}
                    </p>
                    <ul>
                      {q.options.map((opt, oidx) => {
                        const isCorrect = opt === q.answer;
                        const isSelected = opt === userAns;
                        return (
                          <li key={oidx} className="flex items-center mb-1">
                            {isCorrect && (
                              <CheckCircleIcon className="w-5 h-5 text-green-600 mr-2" />
                            )}
                            {!isCorrect && isSelected && (
                              <XCircleIcon className="w-5 h-5 text-red-600 mr-2" />
                            )}
                            <span
                              className={`${isCorrect || isSelected ? "font-semibold" : ""}`}
                            >
                              {opt}
                            </span>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-sans p-4">
      <div className="max-w-2xl mx-auto mb-4">
        <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
          <div
            className="bg-blue-500 h-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
          className="max-w-2xl mx-auto pt-8 space-y-4"
        >
          <Card className="bg-gray-800">
            <CardContent className="p-6 space-y-6">
              <h1 className="text-xl font-bold">Pregunta {current + 1}</h1>
              
              <h2>
              <p>{questions[current].question}</p>
              </h2>
              <RadioGroup
                value={answers[current]?.toString() || ""}
                onValueChange={handleSelect}
                className="space-y-3"
              >
                {questions[current].options.map((opt, i) => {
                  const isCorrect = submitted && i === questions[current].answer;
                  const isWrong = submitted && answers[current] === i && i !== questions[current].answer;
                  return (
                    <div key={i} className={`flex items-center gap-[10px] ${isCorrect ? 'text-green-400' : ''} ${isWrong ? 'text-red-400' : ''}`}>
                      <RadioGroupItem value={i.toString()} disabled={submitted} />
                      <label>{opt}</label>
                    </div>
                  );
                })}
              </RadioGroup>
              <div className="next-button-container">
                <Button onClick={handleNext}>
                  {current === questions.length - 1 ? "Enviar" : "Siguiente"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
