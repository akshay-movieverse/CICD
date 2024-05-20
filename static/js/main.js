$(document).ready(function () {
    // menu toggler
    if ($("#menuToggler").length > 0) {
        $("#menuToggler").click(function () {
            $(this).toggleClass("bg-white");
            $(".menuIcon").toggleClass("hidden");
            $(".closeIcon").toggleClass("hidden");
            $("#navBar").toggleClass("hidden");
            $("#navBar").toggleClass("flex");
            $("#menuBackdrop").toggleClass("backdrop-show");
        });
    }
    if ($("#homePage").length > 0) {
        let selectVal = "";
        $("#slider").click(function (e) {
            e.stopPropagation();
        });
        $(document).click(function () {
            $("#slider").fadeOut(200);
        });
        $("#selectCountry").click(function (e) {
            e.stopPropagation();
            $("#slider").fadeToggle(200);
            $("#result").removeClass("show");
        });

        $(document).on("mouseenter", "#selectCountry", function (e) {
            e.stopPropagation();
            if (window.innerWidth > 767) {
                $("#slider").fadeIn(200);
                $("#result").removeClass("show");
            }
        });
        $("#slider input").on("change", function () {
            selectVal = $("#slider input:checked").val();
            $("#selectCountry > span").text(selectVal);
            $("#slider").fadeOut(200);
            if (selectVal == "") {
                $("#selectCountryErr").fadeIn();
            } else {
                $("#selectCountryErr").fadeOut();
            }
        });

        // company result show header
        if ($("#search").length > 0) {
            $("#search").keyup(function () {
                if (selectVal == "") {
                    $("#selectCountryErr").fadeIn();
                } else {
                    if ($("#search").val().length < 2) {
                        $("#result").removeClass("show");
                        $("#searchErr").fadeIn();
                    } else {
                        $("#searchErr").fadeOut();
                        $("#result").addClass("show");
                    }
                }
            });
            $("#search").blur(function () {
                $("#searchErr").fadeOut();
            });
            $(document).on("click", function (e) {
                $("#result").removeClass("show");
            });
            $("#result").click(function (e) {
                e.stopPropagation();
            });
        }
        // search slide
        if ($("#slideNext").length > 0) {
            $("#slideNext").click(function () {
                $("#slider").scrollLeft(420);
                $(this).hide();
            });
        }
    }

    if ($("#homePageOld").length > 0) {
        let selectVal = "";

        // company result show header
        if ($("#search").length > 0) {
            $("#search").keyup(function () {
                if ($("#search").val().length < 2) {
                    $("#result").removeClass("show");
                    $("#searchErr").fadeIn();
                } else {
                    $("#searchErr").fadeOut();
                    $("#result").addClass("show");
                }
            });
            $("#search").blur(function () {
                $("#searchErr").fadeOut();
            });
            $(document).on("click", function (e) {
                $("#result").removeClass("show");
            });
            $("#result").click(function (e) {
                e.stopPropagation();
            });
        }
        // search slide
        if ($("#slideNext").length > 0) {
            $("#slideNext").click(function () {
                $("#slider").scrollLeft(420);
                $(this).hide();
            });
        }
    }

    // Dropdown
    if ($("[data-dropdown]").length > 0) {
        $("[data-dropdown]").click(function (e) {
            e.stopPropagation();
            $(this).next("ul").toggleClass("dropdown-show");
            let dropdownIcon = $(this).find(".dropdown-arrow");
            dropdownIcon.toggleClass("rotate-0");
            dropdownIcon.toggleClass("rotate-up");
        });

        $(document).click(function () {
            if ($(".dropdown-show").length > 0) {
                $("[data-dropdown]").next("ul").removeClass("dropdown-show");
                $("[data-dropdown]").find(".dropdown-arrow").toggleClass("rotate-0");
                $("[data-dropdown]").find(".dropdown-arrow").toggleClass("rotate-up");
            }
        });
    }

    // Show Tabs
    const showTabs = (tabLinkID, tabContentID) => {
        let tabLinks = document.querySelectorAll(tabLinkID),
            tabContent = document.querySelectorAll(tabContentID);

        if (tabLinks && tabContent) {
            const openTabs = (el) => {
                let selectedLink = el.currentTarget.classList,
                    showId = el.currentTarget.dataset.tab;

                tabLinks.forEach((el) => {
                    el.classList.remove("active");
                });
                tabContent.forEach((el) => {
                    el.classList.remove("active");
                });
                selectedLink.add("active");
                document.querySelector("#" + showId).classList.add("active");
            };
            tabLinks.forEach((el) => {
                el.addEventListener("click", openTabs);
            });
        }
    };
    showTabs("[data-tab]", ".tab-content");

    // Show Dropdown
    const showDropdowns = (dropdownLinkID, dropdownContentID) => {
        let dropDownLink = document.querySelectorAll(dropdownLinkID),
            dropDownContent = document.querySelectorAll(dropdownContentID);

        window.onclick = () => {
            dropDownLink.forEach((el) => {
                el.classList.remove("active");
            });
            dropDownContent.forEach((el) => {
                el.classList.remove("active");
            });
        };

        if (dropDownLink && dropDownContent) {
            const openTabs = (el) => {
                el.stopPropagation();
                let selectedLink = el.currentTarget.classList,
                    showId = el.currentTarget.dataset.menu,
                    currentDropdown = document.querySelector("#" + showId);

                if (selectedLink.contains("active")) {
                    selectedLink.remove("active");
                    currentDropdown.classList.remove("active");
                } else {
                    dropDownLink.forEach((el) => {
                        el.classList.remove("active");
                    });
                    dropDownContent.forEach((el) => {
                        el.classList.remove("active");
                    });
                    selectedLink.add("active");
                    currentDropdown.classList.add("active");
                }
            };
            dropDownLink.forEach((el) => {
                el.addEventListener("click", openTabs);
            });
        }
    };
    showDropdowns("[data-menu]", ".dropmenu");

    // modal
    if ($("[data-modal]").length > 0) {
        $(document).on("click", "[data-modal]", function () {
            $("body").addClass("overflow-hidden");
            let modal = $(this).attr("data-modal");
            $("#" + modal).addClass("modal-show");
        });
        $(document).on("click", "[data-modal]:not(.clickable) > div", function (e) {
            e.stopPropagation();
        });
        $(document).on("click", "[data-dismiss]", function (e) {
            e.stopPropagation();
            $("body").removeClass("overflow-hidden");
            let dismiss = $(this).attr("data-dismiss");
            if (e.target.id == dismiss) {
                $("#" + dismiss).removeClass("modal-show");
            }

            if ($(this).closest("#" + dismiss)) {
                $("#" + dismiss).removeClass("modal-show");
            }
        });
    }

    // company result show header
    if ($("#companyList").length > 0) {
        $("#companyList").keyup(function () {
            if ($("#companyList").val().length > 0) {
                $("#searchResultSM").addClass("show");
            } else {
                $("#searchResultSM").removeClass("show");
            }
        });
    }

    // contact form
    if ($(".main-form").length > 0) {
        $(".form-input").blur(function () {
            var input = $(this).val().length;
            if (input > 0) {
                $(this).addClass("blurred");
            }
        });
        $(".form-input").keyup(function () {
            $(this).removeClass("blurred");
        });
        $(".form-input").focus(function () {
            $(this).removeClass("blurred");
        });

        $("textarea[name=message]").keyup(function () {
            $("#count").text($(this).val().length);
        });

        $("#submitForm").click(function (e) {
            e.preventDefault(); // Prevent default form submission
        
            var form = $(this).closest(".main-form");
            var name = form.find("input[name=name]").val().trim();
            var email = form.find("input[name=email]").val().trim();
            var number = form.find("input[name=phone_number]").val().trim();
            var message = form.find("textarea[name=message]").val().trim();
            var hasError = false;
        
            form.find(".form-input").each(function () {
                var input = $(this).val().trim();
                var errorMessage = $(this).next();
                if (input === "") {
                    errorMessage.removeClass("invisible").addClass("opacity-100");
                    hasError = true;
                } else {
                    errorMessage.removeClass("opacity-100").addClass("invisible");
                }
            });
        
            var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            var phoneRegex = /^\d+$/;
        
            if (!emailRegex.test(email)) {
                form.find("input[name=email]").next().removeClass("invisible").addClass("opacity-100");
                hasError = true;
            }
        
            if (!phoneRegex.test(number)) {
                form.find("input[name=phone_number]").next().removeClass("invisible").addClass("opacity-100");
                hasError = true;
            }
        
            if (message.length < 20) {
                form.find("textarea[name=message]").next().removeClass("invisible").addClass("opacity-100");
                hasError = true;
            }
        
            if (!hasError && name !== "" && email !== "" && number !== "" && message !== "") {
                // If there are no errors and all fields are filled, show loading screen
                $("#contactLoader").fadeIn();
        
                // Submit the form after a delay to allow the loading screen to show
                setTimeout(function () {
                    form.submit();
                }, 1000);
            }
        });
    }

    // subscribe form
    if ($("#subscribeInput").length > 0) {
        $("#subscribeInput").blur(function () {
            var input = $(this).val().length;
            if (input > 0) {
                $(this).addClass("blurred");
            }
        });
        $("#subscribeInput").keyup(function () {
            $(this).removeClass("blurred");
        });
        $("#subscribeInput").focus(function () {
            $(this).removeClass("blurred");
        });

        $("#subscribeButton").click(function (e) {
            e.preventDefault();
            var email = $("#subscribeInput").val();
            var hasError = true;

            $("#subscribeInput").each(function (i) {
                var opacity = $(this).next().css("opacity");
                if (opacity == 0) {
                    hasError = false;
                } else {
                    hasError = true;
                    return false;
                }
            });
            if (hasError || email == "") {
                console.log("error");
                $("#subscribeInput").addClass("blurred");
            } else {
                console.log(email);
                $("#subscribeForm")[0].reset();
                $("#subscribeInput").removeClass("blurred");
                $("#subscribeFormContent").addClass("hidden");
                $("#subscribedContent").addClass("flex");
                $("#subscribedContent").removeClass("hidden");
                setTimeout(() => {
                    $("#subscribe").removeClass("modal-show");
                    $("#subscribeFormContent").removeClass("hidden");
                    $("#subscribedContent").addClass("hidden");
                    $("#subscribedContent").removeClass("flex");
                }, 3000);
            }
        });
    }

    // claimCompany
    $(document).on("keyup", ".count-area", function () {
        $(this).parent().find(".count").text($(this).val().length);
    });

    $(".charOnly").on("keypress", function (event) {
        var regex = new RegExp("^[A-Za-z -]+$");
        var key = String.fromCharCode(
            !event.charCode ? event.which : event.charCode
        );
        if (!regex.test(key)) {
            event.preventDefault();
            return false;
        }
    });

    $(document).on("keypress", ".numbersOnly", function (event) {
        var regex = /^\d+$/;
        var key = String.fromCharCode(
            !event.charCode ? event.which : event.charCode
        );
        if (!regex.test(key)) {
            event.preventDefault();
            return false;
        }
    });

    // investmentYes form
    if ($("#investYesForm").length > 0) {
        $(".usd-input").focus(function () {
            $(this)
                .closest(".group")
                .find(".err-field")
                .removeClass("opacity-1 visible");
            $(this)
                .closest(".group")
                .find(".err-field")
                .addClass("opacity-0 invisible");
        });

        $("input[type=radio]").on("change", function (evt) {
            $(this)
                .closest(".group")
                .find(".err-field")
                .removeClass("opacity-1 visible");
            $(this)
                .closest(".group")
                .find(".err-field")
                .addClass("opacity-0 invisible");
            $(this).closest(".group").find("input[type=text]").val("");
        });

        $("#investYesBtn").click(function (e) {
            e.preventDefault();
            var expectRaise = $("#expectRaise").val();
            var tillRaised = $("#tillRaised").val();
            var hasError = false;

            if ($("#investUSD").prop("checked") == true) {
                if (expectRaise == "") {
                    $("#errUsdRaised").addClass("opacity-1 visible");
                    $("#errUsdRaised").removeClass("opacity-0 invisible");
                    hasError = true;
                }
            }

            if ($("#raisedUSD").prop("checked") == true) {
                if (tillRaised == "") {
                    $("#errUsdTill").addClass("opacity-1 visible");
                    $("#errUsdTill").removeClass("opacity-0 invisible");
                    hasError = true;
                }
            }

            if (hasError) {
                console.log("error");
            } else {
                console.log("success");
                $("#investYesForm")[0].reset();
                $(".err-field").removeClass("opacity-1 visible");
                $(".err-field").addClass("opacity-0 invisible");
                $("#investmentYes").addClass("hidden");
                $("#claimComp").removeClass("hidden");
            }
        });
    }

    // claimCompanyForm
    if ($("#claimCompanyForm").length > 0) {
        $("#natureBusiness input[type=checkbox]").on("change", function (evt) {
            if ($(this).parent().siblings().find("input:checked").length >= 3) {
                this.checked = false;
            }
            if ($("#natureBusiness").find("input:checked").length == 0) {
                $(".nature-business").removeClass("opacity-0 invisible");
                $(".nature-business").addClass("opacity-1 visible");
            } else {
                $(".nature-business").removeClass("opacity-1 visible");
                $(".nature-business").addClass("opacity-0 invisible");
            }
        });

        let input = $("#claimCompanyForm .valid-input");
        $(input).blur(function () {
            var inputLength = $(this).val().length;
            if (inputLength > 0) {
                $(this).addClass("blurred");
            }
        });
        $(input).keyup(function () {
            $(this).removeClass("blurred");
        });
        $(input).focus(function () {
            $(this).removeClass("blurred");
        });

        $("#claimSave").click(function (e) {
            e.preventDefault();
            var companyWebsite = $("#companyWebsite").val();
            var companyEmail = $("#companyEmail").val();
            var companyPhone = $("#companyPhone").val();
            var yourName = $("#yourName").val();
            var numberEmployee = $("#numberEmployee").val();
            var headqCity = $("#headqCity").val();
            var hasError = true;

            $("#claimCompanyForm")
                .find(".valid-input")
                .each(function (i) {
                    var opacity = $(this).next().css("opacity");
                    if (opacity == 0) {
                        hasError = false;
                    } else {
                        hasError = true;
                        return false;
                    }
                });

            if ($("#natureBusiness").find("input:checked").length == 0) {
                hasError = true;
                $(".nature-business").removeClass("opacity-0 invisible");
                $(".nature-business").addClass("opacity-1 visible");
            } else {
                hasError = false;
                $(".nature-business").removeClass("opacity-1 visible");
                $(".nature-business").addClass("opacity-0 invisible");
            }

            if (
                hasError ||
                companyWebsite == "" ||
                companyEmail == "" ||
                companyPhone == "" ||
                yourName == "" ||
                numberEmployee == "" ||
                headqCity == ""
            ) {
                console.log("error");
                $("#claimCompanyForm").find(".valid-input").addClass("blurred");
            } else {
                console.log("success");
                $("#claimCompanyForm")[0].reset();
                $("#claimCompanyForm").find(".valid-input").removeClass("blurred");
                $("#claimSuccess").removeClass("hidden");
                $("#claimComp").addClass("hidden");
                setTimeout(() => {
                    $("#claimCompany").removeClass("modal-show");
                    $("body").removeClass("overflow-hidden");
                }, 3000);
            }
        });
    }

    //claim company profile modal
    $("#claimCompanyBtn").click(function () {
        let selectedRadio = $("#legalRep input[type=radio]:checked").attr("id");
        if (selectedRadio == "iOwner") {
            $("#legalRep").addClass("hidden");
            $("#investment").removeClass("hidden");
        }
        if (selectedRadio == "iWorkPT") {
            $("#legalRep").addClass("hidden");
            $("#claimComp").removeClass("hidden");
        }
        if (selectedRadio == "iKnowPT") {
            $("#legalRep").addClass("hidden");
            $("#claimComp").removeClass("hidden");
        }
    });
    $("#investbtnNext").click(function () {
        let selectedRadio = $("#investment input[type=radio]:checked").attr("id");
        if (selectedRadio == "investYes") {
            $("#investment").addClass("hidden");
            $("#investmentYes").removeClass("hidden");
        }
        if (selectedRadio == "investNo") {
            $("#investment").addClass("hidden");
            $("#claimComp").removeClass("hidden");
        }
    });
    $("#investbtnBack").click(function () {
        $("#legalRep").removeClass("hidden");
        $("#investment").addClass("hidden");
    });
    $("#investYesBack").click(function (e) {
        e.preventDefault();
        $("#investment").removeClass("hidden");
        $("#investmentYes").addClass("hidden");
    });
    $("#claimSaveBack").click(function (e) {
        e.preventDefault();
        $("#legalRep").removeClass("hidden");
        $("#claimComp").addClass("hidden");
    });

    // get connected form
    if ($("#getConnectedForm").length > 0) {
        let input = $("#getConnectedForm .valid-input");
        $(input).blur(function () {
            var inputLength = $(this).val().length;
            if (inputLength > 0) {
                $(this).addClass("blurred");
            }
        });
        $(input).keyup(function () {
            $(this).removeClass("blurred");
        });
        $(input).focus(function () {
            $(this).removeClass("blurred");
        });

        $("#getConnectedBtn").click(function (e) {
            e.preventDefault();
            var subject = $("#getConnectedForm #subject").val();
            var message = $("#getConnectedForm #message").val();
            var yourEmailID = $("#getConnectedForm #yourEmailID").val();
            var linkedinURL = $("#getConnectedForm #linkedinURL").val();
            var hasError = true;

            $("#getConnectedForm")
                .find(".valid-input")
                .each(function (i) {
                    var opacity = $(this).next().css("opacity");
                    if (opacity == 0) {
                        hasError = false;
                    } else {
                        hasError = true;
                        return false;
                    }
                });
            if (
                hasError ||
                subject == "" ||
                message == "" ||
                yourEmailID == "" ||
                linkedinURL == ""
            ) {
                console.log("error");
                $("#getConnectedForm").find(".valid-input").addClass("blurred");
            } else {
                console.log("success");
                $("#getConnectedForm")[0].reset();
                $("#getConnectedForm").find(".valid-input").removeClass("blurred");
                $("#connectedSuccess").removeClass("hidden");
                $("#getConnected").addClass("hidden");
                setTimeout(() => {
                    $("#getConnectedCompany").removeClass("modal-show");
                    $("body").removeClass("overflow-hidden");
                }, 3000);
            }
        });
        $("#whyConnectBtn").click(function () {
            $("#getConnected").removeClass("hidden");
            $("#whyConnected").addClass("hidden");
        });
        $("#getConnectedBack").click(function () {
            $("#whyConnected").removeClass("hidden");
            $("#getConnected").addClass("hidden");
        });
    }

    // web address
    if ($("#webAddress").length > 0) {
        $("#webSuccess").hide();
        let input = $("#webAddress .valid-input");
        $(input).blur(function () {
            var inputLength = $(this).val().length;
            if (inputLength > 0) {
                $(this).addClass("blurred");
            }
        });
        $(input).keyup(function () {
            $(this).removeClass("blurred");
        });
        $(input).focus(function () {
            $(this).removeClass("blurred");
        });

        $("#webAddress > button").click(function (e) {
            e.preventDefault();

            var hasError = true;

            $("#webAddress .valid-input").each(function (i) {
                var opacity = $(this).next().css("opacity");
                if (opacity == 0) {
                    hasError = false;
                } else {
                    hasError = true;
                    return false;
                }
            });
            if (hasError || input.val() == "") {
                console.log("error");
                $("#webAddress").find(".valid-input").addClass("blurred");
            } else {
                console.log(input.val());
                $("#webAddressBlock").hide();
                $("#webSuccess").show();
            }
        });
    }

    // ask Question
    if ($("#askQuestion").length > 0) {
        $("#questionSubmitted").hide();
        $("#viewMoreList").hide();
        $("#qaWrapper").hide();
        let input = $("#askQuestion .valid-input");
        $(input).blur(function () {
            var inputLength = $(this).val().length;
            if (inputLength > 0) {
                $(this).addClass("blurred");
            }
        });
        $(input).keyup(function () {
            $(this).removeClass("blurred");
        });
        $(input).focus(function () {
            $(this).removeClass("blurred");
        });

        $("#askQuestion  #questionSubmit").click(function (e) {
            e.preventDefault();

            var hasError = true;

            $("#askQuestion .valid-input").each(function (i) {
                var opacity = $(this).next().css("opacity");
                if (opacity == 0) {
                    hasError = false;
                } else {
                    hasError = true;
                    return false;
                }
            });
            if (hasError || input.val() == "") {
                console.log("error");
                $("#askQuestion").find(".valid-input").addClass("blurred");
            } else {
                let askedQuestion = input.val();
                $("#qaWrapper").show();
                $("#questionSubmit").hide();
                $("#questionSubmitted").show();
                setTimeout(function () {
                    $("#questionSubmitted").hide();
                    $("#questionSubmit").show();
                }, 2500);
                $("#askQuestion")[0].reset();
                $("#askQuestion").find(".valid-input").removeClass("blurred");
                $("#askQuestion").find(".count").text("0");
                let qdate = Date.today().toString("d-MMM-yyyy");
                let qtime = new Date().toString("h:mm:tt");
                let qdateTime = `${qtime} (${qdate})`;

                let question = `<div class="flex flex-col questionUnit">
                                <div class="flex flex-col md:flex-row md:items-center mb-1.5">
                                    <h5 class="flex-1 text-xs leading-2 text-blue-800 font-medium mb-2 md:mb-0">Hello. I'm Vladimir. I have an inquiry:</h5>
                                    <p class="text-xs text-blue-800 font-normal leading-2">${qdateTime}</p>
                                </div>
                                <form id="postAnswer">
                                    <a class="text-tiny text-teal-600 font-bold transition duration-200 hover:text-teal-700 leading-3" href="#">${askedQuestion}</a>
                                    <div class="relative mt-2">
                                        <textarea name="" id="" class="count-area answer-textarea valid-input border border-gray-300 focus:outline-none px-4 py-2.5 h-16 w-full resize-y" minlength="20" maxlength="600" required cols="30" rows="1"></textarea>
                                        <span class="block transition-opacity duration-200 opacity-0 invisible text-red-400 text-sm leading-xl mt-1 ">Minimum 20 characters please </span>
                                        <div class="absolute bottom-0 right-0 text-gray-500 text-sm leading-xl font-extralight"><span class="count">0</span> / 600</div>
                                    </div>
                                    <div class="mt-2 pb-7">
                                        <button id="postAnswerBtn" type="button" class="border border-teal-600 text-teal-600 hover:text-white hover:bg-teal-600 transition duration-200 text-center rounded text-md   h-7 px-3.5 ">Post Answer</button>
                                    </div>
                                </form>
                            </div>`;
                $("#questionList").prepend(question);
                postAnswerJS(askedQuestion, qdateTime);

                if ($(".answerUnit").length > 0) {
                    $(".questionUnit").removeClass("hasNoAnswer");
                } else {
                    $(".questionUnit").addClass("hasNoAnswer");
                }
            }
        });
    }

    // post Answer
    const postAnswerJS = (askedQuestion, qdateTime) => {
        if ($("#postAnswer").length > 0) {
            $(".count-area").keyup(function () {
                $(this).parent().find(".count").text($(this).val().length);
            });
            let input = $("#postAnswer .valid-input");
            $(input).blur(function () {
                var inputLength = $(this).val().length;
                if (inputLength > 0) {
                    $(this).addClass("blurred");
                }
            });
            $(input).keyup(function () {
                $(this).removeClass("blurred");
            });
            $(input).focus(function () {
                $(this).removeClass("blurred");
            });

            $("#postAnswerBtn")
                .closest("#postAnswer")
                .find("#postAnswerBtn")
                .click(function (e) {
                    e.preventDefault();
                    var hasError = true;
                    $(this)
                        .closest("#postAnswer")
                        .find(".valid-input")
                        .each(function (i) {
                            var opacity = $(this).next().css("opacity");
                            if (opacity == 0) {
                                hasError = false;
                            } else {
                                hasError = true;
                                return false;
                            }
                        });
                    if (hasError || input.val() == "") {
                        console.log("error");
                        $(this)
                            .closest("#postAnswer")
                            .find(".valid-input")
                            .addClass("blurred");
                    } else {
                        let givenAnswer = input.val();
                        $(this).closest("#postAnswer")[0].reset();
                        $(this)
                            .closest("#postAnswer")
                            .find(".valid-input")
                            .removeClass("blurred");
                        $(this).closest("#postAnswer").find(".count").text("0");

                        let adate = Date.today().toString("d-MMM-yyyy");
                        let atime = new Date().toString("h:mm:tt");
                        let adateTime = `${atime} (${adate})`;

                        let answer = ` <div class="flex-col answerUnit">
                    <div class="flex flex-col md:flex-row md:items-center mb-1.5">
                        <h5 class="flex-1 text-xs leading-2 mb-2 md:mb-0 text-blue-800 font-medium">Hello. I'm Vladimir. I have an inquiry:</h5>
                        <p class="text-xs text-blue-800 font-normal leading-2">${qdateTime}</p>
                    </div>
                    <div>
                        <a class="text-tiny text-teal-600 font-bold transition duration-200 hover:text-teal-700 leading-3" href="#">${askedQuestion}</a>
                        <p class="text-gray-600 mt-2 text-md leading-3">${givenAnswer}</p>
                        <div class="flex flex-col md:flex-row md:items-center mt-2">
                            <p class="text-xs text-red-900 mb-2 md:mb-0 leading-2">Answered by: Ingrid Sowyne</p>
                            <p class="text-xs text-red-900 leading-2 md:ml-auto">${adateTime}</p>
                        </div>
                    </div>
                </div>`;
                        $("#answerList").prepend(answer);
                        $(this).closest(".questionUnit").remove();
                        answerListJS();
                        $(".questionUnit").removeClass("hasNoAnswer");
                    }
                });
        }
    };

    // Answer List
    const answerListJS = () => {
        if ($("#answerList").length > 0) {
            let listNumber = $("#answerList > div").length;
            if (listNumber > 2) {
                $("#viewMoreList").show();
                $("#listLength").text(listNumber - 2);
                $("#answerList > div").each(function (index) {
                    if (index > 1) {
                        $(`#answerList > div:nth-child(${index + 1})`).hide();
                    }
                });
            }
            $("#viewMoreList").click(function (e) {
                $(this).hide();
                $("#answerList > div").each(function (index) {
                    $(`#answerList > div:nth-child(${index + 1})`).show();
                });
            });
        }
    };

    // Follow QA
    if ($("#followQA").length > 0) {
        $("#followingQA").hide();
        $("#followQA").click(function (e) {
            $(this).hide();
            $("#followingQA").show();
        });
        $("#followingQA").click(function (e) {
            $(this).hide();
            $("#followQA").show();
        });
    }

    // companyForm form
    if ($("#companyFormBlock").length > 0) {
        if ($("#noCompanyBtn").length > 0) {
            $("#noCompanyBtn").click(function (e) {
                $(this).addClass("active");
                $("#companyFormSuccess").hide();
                $("#companyFormBlock").fadeIn();
            });
            // $("#noCompanyBtn").mouseenter(function(e) {
            //     $(this).addClass("active");
            //     $("#companyFormSuccess").hide();
            //     $("#companyFormBlock").fadeIn();
            //     if ($('#cCountry .custom-select-tags').length == 0) {
            //         let selectedCountry = $("#slider input:checked").val();
            //         $(`#cCountry input#country-${selectedCountry}`).prop('checked', true);
            //         let checkedVal = `<div class="custom-select-tags">${selectedCountry}</div>`;
            //         $('#cCountry .custom-select-placehodler').hide();
            //         $('#cCountry .custom-select-tags-wrapper').prepend(checkedVal);
            //         $('#cCountry .custom-select').removeClass('input-empty');
            //     }
            // });
        }

        let input = $("#companyForm .valid-input");
        $(input).blur(function () {
            var inputLength = $(this).val().length;
            if (inputLength > 0) {
                $(this).addClass("blurred");
            }
        });
        $(input).keyup(function () {
            $(this).removeClass("blurred");
        });
        $(input).focus(function () {
            $(this).removeClass("blurred");
        });

        $(document).on("mouseenter", "#cCountry .custom-select", function (e) {
            e.stopPropagation();
            $(this)
                .closest(".custom-select-wrapper")
                .find(".custom-options")
                .fadeIn(100);
        });

        $("#companyFormBtn").click(function (e) {
            e.preventDefault();
            var name = $("#companyForm #cName").val();
            var country = $("#companyForm #cCountry .custom-select-tags");

            var email = $("#companyForm #cEmail").val();

            var hasError = true;

            if (country.length == 0) {
                $("#cCountryErr").removeClass("opacity-0 invisible");
            }

            $("#companyForm #cCountry input").on("change", function (e) {
                $("#cCountryErr").addClass("opacity-0 invisible");
            });

            $("#companyForm")
                .find(".valid-input")
                .each(function (i) {
                    var opacity = $(this).next().css("opacity");
                    if (opacity == 0) {
                        hasError = false;
                    } else {
                        hasError = true;
                        return false;
                    }
                });
            if (hasError || name == "" || email == "") {
                console.log("error");
                $("#companyForm").find(".valid-input").addClass("blurred");
            } else {
                console.log("success");
                $("#companyForm")[0].reset();
                $("#companyForm").find(".valid-input").removeClass("blurred");
                $("#companyFormBlock").hide();
                $("#companyFormSuccess").fadeIn();
                setTimeout(function () {
                    $("#companyFormSuccess").fadeOut();
                    $("#noCompanyBtn").removeClass("active");
                }, 3000);
            }
        });
        $("#closeCompanyForm").click(function (e) {
            $("#companyFormBlock").fadeOut();
            $("#noCompanyBtn").removeClass("active");
        });
    }

    // new header main product show
    if ($("#companyInfoBlock").length > 0) {
        function disableCompanyBtn() {
            if ($("#productSelectedTags li").length > 0) {
                $("#companyInfoBtn").prop("disabled", false);
                $("#productSearchBtn").fadeOut();
            } else {
                $("#companyInfoBtn").prop("disabled", true);
                $("#productSearchBtn").fadeIn();
            }
        }

        $("#companyMainProduct #productInput").on("input", function () {
            var val = this.value.toLowerCase();
            $("#companyProductList")
                .find("li")
                .filter(function () {
                    return $(this).data("id").toLowerCase().indexOf(val) > -1;
                })
                .show()
                .end()
                .filter(":visible")
                .filter(function () {
                    return $(this).data("id").toLowerCase().indexOf(val) === -1;
                })
                .hide();
        });

        $("#companyMainProduct #productInput").on("keyup", function () {
            if ($(this).val().length > 2) {
                $("#companyProductList").fadeIn(100);
            } else {
                $("#companyProductList").fadeOut(100);
            }
        });

        $(document).on("click", ".remove-product", function (e) {
            $(this).closest("li").remove();
            let listName = $(this).closest("li").find("span").html();
            let listTag = `<li data-id="${listName}" class="cursor-pointer block px-[13px] py-[2px] text-md text-teal-600 text-left truncate border-b border-gray-200 hover:bg-gray-100 duration-150">${listName}</li>`;
            $("#companyProductList").append(listTag);
            $("#moreProductSuggestions").fadeOut();
            disableCompanyBtn();
        });

        $(document).on("click", ".remove-suggestions", function (e) {
            $(this).closest("li").remove();
            let listName = $(this).closest("li").find("span").html();
            let listTag = `<li>
                            <a class="flex items-center" href="javascript:;"> <img class="mr-1" src="../assets/images/client-admin/plus.svg" alt="icon"> <span>${listName}</span> </a>
                        </li>`;
            $("#moreProductSuggestions ul").append(listTag);
            disableCompanyBtn();
        });

        $(document).on("click", "#companyProductList li", function (e) {
            let productTagName = $(this).html();
            $(this).remove();
            let productTag = `<li class="product-tag">
                            <span class="block mr-3.5 text-base text-neutral-800">${productTagName}</span>
                            <button class="remove-product remove-item">
                                <img src="assets/images/close-sm.svg" alt="close"/>
                            </button>
                        </li>`;
            $("#productSelectedTags").append(productTag);
            $("#productInput").val("");
            $("#companyProductList").fadeOut(100);
            $("#loadingProduct").fadeIn();
            $("#moreProductSuggestions").hide();
            setTimeout(function () {
                $("#loadingProduct").hide();
                $("#moreProductSuggestions").fadeIn();
            }, 2000);
            disableCompanyBtn();
        });

        $(document).on("click", "#moreProductSuggestions li a", function (e) {
            let productName = $(this).find("span").html();
            $(this).closest("li").remove();
            let product = `<li class="product-tag">
                            <span class="block mr-3.5 text-base text-neutral-800">${productName}</span>
                            <button class="remove-suggestions remove-item">
                                <img src="assets/images/close-sm.svg" alt="close"/>
                            </button>
                        </li>`;
            $("#productSelectedTags").append(product);
        });
    }

    // Helpful Message
    if ($("#helpSection").length > 0) {
        $("#helpfulYes").click(function (e) {
            $("#helpfulBlock").hide();
            $("#helpfulThanks").show();
        });
        $("#helpfulNo").click(function (e) {
            $("#helpfulBlock").hide();
            $("#helpfulMessage").show();
        });

        let input = $("#helpfulMessage .valid-input");
        $(input).blur(function () {
            var inputLength = $(this).val().length;
            if (inputLength > 0) {
                $(this).addClass("blurred");
            }
        });
        $(input).keyup(function () {
            $(this).removeClass("blurred");
        });
        $(input).focus(function () {
            $(this).removeClass("blurred");
        });

        $("#helpMsgSubmit").click(function (e) {
            e.preventDefault();
            var message = $("#helpfulMessage #helpMsg").val();
            var hasError = true;

            $("#helpfulMessage")
                .find(".valid-input")
                .each(function (i) {
                    var opacity = $(this).next().css("opacity");
                    if (opacity == 0) {
                        hasError = false;
                    } else {
                        hasError = true;
                        return false;
                    }
                });
            if (hasError || message == "") {
                console.log("error");
                $("#helpfulMessage").find(".valid-input").addClass("blurred");
            } else {
                console.log("success", message);
                $("#helpfulMessage form")[0].reset();
                $("#helpfulMessage").find(".valid-input").removeClass("blurred");
                $("#helpfulMessage").hide();
                $("#helpfulThanks").fadeIn();
            }
        });
    }

    // pagination js
    if ($("#result").length > 0) {
        paginator({
            table: document.getElementById("result"),
            box: document.getElementById("resultIndex"),
            active_class: "pagination-active",
            rows_per_page: 15,
        });
    }

    // inquiry form
    if ($("#sendInquiryBlock").length > 0) {
        if ($("#inquiryBtn").length > 0) {
            $("#inquiryBtn").click(function (e) {
                $(this).addClass("active");
                $("#sendInquiryBlock").fadeIn();
            });
        }

        jQuery.extend(jQuery.expr[":"], {
            invalid: function (elem, index, match) {
                var invalids = document.querySelectorAll(":invalid"),
                    result = false,
                    len = invalids.length;

                if (len) {
                    for (var i = 0; i < len; i++) {
                        if (elem === invalids[i]) {
                            result = true;
                            break;
                        }
                    }
                }
                return result;
            },
        });

        var mobileID = $("#sendInquiryForm #enquiryMobile");
        let input = $("#sendInquiryForm .valid-input");
        $(input).blur(function () {
            var inputLength = $(this).val().length;
            if (inputLength > 0) {
                $(this).addClass("blurred");
            }
        });
        $(mobileID).blur(function () {
            var mobileLength = $(mobileID).val().length;
            if (mobileLength > 0) {
                $(this).addClass("blurred");
                if ($(mobileID).is(":invalid")) {
                    console.log("invalid");
                    $("#enquiryMobileErr")
                        .removeClass("opacity-0 invisible")
                        .addClass("opacity-100 visible");
                }
            }
        });
        $(input).keyup(function () {
            $(this).removeClass("blurred");
        });
        $(mobileID).keyup(function () {
            $(this).removeClass("blurred");
            $("#enquiryMobileErr")
                .removeClass("opacity-100 visible")
                .addClass("opacity-0 invisible");
        });
        $(input).focus(function () {
            $(this).removeClass("blurred");
        });
        $(mobileID).focus(function () {
            $(this).removeClass("blurred");
            $("#enquiryMobileErr")
                .removeClass("opacity-100 visible")
                .addClass("opacity-0 invisible");
        });

        function showErr(id) {
            $(id).next().removeClass("opacity-0 invisible");
            $(id).next().addClass("opacity-1 visible");
        }

        function removeErr(id) {
            $(id).next().removeClass("opacity-1 visible");
            $(id).next().addClass("opacity-0 invisible");
        }

        $("#inquiryInterest").on("change", function () {
            var ID = $(this);
            if (ID.val() == "") {
                showErr(ID);
            } else {
                removeErr(ID);
            }
        });

        $("#inquiryFormBtn").click(function (e) {
            e.preventDefault();
            var name = $("#sendInquiryForm #inquiryName").val();
            var email = $("#sendInquiryForm #inquiryEmail").val();
            var mobile = $("#sendInquiryForm #enquiryMobile").val();
            var interest = $("#sendInquiryForm #inquiryInterest").val();
            var interestID = $("#sendInquiryForm #inquiryInterest");

            checkSelectVal(interest, interestID);
            checkSelectVal(mobile, mobileID);

            var hasError = true;

            $("#sendInquiryForm")
                .find(".valid-input")
                .each(function (i) {
                    var opacity = $(this).next().css("opacity");
                    if (opacity == 0) {
                        hasError = false;
                    } else {
                        hasError = true;
                        return false;
                    }
                });
            if (
                hasError ||
                name == "" ||
                email == "" ||
                mobile == "" ||
                interest == ""
            ) {
                console.log("error");
                $("#sendInquiryForm").find(".valid-input").addClass("blurred");
                if ($("#sendInquiryForm #enquiryMobile").is(":invalid")) {
                    $("#enquiryMobileErr")
                        .removeClass("opacity-0 invisible")
                        .addClass("opacity-100 visible");
                }
            } else {
                console.log("success");
                $("#sendInquiryForm")[0].reset();
                $("#sendInquiryForm").find(".valid-input").removeClass("blurred");
                $("#sendInquiryBlock").hide();
                $("#inquirySuccess").fadeIn();
                setTimeout(function () {
                    $("#inquirySuccess").fadeOut();
                    $("#inquiryBtn").removeClass("active");
                }, 3000);
            }

            function checkSelectVal(selectVal, selectID) {
                if (selectVal == "") {
                    showErr(selectID);
                    hasError = true;
                } else {
                    removeErr(selectID);
                    hasError = false;
                }
            }
        });
        $("#enquiryMobile").intlTelInput();
        $("#closeInquiryBtn").click(function (e) {
            $("#sendInquiryBlock").fadeOut();
            $("#inquiryBtn").removeClass("active");
        });
    }

    // View More on Detail page Table Content
    if ($("#viewMoreData").length > 0 && $("#dataContent").length > 0) {
        $("#viewMoreData").click(function () {
            $(this).hide();
            $("#dataContent").removeClass("hidden");
        });
    }

    // Cookies Button
    if ($("#cookiesBtn").length > 0 && $("#cookiesBlock").length > 0) {
        $("#cookiesBtn").click(function () {
            $(cookiesBlock).fadeOut();
        });
    }

    // View More on Detail page Lock Contenct
    if ($("#showMoreDetails").length > 0 && $("[data-lock]").length > 0) {
        $("#showMoreDetails").click(function () {
            $(this).closest(".absolute").hide();
            $("[data-lock]").removeClass("hidden").addClass("flex");
        });
    }

    // Custom Muti Select and Single Select Options
    if ($(".custom-select-wrapper").length > 0) {
        $(document).on("click", function () {
            $(".custom-options").fadeOut(100);
        });

        $(document).on("click", ".custom-options", function (e) {
            e.stopPropagation();
        });

        $(document).on("change", ".radio-theme input", function () {
            $(".custom-options").fadeOut(100);
        });

        $(document).on("click", ".option-placeholder", function () {
            $(this)
                .closest(".custom-select-wrapper")
                .find(".custom-select-placehodler")
                .show();
            $(this)
                .closest(".custom-select-wrapper")
                .find(".custom-options input:checked")
                .prop("checked", false);
            $(this)
                .closest(".custom-select-wrapper")
                .find(".custom-select-count")
                .text("");
            $(this)
                .closest(".custom-select-wrapper")
                .find(".custom-select-tags")
                .remove();
            $(".custom-options").fadeOut(100);
        });

        $(document).on("change", ".custom-options input", function (e) {
            e.stopPropagation();
            let allChecked = [];
            $(this)
                .closest(".custom-select-wrapper")
                .find(".custom-options input:checked")
                .each(function () {
                    allChecked.push($(this).val());
                });
            $(this)
                .closest(".custom-select-wrapper")
                .find(".custom-select-tags")
                .remove();
            if (allChecked.length > 0) {
                let placehodlerText = $(this)
                    .closest(".custom-select-wrapper")
                    .find(".custom-select-placehodler")
                    .text();
                if (allChecked[0] !== "") {
                    let firstChecked = `<div class="custom-select-tags">${allChecked[0]}</div>`;
                    $(this)
                        .closest(".custom-select-wrapper")
                        .find(".custom-select-placehodler")
                        .hide();
                    $(this)
                        .closest(".custom-select-wrapper")
                        .find(".custom-select-tags-wrapper")
                        .prepend(firstChecked);
                    $(this)
                        .closest(".custom-select-wrapper")
                        .find(".custom-select-count")
                        .text("");
                    $(this)
                        .closest(".custom-select-wrapper")
                        .find(".custom-select")
                        .removeClass("input-empty");
                } else {
                    $(this)
                        .closest(".custom-select-wrapper")
                        .find(".custom-select-placehodler")
                        .show();
                    $(this)
                        .closest(".custom-select-wrapper")
                        .find(".custom-select-placehodler")
                        .text(placehodlerText);
                }
            }
            if (allChecked.length > 1) {
                $(this)
                    .closest(".custom-select-wrapper")
                    .find(".custom-select-count")
                    .text(`+${allChecked.length - 1}`);
            }
            if (allChecked.length == 0) {
                $(this)
                    .closest(".custom-select-wrapper")
                    .find(".custom-select-placehodler")
                    .show();
                $(this)
                    .closest(".custom-select-wrapper")
                    .find(".custom-select")
                    .addClass("input-empty");
            }
        });

        $(document).on("click", ".custom-select", function (e) {
            e.stopPropagation();
            $(".custom-options").fadeOut(100);
            if (
                $(this)
                    .closest(".custom-select-wrapper")
                    .find(".custom-options")
                    .css("display") == "block"
            ) {
                $(this)
                    .closest(".custom-select-wrapper")
                    .find(".custom-options")
                    .fadeOut(100);
            } else {
                $(this)
                    .closest(".custom-select-wrapper")
                    .find(".custom-options")
                    .fadeIn(100);
            }
        });
    }

    // Switch Report Detail page
    if ($("#switchReport").length > 0) {
        if (window.innerWidth > 768) {
            $(document).on(
                "mouseenter",
                "#switchReport .custom-select",
                function (e) {
                    e.stopPropagation();
                    let options = $(this)
                        .closest(".custom-select-wrapper")
                        .find(".custom-options");
                    options.fadeIn(100);
                    $("#reportOverlay").fadeIn(100);
                }
            );

            $(document).on(
                "change",
                "#switchReport .custom-options input",
                function (e) {
                    e.stopPropagation();
                    $("#reportOverlay").fadeOut(100);
                }
            );

            $(document).on("click", function (e) {
                e.stopPropagation();
                $("#reportOverlay").fadeOut(100);
            });
        }
    }

    //sample reports
    $(".sample-report-list").click(function (e) {
        let id = this.getAttribute("id");
        $(".sample-report-list").removeClass("text-blue-700 font-bold");
        $(`#${id}`).addClass("text-blue-700 font-bold");
        $(`[data-id="${id}"]`).siblings().addClass("hidden");
        $(`[data-id="${id}"]`).removeClass("hidden");
    });
});

