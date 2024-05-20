
document.addEventListener('DOMContentLoaded', function() {
    // Get all checkboxes
    const checkboxes = document.querySelectorAll('[name="reports[]"]');
    // Get the total span element
    const totalSpan = document.getElementById('final_total_div');

    // Initially update total
    updateTotal();

    // Attach event listener to each checkbox
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', updateTotal);
    });

    function updateTotal() {
        let total = 0;
        let atLeastOneChecked = false;

        checkboxes.forEach(checkbox => {
            if (checkbox.checked) {
                atLeastOneChecked = true;
                const price = parseFloat(checkbox.dataset.price); // Get the price from data-price attribute
                total += price;
            }
        });

        // If none are checked, check the first one and add its price to the total
        if (!atLeastOneChecked && checkboxes.length > 0) {
            checkboxes[0].checked = true;
            total += parseFloat(checkboxes[0].dataset.price);
        }

        // Update the total in the HTML
        totalSpan.textContent = total.toFixed(2); // Display total with 2 decimal places
    }
});
