// Get the patient data from the form and save it to localStorage
document.getElementById('addPatientForm')?.addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent the form from submitting

    // Create a new patient object
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

    // Retrieve existing patients from localStorage or create an empty array
    let patients = JSON.parse(localStorage.getItem('patients')) || [];

    // Add the new patient to the patients array
    patients.push(newPatient);

    // Save the updated patients array back to localStorage
    localStorage.setItem('patients', JSON.stringify(patients));

    alert("Patient added successfully!");
    window.location.href = 'index.html'; // Redirect to the main page
});
