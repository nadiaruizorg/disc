// Configuración EmailJS
(function() {
    // IMPORTANTE: Antes de usar, debes:
    // 1. Crear una cuenta en https://www.emailjs.com/
    // 2. Crear un servicio de correo (Gmail, Outlook, etc)
    // 3. Crear una plantilla de correo
    // 4. Reemplazar 'REEMPLAZAR_CON_TU_PUBLIC_KEY' con tu clave pública
    // 5. Reemplazar 'default_service' con el ID de tu servicio
    // 6. Reemplazar 'template_id' con el ID de tu plantilla
    
    // Comentado para evitar errores - Descomenta y configura cuando tengas tus credenciales
    // emailjs.init("REEMPLAZAR_CON_TU_PUBLIC_KEY");
})();

// Limpiar el sessionStorage al iniciar la aplicación para evitar respuestas guardadas
(function() {
    // Buscar todas las claves que comienzan con "trabajo_" o "privado_" para eliminarlas
    for (let i = 0; i < sessionStorage.length; i++) {
        const key = sessionStorage.key(i);
        if (key && (key.startsWith('trabajo_') || key.startsWith('privado_'))) {
            sessionStorage.removeItem(key);
            i--; // Ajustar el índice ya que se eliminó un elemento
        }
    }
    console.log('SessionStorage limpiado al iniciar la aplicación');
})();

// Configuración de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyA30RkqEJZwdSd09xCBapixsj2POgYR40Q",
    authDomain: "disc-3dd13.firebaseapp.com",
    projectId: "disc-3dd13",
    storageBucket: "disc-3dd13.firebasestorage.app",
    messagingSenderId: "916126279471",
    appId: "1:916126279471:web:205e0addfaf4aa25e3a3da"
};

// Variables para Firebase
let firebaseInitialized = false;
let db = null;

// Intentar inicializar Firebase
try {
  firebase.initializeApp(firebaseConfig);
  db = firebase.firestore();
  console.log("Firebase inicializado correctamente");
  firebaseInitialized = true;
} catch (error) {
  console.error("Error al inicializar Firebase:", error);
  console.log("La aplicación funcionará en modo local sin conexión a Firebase");
}

// Datos del cuestionario DISC (antes estaban en disc_data.json)
const discData = {
  "grupos": [
    {
      "id": 0,
      "trabajo": [
        {
          "adjetivo": "Entusiasta",
          "tipo": "I"
        },
        {
          "adjetivo": "Atrevido",
          "tipo": "D"
        },
        {
          "adjetivo": "Concienzudo",
          "tipo": "C"
        },
        {
          "adjetivo": "Amigable",
          "tipo": "S"
        }
      ],
      "privado": [
        {
          "adjetivo": "Entusiasta",
          "tipo": "I"
        },
        {
          "adjetivo": "Atrevido",
          "tipo": "D"
        },
        {
          "adjetivo": "Concienzudo",
          "tipo": "C"
        },
        {
          "adjetivo": "Amigable",
          "tipo": "S"
        }
      ]
    },
    {
      "id": 1,
      "trabajo": [
        {
          "adjetivo": "Lógico",
          "tipo": "C"
        },
        {
          "adjetivo": "Atractivo",
          "tipo": "I"
        },
        {
          "adjetivo": "Amable",
          "tipo": "S"
        },
        {
          "adjetivo": "Franco",
          "tipo": "D"
        }
      ],
      "privado": [
        {
          "adjetivo": "Lógico",
          "tipo": "C"
        },
        {
          "adjetivo": "Atractivo",
          "tipo": "I"
        },
        {
          "adjetivo": "Amable",
          "tipo": "S"
        },
        {
          "adjetivo": "Franco",
          "tipo": "D"
        }
      ]
    },
    {
      "id": 2,
      "trabajo": [
        {
          "adjetivo": "Conciliador",
          "tipo": "S"
        },
        {
          "adjetivo": "Extrovertido",
          "tipo": "I"
        },
        {
          "adjetivo": "Osado",
          "tipo": "D"
        },
        {
          "adjetivo": "Cuidadoso",
          "tipo": "C"
        }
      ],
      "privado": [
        {
          "adjetivo": "Conciliador",
          "tipo": "S"
        },
        {
          "adjetivo": "Extrovertido",
          "tipo": "I"
        },
        {
          "adjetivo": "Osado",
          "tipo": "D"
        },
        {
          "adjetivo": "Cuidadoso",
          "tipo": "C"
        }
      ]
    },
    {
      "id": 3,
      "trabajo": [
        {
          "adjetivo": "Persistente",
          "tipo": "D"
        },
        {
          "adjetivo": "Discreto",
          "tipo": "C"
        },
        {
          "adjetivo": "Comprensivo",
          "tipo": "S"
        },
        {
          "adjetivo": "Encantador",
          "tipo": "I"
        }
      ],
      "privado": [
        {
          "adjetivo": "Persistente",
          "tipo": "D"
        },
        {
          "adjetivo": "Discreto",
          "tipo": "C"
        },
        {
          "adjetivo": "Comprensivo",
          "tipo": "S"
        },
        {
          "adjetivo": "Encantador",
          "tipo": "I"
        }
      ]
    },
    {
      "id": 4,
      "trabajo": [
        {
          "adjetivo": "Controlado",
          "tipo": "S"
        },
        {
          "adjetivo": "Disciplinado",
          "tipo": "C"
        },
        {
          "adjetivo": "Hablador",
          "tipo": "I"
        },
        {
          "adjetivo": "Emprendedor",
          "tipo": "D"
        }
      ],
      "privado": [
        {
          "adjetivo": "Controlado",
          "tipo": "S"
        },
        {
          "adjetivo": "Disciplinado",
          "tipo": "C"
        },
        {
          "adjetivo": "Hablador",
          "tipo": "I"
        },
        {
          "adjetivo": "Emprendedor",
          "tipo": "D"
        }
      ]
    },
    {
      "id": 5,
      "trabajo": [
        {
          "adjetivo": "Me cuesta decir que \"NO\"",
          "tipo": "S"
        },
        {
          "adjetivo": "Alma de la fiesta",
          "tipo": "I"
        },
        {
          "adjetivo": "Seguro de sí mismo",
          "tipo": "D"
        },
        {
          "adjetivo": "Cumplidor",
          "tipo": "C"
        }
      ],
      "privado": [
        {
          "adjetivo": "Me cuesta decir que \"NO\"",
          "tipo": "S"
        },
        {
          "adjetivo": "Alma de la fiesta",
          "tipo": "I"
        },
        {
          "adjetivo": "Seguro de sí mismo",
          "tipo": "D"
        },
        {
          "adjetivo": "Cumplidor",
          "tipo": "C"
        }
      ]
    },
    {
      "id": 6,
      "trabajo": [
        {
          "adjetivo": "Respetuoso",
          "tipo": "S"
        },
        {
          "adjetivo": "Obstinado",
          "tipo": "D"
        },
        {
          "adjetivo": "Comunicador",
          "tipo": "I"
        },
        {
          "adjetivo": "Organizado",
          "tipo": "C"
        }
      ],
      "privado": [
        {
          "adjetivo": "Respetuoso",
          "tipo": "S"
        },
        {
          "adjetivo": "Obstinado",
          "tipo": "D"
        },
        {
          "adjetivo": "Comunicador",
          "tipo": "I"
        },
        {
          "adjetivo": "Organizado",
          "tipo": "C"
        }
      ]
    },
    {
      "id": 7,
      "trabajo": [
        {
          "adjetivo": "Competitivo",
          "tipo": "D"
        },
        {
          "adjetivo": "Estable",
          "tipo": "S"
        },
        {
          "adjetivo": "Don de gentes",
          "tipo": "I"
        },
        {
          "adjetivo": "Minucioso",
          "tipo": "C"
        }
      ],
      "privado": [
        {
          "adjetivo": "Competitivo",
          "tipo": "D"
        },
        {
          "adjetivo": "Estable",
          "tipo": "S"
        },
        {
          "adjetivo": "Don de gentes",
          "tipo": "I"
        },
        {
          "adjetivo": "Minucioso",
          "tipo": "C"
        }
      ]
    },
    {
      "id": 8,
      "trabajo": [
        {
          "adjetivo": "Sociable",
          "tipo": "I"
        },
        {
          "adjetivo": "Dominante",
          "tipo": "D"
        },
        {
          "adjetivo": "Reflexivo",
          "tipo": "C"
        },
        {
          "adjetivo": "Adaptable",
          "tipo": "S"
        }
      ],
      "privado": [
        {
          "adjetivo": "Sociable",
          "tipo": "I"
        },
        {
          "adjetivo": "Dominante",
          "tipo": "D"
        },
        {
          "adjetivo": "Reflexivo",
          "tipo": "C"
        },
        {
          "adjetivo": "Adaptable",
          "tipo": "S"
        }
      ]
    },
    {
      "id": 9,
      "trabajo": [
        {
          "adjetivo": "Reservado",
          "tipo": "C"
        },
        {
          "adjetivo": "Persuasivo",
          "tipo": "I"
        },
        {
          "adjetivo": "Atento",
          "tipo": "S"
        },
        {
          "adjetivo": "Directo",
          "tipo": "D"
        }
      ],
      "privado": [
        {
          "adjetivo": "Reservado",
          "tipo": "C"
        },
        {
          "adjetivo": "Persuasivo",
          "tipo": "I"
        },
        {
          "adjetivo": "Atento",
          "tipo": "S"
        },
        {
          "adjetivo": "Directo",
          "tipo": "D"
        }
      ]
    },
    {
      "id": 10,
      "trabajo": [
        {
          "adjetivo": "Enérgico",
          "tipo": "I"
        },
        {
          "adjetivo": "Tolerante",
          "tipo": "S"
        },
        {
          "adjetivo": "Decidido",
          "tipo": "D"
        },
        {
          "adjetivo": "Preciso",
          "tipo": "C"
        }
      ],
      "privado": [
        {
          "adjetivo": "Enérgico",
          "tipo": "I"
        },
        {
          "adjetivo": "Tolerante",
          "tipo": "S"
        },
        {
          "adjetivo": "Decidido",
          "tipo": "D"
        },
        {
          "adjetivo": "Preciso",
          "tipo": "C"
        }
      ]
    },
    {
      "id": 11,
      "trabajo": [
        {
          "adjetivo": "Exigente",
          "tipo": "D"
        },
        {
          "adjetivo": "Expresivo",
          "tipo": "I"
        },
        {
          "adjetivo": "Perfeccionista",
          "tipo": "C"
        },
        {
          "adjetivo": "Considerado",
          "tipo": "S"
        }
      ],
      "privado": [
        {
          "adjetivo": "Exigente",
          "tipo": "D"
        },
        {
          "adjetivo": "Expresivo",
          "tipo": "I"
        },
        {
          "adjetivo": "Perfeccionista",
          "tipo": "C"
        },
        {
          "adjetivo": "Considerado",
          "tipo": "S"
        }
      ]
    },
    {
      "id": 12,
      "trabajo": [
        {
          "adjetivo": "Efusivo",
          "tipo": "I"
        },
        {
          "adjetivo": "Complaciente",
          "tipo": "S"
        },
        {
          "adjetivo": "Receptivo",
          "tipo": "C"
        },
        {
          "adjetivo": "Innovador",
          "tipo": "D"
        }
      ],
      "privado": [
        {
          "adjetivo": "Efusivo",
          "tipo": "I"
        },
        {
          "adjetivo": "Complaciente",
          "tipo": "S"
        },
        {
          "adjetivo": "Receptivo",
          "tipo": "C"
        },
        {
          "adjetivo": "Innovador",
          "tipo": "D"
        }
      ]
    },
    {
      "id": 13,
      "trabajo": [
        {
          "adjetivo": "Asumo retos",
          "tipo": "D"
        },
        {
          "adjetivo": "Paciente",
          "tipo": "S"
        },
        {
          "adjetivo": "Instruido",
          "tipo": "C"
        },
        {
          "adjetivo": "Efusivo",
          "tipo": "I"
        }
      ],
      "privado": [
        {
          "adjetivo": "Asumo retos",
          "tipo": "D"
        },
        {
          "adjetivo": "Paciente",
          "tipo": "S"
        },
        {
          "adjetivo": "Instruido",
          "tipo": "C"
        },
        {
          "adjetivo": "Efusivo",
          "tipo": "I"
        }
      ]
    }
  ],
  "instrucciones": {
    "titulo": "Cuestionario DISC",
    "descripcion": "En cada grupo de 4 adjetivos, puntúa del 1 al 4 según te identifiques con ellos, donde 1 es el más representativo y 4 el menos.",
    "trabajo": "Ámbito laboral",
    "privado": "Ámbito privado"
  }
};

