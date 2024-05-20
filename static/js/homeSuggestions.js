$(document).ready(function() {
    $('#search-input').autocomplete({
        source: function(request, response) {
            $.ajax({
                url: '/search-suggestions/',
                method: 'GET',
                data: { term: request.term },
                dataType: 'json',
                success: function(data) {
                    // Empty the existing <ul>
                    $('#result').empty();
                    // Append new <li> elements
                    $.each(data, function(index, item) {
                        $('#result').append('<li><a href="' + item.url + '" onclick="showLoader()" class="duration-200 leading-xl py-1.5 text-teal-600 block truncate px-3 hover:bg-amber-200">' + item.label + '</a></li>');
                    });
                }
            });
        },
        minLength: 3, // Minimum characters before triggering autocomplete
        select: function(event, ui) {
            // Handle selection (e.g., redirect to selected item's URL)
            window.location.href = ui.item.url;
        },
        open: function(event, ui) {
            // Show the dropdown menu if there are suggestions
            $('#result').css('display', 'block');
        }
    });
});