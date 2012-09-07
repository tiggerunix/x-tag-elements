
(function(){
	
	var hlevels = 'h1, h2, h3, h4, h5, h6',
		select = function(heading){
			xtag.query(heading.parentNode, hlevels).forEach(function(el){
				el[(el == heading ? 'set' : 'remove') + 'Attribute']('selected', null);
			});
			xtag.fireEvent(heading, 'selected');
		};

	xtag.register('x-accordion', {
		onCreate: function(){
			var selected = xtag.queryChildren(this, '[selected]')[0];
			if (selected) select(selected);
		},
		events: {
			'click:touch:delegate(h1, h2, h3, h4, h5, h6)': function(event, accordion){
				if (this.parentNode == accordion) select(this);
			},
			'keydown:delegate(h1, h2, h3, h4, h5, h6)': function(event, accordion){
				if (this.parentNode == accordion) switch(event.keyCode) {
					case 13: select(this); break;
					case 37: accordion.selectPrevious(); break;
					case 39: accordion.selectNext(); break;
				}
			}
		},
		methods: {
			getSelectedIndex: function(){
				return xtag.queryChildren(this, hlevels).indexOf(xtag.queryChildren(this, '[selected]')[0]);
			},
			getSelected: function(){
				return xtag.queryChildren(this, '[selected]')[0];
			},
			setSelected: select,
			selectNext: function(){
				var headings = xtag.query(this, hlevels);
				if (headings[0]) select(headings[this.getSelectedIndex() + 1] || headings[0]);
			},
			selectPrevious: function(){
				var headings = xtag.query(this, hlevels);
				if (headings[0]) select(headings[this.getSelectedIndex() - 1] || headings.pop());
			}
		}
	});
	
})();
