# Tetris-by-JS
Tetris by JS

https://km-michael.github.io/Tetris-by-JS/

사용한 기술스택
HTML, CSS, JavaScript

세부 사항

document.querySelector('.class')를 이용해 DOM 불러오기
CSS GRID가 아닌 for Statement와 document.createElement('tagname')으로 생성한 HTML Element를 prepend로 상위개체에 삽입하는 방식으로 가로 10칸 세로 20칸의 테트리스 보드판을 만듦
Spread Syntex를 이용해 배열 값을 복사 
Destructuring assignment를 이용해 object의 key를 variable로 사용
if statement에서 Strick equility로 type 조건을 설정후 Callback function 설정
export와 import를 이용해 block.js 값을 가져와 Object.entries() 및 Math.floor(Math.random())을 활용해 랜덤 블록을 생성
Index position을 활용해 특정 블럭의 type, direction, location의 값을 변경할 수 있게 지정함
Optional chaining, Nullish Coalescing Operator과 childNodes를 이용해 테트리스 보드판 안에 x축 y축 경계 안으로 블럭이 있도록 설정하는 코드를 짧게 작성함
forEach statement와 Element.classList.add / remove를 활용해 블럭이 움직일 때 class를 부여 혹은 제거함으로써 이동시 기존 블럭 제거, 바닥에 안착한 블럭 확인하여 그 위에 안착할 수 있도록함
forEach statement로 가로줄에 해당하는 모든 블럭이 특정 class인 경우를 확인 후 Element.remove로 해당 줄 제거, 제거시 class 부여 및 setTimeout으로 flinkering 효과 부여함
블럭이 경계 안으로 움직이도록 설정했지만 블럭이 쌓여서 보드판을 벗어날 경우 retry가 발생하는데 Recursion을 이용해 retry 일경우 게임종료 화면이 나오도록 설정
Recursion을 사용할 경우 과도한 반복실행으로 오류가 발생하므로 setTimeout을 이용해 Call Stack을 벗어나 Web APIs -> Callback Queue -> Event Loop 경로로 작동하도록 설정
라인 제거시 지워진 라인의 개수에 따라 레벨을 증가시키고 Switch statement로 얻는 점수를 다르게 설정후 Element.innerHTML로 변경된 점수와 레벨, 지워진 라인 수를 스크린에 띄움
EventTarget.addeventListener과 switch statement, keycode를 이용해 방향키와 스페이스로 블럭을 컨트롤할 수 있게 하고 restart 버튼으로 게임을 재시작 할 수 있게함 

