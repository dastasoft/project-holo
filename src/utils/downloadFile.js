export default function downloadFile(fileName, base64Data) {
  const downloadLink = document.createElement('a');
  downloadLink.href = base64Data;
  downloadLink.download = fileName;
  downloadLink.click();
}
