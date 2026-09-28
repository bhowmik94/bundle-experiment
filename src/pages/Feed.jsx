import { useMemo, useState } from 'react'
// moment: relative timestamps ("2 hours ago") + date grouping have real edge
// cases (pluralization, midnight boundaries) — reaching for a full library
// felt like the safe choice. Bloat decision #1.
import moment from 'moment'
// Full lodash import: only debounce + groupBy are used, but grabbing the
// whole library was the path of least resistance. Bloat decision #2.
import debounce from 'lodash/debounce'
import groupBy from 'lodash/groupby'
import { mockActivities } from '../data/mockActivities'
import CategoryIcon from '../components/CategoryIcon'

export default function Feed() {
  const [query, setQuery] = useState('')
  const [debouncedQuery, setDebouncedQuery] = useState('')

  const debouncedSetQuery = useMemo(
    () => debounce((value) => setDebouncedQuery(value), 300),
    []
  )

  function handleChange(e) {
    setQuery(e.target.value)
    debouncedSetQuery(e.target.value)
  }

  const filtered = mockActivities.filter((a) =>
    a.text.toLowerCase().includes(debouncedQuery.toLowerCase())
  )

  const grouped = groupBy(filtered, (a) => moment(a.timestamp).format('YYYY-MM-DD'))

  return (
    <div>
      <h2>Activity Feed</h2>
      <input
        value={query}
        onChange={handleChange}
        placeholder="Search activity..."
        style={{ width: '100%', padding: 8, marginBottom: 16, boxSizing: 'border-box' }}
      />
      {Object.entries(grouped).map(([day, items]) => (
        <div key={day} style={{ marginBottom: 16 }}>
          <h4 style={{ marginBottom: 4 }}>
            {moment(day).calendar(null, { sameElse: 'MMM D, YYYY' })}
          </h4>
          {items.map((item) => (
            <div
              key={item.id}
              style={{ display: 'flex', gap: 8, padding: '6px 0', borderBottom: '1px solid #eee' }}
            >
              <CategoryIcon category={item.category} />
              <span style={{ flex: 1 }}>{item.text}</span>
              <span style={{ color: '#888', fontSize: 12 }}>{moment(item.timestamp).fromNow()}</span>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}
