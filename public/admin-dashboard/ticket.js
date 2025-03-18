// File: public/scripts/tickets.js
document.addEventListener("DOMContentLoaded", () => {
  fetchTicketTypes();

  const form = document.getElementById("addTicketForm");
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    addTicketType();
  });
});

// Fetch and display ticket types
function fetchTicketTypes() {
  fetch('/ticket')
    .then(response => response.json())
    .then(data => {
      const tableBody = document.querySelector("#ticketTable tbody");
      tableBody.innerHTML = ""; // Clear previous rows
      data.forEach(ticket => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${ticket.Type_ID}</td>
          <td>${ticket.Type_Name}</td>
          <td>$${ticket.Price.toFixed(2)}</td>
          <td>
            <button onclick="deleteTicketType(${ticket.Type_ID})">Delete</button>
          </td>
        `;
        tableBody.appendChild(row);
      });
    })
    .catch(error => console.error("Error fetching ticket types:", error));
}

// Add a new ticket type
function addTicketType() {
  const typeName = document.getElementById("ticket").value;
  const price = parseFloat(document.getElementById("price").value);

  fetch('/ticket', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ typeName, price })
  })
  .then(response => response.json())
  .then(data => {
    alert(data.message);
    document.getElementById("addTicketForm").reset();
    fetchTicketTypes(); // Refresh the ticket list
  })
  .catch(error => console.error("Error adding ticket type:", error));
}

// Delete a ticket type
function deleteTicketType(typeId) {
  if (!confirm("Are you sure you want to delete this ticket type?")) return;

  fetch(`/ticket/${typeId}`, {
    method: 'DELETE'
  })
  .then(response => response.json())
  .then(data => {
    alert(data.message);
    fetchTicketTypes(); // Refresh the ticket list
  })
  .catch(error => console.error("Error deleting ticket type:", error));
}
