import LeftSideMainPage from '../components/mainPage/leftSideMainPage'
import RightSideMainPage from '../components/mainPage/rightSideMainPage'

export default function Home() {
  
  return (
    <main className="grid grid-cols-[repeat(16,_minmax(0,_1fr))] gap-[2px] bg-bgColorLight dark:bg-bgColorDark">
      <div className="col-span-4 leftSideMainPage">
        <LeftSideMainPage />
      </div>
      <div className="col-span-12 rightSideMainPage">
        <RightSideMainPage />
      </div>
    </main>
  )
}
