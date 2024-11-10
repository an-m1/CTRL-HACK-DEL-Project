// Hardcoded patient data
const defaultPatients = [
    {
        name: "John Doe",
        age: 45,
        gender: "Male",
        illness: "Flu",
        allergies: "Peanuts",
        healthRecords: "No major illnesses",
        familyHealthRecords: "History of diabetes",
        currMedications: "Paracetamol",
        immunizationRec: "COVID-19, Influenza",
        emergencyContact: "Jane Doe (Wife)",
        personalContact: "123-456-7890",
        emergencyContactPhone: "123-456-7891",
        address: "123 Maple Street, Toronto, ON",
        importantNotes: "Monitor blood pressure",
        healthCardNumber: "1234-5678-9012",
    },
    {
        name: "Mary Smith",
        age: 32,
        gender: "Female",
        illness: "Asthma",
        allergies: "Dust Mites",
        healthRecords: "Frequent asthma attacks",
        familyHealthRecords: "No notable history",
        currMedications: "Inhaler",
        immunizationRec: "MMR, Hepatitis B",
        emergencyContact: "Robert Smith (Brother)",
        personalContact: "234-567-8901",
        emergencyContactPhone: "234-567-8902",
        address: "456 Oak Street, Toronto, ON",
        importantNotes: "Avoid allergens",
        healthCardNumber: "2345-6789-0123",
    },
    {
        name: "Alice Brown",
        age: 29,
        gender: "Female",
        illness: "Diabetes",
        allergies: "None",
        healthRecords: "Type 2 diabetes diagnosed in 2020",
        familyHealthRecords: "History of diabetes in family",
        currMedications: "Metformin",
        immunizationRec: "Tetanus, Polio",
        emergencyContact: "Charlie Brown (Husband)",
        personalContact: "345-678-9012",
        emergencyContactPhone: "345-678-9013",
        address: "789 Pine Street, Toronto, ON",
        importantNotes: "Monitor glucose levels",
        healthCardNumber: "3456-7890-1234",
    },
];

// Initialize default patients in localStorage if not already present
function initializeDefaultPatients() {
    if (!localStorage.getItem('patients') || JSON.parse(localStorage.getItem('patients')).length === 0) {
        console.log("No patients found in localStorage. Adding default patients.");
        localStorage.setItem('patients', JSON.stringify(defaultPatients));
    } else {
        console.log("Patients already exist in localStorage.");
    }
}

// Call the initialization function to ensure default patients are added
initializeDefaultPatients();

// Add a new patient from the form
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
        currMedications: document.getElementById('currMedications').value,
        immunizationRec: document.getElementById('immunizationRec').value,
        emergencyContact: document.getElementById('emergencyContact').value,
        personalContact: document.getElementById('personalContact').value,
        emergencyContactPhone: document.getElementById('emergencyContactPhone').value,
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
