$(document).ready(function() {





    // Category >> Sub Category >> Products
    if ($("#productStack").length > 0) {
        $("#addCategoryBtn").click(function(e) {
            let addCategoryVal = $("#addCategory").val();
            var lines = addCategoryVal.split('\n');
            var html = lines
                .filter(line => line.trim() !== '')
                .map(line => `<li>${line}</li>`)
                .join('');
            if (!addCategoryVal == "") {
                if ($("#categoryList").length == 0) {
                    $("#addedCategory").html("<ul id='categoryList'></ul>");
                }
                $("#addedCategory").find("ul").append(html);
                $("#addCategory").val("");
                let categoryListArr = [];
                $("#addedCategory li").each(function() { categoryListArr.push($(this).text()) });
                $('#selectCategory')
                    .find('option')
                    .remove();
                categoryListArr.forEach(function(value, i) {
                    $("#selectCategory").append(`<option value="c${i+1}">${value}</option>`);
                });
            }
        });


        $("#addSubCategoryBtn").click(function(e) {
            let addSubCategoryVal = $("#addSubCategory").val();
            var lines = addSubCategoryVal.split('\n');
            var html = lines
                .filter(line => line.trim() !== '')
                .map(line => `<li>${line}</li>`)
                .join('');
            if (!addSubCategoryVal == "") {
                let selectedCategory = $("#selectCategory").children("option:selected").val();
                if (selectedCategory !== undefined) {
                    if ($(`#addedSubCategory #${selectedCategory}s`).length == 0) {
                        $("#addedSubCategory").append(`<ul id='${selectedCategory}s'></ul>`);
                    }
                    $("#addedSubCategory").find(`#${selectedCategory}s`).append(html);
                    $("#addSubCategory").val("");
                    let subCategoryListArr = [];
                    $(`#addedSubCategory #${selectedCategory}s`).find("li").each(function() { subCategoryListArr.push($(this).text()) });
                    $('#selectSubCategory')
                        .find('option')
                        .remove();
                    subCategoryListArr.forEach(function(value, i) {
                        $("#selectSubCategory").append(`<option value="${selectedCategory}s${i+1}">${value}</option>`);
                    });
                } else {
                    alert("Please add Category First");
                }
            }
        });

        $('#selectCategory').on('change', function(e) {
            var selectedCategory = $(this).children("option:selected").val();
            $("#addedSubCategory").find("ul").hide();
            $(`#addedSubCategory #${selectedCategory}s`).show();
            let subCategoryListArr = [];
            $(`#addedSubCategory #${selectedCategory}s`).find("li").each(function() { subCategoryListArr.push($(this).text()) });
            $('#selectSubCategory')
                .find('option')
                .remove();
            subCategoryListArr.forEach(function(value, i) {
                $("#selectSubCategory").append(`<option value="${selectedCategory}s${i+1}">${value}</option>`);
            });

            var selectedSubCategory = $("#selectSubCategory").children("option:selected").val();
            if (selectedSubCategory !== undefined) {

                $("#addedProducts").find("ul").hide();
                $(`#addedProducts #${selectedSubCategory}p`).show();
            }
        });

        $("#addProductsBtn").click(function(e) {

            let countriesArr = [];
            $("#addCountries input:checked").each(function() {
                countriesArr.push($(this).val());
                return countriesArr;
            });

            const html = countriesArr.map(line => {
                return `<li>${line}</li>`;
            });


            let selectedSubCategory = $("#selectSubCategory").children("option:selected").val();
            if (selectedSubCategory !== undefined) {
                if ($(`#addedProducts #${selectedSubCategory}p`).length == 0) {
                    $("#addedProducts").append(`<ul id='${selectedSubCategory}p'></ul>`);
                }
                $("#addedProducts").find(`#${selectedSubCategory}p`).empty();
                $("#addedProducts").find(`#${selectedSubCategory}p`).append(html);
            } else {
                alert("Please add Sub Category First");
            }

        });

        $('#selectSubCategory').on('change', function(e) {
            var selectedSubCategory = $(this).children("option:selected").val();
            $("#addedProducts").find("ul").hide();
            $(`#addedProducts #${selectedSubCategory}p`).show();
        });
    }



    // Clean Product 
    if ($('#clean').length > 0) {
        $(document).on('click', '#clean', function() {
            $("#cleanSpinner").fadeIn();
            setTimeout(() => {
                $("#cleanSpinner").fadeOut();
            }, 1000);
        });
    }






});