import { useState, useCallback } from 'react';
import { useMediaContext } from '../context/MediaContext';
export const useMediaSearch = (type = 'photo') => {
    const { client } = useMediaContext();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [query, setQuery] = useState('');
    const [hasMore, setHasMore] = useState(true);
    const [totalResults, setTotalResults] = useState(0);
    const reset = useCallback(() => {
        setData([]);
        setPage(1);
        setHasMore(true);
        setTotalResults(0);
        setError(null);
    }, []);
    const search = useCallback(async (searchQuery) => {
        if (!client) {
            setError(new Error('Client not initialized'));
            return;
        }
        if (!searchQuery.trim()) {
            setError(new Error('Search query is required'));
            return;
        }
        setLoading(true);
        setError(null);
        setQuery(searchQuery);
        setPage(1);
        setData([]);
        try {
            const params = { query: searchQuery, page: 1, per_page: 15 };
            if (type === 'photo') {
                const result = await client.searchPhotos(params);
                setData(result.photos);
                setTotalResults(result.total_results);
                setHasMore(!!result.next_page);
            }
            else {
                const result = await client.searchVideos(params);
                setData(result.videos);
                setTotalResults(result.total_results);
                setHasMore(!!result.next_page);
            }
        }
        catch (err) {
            setError(err instanceof Error ? err : new Error('Search failed'));
        }
        finally {
            setLoading(false);
        }
    }, [client, type]);
    const loadMore = useCallback(async () => {
        if (!client || loading || !hasMore || !query)
            return;
        const nextPage = page + 1;
        setLoading(true);
        try {
            const params = { query, page: nextPage, per_page: 15 };
            if (type === 'photo') {
                const result = await client.searchPhotos(params);
                setData((prev) => [...prev, ...result.photos]);
                setHasMore(!!result.next_page);
            }
            else {
                const result = await client.searchVideos(params);
                setData((prev) => [...prev, ...result.videos]);
                setHasMore(!!result.next_page);
            }
            setPage(nextPage);
        }
        catch (err) {
            setError(err instanceof Error ? err : new Error('Load more failed'));
        }
        finally {
            setLoading(false);
        }
    }, [client, loading, hasMore, query, page, type]);
    return { data, loading, error, search, loadMore, hasMore, totalResults, reset };
};
