var VSAT_KBAKEY, STCD_KBAKEY, san, myElapsed, myTest, count=0, data = [],message="",TEST=false, TIER=3, TESTTIMEOUT=90;
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
  //$('#RawSdt').toggle(); 
  $('#RecommendSteps').toggle(); 
}
function init() {
  var w = window.innerWidth;
  var h = window.innerHeight;
 
  //var svg=d3.select('body').append('svg').attr('width',w).attr('height',h);
  var d = d3.csv.parse(d3.select("pre#layout").text()).filter(data=>data.tier<=TIER); //, function(error, d) {
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
  d3.select('#Statecode').attr('onclick',"Statecode_KBA()");
  d3.select('#VSAT').attr('onclick',"Statecode_KBA()");
  d3.select('#Device14Days').attr('onclick',"$.get('http://qa.hughes.com:8000/wifi/dev14day/'+$('#SiteID').val(), function(data) { $('#Device14DayHistory').html(data); });");
  //d3.select('#ShowKB').attr('onclick',"window.open('http://gtdevnadlnxvm1.hughes.com/html_statecodes/statecodes/'+$('#CustomerSC').val()+'_statecode.html','','resizable,height=400,width=1000');");
  d3.select('#ShowKB').attr('onclick',"ShowKB_KBA()");
  $('#ShowKB').css('border-radius','30px').css('border','none').css('outline','none');
  //d3.select('#ShowKB').attr('onclick',"window.open('Statecode.html#'+$('#CustomerSC').val(),'','resizable,height=400,width=1000');");
  //d3.select('#WifiLink').attr('onclick',"window.open('Statecode.html#'+$('#Statecode').html(),'Statecode Debug','resizable,height=200,width=400');");
  //d3.select('#WifiLink').attr('onclick',"var w=window.open('','','resizable,height=200,width=400');w.document.open().write('<h2>my table</h2>');");
  d3.select('#RebootHistory').attr('onclick',"RebootTable()");
  d3.select('#Usage').attr('onclick',"UsageTable()");
  d3.select('#LastTechCall').attr('onclick',"LastTechCall()");
  d3.select('#Devices_2G').attr('onclick',"WifiLink('/2G')");
  d3.select('#Devices_5G').attr('onclick',"WifiLink('/5G')");
  d3.select('#Devices_Eth').attr('onclick',"WifiLink('/Eth')");
  d3.select('#rawtable').html('set browser proxy to http://qa.hughes.com/proxy.pac to see LUI when Tool->LUI is Submitted, also enable popup for topology and debug steps');
  $('#RecommendSteps').attr('style',$('#RecommendSteps').attr('style')+';overflow:auto');
  var options="<option value='' disabled selected style='display:none'>TOOLS</option> \
              <option value='Sdtlinux'>Rerun Sdtlinux</option> \
              <option value='JuddSpeedtest'>Rerun Judd SpeedTest</option> \
              <option value='Wifi'>Rerun Wifi</option> \
              <option value='SiteInfo'>Subscriptions Plan</option> \
              <option value='lui'>LUI(proxy 66.82.3.130)</option> \
              <option value='force_range'>Force Range</option> \
              <option value='clear_stats'>Clear Stats</option> \
              <option value='reload_tables'>Reload Tables</option> \
              <option value='force_fallback'>Force Fallback</option> \
              <option value='reboot'>Reboot</option> \
              <option value='factory_reset'>Factory Reset wifi(70 sec, proxy 66.82.3.130)</option> \
              <option value='re_associate'>Re-Associate</option> \
              <option value='clear_pep_stats'>Clear PEP Stats</option> \
              <option value='disable_wifi'>Disable WIFI(15 sec, only when statecode 0.0.0 and 14.1.1)</option> \
              <option value='enable_wifi'>Enable WIFI(50 sec)</option> ";
              
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

function reboot_wrapup(){
    d3.select('#rawtable').html('<iframe id=lui src=http://'+san+'.terminal.jupiter.hnops.net onload="javascript:(function(o){o.style.height=o.contentWindow.document.body.scrollHeight});" style="height:800px;width:100%;border:none;overflow:hidden;" ></iframe>')
    Current_Refresh('Sdtlinux,JuddSpeedtest,14Days,SiteInfo');
    setTimeout(function() {Current_Refresh('Wifi');}, 60000); 
}

function execute(action) {
  if (['Sdtlinux','JuddSpeedtest','Wifi','SiteInfo'].includes(action)) Current_Refresh(action);
  else if (action!='' && confirm(action+' is non-reversable, are you sure?'))
  {
    san = document.getElementById('SiteID').value;
    statecode = document.getElementById('Statecode').value;
    process('{"ProgressSetsdt":0}');
    //else if (action=='wifi') $.get('http://'+san+'.terminal.jupiter.hnops.net/api/wifi/all_dev_info',function(result) {console.log(result);});
    //else if (action=='factory_reset') $.get('http://'+san+'.terminal.jupiter.hnops.net/api/wifi/run_cmd/?cmd=CMD_RESET_FACT_DEF',function(result) {alert(action+' completed');});
    if (action=='factory_reset') $.get('http://'+san+'.terminal.jupiter.hnops.net/api/wifi/run_cmd/?cmd=_CMD_RESET_FACT_DEF',function(result) {alert(action+' completed');});
    else if (action=='disable_wifi') $.get('http://'+san+'.terminal.jupiter.hnops.net/api/wifi/off',function(result) {alert(action+' completed');});
    else if (action=='enable_wifi') $.get('http://'+san+'.terminal.jupiter.hnops.net/api/wifi/on',function(result) {alert(action+' completed');});
    else if (action=='lui') { var san = document.getElementById('SiteID').value.toUpperCase();
    d3.select('#rawtable').html('<iframe id=lui src=http://'+san+'.terminal.jupiter.hnops.net style="height:800px;width:1000px;border:none;overflow:hidden;display:block" ></iframe>'); } 
    else  $.get('http://gtdevnadlnxvm1.hughes.com:8383?'+san+'='+action,function(result){process(result);alert(action+' completed');});
    if (action=='reboot'){setTimeout(function() {reboot_wrapup();},120000); reinit();}
   
  }
 document.getElementById('TOOLS').selectedIndex=0; 
}
function clickify(content) {
  content=content.replace('Force Range','<button onclick=execute("force_range")>Force Range</button>')
  content=content.replace('Reload Tables','<button onclick=execute("reload_tables")>Reload Tables</button>')
  content=content.replace('Reboot','<button onclick=execute("reboot")>Reboot</button>')
  content=content.replace('Re_associate','<button onclick=execute("reassociate")>Reassociate</button>')
  return content;
}

function Statecode_KBA() {
  $('#RecommendSteps').attr('style','top: 20px; left: 900px; color: white; position: absolute; width: 1000px; height: 250px; background-color: black;;overflow:auto');
  $('#RecommendSteps').html('');
  var sc = ''
  var vsat = $('#VSAT').html();
  var badVSAT=['No_Communication','Bad_Transmitter','Bad_Alignment','Bad_Receiver','UNKNOWN'];
  if (sc=='') { if (badVSAT.includes(vsat) && VSAT) sc= vsat; else sc=$('#Statecode').html(); }
  //if (sc=='') { sc=$('#Statecode').html(); }
  if (sc.match(/^\d/)) {
    var content = recommend(sc);
    if (content.includes('<br>')) d3.select('#RecommendSteps').html(clickify(content));
    else $.get('html_statecodes/statecodes/'+sc+'_statecode.html',function(data){ $('#RecommendSteps').html(content+clickify(data));});
  }
  else $.get(sc+'_statecode.html',function(data){ $('#RecommendSteps').html(data);});
}


function ShowKB_KBA() {
  var sc = ''
  if (sc=='') { sc=$('#CustomerSC').val(); }
  if (sc.match(/^\d/)) {
    var content = recommend(sc);
    if (content.includes('<br>')) d3.select('#RecommendSteps').html(clickify(content));
    else $.get('html_statecodes/statecodes/'+sc+'_statecode.html',function(data){ $('#RecommendSteps').html(content+clickify(data));});
  }
  else $.get(sc+'_statecode.html',function(data){ $('#RecommendSteps').html(data);});
}


function VSAT_KBA() {
  var sc = ''
  var vsat = $('#VSAT').html();
  var badVSAT=['No_Communication','Bad_Transmitter','Bad_Alignment','Bad_Receiver','UNKNOWN'];
  if (sc=='') { if (badVSAT.includes(vsat) && VSAT) sc= vsat; else sc=$('#Statecode').html(); }
  if (sc.match(/^\d/)) {
    var content = recommend(sc);
    if (content.includes('<br>')) d3.select('#RecommendSteps').html(clickify(content));
    else $.get('html_statecodes/statecodes/'+sc+'_statecode.html',function(data){ 
                                                                    var w=window.open('','','height=400,width=1000');
                                                                    w.document.open().write(content+clickify(data));
                                                                  }
              );
  }
  else $.get(sc+'_statecode.html',function(data){ 
                                    var w=window.open('','','height=400,width=1000');
                                    w.document.open().write(content+clickify(data));
                                  });
}

//function VSAT_KBA() {
//  if ($('#VSAT').html() != "VSAT") {
//    $.get('http://gtdevnadlnxvm1.hughes.com/html_statecodes/statecodes/'+$('#VSAT').html()+'_statecode.html',function(data) {
//      var w=window.open('','','height=400,width=1000');
//      w.document.open().write(data);
//      });
//  }
//}

function restartTimer() {
    count=0;
    if (myElapsed!=null) clearInterval(myElapsed);
    myElapsed=setInterval(Elapsed,1000);
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
    var san = document.getElementById('SiteID').value.toUpperCase();
    d3.select('#rawtable').html('<iframe id=lui src=http://'+san+'.terminal.jupiter.hnops.net style="height:800px;width:1000px;border:none;overflow:hidden;display:block" ></iframe>')
    restartTimer();
    //$("[id^=Device]").each(function(){$(this).html($(this).prop('id'))})
}

function Elapsed() {
    count++;
    $('#Elapsed').html(count);
    if ($('#VSAT').html()=='No_Communication' || Array.from($("[id^=Progress_]")).every(function(x) {return x.value===1})) { clearInterval(myElapsed); if ( TEST && $('#Elapsed').html()<TESTTIMEOUT) {clearTimeout(myTest); setTimeout(function() {q();test();},5000);} } 
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
      w.document.title = 'Customer Network Topology - '+band;
      });
}

