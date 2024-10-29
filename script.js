document.getElementById('login-form').addEventListener('submit', (e) => {
e.preventDefault();
const username = document.getElementById('login-username').value;

  
if (localStorage.getItem(`${username}-displayName`)) {
displayProfile(username);
} else {
alert('No bio found for this username. Please create one.');
    showPage('onboarding-page');
    document.getElementById('login-page').style.display = 'none';
    document.getElementById('onboarding-page').style.display = 'block';
}
});

@@ -46,46 +47,51 @@ function saveProfileData(userId, displayName, description, bgColor, textColor, i
}

function displayProfile(userId) {
  document.body.style.backgroundColor = localStorage.getItem(`${userId}-bgColor`);
  document.body.style.color = localStorage.getItem(`${userId}-textColor`);

  document.getElementById('profile-page').style.display = 'block';
document.getElementById('profile-pic-display').src = localStorage.getItem(`${userId}-profilePic`);
document.getElementById('display-name-display').textContent = localStorage.getItem(`${userId}-displayName`);
document.getElementById('profile-description-display').textContent = localStorage.getItem(`${userId}-description`);

  document.body.style.backgroundColor = localStorage.getItem(`${userId}-bgColor`);
  document.body.style.color = localStorage.getItem(`${userId}-textColor`);
  
document.getElementById('instagram-link').href = localStorage.getItem(`${userId}-instagram`);
document.getElementById('tiktok-link').href = localStorage.getItem(`${userId}-tiktok`);
document.getElementById('twitter-link').href = localStorage.getItem(`${userId}-twitter`);

  // Generate the sharable link using query parameters
const sharableLink = `${window.location.origin}?user=${userId}`;
document.getElementById('sharable-link').value = sharableLink;

  showPage('profile-page');
}

// Edit Bio Button Logic
document.getElementById('edit-bio-btn').addEventListener('click', () => {
  document.getElementById('profile-page').style.display = 'none';
  document.getElementById('onboarding-page').style.display = 'block';
});

// Copy Link Button Functionality
document.getElementById('copy-link-btn').addEventListener('click', () => {
const sharableLink = document.getElementById('sharable-link').value;
navigator.clipboard.writeText(sharableLink).then(() => {
alert('Link copied to clipboard!');
  }).catch((err) => {
    console.error('Failed to copy: ', err);
});
});

document.getElementById('edit-bio-btn').addEventListener('click', () => {
  showPage('onboarding-page');
});

function showPage(pageId) {
  document.querySelectorAll('.page').forEach(page => page.classList.add('hidden'));
  document.getElementById(pageId).classList.remove('hidden');
}

// On page load, check if a user parameter is in the URL
window.onload = function () {
const urlParams = new URLSearchParams(window.location.search);
const userId = urlParams.get('user');

  if (userId && localStorage.getItem(`${userId}-displayName`)) {
    displayProfile(userId);
  if (userId) {
    if (localStorage.getItem(`${userId}-displayName`)) {
      displayProfile(userId); // If bio exists, display it
    } else {
      alert('Bio not found for this user.');
    }
} else {
    showPage('login-page');
    // If no user ID in URL, show the login page
    document.getElementById('login-page').style.display = 'block';
}
};
