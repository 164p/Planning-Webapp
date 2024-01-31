'use client'
import React from 'react';
import DateRangePicker from '../../components/DatePick';

const Home: React.FC = () => {
  
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200 p-8">
      <DateRangePicker onSubmit={function (startDate: Date, endDate: Date): void {
        throw new Error('Function not implemented.');
      } } />
    </div>
  );
};

export default Home;
// async function onSubmit(event: FormEvent<HTMLFormElement>) {
//   event.preventDefault()
//   if(false){

//   }else{
//       try {
//           const response = await fetch("/api/auth/signup", {
//               method: 'POST',
//               body: JSON.stringify(data)
//           })
          
//           if(response.ok){
//              alert({
//                   icon: 'success',
//                   title: 'สมัครสมาชิกสำเร็จ ระบบกำลังพาท่านไปหน้าเข้าสู่ระบบ', 
//                   confirmButtonText: 'ปิด',
//                   timer: 1500,
//                   timerProgressBar: true
//               }).then(() => {
//                   router.push('/auth/signin');
//               })
//           }else{
//               const responseData = await response.json()

//               Swal.fire({
//                   icon: 'error',
//                   title: 'สมัครสมาชิกไม่สำเร็จ', 
//                   text: responseData.message, 
//                   confirmButtonText: 'ปิด',
//               });
//           }
          
//       } catch (error) {
//           Swal.fire({
//               icon: 'error',
//               title: 'สมัครสมาชิกไม่สำเร็จ', 
//               text: 'เกิดข้อผิดพลาด โปรดลองใหม่อีกครั้งในภายหลัง', 
//               confirmButtonText: 'ปิด',
//           });
//       }
//   } 
// }