$(document).ready(function() {

    // Business Financing
    function disableCompanyBtnFinance() {
        if ($("#productSelectedTagsFinance li").length > 0) {
            $('#productSearchBtnFinance').fadeOut();
        } else {
            $('#productSearchBtnFinance').fadeIn();
        }
    }

    $('#companyMainProductFinance #productInputFinance').on('input', function() {
        var val = this.value.toLowerCase();
        $('#companyProductListFinance').find('li').filter(function() {
            return $(this).data('id').toLowerCase().indexOf(val) > -1;
        }).show().end().filter(':visible').filter(function() {
            return $(this).data('id').toLowerCase().indexOf(val) === -1;
        }).hide();
    });


    $('#companyMainProductFinance #productInputFinance').on('keyup', function() {
        if ($(this).val().length > 2) {
            $('#companyProductListFinance').fadeIn(100);
        } else {
            $('#companyProductListFinance').fadeOut(100);
        }
    });

    $(document).on('click', '.remove-finance', function(e) {
        $(this).closest('li').remove();
        let listName = $(this).closest('li').find('span').html();
        let listTag = `<li data-id="${listName}" class="cursor-pointer block px-[13px] py-[2px] text-md text-teal-600 text-left truncate border-b border-gray-200 hover:bg-gray-100 duration-150">${listName}</li>`;
        $('#companyProductListFinance').append(listTag);

        disableCompanyBtnFinance();
    });


    $(document).on('click', '#companyProductListFinance li', function(e) {
        let productTagName = $(this).html();
        $(this).remove();
        let productTag = `<li class="product-tag">
                        <span class="block mr-3.5 text-base text-neutral-800">${productTagName}</span>
                        <button class="remove-finance remove-item">
                            <img src="../assets/images/close-sm.svg" alt="close"/>
                        </button>
                    </li>`;
        $('#productSelectedTagsFinance').append(productTag);
        $('#productInputFinance').val('');
        $('#companyProductListFinance').fadeOut(100);

        disableCompanyBtnFinance();
    });


});