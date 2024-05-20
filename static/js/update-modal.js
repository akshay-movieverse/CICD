$(document).ready(function() {

    if ($("#updateNumber").length > 0) {
        $("#updateNumber").intlTelInput({
            initialCountry: "in",
        });
        $(".iti__country").click(function() {
            const codeName = $(this).find('.iti__dial-code').text();
            $("#updateCodeName").text(codeName);
        });
    }


    // updateForm 
    if ($("#updateForm").length > 0) {

        var mobileID = $("#updateForm #updateNumber");

        $(mobileID).blur(function() {
            var mobileLength = $(mobileID).val().length;
            if (mobileLength > 0) {
                $(this).addClass('blurred');
                if ($(mobileID).is(':invalid')) {
                    $("#updateErr").removeClass("opacity-0 invisible hidden").addClass("opacity-100 visible block");
                }
            }
        });

        $(mobileID).keyup(function() {
            $(this).removeClass('blurred');
            $("#updateErr").removeClass("opacity-100 visible").addClass("opacity-0 invisible hidden");
        });

        $(mobileID).focus(function() {
            $(this).removeClass('blurred');
            $("#updateErr").removeClass("opacity-100 visible").addClass("opacity-0 invisible hidden");
        });


        $("#updateBtn").click(function(e) {
            e.preventDefault();
            var number = $("#updateNumber").val();
            var productNameLength = $('#productSelectedTagsUpdate li').length;
            if (productNameLength < 2 || number == '') {

                console.log(productNameLength, number)
                console.log("error");

                if ($("#updateForm #updateNumber").is(':invalid')) {
                    $("#updateErr").removeClass("opacity-0 invisible hidden").addClass("opacity-100 visible block");
                }

                if (productNameLength < 1) {
                    $("#productNameErrUpdate").show();
                }
                if (productNameLength == 1) {
                    $("#productNameErr2Update").show();
                }

            } else {
                console.log("success");
                $("#updateloadingForm").show();
                setTimeout(() => {
                    $("#updateForm").hide();
                    $("#successUpdateForm").show();
                }, 3000);
            }
        });
    }


    // Add products to input max 2
    if ($("#productNameBlockUpdate").length > 0) {
        $('#productMainUpdate #productInputUpdate').focus(function() {
            $("#productNameErrUpdate").hide();
            $("#productNameErr2Update").hide();
        });
        $('#productMainUpdate #productInputUpdate').click(function(e) {
            e.stopPropagation();
        });
        $('#moreResultsUpdate').click(function(e) {
            e.stopPropagation();
        });


        $('#productMainUpdate #productInputUpdate').on('keyup', function() {
            let listCount = $('#productSelectedTagsUpdate li').length;
            if (listCount == 0) {
                if ($("#productInputUpdate").val().length > 0) {
                    $("#productSearchIconUpdate").hide();
                } else {
                    $("#productSearchIconUpdate").show();
                }
            }


            $("#productNameErrUpdate").hide();
            $("#productNameErr2Update").hide();
            if ($(this).val().length == 1 || $(this).val().length == 2) {
                $("#productNameMinErrUpdate").fadeIn();
                $("#moreProductSuggestionsBlockUpdate").fadeIn();
            } else if ($(this).val().length > 2) {
                $("#productNameMinErrUpdate").hide();
                $("#loadingProduct").show();
                $("#moreProductSuggestionsBlockUpdate").fadeIn();
                setTimeout(function() {
                    $("#loadingProduct").hide();
                }, 1000);
            } else {
                $('#productNameMinErrUpdate').hide();
                $('#moreProductSuggestionsBlockUpdate').fadeOut();
            }
        });

        $(document).on('click', function(e) {
            $("#moreProductSuggestionsBlockUpdate").hide();
        });

        $(document).on('click', '.remove-suggestions', function(e) {
            $(this).closest('li').remove();
            let listName = $(this).closest('li').find('span').html();
            let listTag = `<li class="border-b border-r border-neutral-400 px-2 py-1.5 cursor-pointer duration-200 hover:bg-blue-50">
              <span>${listName}</span>
          </li>`;
            $('#moreProductSuggestionUpdate ul').append(listTag);
            checkListLength();
        });

        $(document).on('click', '#moreProductSuggestionUpdate li', function(e) {
            let productName = $(this).find('span').html();
            $(this).closest('li').remove();
            let product = `<li class="product-tag-dark">
                      <span class="block mr-2 text-md font-medium leading-2 text-white">${productName}</span>
                      <button class="remove-suggestions remove-item">
                          <img src="assets/images/close-sm.svg" alt="close"/>
                      </button>
                  </li>`;
            $('#productSelectedTagsUpdate').append(product);
            checkListLength();
            $('#productMainUpdate #productInputUpdate').val('');
        });


        let checkListLength = () => {
            let listCount = $('#productSelectedTagsUpdate li').length;
            if (listCount > 0) {
                $("#productInputUpdate").addClass("w-40").removeClass("w-full");
            } else {
                $("#productInputUpdate").addClass("w-full").removeClass("w-40");
            }
            if (listCount == 8) {
                $('#productMainUpdate #productInputUpdate').hide();
            } else {
                $('#productMainUpdate #productInputUpdate').show();
            }
        }
    }


});