var kbaKey, san, myElapsed, myTest, count=0, data = [],message="",TEST=false, TESTTIMEOUT=90;
window.onload=init;
function test() {
  QUnit.test( "Judd Progress", function( assert ) { assert.ok( $('#Progress_Judd').val()===1 , "Passed!"); });
  QUnit.test( "Sdtlinux Progress", function( assert ) { assert.ok( $('#Progress_Sdtlinux').val()===1 , "Passed!"); });
  QUnit.test( "SpeedTest Progress", function( assert ) { assert.ok( $('#Progress_Speedtest').val()===1 , "Passed!"); });
  QUnit.test( "Wifi Progress", function( assert ) { assert.ok( $('#Progress_Wifi').val()===1 , "Passed!"); });
  QUnit.test( "MULTIVAL1 color", function( assert ) { assert.ok( $('#MULTIVAL1').css('backgroundColor')==="rgb(0, 128, 0)" , "Passed!"); });
  QUnit.test( "MULTIVAL2 color", function( assert ) { assert.ok( $('#MULTIVAL2').css('backgroundColor')==="rgb(0, 128, 0)" , "Passed!"); });
  QUnit.test( "MULTIVAL3 color", function( assert ) { assert.ok( $('#MULTIVAL3').css('backgroundColor')==="rgb(0, 128, 0)" , "Passed!"); });
  QUnit.test( "AccountStatus color", function( assert ) { assert.ok( $.inArray($('#AccountStatus').css('backgroundColor'),["rgb(0, 128, 0)","rgb(255, 0, 0)"])>=0 , "Passed!"); });
  QUnit.test( "FAP color", function( assert ) { assert.ok( $.inArray($('#FAP').css('backgroundColor'),["rgb(0, 128, 0)","rgb(255, 0, 0)"])>=0 , "Passed!"); });
  QUnit.test( "IRCongestion color", function( assert ) { assert.ok( $.inArray($('#IRCongestion').css('backgroundColor'),  ["rgb(0, 128, 0)","rgb(255, 0, 0)"])>=0 , "Passed!"); });
  QUnit.test( "ORCongestion color", function( assert ) { assert.ok( $.inArray($('#ORCongestion').css('backgroundColor'),["rgb(0, 128, 0)","rgb(255, 0, 0)"])>=0 , "Passed!"); });
  QUnit.test( "Usage color", function( assert ) { assert.ok( $.inArray($('#Usage').css('backgroundColor'),["rgb(0, 128, 0)","rgb(255, 0, 0)"])>=0 , "Passed!"); });
  QUnit.test( "RebootHistory color", function( assert ) { assert.ok( $.inArray($('#RebootHistory').css('backgroundColor'),["rgb(0, 128, 0)","rgb(255, 0, 0)"])>=0 , "Passed!"); });
  QUnit.test( "UL color", function( assert ) { assert.ok( $.inArray($('#UL').css('backgroundColor'),["rgb(0, 128, 0)","rgb(255, 0, 0)"])>=0 , "Passed!"); });
  QUnit.test( "DL color", function( assert ) { assert.ok( $.inArray($('#DL').css('backgroundColor'),["rgb(0, 128, 0)","rgb(255, 0, 0)"])>=0 , "Passed!"); });
  QUnit.test( "GWAirLink color", function( assert ) { assert.ok( $.inArray($('#GwAirLink').css('backgroundColor'),["rgb(0, 128, 0)","rgb(255, 0, 0)"])>=0 , "Passed!"); });
  QUnit.test( "SiteAirLink color", function( assert ) { assert.ok( $.inArray($('#SiteAirLink').css('backgroundColor'),["rgb(0, 128, 0)","rgb(255, 0, 0)"])>=0 , "Passed!"); });
}

