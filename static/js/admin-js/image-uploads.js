$(document).ready(function() {


    // Uploader Initiate
    $('[data-preview="image"]').each(function(index) {
        $.uploadPreview({
            input_field: `#image-upload-${index}`, // Default: .image-upload
            preview_box: `#image-preview-${index}`, // Default: .image-preview
            label_field: `#image-label-${index}`, // Default: .image-label
            label_default: "Choose File", // Default: Choose File
            label_selected: "Change File", // Default: Change File
            no_label: false // Default: false
        });
    });

    // Switch between uploader and text area
    if ($('[data-btn="textarea"]').length > 0) {
        $(document).on('click', '[data-btn="textarea"]', function() {
            let currentRow = $(this).closest('[data-row="uploader"]');
            currentRow.find('[data-block="uploader"]').toggleClass('flex hidden');
            currentRow.find('[data-block="textarea"]').toggleClass('flex hidden');
        });
    }

    // Textarea Cancel Button
    if ($('[data-btn="cancel"]').length > 0) {
        $(document).on('click', '[data-btn="cancel"]', function() {
            let currentRow = $(this).closest('[data-row="uploader"]');
            currentRow.find('[data-input="textarea"]').val('');
            currentRow.find('[data-btn="textarea"]').text('0').removeClass('bg-teal-600 hover:bg-teal-700').addClass('bg-slate-300 hover:bg-slate-400');
            currentRow.find('[data-btn="save"]').addClass('pointer-events-none bg-slate-300 hover:bg-slate-400').removeClass(' bg-teal-600 hover:bg-teal-700');
            currentRow.find('[data-block="uploader"]').toggleClass('flex hidden');
            currentRow.find('[data-block="textarea"]').toggleClass('flex hidden');
        });
    }

    // Textarea 
    $(document).on('keyup', '[data-input="textarea"]', function() {
        let currentLength = $(this).val().length;
        let currentTextareaRow = $(this).closest('[data-block="textarea"]');
        if (currentLength > 0) {
            currentTextareaRow.find('[data-btn="save"]').removeClass('pointer-events-none bg-slate-300 hover:bg-slate-400').addClass(' bg-teal-600 hover:bg-teal-700');
        } else {
            currentTextareaRow.find('[data-btn="save"]').addClass('pointer-events-none bg-slate-300 hover:bg-slate-400').removeClass(' bg-teal-600 hover:bg-teal-700');
        }
    });

    // Textarea Save Button
    if ($('[data-btn="save"]').length > 0) {
        $(document).on('click', '[data-btn="save"]', function() {
            let currentRow = $(this).closest('[data-row="uploader"]');
            let textareaBtn = currentRow.find('[data-btn="textarea"]');
            let currentTextarea = $(this).closest('[data-block="textarea"]').find('[data-input="textarea"]');
            let currentLength = currentTextarea.val().length;
            currentRow.find('[data-block="uploader"]').toggleClass('flex hidden');
            currentRow.find('[data-block="textarea"]').toggleClass('flex hidden');
            currentRow.find('[data-btn="textarea"]').toggleClass('bg-slate-300 hover:bg-slate-400 bg-teal-600 hover:bg-teal-700');
            textareaBtn.text(currentLength);
        });
    }
});