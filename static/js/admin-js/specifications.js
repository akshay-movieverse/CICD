$(document).ready(function() {
    // Select all checkbox 
    if ($("[data-group='checkbox']").length > 0) {
        $(document).on('click', '[data-select="all"]', function() {
            let checkBoxes = $(this).closest("[data-group='checkbox']").find(".checkbox-theme > input");
            checkBoxes.prop("checked", !checkBoxes.prop("checked"));
            $(this).toggleClass("bg-white bg-teal-600 text-teal-600 text-white");
        });
    }

    // Checked Product 
    if ($("#productBlock").length > 0) {
        checkedProduct();
        $('#productBlock .checkbox-theme > input').on('change', function(e) {
            checkedProduct();
        });
        $('#productBlock [data-select="all"]').on('click', function(e) {
            checkedProduct();
        });
    }



    // Show Saved Data
    if ($('[data-link="new-product"]').length > 0) {
        $('[data-link="new-product"]').on('click', function(e) {
            $("#newProduct").hide();
            $("#newSavedProduct").hide();
            $("#viewProduct").show();
            let name = $(this).closest('.border-t').find('[data-title="product"]').text();
            $('[data-view="saved-product"] span').text(name);
            $("#productBlock").find(".checkbox-theme > input").prop("checked", false);
            $("#copyProduct").addClass('opacity-20 pointer-events-none');
        });
    }


    // Append Type Apply Row
    if ($('[data-btn="type-input"]').length > 0) {
        $(document).on('click', '[data-btn="type-input"]', function() {
            let currentTypeInputRow = $(this).closest('[data-row="type-input"]');
            let countInput = 1;
            let newTypeInputRow = `<div data-row="type-input" class="flex items-center relative pr-[5.8rem] mb-2.5">
            <div class="mr-2.5 w-48">
                <input data-input="type-input" type="text" placeholder="Type your own product title" class="placeholder:text-neutral-400 text-neutral-900 placeholder:font-extralight font-medium border border-dashed w-full border-teal-500 focus:outline-none px-1 text-sm h-[26px]">
            </div>
            <div class="relative flex-1">
                <input type="text" maxlength="40" class="border border-neutral-300 h-[26px] w-full text-neutral-700 text-sm px-2 bg-white focus:outline-none">
            </div>
            <div class="flex items-center absolute right-0">
                <button data-remove="type-input" type="button" class="mr-3">
                    <img src="../assets/images/admin/rem.svg" alt="icon"/>
                </button>
                <button data-popup-open="type-input" type="button"  class="mr-3">
                    <img src="../assets/images/admin/list.svg" alt="icon"/>
                </button>
                <button data-bulb="type-input" type="button">
                    <img src="../assets/images/admin/bulb.svg" alt="icon">
                </button>
                
            </div>
            
            <div data-popup="type-input" class="modal duration-200 flex fixed inset-0 bg-backdrop transition-opacity z-50 overflow-hidden items-center justify-center p-5">
                <div class="w-full max-w-[440px] p-4 border border-neutral-300 bg-white flex flex-col">
                    <h5 class="text-neutral-600 text-md font-bold mb-3">Field Title</h5>
                    <div class="relative custom-select-wrapper mb-6">
                        <div class="custom-select flex items-center border border-neutral-400 cursor-pointer bg-white w-full text-slate-500 text-md h-10 px-2  bg-select-bg bg-no-repeat bg-[95%_center] max-w-[292px] appearance-none">
                            <span class="custom-select-placehodler text-neutral-600 text-tiny font-medium">Type of Question</span>
                            <div class="custom-select-tags-wrapper">
                                <div class="custom-select-count"></div>
                            </div>
                        </div>
                        <div class="custom-options z-10 border-l border-r border-b border-neutral-400 absolute top-[100%] mt-[-1px] left-0 right-0 bg-white max-w-[292px]" style="display: none;">
                            <ul class="flex flex-col">
                                <li class="border-t border-neutral-400">
                                    <div class="radio-theme radio-theme-sm">
                                        <div class="option-placeholder flex justify-between pl-3 py.1.5 h-[37px] pr-2 items-center cursor-pointer">
                                            <div class="text-md text-slate-800">Select None</div>
                                        </div>
                                    </div>
                                </li>
                                <li class="border-t border-neutral-400">
                                    <div class="radio-theme radio-theme-sm">
                                        <input class="hidden" type="radio" id="listBulkDiscountSingle-${countInput}" value="Single select (radio)" name="list-bulk-discount-${countInput}">
                                        <label for="listBulkDiscountSingle-${countInput}" class="flex justify-between pl-10 py-1.5 pr-6">
                                            <div class="text-md text-slate-800">Single select (radio)</div>
                                        </label>
                                    </div>
                                </li>
                                <li class="border-t border-neutral-400">
                                    <div class="radio-theme radio-theme-sm">
                                        <input class="hidden" type="radio" id="listBulkDiscountMultiple-${countInput}" value="Multi select (check)" name="list-bulk-discount-${countInput}">
                                        <label for="listBulkDiscountMultiple-${countInput}" class="flex justify-between pl-10 py-1.5 pr-6">
                                            <div class="text-md text-slate-800">Multi select (check)</div>
                                        </label>
                                    </div>
                                </li>  
                            </ul>
                        </div>
                    </div>
                    <textarea class="border border-neutral-400 focus:outline-none p-2 h-44 resize-none text-tiny text-neutral-700"></textarea>
                    <div class="flex justify-between mt-3">
                        <button data-popup-save="type-input" class="bg-teal-600 hover:bg-teal-700 duration-200 text-white h-8 px-8 text-base">Save</button>
                        <button data-popup-close="type-input" class="bg-transparent text-neutral-400 h-8  text-base">Cancel</button>
                    </div>
                </div>
            </div>
        </div>`;
            currentTypeInputRow.after(newTypeInputRow);
            countInput++;
        });
    }

    // Append  Unit Price Row
    if ($('[data-btn="unit-price"]').length > 0) {
        let unitCount = 1,
            unitInnerCount = 1;
        $(document).on('click', '[data-btn="unit-price"]', function() {
            let currentPriceRow = $(this).closest('[data-row="unit-price"]');
            let newPriceRow = `<div data-row="unit-price" class="flex items-start relative pr-[5.8rem] ">
            <div class="mr-2.5 w-48">
                <input data-input="unit-price" type="text" placeholder="Unit Price" class="placeholder:text-neutral-400 text-neutral-900 placeholder:font-extralight font-medium border border-dashed w-full border-teal-500 focus:outline-none px-1 text-sm h-[26px]">
            </div>
            <div data-inner-wrapper="unit-price" class="flex-1 flex flex-col">
                <div data-inner-row="unit-price" class="flex items-center flex-1 mb-2.5">
                    <div class="flex w-full max-w-[166px]">
                        <div class="relative custom-select-wrapper">
                            <div class="custom-select border-neutral-300 flex items-center border-l border-t border-b  cursor-pointer bg-select-sm bg-no-repeat bg-[95%_center] text-slate-500 w-24 h-[26px] bg-neutral-100 text-sm">
                                <span class="custom-select-placehodler text-neutral-400 text-sm font-extralight">Select One </span>
                                <div class="custom-select-tags-wrapper tag-theme">
                                    <div class="custom-select-count"></div>
                                </div>
                            </div>
                            <div class="custom-options z-10 border-l border-r border-b border-neutral-300 absolute top-[100%] mt-[-1px] left-0 right-0 bg-white w-36" style="display: none;">
                                <ul class="flex flex-col">
                                    <li class="border-t border-neutral-300 sticky top-0 bg-white">
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
                                            <input class="hidden" type="radio" id="currencyIDR-${unitCount}-${unitInnerCount}" value="IDR" name="currency-${unitCount}-${unitInnerCount}">
                                            <label for="currencyIDR-${unitCount}-${unitInnerCount}" class="flex justify-between pl-8 pr-2 h-[26px]">
                                            <div class="text-sm text-slate-800">IDR</div>
                                        </label>
                                        </div>
                                    </li>
                                    <li class="border-t border-neutral-300">
                                        <div class="radio-theme radio-theme-xs">
                                            <input class="hidden" type="radio" id="currencyUS-${unitCount}-${unitInnerCount}" value="US$" name="currency-${unitCount}-${unitInnerCount}">
                                            <label for="currencyUS-${unitCount}-${unitInnerCount}" class="flex justify-between pl-8 pr-2 h-[26px]">
                                            <div class="text-sm text-slate-800">US$</div>
                                        </label>
                                        </div>
                                    </li>
                                    <li class="border-t border-neutral-300">
                                        <div class="radio-theme radio-theme-xs">
                                            <input class="hidden" type="radio" id="currencyAU-${unitCount}-${unitInnerCount}" value="AU$" name="currency-${unitCount}-${unitInnerCount}">
                                            <label for="currencyAU-${unitCount}-${unitInnerCount}" class="flex justify-between pl-8 pr-2 h-[26px]">
                                            <div class="text-sm text-slate-800">AU$</div>
                                        </label>
                                        </div>
                                    </li>
                                    <li class="border-t border-neutral-300">
                                        <div class="radio-theme radio-theme-xs">
                                            <input class="hidden" type="radio" id="currencySG-${unitCount}-${unitInnerCount}" value="SG$" name="currency-${unitCount}-${unitInnerCount}">
                                            <label for="currencySG-${unitCount}-${unitInnerCount}" class="flex justify-between pl-8 pr-2 h-[26px]">
                                            <div class="text-sm text-slate-800">SG$</div>
                                        </label>
                                        </div>
                                    </li>
                                    <li class="border-t border-neutral-300">
                                        <div class="radio-theme radio-theme-xs">
                                            <input class="hidden" type="radio" id="currencyCAD-${unitCount}-${unitInnerCount}" value="CAD$" name="currency-${unitCount}-${unitInnerCount}">
                                            <label for="currencyCAD-${unitCount}-${unitInnerCount}" class="flex justify-between pl-8 pr-2 h-[26px]">
                                            <div class="text-sm text-slate-800">CAD$</div>
                                        </label>
                                        </div>
                                    </li>
                                    <li class="border-t border-neutral-300">
                                        <div class="radio-theme radio-theme-xs">
                                            <input class="hidden" type="radio" id="currencyINR-${unitCount}-${unitInnerCount}" value="INR$" name="currency-${unitCount}-${unitInnerCount}">
                                            <label for="currencyINR-${unitCount}-${unitInnerCount}" class="flex justify-between pl-8 pr-2 h-[26px]">
                                            <div class="text-sm text-slate-800">INR$</div>
                                        </label>
                                        </div>
                                    </li>
                                    <li class="border-t border-neutral-300">
                                        <div class="radio-theme radio-theme-xs">
                                            <input class="hidden" type="radio" id="currencyBaht-${unitCount}-${unitInnerCount}" value="Baht" name="currency-${unitCount}-${unitInnerCount}">
                                            <label for="currencyBaht-${unitCount}-${unitInnerCount}" class="flex justify-between pl-8 pr-2 h-[26px]">
                                            <div class="text-sm text-slate-800">Baht</div>
                                        </label>
                                        </div>
                                    </li>
                                    <li class="border-t border-neutral-300">
                                        <div class="radio-theme radio-theme-xs">
                                            <input class="hidden" type="radio" id="currencyVND-${unitCount}-${unitInnerCount}" value="VND" name="currency-${unitCount}-${unitInnerCount}">
                                            <label for="currencyVND-${unitCount}-${unitInnerCount}" class="flex justify-between pl-8 pr-2 h-[26px]">
                                            <div class="text-sm text-slate-800">VND</div>
                                        </label>
                                        </div>
                                    </li>
                                    <li class="border-t border-neutral-300">
                                        <div class="radio-theme radio-theme-xs">
                                            <input class="hidden" type="radio" id="currencyPESO-${unitCount}-${unitInnerCount}" value="PESO" name="currency-${unitCount}-${unitInnerCount}">
                                            <label for="currencyPESO-${unitCount}-${unitInnerCount}" class="flex justify-between pl-8 pr-2 h-[26px]">
                                            <div class="text-sm text-slate-800">PESO</div>
                                        </label>
                                        </div>
                                    </li>
                                    <li class="border-t border-neutral-300">
                                        <div class="radio-theme radio-theme-xs">
                                            <input class="hidden" type="radio" id="currencyRINGGIT-${unitCount}-${unitInnerCount}" value="RINGGIT" name="currency-${unitCount}-${unitInnerCount}">
                                            <label for="currencyRINGGIT-${unitCount}-${unitInnerCount}" class="flex justify-between pl-8 pr-2 h-[26px]">
                                            <div class="text-sm text-slate-800">RINGGIT</div>
                                        </label>
                                        </div>
                                    </li>
                                    <li class="border-t border-neutral-300">
                                        <div class="radio-theme radio-theme-xs">
                                            <input class="hidden" type="radio" id="currencyEURO-${unitCount}-${unitInnerCount}" value="EURO" name="currency-${unitCount}-${unitInnerCount}">
                                            <label for="currencyEURO-${unitCount}-${unitInnerCount}" class="flex justify-between pl-8 pr-2 h-[26px]">
                                            <div class="text-sm text-slate-800">EURO</div>
                                        </label>
                                        </div>
                                    </li>
                                    <li class="border-t border-neutral-300">
                                        <div class="radio-theme radio-theme-xs">
                                            <input class="hidden" type="radio" id="currencyHK-${unitCount}-${unitInnerCount}" value="HK$" name="currency-${unitCount}-${unitInnerCount}">
                                            <label for="currencyHK-${unitCount}-${unitInnerCount}" class="flex justify-between pl-8 pr-2 h-[26px]">
                                            <div class="text-sm text-slate-800">HK$</div>
                                        </label>
                                        </div>
                                    </li>

                                </ul>
                            </div>
                        </div>
                        <input type="text" maxlength="6" class="numbersOnly border-neutral-300 border focus:outline-none px-2.5 text-sm h-[26px] w-[70px]" />
                    </div>
                    <div class="text-md text-neutral-700 font-bold ml-2 mr-auto">Per</div>
                    <div class="relative custom-select-wrapper">
                        <div class="custom-select border-neutral-300 flex items-center border cursor-pointer bg-select-sm bg-no-repeat bg-[95%_center] text-slate-500 w-[103px] h-[26px] text-sm">
                            <span class="custom-select-placehodler text-neutral-400 text-sm font-extralight">Select One </span>
                            <div class="custom-select-tags-wrapper tag-theme">
                                <div class="custom-select-count"></div>
                            </div>
                        </div>
                        <div class="custom-options z-10 border-l border-r border-b border-neutral-300 absolute w-48 top-[100%] mt-[-1px] left-0 right-0 bg-white" style="display: none;">
                            <ul class="flex flex-col max-h-72 overflow-auto">
                                <li class="border-t border-neutral-300 sticky top-0 bg-white">
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
                                        <input class="hidden" type="radio" id="unitPiece-${unitCount}-${unitInnerCount}" value="Piece" name="unit-${unitCount}-${unitInnerCount}">
                                        <label for="unitPiece-${unitCount}-${unitInnerCount}" class="flex justify-between pl-8 pr-2 h-[26px]">
                                        <div class="text-sm text-slate-800">Piece</div>
                                    </label>
                                    </div>
                                </li>
                                <li class="border-t border-neutral-300">
                                    <div class="radio-theme radio-theme-xs">
                                        <input class="hidden" type="radio" id="unitKg-${unitCount}-${unitInnerCount}" value="Kg" name="unit-${unitCount}-${unitInnerCount}">
                                        <label for="unitKg-${unitCount}-${unitInnerCount}" class="flex justify-between pl-8 pr-2 h-[26px]">
                                        <div class="text-sm text-slate-800">Kg</div>
                                    </label>
                                    </div>
                                </li>
                                <li class="border-t border-neutral-300">
                                    <div class="radio-theme radio-theme-xs">
                                        <input class="hidden" type="radio" id="unitGm-0" value="Gm" name="unit-${unitCount}-${unitInnerCount}">
                                        <label for="unitGm-${unitCount}-${unitInnerCount}" class="flex justify-between pl-8 pr-2 h-[26px]">
                                        <div class="text-sm text-slate-800">Gm</div>
                                    </label>
                                    </div>
                                </li>
                                <li class="border-t border-neutral-300">
                                    <div class="radio-theme radio-theme-xs">
                                        <input class="hidden" type="radio" id="unitMeter-0" value="Meter" name="unit-${unitCount}-${unitInnerCount}">
                                        <label for="unitMeter-${unitCount}-${unitInnerCount}" class="flex justify-between pl-8 pr-2 h-[26px]">
                                        <div class="text-sm text-slate-800">Meter</div>
                                    </label>
                                    </div>
                                </li>
                                <li class="border-t border-neutral-300">
                                    <div class="radio-theme radio-theme-xs">
                                        <input class="hidden" type="radio" id="unitCentimeter-${unitCount}-${unitInnerCount}" value="Centimeter" name="unit-${unitCount}-${unitInnerCount}">
                                        <label for="unitCentimeter-${unitCount}-${unitInnerCount}" class="flex justify-between pl-8 pr-2 h-[26px]">
                                        <div class="text-sm text-slate-800">Centimeter</div>
                                    </label>
                                    </div>
                                </li>
                                <li class="border-t border-neutral-300">
                                    <div class="radio-theme radio-theme-xs">
                                        <input class="hidden" type="radio" id="unitSqMeter-${unitCount}-${unitInnerCount}" value="Sq. Meter" name="unit-${unitCount}-${unitInnerCount}">
                                        <label for="unitSqMeter-${unitCount}-${unitInnerCount}" class="flex justify-between pl-8 pr-2 h-[26px]">
                                        <div class="text-sm text-slate-800">Sq. Meter</div>
                                    </label>
                                    </div>
                                </li>
                                <li class="border-t border-neutral-300">
                                    <div class="radio-theme radio-theme-xs">
                                        <input class="hidden" type="radio" id="unitYard-${unitCount}-${unitInnerCount}" value="Yard" name="unit-${unitCount}-${unitInnerCount}">
                                        <label for="unitYard-${unitCount}-${unitInnerCount}" class="flex justify-between pl-8 pr-2 h-[26px]">
                                        <div class="text-sm text-slate-800">Yard</div>
                                    </label>
                                    </div>
                                </li>
                                <li class="border-t border-neutral-300">
                                    <div class="radio-theme radio-theme-xs">
                                        <input class="hidden" type="radio" id="unitFoot-${unitCount}-${unitInnerCount}" value="Foot" name="unit-${unitCount}-${unitInnerCount}">
                                        <label for="unitFoot-${unitCount}-${unitInnerCount}" class="flex justify-between pl-8 pr-2 h-[26px]">
                                        <div class="text-sm text-slate-800">Foot</div>
                                    </label>
                                    </div>
                                </li>
                                <li class="border-t border-neutral-300">
                                    <div class="radio-theme radio-theme-xs">
                                        <input class="hidden" type="radio" id="unitSqFoot-${unitCount}-${unitInnerCount}" value="Sq. Foot" name="unit-${unitCount}-${unitInnerCount}">
                                        <label for="unitSqFoot-${unitCount}-${unitInnerCount}" class="flex justify-between pl-8 pr-2 h-[26px]">
                                        <div class="text-sm text-slate-800">Sq. Foot</div>
                                    </label>
                                    </div>
                                </li>
                                <li class="border-t border-neutral-300">
                                    <div class="radio-theme radio-theme-xs">
                                        <input class="hidden" type="radio" id="unitMillilitre-${unitCount}-${unitInnerCount}" value="Millilitre" name="unit-${unitCount}-${unitInnerCount}">
                                        <label for="unitMillilitre-${unitCount}-${unitInnerCount}" class="flex justify-between pl-8 pr-2 h-[26px]">
                                        <div class="text-sm text-slate-800">Millilitre</div>
                                    </label>
                                    </div>
                                </li>
                                <li class="border-t border-neutral-300">
                                    <div class="radio-theme radio-theme-xs">
                                        <input class="hidden" type="radio" id="unitLitre-${unitCount}-${unitInnerCount}" value="Litre" name="unit-${unitCount}-${unitInnerCount}">
                                        <label for="unitLitre-${unitCount}-${unitInnerCount}" class="flex justify-between pl-8 pr-2 h-[26px]">
                                        <div class="text-sm text-slate-800">Litre</div>
                                    </label>
                                    </div>
                                </li>
                                <li class="border-t border-neutral-300">
                                    <div class="radio-theme radio-theme-xs">
                                        <input class="hidden" type="radio" id="unitInch-${unitCount}-${unitInnerCount}" value="Inch" name="unit-${unitCount}-${unitInnerCount}">
                                        <label for="unitInch-${unitCount}-${unitInnerCount}" class="flex justify-between pl-8 pr-2 h-[26px]">
                                        <div class="text-sm text-slate-800">Inch</div>
                                    </label>
                                    </div>
                                </li>
                                <li class="border-t border-neutral-300">
                                    <div class="radio-theme radio-theme-xs">
                                        <input class="hidden" type="radio" id="unitSqInch-${unitCount}-${unitInnerCount}" value="Sq. Inch" name="unit-${unitCount}-${unitInnerCount}">
                                        <label for="unitSqInch-${unitCount}-${unitInnerCount}" class="flex justify-between pl-8 pr-2 h-[26px]">
                                        <div class="text-sm text-slate-800">Sq. Inch</div>
                                    </label>
                                    </div>
                                </li>
                                <li class="border-t border-neutral-300">
                                    <div class="radio-theme radio-theme-xs">
                                        <input class="hidden" type="radio" id="unitQuintal-${unitCount}-${unitInnerCount}" value="Quintal" name="unit-${unitCount}-${unitInnerCount}">
                                        <label for="unitQuintal-${unitCount}-${unitInnerCount}" class="flex justify-between pl-8 pr-2 h-[26px]">
                                        <div class="text-sm text-slate-800">Quintal</div>
                                    </label>
                                    </div>
                                </li>
                                <li class="border-t border-neutral-300">
                                    <div class="radio-theme radio-theme-xs">
                                        <input class="hidden" type="radio" id="unitTon-${unitCount}-${unitInnerCount}" value="Ton" name="unit-${unitCount}-${unitInnerCount}">
                                        <label for="unitTon-${unitCount}-${unitInnerCount}" class="flex justify-between pl-8 pr-2 h-[26px]">
                                        <div class="text-sm text-slate-800">Ton</div>
                                    </label>
                                    </div>
                                </li>
                                <li class="border-t border-neutral-300">
                                    <div class="radio-theme radio-theme-xs">
                                        <input class="hidden" type="radio" id="unitMetricTon-${unitCount}-${unitInnerCount}" value="Metric Ton" name="unit-${unitCount}-${unitInnerCount}">
                                        <label for="unitMetricTon-${unitCount}-${unitInnerCount}" class="flex justify-between pl-8 pr-2 h-[26px]">
                                        <div class="text-sm text-slate-800">Metric Ton</div>
                                    </label>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <button data-inner-btn="unit-price" type="button" class="cursor-pointer ml-3 flex-shrink-0">
                        <img src="../assets/images/admin/add.svg" alt="icon">
                    </button>
                </div>
            </div>
            <div class="flex items-center absolute right-0 mr-[1px] top-1.5">
                <button data-remove="unit-price" type="button" class="mr-3">
                    <img src="../assets/images/admin/rem.svg" alt="icon"/>
                </button>
                <button data-popup-open="unit-price" type="button" class="mr-3">
                    <img src="../assets/images/admin/list.svg" alt="icon"/>
                </button>
                <button data-bulb="unit-price" type="button">
                    <img src="../assets/images/admin/bulb.svg" alt="icon">
                </button>
                 
            </div>
        </div>`;
            currentPriceRow.after(newPriceRow);
            unitCount++;
        });

        // Append Weight Size Inner Row
        $(document).on('click', '[data-inner-btn="unit-price"]', function() {
            let currentInnerUnitWrapper = $(this).closest('[data-inner-wrapper="unit-price"]');
            let newInnerUnitRow = `<div data-inner-row="unit-price" class="flex items-center flex-1 mb-2.5">
            <div class="flex w-full max-w-[166px]">
                <div class="relative custom-select-wrapper">
                    <div class="custom-select border-neutral-300 flex items-center border-l border-t border-b  cursor-pointer bg-select-sm bg-no-repeat bg-[95%_center] text-slate-500 w-24 h-[26px] bg-neutral-100 text-sm">
                        <span class="custom-select-placehodler text-neutral-400 text-sm font-extralight">Select One </span>
                        <div class="custom-select-tags-wrapper tag-theme">
                            <div class="custom-select-count"></div>
                        </div>
                    </div>
                    <div class="custom-options z-10 border-l border-r border-b border-neutral-300 absolute top-[100%] mt-[-1px] left-0 right-0 bg-white w-36" style="display: none;">
                        <ul class="flex flex-col">
                            <li class="border-t border-neutral-300 sticky top-0 bg-white">
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
                                    <input class="hidden" type="radio" id="currencyIDR-${unitCount}-${unitInnerCount}" value="IDR" name="currency-${unitCount}-${unitInnerCount}">
                                    <label for="currencyIDR-${unitCount}-${unitInnerCount}" class="flex justify-between pl-8 pr-2 h-[26px]">
                                    <div class="text-sm text-slate-800">IDR</div>
                                </label>
                                </div>
                            </li>
                            <li class="border-t border-neutral-300">
                                <div class="radio-theme radio-theme-xs">
                                    <input class="hidden" type="radio" id="currencyUS-${unitCount}-${unitInnerCount}" value="US$" name="currency-${unitCount}-${unitInnerCount}">
                                    <label for="currencyUS-${unitCount}-${unitInnerCount}" class="flex justify-between pl-8 pr-2 h-[26px]">
                                    <div class="text-sm text-slate-800">US$</div>
                                </label>
                                </div>
                            </li>
                            <li class="border-t border-neutral-300">
                                <div class="radio-theme radio-theme-xs">
                                    <input class="hidden" type="radio" id="currencyAU-${unitCount}-${unitInnerCount}" value="AU$" name="currency-${unitCount}-${unitInnerCount}">
                                    <label for="currencyAU-${unitCount}-${unitInnerCount}" class="flex justify-between pl-8 pr-2 h-[26px]">
                                    <div class="text-sm text-slate-800">AU$</div>
                                </label>
                                </div>
                            </li>
                            <li class="border-t border-neutral-300">
                                <div class="radio-theme radio-theme-xs">
                                    <input class="hidden" type="radio" id="currencySG-${unitCount}-${unitInnerCount}" value="SG$" name="currency-${unitCount}-${unitInnerCount}">
                                    <label for="currencySG-${unitCount}-${unitInnerCount}" class="flex justify-between pl-8 pr-2 h-[26px]">
                                    <div class="text-sm text-slate-800">SG$</div>
                                </label>
                                </div>
                            </li>
                            <li class="border-t border-neutral-300">
                                <div class="radio-theme radio-theme-xs">
                                    <input class="hidden" type="radio" id="currencyCAD-${unitCount}-${unitInnerCount}" value="CAD$" name="currency-${unitCount}-${unitInnerCount}">
                                    <label for="currencyCAD-${unitCount}-${unitInnerCount}" class="flex justify-between pl-8 pr-2 h-[26px]">
                                    <div class="text-sm text-slate-800">CAD$</div>
                                </label>
                                </div>
                            </li>
                            <li class="border-t border-neutral-300">
                                <div class="radio-theme radio-theme-xs">
                                    <input class="hidden" type="radio" id="currencyINR-${unitCount}-${unitInnerCount}" value="INR$" name="currency-${unitCount}-${unitInnerCount}">
                                    <label for="currencyINR-${unitCount}-${unitInnerCount}" class="flex justify-between pl-8 pr-2 h-[26px]">
                                    <div class="text-sm text-slate-800">INR$</div>
                                </label>
                                </div>
                            </li>
                            <li class="border-t border-neutral-300">
                                <div class="radio-theme radio-theme-xs">
                                    <input class="hidden" type="radio" id="currencyBaht-${unitCount}-${unitInnerCount}" value="Baht" name="currency-${unitCount}-${unitInnerCount}">
                                    <label for="currencyBaht-${unitCount}-${unitInnerCount}" class="flex justify-between pl-8 pr-2 h-[26px]">
                                    <div class="text-sm text-slate-800">Baht</div>
                                </label>
                                </div>
                            </li>
                            <li class="border-t border-neutral-300">
                                <div class="radio-theme radio-theme-xs">
                                    <input class="hidden" type="radio" id="currencyVND-${unitCount}-${unitInnerCount}" value="VND" name="currency-${unitCount}-${unitInnerCount}">
                                    <label for="currencyVND-${unitCount}-${unitInnerCount}" class="flex justify-between pl-8 pr-2 h-[26px]">
                                    <div class="text-sm text-slate-800">VND</div>
                                </label>
                                </div>
                            </li>
                            <li class="border-t border-neutral-300">
                                <div class="radio-theme radio-theme-xs">
                                    <input class="hidden" type="radio" id="currencyPESO-${unitCount}-${unitInnerCount}" value="PESO" name="currency-${unitCount}-${unitInnerCount}">
                                    <label for="currencyPESO-${unitCount}-${unitInnerCount}" class="flex justify-between pl-8 pr-2 h-[26px]">
                                    <div class="text-sm text-slate-800">PESO</div>
                                </label>
                                </div>
                            </li>
                            <li class="border-t border-neutral-300">
                                <div class="radio-theme radio-theme-xs">
                                    <input class="hidden" type="radio" id="currencyRINGGIT-${unitCount}-${unitInnerCount}" value="RINGGIT" name="currency-${unitCount}-${unitInnerCount}">
                                    <label for="currencyRINGGIT-${unitCount}-${unitInnerCount}" class="flex justify-between pl-8 pr-2 h-[26px]">
                                    <div class="text-sm text-slate-800">RINGGIT</div>
                                </label>
                                </div>
                            </li>
                            <li class="border-t border-neutral-300">
                                <div class="radio-theme radio-theme-xs">
                                    <input class="hidden" type="radio" id="currencyEURO-${unitCount}-${unitInnerCount}" value="EURO" name="currency-${unitCount}-${unitInnerCount}">
                                    <label for="currencyEURO-${unitCount}-${unitInnerCount}" class="flex justify-between pl-8 pr-2 h-[26px]">
                                    <div class="text-sm text-slate-800">EURO</div>
                                </label>
                                </div>
                            </li>
                            <li class="border-t border-neutral-300">
                                <div class="radio-theme radio-theme-xs">
                                    <input class="hidden" type="radio" id="currencyHK-${unitCount}-${unitInnerCount}" value="HK$" name="currency-${unitCount}-${unitInnerCount}">
                                    <label for="currencyHK-${unitCount}-${unitInnerCount}" class="flex justify-between pl-8 pr-2 h-[26px]">
                                    <div class="text-sm text-slate-800">HK$</div>
                                </label>
                                </div>
                            </li>

                        </ul>
                    </div>
                </div>
                <input type="text" maxlength="6" class="numbersOnly border-neutral-300 border focus:outline-none px-2.5 text-sm h-[26px] w-[70px]" />
            </div>
            <div class="text-md text-neutral-700 font-bold ml-2 mr-auto">Per</div>
            <div class="relative custom-select-wrapper">
                <div class="custom-select border-neutral-300 flex items-center border cursor-pointer bg-select-sm bg-no-repeat bg-[95%_center] text-slate-500 w-[103px] h-[26px] text-sm">
                    <span class="custom-select-placehodler text-neutral-400 text-sm font-extralight">Select One </span>
                    <div class="custom-select-tags-wrapper tag-theme">
                        <div class="custom-select-count"></div>
                    </div>
                </div>
                <div class="custom-options z-10 border-l border-r border-b border-neutral-300 w-48 absolute top-[100%] mt-[-1px] left-0 right-0 bg-white" style="display: none;">
                    <ul class="flex flex-col max-h-72 overflow-auto">
                        <li class="border-t border-neutral-300 sticky top-0 bg-white">
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
                                <input class="hidden" type="radio" id="unitPiece-${unitCount}-${unitInnerCount}" value="Piece" name="unit-${unitCount}-${unitInnerCount}">
                                <label for="unitPiece-${unitCount}-${unitInnerCount}" class="flex justify-between pl-8 pr-2 h-[26px]">
                                <div class="text-sm text-slate-800">Piece</div>
                            </label>
                            </div>
                        </li>
                        <li class="border-t border-neutral-300">
                            <div class="radio-theme radio-theme-xs">
                                <input class="hidden" type="radio" id="unitKg-${unitCount}-${unitInnerCount}" value="Kg" name="unit-${unitCount}-${unitInnerCount}">
                                <label for="unitKg-${unitCount}-${unitInnerCount}" class="flex justify-between pl-8 pr-2 h-[26px]">
                                <div class="text-sm text-slate-800">Kg</div>
                            </label>
                            </div>
                        </li>
                        <li class="border-t border-neutral-300">
                            <div class="radio-theme radio-theme-xs">
                                <input class="hidden" type="radio" id="unitGm-${unitCount}-${unitInnerCount}" value="Gm" name="unit-${unitCount}-${unitInnerCount}">
                                <label for="unitGm-${unitCount}-${unitInnerCount}" class="flex justify-between pl-8 pr-2 h-[26px]">
                                <div class="text-sm text-slate-800">Gm</div>
                            </label>
                            </div>
                        </li>
                        <li class="border-t border-neutral-300">
                            <div class="radio-theme radio-theme-xs">
                                <input class="hidden" type="radio" id="unitMeter-${unitCount}-${unitInnerCount}" value="Meter" name="unit-${unitCount}-${unitInnerCount}">
                                <label for="unitMeter-${unitCount}-${unitInnerCount}" class="flex justify-between pl-8 pr-2 h-[26px]">
                                <div class="text-sm text-slate-800">Meter</div>
                            </label>
                            </div>
                        </li>
                        <li class="border-t border-neutral-300">
                            <div class="radio-theme radio-theme-xs">
                                <input class="hidden" type="radio" id="unitCentimeter-${unitCount}-${unitInnerCount}" value="Centimeter" name="unit-${unitCount}-${unitInnerCount}">
                                <label for="unitCentimeter-${unitCount}-${unitInnerCount}" class="flex justify-between pl-8 pr-2 h-[26px]">
                                <div class="text-sm text-slate-800">Centimeter</div>
                            </label>
                            </div>
                        </li>
                        <li class="border-t border-neutral-300">
                            <div class="radio-theme radio-theme-xs">
                                <input class="hidden" type="radio" id="unitSqMeter-${unitCount}-${unitInnerCount}" value="Sq. Meter" name="unit-${unitCount}-${unitInnerCount}">
                                <label for="unitSqMeter-${unitCount}-${unitInnerCount}" class="flex justify-between pl-8 pr-2 h-[26px]">
                                <div class="text-sm text-slate-800">Sq. Meter</div>
                            </label>
                            </div>
                        </li>
                        <li class="border-t border-neutral-300">
                            <div class="radio-theme radio-theme-xs">
                                <input class="hidden" type="radio" id="unitYard-${unitCount}-${unitInnerCount}" value="Yard" name="unit-${unitCount}-${unitInnerCount}">
                                <label for="unitYard-${unitCount}-${unitInnerCount}" class="flex justify-between pl-8 pr-2 h-[26px]">
                                <div class="text-sm text-slate-800">Yard</div>
                            </label>
                            </div>
                        </li>
                        <li class="border-t border-neutral-300">
                            <div class="radio-theme radio-theme-xs">
                                <input class="hidden" type="radio" id="unitFoot-${unitCount}-${unitInnerCount}" value="Foot" name="unit-${unitCount}-${unitInnerCount}">
                                <label for="unitFoot-${unitCount}-${unitInnerCount}" class="flex justify-between pl-8 pr-2 h-[26px]">
                                <div class="text-sm text-slate-800">Foot</div>
                            </label>
                            </div>
                        </li>
                        <li class="border-t border-neutral-300">
                            <div class="radio-theme radio-theme-xs">
                                <input class="hidden" type="radio" id="unitSqFoot-${unitCount}-${unitInnerCount}" value="Sq. Foot" name="unit-${unitCount}-${unitInnerCount}">
                                <label for="unitSqFoot-${unitCount}-${unitInnerCount}" class="flex justify-between pl-8 pr-2 h-[26px]">
                                <div class="text-sm text-slate-800">Sq. Foot</div>
                            </label>
                            </div>
                        </li>
                        <li class="border-t border-neutral-300">
                            <div class="radio-theme radio-theme-xs">
                                <input class="hidden" type="radio" id="unitMillilitre-${unitCount}-${unitInnerCount}" value="Millilitre" name="unit-${unitCount}-${unitInnerCount}">
                                <label for="unitMillilitre-${unitCount}-${unitInnerCount}" class="flex justify-between pl-8 pr-2 h-[26px]">
                                <div class="text-sm text-slate-800">Millilitre</div>
                            </label>
                            </div>
                        </li>
                        <li class="border-t border-neutral-300">
                            <div class="radio-theme radio-theme-xs">
                                <input class="hidden" type="radio" id="unitLitre-${unitCount}-${unitInnerCount}" value="Litre" name="unit-${unitCount}-${unitInnerCount}">
                                <label for="unitLitre-${unitCount}-${unitInnerCount}" class="flex justify-between pl-8 pr-2 h-[26px]">
                                <div class="text-sm text-slate-800">Litre</div>
                            </label>
                            </div>
                        </li>
                        <li class="border-t border-neutral-300">
                            <div class="radio-theme radio-theme-xs">
                                <input class="hidden" type="radio" id="unitInch-${unitCount}-${unitInnerCount}" value="Inch" name="unit-${unitCount}-${unitInnerCount}">
                                <label for="unitInch-${unitCount}-${unitInnerCount}" class="flex justify-between pl-8 pr-2 h-[26px]">
                                <div class="text-sm text-slate-800">Inch</div>
                            </label>
                            </div>
                        </li>
                        <li class="border-t border-neutral-300">
                            <div class="radio-theme radio-theme-xs">
                                <input class="hidden" type="radio" id="unitSqInch-${unitCount}-${unitInnerCount}" value="Sq. Inch" name="unit-${unitCount}-${unitInnerCount}">
                                <label for="unitSqInch-${unitCount}-${unitInnerCount}" class="flex justify-between pl-8 pr-2 h-[26px]">
                                <div class="text-sm text-slate-800">Sq. Inch</div>
                            </label>
                            </div>
                        </li>
                        <li class="border-t border-neutral-300">
                            <div class="radio-theme radio-theme-xs">
                                <input class="hidden" type="radio" id="unitQuintal-${unitCount}-${unitInnerCount}" value="Quintal" name="unit-${unitCount}-${unitInnerCount}">
                                <label for="unitQuintal-${unitCount}-${unitInnerCount}" class="flex justify-between pl-8 pr-2 h-[26px]">
                                <div class="text-sm text-slate-800">Quintal</div>
                            </label>
                            </div>
                        </li>
                        <li class="border-t border-neutral-300">
                            <div class="radio-theme radio-theme-xs">
                                <input class="hidden" type="radio" id="unitTon-${unitCount}-${unitInnerCount}" value="Ton" name="unit-${unitCount}-${unitInnerCount}">
                                <label for="unitTon-${unitCount}-${unitInnerCount}" class="flex justify-between pl-8 pr-2 h-[26px]">
                                <div class="text-sm text-slate-800">Ton</div>
                            </label>
                            </div>
                        </li>
                        <li class="border-t border-neutral-300">
                            <div class="radio-theme radio-theme-xs">
                                <input class="hidden" type="radio" id="unitMetricTon-${unitCount}-${unitInnerCount}" value="Metric Ton" name="unit-${unitCount}-${unitInnerCount}">
                                <label for="unitMetricTon-${unitCount}-${unitInnerCount}" class="flex justify-between pl-8 pr-2 h-[26px]">
                                <div class="text-sm text-slate-800">Metric Ton</div>
                            </label>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <button data-inner-remove="unit-price" type="button" class="cursor-pointer ml-3 flex-shrink-0">
                <img src="../assets/images/admin/rem.svg" alt="icon">
            </button>
        </div>`;
            currentInnerUnitWrapper.append(newInnerUnitRow);
            unitInnerCount++;
        });
    }

    // Append Bulk Price Row
    if ($('[data-btn="bulk-price"]').length > 0) {
        let bulkCount = 1,
            bulkInnerCount = 1;
        $(document).on('click', '[data-btn="bulk-price"]', function() {
            let currentBulkRow = $(this).closest('[data-row="bulk-price"]');
            let newBulkRow = `<div data-row="bulk-price" class="flex items-start relative pr-[5.8rem] ">
            <div class="mr-2.5 w-48">
                <input data-input="bulk-price" type="text" placeholder="Bulk Price" class="placeholder:text-neutral-400 text-neutral-900 placeholder:font-extralight font-medium border border-dashed w-full border-teal-500 focus:outline-none px-1 text-sm h-[26px]">
            </div>
            <div data-inner-wrapper="bulk-price" class="flex-1 flex flex-col">
                <div data-inner-row="bulk-price" class="flex items-center flex-1 mb-2.5">
                    <div class="flex w-full max-w-[166px]">
                        <div class="relative custom-select-wrapper">
                            <div class="custom-select border-neutral-300 flex items-center border-l border-t border-b  cursor-pointer bg-select-sm bg-no-repeat bg-[95%_center] text-slate-500 w-24 h-[26px] bg-neutral-100 text-sm">
                                <span class="custom-select-placehodler text-neutral-400 text-sm font-extralight">Select One </span>
                                <div class="custom-select-tags-wrapper tag-theme">
                                    <div class="custom-select-count"></div>
                                </div>
                            </div>
                            <div class="custom-options z-10 border-l border-r border-b border-neutral-300 absolute top-[100%] mt-[-1px] left-0 right-0 bg-white w-36" style="display: none;">
                                <ul class="flex flex-col">
                                    <li class="border-t border-neutral-300 sticky top-0 bg-white">
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
                                            <input class="hidden" type="radio" id="currencyIDRBulk-${bulkCount}-${bulkInnerCount}" value="IDR" name="currency-${bulkCount}-${bulkInnerCount}">
                                            <label for="currencyIDRBulk-${bulkCount}-${bulkInnerCount}" class="flex justify-between pl-8 pr-2 h-[26px]">
                                            <div class="text-sm text-slate-800">IDR</div>
                                        </label>
                                        </div>
                                    </li>
                                    <li class="border-t border-neutral-300">
                                        <div class="radio-theme radio-theme-xs">
                                            <input class="hidden" type="radio" id="currencyUSBulk-${bulkCount}-${bulkInnerCount}" value="US$" name="currency-${bulkCount}-${bulkInnerCount}">
                                            <label for="currencyUSBulk-${bulkCount}-${bulkInnerCount}" class="flex justify-between pl-8 pr-2 h-[26px]">
                                            <div class="text-sm text-slate-800">US$</div>
                                        </label>
                                        </div>
                                    </li>
                                    <li class="border-t border-neutral-300">
                                        <div class="radio-theme radio-theme-xs">
                                            <input class="hidden" type="radio" id="currencyAUBulk-${bulkCount}-${bulkInnerCount}" value="AU$" name="currency-${bulkCount}-${bulkInnerCount}">
                                            <label for="currencyAUBulk-${bulkCount}-${bulkInnerCount}" class="flex justify-between pl-8 pr-2 h-[26px]">
                                            <div class="text-sm text-slate-800">AU$</div>
                                        </label>
                                        </div>
                                    </li>
                                    <li class="border-t border-neutral-300">
                                        <div class="radio-theme radio-theme-xs">
                                            <input class="hidden" type="radio" id="currencySGBulk-${bulkCount}-${bulkInnerCount}" value="SG$" name="currency-${bulkCount}-${bulkInnerCount}">
                                            <label for="currencySGBulk-${bulkCount}-${bulkInnerCount}" class="flex justify-between pl-8 pr-2 h-[26px]">
                                            <div class="text-sm text-slate-800">SG$</div>
                                        </label>
                                        </div>
                                    </li>
                                    <li class="border-t border-neutral-300">
                                        <div class="radio-theme radio-theme-xs">
                                            <input class="hidden" type="radio" id="currencyCADBulk-${bulkCount}-${bulkInnerCount}" value="CAD$" name="currency-${bulkCount}-${bulkInnerCount}">
                                            <label for="currencyCADBulk-${bulkCount}-${bulkInnerCount}" class="flex justify-between pl-8 pr-2 h-[26px]">
                                            <div class="text-sm text-slate-800">CAD$</div>
                                        </label>
                                        </div>
                                    </li>
                                    <li class="border-t border-neutral-300">
                                        <div class="radio-theme radio-theme-xs">
                                            <input class="hidden" type="radio" id="currencyINRBulk-${bulkCount}-${bulkInnerCount}" value="INR$" name="currency-${bulkCount}-${bulkInnerCount}">
                                            <label for="currencyINRBulk-${bulkCount}-${bulkInnerCount}" class="flex justify-between pl-8 pr-2 h-[26px]">
                                            <div class="text-sm text-slate-800">INR$</div>
                                        </label>
                                        </div>
                                    </li>
                                    <li class="border-t border-neutral-300">
                                        <div class="radio-theme radio-theme-xs">
                                            <input class="hidden" type="radio" id="currencyBahtBulk-${bulkCount}-${bulkInnerCount}" value="Baht" name="currency-${bulkCount}-${bulkInnerCount}">
                                            <label for="currencyBahtBulk-${bulkCount}-${bulkInnerCount}" class="flex justify-between pl-8 pr-2 h-[26px]">
                                            <div class="text-sm text-slate-800">Baht</div>
                                        </label>
                                        </div>
                                    </li>
                                    <li class="border-t border-neutral-300">
                                        <div class="radio-theme radio-theme-xs">
                                            <input class="hidden" type="radio" id="currencyVNDBulk-${bulkCount}-${bulkInnerCount}" value="VND" name="currency-${bulkCount}-${bulkInnerCount}">
                                            <label for="currencyVNDBulk-${bulkCount}-${bulkInnerCount}" class="flex justify-between pl-8 pr-2 h-[26px]">
                                            <div class="text-sm text-slate-800">VND</div>
                                        </label>
                                        </div>
                                    </li>
                                    <li class="border-t border-neutral-300">
                                        <div class="radio-theme radio-theme-xs">
                                            <input class="hidden" type="radio" id="currencyPESOBulk-${bulkCount}-${bulkInnerCount}" value="PESO" name="currency-${bulkCount}-${bulkInnerCount}">
                                            <label for="currencyPESOBulk-${bulkCount}-${bulkInnerCount}" class="flex justify-between pl-8 pr-2 h-[26px]">
                                            <div class="text-sm text-slate-800">PESO</div>
                                        </label>
                                        </div>
                                    </li>
                                    <li class="border-t border-neutral-300">
                                        <div class="radio-theme radio-theme-xs">
                                            <input class="hidden" type="radio" id="currencyRINGGITBulk-${bulkCount}-${bulkInnerCount}" value="RINGGIT" name="currency-${bulkCount}-${bulkInnerCount}">
                                            <label for="currencyRINGGITBulk-${bulkCount}-${bulkInnerCount}" class="flex justify-between pl-8 pr-2 h-[26px]">
                                            <div class="text-sm text-slate-800">RINGGIT</div>
                                        </label>
                                        </div>
                                    </li>
                                    <li class="border-t border-neutral-300">
                                        <div class="radio-theme radio-theme-xs">
                                            <input class="hidden" type="radio" id="currencyEUROBulk-${bulkCount}-${bulkInnerCount}" value="EURO" name="currency-${bulkCount}-${bulkInnerCount}">
                                            <label for="currencyEUROBulk-${bulkCount}-${bulkInnerCount}" class="flex justify-between pl-8 pr-2 h-[26px]">
                                            <div class="text-sm text-slate-800">EURO</div>
                                        </label>
                                        </div>
                                    </li>
                                    <li class="border-t border-neutral-300">
                                        <div class="radio-theme radio-theme-xs">
                                            <input class="hidden" type="radio" id="currencyHKBulk-${bulkCount}-${bulkInnerCount}" value="HK$" name="currency-${bulkCount}-${bulkInnerCount}">
                                            <label for="currencyHKBulk-${bulkCount}-${bulkInnerCount}" class="flex justify-between pl-8 pr-2 h-[26px]">
                                            <div class="text-sm text-slate-800">HK$</div>
                                        </label>
                                        </div>
                                    </li>

                                </ul>
                            </div>
                        </div>
                        <input type="text" maxlength="6" class="numbersOnly border-neutral-300 border focus:outline-none px-2.5 text-sm h-[26px] w-[70px]" />
                    </div>
                    <div class="text-md text-neutral-700 font-bold mx-2">Per</div>
                    <input type="text" class="border-neutral-300 border focus:outline-none px-2.5 text-sm h-[26px] w-full mr-2" placeholder="1000 - 10000">
                    <div class="relative custom-select-wrapper">
                        <div class="custom-select border-neutral-300 flex items-center border cursor-pointer bg-select-sm bg-no-repeat bg-[95%_center] text-slate-500 w-[103px] h-[26px] text-sm">
                            <span class="custom-select-placehodler text-neutral-400 text-sm font-extralight">Select One </span>
                            <div class="custom-select-tags-wrapper tag-theme">
                                <div class="custom-select-count"></div>
                            </div>
                        </div>
                        <div class="custom-options z-10 border-l border-r border-b border-neutral-300 absolute w-48 top-[100%] mt-[-1px] left-0 right-0 bg-white" style="display: none;">
                            <ul class="flex flex-col max-h-72 overflow-auto">
                                <li class="border-t border-neutral-300 sticky top-0 bg-white">
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
                                        <input class="hidden" type="radio" id="unitPieceBulk-${bulkCount}-${bulkInnerCount}" value="Piece" name="unit-${bulkCount}-${bulkInnerCount}">
                                        <label for="unitPieceBulk-${bulkCount}-${bulkInnerCount}" class="flex justify-between pl-8 pr-2 h-[26px]">
                                        <div class="text-sm text-slate-800">Piece</div>
                                    </label>
                                    </div>
                                </li>
                                <li class="border-t border-neutral-300">
                                    <div class="radio-theme radio-theme-xs">
                                        <input class="hidden" type="radio" id="unitKgBulk-${bulkCount}-${bulkInnerCount}" value="Kg" name="unit-${bulkCount}-${bulkInnerCount}">
                                        <label for="unitKgBulk-${bulkCount}-${bulkInnerCount}" class="flex justify-between pl-8 pr-2 h-[26px]">
                                        <div class="text-sm text-slate-800">Kg</div>
                                    </label>
                                    </div>
                                </li>
                                <li class="border-t border-neutral-300">
                                    <div class="radio-theme radio-theme-xs">
                                        <input class="hidden" type="radio" id="unitGmBulk-${bulkCount}-${bulkInnerCount}" value="Gm" name="unit-${bulkCount}-${bulkInnerCount}">
                                        <label for="unitGmBulk-${bulkCount}-${bulkInnerCount}" class="flex justify-between pl-8 pr-2 h-[26px]">
                                        <div class="text-sm text-slate-800">Gm</div>
                                    </label>
                                    </div>
                                </li>
                                <li class="border-t border-neutral-300">
                                    <div class="radio-theme radio-theme-xs">
                                        <input class="hidden" type="radio" id="unitMeterBulk-0" value="Meter" name="unit-${bulkCount}-${bulkInnerCount}">
                                        <label for="unitMeterBulk-${bulkCount}-${bulkInnerCount}" class="flex justify-between pl-8 pr-2 h-[26px]">
                                        <div class="text-sm text-slate-800">Meter</div>
                                    </label>
                                    </div>
                                </li>
                                <li class="border-t border-neutral-300">
                                    <div class="radio-theme radio-theme-xs">
                                        <input class="hidden" type="radio" id="unitCentimeterBulk-${bulkCount}-${bulkInnerCount}" value="Centimeter" name="unit-${bulkCount}-${bulkInnerCount}">
                                        <label for="unitCentimeterBulk-${bulkCount}-${bulkInnerCount}" class="flex justify-between pl-8 pr-2 h-[26px]">
                                        <div class="text-sm text-slate-800">Centimeter</div>
                                    </label>
                                    </div>
                                </li>
                                <li class="border-t border-neutral-300">
                                    <div class="radio-theme radio-theme-xs">
                                        <input class="hidden" type="radio" id="unitSqMeterBulk-${bulkCount}-${bulkInnerCount}" value="Sq. Meter" name="unit-${bulkCount}-${bulkInnerCount}">
                                        <label for="unitSqMeterBulk-${bulkCount}-${bulkInnerCount}" class="flex justify-between pl-8 pr-2 h-[26px]">
                                        <div class="text-sm text-slate-800">Sq. Meter</div>
                                    </label>
                                    </div>
                                </li>
                                <li class="border-t border-neutral-300">
                                    <div class="radio-theme radio-theme-xs">
                                        <input class="hidden" type="radio" id="unitYardBulk-${bulkCount}-${bulkInnerCount}" value="Yard" name="unit-${bulkCount}-${bulkInnerCount}">
                                        <label for="unitYardBulk-${bulkCount}-${bulkInnerCount}" class="flex justify-between pl-8 pr-2 h-[26px]">
                                        <div class="text-sm text-slate-800">Yard</div>
                                    </label>
                                    </div>
                                </li>
                                <li class="border-t border-neutral-300">
                                    <div class="radio-theme radio-theme-xs">
                                        <input class="hidden" type="radio" id="unitFootBulk-${bulkCount}-${bulkInnerCount}" value="Foot" name="unit-${bulkCount}-${bulkInnerCount}">
                                        <label for="unitFootBulk-${bulkCount}-${bulkInnerCount}" class="flex justify-between pl-8 pr-2 h-[26px]">
                                        <div class="text-sm text-slate-800">Foot</div>
                                    </label>
                                    </div>
                                </li>
                                <li class="border-t border-neutral-300">
                                    <div class="radio-theme radio-theme-xs">
                                        <input class="hidden" type="radio" id="unitSqFootBulk-${bulkCount}-${bulkInnerCount}" value="Sq. Foot" name="unit-${bulkCount}-${bulkInnerCount}">
                                        <label for="unitSqFootBulk-${bulkCount}-${bulkInnerCount}" class="flex justify-between pl-8 pr-2 h-[26px]">
                                        <div class="text-sm text-slate-800">Sq. Foot</div>
                                    </label>
                                    </div>
                                </li>
                                <li class="border-t border-neutral-300">
                                    <div class="radio-theme radio-theme-xs">
                                        <input class="hidden" type="radio" id="unitMillilitreBulk-${bulkCount}-${bulkInnerCount}" value="Millilitre" name="unit-${bulkCount}-${bulkInnerCount}">
                                        <label for="unitMillilitreBulk-${bulkCount}-${bulkInnerCount}" class="flex justify-between pl-8 pr-2 h-[26px]">
                                        <div class="text-sm text-slate-800">Millilitre</div>
                                    </label>
                                    </div>
                                </li>
                                <li class="border-t border-neutral-300">
                                    <div class="radio-theme radio-theme-xs">
                                        <input class="hidden" type="radio" id="unitLitreBulk-${bulkCount}-${bulkInnerCount}" value="Litre" name="unit-${bulkCount}-${bulkInnerCount}">
                                        <label for="unitLitreBulk-${bulkCount}-${bulkInnerCount}" class="flex justify-between pl-8 pr-2 h-[26px]">
                                        <div class="text-sm text-slate-800">Litre</div>
                                    </label>
                                    </div>
                                </li>
                                <li class="border-t border-neutral-300">
                                    <div class="radio-theme radio-theme-xs">
                                        <input class="hidden" type="radio" id="unitInchBulk-${bulkCount}-${bulkInnerCount}" value="Inch" name="unit-${bulkCount}-${bulkInnerCount}">
                                        <label for="unitInchBulk-${bulkCount}-${bulkInnerCount}" class="flex justify-between pl-8 pr-2 h-[26px]">
                                        <div class="text-sm text-slate-800">Inch</div>
                                    </label>
                                    </div>
                                </li>
                                <li class="border-t border-neutral-300">
                                    <div class="radio-theme radio-theme-xs">
                                        <input class="hidden" type="radio" id="unitSqInchBulk-${bulkCount}-${bulkInnerCount}" value="Sq. Inch" name="unit-${bulkCount}-${bulkInnerCount}">
                                        <label for="unitSqInchBulk-${bulkCount}-${bulkInnerCount}" class="flex justify-between pl-8 pr-2 h-[26px]">
                                        <div class="text-sm text-slate-800">Sq. Inch</div>
                                    </label>
                                    </div>
                                </li>
                                <li class="border-t border-neutral-300">
                                    <div class="radio-theme radio-theme-xs">
                                        <input class="hidden" type="radio" id="unitQuintalBulk-${bulkCount}-${bulkInnerCount}" value="Quintal" name="unit-${bulkCount}-${bulkInnerCount}">
                                        <label for="unitQuintalBulk-${bulkCount}-${bulkInnerCount}" class="flex justify-between pl-8 pr-2 h-[26px]">
                                        <div class="text-sm text-slate-800">Quintal</div>
                                    </label>
                                    </div>
                                </li>
                                <li class="border-t border-neutral-300">
                                    <div class="radio-theme radio-theme-xs">
                                        <input class="hidden" type="radio" id="unitTonBulk-${bulkCount}-${bulkInnerCount}" value="Ton" name="unit-${bulkCount}-${bulkInnerCount}">
                                        <label for="unitTonBulk-${bulkCount}-${bulkInnerCount}" class="flex justify-between pl-8 pr-2 h-[26px]">
                                        <div class="text-sm text-slate-800">Ton</div>
                                    </label>
                                    </div>
                                </li>
                                <li class="border-t border-neutral-300">
                                    <div class="radio-theme radio-theme-xs">
                                        <input class="hidden" type="radio" id="unitMetricTonBulk-${bulkCount}-${bulkInnerCount}" value="Metric Ton" name="unit-${bulkCount}-${bulkInnerCount}">
                                        <label for="unitMetricTonBulk-${bulkCount}-${bulkInnerCount}" class="flex justify-between pl-8 pr-2 h-[26px]">
                                        <div class="text-sm text-slate-800">Metric Ton</div>
                                    </label>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <button data-inner-btn="bulk-price" type="button" class="cursor-pointer ml-3 flex-shrink-0">
                        <img src="../assets/images/admin/add.svg" alt="icon">
                    </button>
                </div>
            </div>
            <div class="flex items-center absolute right-0 mr-[1px] top-1.5">
                <button data-remove="bulk-price" type="button" class="mr-3">
                    <img src="../assets/images/admin/rem.svg" alt="icon"/>
                </button>
                <button data-popup-open="bulk-price" type="button" class="mr-3">
                <img src="../assets/images/admin/list.svg" alt="icon"/>
                </button>
                <button data-bulb="bulk-price" type="button">
                    <img src="../assets/images/admin/bulb.svg" alt="icon">
                </button>
            </div>
        </div>`;
            currentBulkRow.after(newBulkRow);
            bulkCount++;
        });

        // Append Bulk Price Inner Row
        $(document).on('click', '[data-inner-btn="bulk-price"]', function() {
            let currentInnerBulkWrapper = $(this).closest('[data-inner-wrapper="bulk-price"]');
            let newInnerBulkRow = `<div data-inner-row="unit-price" class="flex items-center flex-1 mb-2.5">
            <div class="flex w-full max-w-[166px]">
                <div class="relative custom-select-wrapper">
                    <div class="custom-select border-neutral-300 flex items-center border-l border-t border-b  cursor-pointer bg-select-sm bg-no-repeat bg-[95%_center] text-slate-500 w-24 h-[26px] bg-neutral-100 text-sm">
                        <span class="custom-select-placehodler text-neutral-400 text-sm font-extralight">Select One </span>
                        <div class="custom-select-tags-wrapper tag-theme">
                            <div class="custom-select-count"></div>
                        </div>
                    </div>
                    <div class="custom-options z-10 border-l border-r border-b border-neutral-300 absolute top-[100%] mt-[-1px] left-0 right-0 bg-white w-36" style="display: none;">
                        <ul class="flex flex-col">
                            <li class="border-t border-neutral-300 sticky top-0 bg-white">
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
                                    <input class="hidden" type="radio" id="currencyIDR-${bulkCount}-${bulkInnerCount}" value="IDR" name="currency-${bulkCount}-${bulkInnerCount}">
                                    <label for="currencyIDR-${bulkCount}-${bulkInnerCount}" class="flex justify-between pl-8 pr-2 h-[26px]">
                                    <div class="text-sm text-slate-800">IDR</div>
                                </label>
                                </div>
                            </li>
                            <li class="border-t border-neutral-300">
                                <div class="radio-theme radio-theme-xs">
                                    <input class="hidden" type="radio" id="currencyUS-${bulkCount}-${bulkInnerCount}" value="US$" name="currency-${bulkCount}-${bulkInnerCount}">
                                    <label for="currencyUS-${bulkCount}-${bulkInnerCount}" class="flex justify-between pl-8 pr-2 h-[26px]">
                                    <div class="text-sm text-slate-800">US$</div>
                                </label>
                                </div>
                            </li>
                            <li class="border-t border-neutral-300">
                                <div class="radio-theme radio-theme-xs">
                                    <input class="hidden" type="radio" id="currencyAU-${bulkCount}-${bulkInnerCount}" value="AU$" name="currency-${bulkCount}-${bulkInnerCount}">
                                    <label for="currencyAU-${bulkCount}-${bulkInnerCount}" class="flex justify-between pl-8 pr-2 h-[26px]">
                                    <div class="text-sm text-slate-800">AU$</div>
                                </label>
                                </div>
                            </li>
                            <li class="border-t border-neutral-300">
                                <div class="radio-theme radio-theme-xs">
                                    <input class="hidden" type="radio" id="currencySG-${bulkCount}-${bulkInnerCount}" value="SG$" name="currency-${bulkCount}-${bulkInnerCount}">
                                    <label for="currencySG-${bulkCount}-${bulkInnerCount}" class="flex justify-between pl-8 pr-2 h-[26px]">
                                    <div class="text-sm text-slate-800">SG$</div>
                                </label>
                                </div>
                            </li>
                            <li class="border-t border-neutral-300">
                                <div class="radio-theme radio-theme-xs">
                                    <input class="hidden" type="radio" id="currencyCAD-${bulkCount}-${bulkInnerCount}" value="CAD$" name="currency-${bulkCount}-${bulkInnerCount}">
                                    <label for="currencyCAD-${bulkCount}-${bulkInnerCount}" class="flex justify-between pl-8 pr-2 h-[26px]">
                                    <div class="text-sm text-slate-800">CAD$</div>
                                </label>
                                </div>
                            </li>
                            <li class="border-t border-neutral-300">
                                <div class="radio-theme radio-theme-xs">
                                    <input class="hidden" type="radio" id="currencyINR-${bulkCount}-${bulkInnerCount}" value="INR$" name="currency-${bulkCount}-${bulkInnerCount}">
                                    <label for="currencyINR-${bulkCount}-${bulkInnerCount}" class="flex justify-between pl-8 pr-2 h-[26px]">
                                    <div class="text-sm text-slate-800">INR$</div>
                                </label>
                                </div>
                            </li>
                            <li class="border-t border-neutral-300">
                                <div class="radio-theme radio-theme-xs">
                                    <input class="hidden" type="radio" id="currencyBaht-${bulkCount}-${bulkInnerCount}" value="Baht" name="currency-${bulkCount}-${bulkInnerCount}">
                                    <label for="currencyBaht-${bulkCount}-${bulkInnerCount}" class="flex justify-between pl-8 pr-2 h-[26px]">
                                    <div class="text-sm text-slate-800">Baht</div>
                                </label>
                                </div>
                            </li>
                            <li class="border-t border-neutral-300">
                                <div class="radio-theme radio-theme-xs">
                                    <input class="hidden" type="radio" id="currencyVND-${bulkCount}-${bulkInnerCount}" value="VND" name="currency-${bulkCount}-${bulkInnerCount}">
                                    <label for="currencyVND-${bulkCount}-${bulkInnerCount}" class="flex justify-between pl-8 pr-2 h-[26px]">
                                    <div class="text-sm text-slate-800">VND</div>
                                </label>
                                </div>
                            </li>
                            <li class="border-t border-neutral-300">
                                <div class="radio-theme radio-theme-xs">
                                    <input class="hidden" type="radio" id="currencyPESO-${bulkCount}-${bulkInnerCount}" value="PESO" name="currency-${bulkCount}-${bulkInnerCount}">
                                    <label for="currencyPESO-${bulkCount}-${bulkInnerCount}" class="flex justify-between pl-8 pr-2 h-[26px]">
                                    <div class="text-sm text-slate-800">PESO</div>
                                </label>
                                </div>
                            </li>
                            <li class="border-t border-neutral-300">
                                <div class="radio-theme radio-theme-xs">
                                    <input class="hidden" type="radio" id="currencyRINGGIT-${bulkCount}-${bulkInnerCount}" value="RINGGIT" name="currency-${bulkCount}-${bulkInnerCount}">
                                    <label for="currencyRINGGIT-${bulkCount}-${bulkInnerCount}" class="flex justify-between pl-8 pr-2 h-[26px]">
                                    <div class="text-sm text-slate-800">RINGGIT</div>
                                </label>
                                </div>
                            </li>
                            <li class="border-t border-neutral-300">
                                <div class="radio-theme radio-theme-xs">
                                    <input class="hidden" type="radio" id="currencyEURO-${bulkCount}-${bulkInnerCount}" value="EURO" name="currency-${bulkCount}-${bulkInnerCount}">
                                    <label for="currencyEURO-${bulkCount}-${bulkInnerCount}" class="flex justify-between pl-8 pr-2 h-[26px]">
                                    <div class="text-sm text-slate-800">EURO</div>
                                </label>
                                </div>
                            </li>
                            <li class="border-t border-neutral-300">
                                <div class="radio-theme radio-theme-xs">
                                    <input class="hidden" type="radio" id="currencyHK-${bulkCount}-${bulkInnerCount}" value="HK$" name="currency-${bulkCount}-${bulkInnerCount}">
                                    <label for="currencyHK-${bulkCount}-${bulkInnerCount}" class="flex justify-between pl-8 pr-2 h-[26px]">
                                    <div class="text-sm text-slate-800">HK$</div>
                                </label>
                                </div>
                            </li>

                        </ul>
                    </div>
                </div>
                <input type="text" maxlength="6" class="numbersOnly border-neutral-300 border focus:outline-none px-2.5 text-sm h-[26px] w-[70px]" />
            </div>
            <div class="text-md text-neutral-700 font-bold mx-2">Per</div>
            <input type="text" class="border-neutral-300 border focus:outline-none px-2.5 text-sm h-[26px] w-full mr-2" placeholder="1000 - 10000">
            <div class="relative custom-select-wrapper">
                <div class="custom-select border-neutral-300 flex items-center border cursor-pointer bg-select-sm bg-no-repeat bg-[95%_center] text-slate-500 w-[103px] h-[26px] text-sm">
                    <span class="custom-select-placehodler text-neutral-400 text-sm font-extralight">Select One </span>
                    <div class="custom-select-tags-wrapper tag-theme">
                        <div class="custom-select-count"></div>
                    </div>
                </div>
                <div class="custom-options z-10 border-l border-r border-b border-neutral-300 w-48 absolute top-[100%] mt-[-1px] left-0 right-0 bg-white" style="display: none;">
                    <ul class="flex flex-col max-h-72 overflow-auto">
                        <li class="border-t border-neutral-300 sticky top-0 bg-white">
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
                                <input class="hidden" type="radio" id="unitPiece-${bulkCount}-${bulkInnerCount}" value="Piece" name="unit-${bulkCount}-${bulkInnerCount}">
                                <label for="unitPiece-${bulkCount}-${bulkInnerCount}" class="flex justify-between pl-8 pr-2 h-[26px]">
                                <div class="text-sm text-slate-800">Piece</div>
                            </label>
                            </div>
                        </li>
                        <li class="border-t border-neutral-300">
                            <div class="radio-theme radio-theme-xs">
                                <input class="hidden" type="radio" id="unitKg-${bulkCount}-${bulkInnerCount}" value="Kg" name="unit-${bulkCount}-${bulkInnerCount}">
                                <label for="unitKg-${bulkCount}-${bulkInnerCount}" class="flex justify-between pl-8 pr-2 h-[26px]">
                                <div class="text-sm text-slate-800">Kg</div>
                            </label>
                            </div>
                        </li>
                        <li class="border-t border-neutral-300">
                            <div class="radio-theme radio-theme-xs">
                                <input class="hidden" type="radio" id="unitGm-${bulkCount}-${bulkInnerCount}" value="Gm" name="unit-${bulkCount}-${bulkInnerCount}">
                                <label for="unitGm-${bulkCount}-${bulkInnerCount}" class="flex justify-between pl-8 pr-2 h-[26px]">
                                <div class="text-sm text-slate-800">Gm</div>
                            </label>
                            </div>
                        </li>
                        <li class="border-t border-neutral-300">
                            <div class="radio-theme radio-theme-xs">
                                <input class="hidden" type="radio" id="unitMeter-${bulkCount}-${bulkInnerCount}" value="Meter" name="unit-${bulkCount}-${bulkInnerCount}">
                                <label for="unitMeter-${bulkCount}-${bulkInnerCount}" class="flex justify-between pl-8 pr-2 h-[26px]">
                                <div class="text-sm text-slate-800">Meter</div>
                            </label>
                            </div>
                        </li>
                        <li class="border-t border-neutral-300">
                            <div class="radio-theme radio-theme-xs">
                                <input class="hidden" type="radio" id="unitCentimeter-${bulkCount}-${bulkInnerCount}" value="Centimeter" name="unit-${bulkCount}-${bulkInnerCount}">
                                <label for="unitCentimeter-${bulkCount}-${bulkInnerCount}" class="flex justify-between pl-8 pr-2 h-[26px]">
                                <div class="text-sm text-slate-800">Centimeter</div>
                            </label>
                            </div>
                        </li>
                        <li class="border-t border-neutral-300">
                            <div class="radio-theme radio-theme-xs">
                                <input class="hidden" type="radio" id="unitSqMeter-${bulkCount}-${bulkInnerCount}" value="Sq. Meter" name="unit-${bulkCount}-${bulkInnerCount}">
                                <label for="unitSqMeter-${bulkCount}-${bulkInnerCount}" class="flex justify-between pl-8 pr-2 h-[26px]">
                                <div class="text-sm text-slate-800">Sq. Meter</div>
                            </label>
                            </div>
                        </li>
                        <li class="border-t border-neutral-300">
                            <div class="radio-theme radio-theme-xs">
                                <input class="hidden" type="radio" id="unitYard-${bulkCount}-${bulkInnerCount}" value="Yard" name="unit-${bulkCount}-${bulkInnerCount}">
                                <label for="unitYard-${bulkCount}-${bulkInnerCount}" class="flex justify-between pl-8 pr-2 h-[26px]">
                                <div class="text-sm text-slate-800">Yard</div>
                            </label>
                            </div>
                        </li>
                        <li class="border-t border-neutral-300">
                            <div class="radio-theme radio-theme-xs">
                                <input class="hidden" type="radio" id="unitFoot-${bulkCount}-${bulkInnerCount}" value="Foot" name="unit-${bulkCount}-${bulkInnerCount}">
                                <label for="unitFoot-${bulkCount}-${bulkInnerCount}" class="flex justify-between pl-8 pr-2 h-[26px]">
                                <div class="text-sm text-slate-800">Foot</div>
                            </label>
                            </div>
                        </li>
                        <li class="border-t border-neutral-300">
                            <div class="radio-theme radio-theme-xs">
                                <input class="hidden" type="radio" id="unitSqFoot-${bulkCount}-${bulkInnerCount}" value="Sq. Foot" name="unit-${bulkCount}-${bulkInnerCount}">
                                <label for="unitSqFoot-${bulkCount}-${bulkInnerCount}" class="flex justify-between pl-8 pr-2 h-[26px]">
                                <div class="text-sm text-slate-800">Sq. Foot</div>
                            </label>
                            </div>
                        </li>
                        <li class="border-t border-neutral-300">
                            <div class="radio-theme radio-theme-xs">
                                <input class="hidden" type="radio" id="unitMillilitre-${bulkCount}-${bulkInnerCount}" value="Millilitre" name="unit-${bulkCount}-${bulkInnerCount}">
                                <label for="unitMillilitre-${bulkCount}-${bulkInnerCount}" class="flex justify-between pl-8 pr-2 h-[26px]">
                                <div class="text-sm text-slate-800">Millilitre</div>
                            </label>
                            </div>
                        </li>
                        <li class="border-t border-neutral-300">
                            <div class="radio-theme radio-theme-xs">
                                <input class="hidden" type="radio" id="unitLitre-${bulkCount}-${bulkInnerCount}" value="Litre" name="unit-${bulkCount}-${bulkInnerCount}">
                                <label for="unitLitre-${bulkCount}-${bulkInnerCount}" class="flex justify-between pl-8 pr-2 h-[26px]">
                                <div class="text-sm text-slate-800">Litre</div>
                            </label>
                            </div>
                        </li>
                        <li class="border-t border-neutral-300">
                            <div class="radio-theme radio-theme-xs">
                                <input class="hidden" type="radio" id="unitInch-${bulkCount}-${bulkInnerCount}" value="Inch" name="unit-${bulkCount}-${bulkInnerCount}">
                                <label for="unitInch-${bulkCount}-${bulkInnerCount}" class="flex justify-between pl-8 pr-2 h-[26px]">
                                <div class="text-sm text-slate-800">Inch</div>
                            </label>
                            </div>
                        </li>
                        <li class="border-t border-neutral-300">
                            <div class="radio-theme radio-theme-xs">
                                <input class="hidden" type="radio" id="unitSqInch-${bulkCount}-${bulkInnerCount}" value="Sq. Inch" name="unit-${bulkCount}-${bulkInnerCount}">
                                <label for="unitSqInch-${bulkCount}-${bulkInnerCount}" class="flex justify-between pl-8 pr-2 h-[26px]">
                                <div class="text-sm text-slate-800">Sq. Inch</div>
                            </label>
                            </div>
                        </li>
                        <li class="border-t border-neutral-300">
                            <div class="radio-theme radio-theme-xs">
                                <input class="hidden" type="radio" id="unitQuintal-${bulkCount}-${bulkInnerCount}" value="Quintal" name="unit-${bulkCount}-${bulkInnerCount}">
                                <label for="unitQuintal-${bulkCount}-${bulkInnerCount}" class="flex justify-between pl-8 pr-2 h-[26px]">
                                <div class="text-sm text-slate-800">Quintal</div>
                            </label>
                            </div>
                        </li>
                        <li class="border-t border-neutral-300">
                            <div class="radio-theme radio-theme-xs">
                                <input class="hidden" type="radio" id="unitTon-${bulkCount}-${bulkInnerCount}" value="Ton" name="unit-${bulkCount}-${bulkInnerCount}">
                                <label for="unitTon-${bulkCount}-${bulkInnerCount}" class="flex justify-between pl-8 pr-2 h-[26px]">
                                <div class="text-sm text-slate-800">Ton</div>
                            </label>
                            </div>
                        </li>
                        <li class="border-t border-neutral-300">
                            <div class="radio-theme radio-theme-xs">
                                <input class="hidden" type="radio" id="unitMetricTon-${bulkCount}-${bulkInnerCount}" value="Metric Ton" name="unit-${bulkCount}-${bulkInnerCount}">
                                <label for="unitMetricTon-${bulkCount}-${bulkInnerCount}" class="flex justify-between pl-8 pr-2 h-[26px]">
                                <div class="text-sm text-slate-800">Metric Ton</div>
                            </label>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <button data-inner-remove="bulk-price" type="button" class="cursor-pointer ml-3 flex-shrink-0">
                <img src="../assets/images/admin/rem.svg" alt="icon">
            </button>
        </div>`;
            currentInnerBulkWrapper.append(newInnerBulkRow);
            bulkInnerCount++;
        });
    }


    // Append Weight Size Row
    if ($('[data-btn="weight-size"]').length > 0) {
        let weightSizeCount = 1,
            weightSizeInnerCount = 1;
        $(document).on('click', '[data-btn="weight-size"]', function() {
            let currentWeightSizeRow = $(this).closest('[data-row="weight-size"]');
            let newWeightSizeRow = `<div data-row="weight-size" class="flex items-start relative pr-[5.8rem]">
            <div class="mr-2.5 w-48">
                <input data-input="weight-size" type="text" placeholder="Weight / Size of Packaging" class="placeholder:text-neutral-400 text-neutral-900 placeholder:font-extralight font-medium border border-dashed w-full border-teal-500 focus:outline-none px-1 text-sm h-[26px]">
            </div>
            <div data-inner-wrapper="weight-size" class="flex flex-col justify-center flex-1">
                <div data-inner-row="weight-size" class="flex items-center flex-1 mb-2.5">
                    <div class="flex w-full max-w-[81px] mr-3">
                        <input type="text" maxlength="6" class="numbersOnly border-neutral-300 border focus:outline-none px-2.5 text-sm h-[26px] w-full" />
                    </div>
                    <div class="relative custom-select-wrapper">
                        <div class="custom-select border-neutral-300 flex items-center border cursor-pointer bg-select-sm bg-no-repeat bg-[95%_center] text-slate-500 w-[103px] h-[26px] text-sm">
                            <span class="custom-select-placehodler text-neutral-400 text-sm font-extralight">Select One </span>
                            <div class="custom-select-tags-wrapper tag-theme">
                                <div class="custom-select-count"></div>
                            </div>
                        </div>
                        <div class="custom-options z-10 border-l border-r border-b border-neutral-300 w-48 absolute top-[100%] mt-[-1px] left-0 right-0 bg-white" style="display: none;">
                            <ul class="flex flex-col max-h-72 overflow-auto">
                                <li class="border-t border-neutral-300 sticky top-0 bg-white">
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
                                        <input class="hidden" type="radio" id="weightPiece-${weightSizeCount}-${weightSizeInnerCount}" value="Piece" name="weight-${weightSizeCount}-${weightSizeInnerCount}">
                                        <label for="weightPiece-${weightSizeCount}-${weightSizeInnerCount}" class="flex justify-between pl-8 pr-2 h-[26px]">
                                        <div class="text-sm text-slate-800">Piece</div>
                                    </label>
                                    </div>
                                </li>
                                <li class="border-t border-neutral-300">
                                    <div class="radio-theme radio-theme-xs">
                                        <input class="hidden" type="radio" id="weightKg-${weightSizeCount}-${weightSizeInnerCount}" value="Kg" name="weight-${weightSizeCount}-${weightSizeInnerCount}">
                                        <label for="weightKg-${weightSizeCount}-${weightSizeInnerCount}" class="flex justify-between pl-8 pr-2 h-[26px]">
                                        <div class="text-sm text-slate-800">Kg</div>
                                    </label>
                                    </div>
                                </li>
                                <li class="border-t border-neutral-300">
                                    <div class="radio-theme radio-theme-xs">
                                        <input class="hidden" type="radio" id="weightGm-${weightSizeCount}-${weightSizeInnerCount}" value="Gm" name="weight-${weightSizeCount}-${weightSizeInnerCount}">
                                        <label for="weightGm-${weightSizeCount}-${weightSizeInnerCount}" class="flex justify-between pl-8 pr-2 h-[26px]">
                                        <div class="text-sm text-slate-800">Gm</div>
                                    </label>
                                    </div>
                                </li>
                                <li class="border-t border-neutral-300">
                                    <div class="radio-theme radio-theme-xs">
                                        <input class="hidden" type="radio" id="weightMeter-${weightSizeCount}-${weightSizeInnerCount}" value="Meter" name="weight-${weightSizeCount}-${weightSizeInnerCount}">
                                        <label for="weightMeter-${weightSizeCount}-${weightSizeInnerCount}" class="flex justify-between pl-8 pr-2 h-[26px]">
                                        <div class="text-sm text-slate-800">Meter</div>
                                    </label>
                                    </div>
                                </li>
                                <li class="border-t border-neutral-300">
                                    <div class="radio-theme radio-theme-xs">
                                        <input class="hidden" type="radio" id="weightCentimeter-${weightSizeCount}-${weightSizeInnerCount}" value="Centimeter" name="weight-${weightSizeCount}-${weightSizeInnerCount}">
                                        <label for="weightCentimeter-${weightSizeCount}-${weightSizeInnerCount}" class="flex justify-between pl-8 pr-2 h-[26px]">
                                        <div class="text-sm text-slate-800">Centimeter</div>
                                    </label>
                                    </div>
                                </li>
                                <li class="border-t border-neutral-300">
                                    <div class="radio-theme radio-theme-xs">
                                        <input class="hidden" type="radio" id="weightSqMeter-${weightSizeCount}-${weightSizeInnerCount}" value="Sq. Meter" name="weight-${weightSizeCount}-${weightSizeInnerCount}">
                                        <label for="weightSqMeter-${weightSizeCount}-${weightSizeInnerCount}" class="flex justify-between pl-8 pr-2 h-[26px]">
                                        <div class="text-sm text-slate-800">Sq. Meter</div>
                                    </label>
                                    </div>
                                </li>
                                <li class="border-t border-neutral-300">
                                    <div class="radio-theme radio-theme-xs">
                                        <input class="hidden" type="radio" id="weightYard-${weightSizeCount}-${weightSizeInnerCount}" value="Yard" name="weight-${weightSizeCount}-${weightSizeInnerCount}">
                                        <label for="weightYard-${weightSizeCount}-${weightSizeInnerCount}" class="flex justify-between pl-8 pr-2 h-[26px]">
                                        <div class="text-sm text-slate-800">Yard</div>
                                    </label>
                                    </div>
                                </li>
                                <li class="border-t border-neutral-300">
                                    <div class="radio-theme radio-theme-xs">
                                        <input class="hidden" type="radio" id="weightFoot-${weightSizeCount}-${weightSizeInnerCount}" value="Foot" name="weight-${weightSizeCount}-${weightSizeInnerCount}">
                                        <label for="weightFoot-${weightSizeCount}-${weightSizeInnerCount}" class="flex justify-between pl-8 pr-2 h-[26px]">
                                        <div class="text-sm text-slate-800">Foot</div>
                                    </label>
                                    </div>
                                </li>
                                <li class="border-t border-neutral-300">
                                    <div class="radio-theme radio-theme-xs">
                                        <input class="hidden" type="radio" id="weightSqFoot-${weightSizeCount}-${weightSizeInnerCount}" value="Sq. Foot" name="weight-${weightSizeCount}-${weightSizeInnerCount}">
                                        <label for="weightSqFoot-${weightSizeCount}-${weightSizeInnerCount}" class="flex justify-between pl-8 pr-2 h-[26px]">
                                        <div class="text-sm text-slate-800">Sq. Foot</div>
                                    </label>
                                    </div>
                                </li>
                                <li class="border-t border-neutral-300">
                                    <div class="radio-theme radio-theme-xs">
                                        <input class="hidden" type="radio" id="weightMillilitre-${weightSizeCount}-${weightSizeInnerCount}" value="Millilitre" name="weight-${weightSizeCount}-${weightSizeInnerCount}">
                                        <label for="weightMillilitre-${weightSizeCount}-${weightSizeInnerCount}" class="flex justify-between pl-8 pr-2 h-[26px]">
                                        <div class="text-sm text-slate-800">Millilitre</div>
                                    </label>
                                    </div>
                                </li>
                                <li class="border-t border-neutral-300">
                                    <div class="radio-theme radio-theme-xs">
                                        <input class="hidden" type="radio" id="weightLitre-${weightSizeCount}-${weightSizeInnerCount}" value="Litre" name="weight-${weightSizeCount}-${weightSizeInnerCount}">
                                        <label for="weightLitre-${weightSizeCount}-${weightSizeInnerCount}" class="flex justify-between pl-8 pr-2 h-[26px]">
                                        <div class="text-sm text-slate-800">Litre</div>
                                    </label>
                                    </div>
                                </li>
                                <li class="border-t border-neutral-300">
                                    <div class="radio-theme radio-theme-xs">
                                        <input class="hidden" type="radio" id="weightInch-${weightSizeCount}-${weightSizeInnerCount}" value="Inch" name="weight-${weightSizeCount}-${weightSizeInnerCount}">
                                        <label for="weightInch-${weightSizeCount}-${weightSizeInnerCount}" class="flex justify-between pl-8 pr-2 h-[26px]">
                                        <div class="text-sm text-slate-800">Inch</div>
                                    </label>
                                    </div>
                                </li>
                                <li class="border-t border-neutral-300">
                                    <div class="radio-theme radio-theme-xs">
                                        <input class="hidden" type="radio" id="weightSqInch-${weightSizeCount}-${weightSizeInnerCount}" value="Sq. Inch" name="weight-${weightSizeCount}-${weightSizeInnerCount}">
                                        <label for="weightSqInch-${weightSizeCount}-${weightSizeInnerCount}" class="flex justify-between pl-8 pr-2 h-[26px]">
                                        <div class="text-sm text-slate-800">Sq. Inch</div>
                                    </label>
                                    </div>
                                </li>
                                <li class="border-t border-neutral-300">
                                    <div class="radio-theme radio-theme-xs">
                                        <input class="hidden" type="radio" id="weightQuintal-${weightSizeCount}-${weightSizeInnerCount}" value="Quintal" name="weight-${weightSizeCount}-${weightSizeInnerCount}">
                                        <label for="weightQuintal-${weightSizeCount}-${weightSizeInnerCount}" class="flex justify-between pl-8 pr-2 h-[26px]">
                                        <div class="text-sm text-slate-800">Quintal</div>
                                    </label>
                                    </div>
                                </li>
                                <li class="border-t border-neutral-300">
                                    <div class="radio-theme radio-theme-xs">
                                        <input class="hidden" type="radio" id="weightTon-${weightSizeCount}-${weightSizeInnerCount}" value="Ton" name="weight-${weightSizeCount}-${weightSizeInnerCount}">
                                        <label for="weightTon-${weightSizeCount}-${weightSizeInnerCount}" class="flex justify-between pl-8 pr-2 h-[26px]">
                                        <div class="text-sm text-slate-800">Ton</div>
                                    </label>
                                    </div>
                                </li>
                                <li class="border-t border-neutral-300">
                                    <div class="radio-theme radio-theme-xs">
                                        <input class="hidden" type="radio" id="weightMetricTon-${weightSizeCount}-${weightSizeInnerCount}" value="Metric Ton" name="weight-${weightSizeCount}-${weightSizeInnerCount}">
                                        <label for="weightMetricTon-${weightSizeCount}-${weightSizeInnerCount}" class="flex justify-between pl-8 pr-2 h-[26px]">
                                        <div class="text-sm text-slate-800">Metric Ton</div>
                                    </label>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <button data-inner-btn="weight-size" type="button" class="cursor-pointer ml-3">
                        <img src="../assets/images/admin/add.svg" alt="icon"/>
                    </button>
                </div>
            </div>

            <div class="flex items-center absolute right-0 mr-[1px] top-1.5">
                <button data-remove="weight-size" type="button" class="mr-3">
                    <img src="../assets/images/admin/rem.svg" alt="icon"/>
                </button>
                <button data-popup-open="weight-size" type="button" class="mr-3">
                <img src="../assets/images/admin/list.svg" alt="icon"/>
                </button>
                <button data-bulb="weight-size" type="button">
                    <img src="../assets/images/admin/bulb.svg" alt="icon">
                </button>
            </div>  
        </div>`;
            currentWeightSizeRow.after(newWeightSizeRow);
            weightSizeCount++;
        });

        // Append Weight Size Inner Row
        $(document).on('click', '[data-inner-btn="weight-size"]', function() {
            let currentInnerWeightWrapper = $(this).closest('[data-inner-wrapper="weight-size"]')
            let newInnerWeightRow = `<div data-inner-row="weight-size" class="flex items-center flex-1 mb-2.5">
            <div class="flex w-full max-w-[81px] mr-3">
                <input type="text" maxlength="6" class="numbersOnly border-neutral-300 border focus:outline-none px-2.5 text-sm h-[26px] w-full" />
            </div>
            <div class="relative custom-select-wrapper">
                <div class="custom-select border-neutral-300 flex items-center border cursor-pointer bg-select-sm bg-no-repeat bg-[95%_center] text-slate-500 w-[103px] h-[26px] text-sm">
                    <span class="custom-select-placehodler text-neutral-400 text-sm font-extralight">Select One </span>
                    <div class="custom-select-tags-wrapper tag-theme">
                        <div class="custom-select-count"></div>
                    </div>
                </div>
                <div class="custom-options z-10 border-l border-r border-b border-neutral-300 w-48  absolute top-[100%] mt-[-1px] left-0 right-0 bg-white" style="display: none;">
                    <ul class="flex flex-col max-h-72 overflow-auto">
                        <li class="border-t border-neutral-300 sticky top-0 bg-white">
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
                                <input class="hidden" type="radio" id="weightPiece-${weightSizeCount}-${weightSizeInnerCount}" value="Piece" name="weight-${weightSizeCount}-${weightSizeInnerCount}">
                                <label for="weightPiece-${weightSizeCount}-${weightSizeInnerCount}" class="flex justify-between pl-8 pr-2 h-[26px]">
                                <div class="text-sm text-slate-800">Piece</div>
                            </label>
                            </div>
                        </li>
                        <li class="border-t border-neutral-300">
                            <div class="radio-theme radio-theme-xs">
                                <input class="hidden" type="radio" id="weightKg-${weightSizeCount}-${weightSizeInnerCount}" value="Kg" name="weight-${weightSizeCount}-${weightSizeInnerCount}">
                                <label for="weightKg-${weightSizeCount}-${weightSizeInnerCount}" class="flex justify-between pl-8 pr-2 h-[26px]">
                                <div class="text-sm text-slate-800">Kg</div>
                            </label>
                            </div>
                        </li>
                        <li class="border-t border-neutral-300">
                            <div class="radio-theme radio-theme-xs">
                                <input class="hidden" type="radio" id="weightGm-${weightSizeCount}-${weightSizeInnerCount}" value="Gm" name="weight-${weightSizeCount}-${weightSizeInnerCount}">
                                <label for="weightGm-${weightSizeCount}-${weightSizeInnerCount}" class="flex justify-between pl-8 pr-2 h-[26px]">
                                <div class="text-sm text-slate-800">Gm</div>
                            </label>
                            </div>
                        </li>
                        <li class="border-t border-neutral-300">
                            <div class="radio-theme radio-theme-xs">
                                <input class="hidden" type="radio" id="weightMeter-${weightSizeCount}-${weightSizeInnerCount}" value="Meter" name="weight-${weightSizeCount}-${weightSizeInnerCount}">
                                <label for="weightMeter-${weightSizeCount}-${weightSizeInnerCount}" class="flex justify-between pl-8 pr-2 h-[26px]">
                                <div class="text-sm text-slate-800">Meter</div>
                            </label>
                            </div>
                        </li>
                        <li class="border-t border-neutral-300">
                            <div class="radio-theme radio-theme-xs">
                                <input class="hidden" type="radio" id="weightCentimeter-${weightSizeCount}-${weightSizeInnerCount}" value="Centimeter" name="weight-${weightSizeCount}-${weightSizeInnerCount}">
                                <label for="weightCentimeter-${weightSizeCount}-${weightSizeInnerCount}" class="flex justify-between pl-8 pr-2 h-[26px]">
                                <div class="text-sm text-slate-800">Centimeter</div>
                            </label>
                            </div>
                        </li>
                        <li class="border-t border-neutral-300">
                            <div class="radio-theme radio-theme-xs">
                                <input class="hidden" type="radio" id="weightSqMeter-${weightSizeCount}-${weightSizeInnerCount}" value="Sq. Meter" name="weight-${weightSizeCount}-${weightSizeInnerCount}">
                                <label for="weightSqMeter-${weightSizeCount}-${weightSizeInnerCount}" class="flex justify-between pl-8 pr-2 h-[26px]">
                                <div class="text-sm text-slate-800">Sq. Meter</div>
                            </label>
                            </div>
                        </li>
                        <li class="border-t border-neutral-300">
                            <div class="radio-theme radio-theme-xs">
                                <input class="hidden" type="radio" id="weightYard-${weightSizeCount}-${weightSizeInnerCount}" value="Yard" name="weight-${weightSizeCount}-${weightSizeInnerCount}">
                                <label for="weightYard-${weightSizeCount}-${weightSizeInnerCount}" class="flex justify-between pl-8 pr-2 h-[26px]">
                                <div class="text-sm text-slate-800">Yard</div>
                            </label>
                            </div>
                        </li>
                        <li class="border-t border-neutral-300">
                            <div class="radio-theme radio-theme-xs">
                                <input class="hidden" type="radio" id="weightFoot-${weightSizeCount}-${weightSizeInnerCount}" value="Foot" name="weight-${weightSizeCount}-${weightSizeInnerCount}">
                                <label for="weightFoot-${weightSizeCount}-${weightSizeInnerCount}" class="flex justify-between pl-8 pr-2 h-[26px]">
                                <div class="text-sm text-slate-800">Foot</div>
                            </label>
                            </div>
                        </li>
                        <li class="border-t border-neutral-300">
                            <div class="radio-theme radio-theme-xs">
                                <input class="hidden" type="radio" id="weightSqFoot-${weightSizeCount}-${weightSizeInnerCount}" value="Sq. Foot" name="weight-${weightSizeCount}-${weightSizeInnerCount}">
                                <label for="weightSqFoot-${weightSizeCount}-${weightSizeInnerCount}" class="flex justify-between pl-8 pr-2 h-[26px]">
                                <div class="text-sm text-slate-800">Sq. Foot</div>
                            </label>
                            </div>
                        </li>
                        <li class="border-t border-neutral-300">
                            <div class="radio-theme radio-theme-xs">
                                <input class="hidden" type="radio" id="weightMillilitre-${weightSizeCount}-${weightSizeInnerCount}" value="Millilitre" name="weight-${weightSizeCount}-${weightSizeInnerCount}">
                                <label for="weightMillilitre-${weightSizeCount}-${weightSizeInnerCount}" class="flex justify-between pl-8 pr-2 h-[26px]">
                                <div class="text-sm text-slate-800">Millilitre</div>
                            </label>
                            </div>
                        </li>
                        <li class="border-t border-neutral-300">
                            <div class="radio-theme radio-theme-xs">
                                <input class="hidden" type="radio" id="weightLitre-${weightSizeCount}-${weightSizeInnerCount}" value="Litre" name="weight-${weightSizeCount}-${weightSizeInnerCount}">
                                <label for="weightLitre-${weightSizeCount}-${weightSizeInnerCount}" class="flex justify-between pl-8 pr-2 h-[26px]">
                                <div class="text-sm text-slate-800">Litre</div>
                            </label>
                            </div>
                        </li>
                        <li class="border-t border-neutral-300">
                            <div class="radio-theme radio-theme-xs">
                                <input class="hidden" type="radio" id="weightInch-${weightSizeCount}-${weightSizeInnerCount}" value="Inch" name="weight-${weightSizeCount}-${weightSizeInnerCount}">
                                <label for="weightInch-${weightSizeCount}-${weightSizeInnerCount}" class="flex justify-between pl-8 pr-2 h-[26px]">
                                <div class="text-sm text-slate-800">Inch</div>
                            </label>
                            </div>
                        </li>
                        <li class="border-t border-neutral-300">
                            <div class="radio-theme radio-theme-xs">
                                <input class="hidden" type="radio" id="weightSqInch-${weightSizeCount}-${weightSizeInnerCount}" value="Sq. Inch" name="weight-${weightSizeCount}-${weightSizeInnerCount}">
                                <label for="weightSqInch-${weightSizeCount}-${weightSizeInnerCount}" class="flex justify-between pl-8 pr-2 h-[26px]">
                                <div class="text-sm text-slate-800">Sq. Inch</div>
                            </label>
                            </div>
                        </li>
                        <li class="border-t border-neutral-300">
                            <div class="radio-theme radio-theme-xs">
                                <input class="hidden" type="radio" id="weightQuintal-${weightSizeCount}-${weightSizeInnerCount}" value="Quintal" name="weight-${weightSizeCount}-${weightSizeInnerCount}">
                                <label for="weightQuintal-${weightSizeCount}-${weightSizeInnerCount}" class="flex justify-between pl-8 pr-2 h-[26px]">
                                <div class="text-sm text-slate-800">Quintal</div>
                            </label>
                            </div>
                        </li>
                        <li class="border-t border-neutral-300">
                            <div class="radio-theme radio-theme-xs">
                                <input class="hidden" type="radio" id="weightTon-${weightSizeCount}-${weightSizeInnerCount}" value="Ton" name="weight-${weightSizeCount}-${weightSizeInnerCount}">
                                <label for="weightTon-${weightSizeCount}-${weightSizeInnerCount}" class="flex justify-between pl-8 pr-2 h-[26px]">
                                <div class="text-sm text-slate-800">Ton</div>
                            </label>
                            </div>
                        </li>
                        <li class="border-t border-neutral-300">
                            <div class="radio-theme radio-theme-xs">
                                <input class="hidden" type="radio" id="weightMetricTon-${weightSizeCount}-${weightSizeInnerCount}" value="Metric Ton" name="weight-${weightSizeCount}-${weightSizeInnerCount}">
                                <label for="weightMetricTon-${weightSizeCount}-${weightSizeInnerCount}" class="flex justify-between pl-8 pr-2 h-[26px]">
                                <div class="text-sm text-slate-800">Metric Ton</div>
                            </label>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <button data-inner-remove="weight-size" type="button" class="cursor-pointer ml-3">
                <img src="../assets/images/admin/rem.svg" alt="icon"/>
            </button>
        </div>`;
            currentInnerWeightWrapper.append(newInnerWeightRow);
            weightSizeInnerCount++;
        });
    }

    // Append Type Textarea Row
    if ($('[data-btn="type-textarea"]').length > 0) {
        $(document).on('click', '[data-btn="type-textarea"]', function() {
            let currentTypeInputRow = $(this).closest('[data-row="type-textarea"]');
            let newTypeInputRow = `<div data-row="type-textarea" class="flex flex-col relative pr-[5.8rem] mb-2.5">
            <div class="flex  items-center mb-2.5">
                <div class="mr-2.5 w-48">
                    <input data-input="type-textarea" type="text" placeholder="Specifications & Description" class="placeholder:text-neutral-400 text-neutral-900 placeholder:font-extralight font-medium border border-dashed w-full border-teal-500 focus:outline-none px-1 text-sm h-[26px]">
                </div>
                <div class="relative flex-1">
                    <input data-input="type-textarea" type="text" placeholder="Describe technical details or any specific configuration and overview, benefits, ingredients" class="border border-neutral-300 h-[26px] w-full text-neutral-700 text-sm px-2 bg-white focus:outline-none">
                </div>
                <div class="flex items-center absolute right-0 mr-[1px] top-1.5">
                <button data-remove="type-textarea" type="button" class="mr-3">
                    <img src="../assets/images/admin/rem.svg" alt="icon"/>
                </button>
                <button data-popup-open="type-textarea" type="button" class="mr-3">
                    <img src="../assets/images/admin/list.svg" alt="icon"/>
                </button>
                <button data-bulb="type-textarea" type="button">
                    <img src="../assets/images/admin/bulb.svg" alt="icon">
                </button>
                </div>
            </div>
            <div class="flex flex-col mb-5 relative">
                <textarea maxlength="2000" class="count-area valid-input input-empty border-neutral-300 border px-2 text-sm focus:outline-none py-2 w-full h-32 resize-none text-neutral-700 placeholder:text-neutral-400 placeholder:font-light" id="" cols="30" rows="10"></textarea>
                <div class="absolute -bottom-5 right-0 text-gray-400 text-xs"><span class="count">0</span> / 2000</div>
            </div>
        </div>`;
            currentTypeInputRow.after(newTypeInputRow);
        });
    }


    // Remove Appended Row
    if ($('[data-row]').length > 0) {
        $(document).on('click', '[data-remove]', function() {
            let appendedRow = $(this).closest('[data-row]');
            appendedRow.remove();
        });
    }

    // Remove Inner Appended Row
    if ($('[data-inner-row]').length > 0) {
        $(document).on('click', '[data-inner-remove]', function() {
            let appendedInnerRow = $(this).closest('[data-inner-row]');
            appendedInnerRow.remove();
        });
    }


    // Modals JS
    if ($('[data-popup]').length > 0) {
        // Open List Modal In Rows 
        if ($('[data-popup-open]').length > 0) {
            $(document).on('click', '[data-popup-open]', function() {
                let currentRow = $(this).closest('[data-row]');
                currentRow.find('[data-popup]').addClass('modal-show');
            });
        }

        // Close List Modal In Rows 
        if ($('[data-popup-close]').length > 0) {
            $(document).on('click', '[data-popup-close]', function() {
                let currentRow = $(this).closest('[data-row]');
                currentRow.find('[data-popup]').removeClass('modal-show');
            });
        }

        // Save List Modal In Rows 
        if ($('[data-popup-save]').length > 0) {
            $(document).on('click', '[data-popup-save]', function() {
                let currentRow = $(this).closest('[data-row]');
                currentRow.find('[data-popup]').removeClass('modal-show');
                currentRow.find('[data-popup-open] img').attr('src', '../assets/images/admin/list-filled.svg');;
            });
        }
    }



    // Post Button  
    if ($('#postBtn').length > 0) {
        $(document).on('click', '#postBtn', function() {
            $(".saving-spinner").fadeIn();
            setTimeout(() => {
                $(".saving-spinner").fadeOut();
                $(".copying-data").fadeIn();
                setTimeout(() => {
                    $(".copying-data").fadeOut();
                    $("#newProduct").hide();
                    $("#viewProduct").hide();
                    $("#newSavedProduct").show();
                }, 2000);
            }, 2000);
        });
    }

    // Preview Button  
    if ($('#previewBtn').length > 0) {
        $(document).on('click', '#previewBtn', function() {
            $(".saving-spinner").fadeIn();
            setTimeout(() => {
                $(".saving-spinner").fadeOut();
                $("#editableFields").hide();
                $("#previewFields").show();
                $(this).hide();
                $("#editBtn").show();
            }, 2000);
        });
    }

    // Preview Button  
    if ($('#editBtn').length > 0) {
        $(document).on('click', '#editBtn', function() {
            $(".saving-spinner").fadeIn();
            setTimeout(() => {
                $(".saving-spinner").fadeOut();
                $("#previewFields").hide();
                $("#editableFields").show();
                $(this).hide();
                $("#previewBtn").show();
            }, 2000);
        });
    }

    // Edit Details Button  
    if ($('#editDetails').length > 0) {
        $(document).on('click', '#editDetails', function() {
            $(".saving-spinner").fadeIn();
            setTimeout(() => {
                $(".saving-spinner").fadeOut();
                $("#newSavedProduct").hide();
                $("#viewProduct").hide();
                $("#newProduct").show();
            }, 2000);
        });
    }

    // Icon Toggler 
    if ($('[data-bulb]').length > 0) {
        $(document).on('click', '[data-bulb]', function() {
            let imgBulb = $(this).find('img');
            imgBulb.toggleClass('active');
            if (imgBulb.hasClass('active')) {
                imgBulb.attr('src', '../assets/images/admin/bulb-filled.svg');
            } else {
                imgBulb.attr('src', '../assets/images/admin/bulb.svg');
            }
        });
    }

    // Change Icon + Placeholder + Value 
    if ($('[data-icon="battery"]').length > 0) {
        $(document).on('click', '[data-icon="battery"]', function() {
            let imgBattery = $(this).find('img');
            imgBattery.toggleClass('active');
            if (imgBattery.hasClass('active')) {
                imgBattery.attr('src', '../assets/images/admin/battery-filled.svg');
                $('[data-input]').each(function() {
                    let placeholder = $(this).attr('placeholder');
                    $(this).val(placeholder);
                });
            } else {
                imgBattery.attr('src', '../assets/images/admin/battery.svg');
                $('[data-input]').each(function() {
                    $(this).val('');
                });
            }
        });
    }
    if ($('[data-icon="data"]').length > 0) {
        $(document).on('click', '[data-icon="data"]', function() {
            let imgData = $(this).find('img');
            imgData.toggleClass('active');
            if (imgData.hasClass('active')) {
                imgData.attr('src', '../assets/images/admin/data-filled.svg');
            } else {
                imgData.attr('src', '../assets/images/admin/data.svg');
            }
        });
    }
    if ($('[data-icon="remove"]').length > 0) {
        $(document).on('click', '[data-icon="remove"]', function() {
            let imgRemove = $(this).find('img');
            imgRemove.toggleClass('active');
            if (imgRemove.hasClass('active')) {
                imgRemove.attr('src', '../assets/images/admin/remove-filled.svg');
            } else {
                imgRemove.attr('src', '../assets/images/admin/remove.svg');
            }
        });
    }


    // Image INIT
    if ($('[data-preview="image"]').length > 0) {
        $('[data-preview="image"]').each(function(index) {
            $(document).on('change', `#filePhoto-${index}`, function(e) {
                let currentImage = $(this).closest('[data-preview="image"]');
                let currentRow = $(this).closest('[data-upload="uploader"]');
                var reader = new FileReader();
                reader.onload = function(event) {
                    currentImage.find('img').attr('src', event.target.result);
                }
                reader.readAsDataURL(e.target.files[0]);
                currentRow.find('[data-label="image"]').text('Add Image').addClass('opacity-0');
                currentRow.find('[data-remove="image"]').fadeIn();
            });
        });



        if ($('[data-remove="image"]').length > 0) {
            $(document).on('click', '[data-remove="image"]', function() {
                let currentRow = $(this).closest('[data-upload="uploader"]');
                $(this).fadeOut();
                currentRow.find('[data-image="image"]').attr('src', '');
                currentRow.find('[data-label="image"]').text('Add Image').removeClass('opacity-0');
            });
        }
    }

    // Sortable
    if ($('#previewFields').length > 0) {
        $("#previewFields").sortable();
    }

    // Check product is checked
    function checkedProduct() {
        // Set timeout Delay to when Select all button is checked
        setTimeout(() => {

            $("#newSavedProduct").hide();
            $("#viewProduct").hide();
            $("#previewFields").hide();
            $("#editableFields").show();

            $("#previewBtn").show();
            $("#editBtn").hide();
            let checkedProductArr = [];
            $("#productBlock .checkbox-theme > input:checked").each(function() {
                let checkedProductVal = $(this).val();
                checkedProductArr.push(checkedProductVal);
            });
            $("[data-checked]").find('span').text(checkedProductArr.join(", "));
            if (checkedProductArr.length > 0) {
                $('#enterCopyProduct').attr("href", "#copyProduct");
                $("#newProduct").show().removeClass('opacity-20 pointer-events-none');
                $("#copyProduct").removeClass('opacity-20 pointer-events-none');
                if (checkedProductArr.length == 1) {
                    $('html, body').animate({
                        scrollTop: $("#copyProduct").offset().top
                    }, 300);
                }

                // Add Images List
                // let imageUnit;
                // $(`#imageListWrappler`).empty();
                // for (let [index, checkedProduct] of checkedProductArr.entries()) {
                //     imageUnit = `<div class="flex flex-col mr-4 md:mr-5">
                //     <h5 class="text-sm mb-2 truncate max-w-[90px]">${checkedProduct}</h5>
                //     <div class="flex flex-col flex-shrink-0  relative" data-upload="uploader">
                //         <div class="w-[90px] h-[90px] border border-neutral-300 bg-white ">
                //             <div data-preview="image" class="relative h-full flex justify-center items-center p-2">
                //                 <img data-image="image" class="w-[90px] max-h-full object-cover" src="" />
                //                 <input type="file" class="absolute inset-0 w-[90px] h-[90px] opacity-0 z-10 cursor-pointer" id="filePhoto-${index}" />
                //             </div>
                //         </div>
                //         <div class="flex items-center justify-between">
                //         <div class="flex mt-1">
                //                 <input id="default-${index}" type="radio" name="default-image" class="accent-teal-600 mr-1">
                //                 <label class="text-xs cursor-pointer" for="default-${index}">Default</label>
                //             </div>
                //             <label data-label="image" for="filePhoto-${index}" class="label-active text-xs text-teal-600 font-normal cursor-pointer -mt-3" type="button">Add Image</label>
                //             <button style="display: none;" data-remove="image" class="mt-1" type="button font-normal">
                //                 <img src="../assets/images/admin/remove-xs.svg" alt="icon"/>
                //             </button>
                //         </div>
                //     </div>
                // </div>`;
                //     $(`#imageListWrappler`).append(imageUnit);
                //     $(document).on('change', `#filePhoto-${index}`, function(e) {
                //         let currentImage = $(this).closest('[data-preview="image"]');
                //         let currentRow = $(this).closest('[data-upload="uploader"]');
                //         var reader = new FileReader();
                //         reader.onload = function(event) {
                //             currentImage.find('img').attr('src', event.target.result);
                //         }
                //         reader.readAsDataURL(e.target.files[0]);
                //         currentRow.find('[data-label="image"]').text('Change').addClass('opacity-0');
                //         currentRow.find('[data-remove="image"]').fadeIn();
                //     });
                // }


                // if ($('[data-remove="image"]').length > 0) {
                //     $(document).on('click', '[data-remove="image"]', function() {
                //         let currentRow = $(this).closest('[data-upload="uploader"]');
                //         $(this).fadeOut();
                //         currentRow.find('[data-image="image"]').attr('src', '');
                //         currentRow.find('[data-label="image"]').text('Add Image').removeClass('opacity-0');
                //     });
                // }

            } else {
                $('#enterCopyProduct').attr("href", "javascript:;");
                $("#newProduct").addClass('opacity-20 pointer-events-none');
                $("#copyProduct").addClass('opacity-20 pointer-events-none');
            }




        }, 0);
    }


});