function passwd() {
  var pass=prompt('enter your password',' ');
  if (md5(pass)=='a2e87964baed8d6e04fd3238c21ae21a') init();
  else alert('Access Denied');
}
function q() { 
  $('#qunit').toggle();
  $('#rawtable').toggle(); 
  $('#RawSdt').toggle(); 
  $('#RawWifi').toggle(); 
}
function init() {
  var w = window.innerWidth;
  var h = window.innerHeight;
 
  //var svg=d3.select('body').append('svg').attr('width',w).attr('height',h);
  var d = d3.csv.parse(d3.select("pre#layout").text()) //, function(error, d) {
  d3.select("#quest").selectAll('button').data(d.filter(function(d) {
    return d.type == 'button' || d.type == 'rect' || d.type == 'vbutton'
  })).enter().append('button').attr('id', function(d) {
    return d.text
  }).attr('type', 'submit').attr('style', function(d) {
    return 'top:'.concat(d.y).concat('px;left:').concat(d.x).concat('px;color:white;position:absolute;width:').concat(d.width).concat('px;height:').concat(d.height).concat('px;background-color:').concat(d.color)
  }).html(function(d) {
    return d.text
  }).attr('default',function(d) {
    return d.text
  }).attr('disabled', function(d) {
    if (d.type == 'button' | d.type == 'vbutton') return;
    return "";
  }).style('transform', function(d) {
    if (d.type == 'vbutton') return "rotate(-90deg) translate(-".concat(d.width).concat("px,").concat(0).concat("px)");
    return "";
  }).style('transform-origin', function(d) {
    if (d.type == 'vbutton') return "left top";
    return "";
  });

  d3.select("#quest").selectAll('input').data(d.filter(function(d) {
    return d.type == 'input'
  })).enter().append('input').attr('id', function(d) {
    return d.text
  }).attr('type', 'text').attr('style', function(d) {
    return 'top:'.concat(d.y).concat('px;left:').concat(d.x).concat('px;color:white;position:absolute;width:').concat(d.width).concat('px;height:').concat(d.height).concat('px;')
  }).style('background-color', function(d) {
    return d.color
  }).attr('placeholder',function(d) {
    return "Enter ".concat(d.text)
  });//.attr('disabled',function(d) {if (d.type=='button') return; else return "";});
  
  d3.select("#quest").selectAll('select').data(d.filter(function(d) {
    return d.type == 'select'
  })).enter().append('select').attr('id', function(d) {
    return d.text
  }).attr('type', 'text').attr('style', function(d) {
    return 'top:'.concat(d.y).concat('px;left:').concat(d.x).concat('px;color:white;position:absolute;width:').concat(d.width).concat('px;height:').concat(d.height).concat('px;')
  }).style('background-color', function(d) {
    return d.color
  })
   
  
  
  d3.select("#quest").selectAll('textarea').data(d.filter(function(d) { //this is not used
    return d.type == 'textarea'
  })).enter().append('textarea').attr('id', function(d) {
    return d.text
  }).attr('style', function(d) {
    return 'top:'.concat(d.y).concat('px;left:').concat(d.x).concat('px;position:absolute;width:').concat(d.width).concat('px;height:').concat(d.height).concat('px;')
  }).style('background-color', function(d) {
    return d.color
  }).html(function(d) {return d.text});//.attr('disabled',function(d) {if (d.type=='button') return; else return "";});
  
  d3.select("#quest").selectAll('div').data(d.filter(function(d) {
    return d.type == 'div' 
  })).enter().append('div').attr('id', function(d) {
    return d.text
  }).attr('style', function(d) {
    return 'top:'.concat(d.y).concat('px;left:').concat(d.x).concat('px;color:white;position:absolute;width:').concat(d.width).concat('px;height:').concat(d.height).concat('px;')
  }).style('background-color', function(d) {
    return d.color
  }).html(function(d) {
    return d.text
  });//.attr('display',function(d) {if (d.type == 'divh') return 'none'; else return 'block';});
  
  d3.select("#quest").selectAll('progress').data(d.filter(function(d) {
    return d.type=='progress'
  })).enter().append('progress').attr('style', function(d) {
    return 'top:'.concat(d.y).concat('px;left:').concat(d.x).concat('px;position:absolute;text-align:center; width:').concat(d.width).concat('px;height:').concat(d.height).concat('px;')
  }).style('color', function(d) {
    return d.color
  }).attr('id', function(d) {
    return d.text
  }).attr('value',0).attr('data-label',function(d) {
    return d.text
  });
  var san = window.location.pathname.substr(1);
  if (san!='' && !san.includes('.')) { // send query straight to websocket 
         $('#SiteID').val(san); 
         Current_Refresh();
      }
  d3.select('#Current_Refresh').attr('onclick', "Current_Refresh()");$('#Current_Refresh').css('border-radius','30px').css('border','none');
  d3.select('#History').attr('onclick', "History()");$('#History').css('border-radius','60px');
  d3.select('#Statecode').attr('onclick',"window.open('http://gtdevnadlnxvm1.hughes.com/html_statecodes/statecodes/'+$('#Statecode').html()+'_statecode.html','','resizable,height=400,width=1000');");$('#ShowKB').css('border-radius','30px').css('border','none').css('outline','none');
  d3.select('#ShowKB').attr('onclick',"window.open('Statecode.html#'+$('#CustomerSC').val(),'','resizable,height=400,width=1000');");
  //d3.select('#WifiLink').attr('onclick',"window.open('Statecode.html#'+$('#Statecode').html(),'Statecode Debug','resizable,height=200,width=400');");
  //d3.select('#WifiLink').attr('onclick',"var w=window.open('','','resizable,height=200,width=400');w.document.open().write('<h2>my table</h2>');");
  d3.select('#RebootHistory').attr('onclick',"RebootTable()");
  d3.select('#Usage').attr('onclick',"UsageTable()");
  d3.select('#Devices_2G').attr('onclick',"WifiLink('/2G')");
  d3.select('#Devices_5G').attr('onclick',"WifiLink('/5G')");
  d3.select('#Devices_Eth').attr('onclick',"WifiLink('/Eth')");
  d3.select('#rawtable').html('set browser proxy to http://qa.hughes.com/proxy.pac to see LUI when Tool->LUI is Submitted, also enable popup for topology and debug steps');
  var options="<option value=''>TOOLS</option> \
              <option value='lui'>LUI/WAT(proxy 66.82.3.130)</option> \
              <option value='force_range'>Force Range</option> \
              <option value='clear_stats'>Clear Stats</option> \
              <option value='reload_tables'>Reload Tables</option> \
              <option value='force_fallback'>Force Fallback</option> \
              <option value='reboot'>Reboot</option> \
              <option value='factory_reset'>Factory Reset wifi(proxy 66.82.3.130)</option> \
              <option value='re_associate'>Re-Associate</option> \
              <option value='clear_pep_stats'>Clear PEP Stats</option> \
              <option value='enable_wifi'>Enable WIFI</option> ";
              
  //d3.select('#TOOLS').attr('onchange',"window[value]()").html(options);
  d3.select('#TOOLS').attr('onchange',"execute(value)").html(options);
               
  //d3.select('#SDT_JUDD').attr('onmouseover', "SDT_JUDD()");
  //document.getElementById('History').innerHTML+='<span id=History_Hover>Tooltip</span>';
  //document.getElementById('SDT_JUDD').innerHTML+='<div id=SDT_JUDD_Hover>Tooltip</div>';
  //d3.select('#SiteID').attr('onclick', "SiteID(event)");
}


