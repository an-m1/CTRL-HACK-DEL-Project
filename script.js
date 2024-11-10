// Fetch patients data from localStorage
let patients = JSON.parse(localStorage.getItem('patients')) || [];

// Add new patient
document.getElementById('addPatientForm')?.addEventListener('submit', function (e) {
    e.preventDefault();

    const newPatient = {
        name: document.getElementById('name').value,
        age: document.getElementById('age').value,
        gender: document.getElementById('gender').value,
        illness: document.getElementById('illness').value,
        allergies: document.getElementById('allergies').value,
        healthRecords: document.getElementById('healthRecords').value,
        familyHealthRecords: document.getElementById('familyHealthRecords').value,
        nextAppointment: document.getElementById('nextAppointment').value,
        lastAppointment: document.getElementById('lastAppointment').value,
        emergencyContact: document.getElementById('emergencyContact').value,
        contact: document.getElementById('contact').value,
        address: document.getElementById('address').value,
        importantNotes: document.getElementById('importantNotes').value,
        healthCardNumber: document.getElementById('healthCardNumber').value,
    };

    patients.push(newPatient);
    localStorage.setItem('patients', JSON.stringify(patients));

    window.location.href = 'index.html';  // Redirect to main page after adding patient
});

// Display the list of patients on the main page
function displayPatients() {
    const table = document.getElementById('patientsTable').getElementsByTagName('tbody')[0];

    patients.forEach((patient, index) => {
        const row = table.insertRow();
        row.insertCell(0).textContent = patient.name;
        row.insertCell(1).textContent = patient.contact;
        row.insertCell(2).textContent = patient.address;
        row.insertCell(3).textContent = patient.healthCardNumber;
        const detailsCell = row.insertCell(4);
        const link = document.createElement('a');
        link.href = `patientDetails.html?id=${index}`;
        link.textContent = 'Details';
        detailsCell.appendChild(link);
    });
}

// Search patients
function searchPatient() {
    const searchTerm = document.getElementById('searchBar').value.toLowerCase();
    const table = document.getElementById('patientsTable');
    const rows = table.getElementsByTagName('tr');

    for (let i = 1; i < rows.length; i++) {
        const nameCell = rows[i].cells[0];
        const name = nameCell.textContent.toLowerCase();
        rows[i].style.display = name.includes(searchTerm) ? '' : 'none';
    }
}

displayPatients();
