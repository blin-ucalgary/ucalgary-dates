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
      "jsonURL" : "dates.json",
      "tags"    : [],
    }
  };

  $.dates.data = []


  $.fn.dates = function(config){
      $.dates.config = $.extend({}, $.dates.defaults, config);
      $.dates.yesterday = new Date();
      $.dates.yesterday.setDate($.dates.yesterday.getDate() - 1)
      $.dates.config.tags = cleanTags($.dates.config.tags);

      getDatesFromFeed();
      return this.each(function(){
        init(this);
      });
   }

  // ===========================================================================
  // Private Functions
  // ===========================================================================

  var padDate = function(date) {
    return (date < 10) ?  "0" + date : date;
  };

  var cleanTags = function(arr) {
    for (var i = 0; i < arr.length; i++) {
      arr[i] = arr[i].toLowerCase();
    }

    return arr;
  }

  var containsTags = function(tags) {
    var found = false;
    tags = cleanTags(tags);

    // If empty, than assume they want everything
    if (!$.dates.config.tags.length) {
      return true;
    } else {
      for (var i = 0; i < $.dates.config.tags.length; i++) {
        for (var j = 0; j < tags.length; j++) {
          if ($.dates.config.tags[i] == tags[j]) {
            found = true;
            break;
          }
        }
      }
    }

    return found;
  };

  var getDatesFromFeed = function() {
    $.getJSON($.dates.config.jsonURL, function(data) {
      $(data["importantDates"]).each(function(){
        var tempDate = new Date(this["endDate"]);
        if (tempDate > $.dates.yesterday) {
          if (containsTags(this["tags"])) {
            $.dates.data[$.dates.data.length] = this;
          }
        }
      });
    });
  };

  var init = function(el) {
    console.log($.dates.data);
  };


})(jQuery);
