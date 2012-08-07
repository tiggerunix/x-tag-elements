
(function(){
	
	var toggle = function(element, on){
		xtag.query(element, 'x-dropdown menu[data-toggled]').forEach(function(menu){
			menu[(on ? 'add' : 'remove') + 'Attribute']('data-toggled');
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