// Change Dimension Property Name of Dimension field.
jQuery(document).ready(function ($) {
  $("[name='_bppivimages_[initial_view_property][top]']").attr("placeholder", "X");
  $("[name='_bppivimages_[initial_view_property][right]']").attr("placeholder", "Y");
  $("[name='_bppivimages_[initial_view_property][bottom]']").attr("placeholder", "Z");
  // $("[name='btss_meta[bts_column][left]']").attr('placeholder', 'Mobile')

  // Tab persistence and layout visibility for Codestar Framework metabox
  var $postIDInput = $('#post_ID');
  if ($postIDInput.length) {
    var postId = $postIDInput.val();
    var activeTabKey = 'bppiv_active_tab_' + postId;
    var $navLinks = $('.csf-nav-metabox a');
    var $sections = $('#_bppivimages_ .csf-section');
    var $firstSection = $sections.first();

    if ($navLinks.length && $firstSection.length) {
      var savedIndex = sessionStorage.getItem(activeTabKey);
      var initialIndex = 0;
      if (savedIndex !== null) {
        initialIndex = parseInt(savedIndex, 10);
      }

      function updateLayout(activeIndex) {
        var firstSecEl = $firstSection.get(0);
        if (!firstSecEl) return;

        if (activeIndex === 0) {
          // On Configuration tab: show the first section completely
          firstSecEl.style.setProperty('display', 'block', 'important');
          $firstSection.removeClass('csf-section-split');
          $firstSection.find('.csf-section-title').removeClass('bppiv-hide-field');
          $firstSection.find('.csf-field').removeClass('bppiv-hide-field');
        } else {
          // On other tabs: force the first section to remain visible, but hide its title and secondary fields
          firstSecEl.style.setProperty('display', 'block', 'important');
          $firstSection.addClass('csf-section-split');
          $firstSection.find('.csf-section-title').addClass('bppiv-hide-field');
          $firstSection.find('.csf-field').addClass('bppiv-hide-field');
          $firstSection.find('.csf-field').first().removeClass('bppiv-hide-field');
        }
      }

      // Restore active tab
      if (initialIndex >= 0 && initialIndex < $navLinks.length) {
        setTimeout(function () {
          $navLinks.eq(initialIndex).trigger('click');
          updateLayout(initialIndex);
        }, 50);
      } else {
        updateLayout(0);
      }

      // Listen for click on any tab
      $navLinks.on('click', function () {
        var clickedIndex = $navLinks.index(this);
        sessionStorage.setItem(activeTabKey, clickedIndex);
        updateLayout(clickedIndex);
      });

      // Fallback active tab to Configuration (index 0) if the currently selected tab becomes hidden
      function checkActiveTabVisibility() {
        var $activeLink = $('.csf-nav-metabox a.csf-active');
        if ($activeLink.length && $activeLink.is(':hidden')) {
          $('.csf-nav-metabox a').first().trigger('click');
          updateLayout(0);
        }
      }

      // Listen to Panorama Type changes to verify if active tab is still visible
      $(document).on('change', 'input[name="_bppivimages_[bppiv_type]"]', function () {
        // Wait a brief moment to allow Codestar Framework's own tab visibility changes to apply
        setTimeout(function() {
          checkActiveTabVisibility();
          // Re-evaluate visibility state in case the current tab is still valid but the controller changed
          var activeIndex = $navLinks.index($('.csf-nav-metabox a.csf-active'));
          updateLayout(activeIndex >= 0 ? activeIndex : 0);
        }, 150);
      });

      // Also check on load
      setTimeout(checkActiveTabVisibility, 300);
    }
  }
});
