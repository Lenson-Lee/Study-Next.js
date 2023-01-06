import Link from "next/link";
import { usePathname } from "next/navigation";

export default function getPost(dataList: Object) {
  const router = usePathname();
  //readData
  const dataListRender = Object.entries(dataList).map((item, index) => {
    //시간 차이 계산
    const writtenTime = () => {
      //작성시간
      const user = new Date(item[1].createdAt);
      const userTime = {
        year: user.getFullYear(),
        month: user.getMonth() + 1,
        date: user.getDate(),
        hour: user.getHours(),
        min: user.getMinutes(),
      };

      //현재 시간
      const today = new Date();
      const todayTime = {
        year: today.getFullYear(),
        month: today.getMonth() + 1,
        date: today.getDate(),
        hour: today.getHours(),
        min: today.getMinutes(),
      };

      //시간계산 (ex: 1분전)
      const calc = [
        todayTime.year - userTime.year === 0
          ? null
          : todayTime.year - userTime.year + "년 전",
        todayTime.month - userTime.month === 0
          ? null
          : todayTime.month - userTime.month + "개월 전",
        todayTime.date - userTime.date === 0
          ? null
          : todayTime.date - userTime.date + "일 전",
        todayTime.hour - userTime.hour === 0
          ? null
          : todayTime.hour - userTime.hour + "시간 전",
        todayTime.min - userTime.min <= 0
          ? todayTime.min - userTime.min + 60 + "분 전"
          : todayTime.min - userTime.min + "분 전",
      ];

      //진짜 시간 저장
      let time = "";

      for (let i = 0; i < calc.length; i++) {
        if (calc[i]) {
          if (i != 4) {
            time = calc[i];
            break;
          } else if (calc[i] === "60분 전") {
            time = "방금 전";
            break;
          } else {
            time = calc[i];
          }
        }
      }
      return time;
    };
    // let now;
    return (
      <div
        key={index}
        className="w-full border rounded-lg bg-white p-10 relative"
      >
        <div className="absolute right-10 top-8 space-x-1">
          <button
            onClick={() => {
              // updateData(item[1].id);
            }}
            className="bg-gray-400 hover:bg-gray-500 text-white px-3 py-1 rounded-lg text-xs"
          >
            수정
          </button>
          <button
            onClick={(e) => {
              // deleteData(item[1].id);
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-lg text-xs"
          >
            삭제
          </button>
        </div>
        <div className="text-xs mb-2 text-gray-500">{writtenTime()}</div>
        <div className="text-lg text-gray-800">
          이름 : {item[1].name} | 아이디 : {item[1].id}
        </div>
        <div className="text-lg text-gray-800">연락처 : {item[1].phone}</div>
        <div className="text-lg text-gray-800">이메일 : {item[1].email}</div>
        <div className="text-lg text-gray-800">내용 : {item[1].content}</div>
      </div>
    );
  });
  return (
    <>
      <div className="grid grid-cols-2 gap-5">{dataListRender}</div>
    </>
  );
}
