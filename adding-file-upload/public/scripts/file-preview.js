const imagePreviewElement = document.getElementById('image-preview');
const filePickerElement = document.getElementById('image');

function showPreview(event) {
  console.log('test');
  const files = event.target.files;
  if (!files || files.length === 0) {
    imagePreviewElement.style.display = 'none';
    imagePreviewElement.src = '';
    return;
  }

  const pickedFile = files[0];
  imagePreviewElement.src = URL.createObjectURL(pickedFile);
  imagePreviewElement.style.display = 'block';
}

filePickerElement.addEventListener('change', showPreview);