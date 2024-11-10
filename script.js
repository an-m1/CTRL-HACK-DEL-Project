
    // Fetch patients data from localStorage
    let patients = JSON.parse(localStorage.getItem('patients')) || [];

    // Function to display the list of patients in the table
    function displayPatients() {
        const table = document.getElementById('patientsTable').getElementsByTagName('tbody')[0];
        table.innerHTML = ''; // Clear existing rows to avoid duplicates

        patients.forEach((patient, index) => {
            const row = table.insertRow();

            // Add patient details to the row
            const nameCell = row.insertCell(0);
            nameCell.textContent = patient.name;
            nameCell.style.cursor = "context-menu"; // Change cursor to indicate right-click is supported
            
            // Add the remaining cells
            row.insertCell(1).textContent = patient.contact;
            row.insertCell(2).textContent = patient.address;
            row.insertCell(3).textContent = patient.healthCardNumber;

            // Add the "Details" link
            const detailsCell = row.insertCell(4);
            const link = document.createElement('a');
            link.href = `patientDetails.html?id=${index}`;
            link.textContent = 'Details';
            link.classList.add('details-button');
            detailsCell.appendChild(link);

            // Right-click (contextmenu) event listener on the name cell
            nameCell.addEventListener('contextmenu', function (e) {
                e.preventDefault(); // Prevent the default right-click menu

                // Show confirmation dialog
                const confirmDelete = confirm(`Are you sure you want to delete ${patient.name} from the records?`);
                if (confirmDelete) {
                    deletePatient(index); // Call delete function
                }
            });
        });
    }

    // Function to delete a patient
    function deletePatient(index) {
        patients.splice(index, 1); // Remove the selected patient from the array
        localStorage.setItem('patients', JSON.stringify(patients)); // Update localStorage
        displayPatients(); // Refresh the table
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

    // Initial display of patients
    displayPatients();

