var hidden_authors = [];
$(document).ready(function (){
    var page_container = $('#Frame');
    hidden_authors = localStorage.getItem('hidden_authors');
    if (hidden_authors) {
        hidden_authors = JSON.parse(hidden_authors);
    } else {
        hidden_authors = ['yoursunny', 'tototo', 'DeadlyChemist', 'levi', 'jmgcaguicla'];
    }
    if (hidden_authors.includes('risharde')) {
        hidden_authors.splice(hidden_authors.indexOf('risharde'), 1);
    }
    localStorage.setItem('hidden_authors', JSON.stringify(hidden_authors));
    // Go through each post
    hidden_authors.forEach(function(author) {
        $(document).find('.Author a[title="' + author + '"]').closest('.ItemComment').fadeOut(200);
    });
    setup_top_menu();
    function setup_top_menu() {
        var menu_html = '<div id="top_menu_extension" style="padding:10px; background-color:#005133b8; border-bottom:1px solid #ccc;">';
        menu_html += '<button class="notsunny-button" id="notsunny-list-morons">🤡 List all morons</button>';
        menu_html += '<button class="notsunny-button" id="notsunny-block-moron">🤡 Block moron</button>';
        menu_html += '<button class="notsunny-button" id="notsunny-unblock-moron">😊 Unblock moron</button>';
        menu_html += '<span class="blocked_morons_count" style="color:#fff; margin-left:20px;">Blocked morons: ' + hidden_authors.length + '</span>';
        menu_html += '</div>';
        $(page_container).prepend(menu_html);
    }

    var style = '';
    style += '<style>';
    style += '.notsunny-button {';
    style += '  background-color: #60a94e;';
    style += '  border: 1px solid #205d46;';
    style += '  padding: 5px;';
    style += '  border-radius: 5px;';
    style += '  color: #FFFFFF;';
    style += '  margin-right: 3px;';
    style += '  cursor: pointer;';
    style += '}';
    style += '</style>';
    $('body').append(style);

    $(document).on('click', '#notsunny-list-morons', function() {
        var content_html = '<h3>Blocked Morons:</h3><ul>';
        hidden_authors.forEach(function(author) {
            content_html += '<li>' + author + '</li>';
        });
        content_html += '</ul>';
        notsunny_center_modal(content_html);
    });

    $(document).on('click', '#notsunny-block-moron', function() {
        var content_html = '<label for="notsunny-author-input">Enter the username of the moron to block:</label><br>';
        content_html += '<input type="text" id="notsunny-author-input" name="notsunny-author-input"><br>';
        content_html += '<button id="notsunny-confirm-block">Block</button>';
        notsunny_center_modal(content_html);
    });

    $(document).on('click', '#notsunny-unblock-moron', function() {
        var content_html = '<label for="notsunny-author-unblock-input">Enter the username of the moron to unblock:</label><br>';
        content_html += '<input type="text" id="notsunny-author-unblock-input" name="notsunny-author-unblock-input"><br>';
        content_html += '<button id="notsunny-confirm-unblock">Unblock</button>';
        notsunny_center_modal(content_html);
    });

    $(document).on('click', '#notsunny-confirm-block', function() {
        var author_to_block = $('#notsunny-author-input').val().trim();
        if (hidden_authors.includes('risharde')) { return; }
        if (hidden_authors.includes(author_to_block)) { alert('This moron is already blocked!'); return; }
        if (author_to_block && !hidden_authors.includes(author_to_block)) {
            hidden_authors.push(author_to_block);
            localStorage.setItem('hidden_authors', JSON.stringify(hidden_authors));
            $(document).find('.Author a[title="' + author_to_block + '"]').closest('.ItemComment').fadeOut(200);
            $('#top_menu_extension .blocked_morons_count').text('Blocked morons: ' + hidden_authors.length);
        }
        $('#notsunny-modal-overlay').remove();
        console.log('hidden_authors:', hidden_authors);
    });
    $(document).on('click', '#notsunny-confirm-unblock', function() {
        var author_to_unblock = $('#notsunny-author-unblock-input').val().trim();
        console.log('Unblocking author: ' + author_to_unblock);
        if (author_to_unblock && hidden_authors.includes(author_to_unblock)) {
            hidden_authors.splice(hidden_authors.indexOf(author_to_unblock), 1);
            localStorage.setItem('hidden_authors', JSON.stringify(hidden_authors));
            $(document).find('.Author a[title="' + author_to_unblock + '"]').closest('.ItemComment').fadeIn(200);
            $('#top_menu_extension .blocked_morons_count').text('Blocked morons: ' + hidden_authors.length);
        }
        $('#notsunny-modal-overlay').remove();
        console.log('hidden_authors:', hidden_authors);
    });

    $(document).on('click', '#notsunny-modal-close', function() {
        $('#notsunny-modal-overlay').remove();
    });

    function notsunny_center_modal(content_html) {
        var modal_html = '<div id="notsunny-modal-overlay" style="position:fixed; top:0; left:0; width:100%; height:100%; background-color:rgba(0,0,0,0.5); display:flex; align-items:center; justify-content:center; z-index:1000;">';
        modal_html += '<div id="notsunny-modal-content" style="background-color:#fff; padding:20px; border-radius:5px; max-width:400px; width:100%;">';
        modal_html += content_html;
        modal_html += '<br><button id="notsunny-modal-close">Close</button>';
        modal_html += '</div></div>';
        $('body').append(modal_html);
    }
});
