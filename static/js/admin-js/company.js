$(document).ready(function() {
    // Edit Button
    $("#editBtn").click(function() {
        $(this).hide();
        $("#addFieldBtn").hide();
        $("#saveBtn").show();
        $("#cancelBtn").show();
        $("#details").hide();
        $("#editDetails").show();
    });
    $("#addFieldBtn").click(function() {
        $(this).hide();
        $("#editBtn").hide();
        $("#saveBtn").show();
        $("#cancelBtn").show();
        $("#details").hide();
        $("#editDetails").show();
        let addField = `<div class="text-md leading-3">
        <input class="text-slate-400 mb-1 w-full px-1 py-0.5 focus:outline-none border border-dashed border-slate-500 rounded" type="text" value="" />
        <input class="mb-1 w-full px-1 py-0.5 focus:outline-none border border-dashed border-slate-500 rounded" type="text" value="" />
        </div>`;
        $('#editDetails').append(addField);
    });
    $("#saveBtn").click(function() {
        $(this).hide();
        $("#addFieldBtn").show();
        $("#cancelBtn").hide();
        $("#editBtn").show();
        $("#details").show();
        $("#editDetails").hide();
    });
    $("#cancelBtn").click(function() {
        $(this).hide();
        $("#addFieldBtn").show();
        $("#saveBtn").hide();
        $("#editBtn").show();
        $("#details").show();
        $("#editDetails").hide();
    });

    $('#toggleActivation').on('change', function(e) {
        let selectVal = $("#toggleActivation option:selected").val();
        if (selectVal == 'deactivate') {
            $("#isDeactivated").show();
            $("#activateOption").show();
            $("#deactivateOption").hide();
        }
        if (selectVal == 'activate') {
            $("#isDeactivated").hide();
            $("#activateOption").hide();
            $("#deactivateOption").show();
        }
    });


});