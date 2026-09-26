// Named imports only — the category set is a small, known list 
// Resolving it statically instead of importing
// the whole icon set for a runtime lookup.
// This is bloat decision #3 — fixed with named imports
import { FaComment, FaUpload, FaAt, FaHeart, FaUserPlus, FaCircle } from 'react-icons/fa'

const CATEGORY_TO_ICON = {
  comment: 'FaComment',
  upload: 'FaUpload',
  mention: 'FaAt',
  like: 'FaHeart',
  join: 'FaUserPlus',
}

export default function CategoryIcon({ category }) {
  const IconComponent = CATEGORY_TO_ICON[category] || Icons.FaCircle
  return <IconComponent size={14} style={{ marginTop: 3 }} />
}
