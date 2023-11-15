// Change the selector if needed
var $table = $('table'),
        $tableBody = $('table tbody'),
        $bodyCells = $table.find('tbody tr:first').children(),
        colWidth;

function changeTableHead ( JQuery ) {
    colWidth = $bodyCells.map(function() {
        return $(this).width();
    }).get();
    
    // Set the width of thead columns
    $table.find('thead tr').children().each(function(i, v) {
        $(v).width(colWidth[i]);
    });
}

function tryUpdate () {
    colWidth = $bodyCells.map(function() {
        return $(this).width();
    }).get();

    if(colWidth[0] == 0 || colWidth[0] == undefined){
        setTimeout(tryUpdate, 500);
    } else {
        changeTableHead();
    }

}

function afterLoad () {
    $table = $('table');
    $tableBody = $('table tbody');
    $bodyCells = $table.find('tbody tr:first').children();
    colWidth;
    tryUpdate();
}
$( window ).on('load change', afterLoad).resize(changeTableHead);
