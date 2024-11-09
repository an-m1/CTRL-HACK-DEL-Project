document.getElementById('viewRecordsBtn').addEventListener('click', () => {
    alert('Accessing your health records...');
  });
  
  document.getElementById('sendMessageBtn').addEventListener('click', () => {
    const message = document.getElementById('messageBox').value;
    if (message.trim() === '') {
      alert('Please type a message before sending.');
    } else {
      alert(`Message sent: "${message}"`);
      document.getElementById('messageBox').value = ''; // Clear the message box
    }
  });
  