// Variables para el cuestionario
let currentGroupIndex = 0;
let currentSection = 'trabajo'; // 'trabajo' o 'privado'
let currentUser = ''; // Variable para almacenar el nombre del usuario actual

// Variables globales para resultados
let resultados = {
    trabajo: { D: 0, I: 0, S: 0, C: 0 },
    privado: { D: 0, I: 0, S: 0, C: 0 }
};

// Elementos del DOM
const introSection = document.getElementById('intro-section');
const discSection = document.getElementById('disc-section');
const resultsSection = document.getElementById('results-section');
const startButton = document.getElementById('start-button');
const prevButton = document.getElementById('prev-button');
const nextButton = document.getElementById('next-button');
const adjectivesContainer = document.getElementById('adjectives-container');
const progressBar = document.getElementById('progress-bar');
const restartButton = document.getElementById('restart-button');
const contextTitle = document.getElementById('context-title');
const groupNumber = document.getElementById('group-number');

// Evento para el botón de inicio
startButton.addEventListener('click', () => {
    const nombreUsuario = document.getElementById('nombre-usuario').value.trim();
    if (!nombreUsuario) {
        alert('Por favor, ingresa tu nombre para continuar.');
        return;
    }
    
    currentUser = nombreUsuario;
    
    // Limpiar cualquier respuesta previa
    inicializarRespuestas();
    
    // Verificar si es el administrador
    if (nombreUsuario.toLowerCase() === "nadia ruiz") {
        mostrarPanelAdmin();
    } else {
        // Usuario normal, iniciar cuestionario
    introSection.classList.add('hidden');
        discSection.classList.remove('hidden');
        contextTitle.textContent = discData.instrucciones.trabajo;
        loadQuestion();
    }
});

// Variables para ordenación
let ordenActual = 'nombre';
let ordenAscendente = true;

// Función para mostrar el panel de administrador
function mostrarPanelAdmin() {
    // Ocultar todas las secciones visibles
    introSection.classList.add('hidden');
    discSection.classList.add('hidden');
    resultsSection.classList.add('hidden');
    
    // Verificar si ya existe el panel de administrador
    let adminSection = document.getElementById('admin-section');
    
    if (!adminSection) {
        // Crear la sección de administrador
        adminSection = document.createElement('div');
        adminSection.id = 'admin-section';
        adminSection.className = 'section';
        adminSection.innerHTML = `
            <h2>Panel de Administración</h2>
            <p>Bienvenida, Nadia. Aquí puedes ver los resultados de todos los usuarios.</p>
            
            <div class="admin-content">
                <div id="users-list-container">
                    <h3>Usuarios que han completado el cuestionario:</h3>
                    <div class="sort-options">
                        <span>Ordenar por: </span>
                        <button id="sort-by-name" class="sort-btn active">Nombre</button>
                        <button id="sort-by-date" class="sort-btn">Fecha</button>
                    </div>
                    <div id="users-list" class="users-list"></div>
            </div>
                
                <div id="user-results-container" class="hidden">
                    <div class="user-results-header">
                        <h3 id="selected-user-name"></h3>
            </div>
                    
                    <div class="user-info">
                        <div class="user-name" id="admin-user-name"></div>
                        <div class="test-date" id="admin-test-date"></div>
            </div>
                    
                    <div class="results-container">
                        <div class="chart-section">
                            <h3>Ámbito Laboral</h3>
                            <div class="chart-container">
                                <canvas id="admin-chart-trabajo"></canvas>
            </div>
            </div>
                        <div class="chart-section">
                            <h3>Ámbito Privado</h3>
                            <div class="chart-container">
                                <canvas id="admin-chart-privado"></canvas>
                            </div>
                        </div>
                    </div>
                    
                    <div class="section disc-explanation">
                        <h3>Detalles de los resultados</h3>
                        <table class="scores-table">
                            <thead>
                                <tr>
                                    <th>Dimensión</th>
                                    <th>Trabajo</th>
                                    <th>Privado</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td><span class="disc-color d"></span> D (Dominancia)</td>
                                    <td class="score" id="admin-score-d-trabajo">-</td>
                                    <td class="score" id="admin-score-d-privado">-</td>
                                </tr>
                                <tr>
                                    <td><span class="disc-color i"></span> I (Influencia)</td>
                                    <td class="score" id="admin-score-i-trabajo">-</td>
                                    <td class="score" id="admin-score-i-privado">-</td>
                                </tr>
                                <tr>
                                    <td><span class="disc-color s"></span> S (Estabilidad)</td>
                                    <td class="score" id="admin-score-s-trabajo">-</td>
                                    <td class="score" id="admin-score-s-privado">-</td>
                                </tr>
                                <tr>
                                    <td><span class="disc-color c"></span> C (Cumplimiento)</td>
                                    <td class="score" id="admin-score-c-trabajo">-</td>
                                    <td class="score" id="admin-score-c-privado">-</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    
                    <div class="admin-buttons" style="text-align: center; margin-top: 20px;">
                        <button id="back-to-users-btn" class="button" style="margin: 0 auto 15px auto; display: block; max-width: 300px;">Volver a la lista</button>
                    </div>
                </div>
            </div>
            
            <div style="text-align: center; margin-top: 20px;">
                <button id="logout-btn" class="button" style="margin: 0 auto; display: block; max-width: 300px;">Cerrar sesión</button>
        </div>
    `;
        
        document.body.appendChild(adminSection);
        
        // Agregar eventos a los botones
        document.getElementById('logout-btn').addEventListener('click', () => {
            adminSection.classList.add('hidden');
            introSection.classList.remove('hidden');
            document.getElementById('nombre-usuario').value = '';
        });
        
        document.getElementById('back-to-users-btn').addEventListener('click', () => {
            document.getElementById('user-results-container').classList.add('hidden');
            document.getElementById('users-list-container').classList.remove('hidden');
        });
        
        // Agregar eventos para los botones de ordenación
        // Función para actualizar etiquetas de los botones con indicadores de orden
        function actualizarBotonesOrden() {
            const nombreBtn = document.getElementById('sort-by-name');
            const fechaBtn = document.getElementById('sort-by-date');
            
            // Resetear textos
            nombreBtn.textContent = "Nombre";
            fechaBtn.textContent = "Fecha";
            
            // Añadir indicador al botón activo
            if (ordenActual === 'nombre') {
                nombreBtn.textContent = `Nombre ${ordenAscendente ? '↑' : '↓'}`;
            } else {
                fechaBtn.textContent = `Fecha ${ordenAscendente ? '↑' : '↓'}`;
            }
        }

        document.getElementById('sort-by-name').addEventListener('click', () => {
            // Si ya estaba activo, invertir el orden
            if (ordenActual === 'nombre') {
                ordenAscendente = !ordenAscendente;
            } else {
                ordenActual = 'nombre';
                ordenAscendente = true;
            }
            
            document.getElementById('sort-by-name').classList.add('active');
            document.getElementById('sort-by-date').classList.remove('active');
            actualizarBotonesOrden();
            cargarListaUsuarios(ordenActual, ordenAscendente);
        });

        document.getElementById('sort-by-date').addEventListener('click', () => {
            // Si ya estaba activo, invertir el orden
            if (ordenActual === 'fecha') {
                ordenAscendente = !ordenAscendente;
            } else {
                ordenActual = 'fecha';
                ordenAscendente = false; // Por defecto, las fechas más recientes primero
            }
            
            document.getElementById('sort-by-name').classList.remove('active');
            document.getElementById('sort-by-date').classList.add('active');
            actualizarBotonesOrden();
            cargarListaUsuarios(ordenActual, ordenAscendente);
        });
        
        // Inicializar los indicadores de orden
        actualizarBotonesOrden();
    } else {
        // Si ya existe, simplemente mostrarlo
        adminSection.classList.remove('hidden');
    }
    
    // Cargar la lista de usuarios (por defecto ordenada por nombre)
    cargarListaUsuarios(ordenActual, ordenAscendente);
}

