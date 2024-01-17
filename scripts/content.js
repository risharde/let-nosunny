$(document).ready(function (){
    // Go through each post
    var posts = $('.Item');
    $(posts).each(function () {
        $(this).find('.Author a[title="yoursunny"]').parent().parent().parent().parent().parent().fadeOut(200);
    });
});