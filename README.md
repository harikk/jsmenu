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
	<pre><code>
		var menu = $("#top_menu_bar_1").setupMenu({
			Label: {
				option: "value",
				sub_menu: {}
			}
		});
</code></pre>

	##for more detailed example look example.html

#Options

* _id: assigns ID for the menu item
* _callback: click handler for the menu item
* _icon: Icon for menu item
* _disabled: disables the menu item if it is true
* _no_hover: disable hover effect for menu item.
* _no_text: removes text for menu item.
* _dont_hide_on_click: Menu will not be hidden even after clicking an item with this option true
* _no_extra_width : No extra width will be added to the end of menu item.
* _escaped: This attribute allows usage of other options as text of menu.

#API

* setupMenu: Initialize the menu by adding the elements.
* addMenu: Add another menus dynamically to the inited menu.
* removeMenu: remove menus from initialized menus.
* disable: Disables the menu item.
* enable: Enables the menu item.