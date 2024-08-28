
import Navber from "./components/Navber";
import Foter from "./components/Foter";
// import sttles from "@/styles.home.css"
import Image from "next/image";
export default function Home() {
  return (
    <>
      <Navber/>
        
        <h1>บริการด้านทุนจ้างงานนิสิต มหาวิทยาลัยทักษิณ</h1>
        {/* <Image src="/logohome.jpg" width={500} height={800} alt="logohome"/> */}

        
        {/* <div className={styles.home}>
        <h1 className={styles.home1}>บริการด้านทุนจ้างงานนิสิต มหาวิทยาลัยทักษิณ</h1>
        </div> */}
      <Foter/>
    </>
  );
}
