$(document).ready(function() {
    // pagination js
    if ($("#table_box_native").length > 0) {
        paginator({
            table: document.getElementById("table_box_native"),
            box: document.getElementById("index_native"),
            active_class: "color_page"
        });
    }

    // Product Services main product show
    if ($("#productBuySell").length > 0) {

        function updateCount() {
            let sellCount = $("#productListingSell > li").length,
                buyCount = $("#productListingBuy > li").length,
                draftCount = $("#productListingDraft > li").length,
                deActivatedCount = $("#productListingDeactivated > li").length;
            $("#sellProductCount").html(`${sellCount}`);
            $("#buyProductCount").html(`${buyCount}`);
            $("#draftProductCount").html(`${draftCount}`);
            $("#deActivatedProductCount").html(`${deActivatedCount}`);
        }

        // Sell Tab 
        function productListSellUpdate() {
            $("#productListingSell .image-preview-block").each(function(index) {
                $.uploadPreview({
                    input_field: `#image-upload-sell-${index}`, // Default: .image-upload
                    preview_box: `#image-preview-sell-${index}`, // Default: .image-preview
                    label_field: `#image-label-sell-${index}`, // Default: .image-label
                    label_default: "Choose File", // Default: Choose File
                    label_selected: "Change File", // Default: Change File
                    no_label: false // Default: false
                });
            });
        }



        function productListSellInnerUpdate() {


            $('[data-preview="image"]').each(function(index) {
                for (var i = 0; i < 6; i++) {
                    $(document).on('change', `#filePhoto-${i}-${index}`, function(e) {
                        let currentImage = $(this).closest('[data-preview="image"]');
                        let currentRow = $(this).closest('[data-row="uploader"]');
                        var reader = new FileReader();
                        reader.onload = function(event) {
                            currentImage.find('img').attr('src', event.target.result);
                        }
                        reader.readAsDataURL(e.target.files[0]);
                        currentRow.find('[data-label="image"]').text('Change').removeClass('label-active');
                        currentRow.find('[data-remove="image"]').fadeIn();
                    });
                }
            });


            if ($('[data-remove="image"]').length > 0) {
                $(document).on('click', '[data-remove="image"]', function() {
                    let currentRow = $(this).closest('[data-row="uploader"]');
                    $(this).fadeOut();
                    currentRow.find('[data-image="image"]').attr('src', '');
                    currentRow.find('[data-label="image"]').text('Add Image').addClass('label-active');
                });
            }
        }


        $('#companyMainProductSell #productInputSell').on('keyup', function() {
            if ($(this).val().length > 2) {
                $('#sellProductSuggestion').fadeIn(100);
                $('#productSelectedTagsSellError').fadeOut(100);
                // $('#loadingProductSell').fadeIn();
                // setTimeout(function() {
                //     $("#loadingProductSell").hide();
                // }, 2000);
            } else {
                $('#productSelectedTagsSellError').fadeIn(100);
                $('#sellProductSuggestion').fadeOut(100);
            }
        });




        let countSell = 0;
        $('#allProductListSell li button').on('click', function() {
            $(this).hide();
            let closestList = $(this).closest('li');
            let addedTik = `<div class="flex w-20 pr-2.5 justify-center"><img src="../assets/images/added.svg"/></div>`
            closestList.append(addedTik);
            setTimeout(function() {
                closestList.fadeOut();
            }, 1000);
            let listSell = closestList.find('span').html();

            let productSell = `<li class="flex border border-neutral-300  mt-3 image-preview-block product-sell relative bg-white">
            <div class="flex mr-3 bg-cover self-start" id="image-preview-sell-${countSell}">
                <input type="file" id="image-upload-sell-${countSell}" class="hidden">
                <label id="image-label-sell-${countSell}" for="image-upload-sell-${countSell}" class="image-preview !border-l-0 !border-y-0">Add Image</label>
            </div>
            <div class="flex-1 flex flex-col justify-between py-3 pr-3">
                <h4 class="text-neutral-800 text-md font-semibold">${listSell}</h4>
                <div class="edit-options-block flex items-end">
                    <div class="flex items-center edit-options">
                        <a href="javascript:;" class="edit-details">Details (<span class="filled-inputs">0</span>/6) </a>
                        <a href="javascript:;" class="public-details ml-4">Public View</a>
                    </div>
                    <div class="deactivated text-sm text-red-400 hidden">Deactivated on Jun 12, 2022</div>
                    <button class="toggleActivate text-neutral-400 text-xs duration-150 hover:text-teal-600 hover:underline ml-auto absolute sm:static top-3 right-3">Deactivate</button>
                </div>
                <div class="edit-product-block fixed inset-0 z-50 bg-black/80 flex justify-end opacity-0 invisible duration-300 overflow-hidden">
                    <div class="flex flex-col w-full max-w-full md:max-w-screen-md edit-product-block-inner translate-x-full duration-300">
                        <div class="flex bg-teal-600 items-center py-1 md:py-1.5">
                            <button class="hide-editing w-12 md:w-16 mr-2 md:mr-0 h-full flex items-center justify-center flex-shrink-0">
                                <img src="../assets/images/admin/close-sidebar.svg" alt="icon"/>
                            </button>
                            <p class="text-white text-md mr-3">Please fill correct and detailed information below to attract more buyers online.</p>
                            <button class="mr-3 flex-shrink-0">
                                <img  src="../assets/images/admin/info.svg" width="14" height="14" alt="icon"/>
                            </button>
                        </div>
                        <div class="bg-white pt-2.5 px-3 md:px-8 pb-4">
                            <div class="text-neutral-900 text-md leading-3 font-semibold mb-4">Laptop Charger (multiple plug and valriant compitable) Laptop Charger (multiple plug and valriant compitable) Laptop Charger (multiple plug and valriant compitable) </div>
                            <div class="flex items-start overflow-auto overflow-y-hidden py-0.5">
                                <div class="flex flex-col flex-shrink-0 mr-4 md:mr-8 relative" data-row="uploader">
                                    <div class="w-[90px] h-[90px] border border-neutral-300 bg-white ">
                                        <div data-preview="image" class="relative h-full flex justify-center items-center p-2">
                                            <img data-image="image" class="w-[90px] max-h-full object-cover" src="" />
                                            <input type="file" class="absolute inset-0 w-[90px] h-[90px] opacity-0 z-10 cursor-pointer" id="filePhoto-0-${countSell}" />
                                        </div>
                                    </div>
                                    <div class="flex items-center justify-between">
                                        <label data-label="image" for="filePhoto-0-${countSell}" class="label-active text-xs text-teal-600 font-normal cursor-pointer" type="button">Add Image</label>
                                        <button style="display: none;" data-remove="image" class="text-xs text-teal-600" type="button font-normal">Delete</button>
                                    </div>
                                </div>
                                <div class="flex flex-col flex-shrink-0 mr-4 md:mr-8 relative" data-row="uploader">
                                    <div class="w-[90px] h-[90px] border border-neutral-300 bg-white ">
                                        <div data-preview="image" class="relative h-full flex justify-center items-center p-2">
                                            <img data-image="image" class="w-[90px] max-h-full object-cover" src="" />
                                            <input type="file" class="absolute inset-0 w-[90px] h-[90px] opacity-0 z-10 cursor-pointer" id="filePhoto-1-${countSell}" />
                                        </div>
                                    </div>
                                    <div class="flex items-center justify-between">
                                        <label data-label="image" for="filePhoto-1-${countSell}" class="label-active text-xs text-teal-600 font-normal cursor-pointer" type="button">Add Image</label>
                                        <button style="display: none;" data-remove="image" class="text-xs text-teal-600" type="button font-normal">Delete</button>
                                    </div>
                                </div>
                                <div class="flex flex-col flex-shrink-0 mr-4 md:mr-8 relative" data-row="uploader">
                                    <div class="w-[90px] h-[90px] border border-neutral-300 bg-white ">
                                        <div data-preview="image" class="relative h-full flex justify-center items-center p-2">
                                            <img data-image="image" class="w-[90px] max-h-full object-cover" src="" />
                                            <input type="file" class="absolute inset-0 w-[90px] h-[90px] opacity-0 z-10 cursor-pointer" id="filePhoto-2-${countSell}" />
                                        </div>
                                    </div>
                                    <div class="flex items-center justify-between">
                                        <label data-label="image" for="filePhoto-2-${countSell}" class="label-active text-xs text-teal-600 font-normal cursor-pointer" type="button">Add Image</label>
                                        <button style="display: none;" data-remove="image" class="text-xs text-teal-600" type="button font-normal">Delete</button>
                                    </div>
                                </div>
                                <div class="flex flex-col flex-shrink-0 mr-4 md:mr-8 relative" data-row="uploader">
                                    <div class="w-[90px] h-[90px] border border-neutral-300 bg-white ">
                                        <div data-preview="image" class="relative h-full flex justify-center items-center p-2">
                                            <img data-image="image" class="w-[90px] max-h-full object-cover" src="" />
                                            <input type="file" class="absolute inset-0 w-[90px] h-[90px] opacity-0 z-10 cursor-pointer" id="filePhoto-3-${countSell}" />
                                        </div>
                                    </div>
                                    <div class="flex items-center justify-between">
                                        <label data-label="image" for="filePhoto-3-${countSell}" class="label-active text-xs text-teal-600 font-normal cursor-pointer" type="button">Add Image</label>
                                        <button style="display: none;" data-remove="image" class="text-xs text-teal-600" type="button font-normal">Delete</button>
                                    </div>
                                </div>
                                <div class="flex flex-col flex-shrink-0 mr-4 md:mr-8 relative" data-row="uploader">
                                    <div class="w-[90px] h-[90px] border border-neutral-300 bg-white ">
                                        <div data-preview="image" class="relative h-full flex justify-center items-center p-2">
                                            <img data-image="image" class="w-[90px] max-h-full object-cover" src="" />
                                            <input type="file" class="absolute inset-0 w-[90px] h-[90px] opacity-0 z-10 cursor-pointer" id="filePhoto-4-${countSell}" />
                                        </div>
                                    </div>
                                    <div class="flex items-center justify-between">
                                        <label data-label="image" for="filePhoto-4-${countSell}" class="label-active text-xs text-teal-600 font-normal cursor-pointer" type="button">Add Image</label>
                                        <button style="display: none;" data-remove="image" class="text-xs text-teal-600" type="button font-normal">Delete</button>
                                    </div>
                                </div>
                                <div class="flex flex-col flex-shrink-0 relative" data-row="uploader">
                                    <div class="w-[90px] h-[90px] border border-neutral-300 bg-white ">
                                        <div data-preview="image" class="relative h-full flex justify-center items-center p-2">
                                            <img data-image="image" class="w-[90px] max-h-full object-cover" src="" />
                                            <input type="file" class="absolute inset-0 w-[90px] h-[90px] opacity-0 z-10 cursor-pointer" id="filePhoto-5-${countSell}" />
                                        </div>
                                    </div>
                                    <div class="flex items-center justify-between">
                                        <label data-label="image" for="filePhoto-5-${countSell}" class="label-active text-xs text-teal-600 font-normal cursor-pointer" type="button">Add Image</label>
                                        <button style="display: none;" data-remove="image" class="text-xs text-teal-600" type="button font-normal">Delete</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="flex flex-col flex-1 border-t border-neutral-300 bg-white px-3 md:px-8 py-4 overflow-auto">
                            <div class="saving-spinner flex justify-center items-center absolute inset-0 bg-black/[.8] z-10" style="display:none;">
                                <img class="animate-spin" src="../assets/images/client-admin/spinner.svg" alt="icon" />
                            </div>
                            <div class="saving-data flex justify-center items-center absolute inset-0 bg-black/[.8] z-10" style="display:none;">
                                <div class="bg-white flex items-center justify-center flex-col text-center px-24 py-16">
                                    <h4 class="text-neutral-800 text-base mb-8">The product details are live</h4>
                                    <button type="button" class="bg-teal-600 text-white text-base px-10 py-1.5">Public View</button>
                                </div>
                            </div>
                            <div class="flex md:items-center mb-2.5 flex-col md:flex-row">
                                <div class="text-md text-neutral-800 font-medium w-52 leading-6 mb-0.5 md:mb-0">Type Your Own Product Title</div>
                                <div class="relative flex-1">
                                    <input type="text" maxlength="40" class="valid-input input-empty border border-neutral-300 h-[26px] w-full text-neutral-700 text-sm px-2 bg-white focus:outline-none">
                                </div>
                            </div>
                            <div class="flex md:items-center mb-2.5 flex-col md:flex-row">
                                <div class="text-md text-neutral-800 font-medium w-52 leading-6 mb-0.5 md:mb-0">Shipping outside your country</div>
                                <div class="relative flex-1">
                                    <input type="text" maxlength="40" class="valid-input input-empty border border-neutral-300 h-[26px] w-full text-neutral-700 text-sm px-2 bg-white focus:outline-none">
                                </div>
                            </div>
                            <div class="flex md:items-center mb-2.5 flex-col md:flex-row">
                                <div class="text-md text-neutral-800 font-medium w-52 leading-6 mb-0.5 md:mb-0">Payment Mode</div>
                                <div class="relative custom-select-wrapper flex-1">
                                    <div class="custom-select border-neutral-300 flex items-center border cursor-pointer bg-select-sm bg-no-repeat bg-[98%_center] text-slate-500 w-full h-[26px] text-sm">
                                        <span class="custom-select-placehodler text-neutral-400 text-sm font-extralight">Select One or More </span>
                                        <div class="custom-select-tags-wrapper">
                                            <div class="custom-select-count"></div>
                                        </div>
                                    </div>
                                    <div class="custom-options z-10 border-l border-r border-b border-neutral-300 w-full absolute top-[100%] mt-[-1px] left-0 right-0 bg-white" style="display: none;">
                                        <ul class="flex flex-col">
                                            <li class="border-t border-neutral-300">
                                                <div class="checkbox-theme checkbox-theme-xs">
                                                    <div class="option-placeholder flex justify-between pl-2 pr-2 h-[26px] leading-[26px] cursor-pointer">
                                                        <div class="text-sm text-slate-800">Select None</div>
                                                    </div>
                                                </div>
                                            </li>
                                            <li class="border-t border-neutral-300">
                                                <div class="checkbox-theme checkbox-theme-xs">
                                                    <input class="hidden" type="checkbox" id="onlineBankTransfer-sell-1-${countSell}" value="Online Bank Transfer">
                                                    <label for="onlineBankTransfer-sell-1-${countSell}" class="flex justify-between pl-8 pr-2 h-[26px]">
                                                    <div class="text-sm text-slate-800">Online Bank Transfer</div>
                                                </label>
                                                </div>
                                            </li>
                                            <li class="border-t border-neutral-300">
                                                <div class="checkbox-theme checkbox-theme-xs">
                                                    <input class="hidden" type="checkbox" id="crypto-sell-1-${countSell}" value="Crypto">
                                                    <label for="crypto-sell-1-${countSell}" class="flex justify-between pl-8 pr-2 h-[26px]">
                                                    <div class="text-sm text-slate-800">Crypto</div>
                                                </label>
                                                </div>
                                            </li>
                                            <li class="border-t border-neutral-300">
                                                <div class="checkbox-theme checkbox-theme-xs">
                                                    <input class="hidden" type="checkbox" id="paypal-sell-1-${countSell}" value="Paypal">
                                                    <label for="paypal-sell-1-${countSell}" class="flex justify-between pl-8 pr-2 h-[26px]">
                                                    <div class="text-sm text-slate-800">Paypal</div>
                                                </label>
                                                </div>
                                            </li>
                                            <li class="border-t border-neutral-300">
                                                <div class="checkbox-theme checkbox-theme-xs">
                                                    <input class="hidden" type="checkbox" id="creditDebit-sell-1-${countSell}" value="Credit / Debit Card">
                                                    <label for="creditDebit-sell-1-${countSell}" class="flex justify-between pl-8 pr-2 h-[26px]">
                                                    <div class="text-sm text-slate-800">Credit / Debit Card</div>
                                                </label>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div class="flex md:items-center mb-2.5 flex-col md:flex-row">
                                <div class="text-md text-neutral-800 font-medium  w-52 mb-0.5 md:mb-0">Type Your Own Product Title</div>
                                <div class="relative flex-1">
                                    <input type="text" maxlength="40" class="valid-input input-empty border border-neutral-300 h-[26px] w-full text-neutral-700 text-sm px-2 bg-white focus:outline-none">
                                </div>
                            </div>
                            <div class="flex md:items-center mb-2.5 flex-col md:flex-row">
                                <div class="text-md text-neutral-800 font-medium w-52 leading-6 mb-0.5 md:mb-0">Payment Mode</div>
                                <div class="relative custom-select-wrapper flex-1">
                                    <div class="custom-select border-neutral-300 flex items-center border cursor-pointer bg-select-sm bg-no-repeat bg-[98%_center] text-slate-500 w-full h-[26px] text-sm">
                                        <span class="custom-select-placehodler text-neutral-400 text-sm font-extralight">Select One or More </span>
                                        <div class="custom-select-tags-wrapper">
                                            <div class="custom-select-count"></div>
                                        </div>
                                    </div>
                                    <div class="custom-options z-10 border-l border-r border-b border-neutral-300 w-full absolute top-[100%] mt-[-1px] left-0 right-0 bg-white" style="display: none;">
                                        <ul class="flex flex-col">
                                            <li class="border-t border-neutral-300">
                                                <div class="checkbox-theme checkbox-theme-xs">
                                                    <div class="option-placeholder flex justify-between pl-2 pr-2 h-[26px] leading-[26px] cursor-pointer">
                                                        <div class="text-sm text-slate-800">Select None</div>
                                                    </div>
                                                </div>
                                            </li>
                                            <li class="border-t border-neutral-300">
                                                <div class="checkbox-theme checkbox-theme-xs">
                                                    <input class="hidden" type="checkbox" id="onlineBankTransfer-sell-2-${countSell}" value="Online Bank Transfer">
                                                    <label for="onlineBankTransfer-sell-2-${countSell}" class="flex justify-between pl-8 pr-2 h-[26px]">
                                                    <div class="text-sm text-slate-800">Online Bank Transfer</div>
                                                </label>
                                                </div>
                                            </li>
                                            <li class="border-t border-neutral-300">
                                                <div class="checkbox-theme checkbox-theme-xs">
                                                    <input class="hidden" type="checkbox" id="crypto-sell-2-${countSell}" value="Crypto">
                                                    <label for="crypto-sell-2-${countSell}" class="flex justify-between pl-8 pr-2 h-[26px]">
                                                    <div class="text-sm text-slate-800">Crypto</div>
                                                </label>
                                                </div>
                                            </li>
                                            <li class="border-t border-neutral-300">
                                                <div class="checkbox-theme checkbox-theme-xs">
                                                    <input class="hidden" type="checkbox" id="paypal-sell-2-${countSell}" value="Paypal">
                                                    <label for="paypal-sell-2-${countSell}" class="flex justify-between pl-8 pr-2 h-[26px]">
                                                    <div class="text-sm text-slate-800">Paypal</div>
                                                </label>
                                                </div>
                                            </li>
                                            <li class="border-t border-neutral-300">
                                                <div class="checkbox-theme checkbox-theme-xs">
                                                    <input class="hidden" type="checkbox" id="creditDebit-sell-2-${countSell}" value="Credit / Debit Card">
                                                    <label for="creditDebit-sell-2-${countSell}" class="flex justify-between pl-8 pr-2 h-[26px]">
                                                    <div class="text-sm text-slate-800">Credit / Debit Card</div>
                                                </label>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div class="flex md:items-center mb-2.5 flex-col md:flex-row">
                                <div class="text-md text-neutral-800 font-medium w-52 leading-6 mb-0.5 md:mb-0">Unit Price</div>
                                <div class="flex-1 flex flex-col">
                                    <div class="flex md:items-center flex-col md:flex-row flex-1">
                                        <div class="flex w-full md:max-w-[166px] ">
                                            <div class="relative custom-select-wrapper">
                                                <div class="custom-select border-neutral-300 flex items-center border-l border-t border-b  cursor-pointer bg-select-sm bg-no-repeat bg-[95%_center] text-slate-500 w-24 h-[26px] bg-neutral-100 text-sm">
                                                    <span class="custom-select-placehodler text-neutral-400 text-sm font-extralight">Select One </span>
                                                    <div class="custom-select-tags-wrapper tag-theme">
                                                        <div class="custom-select-count"></div>
                                                    </div>
                                                </div>
                                                <div class="custom-options z-10 border-l border-r border-b border-neutral-300 absolute top-[100%] mt-[-1px] left-0 right-0 bg-white w-36" style="display: none;">
                                                    <ul class="flex flex-col max-h-72 overflow-auto">
                                                        <li class="border-t border-neutral-300">
                                                            <div class="flex items-center">
                                                                <img class="ml-0.5" src="../assets/images/admin/search.svg" width="25" height="25" alt="icon" />
                                                                <input class="text-sm focus:outline-none px-1 flex-1 w-12" type="text" placeholder="Search" />
                                                                <button class="p-1 ml-auto mr-0.5">
                                                                    <img width="10" height="10" src="../assets/images/admin/remove-sm.svg" alt="remove"/>
                                                                </button>
                                                            </div>
                                                        </li>
                                                        <li class="border-t border-neutral-300">
                                                            <div class="radio-theme radio-theme-xs">
                                                                <input class="hidden" type="radio" id="currencyIDR-${countSell}" value="IDR" name="currency-${countSell}">
                                                                <label for="currencyIDR-${countSell}" class="flex justify-between pl-8 pr-2 h-[26px]">
                                                                <div class="text-sm text-slate-800">IDR</div>
                                                            </label>
                                                            </div>
                                                        </li>
                                                        <li class="border-t border-neutral-300">
                                                            <div class="radio-theme radio-theme-xs">
                                                                <input class="hidden" type="radio" id="currencyUS-${countSell}" value="US$" name="currency-${countSell}">
                                                                <label for="currencyUS-${countSell}" class="flex justify-between pl-8 pr-2 h-[26px]">
                                                                <div class="text-sm text-slate-800">US$</div>
                                                            </label>
                                                            </div>
                                                        </li>
                                                        <li class="border-t border-neutral-300">
                                                            <div class="radio-theme radio-theme-xs">
                                                                <input class="hidden" type="radio" id="currencyAU-${countSell}" value="AU$" name="currency-${countSell}">
                                                                <label for="currencyAU-${countSell}" class="flex justify-between pl-8 pr-2 h-[26px]">
                                                                <div class="text-sm text-slate-800">AU$</div>
                                                            </label>
                                                            </div>
                                                        </li>
                                                        <li class="border-t border-neutral-300">
                                                            <div class="radio-theme radio-theme-xs">
                                                                <input class="hidden" type="radio" id="currencySG-${countSell}" value="SG$" name="currency-${countSell}">
                                                                <label for="currencySG-${countSell}" class="flex justify-between pl-8 pr-2 h-[26px]">
                                                                <div class="text-sm text-slate-800">SG$</div>
                                                            </label>
                                                            </div>
                                                        </li>
                                                        <li class="border-t border-neutral-300">
                                                            <div class="radio-theme radio-theme-xs">
                                                                <input class="hidden" type="radio" id="currencyCAD-${countSell}" value="CAD$" name="currency-${countSell}">
                                                                <label for="currencyCAD-${countSell}" class="flex justify-between pl-8 pr-2 h-[26px]">
                                                                <div class="text-sm text-slate-800">CAD$</div>
                                                            </label>
                                                            </div>
                                                        </li>
                                                        <li class="border-t border-neutral-300">
                                                            <div class="radio-theme radio-theme-xs">
                                                                <input class="hidden" type="radio" id="currencyINR-${countSell}" value="INR$" name="currency-${countSell}">
                                                                <label for="currencyINR-${countSell}" class="flex justify-between pl-8 pr-2 h-[26px]">
                                                                <div class="text-sm text-slate-800">INR$</div>
                                                            </label>
                                                            </div>
                                                        </li>
                                                        <li class="border-t border-neutral-300">
                                                            <div class="radio-theme radio-theme-xs">
                                                                <input class="hidden" type="radio" id="currencyBaht-${countSell}" value="Baht" name="currency-${countSell}">
                                                                <label for="currencyBaht-${countSell}" class="flex justify-between pl-8 pr-2 h-[26px]">
                                                                <div class="text-sm text-slate-800">Baht</div>
                                                            </label>
                                                            </div>
                                                        </li>
                                                        <li class="border-t border-neutral-300">
                                                            <div class="radio-theme radio-theme-xs">
                                                                <input class="hidden" type="radio" id="currencyVND-${countSell}" value="VND" name="currency-${countSell}">
                                                                <label for="currencyVND-${countSell}" class="flex justify-between pl-8 pr-2 h-[26px]">
                                                                <div class="text-sm text-slate-800">VND</div>
                                                            </label>
                                                            </div>
                                                        </li>
                                                        <li class="border-t border-neutral-300">
                                                            <div class="radio-theme radio-theme-xs">
                                                                <input class="hidden" type="radio" id="currencyPESO-${countSell}" value="PESO" name="currency-${countSell}">
                                                                <label for="currencyPESO-${countSell}" class="flex justify-between pl-8 pr-2 h-[26px]">
                                                                <div class="text-sm text-slate-800">PESO</div>
                                                            </label>
                                                            </div>
                                                        </li>
                                                        <li class="border-t border-neutral-300">
                                                            <div class="radio-theme radio-theme-xs">
                                                                <input class="hidden" type="radio" id="currencyRINGGIT-${countSell}" value="RINGGIT" name="currency-${countSell}">
                                                                <label for="currencyRINGGIT-${countSell}" class="flex justify-between pl-8 pr-2 h-[26px]">
                                                                <div class="text-sm text-slate-800">RINGGIT</div>
                                                            </label>
                                                            </div>
                                                        </li>
                                                        <li class="border-t border-neutral-300">
                                                            <div class="radio-theme radio-theme-xs">
                                                                <input class="hidden" type="radio" id="currencyEURO-${countSell}" value="EURO" name="currency-${countSell}">
                                                                <label for="currencyEURO-${countSell}" class="flex justify-between pl-8 pr-2 h-[26px]">
                                                                <div class="text-sm text-slate-800">EURO</div>
                                                            </label>
                                                            </div>
                                                        </li>
                                                        <li class="border-t border-neutral-300">
                                                            <div class="radio-theme radio-theme-xs">
                                                                <input class="hidden" type="radio" id="currencyHK-${countSell}" value="HK$" name="currency-${countSell}">
                                                                <label for="currencyHK-${countSell}" class="flex justify-between pl-8 pr-2 h-[26px]">
                                                                <div class="text-sm text-slate-800">HK$</div>
                                                            </label>
                                                            </div>
                                                        </li>

                                                    </ul>
                                                </div>
                                            </div>
                                            <input type="text" maxlength="6" class="numbersOnly border-neutral-300 border focus:outline-none px-2.5 text-sm h-[26px] w-full md:w-[70px]" />
                                        </div>
                                        <div class="text-md text-neutral-700 font-bold my-1 md:my-0 md:mx-2">Per</div>
                                        <div class="relative custom-select-wrapper">
                                            <div class="custom-select border-neutral-300 flex items-center border cursor-pointer bg-select-sm bg-no-repeat bg-[98%_center] md:bg-[95%_center] text-slate-500 w-full md:w-[103px] h-[26px] text-sm">
                                                <span class="custom-select-placehodler text-neutral-400 text-sm font-extralight">Select One </span>
                                                <div class="custom-select-tags-wrapper tag-theme">
                                                    <div class="custom-select-count"></div>
                                                </div>
                                            </div>
                                            <div class="custom-options z-10 border-l border-r border-b border-neutral-300 absolute w-48 top-[100%] mt-[-1px] left-0 right-0 bg-white" style="display: none;">
                                                <ul class="flex flex-col max-h-72 overflow-auto">
                                                    <li class="border-t border-neutral-300">
                                                        <div class="flex items-center">
                                                            <img class="ml-0.5" src="../assets/images/admin/search.svg" width="25" height="25" alt="icon" />
                                                            <input class="text-sm focus:outline-none px-1 flex-1 w-12" type="text" placeholder="Search" />
                                                            <button class="p-1 ml-auto mr-0.5">
                                                                <img width="10" height="10" src="../assets/images/admin/remove-sm.svg" alt="remove"/>
                                                            </button>
                                                        </div>
                                                    </li>
                                                    <li class="border-t border-neutral-300">
                                                        <div class="radio-theme radio-theme-xs">
                                                            <input class="hidden" type="radio" id="unitPiece-${countSell}" value="Piece" name="unit-${countSell}">
                                                            <label for="unitPiece-${countSell}" class="flex justify-between pl-8 pr-2 h-[26px]">
                                                            <div class="text-sm text-slate-800">Piece</div>
                                                        </label>
                                                        </div>
                                                    </li>
                                                    <li class="border-t border-neutral-300">
                                                        <div class="radio-theme radio-theme-xs">
                                                            <input class="hidden" type="radio" id="unitKg-${countSell}" value="Twenty-Foot Container" name="unit-${countSell}">
                                                            <label for="unitKg-${countSell}" class="flex justify-between pl-8 pr-2 h-[26px]">
                                                            <div class="text-sm text-slate-800">Twenty-Foot Container</div>
                                                        </label>
                                                        </div>
                                                    </li>

                                                    <li class="border-t border-neutral-300">
                                                        <div class="radio-theme radio-theme-xs">
                                                            <input class="hidden" type="radio" id="unitGm-${countSell}" value="Gm" name="unit-${countSell}">
                                                            <label for="unitGm-${countSell}" class="flex justify-between pl-8 pr-2 h-[26px]">
                                                            <div class="text-sm text-slate-800">Gm</div>
                                                        </label>
                                                        </div>
                                                    </li>
                                                    <li class="border-t border-neutral-300">
                                                        <div class="radio-theme radio-theme-xs">
                                                            <input class="hidden" type="radio" id="unitMeter-${countSell}" value="Meter" name="unit-${countSell}">
                                                            <label for="unitMeter-${countSell}" class="flex justify-between pl-8 pr-2 h-[26px]">
                                                            <div class="text-sm text-slate-800">Meter</div>
                                                        </label>
                                                        </div>
                                                    </li>
                                                    <li class="border-t border-neutral-300">
                                                        <div class="radio-theme radio-theme-xs">
                                                            <input class="hidden" type="radio" id="unitCentimeter-${countSell}" value="Centimeter" name="unit-${countSell}">
                                                            <label for="unitCentimeter-${countSell}" class="flex justify-between pl-8 pr-2 h-[26px]">
                                                            <div class="text-sm text-slate-800">Centimeter</div>
                                                        </label>
                                                        </div>
                                                    </li>
                                                    <li class="border-t border-neutral-300">
                                                        <div class="radio-theme radio-theme-xs">
                                                            <input class="hidden" type="radio" id="unitSqMeter-${countSell}" value="Sq. Meter" name="unit-${countSell}">
                                                            <label for="unitSqMeter-${countSell}" class="flex justify-between pl-8 pr-2 h-[26px]">
                                                            <div class="text-sm text-slate-800">Sq. Meter</div>
                                                        </label>
                                                        </div>
                                                    </li>
                                                    <li class="border-t border-neutral-300">
                                                        <div class="radio-theme radio-theme-xs">
                                                            <input class="hidden" type="radio" id="unitYard-${countSell}" value="Yard" name="unit-${countSell}">
                                                            <label for="unitYard-${countSell}" class="flex justify-between pl-8 pr-2 h-[26px]">
                                                            <div class="text-sm text-slate-800">Yard</div>
                                                        </label>
                                                        </div>
                                                    </li>
                                                    <li class="border-t border-neutral-300">
                                                        <div class="radio-theme radio-theme-xs">
                                                            <input class="hidden" type="radio" id="unitFoot-${countSell}" value="Foot" name="unit-${countSell}">
                                                            <label for="unitFoot-${countSell}" class="flex justify-between pl-8 pr-2 h-[26px]">
                                                            <div class="text-sm text-slate-800">Foot</div>
                                                        </label>
                                                        </div>
                                                    </li>
                                                    <li class="border-t border-neutral-300">
                                                        <div class="radio-theme radio-theme-xs">
                                                            <input class="hidden" type="radio" id="unitSqFoot-${countSell}" value="Sq. Foot" name="unit-${countSell}">
                                                            <label for="unitSqFoot-${countSell}" class="flex justify-between pl-8 pr-2 h-[26px]">
                                                            <div class="text-sm text-slate-800">Sq. Foot</div>
                                                        </label>
                                                        </div>
                                                    </li>
                                                    <li class="border-t border-neutral-300">
                                                        <div class="radio-theme radio-theme-xs">
                                                            <input class="hidden" type="radio" id="unitMillilitre-${countSell}" value="Millilitre" name="unit-${countSell}">
                                                            <label for="unitMillilitre-${countSell}" class="flex justify-between pl-8 pr-2 h-[26px]">
                                                            <div class="text-sm text-slate-800">Millilitre</div>
                                                        </label>
                                                        </div>
                                                    </li>
                                                    <li class="border-t border-neutral-300">
                                                        <div class="radio-theme radio-theme-xs">
                                                            <input class="hidden" type="radio" id="unitLitre-${countSell}" value="Litre" name="unit-${countSell}">
                                                            <label for="unitLitre-${countSell}" class="flex justify-between pl-8 pr-2 h-[26px]">
                                                            <div class="text-sm text-slate-800">Litre</div>
                                                        </label>
                                                        </div>
                                                    </li>
                                                    <li class="border-t border-neutral-300">
                                                        <div class="radio-theme radio-theme-xs">
                                                            <input class="hidden" type="radio" id="unitInch-${countSell}" value="Inch" name="unit-${countSell}">
                                                            <label for="unitInch-${countSell}" class="flex justify-between pl-8 pr-2 h-[26px]">
                                                            <div class="text-sm text-slate-800">Inch</div>
                                                        </label>
                                                        </div>
                                                    </li>
                                                    <li class="border-t border-neutral-300">
                                                        <div class="radio-theme radio-theme-xs">
                                                            <input class="hidden" type="radio" id="unitSqInch-${countSell}" value="Sq. Inch" name="unit-${countSell}">
                                                            <label for="unitSqInch-${countSell}" class="flex justify-between pl-8 pr-2 h-[26px]">
                                                            <div class="text-sm text-slate-800">Sq. Inch</div>
                                                        </label>
                                                        </div>
                                                    </li>
                                                    <li class="border-t border-neutral-300">
                                                        <div class="radio-theme radio-theme-xs">
                                                            <input class="hidden" type="radio" id="unitQuintal-${countSell}" value="Quintal" name="unit-${countSell}">
                                                            <label for="unitQuintal-${countSell}" class="flex justify-between pl-8 pr-2 h-[26px]">
                                                            <div class="text-sm text-slate-800">Quintal</div>
                                                        </label>
                                                        </div>
                                                    </li>
                                                    <li class="border-t border-neutral-300">
                                                        <div class="radio-theme radio-theme-xs">
                                                            <input class="hidden" type="radio" id="unitTon-${countSell}" value="Ton" name="unit-${countSell}">
                                                            <label for="unitTon-${countSell}" class="flex justify-between pl-8 pr-2 h-[26px]">
                                                            <div class="text-sm text-slate-800">Ton</div>
                                                        </label>
                                                        </div>
                                                    </li>
                                                    <li class="border-t border-neutral-300">
                                                        <div class="radio-theme radio-theme-xs">
                                                            <input class="hidden" type="radio" id="unitMetricTon-${countSell}" value="Metric Ton" name="unit-${countSell}">
                                                            <label for="unitMetricTon-${countSell}" class="flex justify-between pl-8 pr-2 h-[26px]">
                                                            <div class="text-sm text-slate-800">Metric Ton</div>
                                                        </label>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>


                            <div class="flex items-start flex-col md:flex-row">
                                <div class="text-md text-neutral-800 font-medium w-52 leading-6 mb-0.5 md:mb-0">Bulk Pricing</div>
                                <div class="flex-1 flex flex-col w-full md:w-auto">
                                    <div data-inner-row="bulk-price" class="flex md:items-center flex-col md:flex-row flex-1 mb-2.5">
                                        <div class="flex w-full md:max-w-[166px] ">
                                            <div class="relative custom-select-wrapper">
                                                <div class="custom-select border-neutral-300 flex items-center border-l border-t border-b  cursor-pointer bg-select-sm bg-no-repeat bg-[95%_center] text-slate-500 w-24 h-[26px] bg-neutral-100 text-sm">
                                                    <span class="custom-select-placehodler text-neutral-400 text-sm font-extralight">Select One </span>
                                                    <div class="custom-select-tags-wrapper tag-theme">
                                                        <div class="custom-select-count"></div>
                                                    </div>
                                                </div>
                                                <div class="custom-options z-10 border-l border-r border-b border-neutral-300 absolute top-[100%] mt-[-1px] left-0 right-0 bg-white w-36" style="display: none;">
                                                    <ul class="flex flex-col max-h-72 overflow-auto">
                                                        <li class="border-t border-neutral-300">
                                                            <div class="flex items-center">
                                                                <img class="ml-0.5" src="../assets/images/admin/search.svg" width="25" height="25" alt="icon" />
                                                                <input class="text-sm focus:outline-none px-1 flex-1 w-12" type="text" placeholder="Search" />
                                                                <button class="p-1 ml-auto mr-0.5">
                                                                    <img width="10" height="10" src="../assets/images/admin/remove-sm.svg" alt="remove"/>
                                                                </button>
                                                            </div>
                                                        </li>
                                                        <li class="border-t border-neutral-300">
                                                            <div class="radio-theme radio-theme-xs">
                                                                <input class="hidden" type="radio" id="currencyIDRBulk-0" value="IDR" name="currency-0">
                                                                <label for="currencyIDRBulk-0" class="flex justify-between pl-8 pr-2 h-[26px]">
                                                                <div class="text-sm text-slate-800">IDR</div>
                                                            </label>
                                                            </div>
                                                        </li>
                                                        <li class="border-t border-neutral-300">
                                                            <div class="radio-theme radio-theme-xs">
                                                                <input class="hidden" type="radio" id="currencyUSBulk-0" value="US$" name="currency-0">
                                                                <label for="currencyUSBulk-0" class="flex justify-between pl-8 pr-2 h-[26px]">
                                                                <div class="text-sm text-slate-800">US$</div>
                                                            </label>
                                                            </div>
                                                        </li>
                                                        <li class="border-t border-neutral-300">
                                                            <div class="radio-theme radio-theme-xs">
                                                                <input class="hidden" type="radio" id="currencyAUBulk-0" value="AU$" name="currency-0">
                                                                <label for="currencyAUBulk-0" class="flex justify-between pl-8 pr-2 h-[26px]">
                                                                <div class="text-sm text-slate-800">AU$</div>
                                                            </label>
                                                            </div>
                                                        </li>
                                                        <li class="border-t border-neutral-300">
                                                            <div class="radio-theme radio-theme-xs">
                                                                <input class="hidden" type="radio" id="currencySGBulk-0" value="SG$" name="currency-0">
                                                                <label for="currencySGBulk-0" class="flex justify-between pl-8 pr-2 h-[26px]">
                                                                <div class="text-sm text-slate-800">SG$</div>
                                                            </label>
                                                            </div>
                                                        </li>
                                                        <li class="border-t border-neutral-300">
                                                            <div class="radio-theme radio-theme-xs">
                                                                <input class="hidden" type="radio" id="currencyCADBulk-0" value="CAD$" name="currency-0">
                                                                <label for="currencyCADBulk-0" class="flex justify-between pl-8 pr-2 h-[26px]">
                                                                <div class="text-sm text-slate-800">CAD$</div>
                                                            </label>
                                                            </div>
                                                        </li>
                                                        <li class="border-t border-neutral-300">
                                                            <div class="radio-theme radio-theme-xs">
                                                                <input class="hidden" type="radio" id="currencyINRBulk-0" value="INR$" name="currency-0">
                                                                <label for="currencyINRBulk-0" class="flex justify-between pl-8 pr-2 h-[26px]">
                                                                <div class="text-sm text-slate-800">INR$</div>
                                                            </label>
                                                            </div>
                                                        </li>
                                                        <li class="border-t border-neutral-300">
                                                            <div class="radio-theme radio-theme-xs">
                                                                <input class="hidden" type="radio" id="currencyBahtBulk-0" value="Baht" name="currency-0">
                                                                <label for="currencyBahtBulk-0" class="flex justify-between pl-8 pr-2 h-[26px]">
                                                                <div class="text-sm text-slate-800">Baht</div>
                                                            </label>
                                                            </div>
                                                        </li>
                                                        <li class="border-t border-neutral-300">
                                                            <div class="radio-theme radio-theme-xs">
                                                                <input class="hidden" type="radio" id="currencyVNDBulk-0" value="VND" name="currency-0">
                                                                <label for="currencyVNDBulk-0" class="flex justify-between pl-8 pr-2 h-[26px]">
                                                                <div class="text-sm text-slate-800">VND</div>
                                                            </label>
                                                            </div>
                                                        </li>
                                                        <li class="border-t border-neutral-300">
                                                            <div class="radio-theme radio-theme-xs">
                                                                <input class="hidden" type="radio" id="currencyPESOBulk-0" value="PESO" name="currency-0">
                                                                <label for="currencyPESOBulk-0" class="flex justify-between pl-8 pr-2 h-[26px]">
                                                                <div class="text-sm text-slate-800">PESO</div>
                                                            </label>
                                                            </div>
                                                        </li>
                                                        <li class="border-t border-neutral-300">
                                                            <div class="radio-theme radio-theme-xs">
                                                                <input class="hidden" type="radio" id="currencyRINGGITBulk-0" value="RINGGIT" name="currency-0">
                                                                <label for="currencyRINGGITBulk-0" class="flex justify-between pl-8 pr-2 h-[26px]">
                                                                <div class="text-sm text-slate-800">RINGGIT</div>
                                                            </label>
                                                            </div>
                                                        </li>
                                                        <li class="border-t border-neutral-300">
                                                            <div class="radio-theme radio-theme-xs">
                                                                <input class="hidden" type="radio" id="currencyEUROBulk-0" value="EURO" name="currency-0">
                                                                <label for="currencyEUROBulk-0" class="flex justify-between pl-8 pr-2 h-[26px]">
                                                                <div class="text-sm text-slate-800">EURO</div>
                                                            </label>
                                                            </div>
                                                        </li>
                                                        <li class="border-t border-neutral-300">
                                                            <div class="radio-theme radio-theme-xs">
                                                                <input class="hidden" type="radio" id="currencyHKBulk-0" value="HK$" name="currency-0">
                                                                <label for="currencyHKBulk-0" class="flex justify-between pl-8 pr-2 h-[26px]">
                                                                <div class="text-sm text-slate-800">HK$</div>
                                                            </label>
                                                            </div>
                                                        </li>

                                                    </ul>
                                                </div>
                                            </div>
                                            <input type="text" maxlength="6" class="numbersOnly border-neutral-300 border focus:outline-none px-2.5 text-sm h-[26px] w-full md:w-[70px]" />
                                        </div>
                                        <div class="text-md text-neutral-700 font-bold my-1 md:my-0 md:mx-2">Per</div>
                                        <input type="text" class="border-neutral-300 border focus:outline-none px-2.5 text-sm h-[26px] md:w-[100px] mb-2 md:mb-0 md:mr-2" placeholder="1000 - 10000" />
                                        <div class="relative custom-select-wrapper">
                                            <div class="custom-select border-neutral-300 flex items-center border cursor-pointer bg-select-sm bg-no-repeat bg-[98%_center]  md:bg-[95%_center] text-slate-500 md:w-[103px] h-[26px] text-sm">
                                                <span class="custom-select-placehodler text-neutral-400 text-sm font-extralight">Select One </span>
                                                <div class="custom-select-tags-wrapper tag-theme">
                                                    <div class="custom-select-count"></div>
                                                </div>
                                            </div>
                                            <div class="custom-options z-10 border-l border-r border-b border-neutral-300 absolute w-48 top-[100%] mt-[-1px] left-0 right-0 bg-white" style="display: none;">
                                                <ul class="flex flex-col max-h-72 overflow-auto">
                                                    <li class="border-t border-neutral-300">
                                                        <div class="flex items-center">
                                                            <img class="ml-0.5" src="../assets/images/admin/search.svg" width="25" height="25" alt="icon" />
                                                            <input class="text-sm focus:outline-none px-1 flex-1 w-12" type="text" placeholder="Search" />
                                                            <button class="p-1 ml-auto mr-0.5">
                                                                <img width="10" height="10" src="../assets/images/admin/remove-sm.svg" alt="remove"/>
                                                            </button>
                                                        </div>
                                                    </li>
                                                    <li class="border-t border-neutral-300">
                                                        <div class="radio-theme radio-theme-xs">
                                                            <input class="hidden" type="radio" id="unitPieceBulk-0" value="Piece" name="unit-0">
                                                            <label for="unitPieceBulk-0" class="flex justify-between pl-8 pr-2 h-[26px]">
                                                            <div class="text-sm text-slate-800">Piece</div>
                                                        </label>
                                                        </div>
                                                    </li>
                                                    <li class="border-t border-neutral-300">
                                                        <div class="radio-theme radio-theme-xs">
                                                            <input class="hidden" type="radio" id="unitKgBulk-0" value="Twenty-Foot Container" name="unit-0">
                                                            <label for="unitKgBulk-0" class="flex justify-between pl-8 pr-2 h-[26px]">
                                                            <div class="text-sm text-slate-800">Twenty-Foot Container</div>
                                                        </label>
                                                        </div>
                                                    </li>

                                                    <li class="border-t border-neutral-300">
                                                        <div class="radio-theme radio-theme-xs">
                                                            <input class="hidden" type="radio" id="unitGmBulk-0" value="Gm" name="unit-0">
                                                            <label for="unitGmBulk-0" class="flex justify-between pl-8 pr-2 h-[26px]">
                                                            <div class="text-sm text-slate-800">Gm</div>
                                                        </label>
                                                        </div>
                                                    </li>
                                                    <li class="border-t border-neutral-300">
                                                        <div class="radio-theme radio-theme-xs">
                                                            <input class="hidden" type="radio" id="unitMeterBulk-0" value="Meter" name="unit-0">
                                                            <label for="unitMeterBulk-0" class="flex justify-between pl-8 pr-2 h-[26px]">
                                                            <div class="text-sm text-slate-800">Meter</div>
                                                        </label>
                                                        </div>
                                                    </li>
                                                    <li class="border-t border-neutral-300">
                                                        <div class="radio-theme radio-theme-xs">
                                                            <input class="hidden" type="radio" id="unitCentimeterBulk-0" value="Centimeter" name="unit-0">
                                                            <label for="unitCentimeterBulk-0" class="flex justify-between pl-8 pr-2 h-[26px]">
                                                            <div class="text-sm text-slate-800">Centimeter</div>
                                                        </label>
                                                        </div>
                                                    </li>
                                                    <li class="border-t border-neutral-300">
                                                        <div class="radio-theme radio-theme-xs">
                                                            <input class="hidden" type="radio" id="unitSqMeterBulk-0" value="Sq. Meter" name="unit-0">
                                                            <label for="unitSqMeterBulk-0" class="flex justify-between pl-8 pr-2 h-[26px]">
                                                            <div class="text-sm text-slate-800">Sq. Meter</div>
                                                        </label>
                                                        </div>
                                                    </li>
                                                    <li class="border-t border-neutral-300">
                                                        <div class="radio-theme radio-theme-xs">
                                                            <input class="hidden" type="radio" id="unitYardBulk-0" value="Yard" name="unit-0">
                                                            <label for="unitYardBulk-0" class="flex justify-between pl-8 pr-2 h-[26px]">
                                                            <div class="text-sm text-slate-800">Yard</div>
                                                        </label>
                                                        </div>
                                                    </li>
                                                    <li class="border-t border-neutral-300">
                                                        <div class="radio-theme radio-theme-xs">
                                                            <input class="hidden" type="radio" id="unitFootBulk-0" value="Foot" name="unit-0">
                                                            <label for="unitFootBulk-0" class="flex justify-between pl-8 pr-2 h-[26px]">
                                                            <div class="text-sm text-slate-800">Foot</div>
                                                        </label>
                                                        </div>
                                                    </li>
                                                    <li class="border-t border-neutral-300">
                                                        <div class="radio-theme radio-theme-xs">
                                                            <input class="hidden" type="radio" id="unitSqFootBulk-0" value="Sq. Foot" name="unit-0">
                                                            <label for="unitSqFootBulk-0" class="flex justify-between pl-8 pr-2 h-[26px]">
                                                            <div class="text-sm text-slate-800">Sq. Foot</div>
                                                        </label>
                                                        </div>
                                                    </li>
                                                    <li class="border-t border-neutral-300">
                                                        <div class="radio-theme radio-theme-xs">
                                                            <input class="hidden" type="radio" id="unitMillilitreBulk-0" value="Millilitre" name="unit-0">
                                                            <label for="unitMillilitreBulk-0" class="flex justify-between pl-8 pr-2 h-[26px]">
                                                            <div class="text-sm text-slate-800">Millilitre</div>
                                                        </label>
                                                        </div>
                                                    </li>
                                                    <li class="border-t border-neutral-300">
                                                        <div class="radio-theme radio-theme-xs">
                                                            <input class="hidden" type="radio" id="unitLitreBulk-0" value="Litre" name="unit-0">
                                                            <label for="unitLitreBulk-0" class="flex justify-between pl-8 pr-2 h-[26px]">
                                                            <div class="text-sm text-slate-800">Litre</div>
                                                        </label>
                                                        </div>
                                                    </li>
                                                    <li class="border-t border-neutral-300">
                                                        <div class="radio-theme radio-theme-xs">
                                                            <input class="hidden" type="radio" id="unitInchBulk-0" value="Inch" name="unit-0">
                                                            <label for="unitInchBulk-0" class="flex justify-between pl-8 pr-2 h-[26px]">
                                                            <div class="text-sm text-slate-800">Inch</div>
                                                        </label>
                                                        </div>
                                                    </li>
                                                    <li class="border-t border-neutral-300">
                                                        <div class="radio-theme radio-theme-xs">
                                                            <input class="hidden" type="radio" id="unitSqInchBulk-0" value="Sq. Inch" name="unit-0">
                                                            <label for="unitSqInchBulk-0" class="flex justify-between pl-8 pr-2 h-[26px]">
                                                            <div class="text-sm text-slate-800">Sq. Inch</div>
                                                        </label>
                                                        </div>
                                                    </li>
                                                    <li class="border-t border-neutral-300">
                                                        <div class="radio-theme radio-theme-xs">
                                                            <input class="hidden" type="radio" id="unitQuintalBulk-0" value="Quintal" name="unit-0">
                                                            <label for="unitQuintalBulk-0" class="flex justify-between pl-8 pr-2 h-[26px]">
                                                            <div class="text-sm text-slate-800">Quintal</div>
                                                        </label>
                                                        </div>
                                                    </li>
                                                    <li class="border-t border-neutral-300">
                                                        <div class="radio-theme radio-theme-xs">
                                                            <input class="hidden" type="radio" id="unitTonBulk-0" value="Ton" name="unit-0">
                                                            <label for="unitTonBulk-0" class="flex justify-between pl-8 pr-2 h-[26px]">
                                                            <div class="text-sm text-slate-800">Ton</div>
                                                        </label>
                                                        </div>
                                                    </li>
                                                    <li class="border-t border-neutral-300">
                                                        <div class="radio-theme radio-theme-xs">
                                                            <input class="hidden" type="radio" id="unitMetricTonBulk-0" value="Metric Ton" name="unit-0">
                                                            <label for="unitMetricTonBulk-0" class="flex justify-between pl-8 pr-2 h-[26px]">
                                                            <div class="text-sm text-slate-800">Metric Ton</div>
                                                        </label>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>

                                    </div>
                                    <div data-inner-row="bulk-price" class="flex md:items-center flex-col md:flex-row flex-1 mb-2.5">
                                        <div class="flex w-full md:max-w-[166px] border-t border-neutral-200 md:border-0 pt-3 md:pt-0">
                                            <div class="relative custom-select-wrapper">
                                                <div class="custom-select border-neutral-300 flex items-center border-l border-t border-b  cursor-pointer bg-select-sm bg-no-repeat bg-[95%_center] text-slate-500 w-24 h-[26px] bg-neutral-100 text-sm">
                                                    <span class="custom-select-placehodler text-neutral-400 text-sm font-extralight">Select One </span>
                                                    <div class="custom-select-tags-wrapper tag-theme">
                                                        <div class="custom-select-count"></div>
                                                    </div>
                                                </div>
                                                <div class="custom-options z-10 border-l border-r border-b border-neutral-300 absolute top-[100%] mt-[-1px] left-0 right-0 bg-white w-36" style="display: none;">
                                                    <ul class="flex flex-col max-h-72 overflow-auto">
                                                        <li class="border-t border-neutral-300">
                                                            <div class="flex items-center">
                                                                <img class="ml-0.5" src="../assets/images/admin/search.svg" width="25" height="25" alt="icon" />
                                                                <input class="text-sm focus:outline-none px-1 flex-1 w-12" type="text" placeholder="Search" />
                                                                <button class="p-1 ml-auto mr-0.5">
                                                                    <img width="10" height="10" src="../assets/images/admin/remove-sm.svg" alt="remove"/>
                                                                </button>
                                                            </div>
                                                        </li>
                                                        <li class="border-t border-neutral-300">
                                                            <div class="radio-theme radio-theme-xs">
                                                                <input class="hidden" type="radio" id="currencyIDRBulk-0" value="IDR" name="currency-0">
                                                                <label for="currencyIDRBulk-0" class="flex justify-between pl-8 pr-2 h-[26px]">
                                                                <div class="text-sm text-slate-800">IDR</div>
                                                            </label>
                                                            </div>
                                                        </li>
                                                        <li class="border-t border-neutral-300">
                                                            <div class="radio-theme radio-theme-xs">
                                                                <input class="hidden" type="radio" id="currencyUSBulk-0" value="US$" name="currency-0">
                                                                <label for="currencyUSBulk-0" class="flex justify-between pl-8 pr-2 h-[26px]">
                                                                <div class="text-sm text-slate-800">US$</div>
                                                            </label>
                                                            </div>
                                                        </li>
                                                        <li class="border-t border-neutral-300">
                                                            <div class="radio-theme radio-theme-xs">
                                                                <input class="hidden" type="radio" id="currencyAUBulk-0" value="AU$" name="currency-0">
                                                                <label for="currencyAUBulk-0" class="flex justify-between pl-8 pr-2 h-[26px]">
                                                                <div class="text-sm text-slate-800">AU$</div>
                                                            </label>
                                                            </div>
                                                        </li>
                                                        <li class="border-t border-neutral-300">
                                                            <div class="radio-theme radio-theme-xs">
                                                                <input class="hidden" type="radio" id="currencySGBulk-0" value="SG$" name="currency-0">
                                                                <label for="currencySGBulk-0" class="flex justify-between pl-8 pr-2 h-[26px]">
                                                                <div class="text-sm text-slate-800">SG$</div>
                                                            </label>
                                                            </div>
                                                        </li>
                                                        <li class="border-t border-neutral-300">
                                                            <div class="radio-theme radio-theme-xs">
                                                                <input class="hidden" type="radio" id="currencyCADBulk-0" value="CAD$" name="currency-0">
                                                                <label for="currencyCADBulk-0" class="flex justify-between pl-8 pr-2 h-[26px]">
                                                                <div class="text-sm text-slate-800">CAD$</div>
                                                            </label>
                                                            </div>
                                                        </li>
                                                        <li class="border-t border-neutral-300">
                                                            <div class="radio-theme radio-theme-xs">
                                                                <input class="hidden" type="radio" id="currencyINRBulk-0" value="INR$" name="currency-0">
                                                                <label for="currencyINRBulk-0" class="flex justify-between pl-8 pr-2 h-[26px]">
                                                                <div class="text-sm text-slate-800">INR$</div>
                                                            </label>
                                                            </div>
                                                        </li>
                                                        <li class="border-t border-neutral-300">
                                                            <div class="radio-theme radio-theme-xs">
                                                                <input class="hidden" type="radio" id="currencyBahtBulk-0" value="Baht" name="currency-0">
                                                                <label for="currencyBahtBulk-0" class="flex justify-between pl-8 pr-2 h-[26px]">
                                                                <div class="text-sm text-slate-800">Baht</div>
                                                            </label>
                                                            </div>
                                                        </li>
                                                        <li class="border-t border-neutral-300">
                                                            <div class="radio-theme radio-theme-xs">
                                                                <input class="hidden" type="radio" id="currencyVNDBulk-0" value="VND" name="currency-0">
                                                                <label for="currencyVNDBulk-0" class="flex justify-between pl-8 pr-2 h-[26px]">
                                                                <div class="text-sm text-slate-800">VND</div>
                                                            </label>
                                                            </div>
                                                        </li>
                                                        <li class="border-t border-neutral-300">
                                                            <div class="radio-theme radio-theme-xs">
                                                                <input class="hidden" type="radio" id="currencyPESOBulk-0" value="PESO" name="currency-0">
                                                                <label for="currencyPESOBulk-0" class="flex justify-between pl-8 pr-2 h-[26px]">
                                                                <div class="text-sm text-slate-800">PESO</div>
                                                            </label>
                                                            </div>
                                                        </li>
                                                        <li class="border-t border-neutral-300">
                                                            <div class="radio-theme radio-theme-xs">
                                                                <input class="hidden" type="radio" id="currencyRINGGITBulk-0" value="RINGGIT" name="currency-0">
                                                                <label for="currencyRINGGITBulk-0" class="flex justify-between pl-8 pr-2 h-[26px]">
                                                                <div class="text-sm text-slate-800">RINGGIT</div>
                                                            </label>
                                                            </div>
                                                        </li>
                                                        <li class="border-t border-neutral-300">
                                                            <div class="radio-theme radio-theme-xs">
                                                                <input class="hidden" type="radio" id="currencyEUROBulk-0" value="EURO" name="currency-0">
                                                                <label for="currencyEUROBulk-0" class="flex justify-between pl-8 pr-2 h-[26px]">
                                                                <div class="text-sm text-slate-800">EURO</div>
                                                            </label>
                                                            </div>
                                                        </li>
                                                        <li class="border-t border-neutral-300">
                                                            <div class="radio-theme radio-theme-xs">
                                                                <input class="hidden" type="radio" id="currencyHKBulk-0" value="HK$" name="currency-0">
                                                                <label for="currencyHKBulk-0" class="flex justify-between pl-8 pr-2 h-[26px]">
                                                                <div class="text-sm text-slate-800">HK$</div>
                                                            </label>
                                                            </div>
                                                        </li>

                                                    </ul>
                                                </div>
                                            </div>
                                            <input type="text" maxlength="6" class="numbersOnly border-neutral-300 border focus:outline-none px-2.5 text-sm h-[26px] w-full md:w-[70px]" />
                                        </div>
                                        <div class="text-md text-neutral-700 font-bold my-1 md:my-0 md:mx-2">Per</div>
                                        <input type="text" class="border-neutral-300 border focus:outline-none px-2.5 text-sm h-[26px] md:w-[100px] mb-2 md:mb-0 md:mr-2" placeholder="1000 - 10000" />
                                        <div class="relative custom-select-wrapper">
                                            <div class="custom-select border-neutral-300 flex items-center border cursor-pointer bg-select-sm bg-no-repeat bg-[98%_center] md:bg-[95%_center] text-slate-500 w-full md:w-[103px] h-[26px] text-sm">
                                                <span class="custom-select-placehodler text-neutral-400 text-sm font-extralight">Select One </span>
                                                <div class="custom-select-tags-wrapper tag-theme">
                                                    <div class="custom-select-count"></div>
                                                </div>
                                            </div>
                                            <div class="custom-options z-10 border-l border-r border-b border-neutral-300 absolute w-48 top-[100%] mt-[-1px] left-0 right-0 bg-white" style="display: none;">
                                                <ul class="flex flex-col max-h-72 overflow-auto">
                                                    <li class="border-t border-neutral-300">
                                                        <div class="flex items-center">
                                                            <img class="ml-0.5" src="../assets/images/admin/search.svg" width="25" height="25" alt="icon" />
                                                            <input class="text-sm focus:outline-none px-1 flex-1 w-12" type="text" placeholder="Search" />
                                                            <button class="p-1 ml-auto mr-0.5">
                                                                <img width="10" height="10" src="../assets/images/admin/remove-sm.svg" alt="remove"/>
                                                            </button>
                                                        </div>
                                                    </li>
                                                    <li class="border-t border-neutral-300">
                                                        <div class="radio-theme radio-theme-xs">
                                                            <input class="hidden" type="radio" id="unitPieceBulk-0" value="Piece" name="unit-0">
                                                            <label for="unitPieceBulk-0" class="flex justify-between pl-8 pr-2 h-[26px]">
                                                            <div class="text-sm text-slate-800">Piece</div>
                                                        </label>
                                                        </div>
                                                    </li>
                                                    <li class="border-t border-neutral-300">
                                                        <div class="radio-theme radio-theme-xs">
                                                            <input class="hidden" type="radio" id="unitKgBulk-0" value="Twenty-Foot Container" name="unit-0">
                                                            <label for="unitKgBulk-0" class="flex justify-between pl-8 pr-2 h-[26px]">
                                                            <div class="text-sm text-slate-800">Twenty-Foot Container</div>
                                                        </label>
                                                        </div>
                                                    </li>

                                                    <li class="border-t border-neutral-300">
                                                        <div class="radio-theme radio-theme-xs">
                                                            <input class="hidden" type="radio" id="unitGmBulk-0" value="Gm" name="unit-0">
                                                            <label for="unitGmBulk-0" class="flex justify-between pl-8 pr-2 h-[26px]">
                                                            <div class="text-sm text-slate-800">Gm</div>
                                                        </label>
                                                        </div>
                                                    </li>
                                                    <li class="border-t border-neutral-300">
                                                        <div class="radio-theme radio-theme-xs">
                                                            <input class="hidden" type="radio" id="unitMeterBulk-0" value="Meter" name="unit-0">
                                                            <label for="unitMeterBulk-0" class="flex justify-between pl-8 pr-2 h-[26px]">
                                                            <div class="text-sm text-slate-800">Meter</div>
                                                        </label>
                                                        </div>
                                                    </li>
                                                    <li class="border-t border-neutral-300">
                                                        <div class="radio-theme radio-theme-xs">
                                                            <input class="hidden" type="radio" id="unitCentimeterBulk-0" value="Centimeter" name="unit-0">
                                                            <label for="unitCentimeterBulk-0" class="flex justify-between pl-8 pr-2 h-[26px]">
                                                            <div class="text-sm text-slate-800">Centimeter</div>
                                                        </label>
                                                        </div>
                                                    </li>
                                                    <li class="border-t border-neutral-300">
                                                        <div class="radio-theme radio-theme-xs">
                                                            <input class="hidden" type="radio" id="unitSqMeterBulk-0" value="Sq. Meter" name="unit-0">
                                                            <label for="unitSqMeterBulk-0" class="flex justify-between pl-8 pr-2 h-[26px]">
                                                            <div class="text-sm text-slate-800">Sq. Meter</div>
                                                        </label>
                                                        </div>
                                                    </li>
                                                    <li class="border-t border-neutral-300">
                                                        <div class="radio-theme radio-theme-xs">
                                                            <input class="hidden" type="radio" id="unitYardBulk-0" value="Yard" name="unit-0">
                                                            <label for="unitYardBulk-0" class="flex justify-between pl-8 pr-2 h-[26px]">
                                                            <div class="text-sm text-slate-800">Yard</div>
                                                        </label>
                                                        </div>
                                                    </li>
                                                    <li class="border-t border-neutral-300">
                                                        <div class="radio-theme radio-theme-xs">
                                                            <input class="hidden" type="radio" id="unitFootBulk-0" value="Foot" name="unit-0">
                                                            <label for="unitFootBulk-0" class="flex justify-between pl-8 pr-2 h-[26px]">
                                                            <div class="text-sm text-slate-800">Foot</div>
                                                        </label>
                                                        </div>
                                                    </li>
                                                    <li class="border-t border-neutral-300">
                                                        <div class="radio-theme radio-theme-xs">
                                                            <input class="hidden" type="radio" id="unitSqFootBulk-0" value="Sq. Foot" name="unit-0">
                                                            <label for="unitSqFootBulk-0" class="flex justify-between pl-8 pr-2 h-[26px]">
                                                            <div class="text-sm text-slate-800">Sq. Foot</div>
                                                        </label>
                                                        </div>
                                                    </li>
                                                    <li class="border-t border-neutral-300">
                                                        <div class="radio-theme radio-theme-xs">
                                                            <input class="hidden" type="radio" id="unitMillilitreBulk-0" value="Millilitre" name="unit-0">
                                                            <label for="unitMillilitreBulk-0" class="flex justify-between pl-8 pr-2 h-[26px]">
                                                            <div class="text-sm text-slate-800">Millilitre</div>
                                                        </label>
                                                        </div>
                                                    </li>
                                                    <li class="border-t border-neutral-300">
                                                        <div class="radio-theme radio-theme-xs">
                                                            <input class="hidden" type="radio" id="unitLitreBulk-0" value="Litre" name="unit-0">
                                                            <label for="unitLitreBulk-0" class="flex justify-between pl-8 pr-2 h-[26px]">
                                                            <div class="text-sm text-slate-800">Litre</div>
                                                        </label>
                                                        </div>
                                                    </li>
                                                    <li class="border-t border-neutral-300">
                                                        <div class="radio-theme radio-theme-xs">
                                                            <input class="hidden" type="radio" id="unitInchBulk-0" value="Inch" name="unit-0">
                                                            <label for="unitInchBulk-0" class="flex justify-between pl-8 pr-2 h-[26px]">
                                                            <div class="text-sm text-slate-800">Inch</div>
                                                        </label>
                                                        </div>
                                                    </li>
                                                    <li class="border-t border-neutral-300">
                                                        <div class="radio-theme radio-theme-xs">
                                                            <input class="hidden" type="radio" id="unitSqInchBulk-0" value="Sq. Inch" name="unit-0">
                                                            <label for="unitSqInchBulk-0" class="flex justify-between pl-8 pr-2 h-[26px]">
                                                            <div class="text-sm text-slate-800">Sq. Inch</div>
                                                        </label>
                                                        </div>
                                                    </li>
                                                    <li class="border-t border-neutral-300">
                                                        <div class="radio-theme radio-theme-xs">
                                                            <input class="hidden" type="radio" id="unitQuintalBulk-0" value="Quintal" name="unit-0">
                                                            <label for="unitQuintalBulk-0" class="flex justify-between pl-8 pr-2 h-[26px]">
                                                            <div class="text-sm text-slate-800">Quintal</div>
                                                        </label>
                                                        </div>
                                                    </li>
                                                    <li class="border-t border-neutral-300">
                                                        <div class="radio-theme radio-theme-xs">
                                                            <input class="hidden" type="radio" id="unitTonBulk-0" value="Ton" name="unit-0">
                                                            <label for="unitTonBulk-0" class="flex justify-between pl-8 pr-2 h-[26px]">
                                                            <div class="text-sm text-slate-800">Ton</div>
                                                        </label>
                                                        </div>
                                                    </li>
                                                    <li class="border-t border-neutral-300">
                                                        <div class="radio-theme radio-theme-xs">
                                                            <input class="hidden" type="radio" id="unitMetricTonBulk-0" value="Metric Ton" name="unit-0">
                                                            <label for="unitMetricTonBulk-0" class="flex justify-between pl-8 pr-2 h-[26px]">
                                                            <div class="text-sm text-slate-800">Metric Ton</div>
                                                        </label>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                            <div class="flex items-start flex-col md:flex-row mb-2.5">
                                <div class="text-md text-neutral-800 font-medium w-52 leading-6 mb-0.5 md:mb-0">Weight / Size of Packaging</div>
                                <div class="flex flex-col justify-center flex-1">
                                    <div data-inner-row="weight-size" class="flex items-center flex-1 mb-2.5">
                                        <div class="flex w-full max-w-[130px] md:max-w-[81px] mr-3">
                                            <input type="text" maxlength="6" class="numbersOnly border-neutral-300 border focus:outline-none px-2.5 text-sm h-[26px] w-full" />
                                        </div>
                                        <div class="relative custom-select-wrapper">
                                            <div class="custom-select border-neutral-300 flex items-center border cursor-pointer bg-select-sm bg-no-repeat bg-[95%_center] text-slate-500 w-[123px] h-[26px] text-sm">
                                                <span class="custom-select-placehodler text-neutral-400 text-sm font-extralight">Select One </span>
                                                <div class="custom-select-tags-wrapper tag-theme">
                                                    <div class="custom-select-count"></div>
                                                </div>
                                            </div>
                                            <div class="custom-options z-10 border-l border-r border-b border-neutral-300 w-48 absolute top-[100%] mt-[-1px] left-0 right-0 bg-white" style="display: none;">
                                                <ul class="flex flex-col max-h-72 overflow-auto">
                                                    <li class="border-t border-neutral-300">
                                                        <div class="flex items-center">
                                                            <img class="ml-0.5" src="../assets/images/admin/search.svg" width="25" height="25" alt="icon" />
                                                            <input class="text-sm focus:outline-none px-1 flex-1 w-12" type="text" placeholder="Search" />
                                                            <button class="p-1 ml-auto mr-0.5">
                                                                <img width="10" height="10" src="../assets/images/admin/remove-sm.svg" alt="remove"/>
                                                            </button>
                                                        </div>
                                                    </li>
                                                    <li class="border-t border-neutral-300">
                                                        <div class="radio-theme radio-theme-xs">
                                                            <input class="hidden" type="radio" id="weightPiece-0" value="Piece" name="weight-0">
                                                            <label for="weightPiece-0" class="flex justify-between pl-8 pr-2 h-[26px]">
                                                            <div class="text-sm text-slate-800">Piece</div>
                                                        </label>
                                                        </div>
                                                    </li>
                                                    <li class="border-t border-neutral-300">
                                                        <div class="radio-theme radio-theme-xs">
                                                            <input class="hidden" type="radio" id="weightKg-0" value="Kg" name="weight-0">
                                                            <label for="weightKg-0" class="flex justify-between pl-8 pr-2 h-[26px]">
                                                            <div class="text-sm text-slate-800">Kg</div>
                                                        </label>
                                                        </div>
                                                    </li>
                                                    <li class="border-t border-neutral-300">
                                                        <div class="radio-theme radio-theme-xs">
                                                            <input class="hidden" type="radio" id="weightGm-0" value="Gm" name="weight-0">
                                                            <label for="weightGm-0" class="flex justify-between pl-8 pr-2 h-[26px]">
                                                            <div class="text-sm text-slate-800">Gm</div>
                                                        </label>
                                                        </div>
                                                    </li>
                                                    <li class="border-t border-neutral-300">
                                                        <div class="radio-theme radio-theme-xs">
                                                            <input class="hidden" type="radio" id="weightMeter-0" value="Meter" name="weight-0">
                                                            <label for="weightMeter-0" class="flex justify-between pl-8 pr-2 h-[26px]">
                                                            <div class="text-sm text-slate-800">Meter</div>
                                                        </label>
                                                        </div>
                                                    </li>
                                                    <li class="border-t border-neutral-300">
                                                        <div class="radio-theme radio-theme-xs">
                                                            <input class="hidden" type="radio" id="weightCentimeter-0" value="Centimeter" name="weight-0">
                                                            <label for="weightCentimeter-0" class="flex justify-between pl-8 pr-2 h-[26px]">
                                                            <div class="text-sm text-slate-800">Centimeter</div>
                                                        </label>
                                                        </div>
                                                    </li>
                                                    <li class="border-t border-neutral-300">
                                                        <div class="radio-theme radio-theme-xs">
                                                            <input class="hidden" type="radio" id="weightSqMeter-0" value="Sq. Meter" name="weight-0">
                                                            <label for="weightSqMeter-0" class="flex justify-between pl-8 pr-2 h-[26px]">
                                                            <div class="text-sm text-slate-800">Sq. Meter</div>
                                                        </label>
                                                        </div>
                                                    </li>
                                                    <li class="border-t border-neutral-300">
                                                        <div class="radio-theme radio-theme-xs">
                                                            <input class="hidden" type="radio" id="weightYard-0" value="Yard" name="weight-0">
                                                            <label for="weightYard-0" class="flex justify-between pl-8 pr-2 h-[26px]">
                                                            <div class="text-sm text-slate-800">Yard</div>
                                                        </label>
                                                        </div>
                                                    </li>
                                                    <li class="border-t border-neutral-300">
                                                        <div class="radio-theme radio-theme-xs">
                                                            <input class="hidden" type="radio" id="weightFoot-0" value="Foot" name="weight-0">
                                                            <label for="weightFoot-0" class="flex justify-between pl-8 pr-2 h-[26px]">
                                                            <div class="text-sm text-slate-800">Foot</div>
                                                        </label>
                                                        </div>
                                                    </li>
                                                    <li class="border-t border-neutral-300">
                                                        <div class="radio-theme radio-theme-xs">
                                                            <input class="hidden" type="radio" id="weightSqFoot-0" value="Sq. Foot" name="weight-0">
                                                            <label for="weightSqFoot-0" class="flex justify-between pl-8 pr-2 h-[26px]">
                                                            <div class="text-sm text-slate-800">Sq. Foot</div>
                                                        </label>
                                                        </div>
                                                    </li>
                                                    <li class="border-t border-neutral-300">
                                                        <div class="radio-theme radio-theme-xs">
                                                            <input class="hidden" type="radio" id="weightMillilitre-0" value="Millilitre" name="weight-0">
                                                            <label for="weightMillilitre-0" class="flex justify-between pl-8 pr-2 h-[26px]">
                                                            <div class="text-sm text-slate-800">Millilitre</div>
                                                        </label>
                                                        </div>
                                                    </li>
                                                    <li class="border-t border-neutral-300">
                                                        <div class="radio-theme radio-theme-xs">
                                                            <input class="hidden" type="radio" id="weightLitre-0" value="Litre" name="weight-0">
                                                            <label for="weightLitre-0" class="flex justify-between pl-8 pr-2 h-[26px]">
                                                            <div class="text-sm text-slate-800">Litre</div>
                                                        </label>
                                                        </div>
                                                    </li>
                                                    <li class="border-t border-neutral-300">
                                                        <div class="radio-theme radio-theme-xs">
                                                            <input class="hidden" type="radio" id="weightInch-0" value="Inch" name="weight-0">
                                                            <label for="weightInch-0" class="flex justify-between pl-8 pr-2 h-[26px]">
                                                            <div class="text-sm text-slate-800">Inch</div>
                                                        </label>
                                                        </div>
                                                    </li>
                                                    <li class="border-t border-neutral-300">
                                                        <div class="radio-theme radio-theme-xs">
                                                            <input class="hidden" type="radio" id="weightSqInch-0" value="Sq. Inch" name="weight-0">
                                                            <label for="weightSqInch-0" class="flex justify-between pl-8 pr-2 h-[26px]">
                                                            <div class="text-sm text-slate-800">Sq. Inch</div>
                                                        </label>
                                                        </div>
                                                    </li>
                                                    <li class="border-t border-neutral-300">
                                                        <div class="radio-theme radio-theme-xs">
                                                            <input class="hidden" type="radio" id="weightQuintal-0" value="Quintal" name="weight-0">
                                                            <label for="weightQuintal-0" class="flex justify-between pl-8 pr-2 h-[26px]">
                                                            <div class="text-sm text-slate-800">Quintal</div>
                                                        </label>
                                                        </div>
                                                    </li>
                                                    <li class="border-t border-neutral-300">
                                                        <div class="radio-theme radio-theme-xs">
                                                            <input class="hidden" type="radio" id="weightTon-0" value="Ton" name="weight-0">
                                                            <label for="weightTon-0" class="flex justify-between pl-8 pr-2 h-[26px]">
                                                            <div class="text-sm text-slate-800">Ton</div>
                                                        </label>
                                                        </div>
                                                    </li>
                                                    <li class="border-t border-neutral-300">
                                                        <div class="radio-theme radio-theme-xs">
                                                            <input class="hidden" type="radio" id="weightMetricTon-0" value="Metric Ton" name="weight-0">
                                                            <label for="weightMetricTon-0" class="flex justify-between pl-8 pr-2 h-[26px]">
                                                            <div class="text-sm text-slate-800">Metric Ton</div>
                                                        </label>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>

                                    </div>
                                    <div data-inner-row="weight-size" class="flex items-center flex-1 mb-2.5">
                                        <div class="flex w-full max-w-[130px] md:max-w-[81px] mr-3">
                                            <input type="text" maxlength="6" class="numbersOnly border-neutral-300 border focus:outline-none px-2.5 text-sm h-[26px] w-full" />
                                        </div>
                                        <div class="relative custom-select-wrapper">
                                            <div class="custom-select border-neutral-300 flex items-center border cursor-pointer bg-select-sm bg-no-repeat bg-[95%_center] text-slate-500 w-[123px] h-[26px] text-sm">
                                                <span class="custom-select-placehodler text-neutral-400 text-sm font-extralight">Select One </span>
                                                <div class="custom-select-tags-wrapper tag-theme">
                                                    <div class="custom-select-count"></div>
                                                </div>
                                            </div>
                                            <div class="custom-options z-10 border-l border-r border-b border-neutral-300 w-48 absolute top-[100%] mt-[-1px] left-0 right-0 bg-white" style="display: none;">
                                                <ul class="flex flex-col max-h-72 overflow-auto">
                                                    <li class="border-t border-neutral-300">
                                                        <div class="flex items-center">
                                                            <img class="ml-0.5" src="../assets/images/admin/search.svg" width="25" height="25" alt="icon" />
                                                            <input class="text-sm focus:outline-none px-1 flex-1 w-12" type="text" placeholder="Search" />
                                                            <button class="p-1 ml-auto mr-0.5">
                                                                <img width="10" height="10" src="../assets/images/admin/remove-sm.svg" alt="remove"/>
                                                            </button>
                                                        </div>
                                                    </li>
                                                    <li class="border-t border-neutral-300">
                                                        <div class="radio-theme radio-theme-xs">
                                                            <input class="hidden" type="radio" id="weightPiece-0" value="Piece" name="weight-0">
                                                            <label for="weightPiece-0" class="flex justify-between pl-8 pr-2 h-[26px]">
                                                            <div class="text-sm text-slate-800">Piece</div>
                                                        </label>
                                                        </div>
                                                    </li>
                                                    <li class="border-t border-neutral-300">
                                                        <div class="radio-theme radio-theme-xs">
                                                            <input class="hidden" type="radio" id="weightKg-0" value="Kg" name="weight-0">
                                                            <label for="weightKg-0" class="flex justify-between pl-8 pr-2 h-[26px]">
                                                            <div class="text-sm text-slate-800">Kg</div>
                                                        </label>
                                                        </div>
                                                    </li>
                                                    <li class="border-t border-neutral-300">
                                                        <div class="radio-theme radio-theme-xs">
                                                            <input class="hidden" type="radio" id="weightGm-0" value="Gm" name="weight-0">
                                                            <label for="weightGm-0" class="flex justify-between pl-8 pr-2 h-[26px]">
                                                            <div class="text-sm text-slate-800">Gm</div>
                                                        </label>
                                                        </div>
                                                    </li>
                                                    <li class="border-t border-neutral-300">
                                                        <div class="radio-theme radio-theme-xs">
                                                            <input class="hidden" type="radio" id="weightMeter-0" value="Meter" name="weight-0">
                                                            <label for="weightMeter-0" class="flex justify-between pl-8 pr-2 h-[26px]">
                                                            <div class="text-sm text-slate-800">Meter</div>
                                                        </label>
                                                        </div>
                                                    </li>
                                                    <li class="border-t border-neutral-300">
                                                        <div class="radio-theme radio-theme-xs">
                                                            <input class="hidden" type="radio" id="weightCentimeter-0" value="Centimeter" name="weight-0">
                                                            <label for="weightCentimeter-0" class="flex justify-between pl-8 pr-2 h-[26px]">
                                                            <div class="text-sm text-slate-800">Centimeter</div>
                                                        </label>
                                                        </div>
                                                    </li>
                                                    <li class="border-t border-neutral-300">
                                                        <div class="radio-theme radio-theme-xs">
                                                            <input class="hidden" type="radio" id="weightSqMeter-0" value="Sq. Meter" name="weight-0">
                                                            <label for="weightSqMeter-0" class="flex justify-between pl-8 pr-2 h-[26px]">
                                                            <div class="text-sm text-slate-800">Sq. Meter</div>
                                                        </label>
                                                        </div>
                                                    </li>
                                                    <li class="border-t border-neutral-300">
                                                        <div class="radio-theme radio-theme-xs">
                                                            <input class="hidden" type="radio" id="weightYard-0" value="Yard" name="weight-0">
                                                            <label for="weightYard-0" class="flex justify-between pl-8 pr-2 h-[26px]">
                                                            <div class="text-sm text-slate-800">Yard</div>
                                                        </label>
                                                        </div>
                                                    </li>
                                                    <li class="border-t border-neutral-300">
                                                        <div class="radio-theme radio-theme-xs">
                                                            <input class="hidden" type="radio" id="weightFoot-0" value="Foot" name="weight-0">
                                                            <label for="weightFoot-0" class="flex justify-between pl-8 pr-2 h-[26px]">
                                                            <div class="text-sm text-slate-800">Foot</div>
                                                        </label>
                                                        </div>
                                                    </li>
                                                    <li class="border-t border-neutral-300">
                                                        <div class="radio-theme radio-theme-xs">
                                                            <input class="hidden" type="radio" id="weightSqFoot-0" value="Sq. Foot" name="weight-0">
                                                            <label for="weightSqFoot-0" class="flex justify-between pl-8 pr-2 h-[26px]">
                                                            <div class="text-sm text-slate-800">Sq. Foot</div>
                                                        </label>
                                                        </div>
                                                    </li>
                                                    <li class="border-t border-neutral-300">
                                                        <div class="radio-theme radio-theme-xs">
                                                            <input class="hidden" type="radio" id="weightMillilitre-0" value="Millilitre" name="weight-0">
                                                            <label for="weightMillilitre-0" class="flex justify-between pl-8 pr-2 h-[26px]">
                                                            <div class="text-sm text-slate-800">Millilitre</div>
                                                        </label>
                                                        </div>
                                                    </li>
                                                    <li class="border-t border-neutral-300">
                                                        <div class="radio-theme radio-theme-xs">
                                                            <input class="hidden" type="radio" id="weightLitre-0" value="Litre" name="weight-0">
                                                            <label for="weightLitre-0" class="flex justify-between pl-8 pr-2 h-[26px]">
                                                            <div class="text-sm text-slate-800">Litre</div>
                                                        </label>
                                                        </div>
                                                    </li>
                                                    <li class="border-t border-neutral-300">
                                                        <div class="radio-theme radio-theme-xs">
                                                            <input class="hidden" type="radio" id="weightInch-0" value="Inch" name="weight-0">
                                                            <label for="weightInch-0" class="flex justify-between pl-8 pr-2 h-[26px]">
                                                            <div class="text-sm text-slate-800">Inch</div>
                                                        </label>
                                                        </div>
                                                    </li>
                                                    <li class="border-t border-neutral-300">
                                                        <div class="radio-theme radio-theme-xs">
                                                            <input class="hidden" type="radio" id="weightSqInch-0" value="Sq. Inch" name="weight-0">
                                                            <label for="weightSqInch-0" class="flex justify-between pl-8 pr-2 h-[26px]">
                                                            <div class="text-sm text-slate-800">Sq. Inch</div>
                                                        </label>
                                                        </div>
                                                    </li>
                                                    <li class="border-t border-neutral-300">
                                                        <div class="radio-theme radio-theme-xs">
                                                            <input class="hidden" type="radio" id="weightQuintal-0" value="Quintal" name="weight-0">
                                                            <label for="weightQuintal-0" class="flex justify-between pl-8 pr-2 h-[26px]">
                                                            <div class="text-sm text-slate-800">Quintal</div>
                                                        </label>
                                                        </div>
                                                    </li>
                                                    <li class="border-t border-neutral-300">
                                                        <div class="radio-theme radio-theme-xs">
                                                            <input class="hidden" type="radio" id="weightTon-0" value="Ton" name="weight-0">
                                                            <label for="weightTon-0" class="flex justify-between pl-8 pr-2 h-[26px]">
                                                            <div class="text-sm text-slate-800">Ton</div>
                                                        </label>
                                                        </div>
                                                    </li>
                                                    <li class="border-t border-neutral-300">
                                                        <div class="radio-theme radio-theme-xs">
                                                            <input class="hidden" type="radio" id="weightMetricTon-0" value="Metric Ton" name="weight-0">
                                                            <label for="weightMetricTon-0" class="flex justify-between pl-8 pr-2 h-[26px]">
                                                            <div class="text-sm text-slate-800">Metric Ton</div>
                                                        </label>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                            <div class="flex mb-4 relative flex-col">
                                <div class="text-md text-neutral-800 font-medium w-52 mb-2 leading-6">Description & Specifications</div>
                                <textarea maxlength="2000" class="count-area valid-input input-empty border-neutral-300 border px-2 text-sm focus:outline-none py-2 w-full h-32 resize-none text-neutral-700 placeholder:text-neutral-700 placeholder:font-light" id="" cols="30" rows="10"></textarea>
                                <div class="absolute -bottom-5 right-0 text-gray-400 text-xs"><span class="count">0</span> / 2000</div>
                            </div>
                            <div class="flex mb-4 relative flex-col">
                                <div class="text-md text-neutral-800 font-medium w-52 mb-2 leading-6">Description & Specifications</div>
                                <textarea maxlength="2000" class="count-area valid-input input-empty border-neutral-300 border px-2 text-sm focus:outline-none py-2 w-full h-32 resize-none text-neutral-700 placeholder:text-neutral-700 placeholder:font-light" id="" cols="30" rows="10"></textarea>
                                <div class="absolute -bottom-5 right-0 text-gray-400 text-xs"><span class="count">0</span> / 2000</div>
                            </div>

                        </div>
                        <div class="flex items-center bg-teal-600 h-12 px-3 md:px-8">
                            <button class="post-product bg-white duration-200 text-teal-600  font-bold text-base leading-4 rounded-sm h-[30px] px-2 md:px-6 mr-2 md:mr-9">Post</button>
                            <button class="save-draft flex items-center border border-white duration-200 text-white text-base leading-4 rounded-sm h-[30px]  px-2 md:px-6 mr-2 md:mr-9"><img class="mr-2 hidden" src="../assets/images/admin/draft.svg" alt="icon"/> <span>Save as draft</span> </button>
                            <a href="javascript:;" class="cancel-editing text-white text-base">Cancel</a>
                            <a href="javascript:;" class="text-yellow-300 text-base ml-auto">Public View</a>
                            <a style="display:none;" href="javascript:;" class="text-teal-600 text-sm ml-4 cancel-draft">Back to Category</a>
                        </div>
                    </div>
                </div>
            </div>
        </li>`;
            $('#productListingSell').prepend(productSell);

            countSell++;
            updateCount();
            productListSellUpdate();
            productListSellInnerUpdate();
        });





        // Deactivated
        $(document).on('click', '.toggleActivate', function(e) {
            e.preventDefault();
            let todayDate = Date.today().toString("MMM d, yyyy");
            if ($(this).html() == "Deactivate") {
                $(this).html('Re-Activate')
                $(this).closest(".image-preview-block").find(".edit-options").removeClass('flex').addClass("hidden");
                $(this).closest(".image-preview-block").find(".deactivated").removeClass("hidden").text(`Deactivated on ${todayDate}`);
                setTimeout(() => {
                    $(this).closest('li').remove().prependTo("#productListingDeactivated");
                    updateCount();
                }, 2000);
            } else {
                $(this).html('Deactivate');
                $(this).closest(".image-preview-block").find(".edit-options").removeClass("hidden").addClass("flex");
                $(this).closest(".image-preview-block").find(".deactivated").addClass("hidden");
                setTimeout(() => {
                    if (($(this).closest('li').hasClass('product-buy'))) {
                        $(this).closest('li').remove().prependTo("#productListingBuy");
                    } else {
                        $(this).closest('li').remove().prependTo("#productListingSell");
                    }
                    updateCount();
                    productListSellUpdate();
                    productListSellInnerUpdate();
                }, 2000);
            }
        });




        // Edit Details
        $(document).on('click', '.edit-details', function(e) {
            e.preventDefault();
            $(this).closest('.image-preview-block').find('.edit-product-block').addClass('active');
        });



        // Cancel Edit Details
        $(document).on('click', '.cancel-editing', function(e) {
            e.preventDefault();
            $(this).closest('.image-preview-block').find('.edit-product-block').removeClass('active');
        });

        // Save Draft Details
        $(document).on('click', '.save-draft', function(e) {
            e.preventDefault();
            $(this).find('img').removeClass('hidden');
            $(this).find('span').text('Saved as draft');
        });



        // Hide Edit Details
        $(document).on('click', '.hide-editing', function(e) {
            e.preventDefault();
            $(this).closest('.image-preview-block').find('.edit-product-block').removeClass('active');
        });


        $(document).on('blur', '.valid-input', function(e) {
            var inputLength = $(this).val().length;
            if (inputLength > 0) {
                $(this).removeClass('input-empty');
            } else {
                $(this).addClass('input-empty');
            }
        });

        $(document).on('focus', '.valid-input', function(e) {
            $(this).removeClass('input-empty');
        });

        $(document).on('click', '.post-product', function(e) {
            e.preventDefault();

            $(this).closest('.image-preview-block').find('.saving-spinner').fadeIn();
            setTimeout(() => {
                $(this).closest('.image-preview-block').find('.saving-spinner').fadeOut();
                $(this).closest('.image-preview-block').find('.saving-data').fadeIn();
                setTimeout(() => {
                    $(this).closest('.image-preview-block').find('.saving-data').fadeOut();
                    $(this).closest('.image-preview-block').find('.edit-product-block').removeClass('active');
                }, 2000);
            }, 2000);
        });
    }
});