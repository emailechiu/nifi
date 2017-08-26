var san, data = [],message="";
window.onload=init;
function init() {
  var w = window.innerWidth;
  var h = window.innerHeight;
  //var svg=d3.select('body').append('svg').attr('width',w).attr('height',h);
  var d = d3.csv.parse(d3.select("pre#layout").text()) //, function(error, d) {
  d3.selectAll('button').data(d.filter(function(d) {
    return d.type == 'button' || d.type == 'rect' || d.type == 'vbutton'
  })).enter().append('button').attr('id', function(d) {
    return d.text
  }).attr('type', 'submit').attr('style', function(d) {
    return 'top:'.concat(d.y).concat('px;left:').concat(d.x).concat('px;color:white;position:absolute;width:').concat(d.width).concat('px;height:').concat(d.height).concat('px;background-color:').concat(d.color)
  }).html(function(d) {
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
  d3.selectAll('input').data(d.filter(function(d) {
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
  d3.selectAll('textarea').data(d.filter(function(d) {
    return d.type == 'textarea'
  })).enter().append('textarea').attr('id', function(d) {
    return d.text
  }).attr('style', function(d) {
    return 'top:'.concat(d.y).concat('px;left:').concat(d.x).concat('px;position:absolute;width:').concat(d.width).concat('px;height:').concat(d.height).concat('px;')
  }).style('background-color', function(d) {
    return d.color
  }).html(function(d) {return d.text});//.attr('disabled',function(d) {if (d.type=='button') return; else return "";});
  d3.selectAll('div').data(d.filter(function(d) {
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

  d3.select('#Current').attr('onclick', "Current()");
  d3.select('#History').attr('onclick', "History()");
  //d3.select('#SDT_JUDD').attr('onmouseover', "SDT_JUDD()");
  document.getElementById('History').innerHTML+='<span id=History_Hover>Tooltip</span>';
  document.getElementById('SDT_JUDD').innerHTML+='<div id=SDT_JUDD_Hover>Tooltip</div>';
  //d3.select('#SiteID').attr('onclick', "SiteID(event)");
}
function SDT_JUDD() {
  d3.select('#SDT_JUDD_Hover').html('Show the raw SDT/Judd parameters')
  
}
function History() {
  d3.select('#rawtable').html('<iframe src=http://DSS10116332.terminal.jupiter.hnops.net style="display:block"></iframe>')
 
}
function reinit(){
    data=[];
    d3.selectAll('textarea').html("");
    d3.selectAll('button').style('background-color','grey');
    d3.selectAll('rect').style('background-color','grey');
}
function SiteID(e) {
    var target = (e.target) ? e.target : e.srcElement;
    console.log(target);
    target.value="";
    //d3.select('#SiteID').value="";
}
function Current() {
  reinit();
  
  if ("WebSocket" in window) {
    //alert("WebSocket is supported by your Browser!");
    var ws = new WebSocket("ws://gtdevnadlnxvm1:7072/");
    ws.onopen = function() {
      // Web Socket is connected, send data using send()
      san = document.getElementById('SiteID').value;
      console.log(san);
      ws.send(san);
      d3.select('#rawtable').html('<iframe src=http://'+san+'.terminal.jupiter.hnops.net style="display:block"></iframe>')
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
    console.log("setting",key,"to",val);
    if (val=="green" || val=="red" || val=="orange" ||val=="grey" || val=="black" ) document.getElementById(key).style.backgroundColor=val; 
    else document.getElementById(key).innerHTML=val;
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
	//response=JSON.parse(message); 
        //document.getElementById('rawtable').innerHTML += response;
        color(response)
        break;
    case '{': 
        color(response);
        //document.getElementById('rawdata').innerHTML += response;
        break;
    case '<':
        document.getElementById('rawtable').innerHTML += response;
        break;
    case '"':
        color(response);
        break;
    default:
        console.log("not any of the above", message.charAt(0));
  }       
}

