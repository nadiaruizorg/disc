# Aplicación de Cuestionario DISC

Esta es una aplicación web simple que implementa un cuestionario DISC basado en el archivo Excel proporcionado. La aplicación permite a los usuarios:

1. Ingresar su nombre
2. Responder a un cuestionario DISC de 20 preguntas
3. Ver sus resultados en un gráfico visual

## Características

- Interfaz responsive adaptada para dispositivos móviles
- Progreso del cuestionario con indicador visual
- Almacenamiento local de respuestas para navegación entre preguntas
- Visualización de resultados con gráficos
- Explicaciones básicas de cada tipo DISC

## Tecnologías utilizadas

- HTML5
- CSS3
- JavaScript (Vanilla)
- Chart.js para la visualización de gráficos

## Cómo ejecutar

Para ejecutar esta aplicación, simplemente abre el archivo `index.html` en tu navegador web. También puedes utilizar un servidor web local como:

```bash
# Con Python
python -m http.server 8000

# Con Node.js (requiere instalación de http-server)
npx http-server
```

## Personalización

Las preguntas del cuestionario DISC se encuentran en el archivo `script.js` y pueden ser modificadas según sea necesario. También puedes personalizar los estilos en el archivo `styles.css`.

## Sobre DISC

El modelo DISC es una herramienta de evaluación de comportamiento que clasifica a las personas en cuatro tipos principales:

- **D (Dominancia)**: Orientado a resultados, directo y decisivo
- **I (Influencia)**: Orientado a personas, comunicativo y entusiasta
- **S (Estabilidad)**: Orientado a la colaboración, paciente y confiable
- **C (Cumplimiento)**: Orientado a la calidad, analítico y meticuloso

Esta aplicación proporciona una evaluación básica de estos rasgos basada en las respuestas del usuario. 