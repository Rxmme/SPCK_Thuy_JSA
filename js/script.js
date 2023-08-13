const startBtn = document.querySelector('.start-btn');
const popupInfo = document.querySelector('.popup-info');
const exitBtn = document.querySelector('.exit-btn');
const main = document.querySelector('.main');
const continueBtn = document.querySelector('.continue-btn');
const quizSection = document.querySelector('.quiz-section');
const quizBox = document.querySelector('.quiz-box');
const resultBox = document.querySelector('.result-box');
const tryAgainBtn = document.querySelector('.tryAgain-btn');
const goHomeBtn = document.querySelector('.goHome-btn');




startBtn.onclick = ()=>{
    popupInfo.classList.add('active');//show popup
    main.classList.add('active');
}

exitBtn.onclick = ()=>{
    popupInfo.classList.remove('active');//hide popup
    main.classList.remove('active');
}

continueBtn.onclick = ()=>{
    quizSection.classList.add('active');//show quiz section
    popupInfo.classList.remove('active');//hide popup
    main.classList.remove('active');
    quizBox.classList.add('active');//show quiz box

    showQuestions(0);//calling showQestions function
    questioncounter(1);
    headerScore();
}

let questioncount = 0;
let questionNumb = 1;
let userScore = 0;

const nextBtn = document.querySelector('.next-btn');

nextBtn.onclick = ()=>{
    if(questioncount < questions.length - 1){
        questioncount++;
        showQuestions(questioncount);
        questionNumb++;
        questioncounter(questionNumb);

        nextBtn.classList.remove('active');//hide the next button

    }
    else{
        console.log('Questions completed');
        showResultBox();
    }
}

tryAgainBtn.onclick = ()=>{
    quizBox.classList.add('active');//show quiz section
    resultBox.classList.remove('active');//hide result box
    nextBtn.classList.remove('active');//hide the next button
    // questioncount = 0;
    questioncount = 0;
    questionNumb = 1;
    userScore = 0;
    showQuestions(questioncount);
    questioncounter(questionNumb);
    headerScore();
}

goHomeBtn.onclick = ()=>{
    resultBox.classList.remove('active');//hide result box
    quizSection.classList.remove('active');//hide quiz section
    nextBtn.classList.remove('active');//hide the next button
    // questioncount = 0;
    questioncount = 0;
    questionNumb = 1;
    userScore = 0;
    showQuestions(questioncount);
    questioncounter(questionNumb);
    headerScore();
}

const optionsList = document.querySelector('.option-list');

function showQuestions(index){
    const questionText = document.querySelector('.question-text');
    questionText.textContent = `${questions[index].numb}. ${questions[index].question}`;//chuyển số câu hỏi và câu hỏi từ mảng;
    let optionTag = `<div class="option"><span>${questions[index].options[0]}</span></div>
                    <div class="option"><span>${questions[index].options[1]}</span></div>
                    <div class="option"><span>${questions[index].options[2]}</span></div>
                    <div class="option"><span>${questions[index].options[3]}</span></div>`;
    optionsList.innerHTML = optionTag;//Thêm thẻ div mới trong danh sách tùy chọn  
    
    const option = optionsList.querySelectorAll('.option');
    for(let i = 0; i < option.length; i++){
        option[i].setAttribute('onclick', 'optionSelected(this)'); //Thêm thuộc tính Onclick trong tất cả các tùy chọn có sẵn
    }
}

function optionSelected(answer){
    let userAns = answer.textContent;//Nhận tùy chọn người dùng được chọn
    let correctAns = questions[questioncount].answer;//Nhận câu trả lời đúng từ mảng
    let allOptions = optionsList.children.length;//Nhận tất cả các mục tùy chọn

    if(userAns == correctAns){
        console.log('Đáp Án Đúng');	
        answer.classList.add('correct'); //Thêm màu xanh lá cây để sửa tùy chọn đã chọn
        userScore += 1;
        headerScore();
    }
    else{
        console.log('Đáp Án Sai');
        answer.classList.add('incorrect'); //Thêm màu đỏ để sửa tùy chọn đã chọn
        
        for(let i = 0; i < allOptions; i++){
            if(optionsList.children[i].textContent == correctAns){ //Nếu có một tùy chọn phù hợp với câu trả lời mảng
                optionsList.children[i].setAttribute('class', 'option correct');//Thêm màu xanh lá cây vào tùy chọn phù hợp
            }
        }
    }

    for(let i = 0; i < allOptions; i++){
        optionsList.children[i].classList.add('disabled');//Khi người dùng chọn tùy chọn thì đã tắt tất cả các tùy chọn
    }

    nextBtn.classList.add('active');//Khi người dùng chọn tùy chọn thì kích hoạt nút tiếp theo

}

function questioncounter(index){
    const questionTotal = document.querySelector('.question-total');
    questionTotal.textContent = `${index}. of ${questions.length} Questions`;//chuyển số câu hỏi và câu hỏi từ mảng
}

function headerScore(){
    const headerScoreText = document.querySelector('.header-score');
    headerScoreText.textContent = `Score: ${userScore} / ${questions.length}`;//Vượt qua người dùng và điểm số từ mảng
}

function showResultBox(){
    quizBox.classList.remove('active');//ẩn quiz box
    resultBox.classList.add('active');//hiện result box

    const scoreText = resultBox.querySelector('.score-text');
    scoreText.textContent = `Your Score: ${userScore} out of ${questions.length}`;//Vượt qua người dùng và điểm số từ mảng

    const circularProgress = document.querySelector('.cirular-progress');
    const progressValue = resultBox.querySelector('.progress-value');

    let progressStartValue = -1;
    let progressEndValue = (userScore / questions.length) * 100;
    let speed = 20;

    let progress = setInterval(() => {
        progressStartValue++;
        console.log(progressStartValue);

        circularProgress.style.background = `conic-gradient(#c40094 ${progressStartValue * 3.6}deg, rgba(255, 255, 255, .1) 0deg)`;


        progressValue.textContent = `${progressStartValue}%`;
        if(progressStartValue == progressEndValue){
            clearInterval(progress);
        }
    },speed);
}
