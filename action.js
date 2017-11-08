function lui() {
  san = document.getElementById('SiteID').value;
  d3.select('#rawtable').html('<iframe id=lui src=http://'+san+'.terminal.jupiter.hnops.net onload="javascript:(function(o){o.style.height=o.contentWindow.document.body.scrollHeight});" style="height:800px;width:100%;border:none;overflow:hidden;" ></iframe>')
}

function execute(action) {
  if (confirm('this action is non-reversable, are you sure?')) 
  {
    $.get('http://gtdevnadlnxvm1.hughes.com:8383?'+san+'='+action);
  }
}

var data={"userId" : "cus360",
  "password" : "C2017360!",
  "appName" : "test",
  "san" : "GUE0000001046",
  "caseId" : null,
  "csrLoginId" : null,
  "object" : null,
  "sti" : null,
  "satelliteType" : "JUPITER2",
  "noSiteOrder" : true
};

var url='http://qa.hughes.com:8383/cross?db=ora&keyword=GL_segment'
var url='http://qa.hughes.com:8383/simple?db=ora&keyword=GL_segment'
var url='https://tdsbeta.hnops.net/tds_api/site_diagnosis/auth/user.json/'
var url='http://run.plnkr.co/plunks/v8xyYN64V4nqCshgjKms/data-1.json'
var url='https://tdsbeta.hnops.net/tds_api/rest.html/'
function logResults(json){
  alert(json);
}
function REBOOT_jsonp() {
  $.ajax({
  url: url,
  //url: url,
  dataType: "jsonp",
  jsonCallback: "logResults"
});

}

function REBOOT_get() {
  $.get(url,function(result) {console.log(result);});
}


function REBOOT_post() {
  $.post('https://tdsbeta.hnops.net/tds_api/site_diagnosis/auth/user.json/',data, function(result) {
  alert(result);
  });
}

function REBOOT_ajax() {
  $.ajax({
  type: "POST",
  url: 'https://tdsbeta.hnops.net/tds_api/site_diagnosis/auth/user.json/',
  data: {"userId" : "cus360",
  "password" : "C2017360!",
  "appName" : "test",
  "san" : "GUE0000001046",
  "caseId" : null,
  "csrLoginId" : null,
  "object" : null,
  "sti" : null,
  "satelliteType" : "JUPITER2",
  "noSiteOrder" : true
},
  //dataType: 'jsonp',
  headers: {"Accept": "application/json","Content-Type": "application/json"},
  success:function (result) {console.log(result);}
  });
}

function REBOOT_xhr(){
  var jqxhr = $.post( "https://tdsbeta.hnops.net/tds_api/site_diagnosis/auth/user.json/", data,function(result) {
  alert( "success" );
  })
  .done(function() {
    alert( "second success" );
  })
  .fail(function() {
    alert( "error" );
  })
  .always(function() {
    alert( "finished" );
  });
}
