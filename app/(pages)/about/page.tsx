// app/about/page.js
// https://velog.io/@khy226/React-Toast-UI-Editor-%EC%A0%81%EC%9A%A9%EA%B8%B0

"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";

const ToastEditor = dynamic(() => import("components/editor/ToastEditor"), {
  ssr: false,
});
const ToastViewer = dynamic(() => import("components/editor/ToastViewer"), {
  ssr: false,
});

const About = () => {
  const router = usePathname();
  const editorRef = useRef<any>(null);
  const [inputTitle, setInputTitle] = useState("");
  const [inputName, setInputName] = useState("");
  const [inputMail, setInputMail] = useState("");
  const [inputPhone, setInputPhone] = useState("");

  //getData()로 불러온 DB
  const [dataList, setDataList] = useState([]);
  //페이징 처리된 데이터
  const [pageDataList, setPageDataList] = useState([]);

  //현재 페이지, 화면에 노출될 게시글 수
  const [page, setPage] = useState(1);
  const limitpage = 6;
  const offset = (page - 1) * limitpage; //시작점?
  const dataListRender = Object.entries(pageDataList).map((item, index) => {
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
              updateData(item[1].id);
            }}
            className="bg-gray-400 hover:bg-gray-500 text-white px-3 py-1 rounded-lg text-xs"
          >
            수정
          </button>
          <button
            onClick={(e) => {
              deleteData(item[1].id);
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
  //Data 전송
  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    const editorIns = editorRef?.current?.getInstance();
    const content = editorIns.getMarkdown();

    const postData = async () => {
      const data = {
        content: content,
        name: inputName,
        // unique
        email: inputMail,
        phone: parseInt(inputPhone),
      };

      //app에 파일 폴더 추가해서 (storage/files 등) 파일이름겹치면 안되서 랜덤Nan수 생성(특수문자,숫자,하이픈등 금지)파일저장 md파일로 저장되도록 axios로
      const response = await fetch("/api/post/create", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          Accept: "application / json",
        },
      });
      return response.json();
    };

    postData().then((data) => {
      console.log(data);
      alert(data.message);
    });
  }; // submitData end ===================================
  const updateData = async (target: React.SyntheticEvent) => {
    // target.preventDefault();
    const targetId = async () => {
      const data = {
        id: target,
      };

      //app에 파일 폴더 추가해서 (storage/files 등) 파일이름겹치면 안되서 랜덤Nan수 생성(특수문자,숫자,하이픈등 금지)파일저장 md파일로 저장되도록 axios로
      const response = await fetch("/api/post/update", {
        method: "put",
        body: JSON.stringify(data),
        headers: {
          Accept: "application / json",
        },
      });
      return response.json();
    };
    targetId().then((data) => {
      alert(data.message);
    });
  };
  const deleteData = async (target: React.SyntheticEvent) => {
    // e.preventDefault(); // 지우니까 작동한당..
    const targetId = async () => {
      const data = {
        id: target,
      };

      //app에 파일 폴더 추가해서 (storage/files 등) 파일이름겹치면 안되서 랜덤Nan수 생성(특수문자,숫자,하이픈등 금지)파일저장 md파일로 저장되도록 axios로
      const response = await fetch("/api/post/delete", {
        method: "delete",
        body: JSON.stringify(data),
        headers: {
          Accept: "application / json",
        },
      });
      return response.json();
    };
    targetId().then((data) => {
      alert(data.message);
    });
  }; // deleteData end ===================================

  const pagenationList = () => {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(dataList.length / limitpage); i++) {
      pageNumbers.push(i);
    }

    return (
      <>
        {pageNumbers.map((number) => (
          <button
            key={number}
            onClick={() => setPage(number)}
            className={
              "text-lg p-2 " +
              (page === number
                ? "text-blue-600 font-semibold"
                : "text-gray-500")
            }
          >
            {number}
          </button>
        ))}
      </>
    );
  };

  //Editor 내용 .md파일로 다운로드
  const exportTxt = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    //에디터의 내용 들어옴
    const editorIns = editorRef?.current?.getInstance();
    const content = editorIns.getMarkdown();
    //텍스트 다운 클릭 시 components/text 디렉터리에 파일 생성
    const response = await fetch("/api/file/createFile", {
      method: "post",
      body: JSON.stringify({ title: inputTitle, content: content }),
      headers: {
        Accept: "application / json",
      },
    }); // =================================================

    // 클라이언트에서 진행하는 다운로드 Blob -> 웹에서 다운표시가 된다.
    // fetch를 통해 서버 api 경로에서 다운로드 -> 프로젝트 내에 다운된다.
    // const element = document.createElement("a");
    // const file = new Blob([content], {
    //   type: "text/plain",
    // });
    // element.href = URL.createObjectURL(file);

    // let fileName = inputName ? `${inputName}.md` : "unknown.md";
    // element.download = fileName;
    // document.body.appendChild(element); // FireFox
    // element.click();
    // element.remove();
  }; //exportTxt end===============================

  useEffect(() => {
    async function getRead() {
      const readResponse = await fetch("/api/file/readFile");
      const result = await readResponse.json();
    }
    getRead();
  }, [exportTxt]);

  //getData
  useEffect(() => {
    // ========================================================
    async function getData() {
      const response = await fetch("/api/get/read")
        .then((res) => res.json())
        .then((jsondata) => {
          console.log("예시에요");

          console.log(jsondata);

          setDataList(jsondata.result);
          return jsondata.result;
        })
        .catch(() => {
          console.log("실패해요ㅜㅜ");
        });
    }
    getData();
  }, []); //getData end =======================================

  //데이터추가/페이지변경 의 경우 출력되는 데이터 변경
  useEffect(() => {
    pagenationList();
    let result = dataList ? dataList.slice(offset, offset + limitpage) : null;
    setPageDataList(result);
  }, [page, dataList]);

  //app에 파일 폴더 추가해서 (storage/files 등) 파일이름겹치면 안되서 랜덤Nan수 생성(특수문자,숫자,하이픈등 금지)파일저장 md파일로 저장되도록 axios로

  return (
    <div className="mt-10 max-w-screen-xl mx-auto">
      <button
        onClick={exportTxt}
        className="px-4 py-1 border-2 mb-2 border-blue-600 text-blue-600 text-sm font-semibold rounded-lg mt-8"
      >
        텍스트다운
      </button>
      <form onSubmit={submitData} className="flex space-x-5">
        <div className="w-full">
          <div className="w-full rounded-lg py-3 px-4 mb-5 border border-gray-300 outline-none">
            <p className="font-semibold text-xs">파일명</p>
            <input
              type="text"
              onChange={(e) => setInputTitle(e.target.value)}
              name="name"
              className="outline-none"
              placeholder="Example.md에서 Example을 넣어용"
            />
          </div>
          <ToastEditor content="" editorRef={editorRef} />
        </div>
        <div className="w-2/3 mx-auto space-y-5">
          <div className="w-full rounded-lg py-3 px-4 border border-gray-300 outline-none">
            <p className="font-semibold text-xs">이름</p>
            <input
              type="text"
              onChange={(e) => setInputName(e.target.value)}
              name="name"
              className="outline-none"
              placeholder="성함을 입력해주세요."
            />
          </div>
          <div className="w-full rounded-lg py-3 px-4 border border-gray-300 outline-none">
            <p className="font-semibold text-xs">이메일</p>
            <input
              onChange={(e) => setInputMail(e.target.value)}
              type="text"
              className="outline-none"
              placeholder="메일은 중복입력이 불가합니다."
            />
          </div>
          <div className="w-full rounded-lg py-3 px-4 border border-gray-300 outline-none">
            <p className="font-semibold text-xs">전화번호</p>
            <input
              type="text"
              onChange={(e) => setInputPhone(e.target.value)}
              className="outline-none"
              placeholder="숫자만 입력해 주세요"
            />
          </div>
          <button
            type="submit"
            onClick={submitData}
            className="w-full py-4 text-lg font-semibold bg-blue-600 text-white rounded-lg"
          >
            보내기
          </button>
        </div>
      </form>
      <div className="mt-10 border rounded-lg py-2 px-10">
        <ToastViewer />
      </div>

      {/* ================================================================ */}
      <p className="mt-10 text-2xl font-semibold">Data List</p>

      <div className="absolute left-0 right-0 bg-gray-100 w-full py-10 px-5 mt-10">
        <div className="max-w-screen-xl mx-auto">
          <div className="grid grid-cols-2 gap-5">{dataListRender}</div>
          <div className="flex justify-center mt-5 ">{pagenationList()}</div>
        </div>
      </div>
    </div>
  );
};

export default About;
