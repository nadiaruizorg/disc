# Estructura del Proyecto DISC

## Organización de Archivos

```
DISC/
│
├── index.html            # Página principal con el cuestionario DISC
├── test_results.html     # Página de prueba para visualizar resultados
├── admin_test.html       # Panel de administración para resultados
├── firebase_test.html    # Herramienta de diagnóstico para Firebase
│
├── script.js             # Lógica principal de la aplicación
├── styles.css            # Estilos de la aplicación
│
├── .gitignore            # Archivos y directorios ignorados por Git
├── LICENSE               # Licencia MIT
├── README.md             # Documentación principal
│
└── docs/                 # Documentación adicional
    └── ESTRUCTURA.md     # Este archivo
```

## Descripción de Componentes

### Páginas HTML

- **index.html**: La página principal que contiene el formulario para ingresar nombre de usuario y el cuestionario DISC completo.
- **test_results.html**: Una página que muestra resultados de prueba sin necesidad de completar el cuestionario.
- **admin_test.html**: Panel para administradores que permite ver los resultados de todos los usuarios.
- **firebase_test.html**: Herramienta de diagnóstico para probar la conexión con Firebase.

### Archivos JavaScript

- **script.js**: Contiene toda la lógica de la aplicación, incluyendo:
  - La carga de datos del cuestionario
  - La gestión del estado del cuestionario
  - El cálculo de resultados
  - La visualización de gráficos
  - La integración con Firebase

### Archivos CSS

- **styles.css**: Contiene todos los estilos de la aplicación.

### Otros Archivos

- **.gitignore**: Especifica archivos y directorios que no deben ser incluidos en el control de versiones.
- **LICENSE**: Contiene la licencia MIT que especifica los términos de uso del código.
- **README.md**: Proporciona una descripción general del proyecto y las instrucciones de uso.

## Flujo de Datos

1. El usuario ingresa su nombre en **index.html**.
2. Si el nombre es "Nadia Ruiz", se muestra el panel de administración.
3. Si es otro nombre, el usuario completa el cuestionario DISC.
4. Los resultados se calculan y muestran visualmente.
5. Los datos se guardan en Firebase Firestore (con respaldo en localStorage).
6. El administrador puede ver todos los resultados en el panel de administración. 