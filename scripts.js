function getID(id) {
	return document.getElementById(id);
}

function hasClassName(obj, query) {
  if (obj.className.match(query) !== null) {
    return true;
  }
  else {
    return false;
  }
}

function replaceClassName(obj, old, replacement) {
  if (obj.className.match(old) !== null) {
    obj.className = obj.className.replace(old, replacement);
  }
}

function addClassName(obj, strClass) {
  obj.className += " " + strClass;
}

//http://ejohn.org/projects/flexible-javascript-events/
function addEvent( obj, type, fn ) {
  if ( obj.attachEvent ) {
    obj["e"+type+fn] = fn;
    obj[type+fn] = function() { obj["e"+type+fn]( window.event );};
    obj.attachEvent( "on"+type, obj[type+fn] );
  } 
  else{
    obj.addEventListener( type, fn, false );  
  }
}

var viewWidth = window.innerWidth;
var menuToggle = getID("MenuToggle");
var mainMenu = getID("ToggledMenu");
var subMenuToggles = document.getElementsByClassName("submenu__toggle");
var subMenus = document.getElementsByClassName("menu__submenu");
var leftArrow = getID("LeftArrow");
var rightArrow = getID("RightArrow");
var carouselWindow = document.querySelector(".carousel");
var carouselStrip = document.querySelector(".carousel__strip");
var carouselItems = document.getElementsByClassName("carousel__item");

carouselStrip.setAttribute("style", "bottom:0px");
var stripPosition = carouselStrip.style.bottom;
var stripPosFloat = parseFloat(stripPosition.substring(0, stripPosition.length - 2));
var currCarouselIndex = 0;

addEvent(menuToggle, "click", toggleMenu);

for (var i = 0; i < subMenuToggles.length; i++) {
	addEvent(subMenuToggles[i], "click", toggleSubmenu);
}

addEvent(leftArrow, "click", prevImg);
addEvent(rightArrow, "click", nextImg);
addEvent(window, "resize", sizeCarousel);
addEvent(window, "resize", navDisplay);
addEvent(window, "load", navDisplay);
addEvent(window, "load", sizeCarousel);


function toggleMenu() {
	if (hasClassName(mainMenu, "menu--hide")) {
		replaceClassName(mainMenu, "menu--hide", "menu--show");

		for (var i = 0; i < subMenus.length; i++) {
			replaceClassName(subMenus[i], "menu--show", "menu--hide");
		}
	} else {
		replaceClassName(mainMenu, "menu--show", "menu--hide");
		for (var j = 0; j < subMenus.length; j++) {
			replaceClassName(subMenus[j], "menu--show", "menu--hide");
		}
	}
}

function toggleSubmenu() {
	for (var i = 0; i < subMenuToggles.length; i++) {
		if (subMenuToggles[i] == this) {
			if (hasClassName(subMenus[i], "menu--hide")){
				replaceClassName(subMenus[i], "menu--hide", "menu--show");
			}
			else {
				replaceClassName(subMenus[i], "menu--show", "menu--hide");
			}
		}
	}
	/*if (hasClassName(this, "menu--hide")) {
		replaceClassName(subMenu, "menu--hide", "menu--show");
	} else {
		replaceClassName(subMenu, "menu--show", "menu--hide");
	}*/
}

function navDisplay() {
	viewWidth = window.innerWidth;
	if (viewWidth > 768) {
		replaceClassName(menuToggle, "menu--show", "menu--hide");
		for (var i = 0; i < subMenuToggles.length; i++) {
			replaceClassName(subMenuToggles[i], "menu--show", "menu--hide");
		}
		
		replaceClassName(mainMenu, "menu--hide", "menu--show");
	} 
	else {
		replaceClassName(menuToggle, "menu--hide", "menu--show");

		for (var j = 0; j < subMenuToggles.length; j++) {
			replaceClassName(subMenuToggles[j], "menu--show", "menu--hide");
		}
		
		replaceClassName(mainMenu, "menu--show", "menu--hide");
	}
}

function sizeCarousel() {
	carouselWindow.setAttribute("style", "height: " + carouselItems[currCarouselIndex].getBoundingClientRect().height + "px");
	carouselStrip.setAttribute("style", "bottom:" + (carouselItems[currCarouselIndex].getBoundingClientRect().height * currCarouselIndex) + "px");
}

function prevImg() {
	if (currCarouselIndex > 0) {
		currCarouselIndex -= 1;
		carouselWindow.setAttribute("style", "height: " + carouselItems[currCarouselIndex].getBoundingClientRect().height + "px");
		stripPosFloat = 0;
		for (var i = 0; i < currCarouselIndex; i++) {
			stripPosFloat += carouselItems[i].getBoundingClientRect().height;
		}
		carouselStrip.setAttribute("style", "bottom:" + (stripPosFloat + "px"));
		
	}
}

function nextImg() {
	if (currCarouselIndex < carouselItems.length-1) {
		currCarouselIndex += 1;
		carouselWindow.setAttribute("style", "height: " + carouselItems[currCarouselIndex].getBoundingClientRect().height + "px");
		stripPosFloat = 0;
		for (var i = 0; i < currCarouselIndex; i++) {
			stripPosFloat += carouselItems[i].getBoundingClientRect().height;
		}
		carouselStrip.setAttribute("style", "bottom:" + (stripPosFloat + "px"));
		
	}
}