// Handle Login
document.getElementById('login-form').addEventListener('submit', (e) => {
  e.preventDefault();
  document.getElementById('login-page').style.display = 'none';
  document.getElementById('onboarding-page').style.display = 'block';
});

// Handle Onboarding Form Submission
document.getElementById('onboarding-form').addEventListener('submit', (e) => {
  e.preventDefault();

  const displayName = document.getElementById('display-name').value;
  const userId = document.getElementById('user-id').value;
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
    displayProfile(userId);
  };
  reader.readAsDataURL(profilePic);

  localStorage.setItem(`${userId}-displayName`, displayName);
  localStorage.setItem(`${userId}-description`, description);
  localStorage.setItem(`${userId}-bgColor`, bgColor);
  localStorage.setItem(`${userId}-textColor`, textColor);
  localStorage.setItem(`${userId}-instagram`, instagram);
  localStorage.setItem(`${userId}-tiktok`, tiktok);
  localStorage.setItem(`${userId}-twitter`, twitter);

  document.getElementById('onboarding-page').style.display = 'none';
  document.getElementById('profile-page').style.display = 'block';

  const sharableLink = `${window.location.origin}/@${userId}`;
  document.getElementById('sharable-link').value = sharableLink;
});

// Display Profile Data
function displayProfile(userId) {
  document.getElementById('profile-pic-display').src = localStorage.getItem(`${userId}-profilePic`);
  document.getElementById('display-name-display').textContent = localStorage.getItem(`${userId}-displayName`);
  document.getElementById('profile-description-display').textContent = localStorage.getItem(`${userId}-description`);

  document.getElementById('profile-page').style.backgroundColor = localStorage.getItem(`${userId}-bgColor`);
  document.getElementById('profile-page').style.color = localStorage.getItem(`${userId}-textColor`);

  document.getElementById('instagram-link').href = localStorage.getItem(`${userId}-instagram`);
  document.getElementById('tiktok-link').href = localStorage.getItem(`${userId}-tiktok`);
  document.getElementById('twitter-link').href = localStorage.getItem(`${userId}-twitter`);
}

// Handle Profile Routing
const path = window.location.pathname;
if (path.startsWith('/@')) {
  const userId = path.split('@')[1];
  displayProfile(userId);
}

// Copy Link Button Logic
document.getElementById('copy-link-btn').addEventListener('click', () => {
  const linkInput = document.getElementById('sharable-link');
  linkInput.select();
  document.execCommand('copy');
  alert('Link copied to clipboard!');
});
