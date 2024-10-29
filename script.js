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

function saveProfileData(userId, displayName, description, bgColor, textColor, instagram, tiktok, twitter) {
  // Get existing profiles or initialize an empty object
  let profiles = JSON.parse(localStorage.getItem('profiles')) || {};

  // Save the new profile data
  profiles[userId] = {
    displayName: displayName,
    description: description,
    bgColor: bgColor,
    textColor: textColor,
    instagram: instagram,
    tiktok: tiktok,
    twitter: twitter,
    profilePic: localStorage.getItem(`${userId}-profilePic`)  // Save profilePic separately
  };

  // Update the profiles object in localStorage
  localStorage.setItem('profiles', JSON.stringify(profiles));

  // Display the new profile
  displayProfile(userId);
}

function displayProfile(userId) {
  const profiles = JSON.parse(localStorage.getItem('profiles'));

  // If the user profile exists, display it
  if (profiles && profiles[userId]) {
    const profile = profiles[userId];

    document.getElementById('profile-page').style.display = 'block';
    document.getElementById('profile-pic-display').src = profile.profilePic || '#';
    document.getElementById('display-name-display').textContent = profile.displayName;
    document.getElementById('profile-description-display').textContent = profile.description;
    document.body.style.backgroundColor = profile.bgColor;
    document.body.style.color = profile.textColor;

    document.getElementById('instagram-link').href = profile.instagram;
    document.getElementById('tiktok-link').href = profile.tiktok;
    document.getElementById('twitter-link').href = profile.twitter;

    // Generate the sharable link
    const sharableLink = `${window.location.origin}?user=${userId}`;
    document.getElementById('sharable-link').value = sharableLink;
  } else {
    alert('Bio not found for this user.');
  }
}

document.getElementById('login-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const username = document.getElementById('login-username').value;

  // Get the profiles object
  const profiles = JSON.parse(localStorage.getItem('profiles')) || {};

  if (profiles[username]) {
    displayProfile(username);
  } else {
    alert('No bio found for this username. Please create one.');
    document.getElementById('login-page').style.display = 'none';
    document.getElementById('onboarding-page').style.display = 'block';
  }
});

document.getElementById('login-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const username = document.getElementById('login-username').value;

  // Retrieve profiles from localStorage
  const profiles = JSON.parse(localStorage.getItem('profiles')) || {};

  if (profiles[username]) {
    displayProfile(username);
  } else {
    alert('No bio found for this username. Please create one.');
    document.getElementById('login-page').style.display = 'none';
    document.getElementById('onboarding-page').style.display = 'block';
  }
});

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
  let profiles = JSON.parse(localStorage.getItem('profiles')) || {};

  profiles[userId] = {
    displayName: displayName,
    description: description,
    bgColor: bgColor,
    textColor: textColor,
    instagram: instagram,
    tiktok: tiktok,
    twitter: twitter,
    profilePic: localStorage.getItem(`${userId}-profilePic`)
  };

  localStorage.setItem('profiles', JSON.stringify(profiles));
  displayProfile(userId);
}

function displayProfile(userId) {
  const profiles = JSON.parse(localStorage.getItem('profiles'));

  if (profiles && profiles[userId]) {
    const profile = profiles[userId];

    document.getElementById('profile-page').style.display = 'block';
    document.getElementById('profile-pic-display').src = profile.profilePic || '#';
    document.getElementById('display-name-display').textContent = profile.displayName;
    document.getElementById('profile-description-display').textContent = profile.description;
    document.body.style.backgroundColor = profile.bgColor;
    document.body.style.color = profile.textColor;

    document.getElementById('instagram-link').href = profile.instagram;
    document.getElementById('tiktok-link').href = profile.tiktok;
    document.getElementById('twitter-link').href = profile.twitter;

    const sharableLink = `${window.location.origin}?user=${userId}`;
    document.getElementById('sharable-link').value = sharableLink;
  } else {
    alert('Bio not found for this user.');
  }
}

document.getElementById('edit-bio-btn').addEventListener('click', () => {
  document.getElementById('profile-page').style.display = 'none';
  document.getElementById('onboarding-page').style.display = 'block';
});

document.getElementById('copy-link-btn').addEventListener('click', () => {
  const sharableLink = document.getElementById('sharable-link').value;
  navigator.clipboard.writeText(sharableLink).then(() => {
    alert('Link copied to clipboard!');
  }).catch((err) => {
    console.error('Failed to copy: ', err);
  });
});

window.onload = function () {
  const urlParams = new URLSearchParams(window.location.search);
  const userId = urlParams.get('user');

  if (userId) {
    const profiles = JSON.parse(localStorage.getItem('profiles'));
    if (profiles && profiles[userId]) {
      displayProfile(userId);
    } else {
      alert('Bio not found for this user.');
    }
  } else {
    document.getElementById('login-page').style.display = 'block';
  }
};

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyANaN9p_urukmuU27n1-wBMwe7RJTcMo9c",
  authDomain: "virtural-bio.firebaseapp.com",
  projectId: "virtural-bio",
  storageBucket: "virtural-bio.appspot.com",
  messagingSenderId: "128602908703",
  appId: "1:128602908703:web:cfc350cab01ec286614d2a",
  measurementId: "G-TE65MVY631"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

function saveProfileData(userId, displayName, description, bgColor, textColor, instagram, tiktok, twitter) {
  database.ref('profiles/' + userId).set({
    displayName: displayName,
    description: description,
    bgColor: bgColor,
    textColor: textColor,
    instagram: instagram,
    tiktok: tiktok,
    twitter: twitter
  }).then(() => {
    displayProfile(userId);
  }).catch((error) => {
    console.error("Error saving profile data:", error);
  });
}

function displayProfile(userId) {
  database.ref('profiles/' + userId).once('value').then((snapshot) => {
    const profile = snapshot.val();
    if (profile) {
      document.getElementById('profile-page').style.display = 'block';
      document.getElementById('display-name-display').textContent = profile.displayName;
      document.getElementById('profile-description-display').textContent = profile.description;
      document.body.style.backgroundColor = profile.bgColor;
      document.body.style.color = profile.textColor;
      document.getElementById('instagram-link').href = profile.instagram;
      document.getElementById('tiktok-link').href = profile.tiktok;
      document.getElementById('twitter-link').href = profile.twitter;
    } else {
      alert('Bio not found for this user.');
    }
  }).catch((error) => {
    console.error("Error retrieving profile data:", error);
  });
}

window.onload = function () {
  const urlParams = new URLSearchParams(window.location.search);
  const userId = urlParams.get('user');

  if (userId) {
    displayProfile(userId); // If bio exists, display it
  } else {
    document.getElementById('login-page').style.display = 'block';
  }
};


