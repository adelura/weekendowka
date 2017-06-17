var openNav = document.getElementById( 'open-nav' );
var closeNav = document.getElementById( 'close-nav' );
var sideNav = document.getElementById( 'side-nav' );

openNav.addEventListener( 'click', function() { 
    sideNav.style.width = '100%';
    console.log( openNav );
} );

closeNav.addEventListener( 'click', function() { 
    sideNav.style.width = '0px';
    console.log( closeNav );
} );