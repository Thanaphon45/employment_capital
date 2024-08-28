import Navber from "../components/Navber"
import Foter from "../components/Foter"
import Link from "next/link"
import Image from "next/image"

export default function Home_adminPage(){
  return(
      <>
      <Navber/>
      <div className="แถบสี"></div> 
      <div className="logohome">
                <Image src="/logohome.jpg" width={1000} height={100} alt="logohome" />
            </div>
      <h1 className="หน้าแรกแอดมิน">บริการด้านทุนจ้างงานนิสิต มหาวิทยาลัยทักษิณ</h1>
            <br />
      <Link href="/edit_admin"className='edit'>แก้ไขข้อมูลหน่วยงาน</Link>
      <Foter/>
      </>
  )
}