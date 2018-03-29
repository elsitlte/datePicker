  datePick is a jquery plugin for date picker.this help user to input correct format date quickly.

## Usage
```
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <title>dataPicker示例</title>
    <link rel="stylesheet" href="./datePicker.css" media="all">
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
  $.dataPicker(el,options);


  |parameter|describtion|
  |:---------|:-----------|
  |el   |the input element that datePicker relative to|
  |options|a javascript object which contain some configuration for datePicker initial|

## options

  |option name|value type|value-describtion|
  |:---------|:-----------|:-----------|
  |lang   |string |"cn" chinese version;"en" english version|
  |theme |string|theme style ,value canbe "tripadvisor" (www.tripadvisor.com)or "booking"(www.booking.com)| 
  |range|bool|true for default.when false the selection type is not for range|  