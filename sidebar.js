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
					self.state = 'hasOpened';
					self.currentOpendMenuContent = menuContentEl;
				} else {
					console.log('关闭' + self.currentOpendMenuContent.id);
					console.log('打开' + menuContentEl.id);
					self.state = 'hasOpened';
					self.currentOpendMenuContent = menuContentEl;
				};
			}, false);
		}
		//console.log(this.menuList);
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
		this.el.className="sideber-move-left";
		this.closeBarEl.className="closeBar-move-right";
		this.state = 'closed';
	};
	Sidebar.prototype.open = function() {
		console.log('打开')
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