// Paginator JS Config
var reverseFlow;

function paginationClick(index) {
    if (index == 1) {
        reverseFlow = false;
    }

    if (index == 4) {
        reverseFlow = true;
    }

    if (reverseFlow) {
        $("#resultIndex button:first-child").show();
        $("#resultIndex button:last-child").hide();
    } else {
        $("#resultIndex button:first-child").hide();
        $("#resultIndex button:last-child").show();
    }
}

//#region loader
window.addEventListener("load", function () {
    let loader = document.getElementById("loader");
    if (loader !== null && loader !== null) {
        loader.classList.add("hidden");
    }
});
//#end region

//#region active class on click platform card
const platformCard = document.querySelectorAll("#platform .platform-card");

platformCard.forEach((el) =>
    el.addEventListener("click", function () {
        platformCard.forEach((el) => el.classList.remove("active"));
        el.classList.add("active");
    })
);

// currency toggler
const currencyToggler = document.querySelectorAll(".currency-toggler");

currencyToggler.forEach((el) =>
    el.addEventListener("click", function () {
        currencyToggler.forEach((el) => el.classList.remove("active"));
        el.classList.add("active");
    })
);

// dropdown menu
let dropdownMenu = document.querySelectorAll("header .dropdown-menu a");
let dropdownText = document.querySelectorAll("header .dropdown-text span");
let backdrop = document.querySelectorAll("header .dropdown-backdrop");
let dropdownButton = document.querySelectorAll("header .dropdown-btn");
window.addEventListener("load", function (e) {
    // check default dropdown value
    document
        .querySelectorAll("header nav .desktop-search-menu .dropdown-menu a")
        .forEach((elm) => {
            if (
                elm.innerHTML.toLowerCase().trim() ===
                elm.parentElement.parentElement.parentElement
                    .querySelector(".dropdown-text span")
                    .innerText.toLowerCase()
                    .trim()
            ) {
                elm.classList.add("hidden");
            }
        });

    document
        .querySelectorAll("header .mobile-search-menu .dropdown-menu a")
        .forEach((elm) => {
            if (
                elm.innerHTML.toLowerCase().trim() ===
                elm.parentElement.parentElement.parentElement
                    .querySelector(".dropdown-text span")
                    .innerText.toLowerCase()
                    .trim()
            ) {
                elm.classList.add("hidden");
            }
        });
    // on click
    dropdownMenu.forEach((el) => {
        // on dropdown click
        el.addEventListener("click", function (e) {
            dropdownMenu.forEach((elm) => elm.classList.remove("hidden"));
            dropdownText.forEach((elm) => (elm.textContent = el.textContent));
            el.parentElement.parentElement.style.visibility = "hidden";
            el.parentElement.parentElement.style.opacity = "0";
            backdrop.forEach((elm) => (elm.style.visibility = "hidden"));
            el.parentElement.parentElement.classList.add("invisible");
            el.parentElement.parentElement.classList.add("hidden");
            el.classList.add("hidden");
        });
    });

    // on hover
    dropdownButton.forEach((elm) =>
        elm.addEventListener("mouseover", function (e) {
            dropdownMenu.forEach((el) => {
                el.parentElement.parentElement.style.visibility = "";
                el.parentElement.parentElement.style.opacity = "";
                el.parentElement.parentElement.classList.remove("hidden");
            });
            // backdrop
            backdrop.forEach((elm) => (elm.style.visibility = ""));
        })
    );
});