// Función para cargar la lista de usuarios
function cargarListaUsuarios(ordenarPor = 'nombre', ascendente = true) {
    const usersListContainer = document.getElementById('users-list');
    usersListContainer.innerHTML = '<p>Cargando usuarios...</p>';
    
    // Verificar si Firebase está disponible
    if (!firebaseInitialized || !db) {
        console.log("Firebase no está disponible, intentando cargar datos de localStorage");
        
        // Buscar usuarios en localStorage como respaldo
        const usuariosData = [];
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key && key.startsWith('resultados_')) {
                try {
                    const datos = JSON.parse(localStorage.getItem(key));
                    const nombreUsuario = key.replace('resultados_', '');
                    console.log("LocalStorage - datos usuario:", nombreUsuario, datos);
                    
                    // Intentar convertir la fecha a objeto Date
                    let fechaObj;
                    try {
                        if (datos.fecha) {
                            fechaObj = new Date(datos.fecha);
                            console.log("LocalStorage - fecha convertida:", fechaObj);
                        } else {
                            fechaObj = new Date();
                            console.log("LocalStorage - sin fecha, usando actual:", fechaObj);
                        }
                    } catch (error) {
                        console.error("Error al convertir fecha:", error);
                        fechaObj = new Date();
                    }
                    
                    usuariosData.push({
                        nombre: nombreUsuario,
                        fecha: fechaObj,
                        datos: datos
                    });
                } catch (error) {
                    console.error("Error al procesar datos de localStorage:", error);
                }
            }
        }
        
        // Mostrar mensaje si no hay usuarios
        if (usuariosData.length === 0) {
            usersListContainer.innerHTML = '<p class="no-users">No hay usuarios que hayan completado el cuestionario.</p>';
            return;
        }
        
        // Ordenar la lista de usuarios según el criterio seleccionado
        if (ordenarPor === 'nombre') {
            usuariosData.sort((a, b) => {
                return ascendente ? 
                    a.nombre.localeCompare(b.nombre) : 
                    b.nombre.localeCompare(a.nombre);
            });
            console.log("Ordenado por nombre " + (ascendente ? "ascendente" : "descendente") + ":", usuariosData.map(u => u.nombre));
        } else if (ordenarPor === 'fecha') {
            // Asegurarse de que las fechas son objetos Date válidos
            usuariosData.sort((a, b) => {
                console.log(`Comparando ${a.nombre} (${a.fecha}) con ${b.nombre} (${b.fecha})`);
                // Validar que ambas fechas sean objetos Date
                const fechaA = a.fecha instanceof Date && !isNaN(a.fecha) ? a.fecha : new Date();
                const fechaB = b.fecha instanceof Date && !isNaN(b.fecha) ? b.fecha : new Date();
                return ascendente ? 
                    fechaA.getTime() - fechaB.getTime() : 
                    fechaB.getTime() - fechaA.getTime();
            });
            console.log("Ordenado por fecha:", usuariosData.map(u => `${u.nombre} (${u.fecha.toLocaleDateString()})`));
        }
        
        // Crear la lista de usuarios
        const ul = document.createElement('ul');
        
        usuariosData.forEach(usuarioData => {
            const li = document.createElement('li');
            li.className = 'user-item';
            
            // Formatear la fecha para mostrarla
            let fechaFormateada = "";
            try {
                const fecha = new Date(usuarioData.fecha);
                if (!isNaN(fecha.getTime())) {
                    fechaFormateada = fecha.toLocaleDateString();
                }
            } catch (e) {
                console.error("Error al formatear fecha:", e);
            }
            
            // Mostrar nombre y fecha si se está ordenando por fecha
            if (ordenarPor === 'fecha') {
                li.innerHTML = `<span class="user-name">${usuarioData.nombre}</span><span class="user-date">${fechaFormateada}</span>`;
            } else {
                li.textContent = usuarioData.nombre;
            }
            
            li.addEventListener('click', () => mostrarResultadosUsuario(usuarioData.nombre));
            ul.appendChild(li);
        });
        
        usersListContainer.innerHTML = '';
        usersListContainer.appendChild(ul);
        return;
    }
    
    // Si Firebase está disponible, obtener usuarios desde Firestore
    db.collection("resultados_disc").get()
        .then((querySnapshot) => {
            const usuariosData = [];
            
            querySnapshot.forEach((doc) => {
                const datos = doc.data();
                console.log("Datos de usuario:", doc.id, datos);
                console.log("Fecha original:", datos.fecha);
                
                // Intentar convertir la fecha a objeto Date
                let fechaObj;
                try {
                    // Si es un timestamp de Firestore, usar toDate()
                    if (datos.fecha && typeof datos.fecha.toDate === 'function') {
                        fechaObj = datos.fecha.toDate();
                        console.log("Convertida desde Timestamp:", fechaObj);
                    } 
                    // Si es una cadena ISO o un objeto Date
                    else if (datos.fecha) {
                        fechaObj = new Date(datos.fecha);
                        console.log("Convertida desde string:", fechaObj);
                    } 
                    // Si no hay fecha, usar la actual
                    else {
                        fechaObj = new Date();
                        console.log("Sin fecha, usando actual:", fechaObj);
                    }
                } catch (error) {
                    console.error("Error al convertir fecha:", error);
                    fechaObj = new Date(); // Usar fecha actual como respaldo
                }
                
                usuariosData.push({
                    nombre: doc.id,
                    fecha: fechaObj,
                    datos: datos
                });
            });
            
            console.log("Datos recolectados antes de ordenar:", usuariosData);
            
            // Mostrar mensaje si no hay usuarios
            if (usuariosData.length === 0) {
                usersListContainer.innerHTML = '<p class="no-users">No hay usuarios que hayan completado el cuestionario.</p>';
                return;
            }
            
            // Ordenar la lista de usuarios según el criterio seleccionado
            if (ordenarPor === 'nombre') {
                usuariosData.sort((a, b) => {
                    return ascendente ? 
                        a.nombre.localeCompare(b.nombre) : 
                        b.nombre.localeCompare(a.nombre);
                });
                console.log("Ordenado por nombre " + (ascendente ? "ascendente" : "descendente") + ":", usuariosData.map(u => u.nombre));
            } else if (ordenarPor === 'fecha') {
                // Asegurarse de que las fechas son objetos Date válidos
                usuariosData.sort((a, b) => {
                    console.log(`Comparando ${a.nombre} (${a.fecha}) con ${b.nombre} (${b.fecha})`);
                    // Validar que ambas fechas sean objetos Date
                    const fechaA = a.fecha instanceof Date && !isNaN(a.fecha) ? a.fecha : new Date();
                    const fechaB = b.fecha instanceof Date && !isNaN(b.fecha) ? b.fecha : new Date();
                    return ascendente ? fechaA.getTime() - fechaB.getTime() : fechaB.getTime() - fechaA.getTime();
                });
                console.log("Ordenado por fecha:", usuariosData.map(u => `${u.nombre} (${u.fecha.toLocaleDateString()})`));
            }
            
            // Crear la lista de usuarios
            const ul = document.createElement('ul');
            
            usuariosData.forEach(usuarioData => {
                const li = document.createElement('li');
                li.className = 'user-item';
                
                // Formatear la fecha para mostrarla
                let fechaFormateada = "";
                try {
                    if (!isNaN(usuarioData.fecha.getTime())) {
                        fechaFormateada = usuarioData.fecha.toLocaleDateString();
                    }
                } catch (e) {
                    console.error("Error al formatear fecha:", e);
                }
                
                // Mostrar nombre y fecha si se está ordenando por fecha
                if (ordenarPor === 'fecha') {
                    li.innerHTML = `<span class="user-name">${usuarioData.nombre}</span><span class="user-date">${fechaFormateada}</span>`;
                } else {
                    li.textContent = usuarioData.nombre;
                }
                
                li.addEventListener('click', () => mostrarResultadosUsuario(usuarioData.nombre));
                ul.appendChild(li);
            });
            
            usersListContainer.innerHTML = '';
            usersListContainer.appendChild(ul);
        })
        .catch((error) => {
            console.error("Error al cargar usuarios desde Firebase:", error);
            usersListContainer.innerHTML = '<p class="error">Error al cargar la lista de usuarios.</p>';
            
            // Intentar cargar desde localStorage como respaldo
            console.log("Intentando cargar desde localStorage después del error de Firebase");
            const usuariosData = [];
            for (let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i);
                if (key && key.startsWith('resultados_')) {
                    try {
                        const datos = JSON.parse(localStorage.getItem(key));
                        const nombreUsuario = key.replace('resultados_', '');
                        console.log("Respaldo - datos usuario:", nombreUsuario, datos);
                        
                        // Intentar convertir la fecha a objeto Date
                        let fechaObj;
                        try {
                            if (datos.fecha) {
                                fechaObj = new Date(datos.fecha);
                                console.log("Respaldo - fecha convertida:", fechaObj);
                            } else {
                                fechaObj = new Date();
                                console.log("Respaldo - sin fecha, usando actual:", fechaObj);
                            }
                        } catch (error) {
                            console.error("Error al convertir fecha:", error);
                            fechaObj = new Date();
                        }
                        
                        usuariosData.push({
                            nombre: nombreUsuario,
                            fecha: fechaObj,
                            datos: datos
                        });
                    } catch (error) {
                        console.error("Error al procesar datos de localStorage:", error);
                    }
                }
            }
            
            if (usuariosData.length > 0) {
                // Ordenar la lista de usuarios según el criterio seleccionado
                if (ordenarPor === 'nombre') {
                    usuariosData.sort((a, b) => {
                        return ascendente ? 
                            a.nombre.localeCompare(b.nombre) : 
                            b.nombre.localeCompare(a.nombre);
                    });
                    console.log("Respaldo - ordenado por nombre " + (ascendente ? "ascendente" : "descendente") + ":", usuariosData.map(u => u.nombre));
                } else if (ordenarPor === 'fecha') {
                    // Asegurarse de que las fechas son objetos Date válidos
                    usuariosData.sort((a, b) => {
                        console.log(`Respaldo - comparando ${a.nombre} (${a.fecha}) con ${b.nombre} (${b.fecha})`);
                        // Validar que ambas fechas sean objetos Date
                        const fechaA = a.fecha instanceof Date && !isNaN(a.fecha) ? a.fecha : new Date();
                        const fechaB = b.fecha instanceof Date && !isNaN(b.fecha) ? b.fecha : new Date();
                        return ascendente ? 
                            fechaA.getTime() - fechaB.getTime() : 
                            fechaB.getTime() - fechaA.getTime();
                    });
                    console.log("Respaldo - ordenado por fecha:", usuariosData.map(u => `${u.nombre} (${u.fecha})`));
                }
                
                const ul = document.createElement('ul');
                
                usuariosData.forEach(usuarioData => {
                    const li = document.createElement('li');
                    li.className = 'user-item';
                    
                    // Formatear la fecha para mostrarla
                    let fechaFormateada = "";
                    try {
                        const fecha = new Date(usuarioData.fecha);
                        if (!isNaN(fecha.getTime())) {
                            fechaFormateada = fecha.toLocaleDateString();
                        }
                    } catch (e) {
                        console.error("Error al formatear fecha:", e);
                    }
                    
                    // Mostrar nombre y fecha si se está ordenando por fecha
                    if (ordenarPor === 'fecha') {
                        li.innerHTML = `<span class="user-name">${usuarioData.nombre}</span><span class="user-date">${fechaFormateada}</span>`;
                    } else {
                        li.textContent = usuarioData.nombre;
                    }
                    
                    li.addEventListener('click', () => mostrarResultadosUsuario(usuarioData.nombre));
                    ul.appendChild(li);
                });
                
                usersListContainer.innerHTML = '';
                usersListContainer.appendChild(ul);
            }
        });
}

