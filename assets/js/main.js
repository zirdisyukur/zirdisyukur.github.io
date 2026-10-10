/*
	Prologue by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	var	$window = $(window),
		$body = $('body'),
		$nav = $('#nav');

	// Breakpoints.
		breakpoints({
			wide:      [ '961px',  '1880px' ],
			normal:    [ '961px',  '1620px' ],
			narrow:    [ '961px',  '1320px' ],
			narrower:  [ '737px',  '960px'  ],
			mobile:    [ null,     '736px'  ]
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Nav.
		var $nav_a = $nav.find('a');
		var $researchTopics = $('#research-subnav');
		var $researchLink = $('#portfolio-link');

		function setResearchTopicsVisible(visible) {
			$researchTopics.prop('hidden', !visible);
			$researchLink.attr('aria-expanded', visible ? 'true' : 'false');
		}

		$nav_a
			.addClass('scrolly')
			.on('click', function(e) {

				var $this = $(this);
				var href = $this.attr('href');

				if (href === '#portfolio' || (href.charAt(0) === '#' && $this.closest('#research-subnav').length > 0))
					setResearchTopicsVisible(true);
				else
					setResearchTopicsVisible(false);

				// External link? Bail.
					if (href.charAt(0) != '#')
						return;

				// Prevent default.
					e.preventDefault();

				// Deactivate all links.
					$nav_a.removeClass('active');

				// Activate link *and* lock it (so Scrollex doesn't try to activate other links as we're scrolling to this one's section).
					$this
						.addClass('active')
						.addClass('active-locked');

			})
			.each(function() {

				var	$this = $(this),
					id = $this.attr('href');

				// Only in-page links map to sections in this document.
					if (id.charAt(0) != '#')
						return;

				var $section = $(id);

				// No section for this link? Bail.
					if ($section.length < 1)
						return;

				// Scrollex.
					$section.scrollex({
						mode: 'middle',
						top: '-10vh',
						bottom: '-10vh',
						initialize: function() {

							// Deactivate section.
								$section.addClass('inactive');

						},
						enter: function() {

							// Activate section.
								$section.removeClass('inactive');
								setResearchTopicsVisible($section.closest('section').attr('id') === 'portfolio');

							// No locked links? Deactivate all links and activate this section's one.
								if ($nav_a.filter('.active-locked').length == 0) {

									$nav_a.removeClass('active');
									$this.addClass('active');

								}

							// Otherwise, if this section's link is the one that's locked, unlock it.
								else if ($this.hasClass('active-locked'))
									$this.removeClass('active-locked');

						}
					});

			});

		// Opening a topic from the sidebar should reveal its project content.
			$('#research-subnav a[href^="#"]').on('click', function() {
				var $project = $($(this).attr('href'));
				if ($project.is('details'))
					$project.prop('open', true);
			});

	// Scrolly.
		$('.scrolly').scrolly();

	// Research photo gallery.
		var $gallery = $('#research-gallery');
		if ($gallery.length) {
			var galleryPhotos = [
				{ src: 'images/research-gallery-01.jpg', description: 'RF Magnetometer embedded in magnetic shielding' },
				{ src: 'images/research-gallery-02.jpg', description: 'RF Magnetometer with a close up on RF excitation coils and detuning coils' },
				{ src: 'images/research-gallery-03.jpg', description: 'Magnetic shield for magnetometer characterisation' },
				{ src: 'images/research-gallery-04.jpg', description: 'Magnetic shield for magnetometer characterisation' },
				{ src: 'images/research-gallery-05.jpg', description: 'Optical table for the hybrid pumping experiment ' },
				{ src: 'images/research-gallery-06.jpg', description: 'Blurry photo of me in the lab :o' },
				{ src: 'images/research-gallery-07.jpg', description: 'Blurry photo of my messy desk at Q.InC' },
				{ src: 'images/research-gallery-08.jpg', description: 'Blurry photo of my last day at Q.InC' }
			];
			var galleryOrder = galleryPhotos.map(function(photo, index) { return index; });
			for (var i = galleryOrder.length - 1; i > 0; i--) {
				var swapIndex = Math.floor(Math.random() * (i + 1));
				var currentIndex = galleryOrder[i];
				galleryOrder[i] = galleryOrder[swapIndex];
				galleryOrder[swapIndex] = currentIndex;
			}
			var galleryPosition = 0;
			var galleryTimer;
			var $galleryImages = [$('#research-gallery-image-a'), $('#research-gallery-image-b')];
			var activeGalleryImage = 0;
			var $galleryDescription = $('#research-gallery-description');

			function showGalleryPhoto(position) {
				galleryPosition = (position + galleryOrder.length) % galleryOrder.length;
				var photo = galleryPhotos[galleryOrder[galleryPosition]];
				var nextGalleryImage = 1 - activeGalleryImage;
				$galleryImages[nextGalleryImage].attr('src', photo.src);
				window.requestAnimationFrame(function() {
					$galleryImages[nextGalleryImage].addClass('is-active');
					$galleryImages[activeGalleryImage].removeClass('is-active');
					activeGalleryImage = nextGalleryImage;
				});
				$galleryDescription.text(photo.description);
			}

			function startGallery() {
				window.clearInterval(galleryTimer);
				galleryTimer = window.setInterval(function() {
					showGalleryPhoto(galleryPosition + 1);
				}, 10000);
			}

			showGalleryPhoto(0);
			startGallery();
			$('#research-gallery-prev').on('click', function() {
				showGalleryPhoto(galleryPosition - 1);
				startGallery();
			});
			$('#research-gallery-next').on('click', function() {
				showGalleryPhoto(galleryPosition + 1);
				startGallery();
			});
		}

	// Publications and reports viewer.
		var $publicationTiles = $('.publication-tile');
		var $publicationDialog = $('#publication-dialog');
		$('.catalogue-card').each(function() {
			var $card = $(this);
			var tags = ($card.attr('data-tags') || '').split(',').filter(Boolean);
			var $badges = $card.find('.publication-tile-tags').first().empty();
			if (!tags.length) {
				$badges.hide();
				return;
			}
			tags.forEach(function(tag) { $badges.append($('<span class="publication-tag"></span>').text(tag)); });
		});
		if ($publicationTiles.length && $publicationDialog.length) {
			var publicationIndex = 0;
			var publicationZoom = 100;
			var $activePublicationTiles = $();

			function showPublication(index) {
				publicationIndex = (index + $activePublicationTiles.length) % $activePublicationTiles.length;
				var $tile = $activePublicationTiles.eq(publicationIndex);
				var title = $tile.attr('data-title');
				var description = $tile.attr('data-description');
				var date = $tile.attr('data-date');
				var dateLabel = $tile.attr('data-date-label');
				var media = $tile.attr('data-media');
				var kind = $tile.attr('data-kind');
				var group = $tile.attr('data-group');
				var originalUrl = $tile.attr('data-original-url') || media;
				var originalLabel = $tile.attr('data-original-label') || 'Open original file';
				var $media = $('#publication-dialog-media').empty();
				$('#publication-dialog-content').toggleClass('is-side-by-side', group === 'other' && kind === 'image');
				publicationZoom = 100;

				$('#publication-dialog-title').text(title);
				$('#publication-dialog-description').text(description);
				$('#publication-dialog-date').attr('datetime', date).text(dateLabel);
				$('#publication-dialog-download').attr('href', originalUrl).text(originalLabel);
				var $dialogTags = $('#publication-dialog-tags').empty();
				($tile.attr('data-tags') || '').split(',').filter(Boolean).forEach(function(tag) {
					$dialogTags.append($('<span class="publication-tag"></span>').text(tag));
				});

				if (kind === 'image') {
					var $zoomControls = $('<div class="publication-zoom-controls" aria-label="Image zoom controls"></div>');
					var $zoomOut = $('<button type="button" aria-label="Zoom out">−</button>');
					var $zoomReset = $('<button type="button" aria-label="Reset zoom">Reset zoom</button>');
					var $zoomIn = $('<button type="button" aria-label="Zoom in">+</button>');
					var $imageViewport = $('<div class="publication-image-viewport" tabindex="0"></div>');
					var $image = $('<img class="publication-media-image" alt="" />').attr('src', media);
					$zoomControls.append($zoomOut, $zoomReset, $zoomIn);
					$imageViewport.append($image);
					$media.append($zoomControls, $imageViewport);

					function updateZoom() {
						$image.css('width', publicationZoom + '%');
						$zoomReset.text(publicationZoom + '%');
					}

					$zoomIn.on('click', function() { publicationZoom = Math.min(publicationZoom + 25, 300); updateZoom(); });
					$zoomOut.on('click', function() { publicationZoom = Math.max(publicationZoom - 25, 100); updateZoom(); });
					$zoomReset.on('click', function() { publicationZoom = 100; updateZoom(); });
					$imageViewport.on('wheel', function(e) {
						if (e.originalEvent.ctrlKey || e.originalEvent.metaKey) {
							e.preventDefault();
							publicationZoom = Math.max(100, Math.min(300, publicationZoom + (e.originalEvent.deltaY < 0 ? 10 : -10)));
							updateZoom();
						}
					});
				}
				else {
					if (kind === 'video' && window.location.protocol === 'file:') {
						var $fallback = $('<div class="publication-video-fallback"></div>');
						var $thumbnail = $('<img alt="Video thumbnail" />').attr('src', $tile.find('img').attr('src'));
						var $watchLink = $('<a target="_blank" rel="noopener">Watch on YouTube</a>').attr('href', originalUrl);
						$fallback.append($thumbnail, $watchLink);
						$media.append($fallback);
					}
					else {
						var $pdf = $('<iframe class="publication-pdf" title="Document preview"></iframe>');
						if (kind === 'video')
							$pdf.attr({ src: media + '?autoplay=0&rel=0', title: 'YouTube video player', referrerpolicy: 'strict-origin-when-cross-origin', allow: 'encrypted-media; picture-in-picture', allowfullscreen: 'allowfullscreen' });
						else
						$pdf.attr('src', media + '#toolbar=1&navpanes=1&view=FitH');
						$media.append($pdf);
					}
				}
			}

			$publicationTiles.on('click', function() {
				var group = $(this).attr('data-group');
				$activePublicationTiles = $publicationTiles.filter(function() {
					return $(this).attr('data-group') === group && !$(this).hasClass('is-filtered-out');
				});
				showPublication($activePublicationTiles.index(this));
				$publicationDialog[0].showModal();
			});
			$('.publication-close').on('click', function() { $publicationDialog[0].close(); });
			$publicationDialog.on('click', function(e) {
				if (e.target === this)
					$publicationDialog[0].close();
			});
			$('#publication-dialog-prev').on('click', function() { showPublication(publicationIndex - 1); });
			$('#publication-dialog-next').on('click', function() { showPublication(publicationIndex + 1); });
			$publicationDialog.on('keydown', function(e) {
				if (e.key === 'ArrowLeft')
					showPublication(publicationIndex - 1);
				else if (e.key === 'ArrowRight')
					showPublication(publicationIndex + 1);
			});

			$('.catalogue-toolbar').each(function() {
				var $toolbar = $(this);
				var catalogue = $toolbar.attr('data-catalogue-filter');
				var $tiles = $('.catalogue-grid[data-catalogue="' + catalogue + '"] .catalogue-card');
				var $empty = $('[data-catalogue-empty="' + catalogue + '"]');
				var $grid = $('.catalogue-grid[data-catalogue="' + catalogue + '"]');
				var $search = $toolbar.find('.catalogue-search');
				var $tagOptions = $toolbar.find('.catalogue-tags input[type="checkbox"]');
				var $sortOptions = $toolbar.find('.catalogue-sort-options input[type="radio"]');

				function sortCatalogue() {
					var sortOrder = $sortOptions.filter(':checked').val() || 'alphabetical';
					var cards = $tiles.get();
					cards.sort(function(a, b) {
						var $a = $(a);
						var $b = $(b);
						var titleOrder = ($a.attr('data-title') || '').localeCompare($b.attr('data-title') || '', undefined, { sensitivity: 'base' });
						if (sortOrder === 'oldest' || sortOrder === 'recent') {
							var dateA = Date.parse($a.attr('data-date') || '') || 0;
							var dateB = Date.parse($b.attr('data-date') || '') || 0;
							if (dateA !== dateB)
								return sortOrder === 'oldest' ? dateA - dateB : dateB - dateA;
						}
						return titleOrder;
					});
					$.each(cards, function(_, card) { $grid.append(card); });
				}

				function filterCatalogue() {
					var query = $.trim($search.val()).toLowerCase();
					var selectedTags = $tagOptions.filter(':checked').map(function() { return this.value; }).get();
					$tagOptions.each(function() { $(this).closest('label').toggleClass('is-selected', this.checked); });
					$toolbar.find('.catalogue-selected-count').text(selectedTags.length ? selectedTags.length + ' selected' : 'All tags');
					var visibleCount = 0;
					$tiles.each(function() {
						var $tile = $(this);
						var tags = ($tile.attr('data-tags') || '').split(',').filter(Boolean);
						var searchable = [
							$tile.attr('data-title'),
							$tile.attr('data-description'),
							$tile.attr('data-date-label'),
							tags.join(' ')
						].join(' ').toLowerCase();
						var matchesTags = !selectedTags.length || selectedTags.every(function(tag) { return tags.indexOf(tag) !== -1; });
						var matchesSearch = !query || searchable.indexOf(query) !== -1;
						$tile.toggleClass('is-filtered-out', !(matchesTags && matchesSearch));
						if (matchesTags && matchesSearch)
							visibleCount++;
					});
					$empty.prop('hidden', visibleCount !== 0);
				}

				$toolbar.on('input change', '.catalogue-tags input[type="checkbox"], .catalogue-search', filterCatalogue);
				$toolbar.on('change', '.catalogue-sort-options input[type="radio"]', function() {
					sortCatalogue();
					filterCatalogue();
				});
				sortCatalogue();
				filterCatalogue();
			});
		}

	// Header (narrower + mobile).

		// Toggle.
			$(
				'<div id="headerToggle">' +
					'<a href="#header" class="toggle"></a>' +
				'</div>'
			)
				.appendTo($body);

		// Header.
			$('#header')
				.panel({
					delay: 500,
					hideOnClick: true,
					hideOnSwipe: true,
					resetScroll: true,
					resetForms: true,
					side: 'left',
					target: $body,
					visibleClass: 'header-visible'
				});

})(jQuery);