// toggle input field
let showInput = document.querySelectorAll("form .show-field");
let detailField = document.querySelectorAll("form .detail-field");
let showDetailField = document.getElementById("hideDetailField");
let saveButton = document.querySelector("form .save-btn");
showInput.forEach((elm) =>
    elm.addEventListener("click", function (e) {
        showInput.forEach((element) => element.classList.add("hidden"));
        detailField.forEach((el) => {
            if (el.parentElement.querySelector("input").value == "") {
                el.classList.remove("hidden");
                if (showDetailField || saveButton) {
                    saveButton.classList.remove("hidden");
                    showDetailField.classList.remove("hidden");
                }
            }
        });
    })
);

if (showDetailField) {
    showDetailField.addEventListener("click", function () {
        saveButton.classList.add("hidden");
        showDetailField.classList.add("hidden");
        detailField.forEach((el) => {
            el.classList.add("hidden");
            el.parentElement.querySelector(".error").classList.add("hidden");
            if (
                el.parentElement.parentElement
                    .querySelector(".input-text")
                    .classList.contains("hidden")
            ) {
                el.parentElement.parentElement
                    .querySelector(".show-field")
                    .classList.remove("hidden");
                el.parentElement.parentElement.querySelector("input").value = "";
            }
        });
    });
}
//#end region

