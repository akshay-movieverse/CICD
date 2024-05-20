$(document).ready(function() {
    $(document).on('click', '#addReportBtn', function(e) {
        let report = `<div class="grid lg:grid-cols-2 gap-y-3 gap-x-24 mb-6">
                    <div class="flex gap-x-4">
                        <input type="text" class="focus:outline-none border border-neutral-400  text-slate-500 rounded text-md px-2 py-1 flex-1" />
                        <button class="border border-teal-600 text-teal-600 px-2.5 text-center text-md md:w-20 rounded transition duration-200 hover:bg-teal-600 hover:text-white">Upload</button>
                    </div>
                    <div class="flex items-center gap-x-8 md:gap-x-24">
                        <a href="javascript:;" class="text-blue-500 text-md">Link @ 26-11-2022 -- 3:45 pm</a>
                        <button type="button" class="active:scale-95">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M3.99519 1.6V0H11.9856V1.6H15.9807V3.2H14.3827V15.2C14.3827 15.4122 14.2985 15.6157 14.1486 15.7657C13.9988 15.9157 13.7955 16 13.5836 16H2.39711C2.18519 16 1.98196 15.9157 1.83211 15.7657C1.68226 15.6157 1.59807 15.4122 1.59807 15.2V3.2H0V1.6H3.99519ZM3.19615 3.2V14.4H12.7846V3.2H3.19615ZM5.59326 5.6H7.19133V12H5.59326V5.6ZM8.78941 5.6H10.3875V12H8.78941V5.6Z" fill="#F87171"/>
                            </svg>    
                        </button>
                    </div>
                </div>`;
        $('#sampleReports').append(report);
    });
});