import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

const weeklyData = [
  { day: 'Mon', activity: 12 },
  { day: 'Tue', activity: 18 },
  { day: 'Wed', activity: 9 },
  { day: 'Thu', activity: 22 },
  { day: 'Fri', activity: 15 },
  { day: 'Sat', activity: 4 },
  { day: 'Sun', activity: 7 },
]

export default function Dashboard() {
  return (
    <div>
      <h2>Weekly Activity</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={weeklyData}>
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="activity" stroke="#4f46e5" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
