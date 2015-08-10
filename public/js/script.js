$(function() {

  console.log('start');

  var pathname = window.location.pathname; // Returns path only
  var url      = window.location.href;     // Returns full UR
  console.log('pathname',pathname);
  console.log('url',url);

  if (pathname === '/') {
   $('#searchInput').find('input').keypress(function(e) {
        // Enter pressed?
        if(e.which == 13) {
            this.form.submit();
        }
    });
  }

  // if (pathname === '/movies') {
  if (!isMyStuffScrolling()) {
    $('#footer').addClass('navbar-static-bottom');
    $('#footer').removeClass('navbar-fixed-bottom');
  } else {
    $('#footer').removeClass('navbar-static-bottom');
    $('#footer').addClass('navbar-fixed-bottom');
  }


  // something borrowed
  function isMyStuffScrolling() {
    var docHeight = $(document).height();
    var scroll    = $(window).height() + $(window).scrollTop();
    // console.log('docHeight',docHeight);
    // console.log('scroll',scroll);
    // console.log('win ht',$(window).height());
    // console.log('win scrollTop',$(window).scrollTop());
    return (docHeight == scroll);
  }


});