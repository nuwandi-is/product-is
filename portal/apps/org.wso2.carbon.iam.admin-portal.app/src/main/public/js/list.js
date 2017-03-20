$(document).ready(function() {
    var thisTable = $('#users-sample').DataTable({
        wso2: true,
        data: users,
        columns: [
            { "data": null },
            { "data": "Username" },
            { "data": "Status" },
            { "data": "Groups" },
            { "data": "Roles" },
            { "data": null }
        ],
        "columnDefs": [
            {
                "targets": 0,
                "render": function (data, type, full, meta) {
                    return '<div class="thumbnail icon">'+
                    '<i class="square-element text fw fw-user" style="font-size: 0px;"></i>'+
                    '</div>';
                }
            },
            {
                "targets": 5,
                    "render": function (data, type, full, meta) {
                    return   '<a href="#" class="btn btn-default">'+
                    '<span class="fw-stack">'+
                                            '<i class="fw fw-edit fw-stack-1x"></i>'+
                                        '</span>'+
                    '</a>'+
                    '<a href="#" class="btn btn-default">'+
                    '<span class="fw-stack">'+
                                            '<i class="fw fw-view fw-stack-1x"></i>'+
                                        '</span>'+
                    '</a>'+
                    '<a href="#" data-click-event="remove-form" class="btn btn-default">'+
                    '<span class="fw-stack">'+
                                            '<i class="fw fw-delete fw-stack-1x"></i>'+
                                        '</span>'+
                    '</a>';
                }
            }
        ],
        "fnCreatedRow": function(nRow, aData, iDataIndex) {

            $('td:eq(0)', nRow)
            .attr('data-search', 'user')
            .attr('data-display', 'user')
            .addClass('remove-padding icon-only content-fill');

            var columns = [
                null,
                aData.Username,
                aData.Status,
                aData.Groups,
                aData.Roles,
                null
            ];
            for (i = 1; i < 5; i++) {
                $('td:eq('+i+')', nRow)
                    .attr('data-search', columns[i])
                    .attr('data-display', columns[i])
                    .attr('title', columns[i])
                    .attr('title', 'tooltip')
                    .attr('data-placement', 'bottom')
                    .addClass('fade-edge remove-padding-top');
                }

                $('td:eq(5)', nRow).addClass('text-right content-fill text-left-on-grid-view no-wrap');
            },
            initComplete: function (){
            $('.random-thumbs .thumbnail.icon').random_background_color();
        }
    });

    $('#offset-value').val(offset);
    $('#length-value').val(recordLimit);

    var ROW_SELECTED_CLASS = 'DTTT_selected';

    if (action === "select-list") {
        thisTable.rows().every(function () {
            $(this.node()).attr('data-type','selectable');
        });
        $('#users-sample').addClass("table-selectable");
        var button = $("button[data-click-event='toggle-select']");
        $(button).closest('li').siblings('.select-all-btn').show();
        $(button).addClass("active").html('Cancel');
        $('.filter-row-custom').hide();
    }

    if (action === "select-all") {
        var button = $("button[data-click-event='toggle-select']");
        thisTable.rows().every(function () {
            $(this.node()).attr('data-type','selectable');
            $(this.node()).addClass(ROW_SELECTED_CLASS);
        });
        $('#users-sample').addClass("table-selectable");
        $(button).html('Cancel');
        $(button).closest('li').siblings('.deselect-all-btn').show();
        $('.filter-row-custom').hide();
        $('.bulk-element').show();
    }

    if(selectedClaim) {
        var i;
        $($("#claimSelector").children()).each(
                function(){
                      if($(this).attr('value') == selectedClaim)
                            i = $(this).index();
                }
          )
        $('#claimSelector')[0].selectedIndex = i;
        $('#claim-uri').val(selectedClaim)
    }

    if(selectedDomain) {
        var j;
        $($("#domainSelector").children()).each(
                function(){
                      if($(this).attr('value') == selectedDomain)
                            j = $(this).index();
                }
          )
        $('#domainSelector')[0].selectedIndex = i;
        $('#domain-name').val(selectedDomain);
    }

} );

getClaimUri = function() {
    var claimUri = $('#claimSelector').val();
    $('#claim-uri').val(claimUri);
    var selectedIndex = $("#claimSelector")[0].selectedIndex;
    if (selectedIndex == 0) {
        $('#claim-filter').val("");
    }
}

getDomain = function() {
    var domain = $('#domainSelector').val();
    $('#domain-name').val(domain);
}