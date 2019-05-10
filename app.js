// TODO(you): Modify the class in whatever ways necessary to implement
// the flashcard app behavior.
//
// You may need to do things such as:
// - Changing the constructor parameters
// - Changing the code in the constructor
// - Adding methods
// - Adding additional fields

class App {
  constructor() {
    const menuElement = document.querySelector('#menu');
    this.menu = new MenuScreen(menuElement);

    const mainElement = document.querySelector('#main');
    this.flashcards = new FlashcardScreen(mainElement);

    const resultElement = document.querySelector('#results');
    this.results = new ResultsScreen(resultElement);

    this.continuePlay = this.continuePlay.bind(this);
    this.backtomenu = this.backtomenu.bind(this);
    this.results.continueButton.addEventListener('click',this.continuePlay);
    this.results.backButton.addEventListener('click',this.backtomenu);
    
  }
  continuePlay(event){
    if(this.results.getButtonContinue()==='Continue'){
    this.results.hide();
    //this.flashcards.initWrongRecord();
    this.flashcards.show();
    this.flashcards.showReserveFirst();
    }
    else{
      this.results.hide();
      this.flashcards.initRecord();
      this.flashcards.setIsContinue(false);
      this.flashcards.initReserveList();
      const menuChoices = document.querySelector('#choices');
      console.log(this.flashcards.lastplayDeck);
      menuChoices.children[this.flashcards.lastplayDeck].click();
    }
  }
  backtomenu(){
      this.results.hide();
      this.flashcards.initRecord();
      this.flashcards.setIsContinue(false);
      this.flashcards.initReserveList();
      this.menu.show();
  }
}
