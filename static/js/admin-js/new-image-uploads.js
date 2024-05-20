$(document).ready(function() {

    // Image Default Image INIT       
    if ($('[data-preview="default-image"]').length > 0) {
        $('[data-preview="default-image"]').each(function(index) {
            $(document).on('change', `[data-input="default-image"]`, function(e) {
                let currentImage = $(this).closest('[data-preview="default-image"]');
                let currentRow = $(this).closest('[data-upload="default-uploader"]');
                var reader = new FileReader();
                reader.onload = function(event) {
                    currentImage.find('img').attr('src', event.target.result);
                    // Add overlay
                    currentRow.find('[data-preview="default-overlay"]').css('background-image', 'url(' + event.target.result + ')');
                }
                reader.readAsDataURL(e.target.files[0]);
                console.log(currentRow);
                currentRow.find('[data-label="default-image"]').addClass('opacity-0');
                currentRow.find('[data-select="default-image"]').fadeIn().find('input').prop('checked', false);;
            });
        });
        $(document).on('click', `#removeImages`, function(e) {
            let currentRow = $('[data-select="default-image"] input:checked').closest('[data-upload="default-uploader"]');
            currentRow.find('[data-image="default-image"]').attr('src', '');
            currentRow.find('[data-label="default-image"]').removeClass('opacity-0');
            currentRow.find('[data-select="default-image"]').fadeOut();
        });
    }

    $('[data-input="default-image"]').mousemove(function(event) {
        let currentRow = $(this).closest('[data-preview="default-image"]');
        currentRow.find('[data-preview="default-overlay"]').show();
        let img = currentRow.find('[data-image="default-image"]');
        var posX = event.offsetX ? (event.offsetX) : event.pageX - img.offsetLeft;
        var posY = event.offsetY ? (event.offsetY) : event.pageY - img.offsetTop;
        currentRow.find('[data-preview="default-overlay"]').css('backgroundPosition', (-posX * 2) + "px " + (-posY * 2) + "px");
    });

    $('[data-input="default-image"]').mouseout(function() {
        let currentRow = $(this).closest('[data-preview="default-image"]');
        currentRow.find('[data-preview="default-overlay"]').hide();
    });





    // Uploader Initiate
    $('[data-preview="image"]').each(function(index) {
        $(document).on('change', `#filePhoto-${index}`, function(e) {
            let currentImage = $(this).closest('[data-preview="image"]');
            let currentRow = $(this).closest('[data-row="uploader"]');
            let thumbImage = currentRow.find('[data-thumb="group"] [data-thumb="input"]:checked').closest('[data-thumb="group"]').find('img');
            var reader = new FileReader();
            reader.onload = function(event) {
                currentImage.find('img').attr('src', event.target.result);
                // Add thumb image
                thumbImage.attr('src', event.target.result);
                // Add overlay
                currentRow.find('[data-preview="overlay"]').css('background-image', 'url(' + event.target.result + ')');
            }
            reader.readAsDataURL(e.target.files[0]);
            currentRow.find('[data-label="image"]').text('Change Image');
            currentRow.find('[data-remove="image"]').removeClass('pointer-events-none opacity-30');
        });
    });

    $('[data-preview="input"]').mousemove(function(event) {
        let currentRow = $(this).closest('[data-preview="image"]');
        currentRow.find('[data-preview="overlay"]').show();
        let img = currentRow.find('[data-image="image"]');
        var posX = event.offsetX ? (event.offsetX) : event.pageX - img.offsetLeft;
        var posY = event.offsetY ? (event.offsetY) : event.pageY - img.offsetTop;
        currentRow.find('[data-preview="overlay"]').css('backgroundPosition', (-posX * 2) + "px " + (-posY * 2) + "px");
    });

    $('[data-preview="input"]').mouseout(function() {
        let currentRow = $(this).closest('[data-preview="image"]');
        currentRow.find('[data-preview="overlay"]').hide();
    });

    // Change Thumb Image
    if ($('[data-thumb="group"]').length > 0) {
        $(document).on('change', '[data-thumb="group"] [data-thumb="input"]', function() {
            let currentRow = $(this).closest('[data-row="uploader"]')
            let thumbSrc = $(this).closest('[data-thumb="group"]').find('[data-thumb="image"]').attr('src');
            let currentImage = currentRow.find('[data-preview="image"]');
            currentImage.find('img').attr('src', thumbSrc);
            currentRow.find('[data-preview="overlay"]').css('background-image', 'url(' + thumbSrc + ')');
            if (thumbSrc == '') {
                currentRow.find('[data-remove="image"]').addClass('pointer-events-none opacity-30');
                currentRow.find('[data-label="image"]').text('Upload Image');
            } else {
                currentRow.find('[data-remove="image"]').removeClass('pointer-events-none opacity-30');
                currentRow.find('[data-label="image"]').text('Change Image');
            }
        });
    }


    // Remove Image
    if ($('[data-remove="image"]').length > 0) {
        $(document).on('click', '[data-remove="image"]', function() {
            let currentRow = $(this).closest('[data-row="uploader"]');
            let thumbImage = currentRow.find('[data-thumb="group"] [data-thumb="input"]:checked').closest('[data-thumb="group"]').find('img');
            $(this).addClass('pointer-events-none opacity-30');
            currentRow.find('[data-image="image"]').attr('src', '');
            currentRow.find('[data-label="image"]').text('Upload Image');
            thumbImage.attr('src', '');
        });
    }




    // Textarea 
    $(document).on('keyup', '[data-input="textarea"]', function() {
        let currentLength = $(this).val().length;
        let currentRow = $(this).closest('[data-row="uploader"]');
        if (currentLength > 0) {
            currentRow.find('[data-save="textarea"]').removeClass('pointer-events-none opacity-30');
        } else {
            currentRow.find('[data-save="textarea"]').addClass('pointer-events-none opacity-30');
        }
    });

    // Textarea Save Button
    if ($('[data-save="textarea"]').length > 0) {
        $(document).on('click', '[data-save="textarea"]', function() {
            let currentRow = $(this).closest('[data-row="uploader"]');
            $(this).text('Saved').addClass('bg-teal-600 text-white');
            currentRow.find('[data-remove="textarea"]').removeClass('pointer-events-none opacity-30');
            currentRow.find('[data-edit="textarea"]').removeClass('pointer-events-none opacity-30');
            currentRow.find('[data-input="textarea"]').addClass('bg-red-50').attr('readonly', 'readonly');
        });
    }

    // Textarea remove Button
    if ($('[data-remove="textarea"]').length > 0) {
        $(document).on('click', '[data-remove="textarea"]', function() {
            let currentRow = $(this).closest('[data-row="uploader"]');
            $(this).addClass('pointer-events-none opacity-30');
            currentRow.find('[data-edit="textarea"]').addClass('pointer-events-none opacity-30');
            currentRow.find('[data-save="textarea"]').removeClass('bg-teal-600 text-white').text('Save').addClass('pointer-events-none opacity-30');
            currentRow.find('[data-input="textarea"]').val('').removeClass('bg-red-50').attr('readonly', false);

        });
    }

    // Textarea edit Button
    if ($('[data-edit="textarea"]').length > 0) {
        $(document).on('click', '[data-edit="textarea"]', function() {
            let currentRow = $(this).closest('[data-row="uploader"]');
            currentRow.find('[data-save="textarea"]').removeClass('bg-teal-600 text-white').text('Save');
            currentRow.find('[data-input="textarea"]').removeClass('bg-red-50').attr('readonly', false);
        });
    }

    // pagination js
    if ($("#defaultImagesTable").length > 0) {
        paginator({
            table: document.getElementById("defaultImagesTable"),
            box: document.getElementById("defaultImagesIndex"),
            active_class: "color_page"
        });
    }

    if ($("#priorityImagesTable").length > 0) {
        paginator({
            table: document.getElementById("priorityImagesTable"),
            box: document.getElementById("priorityImagesIndex"),
            active_class: "color_page"
        });
    }
    if ($("#uploadImagesTable").length > 0) {
        paginator({
            table: document.getElementById("uploadImagesTable"),
            box: document.getElementById("uploadImagesIndex"),
            active_class: "color_page"
        });
    }
    if ($("#userImagesTable").length > 0) {
        paginator({
            table: document.getElementById("userImagesTable"),
            box: document.getElementById("userImagesIndex"),
            active_class: "color_page"
        });
    }
    if ($("#declinedImagesTable").length > 0) {
        paginator({
            table: document.getElementById("declinedImagesTable"),
            box: document.getElementById("declinedImagesIndex"),
            active_class: "color_page"
        });
    }

});