/**
 * Convierte un archivo PDF almacenado en Google Drive a un formato de imagen (PNG o JPEG) y guarda la imagen convertida en Google Drive.
 *
 * ### Funcionalidad:
 * - Busca un archivo PDF dentro de una carpeta de Google Drive utilizando su título (sin extensión).
 * - Recupera una vista previa del archivo usando una URL de miniatura de Google Drive.
 * - Convierte la vista previa en una imagen.
 * - Guarda la imagen convertida en Google Drive en el formato deseado (PNG o JPEG).
 * - Devuelve el ID del archivo convertido.
 *
 * ### APIs Utilizadas:
 * - `DriveApp`: Para acceder a los archivos almacenados en Google Drive.
 * - `UrlFetchApp`: Para obtener la vista previa de la imagen desde la URL de Google Drive.
 *
 * ### Manejo de Errores:
 * - Si la carpeta de imágenes no existe o el ID es incorrecto, la función lanzará un error.
 * - Si no se encuentra el archivo con el título especificado, se muestra un mensaje en los logs y la función termina.
 * - Si el formato de salida es inválido, por defecto se utilizará PNG.
 * - Se ha implementado un bloque `try-catch` para capturar y registrar excepciones durante la conversión o la carga del archivo.
 *
 * @param {string} folderImageId - El ID de la carpeta donde se buscará el archivo PDF.
 * @param {string} titulo - El título del archivo PDF sin la extensión.
 * @param {string} [outputFormat] - El formato de salida: "PNG" o "JPEG" (opcional, por defecto es PNG).
 * @returns {string|null} El ID del archivo convertido en Google Drive o `null` si no se encuentra el archivo.
 */
function convertirPDFAImagen(folderImageId, titulo, outputFormat = undefined) {
  try {
    let archivos = DriveApp.getFolderById(folderImageId).getFiles();
    let extensionesValidas = ['application/pdf'];
    let fileId = null;

    // Buscar el archivo en la carpeta con el título dado
    while (archivos.hasNext()) {
      let archivo = archivos.next();
      let nombreArchivo = archivo.getName().replace(/\.[^/.]+$/, '');  // Eliminar la extensión
      let mimeType = archivo.getMimeType();
      
      // Verifica si el archivo es un PDF válido y si el nombre coincide con el título
      if (extensionesValidas.includes(mimeType) && nombreArchivo === titulo) {
        fileId = archivo.getId();  // Asigna el ID del archivo si coincide
        break;
      }
    }

    // Si no se encuentra el archivo, termina la función
    if (!fileId) {
      Logger.log('No se encontró el archivo con el título especificado.');
      return null;
    }

    const file = DriveApp.getFileById(fileId);  // Obtiene el archivo de Google Drive con el ID encontrado.
    const url = `https://drive.google.com/thumbnail?id=${fileId}&sz=w1000`;  // Genera la URL para obtener la vista previa del archivo.
    let blob = UrlFetchApp.fetch(url, {
      headers: { authorization: "Bearer " + ScriptApp.getOAuthToken() },  // Autorización con el token OAuth del script.
    }).getBlob();  // Obtiene el blob (contenido binario) de la imagen desde la URL de vista previa.
    
    let name = file.getName().split(".")[0] + ".png";  // Define el nombre del archivo de salida con extensión .png.
    if (outputFormat === "JPEG") {
      blob = blob.getAs("image/jpeg");  // Convierte el blob a formato JPEG si se selecciona ese formato.
      name = name.replace(".png", ".jpg");  // Cambia la extensión del nombre del archivo a .jpg.
    }
    
    let response = DriveApp.createFile(blob.setName(name));  // Crea un archivo en Google Drive con el blob convertido y el nombre definido.
    let finalId = response.getId();  // Obtiene el ID del archivo recién creado en Google Drive.
    return finalId;
  } catch (error) {
    Logger.log('Error al convertir el archivo: ' + error.message);
    return null;
  }
}
