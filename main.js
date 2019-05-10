// TODO(you): Modify the file in whatever ways necessary to implement
// the flashcard app behavior.
const app = new App();
let dragStart = false;
let numofRound = 0;
let temp = false;
let reserveWrong = false;
let rightStatus = true;
let wrongStatus = true;
let WrongcardContinueEnd = 0;
let recordCount = 0;
let originX = null;
let originY = null;
let words=[];
let definitions=[];
let instantRecord=1;

//創建menuList
const menuChoices = document.querySelector('#choices');
    for(var i=0;i<FLASHCARD_DECKS.length;i++){
      const menuList = document.createElement('div');
      menuList.addEventListener('click',showFlashCard);
      menuList.textContent = FLASHCARD_DECKS[i].title;
      menuChoices.appendChild(menuList);
    }
//滑鼠滑動

const flashcardDrag = document.querySelector('#flashcard-container');
flashcardDrag.addEventListener('pointerdown',dragOn);
flashcardDrag.addEventListener('pointermove',dragMove);
flashcardDrag.addEventListener('pointerup',dragEnd);

function dragOn(event){
    flashcardDrag.style.transitionDuration='0s';
    temp = false;
    originX = event.clientX;
    originY = event.clientY;
    //console.log(originX);
    dragStart = true;
    event.currentTarget.setPointerCapture(event.pointerId);
}

function dragMove(event){
    if(!dragStart){
        return;
    }
    event.preventDefault();
    const currentX = event.clientX;
    const currentY = event.clientY;
    deltaX = currentX-originX;
    deltaY = currentY-originY;
    const rotateDegree = 0.2*(deltaX);
    flashcardDrag.style.transform = 'translate(' + 
    deltaX + 'px, ' + deltaY + 'px)'+'rotate(' + rotateDegree + 'deg)';
    if(deltaX>=150){
        const body = document.querySelector('body');
        body.style.backgroundColor = '#97b7b7';
        temp = true;
        app.flashcards.getFashcard().setRecord(1,0,rightStatus,wrongStatus);
        rightStatus = false;
    }
    else if (deltaX<=-150){
        const body = document.querySelector('body');
        body.style.backgroundColor = '#97b7b7';
        temp = true;
        app.flashcards.getFashcard().setRecord(0,1,rightStatus,wrongStatus);
        wrongStatus = false;
        reserveWrong = true;
    }
    else{
        temp=false;
        reserveWrong = false;
        const body = document.querySelector('body');
        body.style.backgroundColor = '#d0e6df';
        if(rightStatus===false){
            rightStatus=true;
            app.flashcards.getFashcard().setRecord(-1,0,rightStatus,wrongStatus);
        }
        if(wrongStatus===false){
            wrongStatus=true;
            app.flashcards.getFashcard().setRecord(0,-1,rightStatus,wrongStatus);
        }
    }
}
function dragEnd(event){
    dragStart = false;
    const body = document.querySelector('body');
    body.style.backgroundColor = '#d0e6df';
    if(!temp){
        flashcardDrag.style.transitionDuration='0.6s';
    }
    else if(temp) {
        const lastRightRecord = app.flashcards.getFashcard().getCorrectRecord();
        const lastWrongRecord = app.flashcards.getFashcard().getInCorrectRecord();
        numofRound++;
        if(numofRound===words.length||numofRound===WrongcardContinueEnd){
            if(reserveWrong===true)app.flashcards.reserveIncorrectList.push(app.flashcards.getFashcard());
            app.flashcards.getFashcard().setRecord(0,0,true,true);
            app.flashcards.getFashcard().hide();
            app.flashcards.hide();
            app.results.show(lastRightRecord,lastWrongRecord);
            if(lastRightRecord!=numofRound){
                console.log('b'+lastRightRecord);
                app.flashcards.setnumCorrect(lastRightRecord);
                app.flashcards.setIsContinue(true);
                WrongcardContinueEnd = app.flashcards.getReserveIncorrectList().length;
            }
            if(lastRightRecord===WrongcardContinueEnd)WrongcardContinueEnd=0;
            numofRound=0;
            words=[];
            definitions=[];
            rightStatus = true;
            wrongStatus = true;
        }
        else if(reserveWrong===true){
            //app.flashcards.getFashcard().setInitRecord();
            app.flashcards.reserveIncorrectList.push(app.flashcards.getFashcard());
            app.flashcards.getFashcard().hide();
            if(app.flashcards.isContinue===true)app.flashcards.showReserveIncorrect();
            else app.flashcards.setFashcard(words[numofRound],definitions[numofRound]);
            console.log('record'+' '+lastRightRecord+' '+lastWrongRecord);
            app.flashcards.getFashcard().setRecord(lastRightRecord,lastWrongRecord,true,true);
            rightStatus = true;
            wrongStatus = true;
            reserveWrong===false;
        }
        else{
            //if(lastRightRecord)
            app.flashcards.getFashcard().remove();
            if(app.flashcards.isContinue===true)app.flashcards.showReserveIncorrect();
            else app.flashcards.setFashcard(words[numofRound],definitions[numofRound]);
            app.flashcards.getFashcard().setRecord(lastRightRecord,lastWrongRecord,true,true);
            rightStatus = true;
            wrongStatus = true;
        }
        
    }
    flashcardDrag.style.transform = 'rotate(' + 0 + 'deg)';
}


function showFlashCard(event){
    const currentSelect = event.currentTarget;
    WrongcardContinueEnd=0;
    app.menu.hide();
    app.flashcards.show();
    for(var i=0;i<FLASHCARD_DECKS.length;i++){
        if(FLASHCARD_DECKS[i].title === currentSelect.textContent){
            app.flashcards.setlastplayDeck(i);
            for(prop in FLASHCARD_DECKS[i].words){
                words.push(prop);
                definitions.push(FLASHCARD_DECKS[i].words[prop]);
                }
        }
    }
    app.flashcards.setFashcard(words[numofRound],definitions[numofRound]);
}




