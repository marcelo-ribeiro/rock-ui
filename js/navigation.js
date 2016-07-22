(function() {

  var _body = document.body,
    _navigation = document.querySelector('.navigation'),
    _toggle_navigation = document.querySelector('[data-toggle=navigation]'),
    _navigationIsOpened = false,
    _menuItens = document.querySelectorAll('[data-has-submenu]');


  // Events
  //
  _toggle_navigation.onclick = function() {
    event.stopPropagation();
    if ( _navigationIsOpened )
      _close_navigation();
    else
      _open_navigation();
  }

  _body.onclick = function(element) {
    if ( _navigationIsOpened && element.toElement == this )
      _close_navigation();
  }

  _menuItens.forEach( function(element) {
    _toggle_menu(element);
  });


  // Functions
  //
  // Navigation
  function _open_navigation() {
    _body.dataset.navigation = 'opened';
    _body.dataset.overlay = 'opened';
    _navigationIsOpened = true;
  }

  function _close_navigation() {
    _body.dataset.navigation = 'closed';
    _body.dataset.overlay = 'closed';
    _navigationIsOpened = false;
  }

  // Menu
  function _toggle_menu(element) {
    element.firstElementChild.onclick = function(){
      if (element.dataset.submenu == 'opened')
        element.dataset.submenu = 'closed';
      else
        element.dataset.submenu = 'opened';
    }
  }

})();