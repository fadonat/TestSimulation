import { useState } from "react";
import { Card, CardContent } from "./components/ui/card";
import { Button } from "./components/ui/button";
import { RadioGroup, RadioGroupItem } from "./components/ui/radio-group";
import { Input } from "./components/ui/input";
import { motion, AnimatePresence } from "framer-motion";

const questions = [
  {
    question: "¿Qué se requiere para crear una relación N:N entre entidades?",
    options: ["Agregar claves foráneas cruzadas entre las dos entidades.", "Crear una tercera entidad con dos atributos de tipo Id.", "Usar una Client Variable para vincular los registros.", "Ninguna de las anteriores."],
    answer: 1
  },
  {
    question: "¿Qué tipo de acción puede ejecutarse en el cliente en aplicaciones Reactive?",
    options: ["Server Action.", "Client Action.", "Aggregate Action.", "Database Action."],
    answer: 1
  },
  {
    question: "¿Cuál es el propósito principal de un Aggregate en OutSystems?",
    options: ["Crear estructuras de datos.", "Mostrar errores de la base de datos.", "Consultar y filtrar datos.", "Diseñar pantallas de usuario."],
    answer: 2
  },
  {
    question: "¿Qué evento del ciclo de vida se ejecuta primero al cargar una Screen?",
    options: ["On Ready.", "On After Fetch.", "On Initialize.", "On Render."],
    answer: 2
  },
  {
    question: "¿Qué hace el nodo 'Trigger Event' en un Block?",
    options: ["Notifica a un Block hijo de un evento padre.", "Ejecuta una Client Action dentro de un Block.", "Permite que un Block informe a su Screen o padre que algo ocurrió.", "Ejecuta una Server Action de forma asíncrona."],
    answer: 2
  },
  {
    question: "¿Qué validaciones se ejecutan automáticamente cuando un botón con validaciones integradas establecidas en 'Yes' es presionado dentro de un Form?",
    options: ["Solo las validaciones de los campos requeridos.", "Validaciones personalizadas definidas por el desarrollador.", "Validaciones de campos obligatorios y tipos de datos de entrada.", "Validaciones de campos requeridos y campos utilizados en lógica posterior."],
    answer: 2
  },
  ...Array.from({ length: 44 }, (_, i) => ({
    question: `Pregunta de práctica ${i + 7}`,
    options: [
      `Opción 1 de pregunta ${i + 7}`,
      `Opción 2 de pregunta ${i + 7}`,
      `Opción 3 de pregunta ${i + 7}`,
      `Opción 4 de pregunta ${i + 7}`
    ],
    answer: Math.floor(Math.random() * 4)
  }))
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

  const handleNext = () => setCurrent((prev) => Math.min(prev + 1, questions.length - 1));
  const handlePrev = () => setCurrent((prev) => Math.max(prev - 1, 0));
  const handleSubmit = () => {
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
            <CardContent className="p-6 space-y-4">
              <h2 className="text-xl font-bold">Pregunta {current + 1}</h2>
              <p>{questions[current].question}</p>
              <RadioGroup
                value={answers[current]?.toString() || ""}
                onValueChange={handleSelect}
              >
                {questions[current].options.map((opt, i) => {
                  const isCorrect = submitted && i === questions[current].answer;
                  const isWrong = submitted && answers[current] === i && i !== questions[current].answer;
                  return (
                    <div key={i} className={`flex items-center space-x-2 ${isCorrect ? 'text-green-400' : ''} ${isWrong ? 'text-red-400' : ''}`}>
                      <RadioGroupItem value={i.toString()} disabled={submitted} />
                      <label>{opt}</label>
                    </div>
                  );
                })}
              </RadioGroup>
              <div className="flex justify-between mt-4">
                <Button onClick={handlePrev} disabled={current === 0}>Anterior</Button>
                {current === questions.length - 1 ? (
                  <Button onClick={handleSubmit}>Enviar</Button>
                ) : (
                  <Button onClick={handleNext}>Siguiente</Button>
                )}
              </div>
            </CardContent>
          </Card>
          {submitted && (
            <Card className="bg-green-100 text-black">
              <CardContent className="p-4">
                <p className="text-lg font-semibold">
                  Resultado de {userName}: {score} de {questions.length} correctas ({Math.round((score / questions.length) * 100)}%)
                </p>
              </CardContent>
            </Card>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
