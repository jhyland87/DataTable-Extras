/**
 * Custom DataTable selector-modifier to filter out rows with shown or hidden child rows.
 *
 * Examples:
 *    // All rows with open children
 *   api.rows({ child: true })
 *   api.rows({ child: 'shown' })
 *   api.rows({ child: 'isShown' })
 *    
 *   // All rows with closed children
 *   api.rows({ child: false })
 *   api.rows({ child: 'hidden' })
 *   api.rows({ child: 'isHidden' })
 */
$.fn.dataTable.ext.selector.row.push( function ( settings, opts, indexes ) {
    var dtApi   = new $.fn.dataTable.Api( settings ),
        child   = opts.child,
        results = [],
        nouns   = {
            shown  : [ 
                'shown', 'isshown',
                'opened','open' 
            ],
            hidden : [ 
                'hidden', 'ishidden',
                'closed','close' 
            ]
        },
        data
 
    // If child isnt defined, then show everything
    if ( child === undefined )
        return indexes
 
    // If opts.child is defined as something other than a string or boolean, then return nothing
    if( [ 'string', 'boolean' ].indexOf( typeof child ) === -1 ){
        //console.error( 'Expected "child" row selector to be a string or a boolean value - received typeof: %s', typeof child )
        return []
    }
 
    // If child is a boolean, then change it to one of the valid strings
    if( typeof child === 'boolean' )
        child = ( child ? 'shown' : 'hidden' )
 
    // If its a string, convert it to lower, since everything in nounds.shown and nouns.hidden are lower
    else
        child = child.toLowerCase()
 
    // Iterate over the rows, adding the rows index to the results array if the result of row( idx ).child.isShown() is whats being filtered for
    for ( var i=0, ien=indexes.length ; i<ien ; i++ ) {
        data = settings[ 'aoData' ][ indexes[i] ]
 
        if( ( nouns.shown.indexOf( child ) !== -1 && dtApi.row( indexes[i] ).child.isShown() === true )
            || ( nouns.hidden.indexOf( child ) !== -1 && dtApi.row( indexes[i] ).child.isShown() === false ) )
            results.push( indexes[i] )
    }
 
    return results
})