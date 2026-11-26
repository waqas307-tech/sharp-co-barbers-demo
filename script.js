// Sharp & Co. Barbers — small helpers only: mobile menu, today's
// hours, scroll reveal, and the year in the footer.
// Nothing on the page depends on this file to be visible:
// the reveal hidden state is added here, never in the CSS.

var menuButton = document.getElementById('menu-button');
var mainNav = document.getElementById('main-nav');

// Mobile menu: the three-line button opens and closes the links.
if (menuButton && mainNav) {
  menuButton.addEventListener('click', function () {
    var isOpen = mainNav.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });

  // Close the menu after a link is tapped (nicer on phones).
  mainNav.addEventListener('click', function (event) {
    if (event.target.tagName === 'A') {
      mainNav.classList.remove('open');
      menuButton.setAttribute('aria-expanded', 'false');
    }
  });
}

// Today's hours: pick the right row for the real day of the week.
// getDay() gives 0 = Sunday, 1 = Monday, ... 6 = Saturday.
var hoursByDay = {
  0: 'Closed',               // Sunday
  1: '9:00 AM – 7:00 PM',    // Monday
  2: '9:00 AM – 7:00 PM',    // Tuesday
  3: '9:00 AM – 7:00 PM',    // Wednesday
  4: '9:00 AM – 7:00 PM',    // Thursday
  5: '9:00 AM – 7:00 PM',    // Friday
  6: '9:00 AM – 5:00 PM'     // Saturday
};

var today = new Date().getDay();
var todayHoursEl = document.getElementById('today-hours');
if (todayHoursEl) {
  todayHoursEl.textContent = hoursByDay[today];
}

// Highlight today's row in the hours table and add a short note.
var rows = document.querySelectorAll('#hours-table tr');
rows.forEach(function (row) {
  var days = row.getAttribute('data-days').split(',');
  if (days.indexOf(String(today)) !== -1) {
    row.classList.add('today');
    var note = document.getElementById('today-note');
    if (note) {
      note.textContent = today === 0
        ? 'That last row is today — the shop is closed on Sundays. We are back Monday at 9:00 AM.'
        : 'That highlighted row is today — we are open ' + hoursByDay[today] + '.';
    }
  }
});

// Reveal on scroll: JavaScript first adds .reveal-init (the hidden
// starting state), then fades each section in as it appears.
// If anything here fails, the class is never added and every
// section simply stays visible.
var revealItems = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  revealItems.forEach(function (item) { item.classList.add('reveal-init'); });
  var watcher = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        watcher.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealItems.forEach(function (item) { watcher.observe(item); });
}

// Current year in the footer.
var yearEl = document.getElementById('year');
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}
