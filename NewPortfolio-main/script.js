/* ============================================
   SYED SAQLAIN – PORTFOLIO
   Animations · Interactions · UX
   ============================================ */

$(document).ready(function () {

    // ----- Preloader -----
    $(window).on('load', function () {
        setTimeout(function () {
            $('.preloader').addClass('hidden');
            document.body.classList.add('loaded');
        }, 800);
    });

    // ----- Footer year -----
    $('#year').text(new Date().getFullYear());

    // ----- Typing -----
    if ($('.typing').length) {
        new Typed('.typing', {
            strings: [
                'Frontend Developer',
                'React.js Developer',
                'UI/UX Enthusiast',
                'Web Developer'
            ],
            typeSpeed: 80,
            backSpeed: 50,
            loop: true,
            backDelay: 1200
        });
    }

    if ($('.typing-2').length) {
        new Typed('.typing-2', {
            strings: [
                'Frontend Developer',
                'React.js Developer',
                'Web Developer'
            ],
            typeSpeed: 80,
            backSpeed: 50,
            loop: true,
            backDelay: 1200
        });
    }

    // ----- Header scroll -----
    $(window).on('scroll', function () {
        if ($(this).scrollTop() > 60) {
            $('.header').addClass('scrolled');
        } else {
            $('.header').removeClass('scrolled');
        }

        if ($(this).scrollTop() > 400) {
            $('.scroll-top').addClass('visible');
        } else {
            $('.scroll-top').removeClass('visible');
        }
    });

    // ----- Scroll to top -----
    $('.scroll-top').on('click', function () {
        $('html, body').animate({ scrollTop: 0 }, 600, 'swing');
    });

    function closeNav() {
        $('#nav-menu').removeClass('active');
        $('#nav-toggle').removeClass('active').attr('aria-expanded', 'false');
        $('#nav-overlay').removeClass('active');
        document.body.style.overflow = '';
    }

    function openNav() {
        $('#nav-menu').addClass('active');
        $('#nav-toggle').addClass('active').attr('aria-expanded', 'true');
        $('#nav-overlay').addClass('active');
        document.body.style.overflow = 'hidden';
    }

    // ----- Smooth scroll (nav) -----
    $('.nav-link, a[href^="#"]').on('click', function (e) {
        var href = $(this).attr('href');
        if (href === '#' || !href) return;
        var $target = $(href);
        if ($target.length) {
            e.preventDefault();
            $('html, body').animate({
                scrollTop: $target.offset().top - 80
            }, 700, 'swing');
            closeNav();
        }
    });

    // ----- Mobile menu -----
    $('#nav-toggle').on('click', function () {
        if ($('#nav-menu').hasClass('active')) {
            closeNav();
        } else {
            openNav();
        }
    });

    $('#nav-overlay').on('click', function () {
        closeNav();
    });

    $('.nav-menu .nav-link').on('click', function () {
        closeNav();
    });

    // ----- Reveal on scroll -----
    function initReveal() {
        var reveals = document.querySelectorAll('.reveal');
        if (!reveals.length) return;

        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, {
            root: null,
            rootMargin: '0px 0px -60px 0px',
            threshold: 0.1
        });

        reveals.forEach(function (el) {
            observer.observe(el);
        });
    }
    initReveal();

    // ----- Stats counter -----
    var statsAnimated = false;
    function animateStats() {
        if (statsAnimated) return;
        $('.stat-num').each(function () {
            var $el = $(this);
            var target = parseInt($el.data('target'), 10);
            if (isNaN(target)) return;
            $({ n: 0 }).animate({ n: target }, {
                duration: 1800,
                easing: 'swing',
                step: function () {
                    $el.text(Math.floor(this.n));
                }
            });
        });
        statsAnimated = true;
    }

    $(window).on('scroll', function () {
        var $box = $('.about-stats');
        if (!$box.length) return;
        var top = $box.offset().top;
        var winBottom = $(window).scrollTop() + $(window).height();
        if (winBottom > top + 80) animateStats();
    });

    // ----- Skills bar fill -----
    var skillsAnimated = false;
    function animateSkills() {
        if (skillsAnimated) return;
        $('.skill-item').each(function () {
            var level = $(this).data('level');
            var $fill = $(this).find('.skill-fill');
            var $pct = $(this).find('.skill-pct');
            $fill.css('width', level + '%');
            var n = 0;
            var interval = setInterval(function () {
                n += 2;
                if (n >= level) {
                    n = level;
                    clearInterval(interval);
                }
                $pct.text(n + '%');
            }, 1200 / (level / 2));
            $(this).addClass('animated');
        });
        skillsAnimated = true;
    }

    $(window).on('scroll', function () {
        var $skills = $('.skills-grid');
        if (!$skills.length) return;
        var top = $skills.offset().top;
        var winBottom = $(window).scrollTop() + $(window).height();
        if (winBottom > top + 100) animateSkills();
    });

    // ----- Project filter -----
    $('.filter-btn').on('click', function () {
        var filter = $(this).data('filter');
        $('.filter-btn').removeClass('active');
        $(this).addClass('active');

        $('.project-card').each(function () {
            var cat = $(this).data('category');
            if (filter === 'all' || cat === filter) {
                $(this).removeClass('hide').css({ display: '' });
            } else {
                $(this).addClass('hide').css({ display: 'none' });
            }
        });
    });

    // ----- Contact form -----
    $('#contact-form').on('submit', function (e) {
        e.preventDefault();

        var name = $('#name').val().trim();
        var email = $('#email').val().trim();
        var subject = $('#subject').val().trim();
        var message = $('#message').val().trim();

        $('.contact-form .error').text('');
        var valid = true;

        if (!name) {
            $('#name-error').text('Name is required');
            valid = false;
        }
        if (!email) {
            $('#email-error').text('Email is required');
            valid = false;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            $('#email-error').text('Enter a valid email');
            valid = false;
        }
        if (!subject) {
            $('#subject-error').text('Subject is required');
            valid = false;
        }
        if (!message) {
            $('#message-error').text('Message is required');
            valid = false;
        }

        if (!valid) return;

        var $btn = $(this).find('button[type="submit"]');
        var origText = $btn.html();
        $btn.prop('disabled', true).html('<span>Sending...</span>');

        setTimeout(function () {
            $('#form-message').html('<span style="color: #22d3ee;">Message sent successfully!</span>');
            $('#contact-form')[0].reset();
            $btn.prop('disabled', false).html(origText);
            setTimeout(function () {
                $('#form-message').html('');
            }, 4000);
        }, 1200);
    });

    // ----- Custom cursor (desktop) -----
    if (window.matchMedia('(hover: hover)').matches) {
        var $cursor = $('.cursor');
        var $follower = $('.cursor-follower');

        $(document).on('mousemove', function (e) {
            $cursor.css({ left: e.clientX, top: e.clientY });
            setTimeout(function () {
                $follower.css({ left: e.clientX, top: e.clientY });
            }, 80);
        });

        $('a, button').on('mouseenter', function () {
            $cursor.addClass('hover');
            $follower.addClass('hover');
        }).on('mouseleave', function () {
            $cursor.removeClass('hover');
            $follower.removeClass('hover');
        });

        $(document).on('mouseleave', function () {
            $cursor.css('opacity', '0');
            $follower.css('opacity', '0');
        }).on('mouseenter', function () {
            $cursor.css('opacity', '1');
            $follower.css('opacity', '1');
        });
    }

    // ----- Active nav link on scroll -----
    var sections = $('section[id]');
    $(window).on('scroll', function () {
        var scrollY = $(this).scrollTop();
        var current = '';
        sections.each(function () {
            var top = $(this).offset().top - 120;
            var id = $(this).attr('id');
            if (scrollY >= top) current = id;
        });
        $('.nav-link').removeClass('active');
        $('.nav-link[href="#' + current + '"]').addClass('active');
    });
});