// Función para mostrar los resultados de un usuario específico
function mostrarResultadosUsuario(usuario) {
    // Obtener los contenedores
    const usersListContainer = document.getElementById('users-list-container');
    const userResultsContainer = document.getElementById('user-results-container');
    
    // Ocultar lista y mostrar resultados
    usersListContainer.classList.add('hidden');
    userResultsContainer.classList.remove('hidden');
    
    // Mostrar el nombre del usuario seleccionado
    document.getElementById('selected-user-name').textContent = `Resultados de ${usuario}`;
    document.getElementById('admin-user-name').textContent = usuario;
    
    // Verificar si Firebase está disponible
    if (!firebaseInitialized || !db) {
        console.log("Firebase no está disponible, intentando cargar resultados desde localStorage");
        
        // Buscar resultados en localStorage como respaldo
        const datosGuardados = localStorage.getItem(`resultados_${usuario}`);
        
        if (datosGuardados) {
            try {
                const datosUsuario = JSON.parse(datosGuardados);
                const resultadosUsuario = datosUsuario.resultados;
                
                // Mostrar detalles
                const fechaTest = datosUsuario.fecha ? new Date(datosUsuario.fecha) : new Date();
                let fechaFormateada = "";

                try {
                    // Verificar que la fecha sea válida
                    if (isNaN(fechaTest.getTime())) {
                        // Si la fecha es inválida, mostrar fecha actual
                        fechaFormateada = new Date().toLocaleDateString();
                        console.warn("Fecha inválida detectada, usando fecha actual:", fechaFormateada);
                    } else {
                        // Si la fecha es válida, mostrar fecha normal
                        fechaFormateada = fechaTest.toLocaleDateString();
                    }
                } catch (e) {
                    // En caso de error, mostrar fecha actual
                    fechaFormateada = new Date().toLocaleDateString();
                    console.error("Error al formatear fecha:", e);
                }

                document.getElementById('admin-test-date').textContent = `Fecha: ${fechaFormateada}`;

                // Actualizar puntuaciones en la tabla
                document.getElementById('admin-score-d-trabajo').textContent = resultadosUsuario.trabajo.D;
                document.getElementById('admin-score-i-trabajo').textContent = resultadosUsuario.trabajo.I;
                document.getElementById('admin-score-s-trabajo').textContent = resultadosUsuario.trabajo.S;
                document.getElementById('admin-score-c-trabajo').textContent = resultadosUsuario.trabajo.C;

                document.getElementById('admin-score-d-privado').textContent = resultadosUsuario.privado.D;
                document.getElementById('admin-score-i-privado').textContent = resultadosUsuario.privado.I;
                document.getElementById('admin-score-s-privado').textContent = resultadosUsuario.privado.S;
                document.getElementById('admin-score-c-privado').textContent = resultadosUsuario.privado.C;

                // Asegurarse de que los canvas estén limpios
                const trabajoCanvas = document.getElementById('admin-chart-trabajo');
                const privadoCanvas = document.getElementById('admin-chart-privado');
                if (trabajoCanvas && privadoCanvas) {
                    const trabajoCtx = trabajoCanvas.getContext('2d');
                    const privadoCtx = privadoCanvas.getContext('2d');
                    
                    trabajoCtx.clearRect(0, 0, trabajoCanvas.width, trabajoCanvas.height);
                    privadoCtx.clearRect(0, 0, privadoCanvas.width, privadoCanvas.height);

                    // Crear gráficos con los valores correctos
                    console.log("Datos para gráfico trabajo:", resultadosUsuario.trabajo);
                    console.log("Datos para gráfico privado:", resultadosUsuario.privado);
                    
                    createAdminChart('admin-chart-trabajo', resultadosUsuario.trabajo, 'Ámbito Laboral');
                    createAdminChart('admin-chart-privado', resultadosUsuario.privado, 'Ámbito Privado');
                }
                
                return;
            } catch (error) {
                console.error("Error al procesar datos locales:", error);
                userResultsContainer.innerHTML = `<p class="error">Error al cargar los resultados locales.</p>`;
                return;
            }
        } else {
            userResultsContainer.innerHTML = `<p>No se encontraron resultados para ${usuario}</p>`;
            return;
        }
    }
    
    // Si Firebase está disponible, obtener resultados desde Firestore
    db.collection("resultados_disc").doc(usuario).get()
        .then((doc) => {
            if (doc.exists) {
                const datosUsuario = doc.data();
                const resultadosUsuario = datosUsuario.resultados;
                
                // Mostrar detalles
                const fechaTest = datosUsuario.fecha ? new Date(datosUsuario.fecha) : new Date();
                let fechaFormateada = "";

                try {
                    // Verificar que la fecha sea válida
                    if (isNaN(fechaTest.getTime())) {
                        // Si la fecha es inválida, mostrar fecha actual
                        fechaFormateada = new Date().toLocaleDateString();
                        console.warn("Fecha inválida detectada, usando fecha actual:", fechaFormateada);
                    } else {
                        // Si la fecha es válida, mostrar fecha normal
                        fechaFormateada = fechaTest.toLocaleDateString();
                    }
                } catch (e) {
                    // En caso de error, mostrar fecha actual
                    fechaFormateada = new Date().toLocaleDateString();
                    console.error("Error al formatear fecha:", e);
                }

                document.getElementById('admin-test-date').textContent = `Fecha: ${fechaFormateada}`;

                // Actualizar puntuaciones en la tabla
                document.getElementById('admin-score-d-trabajo').textContent = resultadosUsuario.trabajo.D;
                document.getElementById('admin-score-i-trabajo').textContent = resultadosUsuario.trabajo.I;
                document.getElementById('admin-score-s-trabajo').textContent = resultadosUsuario.trabajo.S;
                document.getElementById('admin-score-c-trabajo').textContent = resultadosUsuario.trabajo.C;

                document.getElementById('admin-score-d-privado').textContent = resultadosUsuario.privado.D;
                document.getElementById('admin-score-i-privado').textContent = resultadosUsuario.privado.I;
                document.getElementById('admin-score-s-privado').textContent = resultadosUsuario.privado.S;
                document.getElementById('admin-score-c-privado').textContent = resultadosUsuario.privado.C;

                // Asegurarse de que los canvas estén limpios
                const trabajoCanvas = document.getElementById('admin-chart-trabajo');
                const privadoCanvas = document.getElementById('admin-chart-privado');
                if (trabajoCanvas && privadoCanvas) {
                    const trabajoCtx = trabajoCanvas.getContext('2d');
                    const privadoCtx = privadoCanvas.getContext('2d');
                    
                    trabajoCtx.clearRect(0, 0, trabajoCanvas.width, trabajoCanvas.height);
                    privadoCtx.clearRect(0, 0, privadoCanvas.width, privadoCanvas.height);

                    // Crear gráficos con los valores correctos
                    console.log("Datos para gráfico trabajo:", resultadosUsuario.trabajo);
                    console.log("Datos para gráfico privado:", resultadosUsuario.privado);
                    
                    createAdminChart('admin-chart-trabajo', resultadosUsuario.trabajo, 'Ámbito Laboral');
                    createAdminChart('admin-chart-privado', resultadosUsuario.privado, 'Ámbito Privado');
                }
                
            } else {
                // Intentar buscar en localStorage como respaldo
                const datosGuardados = localStorage.getItem(`resultados_${usuario}`);
                
                if (datosGuardados) {
                    try {
                        const datosUsuario = JSON.parse(datosGuardados);
                        const resultadosUsuario = datosUsuario.resultados;
                        
                        // Mostrar detalles
                        const fechaTest = datosUsuario.fecha ? new Date(datosUsuario.fecha) : new Date();
                        let fechaFormateada = "";

                        try {
                            // Verificar que la fecha sea válida
                            if (isNaN(fechaTest.getTime())) {
                                // Si la fecha es inválida, mostrar fecha actual
                                fechaFormateada = new Date().toLocaleDateString();
                                console.warn("Fecha inválida detectada, usando fecha actual:", fechaFormateada);
                            } else {
                                // Si la fecha es válida, mostrar fecha normal
                                fechaFormateada = fechaTest.toLocaleDateString();
                            }
                        } catch (e) {
                            // En caso de error, mostrar fecha actual
                            fechaFormateada = new Date().toLocaleDateString();
                            console.error("Error al formatear fecha:", e);
                        }

                        document.getElementById('admin-test-date').textContent = `Fecha: ${fechaFormateada}`;

                        // Actualizar puntuaciones en la tabla
                        document.getElementById('admin-score-d-trabajo').textContent = resultadosUsuario.trabajo.D;
                        document.getElementById('admin-score-i-trabajo').textContent = resultadosUsuario.trabajo.I;
                        document.getElementById('admin-score-s-trabajo').textContent = resultadosUsuario.trabajo.S;
                        document.getElementById('admin-score-c-trabajo').textContent = resultadosUsuario.trabajo.C;

                        document.getElementById('admin-score-d-privado').textContent = resultadosUsuario.privado.D;
                        document.getElementById('admin-score-i-privado').textContent = resultadosUsuario.privado.I;
                        document.getElementById('admin-score-s-privado').textContent = resultadosUsuario.privado.S;
                        document.getElementById('admin-score-c-privado').textContent = resultadosUsuario.privado.C;

                        // Asegurarse de que los canvas estén limpios
                        const trabajoCanvas = document.getElementById('admin-chart-trabajo');
                        const privadoCanvas = document.getElementById('admin-chart-privado');
                        if (trabajoCanvas && privadoCanvas) {
                            const trabajoCtx = trabajoCanvas.getContext('2d');
                            const privadoCtx = privadoCanvas.getContext('2d');
                            
                            trabajoCtx.clearRect(0, 0, trabajoCanvas.width, trabajoCanvas.height);
                            privadoCtx.clearRect(0, 0, privadoCanvas.width, privadoCanvas.height);

                            // Crear gráficos con los valores correctos
                            console.log("Datos para gráfico trabajo:", resultadosUsuario.trabajo);
                            console.log("Datos para gráfico privado:", resultadosUsuario.privado);
                            
                            createAdminChart('admin-chart-trabajo', resultadosUsuario.trabajo, 'Ámbito Laboral');
                            createAdminChart('admin-chart-privado', resultadosUsuario.privado, 'Ámbito Privado');
                        }
                        
                    } catch (error) {
                        console.error("Error al procesar datos locales:", error);
                        userResultsContainer.innerHTML = `<p class="error">Error al cargar los resultados del usuario.</p>`;
                    }
                } else {
                    userResultsContainer.innerHTML = `<p>No se encontraron resultados para ${usuario}</p>`;
                }
            }
        })
        .catch((error) => {
            console.error("Error al obtener resultados:", error);
            
            // Intentar cargar desde localStorage como respaldo
            const datosGuardados = localStorage.getItem(`resultados_${usuario}`);
            
            if (datosGuardados) {
                try {
                    const datosUsuario = JSON.parse(datosGuardados);
                    const resultadosUsuario = datosUsuario.resultados;
                    
                    // Mostrar detalles
                    const fechaTest = datosUsuario.fecha ? new Date(datosUsuario.fecha) : new Date();
                    let fechaFormateada = "";

                    try {
                        // Verificar que la fecha sea válida
                        if (isNaN(fechaTest.getTime())) {
                            // Si la fecha es inválida, mostrar fecha actual
                            fechaFormateada = new Date().toLocaleDateString();
                            console.warn("Fecha inválida detectada, usando fecha actual:", fechaFormateada);
                        } else {
                            // Si la fecha es válida, mostrar fecha normal
                            fechaFormateada = fechaTest.toLocaleDateString();
                        }
                    } catch (e) {
                        // En caso de error, mostrar fecha actual
                        fechaFormateada = new Date().toLocaleDateString();
                        console.error("Error al formatear fecha:", e);
                    }

                    document.getElementById('admin-test-date').textContent = `Fecha: ${fechaFormateada}`;

                    // Actualizar puntuaciones en la tabla
                    document.getElementById('admin-score-d-trabajo').textContent = resultadosUsuario.trabajo.D;
                    document.getElementById('admin-score-i-trabajo').textContent = resultadosUsuario.trabajo.I;
                    document.getElementById('admin-score-s-trabajo').textContent = resultadosUsuario.trabajo.S;
                    document.getElementById('admin-score-c-trabajo').textContent = resultadosUsuario.trabajo.C;

                    document.getElementById('admin-score-d-privado').textContent = resultadosUsuario.privado.D;
                    document.getElementById('admin-score-i-privado').textContent = resultadosUsuario.privado.I;
                    document.getElementById('admin-score-s-privado').textContent = resultadosUsuario.privado.S;
                    document.getElementById('admin-score-c-privado').textContent = resultadosUsuario.privado.C;

                    // Asegurarse de que los canvas estén limpios
                    const trabajoCanvas = document.getElementById('admin-chart-trabajo');
                    const privadoCanvas = document.getElementById('admin-chart-privado');
                    if (trabajoCanvas && privadoCanvas) {
                        const trabajoCtx = trabajoCanvas.getContext('2d');
                        const privadoCtx = privadoCanvas.getContext('2d');
                        
                        trabajoCtx.clearRect(0, 0, trabajoCanvas.width, trabajoCanvas.height);
                        privadoCtx.clearRect(0, 0, privadoCanvas.width, privadoCanvas.height);

                        // Crear gráficos con los valores correctos
                        console.log("Datos para gráfico trabajo:", resultadosUsuario.trabajo);
                        console.log("Datos para gráfico privado:", resultadosUsuario.privado);
                        
                        createAdminChart('admin-chart-trabajo', resultadosUsuario.trabajo, 'Ámbito Laboral');
                        createAdminChart('admin-chart-privado', resultadosUsuario.privado, 'Ámbito Privado');
                    }
                    
                } catch (error) {
                    console.error("Error al procesar datos locales:", error);
                    userResultsContainer.innerHTML = `<p class="error">Error al cargar los resultados del usuario.</p>`;
                }
            } else {
                userResultsContainer.innerHTML = `<p>No se encontraron resultados para ${usuario}</p>`;
            }
        });
}

