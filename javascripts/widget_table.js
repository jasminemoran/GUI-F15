/*
    Jasmine Moran, jasmine_moran@student.uml.edu
    University of Massachusetts Lowell Computer Science Undergraduate
    91.461 GUI Programming I
    Created on November 19, 2015 @ 5:32pm

    This is the JQuery / JavaScript page for Assignment 8
*/

$(document).ready(function(){

    //JQuery UI - Tabs
    //References:
    //http://stackoverflow.com/questions/14702631/in-jquery-ui-1-9-how-do-you-create-new-tabs-dynamically
    //https://jqueryui.com/tabs/#manipulation
    
    var tabs = $("#results").tabs();

    $("#addTab").click(function() {

        //Counts the number of tabs 
        var num_tabs = $("#results ul li").length + 1;
        
        //Global access to making tables
        //We call the function genTable to generate a new table for every new tab
        newTable = genTable();
            
        //Appends into result and we add more tabs
        $("#results ul").append(
            "<li><a href=\"#tab" + num_tabs + "\">Tab " + num_tabs + "</a><span class=\"ui-icon ui-icon-close\" role=\"presentation\"></li>"
        );
        $("#results").append(
            "<div id=\"tab" + num_tabs + "\"><table id=\"table" + num_tabs + "\">" + newTable + "</table></div>"
        );
        $("#results").tabs("refresh");
    });      
    
    //On each tab there is a button that will close that tab
    //NOTE: Cannot update properly for new tabs
    tabs.delegate( "span.ui-icon-close", "click", function() {
      var num_tabs = $( this ).closest( "li" ).remove().attr( "aria-controls" );
      $( "#tab" + num_tabs ).remove();
      tabs.tabs("refresh");
    });
    
    $("#removeTab").click(function() {
        $("#tabs").empty();
        $("#tabs").html("<div id =\"results\"><ul></ul></div>");
    });

    //JQuery UI - Sliders
    //Reference: https://jqueryui.com/slider  
    //NOTE: Tried to do multiple sliders in one function? Will try to attempt again later.
    (function ($){
        
        //Minimum Row
        $("#rowMin").slider({
            range: "min",
            orientation: "horizontal",
            animate: true,
            value: 1,
            min: 1,
            max: 10,
            slide: function(event, ui){
                $("#rowMinValue").val(ui.value);
            }
        });
        
        $("rowMinValue").change(function(){
                $("#rowMin").slider("value", this.value);
        });
        
        //MaximumRow
        $("#rowMax").slider({
            range: "min",
            orientation: "horizontal",
            animate: true,
            value: 3,
            min: 1,
            max: 10,
            slide: function(event, ui){
                $("#rowMaxValue").val(ui.value);
            }
        });
        
        
        //Minimum Column
        $("#colMin").slider({
            range: "min",
            orientation: "horizontal",
            animate: true,
            value: 1,
            min: 1,
            max: 10,
            slide: function(event, ui){
                $("#colMinValue").val(ui.value);
            }
        });
        
        //Maximum Column
        $("#colMax").slider({
            range: "min",
            orientation: "horizontal",
            animate: true,
            value: 3,
            min: 1,
            max: 10,
            slide: function(event, ui){
                $("#colMaxValue").val(ui.value);
            }
        });
        
        $("#rowMinValue").val( $("#rowMin").slider("value") );
        $("#rowMaxValue").val( $("#rowMax").slider("value") ); 
        $("#colMinValue").val( $("#colMin").slider("value") ); 
        $("#colMaxValue").val( $("#colMax").slider("value") ); 
    })(jQuery);

});


//Making the table
function genTable(){
    //tableBuf will add the html into the table above ('dynamicTable')
    var tableBuf = "";

    //Grabbing entry info from the form
    var rowMin = document.getElementById("rowMinValue").value;
    var rowMax = document.getElementById("rowMaxValue").value;
    var colMin = document.getElementById("colMinValue").value;
    var colMax = document.getElementById("colMaxValue").value;

    //Shifting row/column entries for proper table
    rowMin--; rowMax++; colMax++;

    //If at any point the user enters zero or a negative number
    //Print out error for user to know
    if(rowMin < 0 || rowMax < 0 || colMin < 0 || colMax < 0){
        tableBuf = "<h2>An entry was either not made or is less than zero.<br>Please make all entries positive.</h2>";
    }else if(rowMin > rowMax || colMin > colMax){
        //If any minimum entry is larger than that of maximum, we let user know that's invalid
        tableBuf = "<h2>An entry for the minimum value was greater than the maximum value.<br>Please make value for the minimum value less than the maximum</h2>";
    }else{
        //Otherwise, make a multiplication table
        //Create row
        for(var i = rowMin; i < rowMax; i++) {
            tableBuf += "<tr>";
            //Blank spot for the first position of row/column
            if(i === rowMin){   
                tableBuf += "<th class=\"blankbox\"></th>";
            }else{
                tableBuf += "<th>" + i + "</th>";
            }

            //Creating column
            for(var j = colMin; j < colMax; j++) {
                if(i == rowMin) {
                    tableBuf += "<th>" + j + "</th>";
                }else{
                    //Bam. Multiplication.
                    tableBuf += "<td>" + ( i * j ) + "</td>";
                }
            }
            tableBuf += "</tr>";
                    
        }               
    }

    //Printing values for user to see
    tableBuf += "<h4>Entry Values<h4>";
    tableBuf += "Minimum Row: " + (rowMin + 1) + " | ";
    tableBuf += "Minimum Column: " + colMin + "<br>";
    tableBuf += "Maximum Row: " + (rowMax - 1) + " | ";
    tableBuf += "Maximum Column:" + (colMax - 1);

    //This is where the html made fromt this script goes into the table section 'dynamicTable'
    return tableBuf;
}