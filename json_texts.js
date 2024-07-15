document.addEventListener('DOMContentLoaded', function () {
    let jsonData = {};
    const addedTexts = new Set();
    let displayedTexts = [];

    fetch('table.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            jsonData = data;
            console.log('JSON data loaded:', jsonData);

            const displayedText = document.getElementById('displayed-text');
            const radioFirst = document.getElementById('radio-first');
            const radioSecond = document.getElementById('radio-second');
            const radioRandom = document.getElementById('radio-random');
            const replaceBtn = document.getElementById('replace-btn');
            const appendBtn = document.getElementById('append-btn');

            function getRandomInt(min, max) {
                return Math.floor(Math.random() * (max - min + 1)) + min;
            }

            function getSelectedText() {
                if (!jsonData.random_texts) {
                    console.error('random_texts is undefined');
                    return '';
                }
                if (radioFirst.checked) {
                    return jsonData.random_texts[0].text;
                } else if (radioSecond.checked) {
                    return jsonData.random_texts[1].text;
                } else if (radioRandom.checked) {
                    const availableTexts = jsonData.random_texts.filter(textObj => !addedTexts.has(textObj.text));
                    if (availableTexts.length === 0) {
                        return '';
                    }
                    const randomIndex = getRandomInt(0, availableTexts.length - 1);
                    return availableTexts[randomIndex].text;
                }
                return '';
            }

            function displayTexts() {
                displayedText.innerHTML = '';

                displayedTexts.forEach((text, index) => {
                    const textElement = document.createElement('span');
                    textElement.id = `text-${index}`;
                    textElement.textContent = text;
                    displayedText.appendChild(textElement);
                    if (index < displayedTexts.length - 1) {
                        displayedText.appendChild(document.createTextNode(' '));
                    }
                });
            }

            replaceBtn.addEventListener('click', function() {
                const newText = getSelectedText();
                if (newText) {
                    displayedTexts = [newText]; 
                    addedTexts.clear(); 
                    addedTexts.add(newText); 
                    displayTexts();
                }
            });

            function insertTextAlphabetically(newText) {
                displayedTexts.push(newText);
                displayedTexts.sort();
            }

            appendBtn.addEventListener('click', function() {
                const newText = getSelectedText();
                if (newText && !addedTexts.has(newText)) {
                    insertTextAlphabetically(newText); 
                    addedTexts.add(newText); 
                    displayTexts();
                } else if (!newText) {
                    alert('No new text to add.');
                }
            });
        })
        .catch(error => console.error('Error loading JSON data:', error));
});
