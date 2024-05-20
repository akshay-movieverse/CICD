$(document).ready(function() {
    $('#search').autocomplete({
        source: function(request, response) {
            $.ajax({
                url: '/search-suggestions/',
                method: 'GET',
                data: { term: request.term },
                dataType: 'json',
                success: function(data) {
                    // Empty the existing <ul>
                    $('#result').empty();
                    // Append new <li> elements
                    $.each(data, function(index, item) {
                        $('#result').append('<li><a href="' + item.url + '" onclick="showLoader()" class="py-2 px-3 leading-2 text-tiny block duration-200 hover:bg-amber-300 truncate">' + item.label + '</a></li>');
                    });
                }
            });
        },
        minLength: 3, // Minimum characters before triggering autocomplete
        select: function(event, ui) {
            // Handle selection (e.g., redirect to selected item's URL)
            window.location.href = ui.item.url;
        },
        open: function(event, ui) {
            // Show the dropdown menu if there are suggestions
            $('#result').css('display', 'block');
        }
    });
});



$(document).ready(function() {
    
    $('#searchm').autocomplete({
        source: function(request, response) {
            $.ajax({
                url: '/search-suggestions/',
                method: 'GET',
                data: { term: request.term },
                dataType: 'json',
                success: function(data) {
                    // Empty the existing <ul>
                    $('#resultm').empty();
                    // Append new <li> elements
                    $.each(data, function(index, item) {
                        $('#resultm').append('<li><a href="' + item.url + '" onclick="showLoader()" class="py-2 px-3 leading-2 text-tiny block duration-200 hover:bg-amber-300 truncate">' + item.label + '</a></li>');
                    });
                }
            });
        },
        minLength: 3, // Minimum characters before triggering autocomplete
        select: function(event, ui) {
            // Handle selection (e.g., redirect to selected item's URL)
            window.location.href = ui.item.url;
        },
        open: function(event, ui) {
            // Show the dropdown menu if there are suggestions
            $('#resultm').css('display', 'block');
        }
    });
});

// $(document).on('keyup input','.mobile-company-search',delay(function (e) {
//     var app_url= document.head.querySelector('meta[name="app-url"]').content;
//     var site_url = $('meta[name="site-url"]').attr('content');
//     var country = $('meta[name="country"]').attr('content');
   
//     var th = $(this);
//     var search = th.val();
//     $("#searchButton").addClass("hidden");
//     if(th.val().length == 0){
//         $("#searchButton").removeClass("hidden");
//         $("#mobile-result").html('');
//         $("#mobile-result, #search-error").addClass("opacity-0 invisible");
//         $("#dropdownBackdrop").addClass("invisible");
//        // return false;
//     }
   
    
//     if(th.val().length > 0 && th.val().length < 3){
//         $("#mobile-result").html('');
//         $("#mobile-result").addClass("opacity-0 invisible");
//         $("#search-error").removeClass("opacity-0 invisible");
//         $("#dropdownBackdrop").addClass("invisible");
        
//         return false;
//     }else{
//         $("#search-error").addClass("opacity-0 invisible");
//         $("#search-error").addClass("opacity-0 invisible");
//         $.ajax({
//             url: site_url+'/search/'+country+'/'+search,
//             type:'GET',
//             success:function(response){
//                 $("#mobile-result").html('');
//                 $("#mobile-result").removeClass("opacity-0 invisible");
//                 $("#dropdownBackdrop").removeClass("invisible");
                
//                 response = response.data;

//                 // if(typeof(response) == "undefined" || response.length == 0) {

//                 //     $("#result table tbody").html('');
//                 //     $("#result").addClass("show");
//                 //     var html =  '<li style="display: flex;padding: 5px;color:red">No Result. Try another keyword.</li>';
//                 //     $("#result table tbody").append(html);
//                 //     return false;
//                 // }

//                 $.each(response,function(key,item){
//                     var url = app_url+'/'+item._source.name_slug;
//                     url = url.replace("pt-", "");
//                     var company_name = "";
//                     if(item._source.country == "indonesia"){
//                         company_name+='PT. ';
//                     }
//                      company_name+=item._source.name.toUpperCase();
                   
//                         var html =  '<li>'+
//                                 '<a href="'+url+'" class="py-2 px-3 leading-2 text-tiny block duration-200 hover:bg-amber-300 truncate">'+
//                                     ''+company_name+''+
//                         '</li>';
                
//                     $("#mobile-result").append(html);

//                 });
//             }
//         })
//     }
// }, 500));


