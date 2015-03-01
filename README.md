#JSMenu

This is a jquery plugin for creating menus.
Syntax is very simple.
Just include 

	<script src="/js/jquery.js"></script>
	<script src="/js/menu.js"></script>
	<link rel="stylesheet" href="/css/menu.css" />
	
and call the functions like,
	
	var menu = $(menu_div_selector).setupMenu(menuObj);
	
Where,
	menu_div_selector is any valid CSS selector which will be replaced with the menu.
	menuObj is a JSON object representing the menu. 
	<pre>
		var menu = $("#top_menu_bar_1").setupMenu({
			'<img src="/img/cat.png">': {
				"About Me": {}
			},
			File: {
				_id: "fileMenu",
				New: {
					_callback: function (){
						console.log("Error")
					}
				},
				Open: {},
				_callback: function (){
					console.log("test")
				}
			}, 
			"Disabled": {
				_disabled: true,
				_callback: function (){
					alert("This wont be executed");
				},
				SubMenuItem: {}
			},
			Edit: {
				Cut: {
					_id: "cutMenuItem",
					_disabled: true,
					_callback: function (){
						alert("This wont be executed");
					}
				},
				Cut_2: {
					_disabled: true,
					Test: {
						Test: {},
						Test: {}
					}
				},
				'<div class="menu_icon" style="width: 32px; height: 32px"></div>': {
					"No extra width": {
						"<input type='text' style='width: 200px; margin-right: 15px; display: inline'/>": {
							_no_hover: true,
							_dont_hide_on_click: true,
							_no_extra_width: true
						},
						"This is a menu with custom html and no extra width and dont_hide_on_click": {
							_dont_hide_on_click: true,
							_no_extra_width: true
						}
					},
					"World<br/>Not<br/>Good": {
						Agree: {
							_callback: function (){
								alert("You clicked Agree");
							}
						},
						Disagree:  {
							_callback: function (){
								alert("You clicked Disagree");
							}
						}
					}
				},
				_: {},
				"Disable Cut": {
					_icon: "/img/dog.png",
					_id: "copyMenuItem",
					_dont_hide_on_click: true
				},
				"Enable Cut": {
					_id: "_callbackMenuItem",
					_dont_hide_on_click: true
				},
				_escaped: {
					_escaped: true
				},
				"Something Else": {
					_id: "someId",
					"Add Another Item":{
						_dont_hide_on_click: true,
						_callback: function (){
							$(this).addMenu({
								"Click to remove me": {
									_dont_hide_on_click: true,
									_callback: function (){
										$(this).removeMenu();
									}
								}
							});
						}
					},
					"Add Some Item":{
						_dont_hide_on_click: true,
						_callback: function (){
							$(this).addMenu({
								"Click to remove me": {
									_dont_hide_on_click: true,
									_callback: function (){
										$(this).removeMenu();
									}
								},
								"This is just dummy" : {},
								"This is just dummy" : {
									"Menu 5": {},
									"Menu 6": {},
									"Menu 7": {}
								}
							});
						}
					}
				}
			},
			'<img src="/img/dog.png">': {
				_position: "right",
				"Menu 8": {
					"Menu 9": {
						_no_hover: true	
					},
					"Menu 10": {},
					"Menu 11": {}
				},
				"Turn Off": {}
			},
			'<img src="/img/cat.png" alt="another">': {
				_position: "right",
				"Menu 8": {},
				"Turn Off": {}
			},
			"10:30 PM": {
				_position: "right",
				_no_hover: true
			}
		});
		$("#copyMenuItem").click(function (e){
			$("#cutMenuItem").disable();
		});
		$("#_callbackMenuItem").click(function (e){
			$("#cutMenuItem").enable();
		});
</pre>

#Options

* _id: 
* _callback
* _icon
* _disabled
* _no_hover
* _no_text
* _dont_hide_on_click
* _no_extra_width
* _escaped

#API

* setupMenu
* addMenu
* removeMenu
* disable
* enable