function SDT_JUDD() {
  d3.select('#SDT_JUDD_Hover').html('Show the raw SDT/Judd parameters')
  
}

function execute(action) {
  if (confirm(action+' is non-reversable, are you sure?'))
  {
    san = document.getElementById('SiteID').value;
    process('{"ProgressSetsdt":0}');
    if (action=='lui') d3.select('#rawtable').html('<iframe id=lui src=http://'+san+'.terminal.jupiter.hnops.net onload="javascript:(function(o){o.style.height=o.contentWindow.document.body.scrollHeight});" style="height:800px;width:100%;border:none;overflow:hidden;" ></iframe>')
    //else if (action=='wifi') $.get('http://'+san+'.terminal.jupiter.hnops.net/api/wifi/all_dev_info',function(result) {console.log(result);});
    else if (action=='factory_reset') $.get('http://'+san+'.terminal.jupiter.hnops.net/api/wifi/run_cmd/?cmd=CMD_RESET_FACT_DEF',function(result) {alert(action+' completed');});
    else $.get('http://gtdevnadlnxvm1.hughes.com:8383?'+san+'='+action,function(result){process(result);alert(action+' completed');});
  }
}

function Statecode() {
  //window.open('Statecode.html','Statecode Debug','resizable,height=260,width=370'); return false;"
  //<a href="yourpage.htm" target="_blank">New Page</a></noscript>
}

