/* 
    Jasmine Moran, jasmine_moran@student.uml.edu
    University of Massachusetts Lowell Computer Science Undergraduate
    91.461 GUI Programming I
    Created on October 20, 2015 @ 2:35pm

    This is the style sheet for Assignment 6
*/

/* The following code has a mixture of referenced work and
 * collabroative help from the following:
 *      - Zachary Wong
 *      - Yuet Long Leung
 */

var score = 0;
var pieces = [
  ["A",1,9], ["B",3,2], ["C",3,2], ["D",2,4], ["E",1,12], ["F",4,2],
  ["G",2,3], ["H",4,2], ["I",1,9], ["J",8,1], ["K",5,1],  ["L",1,4],
  ["M",3,2], ["N",1,5], ["O",1,8], ["P",3,2], ["Q",10,1], ["R",1,6],
  ["S",1,4], ["T",1,6], ["U",1,4], ["V",4,2], ["W",4,2],  ["X",8,1],
  ["Y",4,2], ["Z",10,1], ["blank",0,2]
];  

$( init );
    function init()
    {        
        // Some code below are referenced from from Alexandra Never's javascript:
        //http://weblab.cs.uml.edu/~anevers/part9/rules.js
        
        //Game pieces are draggable
        $('.gametile').draggable({
            containment: "#content",
            hoverClass: 'hovered',
            revert: 'invalid'
        });
        
        //Droppable spaces for pieces to be placed
        $('.droppable').droppable({
            accept: '.gametile',
            drop: tileplacement,
            tolerance: 'touch'
        });
        
        //Droppable spaces for pieces on the tileboard
        $('.slot').droppable({
            accept: '.gametile',
            drop: tileplacement,
            tolerance: 'touch'
        });
        
    }   

// Referenced code:
//http://www.w3schools.com/jsref/jsref_random.asp
function draw()
{
    var rand = 0;
    for(i = 1; i < 8; i++)
    {
        rand = Math.floor((Math.random() * 26) + 0);
        document.getElementById("tile" + i).innerHTML = "<p>" + pieces[rand][0] + "</p>";
    }

}
    
//Referenced code for snapping tiles onto dropspace:
//http://jsfiddle.net/franco13/vLSZf/1/
function tileplacement(event, ui){
    if(true){
        ui.draggable.addClass('correct');
        ui.draggable.draggable('enable');
        $(this).droppable('enable');
        ui.draggable.position({
            of: $(this),
            my: 'center',
            at: 'center'
    });
    ui.draggable.draggable('option', 'revert', 'invalid');
    return !event;
    }
}
 
