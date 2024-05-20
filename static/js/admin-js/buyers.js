$(document).ready(function() {
    $('#dataTable').DataTable();
    // Edit Details
    if ($("#messageModal").length > 0) {
        $(document).on('click', '#buyerSave', function(e) {
            $("#buyerMsg").attr('readonly', true);
            $(this).hide();
            $("#buyerEdit").show();
            $("#buyerCancel").hide();
        });
        $(document).on('click', '#buyerEdit', function(e) {
            $("#buyerMsg").attr('readonly', false);;
            $(this).hide();
            $("#buyerSave").show();
            $("#buyerCancel").show();
        });
        $(document).on('click', '#buyerCancel', function(e) {
            $("#buyerMsg").attr('readonly', true);
            $(this).hide();
            $("#buyerEdit").show();
            $("#buyerSave").hide();
        });
        $(document).on('click', '[data-btn="approve"]', function(e) {
            $(this).hide();
            $(this).closest('div').find('[data-btn="approved"]').show();
        });
    }

});