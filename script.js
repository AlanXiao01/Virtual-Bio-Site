// Handle Login
document.getElementById('login-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const username = document.getElementById('login-username').value;

  if (localStorage.getItem(`${username}-displayName`)) {
    displayProfile(username);
  } else {
    alert('No bio found for this username. Please create one.');
    showPage('onboarding-page');
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
  document.body.style.backgroundColor = localStorage.getItem(`${userId}-bgColor`);
  document.body.style.color = localStorage.getItem(`${userId}-textColor`);

  document.getElementById('profile-pic-display').src = localStorage.getItem(`${userId}-profilePic`);
  document.getElementById('display-name-display').textContent = localStorage.getItem(`${userId}-displayName`);
  document.getElementById('profile-description-display').textContent = localStorage.getItem(`${userId}-description`);

  document.getElementById('instagram-link').href = localStorage.getItem(`${userId}-instagram`);
  document.getElementById('tiktok-link').href = localStorage.getItem(`${userId}-tiktok`);
  document.getElementById('twitter-link').href = localStorage.getItem(`${userId}-twitter`);

  const sharableLink = `${window.location.origin}?user=${userId}`;
  document.getElementById('sharable-link').value = sharableLink;

  showPage('profile-page');
}

document.getElementById('copy-link-btn').addEventListener('click', () => {
  const sharableLink = document.getElementById('sharable-link').value;
  navigator.clipboard.writeText(sharableLink).then(() => {
    alert('Link copied to clipboard!');
  });
});

document.getElementById('edit-bio-btn').addEventListener('click', () => {
  showPage('onboarding-page');
});

function showPage(pageId) {
  document.querySelectorAll('.page').forEach(page => page.classList.add('hidden'));
  document.getElementById(pageId).classList.remove('hidden');
}

window.onload = function () {
  const urlParams = new URLSearchParams(window.location.search);
  const userId = urlParams.get('user');

  if (userId && localStorage.getItem(`${userId}-displayName`)) {
    displayProfile(userId);
  } else {
    showPage('login-page');
  }
};
