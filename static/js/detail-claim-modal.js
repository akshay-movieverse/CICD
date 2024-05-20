$(document).ready(function() {

    if ($("#salesNumber").length > 0) {
        $("#salesNumber").intlTelInput({
            initialCountry: "in",
        });
        $(".iti__country").click(function() {
            const codeName = $(this).find('.iti__dial-code').text();
            $("#updateSalesCode").text(codeName);
        });

        // $(".iti__country").click(function() {
        //     const countryName = $(this).find('.iti__country-name').text();
        //     $("#countryName").text(countryName);
        // });
    }




    // claimCompanyForm 
    if ($("#getInquiryForm").length > 0) {
        $(document).ready(function() {
            $(window).keydown(function(event) {
                if (event.keyCode == 13) {
                    event.preventDefault();
                    return false;
                }
            });
        });

        // Change Company 
        // if ($("#changeCompanyBtn").length > 0) {
        //     $("#changeCompanyBtn").click(function(e) {
        //         $(this).toggleClass('opacity-50 !font-light');
        //         $("#companyName").val('');
        //         if ($("#companiesMoreField").length == 0) {
        //             $("#companyLabel").text('Type Your Company’s Name');
        //             let moreFields = `<div id="companiesMoreField" class="grid gap-x-5 gap-y-3 md:gap-y-8 grid-cols-1 md:grid-cols-3 mt-8">
        //             <div>
        //                 <label class="text-sm leading-xl mb-2 text-neutral-900 block">Company’s Address</label>
        //                 <input minlength="4" id="companyAddress" required type="text" class="valid-input w-full px-1.5 h-8 py-px font-bold bg-white border border-neutral-400 text-md focus:outline-none">
        //                 <span class="hidden transition-opacity duration-200 opacity-0 invisible text-red-500 text-sm font-light mt-0.5">Fill correct address</span>
        //             </div>
        //             <div>
        //                 <label class="text-sm leading-xl mb-2 text-neutral-900 block">Is business formally registered ?</label>
        //                 <select class="w-full px-1.5 h-8 py-px font-bold bg-white border border-neutral-400 text-md focus:outline-none bg-select-bg bg-no-repeat bg-[97%_center] appearance-none">
        //                     <option value="Domestic">Yes (its aaskdhka)</option>
        //                     <option value="Internation">No</option>
        //                 </select>
        //             </div>
        //             <div>
        //                 <label class="text-sm leading-xl mb-2 text-neutral-900 block">City</label>
        //                 <input minlength="4" id="companyCity" required type="text" class="valid-input charOnly w-full px-1.5 h-8 py-px font-bold bg-white border border-neutral-400 text-md focus:outline-none">
        //                 <span class="hidden transition-opacity duration-200 opacity-0 invisible text-red-500 text-sm font-light mt-0.5">Min 4 chars pls</span>
        //             </div>
        //         </div>`;
        //             $('#companiesFields').append(moreFields);
        //         } else {
        //             $("#companyLabel").text('Company’s Name');
        //             $("#companiesMoreField").remove();
        //         }

        //     });
        // }


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

            var companyName = $("#companyName").val();
            var number = $("#salesNumber").val();
            var companyUrl = $("#companyUrl").val();

            var companyAddress = $("#companyAddress").val();
            var companyCity = $("#companyCity").val();

            var productNameLength = $('#productSelectedTags li').length;
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
            if (hasError || number == '' || companyName == '' || companyAddress == '' || companyUrl == '' || companyCity == '' || productNameLength < 2) {
                console.log("error");

                $("#getInquiryForm").find('.valid-input').addClass('blurred');
                if ($("#getInquiryForm #salesNumber").is(':invalid')) {
                    $("#salesErr").removeClass("opacity-0 invisible hidden").addClass("opacity-100 visible block");
                }

                if (productNameLength < 1) {
                    $("#productNameErr").show();
                }
                if (productNameLength == 1) {
                    $("#productNameErr2").show();
                }

            } else {
                console.log("success");
                $("#getInquiryForm").find('.valid-input').removeClass('blurred');
                $("#loadingForm").show();
                setTimeout(() => {
                    $("#buyesBlock").hide();
                    $("#loadingForm").hide();
                    $("#confirmNumber").removeClass('hidden');
                }, 3000);
            }
        });

        $("#confirmNumberBtn").click(function(e) {
            $("#confirmNumber").addClass('hidden');
            // $("#claimSuccess").removeClass('hidden');
            $("#getInquiryForm")[0].reset();
            $("#buyesBlock").show();
            $("body").removeClass("overflow-hidden");
            $("#buyers").removeClass("modal-show");
            // setTimeout(() => {
            //     $("#confirmNumber").addClass('hidden');
            //     $("#claimSuccess").addClass('hidden');

            // }, 3000);
        });

        $("#confirmBackBtn").click(function(e) {
            $("#buyesBlock").show();
            $("#confirmNumber").addClass('hidden');
        });

        $("#cancelNumberBtn").click(function(e) {
            $("#buyesBlock").show();
            $("#confirmNumber").addClass('hidden');
        });

    }

    // Login Google
    if ($("#loginGoogle").length > 0) {
        $("#loginGoogle").click(function(e) {
            $("#loadingForm").show();
            setTimeout(() => {
                $("#getInquiryForm")[0].reset();
                $("#buyesBlock").hide();
                $("#loadingForm").hide();
                $("#claimSuccess").removeClass('hidden');
                setTimeout(() => {
                    $("#claimSuccess").addClass('hidden');
                    $("#buyesBlock").show();
                    $("body").removeClass("overflow-hidden");
                    $("#buyers").removeClass("modal-show");
                }, 3000);
            }, 3000);
        });
    }

    // Add products to input max 2
    if ($("#productNameBlock").length > 0) {
        $('#productMain #productInput').focus(function() {
            $("#productNameErr").hide();
            $("#productNameErr2").hide();
        });
        $('#productMain #productInput').click(function(e) {
            e.stopPropagation();
        });
        $('#moreResults').click(function(e) {
            e.stopPropagation();
        });





        $('#productMain #productInput').on('keyup', function() {
            let listCount = $('#productSelectedTags li').length;
            if (listCount == 0) {
                if ($("#productInput").val().length > 0) {
                    $("#productSearchIcon").hide();
                } else {
                    $("#productSearchIcon").show();
                }
            }


            $("#productNameErr").hide();
            $("#productNameErr2").hide();
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
            let listTag = `<li class="border-b border-r border-neutral-300 px-2 py-1 cursor-pointer">
          <span>${listName}</span>
      </li>`;
            $('#moreProductSuggestion ul').append(listTag);
            checkListLength();
        });

        $(document).on('click', '#moreProductSuggestion li', function(e) {
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
            if (listCount > 0) {
                $("#productInput").addClass("w-40").removeClass("w-full");
            } else {
                $("#productInput").addClass("w-full").removeClass("w-40");
            }
            if (listCount == 8) {
                $('#productMain #productInput').hide();
            } else {
                $('#productMain #productInput').show();
            }
        }
    }




});