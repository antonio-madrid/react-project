/** Debounce function for preventing to match API calls */
export function debounce( callback, delay ) {
    let timeout;
    return function() {
        clearTimeout( timeout );
        timeout = setTimeout( callback, delay );
    }
}
