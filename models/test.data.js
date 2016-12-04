var uiModels = uiModels || {};
uiModels.test_data = [
{
  "name": "Test 1",
  "text1": "hello",
  "text3": "world",
  "lov1": "Z",
  "lov3": "P",
  "list1": [
    "E"
  ],
  "list3": [
    "Y",
    "P",
    "M"
  ],
  "lovicon1": "red",
  "lovicon3": "white",
  "textmultiline1": "html test <b>BOLD</b>",
  "textmultiline3": "fdfd",
  "html1": "html test <b>BOLD</b>",
  "html3": "fdfd",
  "date1": "2015-04-16",
  "date3": "2015-04-24",
  "time1": "00:15",
  "time3": "01:45",
  "datetime1": "2015-04-16T14:22",
  "datetime3": "2015-04-15T15:30",
  "integer1": 2,
  "integer3": 3,
  "decimal1": 2.4,
  "decimal3": 3.14,
  "money1": 2,
  "money3": 9.99,
  "boolean1": true,
  "boolean3": false,
  "email1": "dsds@dffd.com",
  "email3": "aaa@bbb.edu",
  "url1": "http://google.com",
  "url3": "",
  "image1": "../pix/todo.gif",
  "image3": "",
  "color1": "#6aa895",
  "color3": "#000000",
  "hidden1": "hf1",
  "hidden3": "hf2",
  "json1": {
    "a": 1
  },
  "json3": {
    "a": 3,
    "b": 5
  }
},
{
  "name": "Test 2",
  "text1": "ggg",
  "text3": "",
  "lov1": "E",
  "lov3": "T",
  "list1": [
    "Z",
    "T",
    "G"
  ],
  "list3": [
    "h",
    "k"
  ],
  "lovicon1": "red",
  "lovicon3": "white",
  "textmultiline1": "gg",
  "textmultiline3": "",
  "html1": "gg",
  "html3": "",
  "date1": "2015-04-22",
  "date3": "2015-04-01",
  "time1": "14:22",
  "time3": "05:05",
  "datetime1": "2015-04-16T02:03",
  "datetime3": "2015-04-22T05:06",
  "integer1": 555,
  "integer3": 3,
  "decimal1": 45.45,
  "decimal3": 4.12,
  "money1": 54.99,
  "money3": 100,
  "boolean1": false,
  "boolean3": false,
  "email1": "gfgf@gfgf.com",
  "email3": "",
  "url1": "http://evolutility.com",
  "url3": "",
  "image1": "../pix/contact.gif",
  "image3": "",
  "color1": "#2c84bb",
  "color3": "#000000",
  "hidden1": "h1",
  "hidden3": "h2",
  "json1": {
    "a": 5
  },
  "json3": {
    "a": 4
  },
}];

if(typeof module === "object" && typeof module.exports === "object"){
    module.exports = uiModels.test_data;
}