// Cargar pregunta actual
function loadQuestion() {
    if (currentGroupIndex >= discData.grupos.length) {
        calculateResults();
        displayResults();
        return;
    }
    
    // Actualizar título según la sección
    contextTitle.textContent = currentSection === 'trabajo' 
        ? discData.instrucciones.trabajo 
        : discData.instrucciones.privado;
    
    // Actualizar número de grupo
    groupNumber.textContent = `${currentGroupIndex + 1} de ${discData.grupos.length}`;
    
    // Cargar grupo de adjetivos
    loadGroup(currentGroupIndex);
}

// Inicializar las respuestas con valores predeterminados
function inicializarRespuestas() {
    discData.grupos.forEach((grupo, grupoIndex) => {
        // Para ámbito laboral
        sessionStorage.removeItem(`trabajo_${grupoIndex}`);
        
        // Para ámbito privado
        sessionStorage.removeItem(`privado_${grupoIndex}`);
    });
}

// Cargar grupo actual de adjetivos
function loadGroup(index) {
    if (!discData || index >= discData.grupos.length) return;
    
    const grupo = discData.grupos[index];
    const adjetivos = grupo[currentSection];
    
    console.log('Cargando grupo:', index, 'sección:', currentSection);
    console.log('Adjetivos:', adjetivos);
    
    // Actualizar la barra de progreso
    const totalGroups = discData.grupos.length * 2;  // Total de grupos (trabajo + privado)
    const currentProgress = index + (currentSection === 'privado' ? discData.grupos.length : 0);
    const progress = ((currentProgress + 1) / totalGroups) * 100;
    progressBar.style.width = `${progress}%`;
    
    // Añadir o quitar clase según la sección actual
    if (currentSection === 'privado') {
        document.body.classList.add('seccion-privado');
    } else {
        document.body.classList.remove('seccion-privado');
    }
    
    // Crear el HTML para el grupo de adjetivos
    adjectivesContainer.innerHTML = `
        <div class="options">
            ${generarOpcionesHTML(adjetivos, index)}
        </div>
    `;
    
    // Añadir eventos a los botones después de generar el HTML
    const botones = adjectivesContainer.querySelectorAll('.adjetivo-btn');
    console.log('Botones encontrados:', botones.length);
    
    // Asignar eventos a cada botón con un retraso mínimo para asegurar que se registren correctamente
    setTimeout(() => {
        botones.forEach((boton, i) => {
            boton.addEventListener('click', function(e) {
                e.preventDefault(); // Prevenir comportamiento por defecto
                console.log('Botón clickeado:', i);
                const adjetivoTexto = adjetivos[i].adjetivo;
                console.log('Adjetivo seleccionado:', adjetivoTexto);
                seleccionarAdjetivo(adjetivoTexto, true); // Pasamos true para indicar que no debe recargar
            });
            
            // Verificar que el evento se ha añadido correctamente
            console.log(`Evento click añadido al botón ${i} - ${adjetivos[i].adjetivo}`);
        });
        
        // Añadir evento al botón de reiniciar
        const resetButton = adjectivesContainer.querySelector('#reset-selection');
        if (resetButton) {
            resetButton.addEventListener('click', function(e) {
                e.preventDefault();
                console.log('Botón reiniciar clickeado');
                reiniciarSeleccion();
            });
            console.log('Botón de reinicio configurado');
        } else {
            console.error('No se encontró el botón de reinicio');
        }
    }, 10);
    
    // Actualizar visibilidad de los botones
    prevButton.style.visibility = (index === 0 && currentSection === 'trabajo') ? 'hidden' : 'visible';
    
    if (index === discData.grupos.length - 1 && currentSection === 'privado') {
        nextButton.textContent = 'Ver resultados';
    } else {
        nextButton.textContent = 'Siguiente';
    }
    
    // Comprobar si este grupo ya tiene selecciones y actualizar el botón siguiente
    verificarCompletitud();
}

