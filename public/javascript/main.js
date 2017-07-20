$(document).ready(function() {
  $('#image-slider').lightSlider({
    gallery: false,
    auto: true,
    item: 1,
    loop: true,
    slideMargin: 0,
    controls: false,
    enableDrag: false,
    currentPagerPosition: 'left',
    pauseOnHover: true,
    pause: 6000,
  });

  $('.language-selector select').on('change', function(event) {
    const $select = $(this);
    const $option = $select.find("option:selected", this);
    const url = $option.attr('href');
    window.location.href = url;
  });

  //profiles
  var PROFILE_COOKIE = 'prismic.profile';
  function setProfile(profile) {
    window.Cookies.setItem(PROFILE_COOKIE, profile);
  }
  if(!Cookies.hasItem(PROFILE_COOKIE)) setProfile(window.PrismicProfiles.default);

$('.profile-selector select').on('change', function(event) {
    console.log(this)
    const $select = $(this);
    const $option = $select.find("option:selected", this);
    const profile = $option.attr('value');
    setProfile(profile);
    window.location.reload();
  });
});