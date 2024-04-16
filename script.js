document.addEventListener('DOMContentLoaded', function () {
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];
    let currentMonth = new Date().getMonth();
    let currentYear = new Date().getFullYear();

    const events = JSON.parse(localStorage.getItem('events')) || {};

    function updateCalendar() {
        const firstDay = new Date(currentYear, currentMonth, 1).getDay();
        const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
        const calendarDays = document.getElementById("calendar-days");
        calendarDays.innerHTML = '';

        for (let i = 0; i < firstDay; i++) {
            calendarDays.innerHTML += '<div></div>'; // Fills the empty grid spaces
        }

        for (let day = 1; day <= daysInMonth; day++) {
            const dateStr = `${currentYear}-${currentMonth + 1}-${day}`;
            const eventHTML = events[dateStr] ? `<div class="event">${events[dateStr]}</div>` : '';
            calendarDays.innerHTML += `<div class="day" data-date="${dateStr}">${day}${eventHTML}</div>`;
        }

        document.getElementById("month-name").innerText = `${monthNames[currentMonth]} ${currentYear}`;
    }

    document.getElementById("calendar-days").addEventListener('click', function(event) {
        if (event.target.classList.contains('day') || event.target.parentNode.classList.contains('day')) {
            const date = event.target.closest('.day').getAttribute('data-date');
            const eventText = prompt("Add an event", events[date] || '');
            if (eventText !== null) { // Checks if the user pressed "cancel"
                events[date] = eventText;
                localStorage.setItem('events', JSON.stringify(events));
                updateCalendar();
            }
        }
    });

    document.getElementById("next-month").addEventListener('click', () => {
        currentMonth = (currentMonth + 1) % 12;
        currentYear = (currentMonth === 0) ? currentYear + 1 : currentYear;
        updateCalendar();
    });

    document.getElementById("prev-month").addEventListener('click', () => {
        currentMonth = (currentMonth - 1 + 12) % 12;
        currentYear = (currentMonth === 11) ? currentYear - 1 : currentYear;
        updateCalendar();
    });

    updateCalendar();
});
