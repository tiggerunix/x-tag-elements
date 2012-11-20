
## Syntax

```
<x-modal overlay>
	<p>Hello Hello from this modal</p>
</x-modal>
```


## Events

```
	var modal = document.getElementsByNames('x-modal')[0];
	modal.addEventListener('modalhide', function(e){
		// this event is thrown when ESC is pressed.  If you don't want this default behavior
		// you can prevent it like so.
		e.defaultPrevented = true;
	});

```

## Usage

```

	var modal = document.createElement('x-modal');
	modal.innerHTML = "<p>Wow it's easy to use this modal.</p>";
	modal.setAttribute('overlay',null);
	document.appendChild(modal);


```


