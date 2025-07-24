import { useState } from "react";
import { Card, CardContent } from "./components/ui/card";
import { Button } from "./components/ui/button";
import { RadioGroup, RadioGroupItem } from "./components/ui/radio-group";
import { Input } from "./components/ui/input";
import { motion, AnimatePresence } from "framer-motion";

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
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-gray-100 font-sans">
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
            <Button onClick={handleStart} disabled={!userName.trim()}>
              Comenzar
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-gray-100 font-sans">
        <Card className="max-w-2xl w-full bg-green-100 text-black">
          <CardContent className="p-6">
            <p className="text-2xl font-bold">
              Resultado de {userName}: {score} de {questions.length} correctas ({Math.round((score / questions.length) * 100)}%)
            </p>
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
          className="max-w-2xl mx-auto space-y-4"
        >
          <Card className="bg-gray-800">
            <CardContent className="p-6 space-y-6">
              <h2 className="text-xl font-bold">Pregunta {current + 1}</h2>
              <p>{questions[current].question}</p>
              <RadioGroup
                value={answers[current]?.toString() || ""}
                onValueChange={handleSelect}
                className="space-y-3"
              >
                {questions[current].options.map((opt, i) => {
                  const isCorrect = submitted && i === questions[current].answer;
                  const isWrong = submitted && answers[current] === i && i !== questions[current].answer;
                  return (
                    <div key={i} className={`flex items-center space-x-4 ${isCorrect ? 'text-green-400' : ''} ${isWrong ? 'text-red-400' : ''}`}>
                      <RadioGroupItem value={i.toString()} disabled={submitted} />
                      <label>{opt}</label>
                    </div>
                  );
                })}
              </RadioGroup>
              <div className="flex justify-end mt-8">
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
