(function() {
	var Menuber = function() {
		this.el = document.querySelector('#sidebar ul');
		this.state = 'allClosed';
		this.el.addEventListener('click', function(event) {
			event.stopPropagation();
		}, false);
		var self = this;
		this.currentOpendMenuContent = null;
		this.menuList = document.querySelectorAll('#sidebar ul > li');
		for (var i = 0; i < this.menuList.length; i++) {
			this.menuList[i].addEventListener('click', function(event) {
				var menuContentEl = document.getElementById(event.currentTarget.id + '-content');
				if (self.state === 'allClosed') {
					console.log('打开' + menuContentEl.id);
					menuContentEl.style.top = '0';
					menuContentEl.style.left = '-85px';
					menuContentEl.className = 'nav-content';
					menuContentEl.classList.add('menuContent-move-right');
					self.state = 'hasOpened';
					self.currentOpendMenuContent = menuContentEl;
				} else {
					console.log('关闭' + self.currentOpendMenuContent.id);
					self.currentOpendMenuContent.className = 'nav-content';
					self.currentOpendMenuContent.style.top = '0';
					self.currentOpendMenuContent.style.left = '35px';
					self.currentOpendMenuContent.classList.add('menuContent-move-left');
					console.log('打开' + menuContentEl.id);
					menuContentEl.className = 'nav-content';
					menuContentEl.style.top = '250px';
					menuContentEl.style.left = '35px';
					menuContentEl.classList.add('menuContent-move-up');
					self.state = 'hasOpened';
					self.currentOpendMenuContent = menuContentEl;
				};
			}, false);
		}
		this.menuContentList = document.querySelectorAll('.nav-content > div.nav-con-close');
		for (var i = 0; i < this.menuContentList.length; i++) {
			this.menuContentList[i].addEventListener('click', function(event) {
				var menuContent = event.currentTarget.parentNode;
				menuContent.className = 'nav-content';
				menuContent.style.top = '0';
				menuContent.style.left = '35px';
				menuContent.classList.add('menuContent-move-left');
				self.state = 'allClosed'
			}, false);
		}
	};



	var Sidebar = function(eId, closeBarId) {

		this.state = 'opened';
		this.el = document.getElementById(eId || 'sidebar');
		this.closeBarEl = document.getElementById(closeBarId || 'closebar');
		var self = this;
		this.menuber = new Menuber();
		this.el.addEventListener('click', function(event) {
			if (event.target !== self.el) {
				self.triggerSwict();
			}
		}, false);
	};
	Sidebar.prototype.close = function() {
		console.log('关闭')
		if(this.menuber.currentOpendMenuContent){
			this.menuber.currentOpendMenuContent.className = 'nav-content';
			this.menuber.currentOpendMenuContent.style.top = '0';
			this.menuber.currentOpendMenuContent.style.left = '35px';
			this.menuber.currentOpendMenuContent.classList.add('menuContent-move-left');
			this.menuber.state = 'allClosed'
		}
		this.el.className = "sideber-move-left";
		this.closeBarEl.className = "closeBar-move-right";
		this.state = 'closed';
		console.log()
	};
	Sidebar.prototype.open = function() {
		console.log('打开')
		this.el.style.left = '-120px'
		this.el.className = "sideber-move-right";
		this.closeBarEl.style.left = '160px'
		this.closeBarEl.className = "closeBar-move-left";
		this.state = 'opened';
	};
	Sidebar.prototype.triggerSwict = function() {
		if (this.state === 'opened') {
			this.close();
		} else {
			this.open();
		};
	};
	var sidebar = new Sidebar();
})();