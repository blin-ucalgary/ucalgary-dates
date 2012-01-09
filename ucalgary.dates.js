// ===========================================================================
//
// dates  - a jQuery plugin for managing important dates at the University of Calgary
// Copyright (c) 2012 Benny Lin
//
// Dual licensed under the MIT and GPL licenses:
// http://www.opensource.org/licenses/mit-license.php
// http://www.gnu.org/licenses/gpl.html
//
// ===========================================================================


(function($){

  $.dates = {
    defaults : {
      // "headerClass"         : "collapse-header",
    }
  };

  $.dates.data = []


  $.fn.dates = function(config){
      $.dates.config = $.extend({}, $.dates.defaults, config);

      getDates();

      return this.each(function(){
        init(this);
      });
   }

  // Private Functions

  function padDate(date) {
    return (date < 10) ?  "0" + date : date;
  }

  var getDates = function() {
    $.getJSON('dates.json', function(data) {
      $(data["importantDates"]).each(function(){
        $.dates.data[$.dates.data.length] = this;
      });
    });
  };

  var init = function(el) {
    console.log($.dates.data);
  };


})(jQuery);
