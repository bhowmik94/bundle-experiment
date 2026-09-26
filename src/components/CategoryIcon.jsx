// Whole icon set imported because the icon name is only known at runtime
// (it comes from `category`, which is API data) — you can't statically
// import "just the ones you need" when the name is dynamic.
// This is bloat decision #3 — fix later with an explicit lookup of named imports.
import * as Icons from 'react-icons/fa'

const CATEGORY_TO_ICON = {
  comment: 'FaComment',
  upload: 'FaUpload',
  mention: 'FaAt',
  like: 'FaHeart',
  join: 'FaUserPlus',
}

export default function CategoryIcon({ category }) {
  const IconComponent = Icons[CATEGORY_TO_ICON[category]] || Icons.FaCircle
  return <IconComponent size={14} style={{ marginTop: 3 }} />
}
