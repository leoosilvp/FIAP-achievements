import { useCallback, useEffect, useMemo, useState } from 'react'

// - Cache em módulo (compartilhado entre instâncias do hook) --------------

const cache = {
    data: null,
    timestamp: null,
    inflight: null,
    TTL_MS: 5 * 60 * 1000, // 5 min
}

function isCacheValid() {
    return cache.data !== null && Date.now() - cache.timestamp < cache.TTL_MS
}

function normalizeText(value) {
    return value
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
}

const EMPTY_CATALOG = { nano: {}, challenge: {}, gs: {}, ic: {} }

/**
 * Busca o catálogo em /api/catalog, deduplicando requisições concorrentes
 * entre instâncias do hook e respeitando o TTL do cache em módulo.
 */
async function fetchCatalog({ signal, force = false } = {}) {
    if (!force && isCacheValid()) return cache.data

    if (!cache.inflight) {
        cache.inflight = (async () => {
            const response = await fetch('/api/catalog')

            let body = null
            try {
                body = await response.json()
            } catch {
                // corpo não é JSON válido; segue com body = null
            }

            if (!response.ok || !body?.success) {
                throw new Error(body?.message ?? `Falha ao buscar catálogo (HTTP ${response.status})`)
            }

            cache.data = body.data
            cache.timestamp = Date.now()
            return cache.data
        })()

        cache.inflight.finally(() => {
            cache.inflight = null
        })
    }

    return signal
        ? Promise.race([
            cache.inflight,
            new Promise((_, reject) => {
                signal.addEventListener('abort', () => reject(new DOMException('Aborted', 'AbortError')))
            }),
        ])
        : cache.inflight
}

export const useCatalog = () => {
    const [search, setSearch] = useState('')
    const [catalog, setCatalog] = useState(() => cache.data ?? EMPTY_CATALOG)
    const [loading, setLoading] = useState(() => !isCacheValid())
    const [error, setError] = useState(null)

    // Nunca chama setState de forma síncrona: todo setState acontece dentro
    // de .then/.catch/.finally, após a resolução da Promise.
    const run = useCallback((controller, options) => {
        fetchCatalog({ signal: controller.signal, ...options })
            .then((data) => {
                if (controller.signal.aborted) return
                setCatalog(data)
                setError(null)
            })
            .catch((err) => {
                if (err.name === 'AbortError') return
                console.error('[useCatalog]', err)
                setError(err.message)
            })
            .finally(() => {
                if (!controller.signal.aborted) setLoading(false)
            })
    }, [])

    useEffect(() => {
        if (isCacheValid()) return undefined

        const controller = new AbortController()
        run(controller, {})
        return () => controller.abort()
    }, [run])

    // Disparado por ação do usuário (fora de um efeito), então pode setar
    // loading/error de forma síncrona sem gerar cascading renders.
    const refetch = useCallback(() => {
        const controller = new AbortController()
        setLoading(true)
        setError(null)
        run(controller, { force: true })
        return controller
    }, [run])

    const filteredCatalog = useMemo(() => {
        const query = normalizeText(search)
        const filtered = {}

        Object.entries(catalog).forEach(([type, years]) => {
            if (type === 'nano') {
                filtered[type] = years
                return
            }

            filtered[type] = {}

            Object.entries(years).forEach(([year, topics]) => {
                const filteredTopics = topics.filter((topic) =>
                    normalizeText(topic.title).includes(query)
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
        refetch,
    }
}