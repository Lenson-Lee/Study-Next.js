// app/about/page.js
// https://velog.io/@khy226/React-Toast-UI-Editor-%EC%A0%81%EC%9A%A9%EA%B8%B0

"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";
import Link from "next/link";

const ToastEditor = dynamic(() => import("components/editor/ToastEditor"), {
  ssr: false,
});
const ToastViewer = dynamic(() => import("components/editor/ToastViewer"), {
  ssr: false,
});

const about = () => {
  const router = usePathname();

  const editorRef = useRef<any>(null);
  const [inputName, setInputName] = useState("");
  const [inputMail, setInputMail] = useState("");
  const [inputPhone, setInputPhone] = useState("");

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

      //app에 파일 폴더 추가해서 (storage/files 등) 파일이름겹치면 안되서 랜덤Nan수 생성(특수문자,숫자,하이픈등 금지)파일저장 md파일로 저장되도록..,
      //날짜+
      // axios로
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
      alert(data.message);
    });
  };

  const exportTxt = useCallback(() => {
    //에디터의 내용 들어옴
    const editorIns = editorRef?.current?.getInstance();
    const content = editorIns.getMarkdown();

    let fileName = inputName ? `${inputName}.md` : "unknown.md";
    const element = document.createElement("a");
    const file = new Blob([content], {
      type: "text/plain",
    });

    element.href = URL.createObjectURL(file);

    element.download = fileName;
    document.body.appendChild(element); // FireFox
    element.click();
    element.remove();
  }, []);

  return (
    <div className="mt-10 max-w-screen-xl mx-auto">
      <form onSubmit={submitData} className="flex space-x-5">
        <div className="w-full">
          <ToastEditor content="" editorRef={editorRef} />
          <button
            onClick={() => exportTxt()}
            className="px-4 py-1 border-2 border-blue-600 text-blue-600 text-sm font-semibold rounded-lg mt-10"
          >
            내보내기
          </button>
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
    </div>
  );
};

export default about;
