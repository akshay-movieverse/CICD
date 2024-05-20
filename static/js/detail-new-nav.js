$(document).ready(function() {



    // company result show header
    if ($("#searchHeader").length > 0) {
        $("#searchHeader").keyup(function() {
            if ($("#searchHeader").val().length < 2) {
                $("#resultHeader").removeClass("show");
                $("#countryBackdrop").hide();
                $("#searchHeaderErr").fadeIn();
            } else {
                $("#searchHeaderErr").fadeOut();
                $("#resultHeader").addClass("show");
                $("#countryBackdrop").show();
            }
        })
        $("#searchHeader").blur(function() {
            $("#searchHeaderErr").fadeOut();
        })
        $(document).on("click", function(e) {
            $("#resultHeader").removeClass("show");
            $("#countryBackdrop").hide();
        });
        $("#resultHeader").click(function(e) {
            e.stopPropagation();
        });
    }

    if ($("#resultHeader").length > 0) {
        paginator({
            table: document.getElementById("resultHeader"),
            box: document.getElementById("resultIndex"),
            active_class: "pagination-active",
            rows_per_page: 15
        });
    }

});