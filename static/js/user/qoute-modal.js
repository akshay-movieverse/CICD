$(document).ready(function() {

    if ($("#qouteNumber").length > 0) {
        $("#qouteNumber").intlTelInput({
            initialCountry: "in",
        });

        $(".iti__country").click(function() {
            const countryName = $(this).find('.iti__country-name').text();
            $("#qouteCountryName").text(countryName);
        });
    }


    // Get Qoute Form 
    if ($("#getQouteForm").length > 0) {
        var mobileID = $("#getQouteForm #qouteNumber");
        let input = $("#getQouteForm .valid-input");
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
                    $("#qouteNumErr").removeClass("opacity-0 invisible hidden").addClass("opacity-100 visible block");
                }
            }
        });
        $(input).keyup(function() {
            $(this).removeClass('blurred');
        });
        $(mobileID).keyup(function() {
            $(this).removeClass('blurred');
            $("#qouteNumErr").removeClass("opacity-100 visible").addClass("opacity-0 invisible hidden");
        });
        $(input).focus(function() {
            $(this).removeClass('blurred');
        });
        $(mobileID).focus(function() {
            $(this).removeClass('blurred');
            $("#qouteNumErr").removeClass("opacity-100 visible").addClass("opacity-0 invisible hidden");
        });

        $("#getQouteBtn").click(function(e) {
            e.preventDefault();
            var number = $("#qouteNumber").val();
            var saveProdutNameLength = $('#saveMoreSelectedTags li').length;
            var countryNameLength = $('#countrySelectedTags li').length;
            var hasError = true;
            $("#getQouteForm").find('.valid-input').each(function(i) {
                var opacity = $(this).next().css("opacity");
                if (opacity == 0) {
                    hasError = false;
                } else {
                    hasError = true;
                    return false;
                }
            });
            if (hasError || number == '' || countryNameLength == 0 || saveProdutNameLength == 0) {
                console.log("error");
                $("#getQouteForm").find('.valid-input').addClass('blurred');
                if ($("#getQouteForm #qouteNumber").is(':invalid')) {
                    $("#qouteNumErr").removeClass("opacity-0 invisible hidden").addClass("opacity-100 visible block");
                }
                if (saveProdutNameLength == 0) {
                    $("#saveProNameErr").show();
                }
                if (countryNameLength == 0) {
                    $("#countryNameErr").show();
                }


            } else {
                console.log("success");
                $("#getQouteForm").find('.valid-input').removeClass('blurred');
                $("#getQouteForm")[0].reset();
                $("#getQouteBlock").hide();
                $("#getQouteSuccess").fadeIn();
                setTimeout(() => {
                    $('body').removeClass('overflow-hidden');
                    $("#getQouteModal").removeClass('modal-show');
                    $("#getQouteModal").fadeOut();
                }, 2000);
            }
        });
    }

    // add countries to input max 3
    if ($("#countryNameBlock").length > 0) {
        $('#countryMain #countryInput').focus(function() {
            $("#countryNameErr").hide();
        });
        $('#countryMain #countryInput').click(function(e) {
            e.stopPropagation();
        });

        $('#countryMain #countryInput').on('keyup', function() {
            $("#countryNameErr").hide();
            if ($(this).val().length == 1 || $(this).val().length == 2) {
                $("#countryNameMinErr").fadeIn();
                $("#moreCountrySuggestionsBlock").fadeIn();
            } else if ($(this).val().length > 2) {
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
            $("#moreCountrySuggestionsBlock").hide();
        });

        $(document).on('click', '.remove-country', function(e) {
            $(this).closest('li').remove();
            let listName = $(this).closest('li').find('span').html();
            let listTag = `<li>
                            <a class="flex items-center" href="javascript:;"> <img class="mr-1" src="../assets/images/client-admin/plus.svg" alt="icon"> <span>${listName}</span> </a>
                        </li>`;
            $('#moreCountrySuggestions ul').append(listTag);
            checkCountryLength();
        });

        $(document).on('click', '#moreCountrySuggestions li a', function(e) {

            let productName = $(this).find('span').html();

            $(this).closest('li').remove();
            let product = `<li class="product-tag-dark">
                            <span class="block mr-2 text-md font-medium leading-2 text-white">${productName}</span>
                            <button class="remove-country remove-item">
                                <img src="assets/images/close-sm.svg" alt="close"/>
                            </button>
                        </li>`;
            $('#countrySelectedTags').append(product);
            checkCountryLength();
            $('#countryMain #countryInput').val('');
        });

        let checkCountryLength = () => {
            let listCount = $('#countrySelectedTags li').length;
            if (listCount == 3) {
                $('#countryMain #countryInput').hide();
            } else {
                $('#countryMain #countryInput').show();
            }
        }
    }

    // add Saved Product to input max 3
    if ($("#saveProNameBlock").length > 0) {
        $('#saveProMain #saveProInput').focus(function() {
            $("#saveProNameErr").hide();
        });
        $('#saveProMain #saveProInput').click(function(e) {
            e.stopPropagation();
        });

        $('#saveProMain #saveProInput').on('keyup', function() {
            $("#saveProNameErr").hide();
            if ($(this).val().length == 1 || $(this).val().length == 2) {
                $("#saveProMinErr").fadeIn();
                $("#moreSaveSuggestionsBlock").fadeIn();
            } else if ($(this).val().length > 2) {
                $("#saveProMinErr").hide();
                $("#loadingSavePro").show();
                $("#moreSaveSuggestionsBlock").fadeIn();
                setTimeout(function() {
                    $("#loadingSavePro").hide();
                }, 1000);
            } else {
                $('#saveProMinErr').hide();
                $('#moreSaveSuggestionsBlock').fadeOut();
            }
        });

        $(document).on('click', function(e) {
            $("#moreSaveSuggestionsBlock").hide();
        });

        $(document).on('click', '.remove-save-pro', function(e) {
            $(this).closest('li').remove();
            let listName = $(this).closest('li').find('span').html();
            let listTag = `<li>
                            <a class="flex items-center" href="javascript:;"> <img class="mr-1" src="../assets/images/client-admin/plus.svg" alt="icon"> <span>${listName}</span> </a>
                        </li>`;
            $('#moreSaveSuggestions ul').append(listTag);
            checkCountryLength();
        });

        $(document).on('click', '#moreSaveSuggestions li a', function(e) {

            let productName = $(this).find('span').html();

            $(this).closest('li').remove();
            let product = `<li class="product-tag-dark">
                            <span class="block mr-2 text-md font-medium leading-2 text-white">${productName}</span>
                            <button class="remove-save-pro remove-item">
                                <img src="assets/images/close-sm.svg" alt="close"/>
                            </button>
                        </li>`;
            $('#saveMoreSelectedTags').append(product);
            checkCountryLength();
            $('#saveProMain #saveProInput').val('');
        });

        let checkCountryLength = () => {
            let listCount = $('#saveMoreSelectedTags li').length;
            if (listCount == 2) {
                $('#saveProMain #saveProInput').hide();
            } else {
                $('#saveProMain #saveProInput').show();
            }
        }
    }

});