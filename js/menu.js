$(function (){
	var _menu_visible = false;
	
	var _init_menu = function (thisObj){
		var menuItemClick = function() {
			_menu_visible = false;
			$(".sub_menu").fadeOut('fast'); 
			$(".top_menu").removeClass("menu_hover");
		};
	
		$(thisObj).addClass("top_menu_bar");
		$(".sub_menu").addClass("gradient");
		$(".sub_menu").addClass("bottom_curve");
		$(".sub_menu").addClass("shadow");
		$(thisObj).addClass("gradient");
		$(thisObj).addClass("bottom_curve");
		$(thisObj).addClass("shadow");
		
		$("html").click(function (e){
			menuItemClick();
		});		
		$(".top_menu", thisObj).click(function (e){
			_menu_visible = true;
			var element = $(this).find(".sub_menu:first");
			if (element.length > 0){
				_showMenu(element);
			}
			e.stopPropagation();
		});
		$(".top_menu", thisObj).mouseenter(function (e){
			$(".top_menu").removeClass("menu_hover");
			$(this).addClass("menu_hover");
			if (_menu_visible == true){
				$(".sub_menu").not($(this).find(">ul")).fadeOut('fast'); 
				var element = $(this).find(".sub_menu:first");
				_showMenu(element);
			}
			e.stopPropagation();
		});
		$(".top_menu", thisObj).mouseleave(function (e){
			if (!$(this).parent().find(".sub_menu").is(":visible")){
				$(".top_menu").removeClass("menu_hover");
			}
			e.stopPropagation();
		});
		$(".menu_item", thisObj).mouseenter(function (e){
			var item = this;
			$(".menu_item").filter(function (idx, obj){
				if (obj.contains(item)){
					return false;
				}
				return true;
			}).removeClass("menu_hover");
			$(this).addClass("menu_hover");
			var submenu = $(this).find(".sub_menu:first");
			$(this).parent().find("ul:visible").not($(this).find("ul:visible")).fadeOut('fast');
			if (submenu.children().length > 0){
				var thisPos = $(this).position();
				submenu.css({top: thisPos.top, left: thisPos.left + $(this).parent().width()});
				_showMenu(submenu);
			}
			e.stopPropagation();
		});
		$(".menu_item", thisObj).click(function (e){
			if ($(this).find(".sub_menu").length == 0 && !$(this).hasClass("disabled_menu") && !$(this).hasClass("dont_hide")){
				menuItemClick();
			}
			e.stopPropagation();
		});
		$(".sub_menu", thisObj).mouseenter(function (e){
			e.stopPropagation();
		});
		$(".sub_menu", thisObj).mouseleave(function (e){
			e.stopPropagation();
		});
	}
	var _showMenu = function (menu){
		menu.children().removeClass("menu_hover");
		if (menu.parent().hasClass("disabled_menu")){
			return;
		}
		menu.show();
		menu.find("input").focus();
		var labelWidth = Math.max.apply(Math, menu.find("> li > a").map(function (){
			return $(this).width(); 
		}).get());
		
		if (menu.find(">.no_extra_width").length == 0){
			menu.width(labelWidth + 90);
		}
		
		var closest = menu.closest(".rightMenu");
		if (closest.length > 0){
			if (menu.parent().hasClass("sub_menu_holder")){
				//menu.css("left", menu.parent().position().left - menu.width() + menu.parent().width());
				//menu.css("right", menu.parent().position().right);
				//menu.css("right",  menu.parent().position().left - menu.parent().width());
				menu.css("left", menu.parent().position().left - menu.width() + menu.parent().width() + 14);
			} else {
				menu.offset({left: menu.parent().offset().left - menu.width()});
			}
		}
		var arrows = menu.find(".menu_arrow:visible");
		for (var i = 0; i < arrows.length; i++){
			var parent = $(arrows[i]).parent().parent();
			$(arrows[i]).css("top", parent.position().top);
			$(arrows[i]).css("height", parent.height());
		}
	}
	var _process_menu_item = function (root, sub_menu){
		if (sub_menu._escaped == "false" || sub_menu._escaped == false || sub_menu._escaped == undefined){
			if (typeof sub_menu._callback == "function"){
				var callback = sub_menu._callback;
				var clickFn = function (e){
					if ($(this).closest(".disabled_menu").length == 0){
						callback.call(this, e);
					}
				};
				if (root.find(".top_menu").length > 0) {
					root.find("a").bind("click", clickFn);
				} else {
					root.bind("click", clickFn);
				}
				delete sub_menu._callback;
			}
			if (sub_menu._dont_hide_on_click == true || sub_menu._dont_hide_on_click == "true"){
				root.addClass("dont_hide");
				delete sub_menu._dont_hide_on_click;
			}
			if (sub_menu._no_extra_width == true || sub_menu._no_extra_width == "true"){
				root.addClass("no_extra_width");
				delete sub_menu._no_extra_width;
			}
			
			if (sub_menu._no_text == true || sub_menu._no_text == "true"){
				root.find("a").html("&nbsp;");
			}
			delete sub_menu._no_text;
			
			if (typeof sub_menu._icon == "string"){
				root.append('<img src="' + sub_menu._icon + '">');
				delete sub_menu._icon;
			}
			if (typeof sub_menu._id == "string"){
				root.attr("id", sub_menu._id);
				delete sub_menu._id;
			}
			if (sub_menu._disabled == true || sub_menu._disabled == "true"){
				root.addClass("disabled_menu");
				delete sub_menu._disabled;
			}
			if (sub_menu._no_hover == true || sub_menu._no_hover == "true"){
				root.addClass("no_hover");
				delete sub_menu._no_hover;
			}
		} else {
			if (sub_menu._escaped == "true" || sub_menu._escaped == true){
				delete sub_menu._escaped;
			}
		}
		if (!$.isEmptyObject(sub_menu)){
			if (typeof sub_menu == "object"){
				return _fillsub_menus(root, sub_menu);
			}
		}
	};
	var _fillsub_menus = function (parent, sub_menu_items){
		var root = parent.find(">ul");
		if (root.length == 0){
			root = $('<ul class="sub_menu"></ul>');
			parent.append(root);
			if (parent.hasClass("top_menu") == false){
				parent.find("a").append('<span class="menu_arrow"></span>');
			}
		}
		for (var menu in sub_menu_items) {
			if (sub_menu_items.hasOwnProperty(menu)) {
				if (menu == "_"){
					root.append("<hr />");
				} else {
					var menuItem = $('<li class="menu_item"><a>'+menu+'</a></li>');
					root.append(menuItem);
					_process_menu_item(menuItem, sub_menu_items[menu]);
				}
			}
		}
		return root;
	};
	$.fn.extend({
		setupMenu: function (menuObj){
			var rootMenu = $('<ul class="main_menu_bar"><div class="leftMenu"></div><div class="rightMenu" style="float: right"></div></ul>');
			$(this).append(rootMenu);
			for (var menu in menuObj) {
				if (menuObj.hasOwnProperty(menu)) {
					var subroot = $('<li class="sub_menu_holder top_menu"><a>' +menu+ "</a></li>");
					if (menuObj[menu]._position == "right"){
						rootMenu.find(".rightMenu").append(subroot);
					} else {
						rootMenu.find(".leftMenu").append(subroot);
					}
					if (menuObj[menu]._disabled == true || menuObj[menu]._disabled == "true"){
						subroot.addClass("disabled_menu");
						delete menuObj[menu]._disabled;
					} 
					delete menuObj[menu]._position;
					_process_menu_item(subroot, menuObj[menu]);
				}
			}
			_init_menu(this);
			return rootMenu;
		},
		addMenu: function(menuObj){
			var menu = _process_menu_item(this, menuObj);
			_init_menu(menu);
			_showMenu(this.parent());
			return menu;
		},
		removeMenu: function () {
			if (this.siblings().length  == 0){
				this.parent().parent().find(">a .menu_arrow").remove()
				this.parent().remove();
			} else {
				var parent = this.parent();
				this.remove();
				_showMenu(parent);
			}
		},
		disable: function (){
			this.addClass("disabled_menu")
		},
		enable: function (){
			this.removeClass("disabled_menu")
		}
	});
});

