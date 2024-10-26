document.getElementById('login-form').addEventListener('submit', (e) => {
  e.preventDefault();
  // Assume login is successful and show onboarding form
  document.getElementById('login-page').style.display = 'none';
  document.getElementById('onboarding-page').style.display = 'block';
});

document.getElementById('onboarding-form').addEventListener('submit', (e) => {
  e.preventDefault();

  // Capture profile data
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
    localStorage.setItem('profilePic', e.target.result);
    displayProfile();
  };
  reader.readAsDataURL(profilePic);

  // Store other profile data in local storage
  localStorage.setItem('displayName', displayName);
  localStorage.setItem('userId', userId);
  localStorage.setItem('description', description);
  localStorage.setItem('bgColor', bgColor);
  localStorage.setItem('textColor', textColor);
  localStorage.setItem('instagram', instagram);
  localStorage.setItem('tiktok', tiktok);
  localStorage.setItem('twitter', twitter);

  document.getElementById('onboarding-page').style.display = 'none';
  document.getElementById('profile-page').style.display = 'block';
});

function displayProfile() {
  document.getElementById('profile-pic-display').src = localStorage.getItem('profilePic');
  document.getElementById('display-name-display').textContent = localStorage.getItem('displayName');
  document.getElementById('profile-description-display').textContent = localStorage.getItem('description');

  document.getElementById('profile-page').style.backgroundColor = localStorage.getItem('bgColor');
  document.getElementById('profile-page').style.color = localStorage.getItem('textColor');

  document.getElementById('instagram-link').href = localStorage.getItem('instagram');
  document.getElementById('tiktok-link').href = localStorage.getItem('tiktok');
  document.getElementById('twitter-link').href = localStorage.getItem('twitter');
}
