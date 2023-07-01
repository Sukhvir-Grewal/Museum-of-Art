
import useSWR from 'swr'

const URL = `https://collectionapi.metmuseum.org/public/collection/v1/objects/123`
export default function Home() {
  const { data, error } = useSWR(URL)
  if (error) return <div>Failed to load data.</div>;
  if (!data) return <div>Loading...</div>;
  return (
    <>
      <p>hello world</p>
    </>
  )
}
