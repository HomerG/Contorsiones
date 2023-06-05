var TxtType = function(el, toRotate, period) {
  this.toRotate = toRotate;
  this.el = el;
  this.loopNum = 0;
  this.period = parseInt(period, 10) || 2000;
  this.txt = '';
  this.tick();
  this.isDeleting = false;
};

TxtType.prototype.tick = function() {
  var i = this.loopNum % this.toRotate.length;
  var fullTxt = this.toRotate[i];

  if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

  var that = this;
  var delta = 200 - Math.random() * 100;

  if (this.isDeleting) { delta /= 2; }

  if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === '') {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
  }

  setTimeout(function() {
    that.tick();
  }, delta);
};

window.onload = function() {
  var elements = document.getElementsByClassName('typewrite');
  for (var i=0; i<elements.length; i++) {
    var toRotate = elements[i].getAttribute('data-type');
    var period = elements[i].getAttribute('data-period');
    if (toRotate) {
      new TxtType(elements[i], JSON.parse(toRotate), period);
    }
  }
  // INJECT CSS
  var css = document.createElement("style");
  css.type = "text/css";
  css.innerHTML = ".typewrite > .wrap { border-right: 0.1em solid #000}";
  document.body.appendChild(css);


  var elements = document.getElementsByClassName('typewrite2');
  for (var i=0; i<elements.length; i++) {
    var toRotate = elements[i].getAttribute('data-type');
    var period = elements[i].getAttribute('data-period');
    if (toRotate) {
      new TxtType(elements[i], JSON.parse(toRotate), period);
    }
  }
  // INJECT CSS
  var css = document.createElement("style");
  css.type = "text/css";
  // css.innerHTML = ".typewrite2 > .wrap { border-right: 0.08em solid #000}";
  document.body.appendChild(css);
};

$(document).ready(function(){


  /* Toggle Video Modal
-----------------------------------------*/
  function toggle_video_modal() {

    // Click on video thumbnail or link
    $(".js-trigger-video-modal").on("click", function(e){

      // prevent default behavior for a-tags, button tags, etc.
      e.preventDefault();

      // Grab the video ID from the element clicked
      var id = $(this).attr('data-youtube-id');

      // Autoplay when the modal appears
      // Note: this is intetnionally disabled on most mobile devices
      // If critical on mobile, then some alternate method is needed
      var autoplay = '?autoplay=1';

      // Don't show the 'Related Videos' view when the video ends
      var related_no = '&rel=0';

      // String the ID and param variables together
      var src = '//www.youtube.com/embed/'+id+autoplay+related_no;

      // Pass the YouTube video ID into the iframe template...
      // Set the source on the iframe to match the video ID
      $("#youtube").attr('src', src);

      // Add class to the body to visually reveal the modal
      $("body").addClass("show-video-modal noscroll");

    });

    // Close and Reset the Video Modal
    function close_video_modal() {

      event.preventDefault();

      // re-hide the video modal
      $("body").removeClass("show-video-modal noscroll");

      // reset the source attribute for the iframe template, kills the video
      $("#youtube").attr('src', '');

    }
    // if the 'close' button/element, or the overlay are clicked
    $('body').on('click', '.close-video-modal, .video-modal .overlay', function(event) {

      // call the close and reset function
      close_video_modal();

    });
    // if the ESC key is tapped
    $('body').keyup(function(e) {
      // ESC key maps to keycode `27`
      if (e.keyCode == 27) {

        // call the close and reset function
        close_video_modal();

      }
    });
  }
  toggle_video_modal();



});