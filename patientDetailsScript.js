// Get patient data from localStorage
let patients = JSON.parse(localStorage.getItem('patients')) || [];

// Get the patient index from the URL
const urlParams = new URLSearchParams(window.location.search);
const patientIndex = urlParams.get('id');

// Load patient data into the page
function loadPatientDetails() {
    if (patientIndex !== null && patients[patientIndex]) {
        const patient = patients[patientIndex];

        // Display the patient details
        document.getElementById('name').textContent = patient.name;
        document.getElementById('age').textContent = patient.age;
        document.getElementById('gender').textContent = patient.gender;
        document.getElementById('illness').textContent = patient.illness;
        document.getElementById('allergies').textContent = patient.allergies;
        document.getElementById('healthRecords').textContent = patient.healthRecords;
        document.getElementById('familyHealthRecords').textContent = patient.familyHealthRecords;
        document.getElementById('nextAppointment').textContent = patient.nextAppointment;
        document.getElementById('lastAppointment').textContent = patient.lastAppointment;
        document.getElementById('emergencyContact').textContent = patient.emergencyContact;
        document.getElementById('contact').textContent = patient.contact;
        document.getElementById('address').textContent = patient.address;
        document.getElementById('importantNotes').textContent = patient.importantNotes;
        document.getElementById('healthCardNumber').textContent = patient.healthCardNumber;
    } else {
        alert("Patient not found.");
        window.location.href = 'index.html'; // Redirect to the main page if patient not found
    }
}

// Enable inline editing when clicking on a field
function enableEditing(fieldId) {
    const field = document.getElementById(fieldId);
    const currentValue = field.textContent || field.value;
    
    // Change the content to an editable input field
    const input = document.createElement('input');
    input.type = 'text';
    input.value = currentValue;
    input.id = `edit-${fieldId}`;

    // Replace the field with the input element
    field.textContent = '';
    field.appendChild(input);

    // Add a save button next to the input
    const saveButton = document.createElement('button');
    saveButton.textContent = 'Save';
    saveButton.onclick = function() {
        saveChanges(fieldId, input.value);
    };
    field.appendChild(saveButton);

    // Add a cancel button to discard changes
    const cancelButton = document.createElement('button');
    cancelButton.textContent = 'Cancel';
    cancelButton.onclick = function() {
        cancelEdit(fieldId, currentValue);
    };
    field.appendChild(cancelButton);
}

// Save the changes to localStorage and update the field
function saveChanges(fieldId, newValue) {
    const patient = patients[patientIndex];
    // Update the patient data
    patient[fieldId] = newValue;

    // Save updated patient data to localStorage
    localStorage.setItem('patients', JSON.stringify(patients));

    // Update the field display
    const field = document.getElementById(fieldId);
    field.textContent = newValue;

    // Remove the save and cancel buttons
    const buttons = field.getElementsByTagName('button');
    Array.from(buttons).forEach(button => button.remove());
}

// Cancel the edit and restore the original value
function cancelEdit(fieldId, originalValue) {
    const field = document.getElementById(fieldId);
    field.textContent = originalValue;

    // Remove the save and cancel buttons
    const buttons = field.getElementsByTagName('button');
    Array.from(buttons).forEach(button => button.remove());
}

loadPatientDetails(); // Load the patient details when the page loads
