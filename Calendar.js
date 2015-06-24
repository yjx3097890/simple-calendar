

var MONTHNAMES = ["Jan","Feb","March","April","May","June","July","Aug","Sept","Oct","Nov", "Dec"];
var DAYNAMES = ["Sunday","Monday","Tuesday","Wednesday","Thrusday","Friday", "Saturday"];
var Calendar = function (options){

	if (!options.divId) {
		throw new Error('divId must be provided.');
	}
    this.container = document.getElementById(options.divId);
    this.setCurrentDate(options.date || new Date());
    this.bindEvent();
}

Calendar.prototype = {
  constructor: Calendar,
  init: function () {
    this.nextMonth = this.month + 1;
    this.prevMonth = this.month - 1;
    this.totalDays = [31, this.isLeapYear()? 29: 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    this.dateAmount = this.totalDays[this.month];
  //  this.preAmount = totalDays[prevMonth] - tempweekday + 1;
  return this;
  },
  render: function () {
      var i = 1;
      var line = 0;
      var firstDate = new Date(this.nextMonth +' 1 ,'+ this.year);    //该月1号
      var firstWeekDay = firstDate.getDay();   //星期从0--星期日开始
        var calendarTable = "<table class='calendar' > <tr class='currentmonth'><th colspan='7'>" + MONTHNAMES[this.month]+" "+ this.year +"</th></tr>";
        calendarTable +="<tr class='weekdays'>  <td>S</td>  <td>M</td> <td>T</td> <td>W</td> <td>T</td> <td>F</td> <td>S</td> </tr>";
        calendarTable += "<tr>";

      //上月日期站位
      while ( firstWeekDay > 0 ) {
        calendarTable += "<td class='onedate premonth'></td>";
        //preAmount++;
         firstWeekDay--;
      }

      var firstWeekDay = firstDate.getDay();

      while (i <= this.dateAmount || line < 6){
        if (firstWeekDay > 6){
            firstWeekDay = 0;
            line++;
            if (line === 6) {
              break;
            }
            calendarTable += "</tr><tr>";
        }
        if (i === this.date){
            calendarTable +="<td class='onedate currentmonth currentday' data-date='"+ this.year + "-" + this.nextMonth +"-"+ i+"'>"+i+"</td>";
        }
        else if ( i > this.dateAmount ) {
            calendarTable += "<td class='onedate nextmonth'></td>";
        } else {
            calendarTable +="<td class='onedate currentmonth' data-date='"+ this.year + "-" + this.nextMonth +"-"+ i +"'>"+ i + "</td>";
        }

        firstWeekDay++;
        i++;
      }

      while (line < 6) {
        if (firstWeekDay > 6) {
            firstWeekDay = 0;
            line++;
            calendarTable += "</tr><tr>";
        }
        calendarTable += "<td class='nextmonth'></td>";

      }

      calendarTable += "</tr></table>";
      this.container.innerHTML=calendarTable;

      return this;
  },
  update: function(date) {
    this.setCurrentDate(date);
    this.init();
    this.render();
    return this;
  },
  isLeapYear: function () {
    if ( ( this.year % 100 !== 0) && ( this.year % 4 === 0) || ( this.year % 400 === 0 ) ) {
        return true;
    }else{
        return false;
    }
  },
  bindEvent: function () {
    this.container.addEventListener('selectstart' , function (event) {
      event.preventDefault();
      return false;
    });
    $(this.container).on('click', '.onedate', $.proxy(this.clickDate, this));

  },
  setDate: function (date) {
    this.date = date;
    return this;
  },
  /**
  * month: 自然月
  */
  setMonth: function (month) {
    this.month = month-1;
    return this;
  },
  setYear: function (year) {
    this.year = year;
    return this;
  },
  getDate: function () {
    return this.date;
  },
  setMonth: function () {

  },
  setYear: function () {
    return this.year;
  },
  setCurrentDate: function (date) {
    this.currentDate = date;
    this.date = date.getDate();
    this.month = date.getMonth(); //月份从0开始
    this.year = date.getFullYear();
    return this;
  },
  getCurrentDate: function () {
    return this.currentDate;
  },
  clickDate: function (event) {
    var target = $(event.target);
    $(event.delegateTarget).find('td').removeClass('selected');
    target.addClass('selected');
    console.log(target.data('date'))
  }
}
