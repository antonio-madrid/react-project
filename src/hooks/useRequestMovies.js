import {useDispatch, useSelector} from "react-redux";
import {hasNextPage, movies, page} from "../data/selectors";
import {createSearchParams, useSearchParams} from "react-router-dom";
import {useCallback, useEffect, useRef} from "react";
import {ENDPOINT_DISCOVER, ENDPOINT_SEARCH} from "../constants";
import {fetchMovies} from "../service/FetchMovieService"
import {debounce} from "../utils/debounce";

/** Custom Hook for managing movies fetching processes */
export const useRequestMovies = () => {
    const dispatch = useDispatch();
    const isNextPage = useSelector(hasNextPage)
    const pageCount = useSelector(page);
    const [searchParams, setSearchParams] = useSearchParams();
    const searchQuery = searchParams.get('search');

    /** Fetching movies gateway function cached */
    const fetchMoviesWithQuery = useCallback(
        (query = '', page = 1) => {
            const params = {
                query,
                page
            };
            // Prepare next fetch query params
            const queryParams = new URLSearchParams(params);

            const apiURL = query !== '' ? ENDPOINT_SEARCH : ENDPOINT_DISCOVER;
            // Set next fetch query params
            setSearchParams(query !== '' ? createSearchParams({query}) : '');

            const fetchURL = `${apiURL}&${queryParams.toString()}`;

            // Call to the real movie fetching function
            dispatch(fetchMovies(fetchURL));
        }, [dispatch, setSearchParams]
    )


    /** Encapsulate fetchMoviesWithQuery to a debounce */
    const searchMovies = useCallback(
        (query) => {
            // Reduce the amount of API requests
            const debouncedFetch = debounce(() => fetchMoviesWithQuery(query), 500);
            debouncedFetch();
        }, []
    );

    const observerRef = useRef(null);
    const observedNode = useRef(null);

    /** Load more movies when end of the page reached */
    const loadMoreMovies = useCallback(
        (node) => {
            let query;

            if (node && node[0].isIntersecting && isNextPage && movies.length !== 0) {
                if (searchQuery) {
                    query = searchQuery;
                } else {
                    query = '';
                }
                if (movies || movies.length > 0) {
                    fetchMoviesWithQuery(query, pageCount + 1);
                }
                console.log('is intersecting')
                observerRef.current?.disconnect();
            } else {
                console.log('is not intersecting')
            }
        }, [isNextPage, fetchMoviesWithQuery, pageCount, searchQuery]
    )


    /** Initiates first movie fetching */
    useEffect(() => {
        fetchMoviesWithQuery();
    //     Keep array of dependencies empty to avoid endless fetching & search errors
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    /** Creates an Intersection Observer and observes the given node */
    useEffect(() => {
        observerRef.current = new IntersectionObserver(loadMoreMovies, {
            threshold: 1.0,
            root: null,
            rootMargin: '10px'
        });
        if (observerRef.current && observedNode.current) {
            observerRef.current?.observe(observedNode.current);
        }
        // Cleanup process
        return () => {
            if (observerRef.current) {
                observerRef.current?.disconnect();
            }
        };
    }, [loadMoreMovies]);

    return {
        fetchMoviesWithQuery,
        searchMovies,
        observedNode,
    };

}
