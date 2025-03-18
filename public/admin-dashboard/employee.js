// Handle form submission for adding an employee
document.getElementById('addEmployeeForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    // Gather form data
    const employeeData = {
        employeeName: document.getElementById('employeeName').value,
        role: document.getElementById('role').value,
        contactInfo: document.getElementById('contactInfo').value,
        salary: document.getElementById('salary').value,
        zooID: document.getElementById('zooID').value
    };

    // Send data to server
    try {
        const response = await fetch('/add-employee', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(employeeData)
        });

        if (response.ok) {
            alert('Employee added successfully!');
            document.getElementById('addEmployeeForm').reset(); // Clear form
            fetchEmployees(); // Refresh the employee list
        } else {
            const errorText = await response.text();
            alert(`Failed to add employee: ${errorText}`);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while adding the employee.');
    }
});

// Fetch and display all employees
async function fetchEmployees() {
    try {
        const response = await fetch('/employees');
        if (response.ok) {
            const employees = await response.json();
            displayEmployees(employees);
        } else {
            alert('Failed to load employees.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while loading employees.');
    }
}

// Display employee list in the table
function displayEmployees(employees) {
    const table = document.getElementById('employeeTable');
    table.innerHTML = `
        <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Role</th>
            <th>Contact Info</th>
            <th>Salary</th>
            <th>Zoo ID</th>
            <th>Actions</th>
        </tr>
    `;

    employees.forEach(employee => {
        const row = table.insertRow();
        row.innerHTML = `
            <td>${employee.Employee_ID}</td>
            <td>${employee.Name}</td>
            <td>${employee.Role}</td>
            <td>${employee.Contact_Info}</td>
            <td>${employee.Salary}</td>
            <td>${employee.Zoo_ID}</td>
            <td><button onclick="deleteEmployee(${employee.Employee_ID})">Delete</button></td>
        `;
    });
}

// Delete an employee by ID
async function deleteEmployee(id) {
    try {
        const response = await fetch(`/delete-employee/${id}`, { method: 'DELETE' });
        if (response.ok) {
            alert('Employee deleted successfully!');
            fetchEmployees(); // Refresh the employee list
        } else {
            alert('Failed to delete employee.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while deleting the employee.');
    }
}

// Load employees on page load
fetchEmployees();
