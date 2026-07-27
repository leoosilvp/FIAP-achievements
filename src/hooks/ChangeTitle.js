import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const formatTitle = (text) => {
  if (!text) return ''

  return text
    .replace(/-/g, ' ')
    .toLowerCase()
    .trim()
    .replace(/\s+/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase())
}

const ChangeTitle = () => {
  const location = useLocation()

  useEffect(() => {
    const { pathname, search } = location

    switch (pathname) {
      case '/home':
        document.title = 'Início - FIAP Achievements'
        break

      case '/catalog':
        document.title = 'Catálogo - FIAP Achievements'
        break

      case '/badge': {
        const params = new URLSearchParams(search)

        const badge = params.get('badge')
        const company = formatTitle(params.get('company'))
        const topic = formatTitle(params.get('topic'))

        const page = {
          nano: 'Nano Courses',
          challenge: company || 'Challenge',
          gs: topic || 'Global Solution',
        }[badge] || 'Badges'

        document.title = `${page} - FIAP Achievements`

        document.title = `${page} - FIAP Achievements`
        break
      }

      default:
        document.title = 'FIAP Achievements'
    }
  }, [location])

  return null
}

export default ChangeTitle