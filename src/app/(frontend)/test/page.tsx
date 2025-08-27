export default function TestPage() {
  return (
    <div className="mt-32">
      <h1>Test Page</h1>
      <p>If this renders, then the issue is in your main page component</p>
      <p>Environment: {process.env.NODE_ENV}</p>
      <p>Server URL: {process.env.NEXT_PUBLIC_SERVER_URL}</p>
    </div>
  )
}
