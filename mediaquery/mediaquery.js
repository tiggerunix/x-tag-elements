
(function(){
	
	var fireMatches = function(element, mql, attr, refresh){
			if (mql.matches) {
				var eventType = 'mediaqueryactive';
				element.setAttribute('matches', null);
			}
			else {
				var eventType = 'mediaqueryinactive';
				element.removeAttribute('matches');
			}
			if (!refresh) xtag.fireEvent(element, eventType, { 'query': mql });
			(attr || (element.getAttribute('for') || '').split(' ')).forEach(function(id){
				var node = document.getElementById(id);
				if (node) {
					xtag[(eventType == 'mediaqueryactive' ? 'add' : 'remove') + 'Class'](node, element.id);
					if (!refresh) xtag.fireEvent(node, eventType, { 'query': mql }, { bubbles: false });
				}
			});
		},
		attachQuery = function(element, query, attr, refresh){
			var query = query || element.getAttribute('media');
			if (query){
				if (element.xtag.query) element.xtag.query.removeListener(element.xtag.listener);
				var query = element.xtag.query = window.matchMedia(query),
					listener = element.xtag.listener = function(mql){
						fireMatches(element, mql);
					};
				fireMatches(element, query, attr, refresh);
				query.addListener(listener);
			}
		};
	
	xtag.register('x-mediaquery', {
		onCreate: function(){
			attachQuery(this);
		},
		getters: {
			'for': function(){
				return this.getAttribute('for');
			},
			'media': function(){
				return this.getAttribute('media');
			},
			'id': function(){
				return this.getAttribute('id');
			},
		},
		setters: {
			
			'media:attribute(media)': function(query){
				attachQuery(this, query);
			},
			'id:attribute(id)': function(id){
				var current = this.getAttribute('id');
				xtag.query(document, '.' + current).forEach(function(node){
					xtag.removeClass(node, current);
					xtag.addClass(node, id);
				});
			},
			'for:attribute(for)': function(value){
				var next = (value || '').split(' ');
				
				(this.getAttribute('for') || '').split(' ').map(function(id){
					var index = next.indexOf(id);
					if (index == -1){
						var element = document.getElementById(id);
						xtag.removeClass(element, this.id);
						xtag.fireEvent(element, 'mediaqueryremoved');
					}
					else next.splice(index, 1);
					
				}, this);
				
				attachQuery(this, element.getAttribute('media'), next, true);
			}
		}
	});
	
})();