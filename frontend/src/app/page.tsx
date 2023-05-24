import Image from 'next/image'
import LeftSideMainPage from '../components/leftSideMainPage'
export default function Home() {
  return (
    <main className="grid grid-cols-12">
      <div className="col-span-4 leftSideMainPage">
        <LeftSideMainPage />
      </div>
      <div className="col-span-8 rightSideMainPage">
        av
      </div>
    </main>
  )
}
