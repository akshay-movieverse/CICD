//Ajax cart add
function addToCart(company_id, comname, th) {
    var item_id = $(th).attr('data-cart-id');

    // Retrieve CSRF token from cookies
    var csrftoken = getCookie('csrftoken');

    $.ajax({
        headers: {
            'X-CSRFToken': csrftoken  // Include CSRF token in headers
        },
        url:  "/add-to-cart/",
        type: 'POST',
        data: {
            'company_id': company_id,
            'comname': comname,
            'item_id': item_id
        },
        success: function(response) {

            if (response.success) {

                $("#total_cart_items").text(response.item_count);
                if (response.action == 'add_to_cart') {
                    $(th).text('Added');
                    $(th).attr('data-cart-id', response.item_id);
                } else {
                    $(th).text('Add to Cart');
                    $(th).attr('data-cart-id', response.item_id);
                }
            }
            if (response.message) {
                alert(response.message);
            }
        },
        error: function(jqXHR) {
            if (jqXHR.status !== 422) {
                console.log(jqXHR);
            }

            if (jqXHR.status === 401) {

                alert(jqXHR.responseJSON.message);
            }
        },
        // complete: function() {
        //     // Reload the page after the AJAX request completes
        //     location.reload();
        // }
    });
}


// Function to get the CSRF token from cookies
function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}