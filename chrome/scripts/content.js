window.addEventListener('load', function() {
    // Go through each post
    let elements = document.querySelectorAll('.Author a[title="yoursunny"],.Author a[title="tototo"]');
    for (let i = 0; i < elements.length; i++) {
        let item = elements[i].parentNode.parentNode.parentNode.parentNode.parentNode;
        item.style.display = 'none';
    }
});