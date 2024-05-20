(function() {
    // Show Collapse JS 
    const showCollapseFunc = (collapseLinkID, collapseContentID, wrapperID) => {
        let collapseLinks = document.querySelectorAll(collapseLinkID),
            collapseContent = document.querySelectorAll(collapseContentID);

        if (collapseLinks && collapseContent && wrapperID) {
            const openCollapse = el => {
                let selectedLink = el.currentTarget,
                    showId = el.currentTarget.dataset.collapse,
                    currentCollapse = document.querySelector("#" + showId),
                    wrapperLinks = selectedLink.closest(wrapperID).querySelectorAll(collapseLinkID),
                    wrapperCollpase = currentCollapse.closest(wrapperID).querySelectorAll(collapseContentID);

                if (selectedLink.classList.contains('active')) {
                    selectedLink.classList.remove("active");
                    currentCollapse.style.height = '0px';
                    currentCollapse.classList.remove('active');
                } else {
                    wrapperLinks.forEach(el => {
                        el.classList.remove("active");
                    });

                    wrapperCollpase.forEach(el => {
                        el.classList.remove("active");
                        el.style.height = "0px";
                    });
                    selectedLink.classList.add("active");
                    currentCollapse.style.height = currentCollapse.scrollHeight + "px";
                    currentCollapse.classList.add('active');
                }
            }
            collapseLinks.forEach(el => {
                el.addEventListener("click", openCollapse);
            });
        }
    }
    showCollapseFunc('[data-collapse]', '.collapse', '[data-parent="collapse"]');
})();