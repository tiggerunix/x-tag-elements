
## Syntax

The accordion operates by using a pairing of a html header tag ```h1-h6``` with an adjacent ```<section>``` tag.  The header tag acts as the toggler/click target.  To have a section open by default, set the ```selected``` attribute on the header.

```
<x-accordion>
	<h2>Section 1</h2>
	<section>
		Hello testing section 1
	</section>
	<h2 selected>Section 2</h2>
	<section>
		Hello testing section 2
	</section>
</x-accordion>
```

### Result
<x-accordion>
	<h2>Section 1</h2>
	<section>
		Hello testing section 1
	</section>
	<h2 selected>Section 2</h2>
	<section>
		Hello testing section 2
	</section>
</x-accordion>

### Events
When the active section is changed x-accordion will fire a ```selected``` event.

```
	document.getElementsByNames('x-accordion')[0].addEventListener('selected', function(e){
		// selected item changed
	});
```