// Generar HTML para las opciones de respuesta
function generarOpcionesHTML(adjetivos, grupoIndex) {
    // Obtener puntuaciones previas si existen
    let puntuacionesGuardadas = {};
    const storedAnswers = sessionStorage.getItem(`${currentSection}_${grupoIndex}`);
    
    if (storedAnswers) {
        puntuacionesGuardadas = JSON.parse(storedAnswers);
    }
    
    // Crear opciones HTML
    let opcionesHTML = '';
    
    // Añadir contenedor para adjetivos
    opcionesHTML += '<div class="adjetivos-container">';
    
    // Generar botones para cada adjetivo
    adjetivos.forEach((item, index) => {
        const savedScore = puntuacionesGuardadas[item.adjetivo] || '';
        const selectedClass = savedScore ? 'selected' : '';
        
        opcionesHTML += `
            <div class="adjetivo-btn-container">
                <button class="adjetivo-btn ${selectedClass}" data-index="${index}">
                    ${item.adjetivo}
                    ${savedScore ? `<span class="numero-seleccion">${savedScore}</span>` : ''}
                </button>
            </div>
        `;
    });
    
    opcionesHTML += '</div>';
    
    // Añadir botón para reiniciar selección
    opcionesHTML += `
        <div class="control-buttons">
            <button id="reset-selection">Reiniciar selección</button>
        </div>
    `;
    
    return opcionesHTML;
}

// Seleccionar un adjetivo en el orden deseado
function seleccionarAdjetivo(adjetivo, noRecargar = false) {
    const grupoIndex = currentGroupIndex;
    
    console.log('Función seleccionarAdjetivo llamada con:', adjetivo);
    console.log('Grupo actual:', grupoIndex, 'Sección:', currentSection);
    
    // Obtener puntuaciones existentes o crear nuevo objeto
    let puntuacionesGuardadas = {};
    const storedAnswers = sessionStorage.getItem(`${currentSection}_${grupoIndex}`);
    
    if (storedAnswers) {
        try {
            puntuacionesGuardadas = JSON.parse(storedAnswers);
            console.log('Puntuaciones guardadas encontradas:', puntuacionesGuardadas);
        } catch (e) {
            console.error('Error al parsear respuestas guardadas:', e);
            // Continuar con un objeto vacío
        }
    }
    
    // Si ya está seleccionado, no hacer nada
    if (puntuacionesGuardadas[adjetivo]) {
        console.log('Adjetivo ya seleccionado, no se hace nada');
        return;
    }
    
    // Determinar el siguiente número a asignar (1, 2, 3 o 4)
    const valoresUsados = Object.values(puntuacionesGuardadas);
    let siguienteValor = 1;
    
    // Encontrar el siguiente valor disponible
    while (valoresUsados.includes(siguienteValor) && siguienteValor <= 4) {
        siguienteValor++;
    }
    
    console.log('Siguiente valor a asignar:', siguienteValor);
    
    // Si ya se han seleccionado 4 adjetivos, no hacer nada
    if (siguienteValor > 4) {
        console.log('Ya se seleccionaron 4 adjetivos, no se puede asignar más');
        return;
    }
    
    // Asignar el siguiente valor al adjetivo seleccionado
    puntuacionesGuardadas[adjetivo] = siguienteValor;
    
    // Guardar en sessionStorage
    try {
        const jsonString = JSON.stringify(puntuacionesGuardadas);
        sessionStorage.setItem(`${currentSection}_${grupoIndex}`, jsonString);
        console.log('Nuevas puntuaciones guardadas:', puntuacionesGuardadas);
        console.log('JSON guardado en sessionStorage:', jsonString);
    } catch (e) {
        console.error('Error al guardar en sessionStorage:', e);
        alert('Hubo un problema al guardar tu respuesta. Por favor, inténtalo de nuevo.');
    }
    
    // Actualizar la UI - llamamos a loadGroup para reconstruir completamente la UI
    if (!noRecargar) {
        loadGroup(currentGroupIndex);
    } else {
        // Actualizamos solo lo necesario sin recargar todo
        actualizarUIManualmente(puntuacionesGuardadas);
    }
    
    // Verificar si se completó la selección
    verificarCompletitud();
    
    // Devolver verdadero si se pudo asignar la puntuación
    return true;
}

// Actualizar manualmente los elementos UI sin recargar todo el grupo
function actualizarUIManualmente(puntuacionesGuardadas) {
    console.log('Actualizando UI manualmente con:', puntuacionesGuardadas);
    
    const adjetivos = discData.grupos[currentGroupIndex][currentSection];
    const botones = adjectivesContainer.querySelectorAll('.adjetivo-btn');
    
    if (botones.length !== adjetivos.length) {
        console.error(`Error de coincidencia: ${botones.length} botones vs ${adjetivos.length} adjetivos`);
        // Si hay discrepancia, mejor recargar todo el grupo
        loadGroup(currentGroupIndex);
        return;
    }
    
    // Limpiar todos los botones primero
    botones.forEach(boton => {
        boton.classList.remove('selected');
        const numeroSpan = boton.querySelector('.numero-seleccion');
        if (numeroSpan) {
            boton.removeChild(numeroSpan);
        }
    });
    
    // Ahora actualizar según las puntuaciones guardadas
    botones.forEach((boton, i) => {
        const adjetivoTexto = adjetivos[i].adjetivo;
        const puntuacion = puntuacionesGuardadas[adjetivoTexto];
        
        if (puntuacion) {
            boton.classList.add('selected');
            
            // Crear un nuevo elemento de número
            const numeroSpan = document.createElement('span');
            numeroSpan.className = 'numero-seleccion';
            numeroSpan.textContent = puntuacion;
            boton.appendChild(numeroSpan);
            
            console.log(`Actualizado botón para "${adjetivoTexto}" con puntuación ${puntuacion}`);
        }
    });
    
    // Verificar completitud para actualizar el botón de siguiente
    verificarCompletitud();
}

// Actualizar la interfaz visual con los adjetivos seleccionados
function actualizarInterfazAdjetivos(puntuacionesGuardadas) {
    // Simplemente recargamos el grupo actual, que reconstruirá todo el HTML
    loadGroup(currentGroupIndex);
}

// Reiniciar la selección actual
function reiniciarSeleccion() {
    // Eliminar datos del grupo actual
    sessionStorage.removeItem(`${currentSection}_${currentGroupIndex}`);
    
    // Actualizar UI
    const botonesAdjetivos = adjectivesContainer.querySelectorAll('.adjetivo-btn');
    botonesAdjetivos.forEach(boton => {
        boton.classList.remove('selected');
        const numeroSpan = boton.querySelector('.numero-seleccion');
        if (numeroSpan) {
            boton.removeChild(numeroSpan);
        }
    });
    
    // Deshabilitar botón siguiente
    nextButton.disabled = true;
}

// Verificar si todas las opciones del grupo actual han sido puntuadas
function verificarCompletitud() {
    const puntuacionesGuardadas = sessionStorage.getItem(`${currentSection}_${currentGroupIndex}`);
    if (puntuacionesGuardadas) {
        const respuestas = JSON.parse(puntuacionesGuardadas);
        const cantidadRespuestas = Object.keys(respuestas).length;
        
        // Si todas las opciones tienen puntuación, habilitar el botón
        if (cantidadRespuestas === 4) {
            nextButton.disabled = false;
    } else {
            nextButton.disabled = true;
        }
    } else {
        nextButton.disabled = true;
    }
}

// Navegar al grupo anterior
prevButton.addEventListener('click', () => {
    if (currentGroupIndex > 0 || currentSection === 'privado') {
        if (currentGroupIndex === 0 && currentSection === 'privado') {
            currentSection = 'trabajo';
            currentGroupIndex = discData.grupos.length - 1;
        } else {
            currentGroupIndex--;
        }
        
        // Usar loadQuestion en lugar de loadGroup para asegurar que se actualice el número del grupo
        loadQuestion();
    }
});

