$(document).ready(function() {


    if ($(".more").length > 0) {
        $(".more").click(function() {
            $(this).closest(".flex").find("span").toggleClass("truncate");
            $(this).remove();
        });

    }



    // file input 
    if ($("[data-upload]").length > 0) {
        $('ul').on('change', '[data-upload]', function() {
            let fileName = '';
            fileName = $(this).val();
            $(this).closest(".file-input").find("label span").html(fileName);
        })

        $('ul').on('click', '.delete-list', function() {
            $(this).parent("li").remove();
        });

        $(".add-list").click(function() {
            let uniqueID = Date.now()
            let list = `<li class="flex mt-4">
                            <input class="rounded-sm text-md border border-neutral-400 focus:outline-none px-2 py-1 w-full max-w-[45%] mr-3 bg-white" type="text">
                            <div class="file-input mr-3 w-full max-w-[43%]">
                                <label class="rounded-sm border border-neutral-400  px-3 py-1 w-full flex bg-white cursor-pointer" for="file_${uniqueID}">
                                    <img class="mr-2" src="../assets/images/admin/upload.svg" alt="icon"/>
                                    <span class="text-gray-400 truncate text-md">Upload</span> 
                                </label>
                                <input data-upload="file" class="hidden" type="file" id="file_${uniqueID}">
                            </div>
                            <button class="p-1 ml-auto delete-list">
                                <img class="min-w-[15px]" src="../assets/images/admin/delete.svg" alt="delete"/>
                            </button>
                        </li>`;
            $(this).prev("ul").append(list);
        });

    }

    // login page

    if ($("#adminLogin").length > 0) {

        let input = $("#adminLogin input");
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



        $("#loginButton").click(function(e) {
            e.preventDefault();

            var email = $("#adminLogin #email");
            var password = $("#adminLogin #password");
            var hasError = true;

            checkValid(email);
            checkValid(password);

            function checkValid(inputID) {
                if ($(inputID).next().css("opacity") == 0) {
                    hasError = false;
                } else {
                    hasError = true;
                    return false;
                }
            }

            if (hasError || email.val() == '' || password.val() == '') {
                console.log("error");
                $("#adminLogin").find('input').addClass('blurred');
            } else {
                console.log(email.val(), password.val());
                $("#adminLogin")[0].reset();
                $("#adminLogin").find("input").removeClass('blurred');
                alert("Form is submitted");
            }
        });
    }

    // select box color change
    if ($('[data-select]').length > 0) {
        $('[data-select]').each(function() {
            changeColor($(this));
        });
        $('[data-select]').change(function() {
            changeColor($(this));
        });

        function changeColor(customthis) {
            var selectOldColor = $(customthis).attr("data-color");
            $(customthis).removeClass(selectOldColor);
            var optionColor = $(customthis).children(":selected").attr("data-color");
            $(customthis).attr("data-color", optionColor);
            var selectNewColor = $(customthis).attr("data-color");
            $(customthis).addClass(selectNewColor);
        }
    }

    // pagination js
    if ($("#table_box_native").length > 0) {
        paginator({
            table: document.getElementById("table_box_native"),
            box: document.getElementById("index_native"),
            active_class: "color_page"
        });
    }

    // profile info page

    if ($("#profileInfoForm").length > 0) {
        let input = $("#profileInfoForm input");
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

        $("#profileInfoBtn").click(function(e) {
            e.preventDefault();

            var name = $("#profileInfoForm #name");
            var email = $("#profileInfoForm #email");
            var hasError = true;

            checkValid(name);
            checkValid(email);

            function checkValid(inputID) {
                if ($(inputID).next().css("opacity") == 0) {
                    hasError = false;
                } else {
                    hasError = true;
                    return false;
                }
            }

            if (hasError || name.val() == '' || email.val() == '') {
                $("#profileInfoForm").find('input').addClass('blurred');
            } else {
                console.log(name.val(), email.val());
                $("#profileInfoForm")[0].reset();
                $("#profileInfoForm").find("input").removeClass('blurred');
                alert("Form is submitted");
            }
        });
    }

    if ($("#passwordForm").length > 0) {
        let input = $("#passwordForm input");
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

        $("#passwordBtn").click(function(e) {
            e.preventDefault();

            var currentPassword = $("#passwordForm #currentPassword");
            var newPassword = $("#passwordForm #newPassword");
            var confirmPassword = $("#passwordForm #confirmPassword");
            var hasError = true;

            checkValid(currentPassword);
            checkValid(newPassword);
            checkValid(confirmPassword);

            function checkValid(inputID) {
                if ($(inputID).next().css("opacity") == 0) {
                    hasError = false;
                } else {
                    hasError = true;
                    return false;
                }
            }

            if (hasError || currentPassword.val() == '' || newPassword.val() == '' || confirmPassword.val() == '') {
                $("#passwordForm").find('input').addClass('blurred');
            } else {
                if (newPassword.val() !== confirmPassword.val()) {
                    $("#passwordForm").find('input').addClass('blurred');
                    alert("New password and confirm password are not same")
                    return false;
                } else {
                    console.log(currentPassword.val(), newPassword.val());
                    $("#passwordForm")[0].reset();
                    $("#passwordForm").find("input").removeClass('blurred');
                    alert("Form is submitted");
                }

            }
        });
    }




    // Clean Product 
    if ($('#table_box_native [data-btn]').length > 0) {
        $(document).on('click', '#table_box_native [data-btn]', function() {
            let btnAttr = $(this).attr("data-btn");
            if (btnAttr == 'green') {
                $(this).toggleClass('active-green-500');
            }
            if (btnAttr == 'red') {
                $(this).toggleClass('active-red-500');
            }
            if (btnAttr == 'blue') {
                $(this).toggleClass('active-blue-500');
            }
            if (btnAttr == 'orange') {
                $(this).toggleClass('active-orange-500');
            }
        });
    }




});