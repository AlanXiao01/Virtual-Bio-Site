// Check for dynamic username in the URL
window.addEventListener('load', () => {
  const path = window.location.pathname;
  if (path.startsWith('/@')) {
    const userId = path.split('@')[1];
    if (localStorage.getItem(`${userId}-displayName`)) {
      displayProfile(userId);
    } else {
      alert('This profile does not exist.');
      window.location.href = '/'; // Redirect to homepage
    }
  }
});

// Handle Login
document.getElementById('login-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const username = document.getElementById('login-username').value;

  if (localStorage.getItem(`${username}-displayName`)) {
    window.location.href = `/@${username}`; // Redirect to their profile
  } else {
    alert('No bio found for this username. Please create one.');
    document.getElementById('login-page').style.display = 'none';
    document.getElementById('onboarding-page').style.display = 'block';
  }
});

// The rest of the display and form handling code stays the same...
