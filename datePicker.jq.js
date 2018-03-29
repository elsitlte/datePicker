  (function($){
    function DatePicker (el,opts){
      this.opts=$.extend({},DatePicker.Defaults,opts);
      this.el=$(el).eq(0);//console.log(this.opts);
      if(this.el.length===0){
      	console.log("no element relatived to datePicker!");
      	return;
      }
      this.selectedDateStart={
        year:undefined,
        month:undefined,
        date:undefined,
        td_selected_index:undefined
      };
      this.selectedDateEnd={
        year:undefined,
        month:undefined,
        date:undefined,
        td_prev_sel_right_index:undefined
      }; 
      this.init();

    }
    DatePicker.Defaults={
      lang:"cn",//cn 中文版;en 英文版 
      range:true,
      theme:"tripadvisor",//    "tripadvisor" (www.tripadvisor.com)style by default;"booking" (www.booking.com)style is also available
    }
    DatePicker.prototype.init=function(){
      var datePickerTemplate= '<div class="datePicker datePicker-t">'+
                                '<div class="datePicker-header">'+
                                  '<div class="datePicker-title">日期</div>'+
                                '</div>'+     
                                '<div class="datePicker-table-wrapper clearfix">'+
                                  '<span class="datePicker-prev"></span>'+
                                  '<span class="datePicker-next"></span>'+
                                  '<div class="datePicker-date-table table-range">'+
                                    '<div class="datePicker-month">'+ 
                                      '<span class="datePicker-month-show"></span>'+  
                                    '</div>'+                               
                                    '<table>'+
                                      '<thead>'+
                                        '<tr>'+
                                          '<th>日</th>'+
                                          '<th>一</th>'+
                                          '<th>二</th>'+
                                          '<th>三</th>'+
                                          '<th>四</th>'+
                                          '<th>五</th>'+
                                          '<th>六</th>'+
                                        '</tr>'+          
                                      '</thead>'+
                                      '<tbody>'+
                                        '<tr>'+
                                          '<td></td>'+
                                          '<td></td>'+
                                          '<td></td>'+
                                          '<td></td>'+
                                          '<td></td>'+
                                          '<td></td>'+
                                          '<td></td>'+
                                        '</tr>'+
                                        '<tr>'+
                                          '<td></td>'+
                                          '<td></td>'+
                                          '<td></td>'+
                                          '<td></td>'+
                                          '<td></td>'+
                                          '<td></td>'+
                                          '<td></td>'+
                                        '</tr>'+
                                        '<tr>'+
                                          '<td></td>'+
                                          '<td></td>'+
                                          '<td></td>'+
                                          '<td></td>'+
                                          '<td></td>'+
                                          '<td></td>'+
                                          '<td></td>'+              
                                        '</tr>'+
                                        '<tr>'+
                                          '<td></td>'+
                                          '<td></td>'+
                                          '<td></td>'+
                                          '<td></td>'+
                                          '<td></td>'+
                                          '<td></td>'+
                                          '<td></td>'+              
                                        '</tr>'+
                                        '<tr>'+
                                          '<td></td>'+
                                          '<td></td>'+
                                          '<td></td>'+
                                          '<td></td>'+
                                          '<td></td>'+
                                          '<td></td>'+
                                          '<td></td>'+
                                        '</tr>'+
                                        '<tr>'+
                                          '<td></td>'+
                                          '<td></td>'+
                                          '<td></td>'+
                                          '<td></td>'+
                                          '<td></td>'+
                                          '<td></td>'+
                                          '<td></td>'+
                                        '</tr>'+                                                  
                                      '</tbody>'+
                                    '</table>'+       
                                  '</div>'+
                                  '<div class="datePicker-date-table table-range">'+
                                    '<div class="datePicker-month">'+
                                      '<span class="datePicker-month-show"></span>'+
                                    '</div>'+                                   
                                    '<table>'+
                                      '<thead>'+
                                        '<tr>'+
                                          '<th>日</th>'+
                                          '<th>一</th>'+
                                          '<th>二</th>'+
                                          '<th>三</th>'+
                                          '<th>四</th>'+
                                          '<th>五</th>'+
                                          '<th>六</th>'+
                                        '</tr>'+          
                                      '</thead>'+
                                      '<tbody>'+
                                        '<tr>'+
                                          '<td></td>'+
                                          '<td></td>'+
                                          '<td></td>'+
                                          '<td></td>'+
                                          '<td></td>'+
                                          '<td></td>'+
                                          '<td></td>'+
                                        '</tr>'+
                                        '<tr>'+
                                          '<td></td>'+
                                          '<td></td>'+
                                          '<td></td>'+
                                          '<td></td>'+
                                          '<td></td>'+
                                          '<td></td>'+
                                          '<td></td>'+
                                        '</tr>'+
                                        '<tr>'+
                                          '<td></td>'+
                                          '<td></td>'+
                                          '<td></td>'+
                                          '<td></td>'+
                                          '<td></td>'+
                                          '<td></td>'+
                                          '<td></td>'+              
                                        '</tr>'+
                                        '<tr>'+
                                          '<td></td>'+
                                          '<td></td>'+
                                          '<td></td>'+
                                          '<td></td>'+
                                          '<td></td>'+
                                          '<td></td>'+
                                          '<td></td>'+              
                                        '</tr>'+
                                        '<tr>'+
                                          '<td></td>'+
                                          '<td></td>'+
                                          '<td></td>'+
                                          '<td></td>'+
                                          '<td></td>'+
                                          '<td></td>'+
                                          '<td></td>'+
                                        '</tr>'+
                                        '<tr>'+
                                          '<td></td>'+
                                          '<td></td>'+
                                          '<td></td>'+
                                          '<td></td>'+
                                          '<td></td>'+
                                          '<td></td>'+
                                          '<td></td>'+
                                        '</tr>'+                                                  
                                      '</tbody>'+
                                    '</table>'+       
                                  '</div>'+                                 
                                '</div>'+ 
                                '<div class="datePicker-footer">不指定日期搜索'+
                                '</div>'+
                              '</div>';
      $("body").append(datePickerTemplate);
      var thisDatePickerIndex=$(".datePicker").length-1;
      var $thisDatePicker=$(".datePicker").eq(thisDatePickerIndex);
      $thisDatePicker.prop("id","datePicker"+thisDatePickerIndex);
      this.el.attr("datepickerkey","datePicker"+thisDatePickerIndex);

      var _this=this;
      this.el.click(function(e){
      	e.stopPropagation();
      	$(".datePicker").css("display","none");
        $thisDatePicker.css({"display":"block",
        	"left": _this.el.offset().left+"px",
        	"top": _this.el.offset().top+_this.el.outerHeight()+"px"});
      });
      $thisDatePicker.click(function(e){
      	e.stopPropagation();
      });
	    $("body").click(function(e){
	      $(".datePicker").css('display', 'none');
	    })
      var $datePicker_table=$thisDatePicker.find(".datePicker-date-table");
      function applySettings() {
        if(_this.opts.lang==="en") {
          var $th=$thisDatePicker.find("th");
          $($th[0]).text("Sun");
          $($th[1]).text("Mon");
          $($th[2]).text("Tue");
          $($th[3]).text("Wen");
          $($th[4]).text("Thu");
          $($th[5]).text("Fri");
          $($th[6]).text("Sat");
          if($th.length===14){
            $($th[7]).text("Sun");
            $($th[8]).text("Mon");
            $($th[9]).text("Tue");
            $($th[10]).text("Wen");
            $($th[11]).text("Thu");
            $($th[12]).text("Fri");
            $($th[13]).text("Sat");           
          }
        }
        if(_this.opts.range===false) {
         $datePicker_table.eq(1).remove();
         $thisDatePicker.css("min-width","206px")
        }
        if(_this.opts.theme==="booking") {
          $thisDatePicker.removeClass('datePicker-t').addClass('datePicker-b');
        }
      }
      applySettings();

      function isLeapYear(year) {
        if(year%4===0&&year%100!==0||year%400===0)
          return true;
        else
          return false;
      }
      function getFirstDay(currYear,currMonth) {
        return new Date(currYear,currMonth,1).getDay();
      }
      function getNextMonthOfcurrMonth(currYear,currMonth) {
        var next_month,_year;
        if(currMonth===11) {
          next_month=0;
          _year=currYear+1;
        }
        else {
          next_month=currMonth+1;
          _year=currYear;
        }
        return {
          month:next_month,
          year:_year
        };
      }
      function getNextDate(year,month,date,monthLength) {
        if(isLeapYear(year)) {
          monthLength["1"]=29;
        }
        else {
          monthLength["1"]=28;
        }
        var nextDate={};
        if(date===monthLength[month]) {
          nextDate.date=1;
          month!==11?(nextDate.month=month+1,nextDate.year=year):(nextDate.month=0,nextDate.year=year+1);
        }
        else {
          nextDate.month=month;
          nextDate.year=year;
          nextDate.date=date+1;
        }
        //console.log(nextDate);
        return nextDate;
      }
      function getIndexByDate(selectedDate) {
        var firstDay=getFirstDay(selectedDate.year,selectedDate.month)
        return selectedDate.date+firstDay-1;
      }
      var month_en={"0":"Jan","1":"Feb","2":"Mar","3":"Apr","4":"May","5":"June","6":"July","7":"Aug","8":"Sept","9":"Oct","10":"Nov","11":"Dec"};                  
      function showCalendar (ele_td,ele_month_show,currYear,currMonth){
      	console.log('thisDatePickerIndex'+thisDatePickerIndex);
      	console.time('testshowCalendar');
        if(isLeapYear(currYear)) {
          monthLength["1"]=29;
        }
        else {
          monthLength["1"]=28;
        }
        currMonth_firstDay=getFirstDay(currYear,currMonth);
        if(_this.opts.lang==="cn") {
          $(ele_month_show[0]).text(currYear+"年"+(currMonth+1)+"月");
        }
        else {
          $(".datePicker-title").text("Select dates to view deals");
          $(".datePicker-footer").text(" ");
          $(ele_month_show[0]).text(month_en[currMonth]+" "+currYear);
        }
        
        ele_td.removeClass();
        ele_td.empty();
        ele_td.addClass('other') ;    
        for(var i=0;i<monthLength[currMonth];i++) {
        	var td_cnt=i+currMonth_firstDay;
          $(ele_td[td_cnt]).removeClass('other').text(i+1) ;
          if(currYear===selectedDateStart.year){
            if(currMonth===selectedDateStart.month&&(i+1)===selectedDateStart.date){
            	if(_this.opts.range===false) {
            		$(ele_td[td_cnt]).addClass('selected');
            	}
            	else {            	
                $(ele_td[td_cnt]).addClass('selected sel-left');
              }
            }
            if(_this.opts.range===false) continue;
            if(currMonth===selectedDateEnd.month&&(i+1)===selectedDateEnd.date) {
              $(ele_td[td_cnt]).addClass('selected sel-right');
            }
          }
          if(isAmongRange(i,currYear,currMonth,selectedDateStart,selectedDateEnd)) {
            $(ele_td[td_cnt]).addClass("gray");
          }

        } 
        if($datePicker_table.length!==1) {
        	console.log("hahah")
          var next=getNextMonthOfcurrMonth(currYear,currMonth);
          var nextMonth=next.month;
          var yearOfNextMonth=next.year;
          var firstDay=getFirstDay(yearOfNextMonth,nextMonth);
          if(_this.opts.lang==="cn") {
            $(ele_month_show[1]).text((yearOfNextMonth)+"年"+(nextMonth+1)+"月");
          }
          else {
            $(ele_month_show[1]).text(month_en[nextMonth]+" "+yearOfNextMonth);
          }         
          for(var j=0;j<monthLength[nextMonth];j++) {
          	var td_cnt1=j+firstDay+42;
            $(ele_td[td_cnt1]).removeClass('other').text(j+1) ;
            if(yearOfNextMonth===selectedDateStart.year){
              if(nextMonth===selectedDateStart.month&&(j+1)===selectedDateStart.date){
              	if(_this.opts.range===false) {
              		$(ele_td[td_cnt1]).addClass('selected');
              	}
              	else {
                  $(ele_td[td_cnt1]).addClass('selected sel-left');            		
              	}
              }
              if(_this.opts.range===false) continue;
              if(nextMonth===selectedDateEnd.month&&(j+1)===selectedDateEnd.date) {

                $(ele_td[td_cnt1]).addClass('selected sel-right');
              }
            }
            if(isAmongRange(j,yearOfNextMonth,nextMonth,selectedDateStart,selectedDateEnd)) {
              $(ele_td[td_cnt1]).addClass("gray");
            }
          }           
        }
        console.timeEnd('testshowCalendar');       
      }
      var selectedDateStart=this.selectedDateStart;
      var selectedDateEnd=this.selectedDateEnd;
      var monthLength={"0":31,"1":28,"2":31,"3":30,"4":31,"5":30,"6":31,"7":31,"8":30,"9":31,"10":30,"11":31};
      var currYear=new Date().getFullYear();
      var currMonth=new Date().getMonth();
      var currDate=new Date().getDate();
      var currDay=new Date().getDay();
      var currMonth_firstDay=getFirstDay(currYear,currMonth);//Math.abs(currDay-currDate%7);
      var $td=$thisDatePicker.find("td");
      //console.log(currYear,currMonth);
      var $month_show=$thisDatePicker.find(".datePicker-month-show");      
      showCalendar($td,$month_show,currYear,currMonth) ;

      var $prev=$thisDatePicker.find(".datePicker-prev");
      var $next=$thisDatePicker.find(".datePicker-next");

      function recordSelectDate($td_target){
        if($td.index($td_target)<42) {
          selectedDateStart.year=currYear;
          selectedDateStart.month=currMonth;
          selectedDateStart.date=parseInt($td_target.text());             
        }
        else {
          selectedDateStart.year=getNextMonthOfcurrMonth(currYear,currMonth).year;
          selectedDateStart.month=getNextMonthOfcurrMonth(currYear,currMonth).month;                     
          selectedDateStart.date=parseInt($td_target.text());               
        }
        if(_this.opts.range==true) {
          if(Date.UTC(selectedDateStart.year,selectedDateStart.month,selectedDateStart.date)>=Date.UTC(selectedDateEnd.year,selectedDateEnd.month,selectedDateEnd.date)||(selectedDateEnd.year===undefined&&selectedDateEnd.month===undefined&&selectedDateEnd.date===undefined)){
	          var nextDate=getNextDate(selectedDateStart.year,selectedDateStart.month,selectedDateStart.date,monthLength);
	          selectedDateEnd.year=nextDate.year;
	          selectedDateEnd.month=nextDate.month;   
	          selectedDateEnd.date=nextDate.date;   
          }
        }
                
        if(_this.el.prop("tagName").toLowerCase()==="input"||_this.el.prop("tagName").toLowerCase()==="textarea") {
        	_this.el.prop("value",_this.selectedDateStart.year+"/"+(_this.selectedDateStart.month+1)+"/"+_this.selectedDateStart.date);
        }
        else {
        	_this.el.text(_this.selectedDateStart.year+"/"+(_this.selectedDateStart.month+1)+"/"+_this.selectedDateStart.date);
        }
        _this.el.trigger("change",[_this.selectedDateStart,_this.selectedDateEnd]);        
      }
      $prev.click(function(e){       
        currMonth>0?currMonth--:(currMonth=11,currYear--);
        //console.log(currYear,currMonth);
        showCalendar($td,$month_show,currYear,currMonth) ;
      });
      $next.click(function(e){
        currMonth<11?currMonth++:(currMonth=0,currYear++);
        showCalendar($td,$month_show,currYear,currMonth) ;
      });

      $td.click(function(e){
        if($(e.target).is(".other")) return;
        if(!$td.is(".selected")){
          recordSelectDate($(e.target));
          showCalendar($td,$month_show,currYear,currMonth) ; 
          return;   
        }
        recordSelectDate($(e.target));
         showCalendar($td,$month_show,currYear,currMonth) ;     
      });
      function isAmongRange(index,year,month,startobj,endobj) {
        var start=Date.UTC(selectedDateStart.year,selectedDateStart.month,selectedDateStart.date);
        var end=Date.UTC(selectedDateEnd.year,selectedDateEnd.month,selectedDateEnd.date);
        var target=Date.UTC(year,month,index+1);
        if(target<end&&target>start) return true;
        else return false;
      }
    };
    $.extend({
      dataPicker:function(el,opts){  	
        new DatePicker(el,opts);
      }
    })
  })(jQuery);