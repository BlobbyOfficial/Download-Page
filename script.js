// script.js

// Wait for the page to load completely
document.addEventListener('DOMContentLoaded', function() {
  // Video ad modal controls
  const videoAdModal = document.getElementById('videoAdModal');
  const skipButton = document.getElementById('skipButton');
  const downloadButton = document.getElementById('download-btn');
  const recaptchaForm = document.getElementById('recaptcha-form');
  let videoAdTimeout;

  // Show video ad on page load
  function showVideoAd() {
    videoAdModal.style.display = 'flex';
    let skipCounter = 5; // 5 seconds to skip the ad

    // Update skip counter every second
    videoAdTimeout = setInterval(function() {
      if (skipCounter <= 0) {
        clearInterval(videoAdTimeout);
        videoAdModal.style.display = 'none'; // Hide the ad after 5 seconds
      } else {
        skipButton.textContent = `Skip Ad (${skipCounter})`;
        skipCounter--;
      }
    }, 1000);
  }

  // Skip ad button functionality
  skipButton.addEventListener('click', function() {
    clearInterval(videoAdTimeout); // Stop the counter
    videoAdModal.style.display = 'none'; // Hide the ad
    showDownloadButton(); // Show the download button after the ad is skipped
  });

  // Show the download button after reCAPTCHA is successful
  function showDownloadButton() {
    downloadButton.style.display = 'inline-block'; // Display the download button
  }

  // Handle reCAPTCHA verification
  recaptchaForm.addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent form submission (default action)
    
    const recaptchaResponse = grecaptcha.getResponse(); // Get the response from reCAPTCHA
    if (recaptchaResponse.length === 0) {
      alert('Please complete the reCAPTCHA to proceed.');
      return; // Don't proceed if reCAPTCHA is not completed
    }

    // If reCAPTCHA is valid, show the download button
    showDownloadButton();
  });

  // Show video ad immediately on page load
  showVideoAd();
});
