$(document).ready(function() {
    // show product detail for mobile
    if ($('[data-list="product"]').length > 0 && $('[data-sidebar="product"]').length > 0) {
        $('[data-list="product"]').click(function(e) {
            // e.stopPropagation();
            $("html").addClass("overflow-hidden");
            $('[data-sidebar="product"]').addClass('active');
        })
        $(document).on('click', '[data-sidebar="product"]', function() {
            $(this).addClass('removing');
            $("html").removeClass("overflow-hidden");
            setTimeout(() => {
                $(this).removeClass('removing');
                $(this).removeClass('active');
            }, 200);
        });
        $(document).on('click', '[data-dismiss="productModal"]', function() {
            $('[data-sidebar="product"]').addClass('removing');
            $("html").removeClass("overflow-hidden");
            setTimeout(() => {
                $('[data-sidebar="product"]').removeClass('removing');
                $('[data-sidebar="product"]').removeClass('active');
            }, 200);
        });
        $(document).on('click', '[data-sidebar="product"] > div', function(e) {
            e.stopPropagation();
        });
    }
    // Show Request Form
    if ($('#requestBtn').length > 0) {
        $('#requestBtn').click(function() {
            $(this).hide();
            $('#requestForm').fadeIn();
        })
    }
    // Show Requirement Block
    if ($('#requirementBtn').length > 0 && $('#requirementBlock').length > 0) {
        $('#requirementBtn').click(function() {
            $(this).hide();
            $('#requirementBlock').fadeIn();
        })
        $('#requirementCancelBtn').click(function() {
            $('#requirementBlock').hide();
            $('#requirementBtn').fadeIn();
        })
    }

    // show product detail for mobile
    if ($('[data-btn="inquiry-form"]').length > 0 && $('[data-form="inquiry-form"]').length > 0) {
        $('[data-btn="inquiry-form"]').click(function(e) {
            e.stopPropagation();
            $('[data-form="inquiry-form"]').addClass('active');
        })
        $(document).on('click', '[data-form="inquiry-form"]', function() {
            $(this).addClass('removing');
            setTimeout(() => {
                $(this).removeClass('removing');
                $(this).removeClass('active');
            }, 200);
        });
        $(document).on('click', '[data-form="inquiry-form"] > div', function(e) {
            e.stopPropagation();
        });
    }
    // Stop Bubbling
    if ($('[data-modal="getQouteModal"]').length > 0) {
        $('[data-modal="getQouteModal"]').click(function(e) {
            e.stopPropagation();
            $("body").addClass("overflow-hidden");
            let modal = $(this).attr("data-modal");
            $("#" + modal).addClass("modal-show");
        })
    }

    if ($('#thumbPreviewer').length > 0) {
        $('#thumbPreviewer [data-image="thumb"]').click(function(e) {
            let imgsrc = $(this).attr('src');
            $('#thumbPreviewer [data-image="preview"]').attr("src", imgsrc);
        })
    }

    // pagination js
    if ($("#table_box_native").length > 0) {
        paginator({
            table: document.getElementById("table_box_native"),
            box: document.getElementById("index_native"),
            active_class: "color_page"
        });
    }

    // show search on desktop
    if ($("#searchXl").length > 0) {
        $("#searchXl > input").keyup(function() {
            if ($("#searchXl > input").val().length > 0) {
                $("#searchXl > img").css("width", '0');
                $("#searchResultXl").fadeIn(200);
            } else {
                $("#searchXl > img").css("width", '12px');
                $("#searchResultXl").fadeOut(200);
            }
        });
        $(document).on("click", function(e) {
            $("#searchResultXl").fadeOut(200);
        });
        $("#searchXl > input").click(function(e) {
            e.stopPropagation();
        });
        $("#searchResultXl > ul").click(function(e) {
            e.stopPropagation();
        });
    }

    // show search on mobile
    if ($("#searchXs").length > 0) {
        $("#searchXs > input").keyup(function() {
            if ($("#searchXs > input").val().length > 0) {
                $("#searchXs > img").css("width", '0');
                $("#searchResultXs").fadeIn(200);
            } else {
                $("#searchXs > img").css("width", '12px');
                $("#searchResultXs").fadeOut(200);
            }
        });
        $(document).on("click", function(e) {
            $("#searchResultXs").fadeOut(200);
        });
        $("#searchXs > input").click(function(e) {
            e.stopPropagation();
        });
        $("#searchResultXs > ul").click(function(e) {
            e.stopPropagation();
        });
    }


});