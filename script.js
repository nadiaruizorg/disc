// Datos del cuestionario DISC basados en el archivo Excel
const discQuestions = [
    {
        question: "Me gusta tomar decisiones rápidas y asumir riesgos",
        type: "D"
    },
    {
        question: "Soy una persona optimista y entusiasta",
        type: "I"
    },
    {
        question: "Prefiero ambientes estables y predecibles",
        type: "S"
    },
    {
        question: "Tiendo a ser perfeccionista y analítico",
        type: "C"
    },
    {
        question: "Me gusta estar a cargo y dirigir a otros",
        type: "D"
    },
    {
        question: "Disfruto conociendo gente nueva y socializando",
        type: "I"
    },
    {
        question: "Soy una persona paciente y considerada",
        type: "S"
    },
    {
        question: "Presto mucha atención a los detalles y reglas",
        type: "C"
    },
    {
        question: "Me oriento más hacia resultados que hacia personas",
        type: "D"
    },
    {
        question: "Tiendo a expresar mis emociones abiertamente",
        type: "I"
    },
    {
        question: "Prefiero la cooperación al conflicto",
        type: "S"
    },
    {
        question: "Me gusta planificar antes de actuar",
        type: "C"
    },
    {
        question: "Suelo tomar la iniciativa en situaciones nuevas",
        type: "D"
    },
    {
        question: "Me motiva el reconocimiento y la aprobación",
        type: "I"
    },
    {
        question: "Soy leal y prefiero relaciones duraderas",
        type: "S"
    },
    {
        question: "Busco la precisión y exactitud en mi trabajo",
        type: "C"
    },
    {
        question: "Me gusta resolver problemas y superar obstáculos",
        type: "D"
    },
    {
        question: "Soy persuasivo y convenzo fácilmente a otros",
        type: "I"
    },
    {
        question: "Prefiero trabajar a un ritmo constante y metódico",
        type: "S"
    },
    {
        question: "Tiendo a ser cauteloso antes de tomar decisiones",
        type: "C"
    }
];

// Variables globales
let currentQuestionIndex = 0;
let answers = {
    D: 0,
    I: 0,
    S: 0,
    C: 0
};
let userName = '';

// Elementos del DOM
const introSection = document.getElementById('intro-section');
const quizSection = document.getElementById('quiz-section');
const resultsSection = document.getElementById('results-section');
const startBtn = document.getElementById('start-btn');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const questionContainer = document.getElementById('question-container');
const progressBar = document.getElementById('progress');
const resultName = document.getElementById('result-name');
const restartBtn = document.getElementById('restart-btn');

// Iniciar el cuestionario
startBtn.addEventListener('click', () => {
    userName = document.getElementById('username').value.trim();
    if (!userName) {
        alert('Por favor, introduce tu nombre para continuar.');
        return;
    }
    
    introSection.classList.add('hidden');
    quizSection.classList.remove('hidden');
    loadQuestion(currentQuestionIndex);
});

// Cargar pregunta actual
function loadQuestion(index) {
    const question = discQuestions[index];
    
    // Actualizar la barra de progreso
    const progress = ((index + 1) / discQuestions.length) * 100;
    progressBar.style.width = `${progress}%`;
    
    // Crear el HTML para la pregunta
    questionContainer.innerHTML = `
        <h3>Pregunta ${index + 1} de ${discQuestions.length}</h3>
        <p class="question-text">${question.question}</p>
        <div class="options">
            <div class="option-group">
                <input type="radio" id="option1" name="answer" value="5" ${getUserAnswer(index) === 5 ? 'checked' : ''}>
                <label for="option1">Totalmente de acuerdo</label>
            </div>
            <div class="option-group">
                <input type="radio" id="option2" name="answer" value="4" ${getUserAnswer(index) === 4 ? 'checked' : ''}>
                <label for="option2">De acuerdo</label>
            </div>
            <div class="option-group">
                <input type="radio" id="option3" name="answer" value="3" ${getUserAnswer(index) === 3 ? 'checked' : ''}>
                <label for="option3">Neutral</label>
            </div>
            <div class="option-group">
                <input type="radio" id="option4" name="answer" value="2" ${getUserAnswer(index) === 2 ? 'checked' : ''}>
                <label for="option4">En desacuerdo</label>
            </div>
            <div class="option-group">
                <input type="radio" id="option5" name="answer" value="1" ${getUserAnswer(index) === 1 ? 'checked' : ''}>
                <label for="option5">Totalmente en desacuerdo</label>
            </div>
        </div>
    `;
    
    // Actualizar visibilidad de los botones
    prevBtn.style.visibility = index === 0 ? 'hidden' : 'visible';
    nextBtn.textContent = index === discQuestions.length - 1 ? 'Ver resultados' : 'Siguiente';
}

