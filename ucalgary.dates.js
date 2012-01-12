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
      "jsonURL"  : "dates.json",
      "tags"     : [],
      "datesCap" : 4,
      "ulClass"  : "dates",
      "liClass"  : "dateBlock",
      "spanClass": "date"
    },
    data : [],
    days : [
      "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
    ],
    months : [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
    ],
  };
  

  $.fn.dates = function(config){
      $.dates.config = $.extend({}, $.dates.defaults, config);
      init(this);
      parseDates();
      return this.each(function(){
        console.log($.dates);
      });
  }

  // ===========================================================================
  // Private Functions
  // ===========================================================================

  var cleanTags = function(arr) {
    for (var i = 0; i < arr.length; i++) {
      arr[i] = arr[i].toLowerCase();
    }

    return arr;
  }

  var containsTags = function(tags) {
    var found = false;
    tags = cleanTags(tags);

    // If empty, assume they want everything
    if (!$.dates.config.tags.length) {
      return true;
    }

    for (var i = 0; i < $.dates.config.tags.length; i++) {
      for (var j = 0; j < tags.length; j++) {
        if ($.dates.config.tags[i] == tags[j]) {
          found = true;
          break;
        }
      }
    }

    return found;
  };

  var formatDate = function (rawDate) {
    return  ($.dates.days[rawDate.getDay()] + ", " + $.dates.months[rawDate.getMonth()] + " " + rawDate.getDate());
  }

  var init = function(el) {
    $.dates.yesterday = new Date();
    $.dates.yesterday.setDate($.dates.yesterday.getDate() - 1)
    $.dates.config.tags = cleanTags($.dates.config.tags);
  };

  // parse feed, validate dates, return html string of 
  var parseDates = function() {
    $.getJSON($.dates.config.jsonURL, function(data) {
      var ul = $("<ul>").addClass($.dates.config.ulClass);
      
      $(data["importantDates"]).each(function(){
        var startDate = new Date(this["startDate"]);
        var endDate = new Date(this["endDate"]);

        if (endDate > $.dates.yesterday) {
          if (containsTags(this["tags"])) {
            if ($.dates.data.length < $.dates.config.datesCap) {
              $.dates.data.push(this);
              var li = $("<li>").addClass($.dates.config.liClass).text(this["description"]);
              var span = $("<span>").addClass($.dates.config.spanClass);
              span.text( (startDate.getTime() == endDate.getTime()) ? formatDate(startDate) : formatDate(startDate) + " - " + formatDate(endDate));
              ul.append(li.prepend(span));
            } 
          }
        }
      });
      $("#important-dates").append(ul);
    });
  };

})(jQuery);
