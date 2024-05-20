
    $(document).ready(function(){
        // seach slide
        if ($("#companyList").length > 0) { 
            $("#emptyCompany").hide();
                $('.delete-list').on('click', function(){
                    let list = $(this).closest("li");
                    list.fadeOut();
                    let listLength = $(this).closest("ul").children(":visible").length;
                    if (listLength == 1) {
                        $("#emptyCompany").fadeIn();
                        $("#placeOrder").addClass("disabled");
                    }
                    else {
                        $("#emptyCompany").fadeOut();
                        $("#placeOrder").removeClass("disabled");  
                    }
            });
        }

 
            // billing form 
            
            
            if ($("#billingForm").length > 0) {
                
                let input = $("#billingForm input");
                $(input).blur(function() {  
                    var inputLength = $(this).val().length;
                    if (inputLength > 0) {
                        $(this).addClass('blurred');
                    }
                });
                $(input).keyup(function() {    
                    $(this).removeClass('blurred');
                 });
                $(input).focus(function() {    
                    $(this).removeClass('blurred');
                });

                function showErr (id) {
                    $(id).next().removeClass("opacity-0 invisible");
                    $(id).next().addClass("opacity-1 visible");
                }

                function removeErr (id) {
                    $(id).next().removeClass("opacity-1 visible");
                    $(id).next().addClass("opacity-0 invisible");
                }

                $('#country , #state').on('change', function() {
                    var ID = $(this);
                    if (ID.val() == '') {
                        showErr(ID);
                    }
                    else {
                        removeErr(ID);
                    }   
                });

                $("#placeOrder").click(function (e) {
                    e.preventDefault();
                    
                    var cardHolderName = $("#cardHolderName").val();
                    var cardHolderEmail = $("#cardHolderName").val();
                    var addressLine1 = $("#addressLine1").val();
                    var addressLine2 = $("#addressLine2").val();
                    var country = $("#country").val();
                    var state = $("#state").val();
                    var city = $("#city").val();
                    var zipCode = $("#zipCode").val();

                    var cardNumber = $("#cardNumber").val();
                    var expiryMonth = $("#expiryMonth").val();
                    var expiryYear = $("#expiryYear").val();
                    var cvc = $("#cvc").val();

                    var hasError = true;
                   
                    var countryID = $("#country");
                    var stateID = $("#state");
                    
                    checkSelectVal(country,countryID);
                    checkSelectVal(state,stateID);

                    if (cardNumber == '' || expiryMonth == '' || expiryYear == '' || cvc == '') {
                        $("#paymentError").removeClass("opacity-0 invisible");
                        $("#paymentError").addClass("opacity-1 visible");
                        hasError = true;
                    }
                    else {
                        $("#paymentError").removeClass("opacity-1 visible");
                        $("#paymentError").addClass("opacity-0 invisible");
                        hasError = false;
                    }


                    $("#billingForm").find('input').each(function(i) {
                        var opacity = $(this).next().css("opacity");
                        if (opacity == 0 ) {
                            hasError = false;
                        }
                        else {
                            hasError = true; 
                            return false;
                        } 
                    });
                    if (hasError || cardHolderName == '' || cardHolderEmail == '' || addressLine1 == '' || country == '' || state == '' || city == '' || zipCode == '' || cardNumber == '' || expiryMonth == '' || expiryYear == '' || cvc == '') {
                        console.log("error");
                        $("#billingForm").find('input').addClass('blurred');
                    }
                    else {
                        console.log(cardHolderName,cardHolderEmail,addressLine1,city,zipCode);
                        $("#billingForm")[0].reset();
                        $("#cardForm")[0].reset();
                        $("#billingForm").find("input").removeClass('blurred');
                        alert("Form is submitted");
                    }

                    function checkSelectVal (selectVal, selectID) {
                        if (selectVal == '') {
                            showErr(selectID);
                            hasError = true;
                        }
                        else {
                            removeErr(selectID);
                            hasError = false;
                        }
                    }

 

                });

            }

        });
     