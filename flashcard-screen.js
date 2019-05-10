// TODO(you): Modify the class in whatever ways necessary to implement
// the flashcard app behavior.
//
// You may need to do things such as:
// - Changing the constructor parameters
// - Rewriting some of the existing methods, such as changing code in `show()`
// - Adding methods
// - Adding additional fields

class FlashcardScreen {
  constructor(containerElement) {
    this.containerElement = containerElement;
    this.card = null;
    this.wrongCard = null;
    this.reserveIncorrectList=[];
    this.isContinue = false;
    this.lastplayDeck = null;
    this.numCorrect = 0;
  }

  show() {
    this.containerElement.classList.remove('inactive');
  }
  getFashcard(){
    if(this.isContinue===true) return this.getReserveIncorrect();
    return this.card;
  }
  setIsContinue(status){
    this.isContinue = status;
  }
  setFashcard(word,definition){
    const flashcardContainer = document.querySelector('#flashcard-container');
    this.card = new Flashcard(flashcardContainer, word, definition);
  }
  setReserveIncorrect(wrongFlashcard){
    this.reserveIncorrectList.push(wrongFlashcard); 
  }
  getReserveIncorrectList(){
    return this.reserveIncorrectList;
  }
  getReserveIncorrect(){
    return this.wrongCard;
  }
  showReserveFirst(){
    this.wrongCard = this.getReserveIncorrectList().shift();
    this.wrongCard.setinitWrongRecord(this.numCorrect);
    this.wrongCard.show();
  }
  showReserveIncorrect(){
    this.wrongCard = this.getReserveIncorrectList().shift();
    this.wrongCard.setInitRecord();
    this.wrongCard.show();
  }
  initRecord(){
   const flashcardCorrect = document.querySelector('.correct');
   const flashcardInCorrect = document.querySelector('.incorrect');
   flashcardInCorrect.textContent = '0';
   flashcardCorrect.textContent = '0';
  }
  initReserveList(){
    this.reserveIncorrectList.pop();
  }
  setlastplayDeck(index){
    this.lastplayDeck = index;
  }
  hide() {
    this.containerElement.classList.add('inactive');
  }
  setnumCorrect(numCorrect){
    this.numCorrect = numCorrect;
  }
}