//#region
// form validation
let submitButton = document.getElementById("submitAddress");
if (saveButton) {
    submitButton.addEventListener("submit", function (e) {
        e.preventDefault();

        let cityOrLocation = document.submitAddress.cityOrLocation.value;
        let productsAndServices = document.submitAddress.productsAndServices.value;
        let businessWhatsApp = document.submitAddress.businessWhatsApp.value;

        document.submitAddress.cityOrLocation.parentElement
            .querySelector(".error")
            .classList.add("hidden");
        document.submitAddress.productsAndServices.parentElement
            .querySelector(".error")
            .classList.add("hidden");
        document.submitAddress.businessWhatsApp.parentElement
            .querySelector(".error")
            .classList.add("hidden");
        if (cityOrLocation === "") {
            document.submitAddress.cityOrLocation.parentElement
                .querySelector(".error")
                .classList.remove("hidden");
        }
        if (productsAndServices === "") {
            document.submitAddress.productsAndServices.parentElement
                .querySelector(".error")
                .classList.remove("hidden");
        }
        if (businessWhatsApp === "") {
            document.submitAddress.businessWhatsApp.parentElement
                .querySelector(".error")
                .classList.remove("hidden");
        }
        // if all empty
        if (
            cityOrLocation === "" &&
            productsAndServices === "" &&
            businessWhatsApp === ""
        ) {
            document.submitAddress
                .querySelectorAll(".error")
                .forEach((el) => el.classList.remove("hidden"));
        } else {
            showInput.forEach((el) => {
                if (
                    cityOrLocation !== "" &&
                    productsAndServices !== "" &&
                    businessWhatsApp !== ""
                ) {
                    if (showDetailField || saveButton) {
                        saveButton.classList.add("hidden");
                        showDetailField.classList.add("hidden");
                    }
                }
                el.parentElement.querySelector(".input-text").textContent =
                    el.parentElement.querySelector("input").value;
                if (el.parentElement.querySelector("input").value == "") {
                    if (showDetailField || saveButton) {
                        saveButton.classList.remove("hidden");
                        showDetailField.classList.remove("hidden");
                    }
                } else {
                    el.parentElement
                        .querySelectorAll(".detail-field")
                        .forEach((el) => el.classList.add("hidden"));
                    el.parentElement
                        .querySelector(".input-text")
                        .classList.remove("hidden");
                }
            });
        }
    });
}

