
(function(){
	
	var dragElement = null,
		makeDraggable = function(element){
			xtag.toArray(element.children).forEach(function(item){
				item.setAttribute('draggable', true);
			});
		};

	xtag.register('x-dragbox', {
		onCreate: function(){
			var self = this;
			makeDraggable(this);
			xtag.observe(this, function(element){
				if (element.parentNode == self) makeDraggable(self);
			});
		},
		events: {
			dragstart: function(event){
				if (event.target.parentNode == this){
					xtag.addClass(event.target, 'x-dragbox-drag-origin');
					dragElement = this;
					event.dataTransfer.effectAllowed = 'move';
					event.dataTransfer.setData('text/html', this.innerHTML);
				}
			},
			dragenter: function(event){
				if (this != event.target) xtag.addClass(event.target, 'x-dragbox-drag-over');
			},
			dragover: function(event){
				if (event.preventDefault) event.preventDefault();
				event.dataTransfer.dropEffect = 'move'; 
				return false;
			},
			dragleave: function(event){
				xtag.removeClass(event.target, 'x-dragbox-drag-over');
			},
			dragdrop: function(event){
				if (event.stopPropagation) event.stopPropagation();
				if (dragElement != this) {
					dragElement.innerHTML = this.innerHTML;
					this.innerHTML = event.dataTransfer.getData('text/html');
				}
				xtag.removeClass(event.target, 'x-dragbox-drag-over');
				return false;
			},
			dragend: function(event){
				xtag.removeClass(event.target, 'x-dragbox-drag-origin');
			}
		}
	});

})();