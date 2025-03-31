/**
 * Converts a PDF file stored in Google Drive into an image (PNG or JPEG) and saves the converted image in Google Drive.
 *
 * ### Functionality:
 * - Searches for a PDF file within a Google Drive folder using its title (without extension).
 * - Retrieves a preview of the file via the Google Drive URL.
 * - Converts the preview into an image blob.
 * - Saves the converted image in Google Drive in the desired format (PNG or JPEG).
 * - Returns the ID of the converted file.
 *
 * ### APIs Used:
 * - `DriveApp`: To access files stored in Google Drive.
 * - `UrlFetchApp`: To fetch the image preview from the Google Drive URL.
 *
 * ### Error Handling:
 * - If the image folder does not exist or the ID is incorrect, the function will throw an error.
 * - If no file with the specified title is found, a log message is displayed and the function terminates.
 * - If the output format is invalid, it defaults to PNG.
 * - A `try-catch` block is implemented to capture and log exceptions during conversion or file upload.
 *
 * @param {string} folderImageId - The ID of the folder where the PDF file will be searched.
 * @param {string} title - The title of the PDF file without extension.
 * @param {string} [outputFormat] - The output format: "PNG" or "JPEG" (optional, defaults to PNG).
 * @returns {string|null} The ID of the converted file in Google Drive or `null` if the file is not found.
 */
function convertPDFToImage(folderImageId, title, outputFormat = "PNG") {
    try {
      let files = DriveApp.getFolderById(folderImageId).getFiles();
      let validExtensions = ['application/pdf'];
      let fileId = null;
  
      // Search for the file in the folder using the given title
      while (files.hasNext()) {
        let file = files.next();
        let fileName = file.getName().replace(/\.[^/.]+$/, ''); // Remove the extension
        let mimeType = file.getMimeType();
        
        // Check if the file is a valid PDF and matches the given title
        if (validExtensions.includes(mimeType) && fileName === title) {
          fileId = file.getId(); // Assign the file ID if it matches
          break;
        }
      }
  
      // If the file is not found, terminate the function
      if (!fileId) {
        Logger.log('The image with the specified title was not found.');
        return null;
      }
  
      const file = DriveApp.getFileById(fileId); // Get the file from Google Drive using the found ID.
      const url = `https://drive.google.com/thumbnail?id=${fileId}&sz=w1000`; // Generate the URL to fetch the file preview.
      let blob = UrlFetchApp.fetch(url, {
        headers: { authorization: "Bearer " + ScriptApp.getOAuthToken() }, // Authorization with the script's OAuth token.
      }).getBlob(); // Get the image blob from the preview URL.
      
      let name = file.getName().split(".")[0] + ".png"; // Define the output file name with .png extension.
      if (outputFormat === "JPEG") {
        blob = blob.getAs("image/jpeg"); // Convert the blob to JPEG format if selected.
        name = name.replace(".png", ".jpg"); // Change the file name extension to .jpg.
      }
      
      let response = DriveApp.createFile(blob.setName(name)); // Create a file in Google Drive with the converted blob and defined name.
      let finalId = response.getId(); // Get the ID of the newly created file in Google Drive.
      return finalId;
    } catch (error) {
      Logger.log('Error converting the file: ' + error.message);
      return null;
    }
  }
  