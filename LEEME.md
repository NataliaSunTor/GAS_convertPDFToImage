# Script ConvertirPDFAImagen
Esta es una función para GOOGLE APP SCRIPT

## Descripción general
Este script convierte un archivo PDF almacenado en Google Drive en un formato de imagen (PNG o JPEG) y lo guarda de nuevo en Google Drive.

## Funcionalidades
- Busca un archivo PDF dentro de una carpeta específica de Google Drive usando su título (sin la extensión).
- Recupera una vista previa del archivo usando una URL de miniatura generada por Google Drive.
- Convierte la vista previa en una imagen.
- Guarda la imagen convertida en Google Drive.
- Devuelve el ID del archivo de imagen recién creado.

## Requisitos
- Google Apps Script habilitado en tu Google Drive.
- Autorización adecuada para acceder y modificar archivos en Google Drive.

## APIs utilizadas
- `DriveApp`: Para acceder y gestionar archivos en Google Drive.
- `UrlFetchApp`: Para obtener la vista previa de la imagen desde Google Drive.

## Parámetros
- `folderImageId` (string): El ID de la carpeta de Google Drive donde está almacenado el archivo PDF.
- `titulo` (string): El título del archivo PDF (sin extensión).
- `outputFormat` (string, opcional): El formato de la imagen deseado, ya sea "PNG" o "JPEG" (por defecto es PNG).

## Manejo de errores
- Si el ID de la carpeta es incorrecto o inaccesible, se registra un error.
- Si el archivo especificado no se encuentra, se muestra un mensaje en los logs y la función termina.
- Si el formato de salida no es reconocido, el script se ajusta al formato PNG por defecto.
- Se implementa un bloque `try-catch` para capturar y registrar excepciones durante el proceso.

## Uso
Llama a la función `convertToImage(folderImageId, titulo, outputFormat)` con los parámetros adecuados.

Ejemplo:
```javascript
let imageId = convertToImage("tu-id-de-carpeta", "titulo-del-archivo", "JPEG");
Logger.log("ID de la imagen convertida: " + imageId);