function reinit(){
    data=[];
    //$('button').each(function() {if ($(this).prop('disabled')) $(this).html($(this).attr('default'))})
    $('button').each(function() {$(this).html($(this).attr('default'))})
    $('*').stop(true,false);
    d3.selectAll('textarea').html("");
    $("div:not([id^='qu'])").html("");
    d3.selectAll('button').style('background-color','black');
    d3.selectAll('rect').style('background-color','black');
    $("[id^=Devices]").each(function(){$(this).html('')})
    $("[id^=Devices]").each(function(){$(this).css('background-color', 'white')})
    $("progress").each(function() {$(this).val(0)});
    count=0;
    if (myElapsed!=null) clearInterval(myElapsed);
    myElapsed=setInterval(Elapsed,1000);
    //$("[id^=Device]").each(function(){$(this).html($(this).prop('id'))})
}

function Elapsed() {
    count++;
    $('#Elapsed').html(count);
    if (Array.from($("[id^=Progress_]")).every(function(x) {return x.value===1})) { clearInterval(myElapsed); if ( TEST && $('#Elapsed').html()<TESTTIMEOUT) {clearTimeout(myTest); setTimeout(function() {q();test();},5000);} } 
}

function SiteID(e) {
    var target = (e.target) ? e.target : e.srcElement;
    console.log(target);
    target.value="";
    //d3.select('#SiteID').value="";
}

function WifiLink(band) {
    $.get('http://qa.hughes.com:8000/wifi/history/'+$('#SiteID').val()+band,function(data) {
      var w=window.open('','','height=400,width=1000');
      w.document.open().write(data);
      });
}

function RebootTable() {
    $.get('http://qa.hughes.com:8000/judd/reboot/'+$('#SiteID').val(),function(data) {
      var w=window.open('','','height=400,width=1000');
      w.document.open().write(data);
      });
}

function UsageTable() {
      var w=window.open('http://qa.hughes.com:8000/whse/usage/'+$('#SiteID').val(),'','height=400,width=1000')
}

function Current_Refresh() {
  reinit();
  if ("WebSocket" in window) {
    //alert("WebSocket is supported by your Browser!");
    var ws = new WebSocket("ws://gtdevnadlnxvm1.hughes.com:8888/");
    if (TEST) myTest = setTimeout(function() {q();test();}, TESTTIMEOUT*1000);
    ws.onopen = function() {
      // Web Socket is connected, send data using send()
      san = document.getElementById('SiteID').value;
      console.log(san);
      ws.send(san);
      $('#Progress_Judd').val(0.1);
      d3.select('#rawtable').html('<iframe id=lui src=http://'+san+'.terminal.jupiter.hnops.net style="height:800px;width:1000px;border:none;overflow:hidden;display:block" ></iframe>')
    };

    ws.onmessage = function(evt) {
      process(evt.data);
    };

    ws.onclose = function() {
      ws = null; // alert("Connection is closed...");
    };
  } else {
    // The browser doesn't support WebSocket
    alert("WebSocket NOT supported by your Browser!");
  }
}

