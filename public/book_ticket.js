// Function to fetch and display ticket types
function loadTicketTypes() {
    fetch('/ticket-types')
        .then(response => response.json())
        .then(data => {
            const ticketTypeSelect = document.getElementById('ticketType');
            ticketTypeSelect.innerHTML = ''; // Clear any existing options

            data.forEach(type => {
                const option = document.createElement('option');
                option.value = type.Type_ID;
                option.textContent = `${type.Type_Name} - Rs:${type.Price}`;
                ticketTypeSelect.appendChild(option);
            });
        })
        .catch(error => console.error('Error fetching ticket types:', error));
}

// Call loadTicketTypes on page load
window.addEventListener('DOMContentLoaded', loadTicketTypes);





const form = document.getElementById("ticketForm");

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const data = {
        visitorId: document.getElementById("visitorID").value,
        zooId: document.getElementById("zooID").value,
        typeId: document.getElementById("ticketType").value,
        date: document.getElementById("visitDate").value,
    };

    fetch("/ticket", { // Update the route to match '/tickets/ticket'
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
    .then((response) => response.text())
    .then((message) => alert(message))
    .catch((error) => console.error("Error:", error));
});
