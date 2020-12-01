const predictButton = document.querySelector('#predict-button')
const imageSelector = document.querySelector('#image-selector')
const selectedImage = document.querySelector('#selected-image')
const predictionList = document.querySelector('#prediction-list')
const statusBar = document.querySelector('#status')

imageSelector.addEventListener('change', () => {
    const reader = new FileReader()
    reader.onload = function() {
        const dataUrl = reader.result
        selectedImage.setAttribute('src', dataUrl)
        while (predictionList.firstChild) {
            predictionList.removeChild(predictionList.firstChild);
        }
    }
    
    const file = imageSelector.files[0]
    reader.readAsDataURL(file)
})

predictButton.addEventListener('click', async() => {
    // Show the 'Loading Data Model' status
    statusBar.removeAttribute('hidden')

    // Load the model
    const model = await mobilenet.load()
    statusBar.setAttribute('hidden', true)
    
    // Classify image
    const predictions = await model.classify(selectedImage)

    // Display predictions
    predictions.forEach(prediction => predictionList.innerHTML += `<li>${prediction.className}: ${prediction.probability.toFixed(3)}</li>`)
})