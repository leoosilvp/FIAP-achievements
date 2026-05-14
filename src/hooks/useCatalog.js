import { useEffect, useMemo, useState } from 'react'

export const useCatalog = () => {
    const [search, setSearch] = useState('')
    const [catalog, setCatalog] = useState({})
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    useEffect(() => {
        const controller = new AbortController()

        const fetchCatalog = async () => {
            try {
                setLoading(true)
                setError(false)

                const response = await fetch('/api/catalog', {
                    signal: controller.signal,
                })

                if (!response.ok) {
                    throw new Error('Failed to fetch catalog')
                }

                const result = await response.json()

                if (!result.success) {
                    throw new Error(result.message)
                }

                setCatalog(result.data)
            } catch (err) {
                if (err.name !== 'AbortError') {
                    console.error(err)
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
            // ======================================================
            // NANO
            // ======================================================

            if (type === 'nano') {
                filtered[type] = years
                return
            }

            // ======================================================
            // CHALLENGE / GS
            // ======================================================

            filtered[type] = {}

            Object.entries(years).forEach(([year, topics]) => {
                const filteredTopics = topics.filter((topic) =>
                    topic.title
                        .toLowerCase()
                        .includes(search.toLowerCase())
                )

                if (filteredTopics.length > 0) {
                    filtered[type][year] = filteredTopics
                }
            })
        })

        return filtered
    }, [catalog, search])

    const hasResults = useMemo(() => {
        return Object.entries(filteredCatalog).some(
            ([type, years]) => {
                if (type === 'nano') return true

                return Object.values(years).some(
                    (topics) => topics.length > 0
                )
            }
        )
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