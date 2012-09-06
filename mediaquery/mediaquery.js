
(function(){
	
	var fireChildren = function(element, mql){
			var eventType = mql.matches ? 'mediaqueryactive' : 'mediaqueryinactive';
			element.setAttribute('matches', mql.matches);
			xtag.fireEvent(element, eventType, { 'query': mql });
			xtag.toArray(element.children).forEach(function(node){
				xtag.fireEvent(node, eventType, { 'query': mql }, { bubbles: false });
			});
		},
		attachQuery = function(element, query){
			var query = query || element.getAttribute('media');
			if (query){
				if (element.xtag.query) element.xtag.query.removeListener(element.xtag.listener);
				var query = element.xtag.query = window.matchMedia(query),
					listener = element.xtag.listener = function(mql){
						fireChildren(element, mql);
					};
				fireChildren(element, query);
				query.addListener(listener);
			}
		};
	
	xtag.register('x-mediaquery', {
		onCreate: function(){
			attachQuery(this);
		},
		getters: {
			'media': function(){
				return this.getAttribute('media');
			}
		},
		setters: {
			'media:attribute(media)': function(query){
				attachQuery(this, query);
			}
		}
	});
	
})();