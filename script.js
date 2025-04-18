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

// Configuración EmailJS
(function() {
    // IMPORTANTE: Antes de usar, debes:
    // 1. Crear una cuenta en https://www.emailjs.com/
    // 2. Crear un servicio de correo (Gmail, Outlook, etc)
    // 3. Crear una plantilla de correo
    // 4. Reemplazar 'REEMPLAZAR_CON_TU_PUBLIC_KEY' con tu clave pública
    // 5. Reemplazar 'default_service' con el ID de tu servicio
    // 6. Reemplazar 'template_id' con el ID de tu plantilla
    emailjs.init("REEMPLAZAR_CON_TU_PUBLIC_KEY");
})();

// Variables globales
let currentQuestionIndex = 0;
let answers = {
    D: 0,
    I: 0,
    S: 0,
    C: 0
};
let userName = '';
let emailSent = false;

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
const emailStatus = document.getElementById('email-status');

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
        <div class="question-container">
            <h3>Pregunta ${index + 1} de ${discQuestions.length}</h3>
            <p class="question-text">${question.question}</p>
        </div>
        <div class="options">
            <div class="option-group">
                <input type="radio" id="option1" name="answer" value="5" ${getUserAnswer(index) === 5 ? 'checked' : ''}>
                <label for="option1" class="option-label">Totalmente de acuerdo</label>
            </div>
            <div class="option-group">
                <input type="radio" id="option2" name="answer" value="4" ${getUserAnswer(index) === 4 ? 'checked' : ''}>
                <label for="option2" class="option-label">De acuerdo</label>
            </div>
            <div class="option-group">
                <input type="radio" id="option3" name="answer" value="3" ${getUserAnswer(index) === 3 ? 'checked' : ''}>
                <label for="option3" class="option-label">Neutral</label>
            </div>
            <div class="option-group">
                <input type="radio" id="option4" name="answer" value="2" ${getUserAnswer(index) === 2 ? 'checked' : ''}>
                <label for="option4" class="option-label">En desacuerdo</label>
            </div>
            <div class="option-group">
                <input type="radio" id="option5" name="answer" value="1" ${getUserAnswer(index) === 1 ? 'checked' : ''}>
                <label for="option5" class="option-label">Totalmente en desacuerdo</label>
            </div>
        </div>
    `;
    
    // Añadir evento click a las opciones para avanzar automáticamente
    const optionGroups = document.querySelectorAll('.option-group');
    optionGroups.forEach(group => {
        group.addEventListener('click', () => {
            const radio = group.querySelector('input[type="radio"]');
            if (radio) {
                radio.checked = true;
                
                // Mostrar la selección visualmente
                optionGroups.forEach(g => g.classList.remove('selected'));
                group.classList.add('selected');
                
                // Pequeña pausa para mostrar la selección antes de avanzar
                setTimeout(() => {
                    if (currentQuestionIndex < discQuestions.length - 1) {
                        if (saveAnswer()) {
                            currentQuestionIndex++;
                            loadQuestion(currentQuestionIndex);
                        }
                    } else if (saveAnswer()) {
                        calculateResults();
                        showResults();
                    }
                }, 300);
            }
        });
    });
    
    // Actualizar visibilidad de los botones
    prevBtn.style.visibility = index === 0 ? 'hidden' : 'visible';
    nextBtn.textContent = index === discQuestions.length - 1 ? 'Ver resultados' : 'Siguiente';
}

// Obtener respuesta del usuario para una pregunta específica
function getUserAnswer(questionIndex) {
    const value = sessionStorage.getItem(`question_${questionIndex}`);
    return value ? parseInt(value) : null;
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
    const chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['D (Dominancia)', 'I (Influencia)', 'S (Estabilidad)', 'C (Cumplimiento)'],
            datasets: [{
                label: 'Porcentaje',
                data: [answers.D, answers.I, answers.S, answers.C],
                backgroundColor: [
                    'rgba(255, 117, 142, 0.7)',
                    'rgba(100, 182, 255, 0.7)',
                    'rgba(255, 206, 86, 0.7)',
                    'rgba(105, 212, 212, 0.7)'
                ],
                borderColor: [
                    'rgba(255, 117, 142, 0.9)',
                    'rgba(100, 182, 255, 0.9)',
                    'rgba(255, 206, 86, 0.9)',
                    'rgba(105, 212, 212, 0.9)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    grid: {
                        color: 'rgba(255, 255, 255, 0.08)'
                    },
                    ticks: {
                        color: '#c0c0d0'
                    }
                },
                x: {
                    grid: {
                        color: 'rgba(255, 255, 255, 0.08)'
                    },
                    ticks: {
                        color: '#c0c0d0'
                    }
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
                    },
                    backgroundColor: 'rgba(39, 39, 58, 0.9)',
                    titleColor: '#f0f0f5',
                    bodyColor: '#d1d1d8',
                    borderColor: 'rgba(60, 60, 80, 1)',
                    borderWidth: 1
                }
            }
        }
    });

    // Enviar resultados por correo
    sendResultsByEmail();
}

// Función para enviar resultados por correo
function sendResultsByEmail() {
    if (emailSent) return;
    
    emailStatus.textContent = "Enviando resultados...";
    emailStatus.className = "email-status sending";
    
    // Preparar el contenido del correo
    const resultsSummary = `
        Nombre: ${userName}
        
        Resultados DISC:
        - Dominancia (D): ${answers.D}%
        - Influencia (I): ${answers.I}%
        - Estabilidad (S): ${answers.S}%
        - Cumplimiento (C): ${answers.C}%
    `;
    
    const emailParams = {
        to_email: "namaruiz@gmail.com",
        subject: `Resultados Cuestionario DISC - ${userName}`,
        message: resultsSummary
    };
    
    // Enviar el correo usando EmailJS
    emailjs.send('default_service', 'template_id', emailParams)
        .then(function(response) {
            emailStatus.textContent = "¡Resultados enviados correctamente!";
            emailStatus.className = "email-status success";
            emailSent = true;
        }, function(error) {
            emailStatus.textContent = "Error al enviar resultados. Por favor, inténtalo de nuevo.";
            emailStatus.className = "email-status error";
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
    emailSent = false;
    
    // Volver a la pantalla inicial
    resultsSection.classList.add('hidden');
    introSection.classList.remove('hidden');
    document.getElementById('username').value = userName;
    
    // Limpiar el estado del correo
    emailStatus.textContent = "";
    emailStatus.className = "email-status";
}); 