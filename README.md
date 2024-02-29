# 가배도

<img src ="https://github.com/porosadporosad/GABAEDO/blob/login/public/readme/image.png?raw=true" width="80%">

* 서울의 카페를 주제별로 모아보고 공유하는 사이트
* 홈페이지 링크 - http://www.gabaedo.xyz

## 개발 기간 : 2024. 02.23 ~ 2024.02.29
</br></br>

## 팀원 소개

|김소현|김연재|김형민|박지영|정보연|
|:---:|:---:|:---:|:---:|:---:|
| ![김소현](https://github.com/porosadporosad/GABAEDO/blob/login/public/team/%EC%8A%A4%ED%81%AC%EB%A6%B0%EC%83%B7%202024-02-28%20%EC%98%A4%ED%9B%84%202.26.55.png?raw=true) | ![김연재](https://github.com/porosadporosad/GABAEDO/blob/login/public/team/%EC%8A%A4%ED%81%AC%EB%A6%B0%EC%83%B7%202024-02-28%20%EC%98%A4%ED%9B%84%203.47.59.png?raw=true) | ![김형민](https://github.com/porosadporosad/GABAEDO/blob/login/public/team/Screen%20Shot%202024-02-28%20at%202.36.39%20PM.png?raw=true) | ![박지영](https://github.com/porosadporosad/GABAEDO/blob/login/public/team/image1.png?raw=true) | ![정보연](https://github.com/porosadporosad/GABAEDO/blob/login/public/team/image.png?raw=true) |
|                                   [aotoyae](https://github.com/aotoyae)                                   |                           [porosadporosad](https://github.com/porosadporosad)                           |                               [C1oudys](https://github.com/C1oudys)                               |                                [redberry0217](https://github.com/redberry0217)                                |                               [developeryeon](https://github.com/developeryeon)                               |

<br/>

## 🚩시작 가이드

```
$ git clone https://github.com/porosadporosad/GABAEDO.git
$ npm install
```

<br/>

## 📃 페이지와 기능

* 메인 페이지
  * 게시글은 태그별, 전체보기, 해시태크별 등 다양한 주제로 정렬 가능
  * 게시글 작성 (작성)
* 게시글 상세페이지
  * 게시글 클릭시 상세 페이지로 이동
  * 게시글에 등록된 장소를 지도에 표시
  * 북마크 표시하고 해제하기
  * 지도 마커 클릭시 해당 카페 이름 유튜브 검색 결과 출력
* 지도 검색
  * 카페 이름 키워드로 검색하기
  * 원하는 카페 게시글 추가하기
* 마이페이지
  * 나의 가입정보, 활동정보 확인
  * 닉네임, 프로필 현재 상태 수정
  * 작성한 게시글 모아보기 및 삭제하기
* 로그인 페이지 
* 회원가입 페이지 

## 💻️ 사용된 기술

* React
* React-Query
* React toastify
* Axios
* Styled-components
* Firebase
* Kakao Map API
* Youtube API

</br>

## ❗ 어려웠던 점
- 파이어베이스와 카카오맵API, 유튜브API를 활용하여 유저 데이터를 생성하고 수정, 및 삭제하는 것이 어려우면서도 재미있었습니다. 특히 카카오맵에서 다양하게 제공하는 기능을 가지고 적재적소에서 활용하는 것이 쉽지 않았습니다.
- 프로필사진을 변경했을 때 바로 렌더링 되지 않았던 부분에서 많이 당황스러웠고, 어려웠습니다.
