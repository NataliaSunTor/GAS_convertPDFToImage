# GAS_convertPDFToImage
Converts pdf's to images using only GAS resources, which is useful if you are unable to use external libraries.

## Overview
This script converts a PDF file stored in Google Drive into an image format (PNG or JPEG) and saves it back to Google Drive.

## Features
- Searches for a PDF file within a specified Google Drive folder using its title (without extension).
- Retrieves a preview of the PDF file using a Google Drive-generated thumbnail URL.
- Converts the preview into an image.
- Saves the converted image in Google Drive.
- Returns the ID of the newly created image file.

## Requirements
- Google Apps Script enabled in your Google Drive.
- Proper authorization to access and modify files in Google Drive.

## APIs Used
- `DriveApp`: To access and manage files in Google Drive.
- `UrlFetchApp`: To fetch the image preview from Google Drive.

## Parameters
- `folderImageId` (string): The ID of the Google Drive folder where the PDF file is stored.
- `title` (string): The title of the PDF file (without extension).
- `outputFormat` (string, optional): The desired image format, either "PNG" or "JPEG" (defaults to PNG).

## Error Handling
- If the specified folder ID is incorrect or inaccessible, an error is logged.
- If the specified file is not found, a log message is displayed, and the function terminates.
- If the output format is not recognized, the script defaults to PNG.
- A `try-catch` block is implemented to handle and log exceptions during the process.

## Usage
Call the function `convertToImage(folderImageId, title, outputFormat)` with appropriate parameters.

Example:
```javascript
let imageId = convertToImage("your-folder-id", "your-file-title", "JPEG");
Logger.log("Converted Image ID: " + imageId);
```

## Output
- If successful, the function returns the ID of the newly created image file in Google Drive.
- If unsuccessful, it logs an error message and returns `null`.

## Notes
- The script relies on Google Drive's thumbnail preview for conversion, which may not always be available for all PDFs.
- Ensure that the PDF has a valid preview in Drive before attempting conversion.