// select one checkbox
let checkbox = document.querySelectorAll(".company-detail-checkbox");

checkbox.forEach((el) =>
    el.addEventListener("click", function (e) {
        let someChecked = Array.from(checkbox)
            .map((el) => el)
            .some((el) => el.checked);
        if (!someChecked) {
            el.checked = true;
        }
    })
);

// #end region

// company search
let companySearch = document.querySelectorAll("input.company-search");
let companySearchMenu = document.querySelectorAll("input.company-search-menu");
let companyList = document.querySelectorAll("ul.company-menu li a");
let companyResultList = document.querySelectorAll("ul.company-menu-list li a");
let searchBackdrop = document.getElementById("dropdownBackdrop");
let searchButton = document.getElementById("searchButton");
let companyMenuError = document.querySelector(".company-menu-error");


// hide when click on the body
document.documentElement.addEventListener("click", function () {

    document.querySelectorAll(".company-menu").forEach((elm) => {
        if (elm.classList.contains("show")) {
            elm.classList.remove("show");
           searchBackdrop.classList.remove("dropdown-show");
        }
    });

    // company menu list
    document.querySelectorAll(".company-menu-list").forEach((elm) => {
        companyMenuError.classList.remove("show"); 
        searchBackdrop.classList.remove("dropdown-show");
        if (elm.classList.contains("show")) {
            elm.classList.remove("show");
        }
    });
});

