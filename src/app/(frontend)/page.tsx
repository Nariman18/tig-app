import AgencyTable from '@/components/agency-table'
import HomePage from '@/components/home-page'

export default async function MainPage() {
  const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'

  const res = await fetch(`${serverUrl}/api/agency-base`, {
    cache: 'no-store',
  })

  if (!res.ok) {
    return <p className="text-red-500 font-bold text-2xl p-5">Failed to load agency data.</p>
  }

  const data = await res.json()
  return (
    <main className="relative flex flex-col">
      <section>
        <HomePage />
      </section>

      <section>
        <AgencyTable />
      </section>
    </main>
  )
}
