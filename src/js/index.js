var openNav = document.getElementById( 'open-nav' );
var closeNav = document.getElementById( 'close-nav' );
var sideNav = document.getElementById( 'side-nav' );

openNav.addEventListener( 'click', function() { 
    sideNav.classList.add( 'active' );
} );

closeNav.addEventListener( 'click', function() { 
    sideNav.classList.remove( 'active' );
} );
