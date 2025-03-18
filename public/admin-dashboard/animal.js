/*Fetch all animals and display them in the table
fetch('/animal')
    .then(response => response.json())
    .then(data => {
        const tableBody = document.querySelector('#animalTable tbody');
        tableBody.innerHTML = ''; // Clear any existing data

        data.forEach(animal => {
            const row = document.createElement('tr');

            row.innerHTML = `
                <td>${animal.Animal_ID}</td>
                <td>${animal.Name}</td>
                <td>${animal.Species}</td>
                <td>${animal.Age}</td>
                <td>${animal.Gender}</td>
                <td>${animal.Health_Status}</td>
                <td>${animal.Feed_Schedule}</td>
                <td>${animal.Enclosure_ID}</td>
                <td>${animal.Zoo_ID}</td>
            `;

            tableBody.appendChild(row);
        });
    })
    .catch(error => {
        console.error('Error fetching animal data:', error);
    });
*/

// Fetch all animals and display them in the table
fetch('/animal')
    .then(response => response.json())
    .then(data => {
        const tableBody = document.querySelector('#animalTable tbody');
        tableBody.innerHTML = ''; // Clear any existing data

        data.forEach(animal => {
            const row = document.createElement('tr');

            row.innerHTML = `
                <td>${animal.Animal_ID}</td>
                <td>${animal.Name}</td>
                <td>${animal.Species}</td>
                <td>${animal.Age}</td>
                <td>${animal.Gender}</td>
                <td>${animal.Health_Status}</td>
                <td>${animal.Feed_Schedule}</td>
                <td>${animal.Enclosure_ID}</td>
                <td>${animal.Zoo_ID}</td>
                <td>
                    <!-- Modify Icon -->
                    <button class="modify-button" data-id="${animal.Animal_ID}">
                        <i class="fas fa-edit" title="Modify"></i>
                    </button>
                    <!-- Delete Icon -->
                    <button class="delete-button" data-id="${animal.Animal_ID}">
                        <i class="fas fa-trash" title="Delete"></i>
                    </button>
                </td>
            `;

            tableBody.appendChild(row);
        });

        // Add event listeners for Modify and Delete buttons
        document.querySelectorAll('.modify-button').forEach(button => {
            button.addEventListener('click', (e) => {
                const animalId = e.target.closest('button').dataset.id;
                modifyAnimal(animalId);
            });
        });

        document.querySelectorAll('.delete-button').forEach(button => {
            button.addEventListener('click', (e) => {
                const animalId = e.target.closest('button').dataset.id;
                deleteAnimal(animalId);
            });
        });
    })
    .catch(error => {
        console.error('Error fetching animal data:', error);
    });

// Function to modify animal details
function modifyAnimal(animalId) {
    // You can implement a modal or redirect to a form where the admin can edit animal details
    alert(`Modify animal with ID: ${animalId}`);
    // Example: open a modal with prefilled animal details or redirect to a modify form
}



// function to delete the animal data 
function deleteAnimal(Animal_Id) {
    console.log("Attempting to delete Animal ID:", Animal_Id);  // Log the ID
    if (confirm('Are you sure you want to delete this animal?')) {
        fetch(`/animal/${Animal_Id}`, {
            method: 'DELETE',
        })
        .then(response => {
            console.log("HTTP Response Status:", response.status);  // Log status code
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Response:', data); // Log successful response data
            alert('Animal deleted successfully');
            location.reload();
        })
        .catch(error => {
            console.error('Error deleting animal:', error.message || error);
        });
    }
}
