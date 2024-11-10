let appointments = JSON.parse(localStorage.getItem('appointments')) || [];
let currentDate = new Date();

function generateId() {
    return '_' + Math.random().toString(36).substr(2, 9);
}

function changeMonth(direction) {
    currentDate.setMonth(currentDate.getMonth() + direction);
    updateCalendar();
}

function updateCalendar() {
    const calendarDiv = document.getElementById('calendar');
    const month = currentDate.getMonth();
    const year = currentDate.getFullYear();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const monthName = currentDate.toLocaleString('default', { month: 'long', year: 'numeric' });
    document.getElementById('monthName').textContent = monthName;

    // Clear existing calendar content
    calendarDiv.innerHTML = '';

    // Retrieve appointments from localStorage
    const appointments = JSON.parse(localStorage.getItem('appointments')) || [];

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
    tbody.innerHTML = ''; // Clear previous rows

    if (filteredAppointments.length > 0) {
        table.style.display = 'table'; // Show table
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
        table.style.display = 'none'; // Hide table if no data
    }
}

function searchPatient() {
    const query = document.getElementById('searchBar').value.toLowerCase();
    const filteredAppointments = appointments.filter(app => app.patientName.toLowerCase().includes(query));
    displayAppointmentsTable(filteredAppointments);
    updateCalendarWithFilteredAppointments(filteredAppointments); // Update calendar with the filtered appointments
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
    const appointments = JSON.parse(localStorage.getItem('appointments')) || [];
    const appointment = appointments.find(app => app.id === appointmentId);

    if (!appointment) {
        alert("Appointment not found!");
        return;
    }

    document.getElementById('patientName').value = appointment.patientName;
    document.getElementById('healthCardNumber').value = appointment.healthCardNumber;
    document.getElementById('appointmentTime').value = appointment.time;
    document.getElementById('appointmentDate').value = appointment.date;

    document.getElementById('appointmentForm').style.display = 'block';

    const form = document.getElementById('appointmentFormContent');
    form.onsubmit = function (e) {
        e.preventDefault();

        appointment.patientName = document.getElementById('patientName').value.trim();
        appointment.healthCardNumber = document.getElementById('healthCardNumber').value.trim();
        appointment.time = document.getElementById('appointmentTime').value;
        appointment.date = document.getElementById('appointmentDate').value;

        localStorage.setItem('appointments', JSON.stringify(appointments));

        updateCalendar();
        displayAppointmentsTable(appointments);

        alert("Appointment successfully updated!");
        cancelAppointment();
    };
}

function saveAppointment() {
    const patientName = document.getElementById('patientName').value.trim();
    const healthCardNumber = document.getElementById('healthCardNumber').value.trim();
    const time = document.getElementById('appointmentTime').value;
    const date = document.getElementById('appointmentDate').value;

    if (!patientName || !healthCardNumber || !time || !date) {
        alert("Please fill in all the fields.");
        return;
    }

    const patients = JSON.parse(localStorage.getItem('patients')) || [];
    const patient = patients.find(
        p =>
            p.name.toLowerCase() === patientName.toLowerCase() &&
            p.healthCardNumber === healthCardNumber
    );

    if (!patient) {
        alert(
            `Patient "${patientName}" with Health Card Number "${healthCardNumber}" does not exist in the records. Please add the patient in the Patient Database (index page) first.`
        );
        window.location.href = 'index.html';
        return;
    }

    const newAppointment = {
        id: generateId(),
        patientName,
        healthCardNumber,
        time,
        date,
    };

    appointments.push(newAppointment);
    localStorage.setItem('appointments', JSON.stringify(appointments));

    displayAppointmentsTable(appointments);
    updateCalendar();

    alert(`Appointment successfully added for ${patientName}!`);
    cancelAppointment();
}

function deleteAppointment(appointmentId) {
    const confirmDelete = confirm("Are you sure you want to delete this appointment?");
    if (!confirmDelete) return;

    appointments = appointments.filter(app => app.id !== appointmentId);
    localStorage.setItem('appointments', JSON.stringify(appointments));

    updateCalendar();
    displayAppointmentsTable(appointments);

    alert("Appointment successfully deleted!");
}

function loadAppointments() {
    displayAppointmentsTable(appointments);
}

loadAppointments();
updateCalendar();

// Add Appointment Button Logic
document.getElementById('addAppointmentButton').onclick = () => openAppointmentForm(new Date());