// Navegar al siguiente grupo o finalizar
nextButton.addEventListener('click', () => {
    console.log('Botón siguiente/ver resultados clickeado');
    console.log('Estado actual: Grupo', currentGroupIndex, 'Sección', currentSection);
    console.log('Último grupo?', currentGroupIndex === discData.grupos.length - 1);
    
    // Si es el último grupo y estamos en sección privada, mostrar resultados
    if (currentGroupIndex === discData.grupos.length - 1 && currentSection === 'privado') {
        console.log('Condición cumplida para mostrar resultados');
        calculateResults();
        displayResults();
        return;
    }
    
    // Navegar al siguiente grupo o cambiar de sección
    if (currentGroupIndex < discData.grupos.length - 1) {
        // Siguiente grupo en la misma sección
        currentGroupIndex++;
        console.log('Avanzando al siguiente grupo:', currentGroupIndex);
    } else if (currentSection === 'trabajo') {
        // Cambiar de sección trabajo a privado
        currentSection = 'privado';
        currentGroupIndex = 0;
        console.log('Cambiando a sección privado');
    }
    
    // Usar loadQuestion en lugar de loadGroup para asegurar que se actualice el número del grupo
    loadQuestion();
});

// Calcular resultados
function calculateResults() {
    console.log('Ejecutando función calculateResults');
    
    // Reiniciar los resultados
    resultados = {
        trabajo: { D: 0, I: 0, S: 0, C: 0 },
        privado: { D: 0, I: 0, S: 0, C: 0 }
    };
    
    console.log('Procesando respuestas de cada grupo...');
    
    // Recorrer grupos y calcular puntuaciones
    for (let i = 0; i < discData.grupos.length; i++) {
        // Procesar ámbito laboral
        const respuestasTrabajo = sessionStorage.getItem(`trabajo_${i}`);
        if (respuestasTrabajo) {
            const respuestasObj = JSON.parse(respuestasTrabajo);
            console.log(`Grupo ${i} - trabajo:`, respuestasObj);
            
            // Asignar puntos según las respuestas
            for (let adjetivo in respuestasObj) {
                const puntuacion = respuestasObj[adjetivo];
                const tipo = obtenerTipoAdjetivo(adjetivo, i, 'trabajo');
                
                // La puntuación más baja (1) aporta más puntos (4)
                const puntosDISC = 5 - puntuacion;
                resultados.trabajo[tipo] += puntosDISC;
                
                console.log(`  ${adjetivo} (${tipo}): ${puntuacion} → ${puntosDISC} puntos`);
            }
        } else {
            console.warn(`No hay respuestas guardadas para grupo ${i} - trabajo`);
        }
        
        // Procesar ámbito privado
        const respuestasPrivado = sessionStorage.getItem(`privado_${i}`);
        if (respuestasPrivado) {
            const respuestasObj = JSON.parse(respuestasPrivado);
            console.log(`Grupo ${i} - privado:`, respuestasObj);
            
            // Asignar puntos según las respuestas
            for (let adjetivo in respuestasObj) {
                const puntuacion = respuestasObj[adjetivo];
                const tipo = obtenerTipoAdjetivo(adjetivo, i, 'privado');
                
                // La puntuación más baja (1) aporta más puntos (4)
                const puntosDISC = 5 - puntuacion;
                resultados.privado[tipo] += puntosDISC;
                
                console.log(`  ${adjetivo} (${tipo}): ${puntuacion} → ${puntosDISC} puntos`);
            }
        } else {
            console.warn(`No hay respuestas guardadas para grupo ${i} - privado`);
        }
    }
    
    console.log('Resultados finales calculados:', resultados);
    
    // Guardar resultados en localStorage con el nombre del usuario
    if (currentUser) {
        localStorage.setItem(`disc_results_${currentUser}`, JSON.stringify(resultados));
        
        // Guardar resultados en Firebase Firestore
        guardarResultadosEnFirebase(currentUser, resultados);
    }
}

// Función para guardar resultados en Firebase
function guardarResultadosEnFirebase(usuario, resultados) {
    // Verificar primero si Firebase está disponible
    if (!firebaseInitialized || !db) {
        console.log("Firebase no está disponible, almacenando resultados solo localmente");
        // Guardar datos en localStorage como respaldo
        try {
            const datosUsuario = {
                nombre: usuario,
                fecha: new Date().toISOString(),
                resultados: resultados,
                dispositivo: navigator.userAgent
            };
            
            localStorage.setItem(`resultados_${usuario}`, JSON.stringify(datosUsuario));
            console.log("Resultados guardados localmente con éxito");
        } catch (error) {
            console.error("Error al guardar localmente:", error);
        }
        return;
    }
    
    try {
        // Crear objeto con los datos completos
        const datosUsuario = {
            nombre: usuario,
            fecha: new Date(),
            resultados: resultados,
            dispositivo: navigator.userAgent
        };
        
        // Guardar en la colección "resultados_disc"
        db.collection("resultados_disc").doc(usuario).set(datosUsuario)
            .then(() => {
                console.log("Resultados guardados correctamente en Firebase");
            })
            .catch((error) => {
                console.error("Error al guardar resultados en Firebase:", error);
                console.log("Los resultados se han guardado localmente de todos modos");
                
                // Guardar en localStorage como respaldo
                try {
                    datosUsuario.fecha = datosUsuario.fecha.toISOString(); // Convertir Date a formato string
                    localStorage.setItem(`resultados_${usuario}`, JSON.stringify(datosUsuario));
                    console.log("Resultados guardados localmente con éxito");
                } catch (err) {
                    console.error("Error al guardar localmente:", err);
                }
            });
    } catch (error) {
        console.error("Error al intentar guardar en Firebase:", error);
        
        // Guardar en localStorage como respaldo
        try {
            const datosUsuario = {
                nombre: usuario,
                fecha: new Date().toISOString(),
                resultados: resultados,
                dispositivo: navigator.userAgent
            };
            
            localStorage.setItem(`resultados_${usuario}`, JSON.stringify(datosUsuario));
            console.log("Resultados guardados localmente con éxito");
        } catch (err) {
            console.error("Error al guardar localmente:", err);
        }
    }
}

// Obtener el tipo de DISC de un adjetivo
function obtenerTipoAdjetivo(adjetivoBuscado, grupoIndex, seccion) {
    const grupo = discData.grupos[grupoIndex];
    const adjetivos = grupo[seccion];
    
    for (let i = 0; i < adjetivos.length; i++) {
        if (adjetivos[i].adjetivo === adjetivoBuscado) {
            return adjetivos[i].tipo;
        }
    }
    
    return null;
}

// Mostrar los resultados
function displayResults() {
    console.log('Ejecutando función displayResults');
    
    try {
        // Ocultar sección de cuestionario y mostrar resultados
        discSection.classList.add('hidden');
    resultsSection.classList.remove('hidden');
        console.log('Secciones visibilidad cambiada - quiz hidden, results visible');
        
        // Ver resultados calculados
        console.log('Resultados calculados:', resultados);
        
        // Verificar existencia de los elementos canvas
        const canvasTrabajo = document.getElementById('chart-trabajo');
        const canvasPrivado = document.getElementById('chart-privado');
        
        if (!canvasTrabajo || !canvasPrivado) {
            console.error('No se encontraron los elementos canvas necesarios');
            alert('Error al mostrar los resultados. Por favor, recarga la página.');
            return;
        }
        
        console.log('Canvas trabajo encontrado:', !!canvasTrabajo);
        console.log('Canvas privado encontrado:', !!canvasPrivado);
        
        // Pequeña pausa para asegurar que el DOM se ha actualizado completamente
        setTimeout(() => {
            try {
                // Crear gráficos para ambos ámbitos
                console.log('Intentando crear gráficos...');
                createChart('chart-trabajo', resultados.trabajo, 'Ámbito Laboral');
                createChart('chart-privado', resultados.privado, 'Ámbito Privado');
                console.log('Gráficos creados exitosamente');
                
                // Generar texto de explicación de resultados
                const resultadosTexto = document.getElementById('resultados-texto');
                if (resultadosTexto) {
                    resultadosTexto.innerHTML = `
                        <p><strong>Usuario:</strong> ${currentUser}</p>
                        <p>Estos resultados muestran tu perfil DISC en los ámbitos laboral y privado.</p>
                        <ul>
                            <li><strong>D (Dominancia):</strong> ${resultados.trabajo.D} en trabajo, ${resultados.privado.D} en privado</li>
                            <li><strong>I (Influencia):</strong> ${resultados.trabajo.I} en trabajo, ${resultados.privado.I} en privado</li>
                            <li><strong>S (Estabilidad):</strong> ${resultados.trabajo.S} en trabajo, ${resultados.privado.S} en privado</li>
                            <li><strong>C (Cumplimiento):</strong> ${resultados.trabajo.C} en trabajo, ${resultados.privado.C} en privado</li>
                        </ul>
                    `;
                }
            } catch (error) {
                console.error('Error al crear gráficos:', error);
                alert('Error al crear los gráficos. Por favor, recarga la página e intenta de nuevo.');
            }
        }, 100);
    } catch (error) {
        console.error('Error al mostrar resultados:', error);
        alert('Hubo un error al mostrar los resultados. Por favor, recarga la página e inténtalo de nuevo.');
    }
}