function LastTechCall() {
    $.get('http://qa.hughes.com:8000/whse/lasttechcall/'+$('#SiteID').val(),function(data) {
      var w=window.open('','','height=200,width=250');
      w.document.open().write(data);
      });
}

function RebootTable() {
    $.get('http://qa.hughes.com:8000/judd/reboot/'+$('#SiteID').val(),function(data) {
      var w=window.open('','','height=250,width=500');
      w.document.open().write(data);
      });
}

function UsageTable() {
      var w=window.open('http://qa.hughes.com:8000/whse/usage/'+$('#SiteID').val(),'','height=400,width=1000')
}

function MOSTable() {
   if ($('#SiteID').val()=="GUE0000001037" || $('#SiteID').val()=="GUE0000001534") {
      var w=window.open('http://qa.hughes.com:8000/whse/mos/'+$('#SiteID').val(),'','height=400,width=1400')
   }
}

function Current_Refresh(ep='') {
  if (ep=='') { ep='Sdtlinux,JuddSpeed,Wifi,SiteInfo,14Days'; reinit();}
  if ("WebSocket" in window) {
    //alert("WebSocket is supported by your Browser!");
    var ws = new WebSocket("ws://gtdevnadlnxvm1.hughes.com:8888/");
    if (TEST) myTest = setTimeout(function() {q();test();}, TESTTIMEOUT*1000);
    ws.onopen = function() {
      // Web Socket is connected, send data using send()
      san = document.getElementById('SiteID').value.toUpperCase();
      $('#SiteID').val(san);
      console.log(san);
      ws.send(san+'#'+ep);
      $("progress").each(function() {
              console.log($(this)); 
              if (ep.includes($(this).attr('id').substring(10))) $(this).val(0)});
      //$('#Progress_Judd').val(0.1);
      // d3.select('#Device14DayHistory').html('<iframe id=lui src=http://qa.hughes.com:3838/diagnostics style="height:800px;width:1000px;border:none;overflow:hidden;display:block" ></iframe>')
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
       //if (typeof(val)=='string' && val.includes('flashing'))  $('#'+key).attr('onclick',"window.open('http://gtdevnadlnxvm1.hughes.com/html_statecodes/statecodes/'+ kbaKey +'_statecode.html','','resizable,height=400,width=1000');");
       //if (typeof(val)=='string' && val.includes('flashing'))  $('#'+key).attr('onclick',"$.get(kbaKey+'_statecode.html',function(data){ $('#RecommendSteps').html(data);});");
       if (key=='stcd_kbakey') { STCD_KBAKEY=val; console.log("STCD_KBAKEY: ",val); }
       if (key=='vsat_kbakey') { VSAT_KBAKEY=val; console.log("VSAT_KBAKEY: ",val); }
       if (typeof(val)=='string' && val.includes('flashing') && STCD_KBAKEY.includes(key))  $('#'+key).attr('onclick',"Statecode_KBA()");
       if (typeof(val)=='string' && val.includes('flashing') && VSAT_KBAKEY.includes(key))  $('#'+key).attr('onclick',"Statecode_KBA()");
       if (key=='VOIP' && (val.includes('green') || val.includes('red'))) $('#'+key).attr('onclick',"MOSTable()");
       if ( val=="green" || val=="orange"  || val=="red" ||  val=="grey" || val=="black" ) {
            document.getElementById(key).style.backgroundColor=val;
            if (val=='red' && (key=='UL' || key=='DL' || key.includes('AirLink') )) $('#'+key).attr('onclick',"window.open('http://gtdevnadlnxvm1.hughes.com/ULDL.html','','resizable,height=100,width=1000');");
         }
       else if (val=="red & flashing") $('#'+key).each(function setAnim() {$(this).animate({backgroundColor:'red'},750).animate({backgroundColor:'rgb(255,179,179'},750,setAnim);});
       else if (val=="orange & flashing") $('#'+key).each(function setAnim() {$(this).animate({backgroundColor:'rgb(255,165,0)'},750).animate({backgroundColor:'rbg(255,219,153)'},750,setAnim);});
       //else if (key=="Statecode" && (val=="green" ||val=="orange"||val=="grey"||val=="black")) document.getElementById("Statecode").style.backgroundColor=val; 
       //else if (val=="green"||val=="red"||val=="orange"||val=="grey"||val=="black") document.getElementById(key).style.backgroundColor=val;
       else if (key.substr(0,8)=="Progress") document.getElementById(key).value=val;
       //else if (key=="RawSdt") d3.select('RawSdt').html(val);
       else if (document.getElementById(key) != null) {
            document.getElementById(key).innerHTML=val;
            if ((key=='Statecode')) {kbaKey=val; $('#'+key).attr('onclick',"Statecode_KBA()");} //only clickable when red
            if ((key=='VSAT')) {kbaKey=val; $('#'+key).attr('onclick',"Statecode_KBA()");} //only clickable when red

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
             //else update(key,val); //recursively assign color and display, unless HTML_ key is encountered
             else color(val); //recursively assign color and display, unless HTML_ key is encountered
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
   //  case '<':
   //     document.getElementById('RecommendSteps').innerHTML = response;
   //     break;
    default:
        console.log("not any of the above", message.charAt(0));
  }       
}
function recommend(idx) {
  //returns html code for the index
  var di=d3.csv.parse(d3.select("pre#steps").text()).filter(d=>d.DIAGNOSIS_IDX==idx)[0];
  var actions=[di[0],di[1],di[2],di[3],di[4]];
  var htmlcode=di.TEXT;
  if (di[0]!=0) {
     var dr=d3.csv.parse(d3.select("pre#recommendation").text())// .filter(d=>actions.includes(d.IDX));
     var dr=dr.reduce(function(map, obj) {
     map[obj.IDX] = obj.TEXT;
     return map;
     }, {});
     for (i=0; di[i]>''; i++) { htmlcode += '<br><input type=checkbox>'+ dr[di[i]]+'</input>';  }
  }
  //d3.select('#ShowKB').attr('onclick',"window.open('http://gtdevnadlnxvm1.hughes.com/html_statecodes/statecodes/'+$('#CustomerSC').val()+'_statecode.html','','resizable,height=400,width=1000');");
  return htmlcode;
}



