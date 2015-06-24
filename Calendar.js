

var MONTHNAMES = ["Jan","Feb","March","April","May","June","July","Aug","Sept","Oct","Nov", "Dec"];
var DAYNAMES = ["Sunday","Monday","Tuesday","Wednesday","Thrusday","Friday", "Saturday"];
var Calendar = function (options){

	if (!options.divId) {
		throw new Error('divId must be provided.');
	}
	if (options.date && isNaN(options.date.getTime())) {
      throw new TypeError('Invalid Date!');
  }
    this.container = document.getElementById(options.divId);
    this.setCurrentDate(options.date || new Date());
    this.bindEvent();
}

Calendar.prototype = {
  constructor: Calendar,
  init: function () {
    this.nextMonth = this.month + 1;
 		this.prevMonth = (this.month - 1 < 0)? (this.month - 1 + 12) : (this.month - 1);
    this.totalDays = [31, this.isLeapYear()? 29: 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    this.dateAmount = this.totalDays[this.month];
  	return this;
  },
  render: function () {
						var i = 1;
            var line = 0;
            var firstDate = new Date((this.month+1) +' 1 ,'+ this.year);    //该月1号
            var firstWeekDay = firstDate.getDay();   //星期从0--星期日开始
            var preAmount = this.totalDays[this.prevMonth] - firstWeekDay + 1;
            var calendarTable = "<table class='calendar' > <tr class='currentmonth'><th colspan='7'>" + this.year + "年" + MONTHNAMES[this.month]+"月"+"</th></tr>";
            calendarTable +="<tr class='weekdays'>  <td>日</td>  <td>一</td> <td>二</td> <td>三</td> <td>四</td> <td>五</td> <td>六</td> </tr>";
            calendarTable += "<tr>";

            //上月日期站位
            while ( firstWeekDay > 0 ) {
                if (this.month - 1 < 0) {
                    calendarTable += "<td class='onedate premonth' data-date='"+ (this.year-1) +"-"+ (this.prevMonth+1) +"-"+preAmount+"'>"+preAmount+"</td>";
                } else {
                    calendarTable += "<td class='onedate premonth' data-date='"+ this.year +"-"+ (this.prevMonth+1) +"-"+preAmount+"'>"+preAmount+"</td>";
                }
                preAmount++;
                firstWeekDay--;
            }

            firstWeekDay = firstDate.getDay();

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
                    calendarTable +="<td class='onedate currentmonth currentday' data-date='"+ this.year + "-" + (this.month+1) +"-"+ i+"'>"+i+"</td>";
                }
                else if ( i > this.dateAmount ) {
                    if (this.nextMonth > 11) {
                        //前进到下一年
                        calendarTable += "<td class='onedate nextmonth' data-date='"+ (this.year+1) + "-" + (this.nextMonth+ 1 - 12) +"-"+ (i-this.dateAmount) +"'>"+ (i-this.dateAmount) + " </td>";
                    } else {
                        calendarTable += "<td class='onedate nextmonth' data-date='"+ this.year + "-" + (this.nextMonth+1) +"-"+ (i-this.dateAmount) +"'>"+ (i-this.dateAmount) + " </td>";
                    }
                } else {
                    calendarTable +="<td class='onedate currentmonth' data-date='"+ this.year + "-" + (this.month+1) +"-"+ i +"'>"+ i + "</td>";
                }

                firstWeekDay++;
                i++;
            }


            calendarTable += "</tr></table>";
            $(this.container).html(calendarTable);

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
		if (date && isNaN(date.getTime())) {
				throw new TypeError('Invalid Date!');
		}
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