// Crear gráfico de resultados
function createChart(canvasId, data, title) {
    console.log(`Creando gráfico para ${canvasId} con datos:`, data);
    
    // Obtener el elemento canvas
    const canvas = document.getElementById(canvasId);
    if (!canvas) {
        console.error(`No se encontró el canvas con ID ${canvasId}`);
        return;
    }
    
    // Obtener el contexto del canvas
    const ctx = canvas.getContext('2d');
    if (!ctx) {
        console.error(`No se pudo obtener el contexto 2D del canvas ${canvasId}`);
        return;
    }
    
    // Plugin personalizado para dibujar una línea horizontal en Y=35
    const horizontalLinePlugin = {
        id: 'horizontalLine',
        beforeDatasetsDraw: function(chart) {
            if (chart.scales.y) {
                const yScale = chart.scales.y;
                const canvas = chart.canvas;
                const ctx = chart.ctx;
                const yValue = 35;
                
                const lineY = yScale.getPixelForValue(yValue);
                
                // Guardar el estado
                ctx.save();
                
                // Configurar el estilo de la línea
                ctx.beginPath();
                ctx.moveTo(chart.chartArea.left, lineY);
                ctx.lineTo(chart.chartArea.right, lineY);
                ctx.lineWidth = 1;
                ctx.strokeStyle = 'rgba(255, 255, 255, 0.7)';
                ctx.stroke();
                
                // Restaurar el estado
                ctx.restore();
            }
        }
    };
    
    // Asegurar que los valores son numéricos
    const valores = {
        D: parseInt(data.D) || 0,
        I: parseInt(data.I) || 0,
        S: parseInt(data.S) || 0,
        C: parseInt(data.C) || 0
    };
    
    console.log(`Valores procesados para ${canvasId}:`, valores);
    
    // Crear nuevo gráfico
    try {
    new Chart(ctx, {
        type: 'bar',
        data: {
                labels: ['D', 'I', 'S', 'C'],
            datasets: [{
                    data: [valores.D, valores.I, valores.S, valores.C],
                backgroundColor: [
                        'rgba(231, 76, 60, 0.7)',    // D - rojo
                        'rgba(241, 196, 15, 0.7)',   // I - amarillo 
                        'rgba(46, 204, 113, 0.7)',   // S - verde
                        'rgba(52, 152, 219, 0.7)'    // C - azul
                ],
                borderColor: [
                        'rgba(231, 76, 60, 1)',      // D - rojo
                        'rgba(241, 196, 15, 1)',     // I - amarillo
                        'rgba(46, 204, 113, 1)',     // S - verde
                        'rgba(52, 152, 219, 1)'      // C - azul
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
                maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                    title: {
                        display: false,
                        text: title,
                        font: {
                            size: 16,
                            weight: 'bold'
                        },
                        padding: {
                            top: 10,
                            bottom: 20
                        }
                    },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                                const labels = ['Dominancia', 'Influencia', 'Estabilidad', 'Cumplimiento'];
                                return labels[context.dataIndex] + ': ' + context.raw;
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 56,
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)'
                        },
                        ticks: {
                            color: '#a0a0b0'
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        },
                        ticks: {
                            color: '#a0a0b0'
                        }
                    }
                }
            },
            plugins: [horizontalLinePlugin]
        });
        console.log(`Gráfico para ${canvasId} creado con éxito`);
    } catch (error) {
        console.error(`Error al crear el gráfico para ${canvasId}:`, error);
        throw error; // Re-lanzar el error para que sea capturado por el llamador
    }
}

// Enviar resultados por correo electrónico
function sendResultsByEmail() {
    if (emailSent) return; // Evitar envíos múltiples
    
    // Verificar si EmailJS está configurado
    if (typeof emailjs === 'undefined' || !emailjs.send) {
        console.warn('EmailJS no está configurado correctamente. No se enviarán resultados por correo.');
        emailStatus.textContent = 'Función de correo no configurada.';
        emailStatus.style.color = 'orange';
        return;
    }
    
    // Mostrar estado de envío
    emailStatus.textContent = 'Enviando resultados...';
    emailStatus.style.color = 'blue';
    
    // Preparar los datos para enviar
    const templateParams = {
        to_email: 'namaruiz@gmail.com', // Correo del destinatario
        from_name: 'Cuestionario DISC',
        user_name: currentUser,
        result_trabajo_d: resultados.trabajo.D,
        result_trabajo_i: resultados.trabajo.I,
        result_trabajo_s: resultados.trabajo.S,
        result_trabajo_c: resultados.trabajo.C,
        result_privado_d: resultados.privado.D,
        result_privado_i: resultados.privado.I,
        result_privado_s: resultados.privado.S,
        result_privado_c: resultados.privado.C
    };
    
    try {
        // Enviar el correo usando EmailJS
        emailjs.send('default_service', 'template_id', templateParams)
            .then(function(response) {
                console.log('SUCCESS!', response.status, response.text);
                emailStatus.textContent = 'Resultados enviados correctamente.';
                emailStatus.style.color = 'green';
                emailSent = true;
            }, function(error) {
                console.error('FAILED...', error);
                emailStatus.textContent = 'Error al enviar: verifica la configuración de EmailJS.';
                emailStatus.style.color = 'red';
            });
    } catch (error) {
        console.error('Error al intentar enviar correo:', error);
        emailStatus.textContent = 'Error en la función de correo.';
        emailStatus.style.color = 'red';
    }
}

// Reiniciar el cuestionario
restartButton.addEventListener('click', () => {
    // Limpiar datos de sesión
    for (let i = 0; i < discData.grupos.length; i++) {
        sessionStorage.removeItem(`trabajo_${i}`);
        sessionStorage.removeItem(`privado_${i}`);
    }
    
    // Reiniciar variables
    currentGroupIndex = 0;
    currentSection = 'trabajo';
    emailSent = false;
    
    // Volver a la pantalla inicial
    resultsSection.classList.add('hidden');
    introSection.classList.remove('hidden');
    
    // Limpiar campo de nombre
    document.getElementById('nombre-usuario').value = '';
});

// Variables para guardar referencias a los gráficos
let adminChartTrabajo = null;
let adminChartPrivado = null;

/**
 * Crea un gráfico para mostrar en el panel de administrador
 * @param {string} canvasId - ID del elemento canvas donde se dibujará el gráfico
 * @param {Object} data - Objeto con las puntuaciones D, I, S, C
 * @param {string} title - Título para mostrar en el gráfico
 */
function createAdminChart(canvasId, data, title) {
    console.log(`Creando gráfico admin para ${canvasId} con datos:`, data);
    
    const canvas = document.getElementById(canvasId);
    if (!canvas) {
        console.error(`Canvas con ID ${canvasId} no encontrado`);
        return;
    }
    
    // Destruir gráfico existente si lo hay
    if (canvasId === 'admin-chart-trabajo' && adminChartTrabajo) {
        adminChartTrabajo.destroy();
        adminChartTrabajo = null;
    } else if (canvasId === 'admin-chart-privado' && adminChartPrivado) {
        adminChartPrivado.destroy();
        adminChartPrivado = null;
    }
    
    // Ajustar el tamaño del canvas para hacerlo más grande
    canvas.style.width = '100%';
    canvas.style.height = '350px';
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    
    const ctx = canvas.getContext('2d');
    
    // Plugin personalizado para dibujar una línea horizontal en Y=35
    const horizontalLinePlugin = {
        id: 'horizontalLine',
        beforeDatasetsDraw: function(chart) {
            if (chart.scales.y) {
                const yScale = chart.scales.y;
                const canvas = chart.canvas;
                const ctx = chart.ctx;
                const yValue = 35;
                
                const lineY = yScale.getPixelForValue(yValue);
                
                // Guardar el estado
                ctx.save();
                
                // Configurar el estilo de la línea
                ctx.beginPath();
                ctx.moveTo(chart.chartArea.left, lineY);
                ctx.lineTo(chart.chartArea.right, lineY);
                ctx.lineWidth = 1;
                ctx.strokeStyle = 'rgba(255, 255, 255, 0.7)';
                ctx.stroke();
                
                // Restaurar el estado
                ctx.restore();
            }
        }
    };
    
    // Asegurar que los valores son numéricos
    const valores = {
        D: parseInt(data.D) || 0,
        I: parseInt(data.I) || 0,
        S: parseInt(data.S) || 0,
        C: parseInt(data.C) || 0
    };
    
    console.log(`Valores procesados para ${canvasId}:`, valores);
    
    // Crear el gráfico con los mismos estilos de test_results.html
    const chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['D', 'I', 'S', 'C'],
            datasets: [{
                data: [valores.D, valores.I, valores.S, valores.C],
                backgroundColor: [
                    'rgba(231, 76, 60, 0.7)',    // D - rojo
                    'rgba(241, 196, 15, 0.7)',   // I - amarillo
                    'rgba(46, 204, 113, 0.7)',   // S - verde
                    'rgba(52, 152, 219, 0.7)'    // C - azul
                ],
                borderColor: [
                    'rgba(231, 76, 60, 1)',      // D - rojo
                    'rgba(241, 196, 15, 1)',     // I - amarillo
                    'rgba(46, 204, 113, 1)',     // S - verde
                    'rgba(52, 152, 219, 1)'      // C - azul
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                title: {
                    display: true,
                    text: title,
                    font: {
                        size: 16,
                        weight: 'bold'
                    },
                    padding: {
                        top: 10,
                        bottom: 20
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const labels = ['Dominancia', 'Influencia', 'Estabilidad', 'Cumplimiento'];
                            return labels[context.dataIndex] + ': ' + context.raw;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 56,
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    ticks: {
                        color: '#a0a0b0',
                        font: {
                            size: 12
                        }
                    }
                },
                x: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        color: '#a0a0b0',
                        font: {
                            size: 12,
                            weight: 'bold'
                        }
                    }
                }
            }
        },
        plugins: [horizontalLinePlugin]
    });
    
    // Guardar referencia al gráfico
    if (canvasId === 'admin-chart-trabajo') {
        adminChartTrabajo = chart;
    } else if (canvasId === 'admin-chart-privado') {
        adminChartPrivado = chart;
    }
} 