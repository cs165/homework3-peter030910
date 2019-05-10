// TODO(you): Modify the class in whatever ways necessary to implement
// the flashcard app behavior.
//
// You may need to do things such as:
// - Changing the constructor parameters
// - Adding methods
// - Adding additional fields

class ResultsScreen {
  constructor(containerElement) {
    this.containerElement = containerElement;
    this.percent = document.querySelector('#results .percent');
    this.correct = document.querySelector('#results .correct');
    this.incorrect = document.querySelector('#results .incorrect');
    this.continueButton = document.querySelector('.continue');
    this.backButton = document.querySelector('.to-menu');
   
  }

  show(numberCorrect, numberWrong) {
    this.containerElement.classList.remove('inactive');
    this.percent.textContent = '' + ((numberCorrect/(numberCorrect+numberWrong))*100).toFixed(0)+ '';
    this.correct.textContent = '' + numberCorrect + '';
    this.incorrect.textContent = '' + numberWrong + '';
    this.showButtonContinue(parseInt(this.percent.textContent));
  }
  showButtonContinue(accuracy){
    if(accuracy===100)
      this.continueButton.textContent = 'Start over?';
    else{
      this.continueButton.textContent = 'Continue';
    }
  }
  getButtonContinue(){
    return this.continueButton.textContent;
  }
  getButton(){
    return this.continueButton;
  }
  hide() {
    this.containerElement.classList.add('inactive');
  }
}
