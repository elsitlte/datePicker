  datePick is a jquery plugin for date picker.this help user to input correct format date quickly.

##Usage
```
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <title>layDate快速使用</title>
    <link rel="stylesheet" href="/static/build/layui.css" media="all">
    <script src="./jquery.min.js"></script> 
    <script src="./datePicker.jq.min.js"></script> 
    <script src="./datePicker.jq.min.js.map"></script> 
  </head>
  <body>
    <input id="el" type="text" class="layui-input" id="test1"> 
    <script>
      $.dataPicker($('#el'));
    </script>
  </body>
  </html>
```