document.querySelector('form').addEventListener('submit', (event) => {
  event.preventDefault();

  // Access the form input elements using their id attribute
  const fullnameInput = document.getElementById('fullname');
  const emailInput = document.getElementById('email');
  const specialreqInput = document.getElementById('specialreq');
  const billaddressInput = document.getElementById('billaddress');
  const telphoneInput = document.getElementById('telphone');

  

  // Get the user input from the form fields
  const fullname = fullnameInput.value;
  const email = emailInput.value;
  const specialreq = specialreqInput.value;
  const billaddress = billaddressInput.value;
  const telephone = telphoneInput.value;



  // Create the request payload (data to be sent to the server)
  const data = {
    fullname,
    email,
    specialreq,
    billaddress,
    telephone
    
  };

  // Send the form data to the server
  fetch('/submit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((data) => {
      // Handle the response from the server if needed
      console.log('Server response:', data);
      // Optionally, you can redirect to another page after successful submission
      window.location.href = '/';
    })
    .catch((error) => {
      console.error('Error:', error);
      // Handle any errors that occurred during the fetch request
    });
});
