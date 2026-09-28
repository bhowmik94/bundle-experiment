import { useMemo, useState } from "react";

// Removing moment and replacing with date-fns
import { format, formatDistanceToNow, isToday, isYesterday } from "date-fns";
// Full lodash import: only debounce + groupBy are used, but grabbing the
// whole library was the path of least resistance. Bloat decision #2.
import debounce from 'lodash/debounce'
import groupBy from 'lodash/groupby'
import { mockActivities } from '../data/mockActivities'
import CategoryIcon from '../components/CategoryIcon'

export default function Feed() {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  const debouncedSetQuery = useMemo(
    () => debounce((value) => setDebouncedQuery(value), 300),
    []
  )

  function handleChange(e) {
    setQuery(e.target.value);
    debouncedSetQuery(e.target.value);
  }

  const filtered = mockActivities.filter((a) =>
    a.text.toLowerCase().includes(debouncedQuery.toLowerCase()),
  );

  const grouped = groupBy(filtered, (a) => format(a.timestamp, "yyyy-MM-dd"));

  function dayLabel(dateStr) {
    const d = new Date(dateStr);
    if (isToday(d)) return "Today";
    if (isYesterday(d)) return "Yesterday";
    return format(d, "MMM d, yyyy");
  }

  return (
    <div>
      <h2>Activity Feed</h2>
      <input
        value={query}
        onChange={handleChange}
        placeholder="Search activity..."
        style={{
          width: "100%",
          padding: 8,
          marginBottom: 16,
          boxSizing: "border-box",
        }}
      />
      {Object.entries(grouped).map(([day, items]) => (
        <div key={day} style={{ marginBottom: 16 }}>
          <h4 style={{ marginBottom: 4 }}>
            {dayLabel(day)}
          </h4>
          {items.map((item) => (
            <div
              key={item.id}
              style={{
                display: "flex",
                gap: 8,
                padding: "6px 0",
                borderBottom: "1px solid #eee",
              }}
            >
              <CategoryIcon category={item.category} />
              <span style={{ flex: 1 }}>{item.text}</span>
              <span style={{ color: "#888", fontSize: 12 }}>
                {formatDistanceToNow(item.timestamp, { addSuffix: true })}
              </span>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
