let appointments = JSON.parse(localStorage.getItem('appointments')) || [];
let currentDate = new Date(); // Track current date

// Function to update the calendar display for the current month
function updateCalendar() {
    const calendarDiv = document.getElementById('calendar');
    const month = currentDate.getMonth(); // Get current month
    const year = currentDate.getFullYear(); // Get current year
    const daysInMonth = new Date(year, month + 1, 0).getDate(); // Get number of days in current month

    // Set the month name for navigation
    const monthName = currentDate.toLocaleString('default', { month: 'long', year: 'numeric' });
    document.getElementById('monthName').textContent = monthName;

    // Clear previous calendar
    calendarDiv.innerHTML = '';

    // Create the grid of days
    for (let day = 1; day <= daysInMonth; day++) {
        const dayDiv = document.createElement('div');
        dayDiv.classList.add('day');

        // Add the date to the div
        const date = new Date(year, month, day);
        dayDiv.innerHTML = `<strong>${day}</strong>`;

        // Find appointments for this date
        const dayAppointments = appointments.filter(app => new Date(app.date).toDateString() === date.toDateString());

        // Display the appointments for this day
        const appointmentDiv = document.createElement('div');
        appointmentDiv.classList.add('appointments');
        dayAppointments.forEach(app => {
            appointmentDiv.innerHTML += `${app.patientName} at ${app.time}<br>`;
        });

        dayDiv.appendChild(appointmentDiv);

        // Add a button to add a new appointment
        const button = document.createElement('button');
        button.textContent = 'Add Appointment';
        button.onclick = () => openAppointmentForm(date);
        dayDiv.appendChild(button);

        calendarDiv.appendChild(dayDiv);
    }
}

// Function to navigate to the previous month
function changeMonth(offset) {
    currentDate.setMonth(currentDate.getMonth() + offset);
    updateCalendar();
}

// Function to open the appointment form
function openAppointmentForm(date) {
    const formContainer = document.getElementById('appointmentForm');
    formContainer.style.display = 'block';

    // Pre-fill the form with the selected date
    document.getElementById('appointmentDate').value = date.toISOString().split('T')[0];
}

// Function to save the new appointment
document.getElementById('appointmentFormContent').addEventListener('submit', function (e) {
    e.preventDefault();

    const patientName = document.getElementById('patientName').value;
    const appointmentTime = document.getElementById('appointmentTime').value;
    const appointmentDate = document.getElementById('appointmentDate').value;

    // Create an appointment object
    const newAppointment = {
        patientName: patientName,
        time: appointmentTime,
        date: appointmentDate
    };

    // Add the appointment to the list and save it to localStorage
    appointments.push(newAppointment);
    localStorage.setItem('appointments', JSON.stringify(appointments));

    // Reload the calendar to reflect the new appointment
    updateCalendar();

    // Close the form
    cancelAppointment();
});

// Function to cancel the appointment form
function cancelAppointment() {
    const formContainer = document.getElementById('appointmentForm');
    formContainer.style.display = 'none';
    document.getElementById('patientName').value = '';
    document.getElementById('appointmentTime').value = '';
    document.getElementById('appointmentDate').value = '';
}


// Initial call to update the calendar
document.addEventListener("DOMContentLoaded", function () {
    updateCalendar();
});
