
(function(){
	
	var toggle = function(element, on){
		xtag.query(element, 'x-dropdown menu[selected]').forEach(function(menu){
			menu[(on ? 'set' : 'remove') + 'Attribute']('selected');
		});
	};
	
	document.addEventListener('click', function(event) {
		var dropdowns = xtag.query(document, 'x-dropdown'),
			innerclick = dropdowns.some(function(dropdown){
				return event.target == dropdown || dropdown.contains(event.target);
			});
		if (!innerclick) toggle(document);
	});

	xtag.register('x-dropdown', {
		events: {
			'tap:delegate(label)': function(){
				var menu = this.nextElementSibling;
				if (menu && menu.tagName == 'MENU') menu[(menu.hasAttribute('selected') ? 'remove' : 'set') + 'Attribute']('selected', null);
			}
		},
		methods: {
			'expand': function(){
				toggle(this, true);
			},
			'collapse': function(){
				toggle(this);
			}
		}
	});

})();