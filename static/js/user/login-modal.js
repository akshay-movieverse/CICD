$(document).ready(function() {

    if ($("#salesNumber").length > 0) {
        $("#salesNumber").intlTelInput({
            initialCountry: "in",
        });

        $(".iti__country").click(function() {
            const countryName = $(this).find('.iti__country-name').text();
            $("#countryName").text(countryName);
        });
    }


    // claimCompanyForm 
    if ($("#signInForm").length > 0) {
        var mobileID = $("#signInForm #salesNumber");
        let input = $("#signInForm .valid-input");
        $(input).blur(function() {
            var inputLength = $(this).val().length;
            if (inputLength > 0) {
                $(this).addClass('blurred');
            }
        });
        $(mobileID).blur(function() {
            var mobileLength = $(mobileID).val().length;
            if (mobileLength > 0) {
                $(this).addClass('blurred');
                if ($(mobileID).is(':invalid')) {
                    $("#salesErr").removeClass("opacity-0 invisible hidden").addClass("opacity-100 visible block");
                }
            }
        });
        $(input).keyup(function() {
            $(this).removeClass('blurred');
        });
        $(mobileID).keyup(function() {
            $(this).removeClass('blurred');
            $("#salesErr").removeClass("opacity-100 visible").addClass("opacity-0 invisible hidden");
        });
        $(input).focus(function() {
            $(this).removeClass('blurred');
        });
        $(mobileID).focus(function() {
            $(this).removeClass('blurred');
            $("#salesErr").removeClass("opacity-100 visible").addClass("opacity-0 invisible hidden");
        });

        $("#signUpBtn").click(function(e) {
            e.preventDefault();
            var businessname = $("#businessName").val();
            var number = $("#salesNumber").val();
            var city = $("#cityName").val();
            var productNameLength = $('#productSelectedTags li').length;
            var hasError = true;
            $("#signInForm").find('.valid-input').each(function(i) {
                var opacity = $(this).next().css("opacity");
                if (opacity == 0) {
                    hasError = false;
                } else {
                    hasError = true;
                    return false;
                }
            });
            if (hasError || businessname == '' || number == '' || city == '' || productNameLength == 0) {
                console.log("error");
                $("#signInForm").find('.valid-input').addClass('blurred');
                if ($("#signInForm #salesNumber").is(':invalid')) {
                    $("#salesErr").removeClass("opacity-0 invisible hidden").addClass("opacity-100 visible block");
                }
                if (productNameLength == 0) {
                    $("#productNameErr").show();
                }
            } else {
                console.log("success");
                // $("#signInForm")[0].reset();
                $("#signInForm").find('.valid-input').removeClass('blurred');
                $("#signInForm")[0].reset();
                $("#signInBlock").hide();
                $("#signInSuccess").fadeIn();
                setTimeout(() => {
                    $('body').removeClass('overflow-hidden');
                    $("#sellingModal").removeClass('modal-show');
                    $("#sellingModal").fadeOut();
                }, 2000);
            }
        });
    }


    // Add products to input max 2
    if ($("#productNameBlock").length > 0) {
        $('#productMain #productInput').focus(function() {
            $("#productNameErr").hide();
        });
        $('#productMain #productInput').click(function(e) {
            e.stopPropagation();
        });

        $('#productMain #productInput').on('keyup', function() {
            $("#productNameErr").hide();
            if ($(this).val().length == 1 || $(this).val().length == 2) {
                $("#productNameMinErr").fadeIn();
                $("#moreProductSuggestionsBlock").fadeIn();
            } else if ($(this).val().length > 2) {
                $("#productNameMinErr").hide();
                $("#loadingProduct").show();
                $("#moreProductSuggestionsBlock").fadeIn();
                setTimeout(function() {
                    $("#loadingProduct").hide();
                }, 1000);
            } else {
                $('#productNameMinErr').hide();
                $('#moreProductSuggestionsBlock').fadeOut();
            }
        });

        $(document).on('click', function(e) {
            $("#moreProductSuggestionsBlock").hide();
        });

        $(document).on('click', '.remove-suggestions', function(e) {
            $(this).closest('li').remove();
            let listName = $(this).closest('li').find('span').html();
            let listTag = `<li>
                            <a class="flex items-center" href="javascript:;"> <img class="mr-1" src="../assets/images/client-admin/plus.svg" alt="icon"> <span>${listName}</span> </a>
                        </li>`;
            $('#moreProductSuggestions ul').append(listTag);
            checkListLength();
        });

        $(document).on('click', '#moreProductSuggestions li a', function(e) {

            let productName = $(this).find('span').html();

            $(this).closest('li').remove();
            let product = `<li class="product-tag-dark">
                            <span class="block mr-2 text-md font-medium leading-2 text-white">${productName}</span>
                            <button class="remove-suggestions remove-item">
                                <img src="assets/images/close-sm.svg" alt="close"/>
                            </button>
                        </li>`;
            $('#productSelectedTags').append(product);
            checkListLength();
            $('#productMain #productInput').val('');
        });

        let checkListLength = () => {
            let listCount = $('#productSelectedTags li').length;
            if (listCount == 2) {
                $('#productMain #productInput').hide();
            } else {
                $('#productMain #productInput').show();
            }
        }
    }




});