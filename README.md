<<<<<<< HEAD
This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
=======
# 프론트엔드 개발자 채용 과제
### 안녕하세요, 지원자님!

에이티앤피파트너즈 비스킷팀의 서류 전형을 통과하신 것을 진심으로 축하드립니다. 
아래의 내용에 과제를 진행해 주시기 바랍니다.

## 1. 과제 내용
 - Todo List 구현

## 2. 기술 요구사항
  - **필수 기술 스택**은 `Next.js ^14 (App router)`, `Typescript`, `module scss` 입니다.
  - 추가적으로 필요한 패키지가 있다면 사용해도 좋습니다.

## 3. 공통 요구사항 
- [`json-server`](https://github.com/typicode/json-server)를 사용하여 가상의 백앤드 환경을 구축합니다.
- 모든 API 요청에 대해 `loading`, `error` 처리를 구현해야 합니다.
- 반응형 디자인 구현 (모바일, 데스크탑)
- Server Side fetching, Server action을 적극적으로 활용해주시고, 필요에 따라 Client side fetcing을 사용해도 좋습니다.
  
## 4. 페이지 및 세부 구현사항
### 페이지 
1. `/todo-list`
    <br />
  ![image](https://github.com/user-attachments/assets/04e5c78e-6ca5-4a0b-847f-dc39c90e68e3)

  - 기능 
    - Todo 생성 하기
       - Todo는 본문과 제목, 완료여부로 구성되어 있습니다.
       - Todo 생성 폼은 `dialog`로 표시합니다.
    - Todo 삭제 하기
      - 삭제 여부를 `alert-dialog` 를 통해 재확인하고 `yes` 일 때 삭제됩니다.
    - Todo 수정 하기
      - 제목과 본문을 수정 할 수 있습니다.
      - 수정 폼은 `dialog`로 표시합니다.
      - 기존 내용에서 변동이 있는 상태에서, `dialog`를 닫으려고 할때  `alert-dialog`를 통해 재확인합니다.
    - Todo 완료여부 변경
      - 체크박스 클릭을 통해 `Todo`의 완료여부를 변경 합니다.
  1. `/todo-list/{id}`
      <br />
      ![image](https://github.com/user-attachments/assets/a4e453f5-1df7-4a14-a3d1-452677425ef3)
      ![image](https://github.com/user-attachments/assets/f59ffff0-e46b-4d77-8720-84884822bc56)


  - 기능
      - Todo 수정하기
        - 상세 페이지는 수정모드와 읽기모드로 전환이 가능합니다.
        - 수정모드에서는 제목과 본문이 `form 형태`로 전환됩니다.
        - 기존 내용에서 변동이 있는 상태에서, `수정 모드`를 닫으려고 할때  `alert-dialog`를 통해 재확인합니다.
      - Todo 삭제하기
        - 삭제 여부를 `alert-dialog`를 통해서 재확인하고, 삭제 성공 시 `/todo-list` 페이지로 이동합니다.
  
### 컴포넌트 구현 사항
  - `추가`, `수정`, `삭제` 등에서 사용 할 `Button`을 구현해주세요. 
    - 2개의 테마를 가집니다 `primary, dangerous`
    - 3개의 사이즈를 가집니다. 
  - Todo의 완료여부에서 사용할 커스텀 `Checkbox` 컴포넌트를 직접 구현해주세요.
  - `dialog`와 `alert-dialog` 는 직접 구현하거나 또는 [`radix`](https://www.radix-ui.com/primitives/docs/overview/introduction)를 사용하세요.


## 5. 참고 사항
  - 디자인은 자유이며, 평가요소에 포함되지 않습니다. (레퍼런스를 참고해도 무방합니다.)
  - 필수 기능 외, 추가적으로 적용하고 싶은 기능이 있다면 구현해도 좋습니다.
  
## 6. 제출 방법
- **제출 기한**: **수신한날로부터 2일 까지**
  - e.g. *8월 20일에 수신한 경우 8월 22일 11:59 까지 제출*
- **제출 방식**: Fork 하여 링크를 아래의 메일로 전송해주세요.

## 7. 문의 사항

과제를 수행하면서 문의 사항이 있을 경우, 아래의 메일로 언제든지 연락주세요!

- **담당자 이름**: 예상기 팀장
- **이메일**: sk.ye@atnp.co.kr

---

이 README 파일은 채용 과제를 수행하는 데 필요한 정보를 체계적으로 전달하기 위한 문서입니다. 과제를 진행하면서 도움이 되기를 바라며, 최선을 다해 좋은 결과물을 만들어주시기를 기대합니다.

감사합니다.  
에이티앤피파트너즈 비스킷팀 드림
>>>>>>> 2e57365808c44b4823bc1bef3357461bacf16238
