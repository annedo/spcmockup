/* Helper Functions */
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

/* http://ejohn.org/projects/flexible-javascript-events/ */
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
/* End Borrowed script */

/* Initial Layout functions*/
function appendParts(){
	var metadata = '<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"><link rel="apple-touch-icon" sizes="180x180" href="img/icons/apple-touch-icon.png"><link rel="icon" type="image/png" sizes="32x32" href="img/icons/favicon-32x32.png"><link rel="icon" type="image/png" sizes="194x194" href="img/icons/favicon-194x194.png"><link rel="icon" type="image/png" sizes="192x192" href="img/icons/android-chrome-192x192.png"><link rel="icon" type="image/png" sizes="16x16" href="img/icons/favicon-16x16.png"><link rel="manifest" href="img/icons/site.webmanifest"><link rel="mask-icon" href="img/icons/safari-pinned-tab.svg" color="#b91d47"><link rel="shortcut icon" href="img/icons/favicon.ico"><meta name="apple-mobile-web-app-title" content="Melanie Nguyen Photography"><meta name="application-name" content="Melanie Nguyen Photography"><meta name="msapplication-TileColor" content="#b91d47"><meta name="msapplication-config" content="img/icons/browserconfig.xml"><meta name="theme-color" content="#ffffff"><!--[if lt IE 9]><script src="js/html5shiv.js"></script><![endif]-->';

	var headercontents='<div class="header__logo"><a href="index.html"><img alt="Melanie Nguyen Photography Home" class="logo--img" src="img/wwlogo.png"></a></div><nav class="header__nav"><div id="MenuToggle" class="nav--mobile menu--show"><a class="menu--link" href="#">MENU</a></div><ul id="ToggledMenu" class="nav__mainmenu menu--hide"><li class="menu__item"><a class="menu--link" href="news_archive.html">Latest News</a></li><li class="menu__item"><a class="menu--link" href="about.html">About</a></li><li class="menu__item submenu__toggle"><a class="menu--link" href="#">Art</a><ul class="menu__submenu menu--hide submenu--art"><li class="submenu__item"><a class="submenu--link" href="portfolio.html">Portfolio</a></li><li class="submenu__item"><a class="submenu--link" href="gallery.html">Full Gallery</a></li><li class="submenu__item"><a class="submenu--link" href="prints.html">Buy Prints</a></li></ul></li><li class="menu__item submenu__toggle"><a class="menu--link" href="#">Contact</a><ul class="menu__submenu menu--hide submenu--contact"><li class="submenu__item"><a class="submenu--link" href="contact.html#EmailForm">Email Form</a></li><li class="submenu__item"><a class="submenu--link" href="contact.html#Calendar">Local Bookings</a></li></ul></li></ul></nav>';

	var footercontents ='<div class="footer__sitecontents"><h2>Site Contents</h2><ul class="sitecontents__social"><li><a href="#" class="fa fa-instagram"></a></li><li><a href="#" class="fa fa-twitter"></a></li><li><a href="#" class="fa fa-facebook"></a></li></ul></div><nav class="footer__nav"><ul class="nav__mainmenu"><li class="menu__item"><h3><a class="menu--link" href="index.html">Home</a></h3></li><li class="menu__item"><h3><a class="menu--link" href="news/2018-04-01-SPC.html">Latest News</a></h3><ul><li><a class="menu--link" href="news_archive.html">Archives</a></li></ul></li><li class="menu__item"><h3><a class="menu--link" href="about.html">About</a></h3></li><li class="menu__item"><h3><a class="menu--link" href="#footer">Art</a></h3><ul><li><a class="menu--link" href="portfolio.html">Portfolio</a></li><li><a class="menu--link" href="gallery.html">Full Gallery</a></li><li><a class="menu--link" href="prints.html">Buy Prints</a></li></ul></li><li class="menu__item"><h3><a class="menu--link" href="contact.html">Contact</a></h3><ul><li><a class="menu--link" href="contact.html#EmailForm">Email Form</a></li><li><a class="menu--link" href="contact.html#Calendar">Local Bookings</a></li></ul></li></ul></nav>';

	var head = document.head;
	var header = getID('header');
	var footer = getID('footer');
	
	var partContents = [metadata, headercontents, footercontents];
	var partElements = [head, header, footer];
	
	for (var i = 0; i < partElements.length; i++) {
		var temp = document.createElement('div');
		temp.innerHTML = partContents[i];

		while (temp.firstChild) {
			partElements[i].appendChild(temp.firstChild);
		}
	}

	appendPartsRan = true;
}
var appendPartsRan = false;
appendParts();

/* Navigation Page Functions - Must occur after header/footer loads!*/
if (appendPartsRan) {

	/* Nav Menu Scripts */
	var viewWidth = window.innerWidth;
	var menuToggle = getID("MenuToggle");
	var mainMenu = getID("ToggledMenu");
	var subMenuToggles = document.getElementsByClassName("submenu__toggle");
	var subMenus = document.getElementsByClassName("menu__submenu");

	addEvent(menuToggle, "click", toggleMenu);

	for (var i = 0; i < subMenuToggles.length; i++) {
		addEvent(subMenuToggles[i], "click", toggleSubmenu);
	}

	addEvent(window, "resize", navDisplay);
	addEvent(window, "load", navDisplay);
	navDisplay();

	/* Carousel Scripts */
	var leftArrow = getID("LeftArrow");
	var rightArrow = getID("RightArrow");
	var fullImgContainer = getID("Fullview");
	var fullImg = getID("FullImg");

	var portfolioImgs = document.getElementsByClassName('img');

	for (var i = 0; i < portfolioImgs.length; i++) {
		addEvent(portfolioImgs[i], 'click', showFullImg);
	}

	function showFullImg() {
		replaceClassName(fullImgContainer, 'hide', 'show')
	}

	//addEvent(leftArrow, "click", prevImg);
	//addEvent(rightArrow, "click", nextImg);


	/* Move footer to bottom of client if browser height larger than body height */
	var viewHeight = window.innerHeight;
	var footer = getID('footer');
	var body = document.getElementsByTagName('body')[0];

	footer.className = footer.className + " " + "footer--regheight";
	addEvent(window, "resize", adjustFooter);
	addEvent(window, "load", adjustFooter);
	adjustFooter();

	function adjustFooter() {
		viewHeight = window.innerHeight;
		if (viewHeight < body.clientHeight) {
			if (hasClassName(footer, 'footer--shiftheight')) {
				replaceClassName(footer, 'footer--shiftheight', 'footer--regheight');
				console.log("Put footer in flow");
			}
		}
		else if (viewHeight >= body.clientHeight) {
			if (hasClassName(footer, 'footer--regheight')) {
				replaceClassName(footer, 'footer--regheight', 'footer--shiftheight');
				console.log("Took footer out of flow");
			}
		}
	}

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
};