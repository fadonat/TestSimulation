import { useState } from "react";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group";
import { Input } from "../components/ui/input";
import { motion } from "framer-motion";

const questions = [
  {
    question: "¿Cuál de las siguientes afirmaciones sobre las Client Variables en OutSystems es correcta?",
    options: [
      "Son compartidas entre todos los usuarios de la aplicación.",
      "Se almacenan en la base de datos del servidor.",
      "Son persistentes entre diferentes sesiones de usuario.",
      "Son específicas de cada usuario y duran mientras la sesión del navegador esté activa."
    ],
    answer: 3
  },
  {
    question: "¿Qué sucede cuando se configura un Aggregate con la propiedad Fetch como 'Only On Demand'?",
    options: [
      "El Aggregate se ejecuta automáticamente al cargar la Screen.",
      "El Aggregate no se ejecuta hasta que se invoca explícitamente mediante una acción.",
      "El Aggregate se ejecuta solo cuando se produce un error.",
      "El Aggregate se ejecuta cuando se realiza la publicación del módulo."
    ],
    answer: 1
  },
  {
    question: "En una aplicación modular, ¿cuál es la mejor práctica para reutilizar una Action Server definida en un módulo diferente?",
    options: [
      "Crear una nueva Action en cada módulo que la necesite.",
      "Copiar la lógica de la Action manualmente a los demás módulos.",
      "Marcar la Action como pública y referenciar el módulo como dependencia.",
      "Utilizar Client Variables para compartir la lógica entre módulos."
    ],
    answer: 2
  },
  {
    question: "¿Qué evento del ciclo de vida de una Screen es el primero que se ejecuta al navegar a ella?",
    options: [
      "On Render",
      "On Ready",
      "On Initialize",
      "On After Fetch"
    ],
    answer: 2
  },
  {
    question: "¿Qué validaciones se ejecutan automáticamente cuando un botón con validaciones integradas establecidas en 'Yes' es presionado dentro de un Form?",
    options: [
      "Solo las validaciones de los campos requeridos.",
      "Validaciones personalizadas definidas por el desarrollador.",
      "Validaciones de campos obligatorios y tipos de datos de entrada.",
      "Validaciones de campos requeridos y campos utilizados en lógica posterior."
    ],
    answer: 2
  }
];

const optionLetters = ["a)", "b)", "c)", "d)"];

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

  if (!started) {
    return (
      <div className="max-w-md mx-auto p-6 space-y-4">
        <Card>
          <CardContent className="p-4 space-y-4">
            <h1 className="text-2xl font-bold">Simulador de Examen</h1>
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
    <div className="max-w-2xl mx-auto p-4">
      <motion.div
        key={current}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4"
      >
        <Card>
          <CardContent className="p-4 space-y-4">
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
                  <div key={i} className={`flex items-center space-x-2 ${isCorrect ? 'text-green-600' : ''} ${isWrong ? 'text-red-600' : ''}`}>
                    <RadioGroupItem value={i.toString()} disabled={submitted} />
                    <label>{optionLetters[i]} {opt}</label>
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
          <Card className="bg-green-100">
            <CardContent className="p-4">
              <p className="text-lg font-semibold">
                Resultado de {userName}: {score} de {questions.length} correctas ({Math.round((score / questions.length) * 100)}%)
              </p>
            </CardContent>
          </Card>
        )}
      </motion.div>
    </div>
  );
}
