import { useEffect, useMemo, useState } from 'react'

const cache = {
    data: null,
    timestamp: null,
    TTL_MS: 5 * 60 * 1000, // 5 min
}

function isCacheValid() {
    return cache.data !== null && Date.now() - cache.timestamp < cache.TTL_MS
}

export const useCatalog = () => {
    const [search, setSearch] = useState('')
    const [catalog, setCatalog] = useState(() => cache.data ?? {})
    const [loading, setLoading] = useState(() => !isCacheValid())
    const [error, setError] = useState(false)

    useEffect(() => {
        if (isCacheValid()) return

        const controller = new AbortController()

        const fetchCatalog = async () => {
            try {
                setLoading(true)
                setError(false)

                const response = await fetch('/api/catalog', {
                    signal: controller.signal,
                })

                if (!response.ok) throw new Error('Failed to fetch catalog')

                const result = await response.json()

                if (!result.success) throw new Error(result.message)

                cache.data = result.data
                cache.timestamp = Date.now()

                setCatalog(result.data)
            } catch (err) {
                if (err.name !== 'AbortError') {
                    console.error('[useCatalog]', err)
                    setError(true)
                }
            } finally {
                setLoading(false)
            }
        }

        fetchCatalog()

        return () => {
            controller.abort()
        }
    }, [])

    const filteredCatalog = useMemo(() => {
        const filtered = {}

        Object.entries(catalog).forEach(([type, years]) => {
            if (type === 'nano') {
                filtered[type] = years
                return
            }

            filtered[type] = {}

            Object.entries(years).forEach(([year, topics]) => {
                const filteredTopics = topics.filter((topic) =>
                    topic.title.toLowerCase().includes(search.toLowerCase())
                )

                if (filteredTopics.length > 0) {
                    filtered[type][year] = filteredTopics
                }
            })

            if (Object.keys(filtered[type]).length === 0) {
                delete filtered[type]
            }
        })

        return filtered
    }, [catalog, search])

    const hasResults = useMemo(() => {
        return Object.entries(filteredCatalog).some(([type, years]) => {
            if (type === 'nano') return true
            return Object.values(years).some((topics) => topics.length > 0)
        })
    }, [filteredCatalog])

    return {
        search,
        setSearch,
        filteredCatalog,
        loading,
        error,
        hasResults,
    }
}