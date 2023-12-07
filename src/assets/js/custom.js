// to get current year
function getYear() {
    var currentDate = new Date();
    var currentYear = currentDate.getFullYear();
    document.querySelector("#displayYear").innerHTML = currentYear;
}

getYear();

// owl carousel 

// $('.carousel-inner').owlCarousel({
//     loop: true,
//     margin: 10,
//     nav: true,
//     autoplay: true,
//     slideBy: 1,
//     autoplayHoverPause: true,
//     responsive: {
//         0: {
//             items: 1
//         },
//         600: {
//             items: 3
//         },
//         1000: {
//             items: 6
//         }
//     }
// })
$('.carousel-inner').owlCarousel({
    loop: true,
    margin: 10,
    nav: true,
    animateOut: 'slideOutDown',
    animateIn: 'flipInX',
    items:2,
    margin:30,
    stagePadding:30,
    autoplayHoverPause: true,
    smartSpeed:450,
    autoplay: true,
    slideBy: 2,
});