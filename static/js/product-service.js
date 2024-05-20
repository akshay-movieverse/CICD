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
    if ($("#getInquiryForm").length > 0) {
        var mobileID = $("#getInquiryForm #salesNumber");
        let input = $("#getInquiryForm .valid-input");
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



        $("#inquiryBtn").click(function(e) {
            e.preventDefault();

            var number = $("#salesNumber").val();
            var city = $("#cityName").val();
            var productNameLength = $('#productSelectedTags li').length;
            var countryNameLength = $('#countrySelectedTags li').length;
            var hasError = true;
            $("#getInquiryForm").find('.valid-input').each(function(i) {
                var opacity = $(this).next().css("opacity");
                if (opacity == 0) {
                    hasError = false;
                } else {
                    hasError = true;
                    return false;
                }
            });
            if (hasError || number == '' || city == '' || productNameLength < 2 || countryNameLength < 1) {
                console.log("error");
                $("#getInquiryForm").find('.valid-input').addClass('blurred');
                if ($("#getInquiryForm #salesNumber").is(':invalid')) {
                    $("#salesErr").removeClass("opacity-0 invisible hidden").addClass("opacity-100 visible block");
                }
                if (productNameLength < 2) {
                    $("#productNameErr").show();
                }
                if (countryNameLength < 1) {
                    $("#countryNameErr").show();
                }
            } else {
                console.log("success");
                $("#getInquiryForm").find('.valid-input').removeClass('blurred');
                $("#loadingForm").show();
                setTimeout(() => {
                    $("#loadingForm").hide();
                    window.location.replace("/home.html");
                }, 3000);

            }
        });
    }


    // Add products to input max 2
    if ($("#productNameBlock").length > 0) {
        let openGoogleOnce = true;

        $('#loginGoogleClose').click(function() {
            $("#loginSignupGoogle").fadeOut();
        });

        $('#loginGoogleBtn').click(function() {
            $("#loginSignupGoogle").hide();
            $("#redirecting").fadeIn();
            setTimeout(() => {
                $("#redirecting").fadeOut();
            }, 5000);
        });

        $('#productMain #productInput').focus(function() {
            $("#productNameErr").hide();
        });

        $('#countryMain #countryInput').focus(function() {
            $("#countryNameErr").hide();
        });

        $('#productMain #productInput').click(function(e) {
            e.stopPropagation();
            if (openGoogleOnce) {
                $("#loginSignupGoogle").fadeIn();
                openGoogleOnce = false;
            }
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

        $('#countryMain #countryInput').on('keyup', function() {
            $("#countryNameErr").hide();
            if ($(this).val().length == 1) {
                $("#countryNameMinErr").fadeIn();
                $("#moreCountrySuggestionsBlock").fadeIn();
            } else if ($(this).val().length > 1) {
                $("#countryNameMinErr").hide();
                $("#loadingCountry").show();
                $("#moreCountrySuggestionsBlock").fadeIn();
                setTimeout(function() {
                    $("#loadingCountry").hide();
                }, 1000);
            } else {
                $('#countryNameMinErr').hide();
                $('#moreCountrySuggestionsBlock').fadeOut();
            }
        });


        $(document).on('click', function(e) {
            $("#moreProductSuggestionsBlock").hide();
        });
        $(document).on('click', function(e) {
            $("#moreCountrySuggestionsBlock").hide();
        });


        $(document).on('click', '.remove-suggestions', function(e) {
            $(this).closest('li').remove();
            let listName = $(this).closest('li').find('span').html();
            let listTag = `<li class="flex flex-shrink-0 cursor-pointer justify-between items-center text-slate-600 text-md h-10 px-3 hover:bg-green-50 hover:font-bold duration-200">
            <span>${listName}</span>
        </li>`;
            $('#moreProductSuggestions ul').append(listTag);
            checkListLength();
        });

        $(document).on('click', '.remove-country', function(e) {
            $(this).closest('li').remove();
            let listName = $(this).closest('li').find('span').html();
            let listTag = `<li class="border-b border-r border-neutral-300 text-md text-slate-600 font-bold px-2 py-1 cursor-pointer">
            <span>${listName}</span>
        </li>`;
            $('#moreCountrySuggestions ul').append(listTag);
            checkCountryListLength();
        });

        $(document).on('click', '#moreProductSuggestions li', function(e) {
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

        $(document).on('click', '#moreCountrySuggestions li', function(e) {
            let countryName = $(this).find('span').html();
            $(this).closest('li').remove();
            let product = `<li class="product-tag-dark">
                          <span class="block mr-2 text-md font-medium leading-2 text-white">${countryName}</span>
                          <button class="remove-country remove-item">
                              <img src="assets/images/close-sm.svg" alt="close"/>
                          </button>
                      </li>`;
            $('#countrySelectedTags').append(product);
            checkCountryListLength();
            $('#countryMain #countryInput').val('');
        });


        let checkListLength = () => {
            let listCount = $('#productSelectedTags li').length;
            if (listCount > 1) {
                $('#enquiryBody').removeClass('opacity-20 pointer-events-none');
            } else {
                $('#enquiryBody').addClass('opacity-20 pointer-events-none');
            }
            if (listCount == 4) {
                $('#productMain #productInput').hide();
            } else {
                $('#productMain #productInput').show();
            }
        }

        let checkCountryListLength = () => {
            let listCount = $('#countrySelectedTags li').length;

            if (listCount > 0) {

                $("#countryInput").addClass("w-20").removeClass("w-80");
            } else {
                $("#countryInput").addClass("w-80").removeClass("w-20");
            }
            if (listCount == 4) {
                $('#countryMain #countryInput').hide();
            } else {
                $('#countryMain #countryInput').show();
            }
        }
    }




});