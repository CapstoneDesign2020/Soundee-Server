# 🎶 Soundee-Server

**소리를 보다 Soundee**

청각 장애인을 위한 딥러닝을 이용한 일상생활 소리 분류 및 알림 애플리케이션
> 💻 2020 IT Media Engineering CapstoneDesign Project

## 👋 Introduction
### 기획의도

사물 인터넷이 활성화되어 생활에 많은 부분들이 편리해졌지만, 청각장애인은 이 편리함에 소외된 것이 현실이다. 
소리를 듣지 못하는 농인들은 냉장고를 오래 열어놨을 시 발생하는 경보음, 잊어버리고 끄지 못한 드라이기, 물소리 등의 소리를 인지하지 못한다. 농인에게도 이를 감지하고 인식할 수 있는 시스템이 필요하다.

이를 해결하기 위해 본 프로젝트는 가정에서 발생하는 소리를 인지하여 분류하여 현재 발생한 소리에 대한 정보를 알려주며 소리 정보에 대한 통계 서비스를 제공하는 애플리케이션을 기획하였다. 이를 통해 농인이 인지하지 못하는 위험과 낭비를 미리 예방하여, 농인에게 좀 더 안전하고 편리한 생활을 제공하고자 한다.

### 작품소개

무지향성 마이크를 통해 일상 소리를 감지한다. PC에 연결한 마이크로 수집한 음향 데이터를 서버에 송신하고, 서버는 수신한 소리를 딥러닝을 기반으로 한 음향 예측 알고리즘을 통해 예측 결과를 안드로이드 요청에 따라 기기에 송신한다. 안드로이드 기기는 수신한 데이터를 푸시알림과 통계 등 다양한 방법으로 제공하여 청각장애인을 위한 서비스를 제공한다.

본 프로젝트로 사회가 생각해보지 못한 청각장애인의 일상생활의 불편함에 대한 문제를 제기하여 이에 대한 관심과 해결방안의 마련을 도모한다. 더불어 앞으로의 4차 산업 기술의 발전이 비장애인의 편리함뿐만이 아닌, 장애인의 접근성을 고려해야한다는 사회적 인식을 확산시키는데 도움이 될 것이라 예상한다.

## 🧱 Server Architecture
### ✔️ Android - Server
![soundee 프로젝트 구조 최종 003](https://user-images.githubusercontent.com/43840561/97020968-31805c80-158d-11eb-821b-3748a5a2b2c0.jpeg)

### ✔️ PC - Server - Android for Real-time Sound Classification
![soundee 프로젝트 구조 최종 002](https://user-images.githubusercontent.com/43840561/97009956-bcf2f100-157f-11eb-8101-08be6a8a71bd.jpeg)
녹음 프로그램 Soundee Recorder와 어플리케이션을 동시에 실행 시킬 때, 어플리케이션에서는 5초 마다 서버에 요청을 보낸다. 서버는 요청받은 시간부터 5초 전까지의 데이터를 조회하여 데이터가 있는 경우, 현재 소리가 추론하는 class에 대하여 유의미한 소리임을 판단한다. 데이터가 없는 경우, 현재 소리가 추론하는 class에 대하여 무의미한 소리임을 나타낸다. 이에 어플리케이션에서는 실시간으로 나는 소리 class를 파악할 수 있다. 클라이언트는 해당 소리를 받아 class 별로 팝업 알림을 띄워 사용자에게 소리를 알려준다.

Soundee Recorder와 어플리케이션 각각 5초 단위로 데이터 삽입과 조회가 이루어지기 때문에 실시간으로 발생하는 소리 정보를 얻어낼 수 있다.

## 🗄 Table Doc
<img alt="테이블 명세서" src="https://user-images.githubusercontent.com/43840561/97027259-6bedf780-1595-11eb-945d-5da882e2f9a0.png">

Sound는 녹음 프로그램에서 얻은 현재 소리에 대한 인덱스, 소리 종류, 발생 시각, 소리에 대한 사용자 정보에 대한 데이터베이스 테이블 구성이다.

Sound_Class는 소리 종류에 대한 인덱스, 소리 종류명에 대한 데이터베이스 테이블 구성이다.

User는 사용자에 대한 인덱스, 이메일, 비밀번호, 솔트 값, 이름에 대한 데이터베이스 테이블 구성이다.

## 🔖 ERD (Entity-Relationship Diagram)
![image](https://user-images.githubusercontent.com/43840561/97026518-722fa400-1594-11eb-8254-efe8e331d9ed.png)


## 📃 API Doc 
### [WIKI](https://github.com/CapstoneDesign2020/Soundee-Server/wiki)

## 🧲 Dependencies
```
"dependencies": {
  "clean-css": "^4.2.3",
  "constantinople": "^4.0.1",
  "cookie-parser": "~1.4.4",
  "crypto": "^1.0.1",
  "debug": "~2.6.9",
  "dotenv": "^8.2.0",
  "express": "~4.16.1",
  "express-session": "^1.17.1",
  "http-errors": "~1.6.3",
  "jade": "~1.11.0",
  "jsonwebtoken": "^8.5.1",
  "morgan": "~1.9.1",
  "nodemailer": "^6.4.11",
  "passport": "^0.4.1",
  "passport-jwt": "^4.0.0",
  "passport-local": "^1.0.0",
  "promise-mysql": "^4.1.3",
  "rand-token": "^1.0.1"
}
 ```