// Obtener respuesta del usuario para una pregunta específica
function getUserAnswer(questionIndex) {
    const questionType = discQuestions[questionIndex].type;
    return sessionStorage.getItem(`question_${questionIndex}`);
}

// Guardar respuesta actual
function saveAnswer() {
    const selectedOption = document.querySelector('input[name="answer"]:checked');
    if (!selectedOption) return false;
    
    const value = parseInt(selectedOption.value);
    const questionType = discQuestions[currentQuestionIndex].type;
    
    // Guardar en sessionStorage para recordar las respuestas al navegar
    sessionStorage.setItem(`question_${currentQuestionIndex}`, value);
    
    return true;
}

// Eventos de navegación
prevBtn.addEventListener('click', () => {
    saveAnswer();
    currentQuestionIndex--;
    loadQuestion(currentQuestionIndex);
});

nextBtn.addEventListener('click', () => {
    if (!saveAnswer()) {
        alert('Por favor, selecciona una respuesta para continuar.');
        return;
    }
    
    if (currentQuestionIndex < discQuestions.length - 1) {
        currentQuestionIndex++;
        loadQuestion(currentQuestionIndex);
    } else {
        calculateResults();
        showResults();
    }
});

// Calcular resultados
function calculateResults() {
    // Reiniciar resultados
    answers = {
        D: 0,
        I: 0,
        S: 0,
        C: 0
    };
    
    // Sumar todas las respuestas por tipo
    for (let i = 0; i < discQuestions.length; i++) {
        const value = parseInt(sessionStorage.getItem(`question_${i}`)) || 0;
        const type = discQuestions[i].type;
        answers[type] += value;
    }
    
    // Normalizar resultados (convertir a porcentajes)
    const total = Object.values(answers).reduce((sum, val) => sum + val, 0);
    for (let type in answers) {
        answers[type] = Math.round((answers[type] / total) * 100);
    }
}

// Mostrar resultados
function showResults() {
    quizSection.classList.add('hidden');
    resultsSection.classList.remove('hidden');
    resultName.textContent = userName;
    
    // Crear gráfica de resultados
    const ctx = document.getElementById('results-chart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['D (Dominancia)', 'I (Influencia)', 'S (Estabilidad)', 'C (Cumplimiento)'],
            datasets: [{
                label: 'Porcentaje',
                data: [answers.D, answers.I, answers.S, answers.C],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.7)',
                    'rgba(54, 162, 235, 0.7)',
                    'rgba(255, 206, 86, 0.7)',
                    'rgba(75, 192, 192, 0.7)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100
                }
            },
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `${context.parsed.y}%`;
                        }
                    }
                }
            }
        }
    });
}

// Reiniciar el cuestionario
restartBtn.addEventListener('click', () => {
    // Limpiar datos de sessionStorage
    for (let i = 0; i < discQuestions.length; i++) {
        sessionStorage.removeItem(`question_${i}`);
    }
    
    // Reiniciar variables
    currentQuestionIndex = 0;
    
    // Volver a la pantalla inicial
    resultsSection.classList.add('hidden');
    introSection.classList.remove('hidden');
    document.getElementById('username').value = userName;
}); 