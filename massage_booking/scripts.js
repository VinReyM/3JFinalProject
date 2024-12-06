
document.querySelector('.service-cards-container').addEventListener('click', function(event) {
    if (event.target.classList.contains('book-now')) {
        const serviceName = event.target.getAttribute('data-service');
        document.getElementById('service_name').value = serviceName;
        window.scrollTo(0, document.querySelector('.booking-section').offsetTop);
    }
});

document.getElementById('booking-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const bookingData = {
        name: document.getElementById('name').value,
        service_name: document.getElementById('service_name').value,
        appointment_date: document.getElementById('appointment_date').value,
        start_time: document.getElementById('start_time').value,
        contact_info: document.getElementById('contact_info').value,
        special_requests: document.getElementById('special_requests').value
    };

    fetch('add_booking.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert(data.message);
            loadAppointments();
        } else {
            alert('Error booking appointment: ' + data.error);
        }
    })
    .catch(error => alert('Error: ' + error));
});


function loadAppointments() {
    fetch('get_appointments.php')
        .then(response => response.json())
        .then(data => {
            const tableBody = document.getElementById('appointments-table').getElementsByTagName('tbody')[0];
            tableBody.innerHTML = ''; 

            data.forEach(appointment => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${appointment.name}</td>
                    <td>${appointment.service_name}</td>
                    <td>${appointment.date}</td>
                    <td>${appointment.time}</td>
                    <td>${appointment.contact_info}</td>
                    <td>${appointment.special_requests}</td>
                `;
                tableBody.appendChild(row);
            });
        })
        .catch(error => alert('Error loading appointments: ' + error));
}


loadAppointments();
