// Company Profile JS

$(document).ready(function() {

    if ($("#phoneNumber").length > 0) {
        $("#phoneNumber").intlTelInput({
            initialCountry: "in",
        });
        $(".iti__selected-flag").addClass('pointer-events-none');

    }

    // Edit Details
    if ($("#basicDetails").length > 0) {
        $(document).on('click', '#saveProfile', function(e) {
            $("#basicDetails .input-field").addClass('input-readonly');
            $(".iti__selected-flag").addClass('pointer-events-none');
            $(this).hide();
            $("#editProfile").show();
            $("#cancelProfile").hide();
        });
        $(document).on('click', '#editProfile', function(e) {
            $("#basicDetails .input-field").removeClass('input-readonly');
            $(".iti__selected-flag").removeClass('pointer-events-none');
            $(this).hide();
            $("#saveProfile").show();
            $("#cancelProfile").show();
        });
        $(document).on('click', '#cancelProfile', function(e) {
            $("#basicDetails .input-field").addClass('input-readonly');
            $(".iti__selected-flag").addClass('pointer-events-none');
            $(this).hide();
            $("#editProfile").show();
            $("#saveProfile").hide();
        });
    }

    // Edit Company
    if ($("#aboutCompany").length > 0) {
        $(document).on('click', '#saveCompany', function(e) {
            $("#aboutCompany .input-field").addClass('input-readonly');
            $(this).hide();
            $("#editCompany").show();
            $("#cancelCompany").hide();
        });
        $(document).on('click', '#editCompany', function(e) {
            $("#aboutCompany .input-field").removeClass('input-readonly');
            $(this).hide();
            $("#saveCompany").show();
            $("#cancelCompany").show();
        });
        $(document).on('click', '#cancelCompany', function(e) {
            $("#aboutCompany .input-field").addClass('input-readonly');
            $(this).hide();
            $("#editCompany").show();
            $("#saveCompany").hide();
        });
    }




});