function color_fails(message) {

    JSON.parse(message,(key,value)=>
    {
       console.log(key); console.log(value);      
       document.getElementById(key).style.backgroundColor=value
    })
}

function update(key,val) {
    console.log("setting",key,"to",val, "as type", typeof(val));
    try {
       if (typeof(val)=='string' && val.includes('flashing'))  $('#'+key).attr('onclick',"window.open('http://gtdevnadlnxvm1.hughes.com/html_statecodes/statecodes/'+ kbaKey +'_statecode.html','','resizable,height=400,width=1000');");
       if ( val=="green" || val=="limegreen"  || val=="red" ||  val=="grey" || val=="black" ) {
            document.getElementById(key).style.backgroundColor=val;
            if (val=='red' && (key=='UL' || key=='DL' || key.includes('AirLink') )) $('#'+key).attr('onclick',"window.open('http://gtdevnadlnxvm1.hughes.com/ULDL.html','','resizable,height=100,width=1000');");
         }
       else if (val=="red & flashing") $('#'+key).each(function setAnim() {$(this).animate({backgroundColor:'red'},750).animate({backgroundColor:'green'},750,setAnim);});
       else if (val=="limegreen & flashing") $('#'+key).each(function setAnim() {$(this).animate({backgroundColor:'limegreen'},750).animate({backgroundColor:'green'},750,setAnim);});
       //else if (key=="Statecode" && (val=="green" ||val=="orange"||val=="grey"||val=="black")) document.getElementById("Statecode").style.backgroundColor=val; 
       //else if (val=="green"||val=="red"||val=="orange"||val=="grey"||val=="black") document.getElementById(key).style.backgroundColor=val;
       else if (key.substr(0,8)=="Progress") document.getElementById(key).value=val;
       else if (key=="RawSdt") d3.select('RawSdt').html(val);
       else if (document.getElementById(key) != null) {
            document.getElementById(key).innerHTML=val;
            if ((key=='Statecode' || key=='VSAT') & document.getElementById(key).style.backgroundColor=='red') {kbaKey=val; $('#'+key).attr('onclick',"window.open('http://gtdevnadlnxvm1.hughes.com/html_statecodes/statecodes/'+ kbaKey +'_statecode.html','','resizable,height=400,width=1000');");} //only clickable when red

        }
    }
   catch (e) {}
}
    
function color(message) {
    var obj=message;
    while (typeof(obj)!='object') try {obj=JSON.parse(obj);} catch(e) {console.log(message,"not json object string"); return;} //only deal with object from this point on
    // var obj=JSON.parse(response);
    //var key=Object.keys(obj);
    //var val=Object.values(obj);
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        val = obj[key];
        if (typeof(val)=="object") {
             if (val.length) for (i=0;i<val.length;i++) update(key,val[i]); //if object contains array  
             else update(key,val); //recursively assign color and display, unless HTML_ key is encountered
             }
        else {
            update(key,val); 
         }
       }
    }
}

// document.getElementById('submit').addEventListener('click',function() { return contact(document.getElementById('san').value)});
function process(response) {
  //saveAs(response,"myfile.txt");
  message=response;
  data.push(response);
  //response=response.replace(/[\\n|\\|["||"]/g,'');
  console.log(response);
  switch(message.charAt(0))
  { 
    case '[':
    case '{': 
    case '"':
        color(response);
        //document.getElementById('rawdata').innerHTML += response;
        break;
    case '<':
        document.getElementById('RawWifi').innerHTML = response;
        break;
    default:
        console.log("not any of the above", message.charAt(0));
  }       
}
