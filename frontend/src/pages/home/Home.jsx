import './home.css'
import Feed from '../../components/feed/Feed';
import Rightbar from '../../components/rightbar/Rightbar';
import Sidebar from '../../components/sidebar/Sidebar';
import Topbar from '../../components/topbar/Topbar';

function Home() {
  return (
    <>
      <Topbar />
      <div className="homeContainer">
      <Sidebar />
      <Feed />
      <Rightbar />
      </div>
    </>
  )
}

export default Home