let appointments = JSON.parse(localStorage.getItem('appointments')) || [];
let patientDetails = JSON.parse(localStorage.getItem('patientDetails')) || [];
let currentDate = new Date();

function generateId() {
    return '_' + Math.random().toString(36).substr(2, 9);
}

function changeMonth(direction) {
    currentDate.setMonth(currentDate.getMonth() + direction);
    updateCalendar();
}

let searchMode = false;

function updateCalendar() {
    const calendarDiv = document.getElementById('calendar');
    const month = currentDate.getMonth();
    const year = currentDate.getFullYear();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const monthName = currentDate.toLocaleString('default', { month: 'long', year: 'numeric' });
    document.getElementById('monthName').textContent = monthName;

    if (searchMode) {
        return;
    }

    calendarDiv.innerHTML = '';

    // Loop through the days of the month and display them
    for (let day = 1; day <= daysInMonth; day++) {
        const dayDiv = document.createElement('div');
        dayDiv.classList.add('day');
        const date = new Date(year, month, day);
        dayDiv.innerHTML = `<strong>${day}</strong>`;

        const dayAppointments = appointments.filter(app => {
            const appDate = new Date(app.date);
            return appDate.toISOString().split('T')[0] === date.toISOString().split('T')[0];
        });

        const appointmentDiv = document.createElement('div');
        appointmentDiv.classList.add('appointments');

        dayAppointments.forEach(app => {
            appointmentDiv.innerHTML += `${app.patientName} at ${app.time}<br>`;
        });

        dayDiv.appendChild(appointmentDiv);
        calendarDiv.appendChild(dayDiv);
    }

    // Add the "Add Appointment" button outside of individual days, just below the calendar
    const addAppointmentButton = document.createElement('button');
    addAppointmentButton.textContent = 'Add Appointment';
    addAppointmentButton.onclick = () => openAppointmentForm(new Date(year, month, 1));  // Pass a placeholder date
    calendarDiv.appendChild(addAppointmentButton);
}

function displayAppointmentsTable(filteredAppointments) {
    const table = document.getElementById('appointmentTable');
    const tbody = document.getElementById('appointmentTableBody');
    tbody.innerHTML = '';

    if (filteredAppointments.length > 0) {
        table.style.display = 'table';
        filteredAppointments.forEach((app) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${app.patientName}</td>
                <td>${app.healthCardNumber || 'N/A'}</td>
                <td>${app.date}</td>
                <td>${app.time}</td>
                <td>
                    <button onclick="editAppointment('${app.id}')">Edit</button>
                    <button onclick="deleteAppointment('${app.id}')">Delete</button>
                </td>
            `;
            tbody.appendChild(row);
        });
    } else {
        table.style.display = 'none';
    }
}

function searchPatient() {
    const query = document.getElementById('searchBar').value.toLowerCase();
    const filteredAppointments = appointments.filter(app => app.patientName.toLowerCase().includes(query));
    displayAppointmentsTable(filteredAppointments);
    updateCalendarWithFilteredAppointments(filteredAppointments);  // Update calendar with the filtered appointments
}

function displaySearchResults(filteredAppointments) {
    const resultsTable = document.getElementById('searchResults');
    resultsTable.innerHTML = '';

    if (filteredAppointments.length === 0) {
        resultsTable.innerHTML = '<tr><td colspan="5">No appointments found</td></tr>';
        return;
    }

    resultsTable.innerHTML = `
        <tr>
            <th>Patient Name</th>
            <th>Health Card Number</th>
            <th>Time</th>
            <th>Date</th>
            <th>Action</th>
        </tr>
    `;

    filteredAppointments.forEach(app => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${app.patientName}</td>
            <td>${app.healthCardNumber}</td>
            <td>${app.time}</td>
            <td>${app.date}</td>
            <td><button onclick="editAppointment('${app.id}')">Edit</button></td>
        `;
        resultsTable.appendChild(row);
    });
}

function openAppointmentForm(date) {
    const formContainer = document.getElementById('appointmentForm');
    formContainer.style.display = 'block';
    document.getElementById('appointmentDate').value = date.toISOString().split('T')[0];
    document.getElementById('appointmentFormContent').reset();

    const form = document.getElementById('appointmentFormContent');
    form.onsubmit = function (e) {
        e.preventDefault();
        saveAppointment();
    };
}

function cancelAppointment() {
    document.getElementById('appointmentForm').style.display = 'none';
}

function editAppointment(appointmentId) {
    const appointment = appointments.find(app => app.id === appointmentId);
    if (appointment) {
        document.getElementById('patientName').value = appointment.patientName;
        document.getElementById('healthCardNumber').value = appointment.healthCardNumber;
        document.getElementById('appointmentTime').value = appointment.time;
        document.getElementById('appointmentDate').value = appointment.date;
        document.getElementById('appointmentForm').style.display = 'block';
        document.getElementById('appointmentFormContent').onsubmit = (e) => {
            e.preventDefault();
            saveAppointment(appointmentId);
        };
    }
}

function saveAppointment(appointmentId) {
    const patientName = document.getElementById('patientName').value;
    const healthCardNumber = document.getElementById('healthCardNumber').value;
    const time = document.getElementById('appointmentTime').value;
    const date = document.getElementById('appointmentDate').value;

    if (!patientName || !healthCardNumber || !time || !date) {
        alert("Please fill in all the fields.");
        return;
    }

    const newAppointment = {
        id: appointmentId || generateId(),  // If editing, use the existing ID
        patientName,
        healthCardNumber,
        time,
        date
    };

    // Get the current appointments from localStorage
    let appointments = JSON.parse(localStorage.getItem('appointments')) || [];
    
    // If an appointment is being edited, update it instead of adding a new one
    if (appointmentId) {
        const index = appointments.findIndex(app => app.id === appointmentId);
        if (index !== -1) {
            appointments[index] = newAppointment;
        }
    } else {
        // Otherwise, it's a new appointment, so add it to the array
        appointments.push(newAppointment);
    }

    // Save the updated appointments back to localStorage
    localStorage.setItem('appointments', JSON.stringify(appointments));

    // Update the calendar with the new or edited appointment
    updateCalendar(); // This will ensure the calendar is updated with the new appointment

    // Reload the page to reflect the updated data
    location.reload();  // Page reloads to reflect changes
}

function deleteAppointment(appointmentId) {
    appointments = appointments.filter(app => app.id !== appointmentId);
    localStorage.setItem('appointments', JSON.stringify(appointments));
    updateCalendar();
}

function loadAppointments() {
    displayAppointmentsTable(appointments);
}

loadAppointments();
updateCalendar();
