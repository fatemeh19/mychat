import Image from 'next/image'
import LeftSideMainPage from '../components/leftSideMainPage'
import RightSideMainPage from '../components/rightSideMainPage'
export default function Home() {
  return (
    <main className="grid grid-cols-12 bg-bgColorLight dark:bg-bgColorDark">
      <div className="col-span-4 leftSideMainPage">
        <LeftSideMainPage />
      </div>
      <div className="col-span-8 rightSideMainPage">
        <RightSideMainPage />
      </div>
    </main>
  )
}
