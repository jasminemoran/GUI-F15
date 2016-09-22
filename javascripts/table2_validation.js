/*
    Jasmine Moran, jasmine_moran@student.uml.edu
    University of Massachusetts Lowell Computer Science Undergraduate
    91.461 GUI Programming I
    Created on November 3, 2015 @ 7:59pm

    This is the JQuery / JavaScript page for Assignment 7
*/

$(document).ready( function() {
    //Validation and using JQuery to create table referenced from Gregory Caldwell
    //https://github.com/DevilishGreg/Assignment_8/blob/gh-pages/javascripts/main.js


        //Validating entries
        //When something is wrong, we put that error message into the div where the table is
        $("#submit").click(function(){
        alert( "Submitted!" );
        $("#submission").submit(function(){
        $('#submission').validate( {
            rules: {
                rowMin: {
                    required: true,
                    number: true
                },
                rowMax: {
                    required: true,
                    number: true
                },
                colMin: {
                    required: true,
                    number: true
                },
                colMax: {
                    required: true,
                    number: true
                }
            },
            messages: {
                rowMin: {
                   required: "Empty",
                        number: "Number"
                },
                rowMax: {
                    required: "Empty",
                    number: "Number"
                },
                colMin: {
                    required: "Empty",
                    number: "Number"
                },
                colMax: {
                    required: "Empty",
                    number: "Number"
                }
            },
            errorPlacement : function( error, element ) {
            $(error).appendTo( $("#error") ) ;
            },
            success : function( error, element ) {
            $(element).css( { "border" : "" } ) ; 
          }
        });
        
            //From here, we create a buffer called 'tableBuf' to make html for a table.
            var tableBuf = "";
            //We create an actual table for us to put content from tableBuf into.
            var tableResults = document.createElement("table");

            //Grabbing entry info from the form
            var rowMin = document.getElementById("rowMinValue").value;
            var rowMax = document.getElementById("rowMaxValue").value;
            var colMin = document.getElementById("colMinValue").value;
            var colMax = document.getElementById("colMaxValue").value;

            //Shifting row/column entries for proper table
            rowMin--; rowMax++; colMax++;

            //Received help on table section below from Zachary Wong
            //Referenced table generating code from following link
            //http://stackoverflow.com/questions/28777440/how-to-make-a-simple-5-line-javascript-multiplication-table-for-loop
            //NOTE: The code works, but it is not super pretty. Gotta fix this.
            //Expect to build better code for this section later on

            //Make multiplication table
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

            //This is where the html made fromt this script goes into the table section 'dynamicTable'
            tableBuf.appendChild(tableResults);
            tableBuf.Attribute("id", "dynamicTable");
        });
    });
});