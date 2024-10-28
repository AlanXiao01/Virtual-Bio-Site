// Handle Login
document.getElementById('login-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const username = document.getElementById('login-username').value;
  
  if (localStorage.getItem(`${username}-displayName`)) {
    displayProfile(username);
  } else {
    alert('No bio found for this username. Please create one.');
    document.getElementById('login-page').style.display = 'none';
    document.getElementById('onboarding-page').style.display = 'block';
  }
});

// Handle Onboarding Form Submission
document.getElementById('onboarding-form').addEventListener('submit', (e) => {
  e.preventDefault();

  const userId = document.getElementById('user-id').value;
  const displayName = document.getElementById('display-name').value;
  const description = document.getElementById('profile-description').value;
  const bgColor = document.getElementById('bg-color').value;
  const textColor = document.getElementById('text-color').value;
  const instagram = document.getElementById('instagram').value;
  const tiktok = document.getElementById('tiktok').value;
  const twitter = document.getElementById('twitter').value;

  const profilePic = document.getElementById('profile-pic').files[0];
  const reader = new FileReader();
  reader.onload = function (e) {
    localStorage.setItem(`${userId}-profilePic`, e.target.result);
    saveProfileData(userId, displayName, description, bgColor, textColor, instagram, tiktok, twitter);
  };
  reader.readAsDataURL(profilePic);
});

function saveProfileData(userId, displayName, description, bgColor, textColor, instagram, tiktok, twitter) {
  localStorage.setItem(`${userId}-displayName`, displayName);
  localStorage.setItem(`${userId}-description`, description);
  localStorage.setItem(`${userId}-bgColor`, bgColor);
  localStorage.setItem(`${userId}-textColor`, textColor);
  localStorage.setItem(`${userId}-instagram`, instagram);
  localStorage.setItem(`${userId}-tiktok`, tiktok);
  localStorage.setItem(`${userId}-twitter`, twitter);

  displayProfile(userId);
}

function displayProfile(userId) {
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

// On page load, check if a user parameter is in the URL
window.onload = function () {
  const urlParams = new URLSearchParams(window.location.search);
  const userId = urlParams.get('user');

  if (userId) {
    if (localStorage.getItem(`${userId}-displayName`)) {
      displayProfile(userId); // If bio exists, display it
    } else {
      alert('Bio not found for this user.');
    }
  } else {
    // If no user ID in URL, show the login page
    document.getElementById('login-page').style.display = 'block';
  }
};

// Handle Login
document.getElementById('login-form').addEventListener('submit', (e) => {
  e.preventDefault(); // Prevent form refresh on submit
  const username = document.getElementById('login-username').value;

  // Check if the user has an existing bio stored in localStorage
  if (localStorage.getItem(`${username}-displayName`)) {
    displayProfile(username); // Redirect to profile page if bio exists
  } else {
    alert('No bio found for this username. Please create one.');
    window.location.href = 'onboarding.html'; // Redirect to onboarding if no bio found
  }
});

// Function to redirect to the profile page
function displayProfile(userId) {
  window.location.href = `profile.html?user=${userId}`; // Pass username as query param
}

