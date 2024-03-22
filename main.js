let prevScrollpos = window.pageYOffset;

window.onscroll = function() {
  let currentScrollPos = window.pageXOffset;
  if (prevScrollpos > currentScrollPos) {
    document.querySelector(".navbar").style.top = "0";
  } else {
    document.querySelector(".navbar").style.top = "-50px";
  }
  prevScrollpos = currentScrollPos;
}
window.addEventListener('scroll', function() {
  var header = document.querySelector('header');
  if (window.scrollY > 100) { // Adjust 100 to your desired scroll position
      header.classList.add('hidden');
  } else {
      header.classList.remove('hidden');
  }
});
window.addEventListener('scroll', function() {
  var rideSection = document.querySelector('.ride');
  var rideSectionPosition = rideSection.getBoundingClientRect().top;
  var windowHeight = window.innerHeight;

  if (rideSectionPosition < windowHeight / 1.2 && rideSectionPosition > -windowHeight / 2) {
      rideSection.classList.add('show');
  } else {
      rideSection.classList.remove('show');
  }
});
