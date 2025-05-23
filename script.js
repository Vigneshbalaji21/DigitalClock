function updateClock() {
  const now = new Date();
  
  // Analog Clock
  const seconds = now.getSeconds();
  const minutes = now.getMinutes();
  let hours = now.getHours(); // Use 'let' because we might modify it for 12-hour format

  // Adjust hours for 12-hour analog clock
  if (hours >= 12) {
    hours -= 12; // Convert 24-hour to 12-hour format for analog display
  }
  if (hours === 0) { // Handle 12 AM (0 hours)
    hours = 12;
  }
  
  // Calculate degrees. No +90 here because CSS handles the initial -90deg offset.
  // Full circle is 360 degrees.
  // Second hand: (seconds / 60) * 360 degrees
  // Minute hand: (minutes / 60) * 360 degrees, plus a small amount for second hand movement
  // Hour hand: (hours / 12) * 360 degrees, plus a small amount for minute hand movement
  
  const secondDegrees = (seconds / 60) * 360;
  const minuteDegrees = (minutes / 60) * 360 + (seconds / 60) * 6; // Each second moves minute hand by 6 degrees / 60 seconds = 0.1 deg/sec
  const hourDegrees = (hours / 12) * 360 + (minutes / 60) * 30; // Each minute moves hour hand by 30 degrees / 60 minutes = 0.5 deg/min
  
  // Set the transform property for each hand
  document.querySelector('.second-hand').style.transform = `rotate(${secondDegrees}deg)`;
  document.querySelector('.minute-hand').style.transform = `rotate(${minuteDegrees}deg)`;
  document.querySelector('.hour-hand').style.transform = `rotate(${hourDegrees}deg)`;
  
  // Digital Clock
  const hoursStr = String(now.getHours()).padStart(2, '0');
  const minutesStr = String(now.getMinutes()).padStart(2, '0');
  const secondsStr = String(now.getSeconds()).padStart(2, '0');
  const timeString = `${hoursStr}:${minutesStr}:${secondsStr}`;
  
  const options = { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  };
  const dateString = now.toLocaleDateString('en-US', options);
  
  // Apply animations for digital clock for smoother updates
  const timeElement = document.getElementById('time');
  const dateElement = document.getElementById('date');
  
  // Only update if content changes to prevent unnecessary animations
  if (timeElement.textContent !== timeString) {
    timeElement.style.animation = 'none'; // Reset animation
    void timeElement.offsetWidth; // Trigger reflow
    timeElement.textContent = timeString;
    timeElement.style.animation = 'fadeIn 0.5s ease-out'; // Apply animation
  }

  if (dateElement.textContent !== dateString) {
    dateElement.style.animation = 'none'; // Reset animation
    void dateElement.offsetWidth; // Trigger reflow
    dateElement.textContent = dateString;
    dateElement.style.animation = 'fadeIn 0.5s ease-out'; // Apply animation
  }
}

// Initialize clock and update every second
updateClock();
setInterval(updateClock, 1000);

// Add pulsing animation to header icon
const clockIcon = document.querySelector('.clock-header i');
setInterval(() => {
  clockIcon.style.transform = 'scale(1.1)';
  setTimeout(() => {
    clockIcon.style.transform = 'scale(1)';
  }, 500);
}, 2000);

// Make header slightly interactive
const header = document.querySelector('.clock-header');
header.addEventListener('mouseenter', () => {
  header.style.transform = 'translateY(-3px)';
  header.style.transition = 'all 0.3s ease';
});

header.addEventListener('mouseleave', () => {
  header.style.transform = 'translateY(0)';
});