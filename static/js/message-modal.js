$(document).ready(function() {

    if ($("#whatsNumber").length > 0) {
        $("#whatsNumber").intlTelInput({
            initialCountry: "in",
        });
    }


    // messageForm 
    if ($("#messageForm").length > 0) {


        var mobileID = $("#messageForm #whatsNumber");
        let input = $("#messageForm .valid-input");
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
                    $("#whatsErr").removeClass("opacity-0 invisible hidden").addClass("opacity-100 visible block");
                }
            }
        });
        $(input).keyup(function() {
            $(this).removeClass('blurred');
        });
        $(mobileID).keyup(function() {
            $(this).removeClass('blurred');
            $("#whatsErr").removeClass("opacity-100 visible").addClass("opacity-0 invisible hidden");
        });
        $(input).focus(function() {
            $(this).removeClass('blurred');
        });
        $(mobileID).focus(function() {
            $(this).removeClass('blurred');
            $("#whatsErr").removeClass("opacity-100 visible").addClass("opacity-0 invisible hidden");
        });


        $("#messageBtn").click(function(e) {
            e.preventDefault();

            var description = $("#description").val();
            var number = $("#whatsNumber").val();
            var city = $("#cityLocation").val();
            var hasError = true;
            $("#messageForm").find('.valid-input').each(function(i) {
                var opacity = $(this).next().css("opacity");

                if (opacity == 0) {
                    hasError = false;
                } else {
                    hasError = true;
                    return false;
                }
            });

            if (hasError || description == '' || number == '' || city == '') {
                console.log("error");
                $("#messageForm").find('.valid-input').addClass('blurred');
                if ($("#messageForm #whatsNumber").is(':invalid')) {
                    $("#whatsErr").removeClass("opacity-0 invisible hidden").addClass("opacity-100 visible block");
                }
            } else {
                console.log("success");
                $("#messageForm").find('.valid-input').removeClass('blurred');
                $("#messageloadingForm").show();
                setTimeout(() => {
                    $("#messageForm")[0].reset();
                    $("#messageForm").hide();
                    $("#successForm").show();
                }, 3000);
            }
        });
    }

});