         // JavaScript to handle the form submission
         document.getElementById('addAnimalForm').addEventListener('submit', function (e) {
            e.preventDefault();  // Prevent the default form submission

            const animalData = {
                name: document.getElementById('animalName').value,
                species:document.getElementById('animalSpecies').value,
                age: document.getElementById('animalAge').value,
                gender: document.getElementById('animalGender').value,
                healthStatus: document.getElementById('animalHealthStatus').value,
                feedSchedule: document.getElementById('animalFeedSchedule').value,
                enclosureId: document.getElementById('animalEnclosureId').value,
                zooId: document.getElementById('animalZooId').value
            };

    /*        
    fetch('/animal-emp', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(animalData)
    })
    .then(response => response.json())  // Ensure we parse the response as JSON
    .then(data => {
        if (data.message) {
            alert(data.message);  // Display the success message from backend
            location.reload(); // Reload the page to reflect the changes
        } else {
            alert('Unexpected response format.');
        }
    })
    .catch(error => {
        console.error('Error adding animal:', error);
        alert('Error adding animal. Please try again.');
    });
});
*/

fetch('/animal-emp', { // Matches the route registered in server.js
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(animalData)
})
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        if (data.message) {
            alert(data.message);  // Display the success message from backend
            location.reload();
        } else {
            alert('Unexpected response format.');
        }
    })
    .catch(error => {
        console.error('Error adding animal:', error);
        alert('Error adding animal. Please try again.');
    });
});
