$('#nav-tabs').delegate('li','click',function(){
  var _this=$(this);
  var pid=_this.attr('pid');
  $('#nav-tabs').find('li').removeClass('active');
  $('.tab-pane').removeClass('active');
  $('.tab-pane').hide();
  _this.addClass('active');
  $('#'+pid).show();
})
$("#userInfo").on('click',function(){
  $("#userMenu").show();
})
$("#userInfo").on('click',function(){
  $("#userMenu").hide();
})
