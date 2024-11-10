// Get patient data from localStorage
let patients = JSON.parse(localStorage.getItem('patients')) || [];

// Get the patient index from the URL
const urlParams = new URLSearchParams(window.location.search);
const patientIndex = urlParams.get('id');

// Track if there is any row in edit state
let isEditing = false;

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

// Enable inline editing when clicking on the edit button
function enableEditing(fieldId) {
    const field = document.getElementById(fieldId);
    const currentValue = field.textContent || field.value;
    const parentDiv = field.parentNode;

    // Set editing state to true
    isEditing = true;

    // Hide the current text content
    field.style.display = 'none';

    // Hide the edit button
    const editButton = parentDiv.querySelector('.edit-buttons');
    editButton.style.display = 'none';

    // Create an input box
    const input = document.createElement('input');
    input.type = 'text';
    input.value = currentValue;
    input.id = `edit-${fieldId}`;
    input.style.flexGrow = '1'; // Adjust the size of the input box dynamically
    parentDiv.appendChild(input);

    // Create Save button
    const saveButton = document.createElement('button');
    saveButton.textContent = 'Save';
    saveButton.className = 'save-button';
    saveButton.onclick = function () {
        saveChanges(fieldId, input.value);
        resetToOriginalState(field, input, saveButton, cancelButton, editButton);
    };

    // Create Close button
    const cancelButton = document.createElement('button');
    cancelButton.textContent = 'Close';
    cancelButton.className = 'cancel-button';
    cancelButton.onclick = function () {
        cancelEdit(fieldId, currentValue);
        resetToOriginalState(field, input, saveButton, cancelButton, editButton);
    };

    // Add the Save and Close buttons
    parentDiv.appendChild(saveButton);
    parentDiv.appendChild(cancelButton);
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
}

// Cancel the edit and restore the original value
function cancelEdit(fieldId, originalValue) {
    const field = document.getElementById(fieldId);
    field.textContent = originalValue;
}

// Reset the row to its original state
function resetToOriginalState(field, input, saveButton, cancelButton, editButton) {
    // Remove the input box and buttons
    input.remove();
    saveButton.remove();
    cancelButton.remove();

    // Show the original text content
    field.style.display = 'inline-block';

    // Show the edit button again
    editButton.style.display = 'inline-block';

    // Reset editing state
    isEditing = false;
}

// Handle the return to home button click
function handleReturnToHome(event) {
    if (isEditing) {
        event.preventDefault(); // Prevent navigation
        alert('You have unsaved changes. Please save or close your work before exiting.');
    } else {
        window.location.href = 'index.html'; // Redirect to the home page
    }
}

// Attach the return to home button handler
document.getElementById('returnHomeButton').addEventListener('click', handleReturnToHome);

loadPatientDetails(); // Load the patient details when the page loads

