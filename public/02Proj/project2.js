// Project 2 Javascript file!
/* global $ */

/* Here are 100 words about one of my peers: One of my peers is Mariano Pimentel.
He is a pretty cool dude. He has a brother named Lorenzo and they are identical twins.
Mariano got a job working at a fancy restaurant, so he doesn't have to work at Jamba Juice any more.
He likes to be referred to as Mars or Marz depending on how edgy he is feeling on any particular day.
blah blah blah words words words I'm filling up the 100 word count requirement but I'm starting to
maybe think there was a typo in the assignment requirements because this part of the assignment 
doesn't really make a whole lot of sense. I shall type on however stragne this little out of the blue 
prompt is. I think I am going to hope that the word count is reached by this point and call it a day.
-Justin Hines*/

$(document).ready(function() {
        //Global variables
        
        var score = 100;
        
        $("#currentScore").html("You have " + score + " points!");
        
        //event listeners
        
        $("button").on("click", rollSlots);
        
        //functions
        function isFormValid() {
            let isValid = true;
            console.log("is form valid func");
            if ($("#q1").val() == "") {
                isValid = false;
                $("#validationFdbk").html("A number must be entered!");
            }
            return isValid;
        }
        
        function rollSlots() {
            $("#validationFdbk").html(""); // resets validation feedback

            if (!isFormValid()) {
                return;
            }
            console.log("Rolling slots.");
            
            let risky = parseInt($("#q1").val());
            
            if(risky > score){
                $("#eventSum").html("Sorry! You don't have enough points to bet that much!");
                return;
            }
            
            
            var min = 1;
            var max = 7;
            var random1 = Math.floor(Math.random() * (+max - +min)) + +min;
            var random2 = Math.floor(Math.random() * (+max - +min)) + +min;
            var random3 = Math.floor(Math.random() * (+max - +min)) + +min;
            
            //$("#greeting").html("Your random numbers are: " + random1 + " " + random2 + " " + random3);
            //$("h1, h2, p").removeClass("blue");
            
            $("#box1, #box2, #box3").removeClass("white red orange yellow green blue purple");
            switch(random1){
                case 1:
                    $("#box1").addClass("red");
                    break;
                case 2:
                    $("#box1").addClass("orange");
                    break;
                case 3:
                    $("#box1").addClass("yellow");
                    break;
                case 4:
                    $("#box1").addClass("green");
                    break;
                case 5:
                    $("#box1").addClass("blue");
                    break;
                case 6:
                    $("#box1").addClass("purple");
                    break;
                default:
                    $("#box1").addClass("white");
                    break;
            } 
            switch(random2){
                case 1:
                    $("#box2").addClass("red");
                    break;
                case 2:
                    $("#box2").addClass("orange");
                    break;
                case 3:
                    $("#box2").addClass("yellow");
                    break;
                case 4:
                    $("#box2").addClass("green");
                    break;
                case 5:
                    $("#box2").addClass("blue");
                    break;
                case 6:
                    $("#box2").addClass("purple");
                    break;
                default:
                    $("#box2").addClass("white");
                    break;
            }
            switch(random3){
                case 1:
                    $("#box3").addClass("red");
                    break;
                case 2:
                    $("#box3").addClass("orange");
                    break;
                case 3:
                    $("#box3").addClass("yellow");
                    break;
                case 4:
                    $("#box3").addClass("green");
                    break;
                case 5:
                    $("#box3").addClass("blue");
                    break;
                case 6:
                    $("#box3").addClass("purple");
                    break;
                default:
                    $("#box3").addClass("white");
                    break;
            }
            
            if(random1 == random2 && random2 == random3){
                score = score + (risky * 10);
                $("#currentScore").html("You have " + score + " points!");
                $("#eventSum").html("Congratulations! You got 3 of a kind and won " + (risky * 10) + " points!");
            }
            else if((random1 == random2) || (random2 == random3)){
                score = score + risky;
                $("#currentScore").html("You have " + score + " points!");
                $("#eventSum").html("Nice! You got 2 of a kind and won " + risky + " points!");
            }
            else {
                score = score - risky;
                $("#currentScore").html("You have " + score + " points!");
                $("#eventSum").html("Sorry! You got no matches and lost " + risky + " points!");
            }
            
            
        }
            
    });