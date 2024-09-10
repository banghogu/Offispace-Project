# OffiSpace - 거점 공유 오피스 예약 웹앱 서비스

<img width="800" alt="Offispace-Info" src="https://github.com/4bujak-4bujak/frontend/assets/104253583/dc50aac8-a5d3-4618-9810-7a387558373c">
<br/>
<br/>

## 🔗 프로젝트 링크
[OffiSpace 바로가기](https://4busak.vercel.app/)

- testID : hohoj@4busak.com
- testPW : Office123!

  
  <br />
## 🧑‍🤝‍🧑 Contributors

### FE Team

<div>
  <table>
      <tr>
          <th>방호진</th>
          <th>정지오</th>
          <th>조기범</th>
      </tr>
      <tr>
          <td align="center">
              <img src="https://avatars.githubusercontent.com/u/132210541?v=4" alt="avatar" width="150" style="max-width: 100%;" /><br />
              <a href="https://github.com/banhogu">@Bang HoJin</a>
          </td>
          <td align="center">
              <img src="https://avatars.githubusercontent.com/u/104253583?v=4" alt="avatar" width="150" style="max-width: 100%;" /><br />
              <a href="https://github.com/jiohjung98">@jiohjung98</a>
          </td>
          <td align="center">
              <img src="https://avatars.githubusercontent.com/u/95483959?v=4" alt="avatar" width="150" style="max-width: 100%;" /><br />
              <a href="https://github.com/eun-hak">@JO KIBEOM</a>
          </td>
      </tr>
  </table>
</div>

### BE Team

<div>
  <table>
      <tr>
          <th>주우민</th>
          <th>김상우</th>
          <th>전유림</th>
      </tr>
      <tr>
          <td align="center">
              <img src="https://avatars.githubusercontent.com/u/121492369?v=4" alt="avatar" width="150" style="max-width: 100%;" /><br />
              <a href="https://github.com/zoomin3022">@zoomin3022</a>
          </td>
          <td align="center">
              <img src="https://avatars.githubusercontent.com/u/72953900?v=4" alt="avatar" width="150" style="max-width: 100%;" /><br />
              <a href="https://github.com/KimSangwoo1259">@KimSangwoo1259</a>
          </td>
          <td align="center">
              <img src="https://avatars.githubusercontent.com/u/139152515?v=4" alt="avatar" width="150" style="max-width: 100%;" /><br />
              <a href="https://github.com/yurim0628">@yurim0628</a>
          </td>
      </tr>
  </table>
</div>

<br/>

## 📖 프로젝트 소개

[프로젝트 상세 노션](https://radical-chatter-f1a.notion.site/Offispace-a8fcd1169ad64f0085508fa8c334f655) <br/><br/>
패스트 캠퍼스 프론트엔드 부트캠프에서 PlusX와 협력하여 진행한 기업 연계 프로젝트로, COVID-19 팬데믹 이후 증가한 원격 근무와 유연 근무 트렌드에 맞춰 MZ직장인들을 위한 거점 공유 오피스 모바일 웹앱서비스를 개발했습니다. 모바일 웹앱을 통해 사용자에게 공간 예약, 커뮤니티, 미팅 등의 서비스를 제공합니다.

<br/>

### 💡 핵심 기능

> **실시간 공간 예약 서비스**
> 
> - 내 주변 오피스 지점 찾기 및 정보 제공
> - 회의실, 1인실, 휴게실 3타입의 공간 실시간 예약
> - 예약한 공간과 날짜에 대해 일정 관리 및 요약

> **직무 별 커뮤니티 서비스**
> 
> - 회원가입 시 설정한 직무별, 관심사별 커뮤니티 제공
> - 글 작성, 댓글 작성, 좋아요, 조회수 기능

> **ETC**
> 
> - 알림 기능이 포함된, PWA 환경 제공
> - 마이페이지
> - 지점 별 1대1 문의

> **로그인/회원가입**
> 
> - 휴대폰 인증, 이메일 인증이 포함된 3단계 회원가입
> - 회원탈퇴 기능


<br/>

## 🛠️ Tech Stack

<img width="800" alt="Offispace-Info" src="https://github.com/4bujak-4bujak/frontend/assets/104253583/1ccfa4bf-421a-4865-b717-56a120b02f49"><br/><br/>


## 💻 나의 담당 기능

### **로그인/회원가입**

- **전화번호/이메일 인증**
    - 사용자가 입력한 전화번호와 이메일로 인증 코드를 발송하고, 해당 코드를 입력하여 인증을 완료합니다.
    - 휴대전화 번호와 이메일 중복 여부를 확인합니다.
- **유저 정보 입력**
    - 3단계로 이루어진 회원가입 절차를 통해 입력된 정보를 모아 백엔드에 회원가입을 요청합니다
    
    ---
    

### **메인 페이지**

- **이번 주 예약 내역 표시**
    - 로그인한 사용자의 이번 주 예약 내역을 날짜별로 표시하고, 예약 상태(이용 중, 이용 취소, 예약 취소 등)를 표시합니다.
- **지점별 실시간 좌석 정보 제공**
    - 선택한 지점의 현재 이용 가능한 좌석 수를 실시간으로 업데이트하고, 좌석별 예약 현황(빈 좌석, 예약된 좌석 등)을 표시합니다.
    
    ---
    

### **예약 페이지**

- **휴게실 예약 기능**
    - 시간 선택 기능을 통해 원하는 시간대의 휴게실 예약을 제공합니다.
    - 예약 가능 여부를 실시간으로 확인하고, 예약 확정 시 예약 상세 내역과 함께 알림을 발송합니다.
- **1인석 예약 기능**
    - 좌석 배치도에서 원하는 좌석을 선택할 수 있습니다.
- **예약 상세 내역 조회 및 예약 취소 기능**
    - 사용자가 예약한 내역을 상세히 조회하고, 예약 내역별로 취소 기능을 제공합니다.
    
    ---
    

### **커뮤니티 페이지**

- **카테고리별 전체 글 조회**
    - 커뮤니티 카테고리(예: 직무별, 관심사 등)별로 전체 글 목록을 제공하고, 각 글의 제목, 작성자, 작성일, 조회수, 좋아요 수, 미리보기 이미지를 표시합니다.
- **상세 글 조회**
    - 선택한 글의 상세 내용을 조회하고, 작성자의 프로필 정보 및 작성 시간을 표시합니다.
    - 작성자인 경우에만 글 삭제가 가능합니다.
- **이미지를 포함 글 작성**
    - 이미지 업로드 기능을 포함한 글 작성 에디터를 제공합니다.
- **댓글 작성 및 삭제**
    - 댓글 작성 및 본인이 작성한 댓글을 삭제할 수 있는 기능을 제공합니다.
- **좋아요 및 조회수 기능 구현**
    - 좋아요 기능을 제공하고, 조회수는 글이 열릴 때마다 자동으로 증가합니다.
    
    ---


<br/><br/>
## Team Convention

| 태그                  | 설명                                                                      |
| --------------------- | ------------------------------------------------------------------------- |
| `feat: `             | 새로운 기능 추가 및 개선                                                |
| `style: `              | 코드 포맷팅, 세미콜론 누락, 코드 변경이 없는 경우                                                         |
| `design: `           | CSS 등 사용자 UI 디자인 변경                                              |
| `fix: `              | 기존 기능 수정 (주로 안 좋았던 것에서 좋은 것으로)                                                   |
| `bug: `          | 버그 수정                                    |
| `refactor: `            | 결과의 변경 없이 코드의 구조를 재조정한 경우                     |
| `test: `         |  테스트 코드 추가                                                   |
| `docs: `          | 코드가 아닌 문서를 수정한 경우                                                |
| `remove: `             | 파일을 삭제하는 작업만 수행                                                      |
| `rename: `             | 파일 또는 폴더명을 수정하거나 위치(경로)를 변경                      |
| `asset: `            | 이미지 등 assets 파일 추가 |
| `chore: `           | 그 외 기타 수정                      |

<br/>

## Script

앱 실행

```
$ npm run build
$ npm run dev
```
