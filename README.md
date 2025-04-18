# Aplicación de Cuestionario DISC

Esta aplicación web permite a los usuarios completar un cuestionario DISC (Dominancia, Influencia, Estabilidad, Cumplimiento) para evaluar su perfil de comportamiento tanto en ámbito laboral como personal.

## Características

- Cuestionario DISC completo con 14 grupos de preguntas
- Evaluación separada para contextos laborales y personales
- Visualización de resultados con gráficos
- Panel de administración para ver resultados de todos los usuarios
- Almacenamiento en Firebase Firestore con respaldo local
- Funciona tanto online como offline

## Archivos del Proyecto

- `index.html`: Página principal con el cuestionario DISC
- `script.js`: Lógica principal de la aplicación
- `styles.css`: Estilos de la aplicación
- `test_results.html`: Página de prueba para visualizar resultados de ejemplo
- `admin_test.html`: Panel de administración para ver resultados de todos los usuarios
- `firebase_test.html`: Herramienta de diagnóstico para la conexión con Firebase

## Configuración

### Requisitos Previos

1. Cuenta en Firebase con Firestore habilitado
2. Configuración de reglas de seguridad en Firestore

### Configuración de Firebase

La aplicación ya incluye la configuración de Firebase, pero si deseas usar tu propia base de datos, debes modificar el objeto `firebaseConfig` en los archivos JS:

```javascript
const firebaseConfig = {
    apiKey: "TU_API_KEY",
    authDomain: "TU_AUTH_DOMAIN",
    projectId: "TU_PROJECT_ID",
    storageBucket: "TU_STORAGE_BUCKET",
    messagingSenderId: "TU_MESSAGING_SENDER_ID",
    appId: "TU_APP_ID"
};
```

### Reglas de Seguridad de Firestore

Para desarrollo, puedes usar estas reglas (no recomendadas para producción):

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

## Uso

1. Abre `index.html` en un servidor web (puedes usar `http-server` o cualquier servidor local)
2. Ingresa tu nombre
3. Completa el cuestionario para el ámbito laboral
4. Completa el cuestionario para el ámbito personal
5. Visualiza tus resultados

### Modo Administrador

Para acceder al panel de administrador, ingresa el nombre "Nadia Ruiz" en la página principal.

## Desarrollo Local

Para ejecutar la aplicación localmente:

```bash
# Instala http-server si no lo tienes
npm install -g http-server

# Ejecuta el servidor
http-server -p 8080 -c-1
```

Luego abre `http://localhost:8080` en tu navegador.

## Licencia

Este proyecto es de código abierto bajo la licencia MIT. 