//company Search
companySearch.forEach((el) =>
    el.addEventListener("input", function (e) {
        let dropdownList = document.querySelectorAll(".company-menu");
        if (e.target.value.length > 0) {
            dropdownList.forEach((el) => el.classList.add("show"));
            searchBackdrop.classList.add("dropdown-show");
        } else {
          searchBackdrop.classList.remove("dropdown-show");
            dropdownList.forEach((el) => el.classList.remove("show"));
        }
    })
);

// #region
// if company list
companyList.forEach((el) =>
    el.addEventListener("click", function (e) {
        companySearch.forEach((el) => (el.value = e.target.innerText));
        document
            .querySelectorAll(".company-menu")
            .forEach((el) => el.classList.remove("show"));
        searchBackdrop.classList.remove("dropdown-show");
        e.stopPropagation();
    })
);
// #end region

// #region
// if result list
companyResultList.forEach((el) =>
    el.addEventListener("click", function (e) {
        companySearchMenu.forEach((el) => (el.value = e.target.innerText));
        document
            .querySelectorAll(".company-menu-list")
            .forEach((el) => el.classList.remove("show"));
      searchButton.classList.add("hidden");
      searchBackdrop.classList.remove("dropdown-show");
        e.stopPropagation();
    })
);

// company searchMenu
companySearchMenu.forEach((el) =>{
    el.addEventListener("input", function (e) {
        let dropdownList = document.querySelectorAll(".company-menu-list");
        if (e.target.value.length> 0 && e.target.value.length < 3){
            searchBackdrop.classList.add("dropdown-show");
            companyMenuError.classList.add("show"); 
            dropdownList.forEach((el) => el.classList.remove("show"));
            searchButton.classList.add("hidden");
        }
        else if (e.target.value.length >= 3) {
            searchBackdrop.classList.add("dropdown-show");
            dropdownList.forEach((el) => el.classList.add("show"));
            searchButton.classList.add("hidden");
            companyMenuError.classList.remove("show"); 
        } else {
            dropdownList.forEach((el) => el.classList.remove("show"));
            searchButton.classList.remove("hidden");
            companyMenuError.classList.remove("show"); 
            searchBackdrop.classList.remove("dropdown-show");
        }
    })

    el.addEventListener("focus", ()=> el.classList.add("placeholder-opacity-0"));
    el.addEventListener("blur", ()=> el.classList.remove("placeholder-opacity-0"));

}
);
// #end region

