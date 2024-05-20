$(document).ready(function() {


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
        $("#sellTab").click(function() {
            $(this).siblings().removeClass('active');
            $(this).addClass('active');
            $('#sell').fadeIn();
            $('#productFilter > li').removeClass('active');
            $('#productFilter > [data-tab="tabSell"]').addClass('active');
            $('.tab-content').removeClass('active');
            $('#tabSell').addClass('active');
            $('#buy').hide();
            $('#buyProductSuggestion').hide();
            $('#sellProductSuggestion').show();
        });

        function disableCompanyBtnSell() {
            if ($("#productSelectedTagsSell li").length > 0) {
                $('#companyInfoBtnSell').prop('disabled', false);
                $('#productSearchBtnSell').fadeOut();
            } else {
                $('#companyInfoBtnSell').prop('disabled', true);
                $('#productSearchBtnSell').fadeIn();
            }
        }

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



        $('#companyMainProductSell #productInputSell').on('input', function() {
            var val = this.value.toLowerCase();
            $('#companyProductListSell').find('li').filter(function() {
                return $(this).data('id').toLowerCase().indexOf(val) > -1;
            }).show().end().filter(':visible').filter(function() {
                return $(this).data('id').toLowerCase().indexOf(val) === -1;
            }).hide();
        });


        $('#companyMainProductSell #productInputSell').on('keyup', function() {
            if ($(this).val().length > 2) {
                $('#companyProductListSell').fadeIn(100);
            } else {
                $('#companyProductListSell').fadeOut(100);
            }
        });

        $(document).on('click', '.remove-sell', function(e) {
            $(this).closest('li').remove();
            let listName = $(this).closest('li').find('span').html();
            let listTag = `<li data-id="${listName}" class="cursor-pointer block px-[13px] py-[2px] text-md text-teal-600 text-left truncate border-b border-gray-200 hover:bg-gray-100 duration-150">${listName}</li>`;
            $('#companyProductListSell').append(listTag);
            disableCompanyBtnSell();
        });

        $(document).on('click', '.remove-suggestions-sell', function(e) {
            $(this).closest('li').remove();
            let listName = $(this).closest('li').find('span').html();
            let listTag = `<li>
                            <a class="flex items-center" href="javascript:;"> <img class="mr-1" src="../assets/images/client-admin/plus.svg" alt="icon"> <span>${listName}</span> </a>
                        </li>`;
            $('#allProductListSell').append(listTag);
            disableCompanyBtnSell();
        });


        $(document).on('click', '#companyProductListSell li', function(e) {
            let productTagName = $(this).html();
            $(this).remove();
            let productTag = `<li class="product-tag">
                            <span class="block mr-3.5 text-base text-neutral-800">${productTagName}</span>
                            <button class="remove-sell remove-item">
                                <img src="../assets/images/close-sm.svg" alt="close"/>
                            </button>
                        </li>`;
            $('#productSelectedTagsSell').append(productTag);
            $('#productInputSell').val('');
            $('#companyProductListSell').fadeOut(100);
            $('#loadingProductSell').fadeIn();
            setTimeout(function() {
                $("#loadingProductSell").hide();
            }, 2000);
            disableCompanyBtnSell();
        });

        $(document).on('click', '#allProductListSell li a', function(e) {
            let productName = $(this).find('span').html();
            $(this).closest('li').remove();
            let product = `<li class="product-tag">
                            <span class="block mr-3.5 text-base text-neutral-800">${productName}</span>
                            <button class="remove-suggestions-sell remove-item">
                                <img src="../assets/images/close-sm.svg" alt="close"/>
                            </button>
                        </li>`;
            $('#productSelectedTagsSell').append(product);
            disableCompanyBtnSell();
        });


        let countSell = 0;
        $('#companyInfoBtnSell').on('click', function() {
            var arrListSell = [],
                i = 0;
            $('#productSelectedTagsSell .product-tag').each(function() {
                arrListSell[i++] = $(this).find('span').html();
            });
            for (let [index, listSell] of arrListSell.entries()) {
                let productSell = ` <li class="flex border border-neutral-300 px-3.5 py-3.5 mt-3 image-preview-block product-sell relative">
                        <div class="saving-spinner flex justify-center items-center absolute inset-0 bg-black/[.8] z-10" style="display:none;">
                                <img class="animate-spin" src="../assets/images/client-admin/spinner.svg" alt="icon" />
                            </div>
                            <div class="saving-data flex justify-center items-center absolute inset-0 bg-black/[.8] z-10" style="display:none;">
                                <div class="bg-white flex items-center justify-center flex-col text-center px-24 py-16">
                                    <h4 class="text-neutral-800 text-base mb-8">The product details are live</h4>
                                    <button type="button" class="bg-teal-600 text-white text-base px-10 py-1.5">Public View</button>
                                </div>
                            </div>
                        <div class="flex mr-4 bg-cover self-start" id="image-preview-sell-${index + countSell}">
                            <input type="file" id="image-upload-sell-${index + countSell}" class="hidden">
                            <label id="image-label-sell-${index + countSell}" for="image-upload-sell-${index + countSell}" class="image-preview">Add Image</label>
                        </div>
                        <div class="flex-1 flex flex-col justify-between">
                            <h4 class="text-neutral-800 text-md font-semibold">${listSell}</h4>
                            <div class="edit-options-block flex items-end">
                                    <div class="flex items-center edit-options">
                                    <a href="javascript:;" class="edit-details">Details (<span class="filled-inputs">0</span>/6) </a>
                                    <a href="javascript:;" style="display:none;" class="saved-details border border-teal-600 hover:bg-teal-600 duration-200 text-teal-600 hover:text-white text-sm leading-4 rounded-2xl font-medium h-6 px-4">Details (<span class="filled-inputs">0</span>/6)</a>
                                    <a href="javascript:;" class="text-teal-600 text-sm ml-4">Public View</a>

                                    </div>
                                    <div class="deactivated text-sm text-red-400 hidden">Deactivated on Jun 12, 2022</div>
                                    <button class="toggleActivate text-neutral-400 text-xs duration-150 hover:text-teal-600 hover:underline ml-auto">Deactivate</button>
                            </div>
                            <div class="edit-product-block flex flex-col mt-11" style="display:none";>
                                    <div class="flex items-center mb-2.5">
                                        <div class="text-sm text-neutral-700 w-40">Unit Price</div>
                                        <div class="flex items-center flex-1">
                                            <div class="flex w-full">
                                                <div class="relative">
                                                    <select name="currency-type" class="border-neutral-300 w-[76px] h-[26px] cursor-pointer appearance-none border-l border-t border-b flex items-center justify-between text-neutral-700 text-sm px-1 bg-neutral-100" id="">
                                                        <option value="US $">US $</option>
                                                        <option value="INR ₹">INR ₹</option>
                                                    </select>
                                                    <span class="absolute right-2 top-2.5"><img src="../assets/images/client-admin/select-sm.svg" alt="icon" /></span>
                                                </div>
                                                <input name="unit-price" type="text" maxlength="6" class="numbersOnly valid-input input-empty border-neutral-300 border focus:outline-none px-2.5 text-sm h-[26px] w-full" />
                                            </div>
                                            <div class="text-sm text-neutral-700 mx-5">Per</div>
                                            <div class="relative w-full">
                                                <select name="unit-type" class="border-neutral-300 h-[26px] w-full cursor-pointer appearance-none border flex items-center justify-between text-neutral-700 text-sm px-1 bg-white" id="">
                                                    <option value="Kg">Kg</option>
                                                    <option value="Gram">Gram</option>
                                                </select>
                                                <span class="absolute right-2 top-2.5"><img src="../assets/images/client-admin/select-sm.svg" alt="icon" /></span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="flex items-center mb-2.5">
                                        <div class="text-sm text-neutral-700 w-40">Bulk Discount above</div>
                                        <div class="relative flex-1">
                                            <input name="bulk-discount" type="text" maxlength="40" class="valid-input input-empty border border-neutral-300 h-[26px] w-full text-neutral-700 text-sm px-2 bg-white focus:outline-none">
                                        </div>
                                    </div>
                                    <div class="flex items-center mb-2.5">
                                        <div class="text-sm text-neutral-700 w-40">Payment Mode</div>
                                        <div class="relative custom-select-wrapper flex-1">
                                            <div name="payment-mode" class="custom-select valid-input input-empty border border-neutral-300 flex justify-between items-center pr-2 h-[26px] text-sm cursor-pointer">
                                                <span class="custom-select-placehodler">Select one or more</span>
                                                <div class="custom-select-tags-wrapper">
                                                    <div class="custom-select-count"></div>
                                                </div>
                                                <img src="../assets/images/client-admin/select-sm.svg" alt="icon" />
                                            </div>
                                            <div class="custom-options z-10 mt-[-1px] border-l border-r border-b border-neutral-400 absolute top-[100%] left-0 right-0 bg-white" style="display: none;">
                                                <ul class="flex flex-col">
                                                    <li class="border-t border-neutral-400">
                                                        <div class="checkbox-theme checkbox-theme-sm">
                                                            <input class="hidden" type="checkbox" id="onlineBankTransfer-sell-${index + countSell}" value="Online Bank Transfer">
                                                            <label for="onlineBankTransfer-sell-${index + countSell}" class="flex justify-between pl-10 py-1.5 pr-6">
                                                                <div class="text-md text-slate-800">Online Bank Transfer</div>
                                                             </label>
                                                        </div>
                                                    </li>
                                                    <li class="border-t border-neutral-400">
                                                        <div class="checkbox-theme checkbox-theme-sm">
                                                            <input class="hidden" type="checkbox" id="crypto-sell-${index + countSell}" value="Crypto">
                                                            <label for="crypto-sell-${index + countSell}" class="flex justify-between pl-10 py-1.5 pr-6">
                                                                <div class="text-md text-slate-800">Crypto</div>
                                                             </label>
                                                        </div>
                                                    </li>
                                                    <li class="border-t border-neutral-400">
                                                        <div class="checkbox-theme checkbox-theme-sm">
                                                            <input class="hidden" type="checkbox" id="paypal-sell-${index + countSell}" value="Paypal">
                                                            <label for="paypal-sell-${index + countSell}" class="flex justify-between pl-10 py-1.5 pr-6">
                                                                <div class="text-md text-slate-800">Paypal</div>
                                                             </label>
                                                        </div>
                                                    </li>
                                                    <li class="border-t border-neutral-400">
                                                        <div class="checkbox-theme checkbox-theme-sm">
                                                            <input class="hidden" type="checkbox" id="creditDebit-sell-${index + countSell}" value="Credit / Debit Card">
                                                            <label for="creditDebit-sell-${index + countSell}" class="flex justify-between pl-10 py-1.5 pr-6">
                                                                <div class="text-md text-slate-800">Credit / Debit Card</div>
                                                             </label>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="flex items-center mb-2.5">
                                        <div class="text-sm text-neutral-700 w-40">Geography Served </div>
                                        <div class="relative custom-select-wrapper flex-1">
                                            <div name="geography-served" class="custom-select valid-input input-empty border border-neutral-300 flex justify-between items-center pr-2 h-[26px] text-sm cursor-pointer">
                                                <span class="custom-select-placehodler"></span>
                                                <div class="custom-select-tags-wrapper">
                                                    <div class="custom-select-count"></div>
                                                </div>
                                                <img src="../assets/images/client-admin/select-sm.svg" alt="icon" />
                                            </div>
                                            <div class="custom-options z-10 border-l border-r border-b border-neutral-400 absolute top-[100%] mt-[-1px] left-0 right-0 bg-white" style="display: none;">
                                                <ul class="flex flex-col">
                                                    <li class="border-t border-neutral-400">
                                                        <div class="radio-theme radio-theme-sm">
                                                            <input class="hidden" type="radio" id="withInCountry-sell-${index + countSell}" value="With-in country-name" name="country">
                                                            <label for="withInCountry-sell-${index + countSell}" class="flex justify-between pl-10 py-1.5 pr-6">
                                                                <div class="text-md text-slate-800">With-in country-name</div>
                                                             </label>
                                                        </div>
                                                    </li>
                                                    <li class="border-t border-neutral-400">
                                                        <div class="radio-theme radio-theme-sm">
                                                            <input class="hidden" type="radio" id="southEastAsia-sell-${index + countSell}" value="South East Asia" name="country">
                                                            <label for="southEastAsia-sell-${index + countSell}" class="flex justify-between pl-10 py-1.5 pr-6">
                                                                <div class="text-md text-slate-800">South East Asia</div>
                                                             </label>
                                                        </div>
                                                    </li>
                                                    <li class="border-t border-neutral-400">
                                                        <div class="radio-theme radio-theme-sm">
                                                            <input class="hidden" type="radio" id="europe-sell-${index + countSell}" value="Europe" name="country">
                                                            <label for="europe-sell-${index + countSell}" class="flex justify-between pl-10 py-1.5 pr-6">
                                                                <div class="text-md text-slate-800">Europe</div>
                                                             </label>
                                                        </div>
                                                    </li>
                                                    <li class="border-t border-neutral-400">
                                                        <div class="radio-theme radio-theme-sm">
                                                            <input class="hidden" type="radio" id="schengenRegion-sell-${index + countSell}" value="Schengzen Region" name="country">
                                                            <label for="schengenRegion-sell-${index + countSell}" class="flex justify-between pl-10 py-1.5 pr-6">
                                                                <div class="text-md text-slate-800">Schengzen Region</div>
                                                             </label>
                                                        </div>
                                                    </li>
                                                    <li class="border-t border-neutral-400">
                                                        <div class="radio-theme radio-theme-sm">
                                                            <input class="hidden" type="radio" id="americas-sell-${index + countSell}" value="Americas" name="country">
                                                            <label for="americas-sell-${index + countSell}" class="flex justify-between pl-10 py-1.5 pr-6">
                                                                <div class="text-md text-slate-800">Americas</div>
                                                             </label>
                                                        </div>
                                                    </li>
                                                    <li class="border-t border-neutral-400">
                                                        <div class="radio-theme radio-theme-sm">
                                                            <input class="hidden" type="radio" id="africa-sell-${index + countSell}" value="Africa" name="country">
                                                            <label for="africa-sell-${index + countSell}" class="flex justify-between pl-10 py-1.5 pr-6">
                                                                <div class="text-md text-slate-800">Africa</div>
                                                             </label>
                                                        </div>
                                                    </li>

                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="flex items-center mb-5">
                                        <div class="text-sm text-neutral-700 w-40">Real time Tracking</div>
                                        <div class="relative flex-1">
                                            <input name="real-time-tracking" maxlength="40" type="text" class="valid-input input-empty border border-neutral-300 h-[26px] w-full text-neutral-700 text-sm px-2 bg-white focus:outline-none">
                                        </div>
                                    </div>
                                    <div class="flex mb-10 relative">
                                        <textarea name="technical-details" maxlength="2000" class="count-area valid-input input-empty border-neutral-300 border px-2 text-sm focus:outline-none py-2 w-full h-32 resize-none text-neutral-700 placeholder:text-neutral-700 placeholder:font-light" id="" cols="30" rows="10" placeholder="Describe technical details or any specific configuration or usage ...."></textarea>
                                        <div class="absolute -bottom-5 right-0 text-gray-400 text-xs"><span class="count">0</span> / 2000</div>
                                    </div>
                                    <div class="flex items-center">
                                        <button class="post-product bg-teal-600 hover:bg-teal-700 duration-200 text-white w-24 text-sm leading-4 rounded-2xl font-medium h-6 px-4">Save</button>
                                         <a style="display:none;" href="javascript:;" class="text-teal-600 text-sm ml-4 cancel-draft">Back to Category</a>
                                        <a href="javascript:;" class="cancel-editing text-neutral-500 text-sm ml-auto">Cancel</a>
                                    </div>
                                </div>
                                <div class="saved-product-block flex flex-col mt-11" style="display:none;">
                                <div class="flex mb-4">
                                    <div class="text-sm text-neutral-700 font-bold w-40">Unit Price</div>
                                    <div class="text-sm text-neutral-700 flex-1"><span class="currencyTypeVal"></span> <span class="unitPriceVal"></span> per <span class="unitTypeVal"></span></div>
                                </div>
                                <div class="flex mb-4">
                                    <div class="text-sm text-neutral-700 font-bold w-40">Bulk Discount above</div>
                                    <div class="text-sm text-neutral-700 flex-1"><span class="bulkDiscountVal"></span></div>
                                </div>
                                <div class="flex mb-4">
                                    <div class="text-sm text-neutral-700 font-bold w-40">Payment Mode</div>
                                    <div class="text-sm text-neutral-700 flex-1"><span class="paymentModeVal"></span></div>
                                </div>
                                <div class="flex mb-4">
                                    <div class="text-sm text-neutral-700 font-bold w-40">Geography Served</div>
                                    <div class="text-sm text-neutral-700 flex-1"><span class="geographyServedVal"></span></div>
                                </div>
                                <div class="flex mb-4">
                                    <div class="text-sm text-neutral-700 font-bold w-40">Real time Tracking</div>
                                    <div class="text-sm text-neutral-700 flex-1"><span class="realTimeTrackingVal"></span></div>
                                </div>
                                <div class="flex mb-10">
                                    <div class="text-sm text-neutral-700 flex-1"><span class="technicalDetailsVal"></span></div>
                                </div>
                                <div class="flex items-center">
                                    <button class="edit-product-btn border border-teal-600 w-24 hover:bg-teal-600 duration-200 text-teal-600 hover:text-white text-sm leading-4 rounded-2xl font-medium h-6 px-4">Edit</button>
                                    <a href="javascript:;" class="cancel-saved text-neutral-500 text-sm ml-auto">Cancel</a>
                                </div>
                            </div>
                        </div>
                    </li>`;
                $('#productListingSell').prepend(productSell);
            }
            countSell = countSell + arrListSell.length;
            updateCount();
            productListSellUpdate();
            $('#productSelectedTagsSell').find('li').remove();
            disableCompanyBtnSell();
        });


        // Buy 
        $("#buyTab").click(function() {
            $(this).siblings().removeClass('active');
            $(this).addClass('active');
            $('#buy').fadeIn();
            $('#productFilter > li').removeClass('active');
            $('#productFilter > [data-tab="tabBuy"]').addClass('active');
            $('.tab-content').removeClass('active');
            $('#tabBuy').addClass('active');
            $('#sell').hide();
            $('#sellProductSuggestion').hide();
            $('#buyProductSuggestion').show();
        });

        function disableCompanyBtnBuy() {
            if ($("#productSelectedTagsBuy li").length > 0) {
                $('#companyInfoBtnBuy').prop('disabled', false);
                $('#productSearchBtnBuy').fadeOut();
            } else {
                $('#companyInfoBtnBuy').prop('disabled', true);
                $('#productSearchBtnBuy').fadeIn();
            }
        }

        function productListBuyUpdate() {
            $("#productListingBuy .image-preview-block").each(function(index) {
                $.uploadPreview({
                    input_field: `#image-upload-buy-${index}`, // Default: .image-upload
                    preview_box: `#image-preview-buy-${index}`, // Default: .image-preview
                    label_field: `#image-label-buy-${index}`, // Default: .image-label
                    label_default: "Choose File", // Default: Choose File
                    label_selected: "Change File", // Default: Change File
                    no_label: false // Default: false
                });
            });
        }

        $('#companyMainProductBuy #productInputBuy').on('input', function() {
            var val = this.value.toLowerCase();
            $('#companyProductListBuy').find('li').filter(function() {
                return $(this).data('id').toLowerCase().indexOf(val) > -1;
            }).show().end().filter(':visible').filter(function() {
                return $(this).data('id').toLowerCase().indexOf(val) === -1;
            }).hide();
        });


        $('#companyMainProductBuy #productInputBuy').on('keyup', function() {
            if ($(this).val().length > 2) {
                $('#companyProductListBuy').fadeIn(100);
            } else {
                $('#companyProductListBuy').fadeOut(100);
            }
        });

        $(document).on('click', '.remove-buy', function(e) {
            $(this).closest('li').remove();
            let listName = $(this).closest('li').find('span').html();
            let listTag = `<li data-id="${listName}" class="cursor-pointer block px-[13px] py-[2px] text-md text-teal-600 text-left truncate border-b border-gray-200 hover:bg-gray-100 duration-150">${listName}</li>`;
            $('#companyProductListBuy').append(listTag);
            disableCompanyBtnBuy();
        });


        $(document).on('click', '.remove-suggestions-buy', function(e) {
            $(this).closest('li').remove();
            let listName = $(this).closest('li').find('span').html();
            let listTag = `<li>
                            <a class="flex items-center" href="javascript:;"> <img class="mr-1" src="../assets/images/client-admin/plus.svg" alt="icon"> <span>${listName}</span> </a>
                        </li>`;
            $('#allProductListBuy').append(listTag);
            disableCompanyBtnBuy();
        });

        $(document).on('click', '#companyProductListBuy li', function(e) {
            let productTagName = $(this).html();
            $(this).remove();
            let productTag = `<li class="product-tag">
                            <span class="block mr-3.5 text-base text-neutral-800">${productTagName}</span>
                            <button class="remove-buy remove-item">
                                <img src="../assets/images/close-sm.svg" alt="close"/>
                            </button>
                        </li>`;
            $('#productSelectedTagsBuy').append(productTag);
            $('#productInputBuy').val('');
            $('#companyProductListBuy').fadeOut(100);
            $('#loadingProductBuy').fadeIn();
            setTimeout(function() {
                $("#loadingProductBuy").hide();
            }, 2000);
            disableCompanyBtnBuy();
        });

        $(document).on('click', '#allProductListBuy li a', function(e) {
            let productName = $(this).find('span').html();
            $(this).closest('li').remove();
            let product = `<li class="product-tag">
                            <span class="block mr-3.5 text-base text-neutral-800">${productName}</span>
                            <button class="remove-suggestions-buy remove-item">
                                <img src="../assets/images/close-sm.svg" alt="close"/>
                            </button>
                        </li>`;
            $('#productSelectedTagsBuy').append(product);
            disableCompanyBtnBuy();
        });

        let countBuy = 0;
        $('#companyInfoBtnBuy').on('click', function() {
            var arrListBuy = [],
                i = 0;
            $('#productSelectedTagsBuy .product-tag').each(function() {
                arrListBuy[i++] = $(this).find('span').html();
            });
            for (let [index, listBuy] of arrListBuy.entries()) {
                let productBuy = ` <li class="flex border border-neutral-300 px-3.5 py-3.5 mt-3 image-preview-block product-buy relative">
                        <div class="saving-spinner flex justify-center items-center absolute inset-0 bg-black/[.8] z-10" style="display:none;">
                                <img class="animate-spin" src="../assets/images/client-admin/spinner.svg" alt="icon" />
                            </div>
                            <div class="saving-data flex justify-center items-center absolute inset-0 bg-black/[.8] z-10" style="display:none;">
                                <div class="bg-white flex items-center justify-center flex-col text-center px-24 py-16">
                                    <h4 class="text-neutral-800 text-base mb-8">The product details are live</h4>
                                    <button type="button" class="bg-teal-600 text-white text-base px-10 py-1.5">Public View</button>
                                </div>
                            </div>  
                        <div class="flex mr-4 bg-cover self-start" id="image-preview-buy-${index + countBuy}">
                            <input type="file" id="image-upload-buy-${index + countBuy}" class="hidden">
                            <label id="image-label-buy-${index + countBuy}" for="image-upload-buy-${index + countBuy}" class="image-preview">Add Image</label>
                        </div>
                        <div class="flex-1 flex flex-col justify-between">
                            <h4 class="text-neutral-800 text-md font-semibold">${listBuy}</h4>
                            <div class="flex items-end edit-options-block">
                                    <div class="flex items-center edit-options">
                                        <a href="javascript:;" class="edit-details">Details (<span class="filled-inputs">0</span>/6) </a>
                                        <a href="javascript:;" style="display:none;" class="saved-details border border-teal-600 hover:bg-teal-600 duration-200 text-teal-600 hover:text-white text-sm leading-4 rounded-2xl font-medium h-6 px-4">Details (<span class="filled-inputs">0</span>/6)</a>
                                        <a href="javascript:;" class="text-teal-600 text-sm ml-4">Public View</a>
                                    </div>
                                    <div class="deactivated text-sm text-red-400 hidden">Deactivated on Jun 12, 2022</div>
                                    <button class="toggleActivate text-neutral-400 text-xs duration-150 hover:text-teal-600 hover:underline ml-auto">Deactivate</button>
                            </div>
                            <div class="flex flex-col mt-11 edit-product-block" style="display:none";>
                            <div class="flex items-center mb-2.5">
                                <div class="text-sm text-neutral-700 w-40">Unit Price</div>
                                <div class="flex items-center flex-1">
                                    <div class="flex w-full">
                                        <div class="relative">
                                            <select name="currency-type" class="border-neutral-300 w-[76px] h-[26px] cursor-pointer appearance-none border-l border-t border-b flex items-center justify-between text-neutral-700 text-sm px-1 bg-neutral-100" id="">
                                                <option value="US $">US $</option>
                                                <option value="INR ₹">INR ₹</option>
                                            </select>
                                            <span class="absolute right-2 top-2.5"><img src="../assets/images/client-admin/select-sm.svg" alt="icon" /></span>
                                        </div>
                                        <input name="unit-price" type="text" maxlength="6" class="numbersOnly valid-input input-empty border-neutral-300 border focus:outline-none px-2.5 text-sm h-[26px] w-full" />
                                    </div>
                                    <div class="text-sm text-neutral-700 mx-5">Per</div>
                                    <div class="relative w-full">
                                        <select name="unit-type" class="border-neutral-300 h-[26px] w-full cursor-pointer appearance-none border flex items-center justify-between text-neutral-700 text-sm px-1 bg-white"  id="">
                                            <option value="Kg">Kg</option>
                                            <option value="Gram">Gram</option>
                                        </select>
                                        <span class="absolute right-2 top-2.5"><img src="../assets/images/client-admin/select-sm.svg" alt="icon" /></span>
                                    </div>
                                </div>
                            </div>
                            <div class="flex items-center mb-2.5">
                            <div class="text-sm text-neutral-700 w-40">Bulk Discount above</div>
                            <div class="relative flex-1">
                                <input type="text" name="bulk-discount" maxlength="40" class="border valid-input input-empty border-neutral-300 h-[26px] w-full text-neutral-700 text-sm px-2 bg-white focus:outline-none">
                            </div>
                        </div>
                            <div class="flex items-center mb-2.5">
                                <div class="text-sm text-neutral-700 w-40">Payment Mode</div>
                                <div class="relative custom-select-wrapper flex-1">
                                    <div name="payment-mode" class="custom-select valid-input input-empty  border border-neutral-300 flex justify-between items-center pr-2 h-[26px] text-sm cursor-pointer">
                                        <span class="custom-select-placehodler">Select one or more</span>
                                        <div class="custom-select-tags-wrapper">
                                            <div class="custom-select-count"></div>
                                        </div>
                                        <img src="../assets/images/client-admin/select-sm.svg" alt="icon" />
                                    </div>
                                    <div class="custom-options z-10 mt-[-1px] border-l border-r border-b border-neutral-400 absolute top-[100%] left-0 right-0 bg-white" style="display: none;">
                                        <ul class="flex flex-col">
                                            <li class="border-t border-neutral-400">
                                                <div class="checkbox-theme checkbox-theme-sm">
                                                    <input class="hidden" type="checkbox" id="onlineBankTransfer-buy-${index + countBuy}" value="Online Bank Transfer">
                                                    <label for="onlineBankTransfer-buy-${index + countBuy}" class="flex justify-between pl-10 py-1.5 pr-6">
                                                        <div class="text-md text-slate-800">Online Bank Transfer</div>
                                                     </label>
                                                </div>
                                            </li>
                                            <li class="border-t border-neutral-400">
                                                <div class="checkbox-theme checkbox-theme-sm">
                                                    <input class="hidden" type="checkbox" id="crypto-buy-${index + countBuy}" value="Crypto">
                                                    <label for="crypto-buy-${index + countBuy}" class="flex justify-between pl-10 py-1.5 pr-6">
                                                        <div class="text-md text-slate-800">Crypto</div>
                                                     </label>
                                                </div>
                                            </li>
                                            <li class="border-t border-neutral-400">
                                                <div class="checkbox-theme checkbox-theme-sm">
                                                    <input class="hidden" type="checkbox" id="paypal-buy-${index + countBuy}" value="Paypal">
                                                    <label for="paypal-buy-${index + countBuy}" class="flex justify-between pl-10 py-1.5 pr-6">
                                                        <div class="text-md text-slate-800">Paypal</div>
                                                     </label>
                                                </div>
                                            </li>
                                            <li class="border-t border-neutral-400">
                                                <div class="checkbox-theme checkbox-theme-sm">
                                                    <input class="hidden" type="checkbox" id="creditDebit-buy-${index + countBuy}" value="Credit / Debit Card">
                                                    <label for="creditDebit-buy-${index + countBuy}" class="flex justify-between pl-10 py-1.5 pr-6">
                                                        <div class="text-md text-slate-800">Credit / Debit Card</div>
                                                     </label>
                                                </div>
                                            </li>

                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div class="flex items-center mb-2.5">
                            <div class="text-sm text-neutral-700 w-40">Geography Served</div>
                            <div class="relative custom-select-wrapper flex-1">
                                <div name="geography-served" class="custom-select valid-input input-empty border border-neutral-300 flex justify-between items-center pr-2 h-[26px] text-sm cursor-pointer">
                                    <span class="custom-select-placehodler"></span>
                                    <div class="custom-select-tags-wrapper">
                                        <div class="custom-select-count"></div>
                                    </div>
                                    <img src="../assets/images/client-admin/select-sm.svg" alt="icon" />
                                </div>
                                <div class="custom-options z-10 border-l border-r border-b border-neutral-400 absolute top-[100%] mt-[-1px] left-0 right-0 bg-white" style="display: none;">
                                    <ul class="flex flex-col">
                                        <li class="border-t border-neutral-400">
                                            <div class="radio-theme radio-theme-sm">
                                                <input class="hidden" type="radio" id="withInCountry-buy-${index + countBuy}" value="With-in country-name" name="country">
                                                <label for="withInCountry-buy-${index + countBuy}" class="flex justify-between pl-10 py-1.5 pr-6">
                                                    <div class="text-md text-slate-800">With-in country-name</div>
                                                 </label>
                                            </div>
                                        </li>
                                        <li class="border-t border-neutral-400">
                                            <div class="radio-theme radio-theme-sm">
                                                <input class="hidden" type="radio" id="southEastAsia-buy-${index + countBuy}" value="South East Asia" name="country">
                                                <label for="southEastAsia-buy-${index + countBuy}" class="flex justify-between pl-10 py-1.5 pr-6">
                                                    <div class="text-md text-slate-800">South East Asia</div>
                                                 </label>
                                            </div>
                                        </li>
                                        <li class="border-t border-neutral-400">
                                            <div class="radio-theme radio-theme-sm">
                                                <input class="hidden" type="radio" id="europe-buy-${index + countBuy}" value="Europe" name="country">
                                                <label for="europe-buy-${index + countBuy}" class="flex justify-between pl-10 py-1.5 pr-6">
                                                    <div class="text-md text-slate-800">Europe</div>
                                                 </label>
                                            </div>
                                        </li>
                                        <li class="border-t border-neutral-400">
                                            <div class="radio-theme radio-theme-sm">
                                                <input class="hidden" type="radio" id="schengenRegion-buy-${index + countBuy}" value="Schengzen Region" name="country">
                                                <label for="schengenRegion-buy-${index + countBuy}" class="flex justify-between pl-10 py-1.5 pr-6">
                                                    <div class="text-md text-slate-800">Schengzen Region</div>
                                                 </label>
                                            </div>
                                        </li>
                                        <li class="border-t border-neutral-400">
                                            <div class="radio-theme radio-theme-sm">
                                                <input class="hidden" type="radio" id="americas-buy-${index + countBuy}" value="Americas" name="country">
                                                <label for="americas-buy-${index + countBuy}" class="flex justify-between pl-10 py-1.5 pr-6">
                                                    <div class="text-md text-slate-800">Americas</div>
                                                 </label>
                                            </div>
                                        </li>
                                        <li class="border-t border-neutral-400">
                                            <div class="radio-theme radio-theme-sm">
                                                <input class="hidden" type="radio" id="africa-buy-${index + countBuy}" value="Africa" name="country">
                                                <label for="africa-buy-${index + countBuy}" class="flex justify-between pl-10 py-1.5 pr-6">
                                                    <div class="text-md text-slate-800">Africa</div>
                                                 </label>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class="flex items-center mb-5">
                            <div class="text-sm text-neutral-700 w-40">Real time Tracking <span class="text-red-500">*</span></div>
                            <div class="relative flex-1">
                                <input name="real-time-tracking" maxlength="40" type="text" class="valid-input input-empty border border-neutral-300 h-[26px] w-full text-neutral-700 text-sm px-2 bg-white focus:outline-none">
                            </div>
                        </div>
                            <div class="flex mb-10 relative">
                                <textarea name="technical-details" maxlength="2000" class="valid-input input-empty count-area border-neutral-300 border px-2 text-sm focus:outline-none py-2 w-full h-32 resize-none text-neutral-700 placeholder:text-neutral-700 placeholder:font-light" id="" cols="30" rows="10" placeholder="Describe technical details or any specific configuration or usage ...."></textarea>
                                <div class="absolute -bottom-5 right-0 text-gray-400 text-xs"><span class="count">0</span> / 2000</div>
                            </div>
                            <div class="flex items-center">
                                <button class="post-product bg-teal-600 hover:bg-teal-700 duration-200 text-white w-24 text-sm leading-4 rounded-2xl font-medium h-6 px-4">Save</button>
                                 <a style="display:none;" href="javascript:;" class="text-teal-600 text-sm ml-4 cancel-draft">Back to Category</a>
                                <a href="javascript:;" class="cancel-editing text-neutral-500 text-sm ml-auto">Cancel</a>
                            </div>
                        </div>
                        <div class="saved-product-block flex flex-col mt-11" style="display:none;">
                                <div class="flex mb-4">
                                    <div class="text-sm text-neutral-700 font-bold w-40">Unit Price</div>
                                    <div class="text-sm text-neutral-700 flex-1"><span class="currencyTypeVal"></span> <span class="unitPriceVal"></span> per <span class="unitTypeVal"></span></div>
                                </div>
                                <div class="flex mb-4">
                                    <div class="text-sm text-neutral-700 font-bold w-40">Bulk Discount above</div>
                                    <div class="text-sm text-neutral-700 flex-1"><span class="bulkDiscountVal"></span></div>
                                </div>
                                <div class="flex mb-4">
                                    <div class="text-sm text-neutral-700 font-bold w-40">Payment Mode</div>
                                    <div class="text-sm text-neutral-700 flex-1"><span class="paymentModeVal"></span></div>
                                </div>
                                <div class="flex mb-4">
                                    <div class="text-sm text-neutral-700 font-bold w-40">Geography Served</div>
                                    <div class="text-sm text-neutral-700 flex-1"><span class="geographyServedVal"></span></div>
                                </div>
                                <div class="flex mb-4">
                                    <div class="text-sm text-neutral-700 font-bold w-40">Real time Tracking</div>
                                    <div class="text-sm text-neutral-700 flex-1"><span class="realTimeTrackingVal"></span></div>
                                </div>
                                <div class="flex mb-10">
                                    <div class="text-sm text-neutral-700 flex-1"><span class="technicalDetailsVal"></span></div>
                                </div>
                                <div class="flex items-center">
                                    <button class="edit-product-btn border border-teal-600 w-24 hover:bg-teal-600 duration-200 text-teal-600 hover:text-white text-sm leading-4 rounded-2xl font-medium h-6 px-4">Edit</button>
                                    <a href="javascript:;" class="cancel-saved text-neutral-500 text-sm ml-auto">Cancel</a>
                                </div>
                            </div>
                        </div>
                    </li>`;
                $('#productListingBuy').prepend(productBuy);
            }
            countBuy = countBuy + arrListBuy.length;
            updateCount();
            productListBuyUpdate();
            $('#productSelectedTagsBuy').find('li').remove();
            disableCompanyBtnBuy();
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
                    productListBuyUpdate();
                }, 2000);
            }
        });




        // Edit Details
        $(document).on('click', '.edit-details', function(e) {
            e.preventDefault();
            $(this).closest('.image-preview-block').find('.edit-options-block').hide();
            $(this).closest('.image-preview-block').find('.edit-product-block').slideDown(300);
        });

        // Edit Product Again Btn
        $(document).on('click', '.edit-product-btn', function(e) {
            e.preventDefault();
            $(this).closest('.image-preview-block').find('.saved-details').hide();
            $(this).closest('.image-preview-block').find('.edit-details').show();
            $(this).closest('.image-preview-block').find('.saved-product-block').hide();
            $(this).closest('.image-preview-block').find('.edit-product-block').slideDown(300);
        });

        // Saved Details
        $(document).on('click', '.saved-details', function(e) {
            e.preventDefault();
            $(this).closest('.image-preview-block').find('.edit-options-block').hide();
            $(this).closest('.image-preview-block').find('.saved-product-block').slideDown(300);
        });

        // Cancel Edit Details
        $(document).on('click', '.cancel-editing', function(e) {
            e.preventDefault();
            $(this).closest('.image-preview-block').find('.edit-options-block').fadeIn(800);
            $(this).closest('.image-preview-block').find('.edit-product-block').slideUp(300);
        });

        // Close Saved Details
        $(document).on('click', '.cancel-saved', function(e) {
            e.preventDefault();
            $(this).closest('.image-preview-block').find('.edit-options-block').fadeIn(800);
            $(this).closest('.image-preview-block').find('.saved-product-block').slideUp(300);
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
            $(this).closest('.image-preview-block').addClass('valid-form');
            let currencyTypeInput = $(this).closest('.image-preview-block').find('[name="currency-type"]'),
                unitPriceInput = $(this).closest('.image-preview-block').find('[name="unit-price"]'),
                unitTypeInput = $(this).closest('.image-preview-block').find('[name="unit-type"]'),
                bulkDiscountInput = $(this).closest('.image-preview-block').find('[name="bulk-discount"]'),
                paymentModeInput = $(this).closest('.image-preview-block').find('[name="payment-mode"]'),
                geographyServedInput = $(this).closest('.image-preview-block').find('[name="geography-served"]'),
                realTimeTrackingInput = $(this).closest('.image-preview-block').find('[name="real-time-tracking"]'),
                technicalDetailsInput = $(this).closest('.image-preview-block').find('[name="technical-details"]');

            let hasError = true;
            // $(this).closest('.image-preview-block').find('.valid-input').each(function() {
            //     let allCustomSelects = $(this).hasClass('custom-select');
            //     if (!allCustomSelects) {
            //         if ($(this).val().length > 0) {
            //             $(this).removeClass('input-empty');
            //         } else {
            //             $(this).addClass('input-empty');
            //         }
            //     }
            //     let isEmpty = $(this).hasClass('input-empty');
            //     if (!isEmpty) {
            //         hasError = false;
            //     } else {
            //         hasError = true;
            //         return false
            //     }
            // });
            // if (hasError) {
            //     console.log("error");
            // } else {
            // console.log("success");
            let paymentModeInputArr = [];
            paymentModeInput.closest(".custom-select-wrapper").find(".custom-options input:checked").each(function() {
                paymentModeInputArr.push($(this).val());
            });
            let geographyServedInputArr = [];
            geographyServedInput.closest(".custom-select-wrapper").find(".custom-options input:checked").each(function() {
                geographyServedInputArr.push($(this).val());
            });
            // console.table([currencyTypeInput.val(), unitPriceInput.val(), unitTypeInput.val(), bulkDiscountInput.val(), paymentModeInputArr, geographyServedInputArr, realTimeTrackingInput.val(), technicalDetailsInput.val()]);
            $(this).closest('.image-preview-block').find('.edit-details').hide();
            $(this).closest('.image-preview-block').find('.saved-details').show();
            $(this).closest('.image-preview-block').find('.saving-spinner').fadeIn();
            setTimeout(() => {
                $(this).closest('.image-preview-block').find('.saving-spinner').fadeOut();
                $(this).closest('.image-preview-block').find('.saving-data').fadeIn();
                setTimeout(() => {
                    $(this).closest('.image-preview-block').find('.saving-data').fadeOut();
                    $(this).closest('.image-preview-block').find('.edit-options-block').fadeIn(800);
                    $(this).closest('.image-preview-block').find('.edit-product-block').slideUp(300);
                }, 2000);
            }, 2000);

            // Update number of inputs Filled
            let emptyInputs = 0;
            $(this).closest('.image-preview-block').find('.valid-input').each(function() {
                let allCustomSelects = $(this).hasClass('custom-select');
                if (!allCustomSelects) {
                    if ($(this).val() == '') {
                        emptyInputs++;
                    }
                }
            });
            if (paymentModeInputArr == '') {
                emptyInputs++;
            }
            if (geographyServedInputArr == '') {
                emptyInputs++;
            }
            let totalInputs = $(this).closest('.image-preview-block').find('.valid-input').length;
            let filledInputs = totalInputs - emptyInputs;
            $(this).closest('.image-preview-block').find('.filled-inputs').html(filledInputs);

            // Saving Data
            $(this).closest('.image-preview-block').find('.currencyTypeVal').html((currencyTypeInput.val() == '') ? 'NA' : currencyTypeInput.val());
            $(this).closest('.image-preview-block').find('.unitPriceVal').html((unitPriceInput.val() == '') ? 'NA' : unitPriceInput.val());
            $(this).closest('.image-preview-block').find('.unitTypeVal').html((unitTypeInput.val() == '') ? 'NA' : unitTypeInput.val());
            $(this).closest('.image-preview-block').find('.bulkDiscountVal').html((bulkDiscountInput.val() == '') ? 'NA' : bulkDiscountInput.val());
            $(this).closest('.image-preview-block').find('.paymentModeVal').html((paymentModeInputArr.join(", ") == '') ? 'NA' : paymentModeInputArr.join(", "));
            $(this).closest('.image-preview-block').find('.geographyServedVal').html((geographyServedInputArr.join(", ") == '') ? 'NA' : geographyServedInputArr.join(", "));
            $(this).closest('.image-preview-block').find('.realTimeTrackingVal').html((realTimeTrackingInput.val() == '') ? 'NA' : realTimeTrackingInput.val());
            $(this).closest('.image-preview-block').find('.technicalDetailsVal').html((technicalDetailsInput.val() == '') ? 'NA' : technicalDetailsInput.val());
            // }
        });
    }


});