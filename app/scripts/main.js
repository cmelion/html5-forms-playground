/*
 * Lightweight Event Management for Shindig
 * Copyright 2014 Charles Fulnecky for Shindig. All rights reserved.
 * TODO: Insert licencing here
 */

(function() {
    "use strict";
    console.log('Welcome to edX WebRTC!');

    //Set up local vars
    var postTarget, el, isFirstTime;

    //Set up event handler for iframe target onload
    postTarget = document.getElementById("postTarget");
    if (!!postTarget){
        postTarget.onload = function () {
            if (isFirstTime) {
                isFirstTime = false;
            } else {
                //Set the Events tab as the active tab
                var eventsRadioButton = document.getElementById('s3');
                if (eventsRadioButton){
                    eventsRadioButton.checked = true;
                }
            }
        };
    }

    //Populate Event creation fields with provided default values
    for (var element in shindig_defaults) {
        if (shindig_defaults.hasOwnProperty(element)) {
            // Set default values for specific elements if they exist
            el = document.getElementById(element);
            if (el){
                el.value = shindig_defaults[element];
            }
        }
    }
})();