// form block
const handleSearchCompany = document.getElementById("handleSearchCompany");
const companySearchFormBlock = document.getElementById(
    "companySearchFormBlock"
);
const hideCompanyForm = document.getElementById("hideCompanyForm");
const searchCompanySubmitBtn = document.getElementById("searchCompanySubmitBtn");
const companySearchForm = document.getElementById("companySearchForm");
let charOnlyInput = document.querySelectorAll(
    "#companySearchFormBlock .char-only-input"
);

// show form
if (handleSearchCompany) {
    handleSearchCompany.addEventListener("click", function (event) {
        handleSearchCompany.classList.add("text-opacity-60","cursor-default");
        handleSearchCompany.classList.remove("cursor-pointer");
        companySearchFormBlock.classList.remove("hidden");
        searchCompanySubmitBtn.removeAttribute("disabled");
        searchCompanySubmitBtn.style.opacity = '';
    });
}

// hide form
if (hideCompanyForm) {
    hideCompanyForm.addEventListener("click", function () {
        companySearchFormBlock.classList.add("hidden");
        handleSearchCompany.classList.remove("text-opacity-60","cursor-default");
        handleSearchCompany.classList.add("cursor-pointer");
    });
}

// allow char-only

charOnlyInput.forEach((el) =>
    el.addEventListener("keypress", (event) => {
        let regex = new RegExp("^[A-Za-z -]+$");
        let key = String.fromCharCode(
            !event.charCode ? event.which : event.charCode
        );
        if (!regex.test(key)) {
            event.preventDefault();
            return false;
        }
    })
);

