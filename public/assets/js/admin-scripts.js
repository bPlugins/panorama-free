// Settings split into tabs by MetaboxLayout: a field can depend on a field in another tab, so CSF
// marks those rules "global", which looks the controller up in the whole page. Look it up in the
// settings box only, like when all fields were in one tab, so a field with the same id in another
// plugin's box (e.g. "type" on the product page) is never used.
(function ($) {
  function scoped(original) {
    var fn = function () {
      return this.each(function () {
        var $section = $(this);
        var $box = $section.closest('.csf-metabox');
        if (!$section.is('.csf-section.bppiv-auto-tab') || !$box.length || !$.csf_deps) {
          original.call($section);
          return;
        }

        var $fields = $section.children('[data-controller]');
        if (!$fields.length) {
          return;
        }
        var normalRuleset = $.csf_deps.createRuleset();
        var boxRuleset = $.csf_deps.createRuleset();
        var normalDepends = [];
        var boxDepends = [];

        $fields.each(function () {
          var $field = $(this);
          var controllers = String($field.data('controller')).split('|');
          var conditions = String($field.data('condition')).split('|');
          var values = String($field.data('value')).split('|');
          var inBox = !!$field.data('depend-global');
          var ruleset = inBox ? boxRuleset : normalRuleset;

          $.each(controllers, function (index, dependId) {
            ruleset = ruleset.createRule('[data-depend-id="' + dependId + '"]', conditions[index] || conditions[0], values[index] || '');
            ruleset.include($field);
            (inBox ? boxDepends : normalDepends).push(dependId);
          });
        });

        if (normalDepends.length) {
          $.csf_deps.enable($section, normalRuleset, normalDepends);
        }
        if (boxDepends.length) {
          $.csf_deps.enable($box, boxRuleset, boxDepends);
        }
      });
    };
    fn.bppivScoped = true;
    return fn;
  }

  if ($.fn.csf_dependency) {
    if (!$.fn.csf_dependency.bppivScoped) {
      $.fn.csf_dependency = scoped($.fn.csf_dependency);
    }
  } else {
    // CSF's script comes after this one: wrap its function as soon as it is defined.
    var current;
    Object.defineProperty($.fn, 'csf_dependency', {
      configurable: true,
      enumerable: true,
      get: function () {
        return current;
      },
      set: function (value) {
        current = value && !value.bppivScoped ? scoped(value) : value;
      }
    });
  }
})(jQuery);

// Change Dimension Property Name of Dimension field.
jQuery(document).ready(function ($) {
  $("[name='_bppivimages_[initial_view_property][top]']").attr("placeholder", "X");
  $("[name='_bppivimages_[initial_view_property][right]']").attr("placeholder", "Y");
  $("[name='_bppivimages_[initial_view_property][bottom]']").attr("placeholder", "Z");
  // $("[name='btss_meta[bts_column][left]']").attr('placeholder', 'Mobile')

  // Tab persistence for Codestar Framework metabox
  var $postIDInput = $('#post_ID');
  if ($postIDInput.length) {
    var postId = $postIDInput.val();
    var activeTabKey = 'bppiv_active_tab_' + postId;
    var $navLinks = $('#_bppivimages_, #_bppiv_product_').find('.csf-nav-metabox a');

    if ($navLinks.length) {
      var savedIndex = sessionStorage.getItem(activeTabKey);
      var initialIndex = savedIndex !== null ? parseInt(savedIndex, 10) : 0;

      // Restore active tab
      if (initialIndex > 0 && initialIndex < $navLinks.length) {
        setTimeout(function () {
          if ($navLinks.eq(initialIndex).is(':visible')) {
            $navLinks.eq(initialIndex).trigger('click');
          }
        }, 50);
      }

      // Listen for click on any tab
      $navLinks.on('click', function () {
        sessionStorage.setItem(activeTabKey, $navLinks.index(this));
      });

      // Fallback active tab to Configuration (index 0) if the currently selected tab becomes hidden
      function checkActiveTabVisibility() {
        var $activeLink = $navLinks.filter('.csf-active');
        if ($activeLink.length && $activeLink.is(':hidden')) {
          $navLinks.first().trigger('click');
        }
      }

      // Wait a brief moment to allow the tab visibility changes to apply
      $(document).on('change', 'input[name="_bppivimages_[bppiv_type]"]', function () {
        setTimeout(checkActiveTabVisibility, 150);
      });

      // Also check on load
      setTimeout(checkActiveTabVisibility, 300);
    }
  }

  // Settings grouped into tabs by MetaboxLayout: hide a tab that has nothing for the chosen options.
  $('#_bppivimages_, #_bppiv_product_').each(function () {
    var $box = $(this);
    var $sections = $box.find('.csf-section.bppiv-auto-tab');
    var $links = $box.find('.csf-nav-metabox a');
    if ($sections.length < 2 || typeof $.fn.csf_reload_script !== 'function') {
      return;
    }

    function hasOptions($section) {
      return $section.children('.csf-field').not('.csf-field-callback, .csf-depend-on').filter(function () {
        return this.style.display !== 'none';
      }).length > 0;
    }

    function sync() {
      // Set up every tab now (CSF does it on the first click), so their dependencies are known.
      $sections.csf_reload_script();
      $sections.each(function (index) {
        if (index > 0) {
          $links.eq(index).closest('li').toggle(hasOptions($(this)));
        }
      });
      // The open tab was emptied: go back to Configuration.
      var $active = $links.filter('.csf-active');
      if ($active.length && !$active.closest('li').is(':visible')) {
        $links.first().trigger('click');
      }
    }

    $box.on('change', 'input, select', function () {
      setTimeout(sync, 50);
    });
    // After CSF's own ready handler has opened the first tab.
    setTimeout(sync, 0);
  });
});
