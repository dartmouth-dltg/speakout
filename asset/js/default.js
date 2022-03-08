(function($) {
    function fixIframeAspect() {
        $('iframe').each(function () {
            var aspect = $(this).attr('height') / $(this).attr('width');
            $(this).height($(this).width() * aspect);
        });
    }

    function framerateCallback(callback) {
        var waiting = false;
        callback = callback.bind(this);
        return function () {
            if (!waiting) {
                waiting = true;
                window.requestAnimationFrame(function () {
                    callback();
                    waiting = false;
                });
            }
        }
    }

    function toggleNavCtl() {
      $('#search').removeClass('open').addClass('closed');
      $('.menu').toggleClass('open').toggleClass('closed');
      $('#searchctl').removeClass('clicked');
      $('#navctl').toggleClass('clicked');
      $('#navctl i').toggleClass('fa-bars').toggleClass('fa-times');
      $('#searchctl i').addClass('fa-search').removeClass('fa-times');
    }

    function setInterviewPaneHeight() {
      $('.interview').css('max-height',$('#itemproperties').outerHeight()-$('#transcriptinfo').parent().outerHeight() + 50);
    }

    $(document).ready(function() {
        $('.menu, #search, .menu ul').addClass('closed');

        $('#navctl').click(function() {
            toggleNavCtl();
        });
        $('#searchctl').click(function() {
            $('.menu').removeClass('open').addClass('closed');
            $('#search').toggleClass('open').toggleClass('closed');
            $('#navctl').removeClass('clicked');
            $('#searchctl').toggleClass('clicked');
            $('#searchctl i').toggleClass('fa-search').toggleClass('fa-times');
            $('#navctl i').addClass('fa-bars').removeClass('fa-times');
        });
        $('.menu ul').click(function() {
            if($(this).hasClass('closed')){
                $('.menu ul').removeClass('open').addClass('closed');
                $(this).addClass('open').removeClass('closed');
            }else{
                $('.menu ul').removeClass('open').addClass('closed');
            }
        });

        $(window).on('resize', function() {
          setInterviewPaneHeight();
          if ($(window).width() > 1023) {
            if ($('#navctl').hasClass('clicked')) {
              toggleNavCtl();
            }
          }
        });

        $(window).on('load', function() {
          setInterviewPaneHeight();
        })

        // Maintain iframe aspect ratios
        $(window).on('load resize', framerateCallback(fixIframeAspect));
        fixIframeAspect();
        if('objectFit' in document.documentElement.style === false) {
            $('.squarecontainer').each(function () {
                var container = $(this),
                    imgUrl = container.find('img').prop('src');
                    console.log(imgUrl);
                if (imgUrl) {
                  container
                    .css({'background-image':'url(' + imgUrl + ')','background-size':'cover'})
                    .addClass('compat-object-fit');
                }
              });
        }
    });
})(jQuery);