// check on input 

document.querySelectorAll("#companySearchForm input[type='text']").forEach((el) => {
    el.addEventListener("input", (e) => {
        if (el.value.length >= 5) {
            el.parentElement
                .querySelector(".error-text")
                .classList.remove("visible", "opacity-100");
            el.parentElement
                .querySelector(".error-text")
                .classList.add("invisible", "opacity-0");
        }
    });
});

// check email address
if(document.querySelector("#companySearchForm input[type='email']")){
document.querySelector("#companySearchForm input[type='email']").addEventListener("input", function(e){
    let mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
if (e.target.value.match(mailFormat)) {
    document
        .getElementById("companyEmail")
        .parentElement.querySelector(".error-text")
        .classList.remove("visible", "opacity-100");
    document
        .getElementById("companyEmail")
        .parentElement.querySelector(".error-text")
        .classList.add("invisible", "opacity-0");

}
});
}


// company search form on submit
if (companySearchForm) {
    companySearchForm.addEventListener("submit", function (e) {
        e.preventDefault();
        let companyEmail = document.forms.companySearchForm.companyEmail.value;
        let companyRegistration =
            document.forms.companySearchForm.companyRegistration.value;
        let companyName = document.forms.companySearchForm.companyName.value;
        let mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (
            companyEmail === "" &&
            companyRegistration === "" &&
            companyName === ""
        ) {
            document
                .querySelectorAll("#companySearchForm .error-text")
                .forEach((el) => {
                    el.classList.add("visible", "opacity-100");
                    el.classList.remove("invisible", "opacity-0");
                });
        } else if (
            companyEmail !== "" &&
            companyEmail.length >= 5 &&
            companyRegistration !== "" &&
            companyRegistration.length >= 5 &&
            companyName !== "" &&
            companyName.length >= 5
        ) {
            // remove error class
            document
                .querySelectorAll("#companySearchForm .error-text")
                .forEach((el) => {
                    el.classList.remove("visible", "opacity-100");
                    el.classList.add("invisible", "opacity-0");
                });
            // check email is valid
            if (!companyEmail.match(mailFormat)) {
                document
                    .getElementById("companyEmail")
                    .parentElement.querySelector(".error-text")
                    .classList.add("visible", "opacity-100");
                document
                    .getElementById("companyEmail")
                    .parentElement.querySelector(".error-text")
                    .classList.remove("invisible", "opacity-0");

                return false;
            }

            companySearchForm.reset();

            // hide form
            setTimeout(() => companySearchFormBlock.classList.add("hidden"), 100)
            handleSearchCompany.classList.remove("text-opacity-60","cursor-default");
            handleSearchCompany.classList.add("cursor-pointer");
            searchCompanySubmitBtn.setAttribute("disabled", '');
            searchCompanySubmitBtn.style.opacity = '0.5';
            //  show success message
            const successMessage = document.getElementById("successMessage");
            setTimeout(() => successMessage.classList.remove("hidden"), 500);
            setTimeout(() => successMessage.classList.add("invisible"), 1300);
            setTimeout(() => successMessage.classList.remove("invisible"), 2100);
            setTimeout(() => successMessage.classList.add("hidden"), 4000);
        } else {
            // check input field
            document.querySelectorAll("#companySearchForm input").forEach((el) => {
                if (el.value == "" || el.value.length < 5) {
                    el.parentElement
                        .querySelector(".error-text")
                        .classList.add("visible", "opacity-100");
                    el.parentElement
                        .querySelector(".error-text")
                        .classList.remove("invisible", "opacity-0");
                } else {
                    el.parentElement
                        .querySelector(".error-text")
                        .classList.add("invisible", "opacity-0");
                }
            });

            // check email is valid
            if (!companyEmail.match(mailFormat)) {
                document
                    .getElementById("companyEmail")
                    .parentElement.querySelector(".error-text")
                    .classList.add("visible", "opacity-100");
                document
                    .getElementById("companyEmail")
                    .parentElement.querySelector(".error-text")
                    .classList.remove("invisible", "opacity-0");

                return false;
            }
        }
    });
}

// #end region

function getTotal(){
    // Step 1: Select all elements containing USD amounts
const usdElements = document.querySelectorAll('.company-detail .flex.items-baseline .font-bold');

// Step 2: Extract USD amounts from each element and convert them to numbers
let totalUSD = 0;
usdElements.forEach(element => {
    const text = element.textContent.trim(); // Get the text content
    const usdMatch = text.match(/\d+/); // Extract the USD amount
    if (usdMatch) {
        const usdAmount = parseFloat(usdMatch[0]); // Convert it to a number
        totalUSD += usdAmount; // Add the amount to the total
    }
});

// Step 1: Select the element containing the total USD amount
const totalElement = document.getElementById('total');

// Step 2: Update the content of the element with the new total USD amount

totalElement.textContent = `US$ ${totalUSD}`;
}


// Function to update the content of the span element
function updateSpecs() {
    // Count the number of companies (div elements with id="product")
    var companyCount = document.querySelectorAll('#product').length;

    // Count the number of reports (div elements with class="flex items-baseline")
    var reportCount = document.querySelectorAll('.flex.items-baseline').length;

    // Update the content of the span element
    var specsSpan = document.getElementById('specs');
    specsSpan.textContent = '(' + reportCount + ' reports from ' + companyCount + ' companies)';
}


window.addEventListener('load', function() {
    // Call the function when the load event occurs
    //console.log(window.location.pathname);
    if (window.location.pathname === '/checkout/') {
    getTotal();
    updateSpecs();



    let companyDetail = document.querySelectorAll("#checkout .company-detail");
    let isAllDeleted = companyDetail.length === 0;

    //console.log(companyDetail)
    if (isAllDeleted) {
        document.getElementById("emptyCart").classList.remove("hidden");
        document.getElementById("placeOrder").classList.add("disabled");
        document.getElementById("anotherReport").classList.add("disabled");
        setTimeout(() => window.location.href = "/", 550);
    }
    }
});

//#region checkout

const checkoutDeleteButton = document.querySelectorAll("#checkout .delete-list");

checkoutDeleteButton.forEach(el => el.addEventListener("click", function(e) {
    let companyDetail = document.querySelectorAll("#checkout .company-detail");
    // Remove the parent element instead of hiding it
    el.parentElement.parentElement.parentElement.remove();
    // Check if there are any elements left in companyDetail
    let isAllDeleted = companyDetail.length === 1;
    getTotal();
    updateSpecs();

    if (isAllDeleted) {
        document.getElementById("emptyCart").classList.remove("hidden");
        document.getElementById("placeOrder").classList.add("disabled");
        document.getElementById("anotherReport").classList.add("disabled");
        setTimeout(() => window.location.href = "/", 550);
    }
}));


// #end region

// #region add to cart 
const matchingCompaniesCartBtn = document.querySelectorAll("#matchingCompanies .cart-btn");

matchingCompaniesCartBtn.forEach(el=> el.addEventListener('click',function(e){
el.className  = "text-gray-400 w-24";
el.textContent = "Added";
}));



