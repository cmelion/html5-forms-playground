/*
 * Lightweight Event Management for Shindig
 * Instructor component
 * Copyright 2014 Charles Fulnecky. All rights reserved.
 * TODO: Insert licencing here
 */
var shindig = (function(){
    //TODO:  DRY this code out vis-à-vis student.js
    var i,
        host,
        form = document.getElementById("shindig-signup"),
        recurring = form.querySelector('#RecurringEvent'),
        dates = form.querySelectorAll('[type=date]');

    if (!!form) {
        //Quick hack to get host
        var a = document.createElement('a');
        a.href = form.action;
        host = a.host;
    }

    //Extend date object to facilitate date range calculation
    Date.prototype.addMonths = function (n) {
        var day = this.getDate();
        this.setMonth(this.getMonth() + n);
        if (this.getDate() < day) {
            this.setDate(1);
            this.setDate(this.getDate() - 1);

        }
        return this;
    };


    function checkEnter(e){
        var evt = (evt) ? evt : ((event) ? event : null);
        var node = (evt.target) ? evt.target : ((evt.srcElement) ? evt.srcElement : null);
        if ((evt.keyCode == 13) && (node.type!="submit"))  {return false;}
    }

    function dateRangeExceeded (e) {
        var today = new Date(),
            dateToTest = new Date( e.target.value );

        // Test for dates more than 6 months out
        if( dateToTest > today.addMonths(6) ){
            e.target.setCustomValidity('Please pick a date less than 6 months from now (' +
                                         new Date().toString() + ').');
        } else {
            e.target.setCustomValidity('');
        }
    }

    function validateForm(event) {
        // fetch cross-browser event object and form node
        event = (event ? event : window.event);

        var form = (event.target ? event.target : event.srcElement),
            formvalid = true; //false for testing

        //Test checkboxes for valid state
        if (recurring.checked) {
            var checkboxes = form.querySelector('[name="days_of_the_week"]:checked');
            if (!checkboxes) {
                formvalid = false;
                var errormsg = form.querySelector('.days-of-week-error');
                errormsg.classList.remove('hidden');
            }
        }

        // cancel form submit if validation fails
        if (!formvalid) {
            if (event.preventDefault) event.preventDefault();
            //show error message

        }
        return formvalid;
    }

    // Add additional validation rules
    i = dates.length; //or 10
    while(i--)
    {
        dates[i].addEventListener('input', dateRangeExceeded);
    }

    //Default start date to current date
    document.getElementById('startdate').value = new Date().toISOString().slice(0,10);

    // onsubmit used for easier cross-browser compatibility
    form.onsubmit = validateForm;
    form.onkeypress = checkEnter;

    return {
        host: host
    };

}());