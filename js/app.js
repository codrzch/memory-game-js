$(document).ready(function() {

//SET UP VARIABLES
//STARTING/END POINT OF MOVE

let movesTaken = 0;
let firstMove = 0;
let secondMove = 1;
let totalMovesPerTurn = 2;

//HOW GAME IS WON
let cardPairsMatched = 0;
let totalCardPairs = 8;

/** COUNT MOVES */
let movesCounter = 0;
let performanceRating = "3 stars";

/** TIMER */
let hours = 1;
let minutes = 1;
let seconds = 1;
let timerStart = false;
let gameTimer;

/** MODAL */
let modalElement = $('.modal');
let performanceRatingElement = $('.performanceRating');
let timeTakenElement = $('.time_taken');
let movesTakenElement = $('.movesTaken');
let performanceRatingString = "Performance rating: ";
let timeTakenString = "Time taken: ";
let movesTakenString = "Moves taken: ";

//CARD LIST
let cardDeck = [
  "fa fa-diamond",
  "fa fa-paper-plane-o",
  "fa fa-anchor",
  "fa fa-bolt",
  "fa fa-cube",
  "fa fa-anchor",
  "fa fa-leaf",
  "fa fa-bicycle",
  "fa fa-diamond",
  "fa fa-bomb",
  "fa fa-leaf",
  "fa fa-bomb",
  "fa fa-bolt",
  "fa fa-bicycle",
  "fa fa-paper-plane-o",
  "fa fa-cube"];

//GAME FUNCTIONALITY

$('.card').click(function() {
  //FIRST MOVE
  if(movesTaken === firstMove) {
    $(this).addClass('open');
    //TYPE OF FIRST CARD OBJECT
    firstCard = $(this);
    firstCardId = $(this).find('i').attr('id');
    firstCardType = $(this).find('i').attr('class');
    // SECOND MOVE VS. FIRST MOVE
    movesTaken = movesTaken + 1;
  }
  //SECOND MOVE CODE
  else if (movesTaken === secondMove) {
    $(this).addClass('open');
    //TYPE OF SECOND CARD OBJECT
    secondCard = $(this);
    secondCardId = $(this).find('i').attr('id');
    secondCardType = $(this).find('i').attr('class');

    //COLOR MATCHES CARD BASED ON VALUE
    if ((firstCardId !== secondCardId) && (firstCardType === secondCardType)) {
      cardMatchSuccess(firstCard, secondCard);

      //IF GAME IS WON
      if (cardPairsMatched === totalCardPairs) {
        gameCompleted();
      };

      movesTaken = 0;
    } else if (firstCardType !== secondCardType) {
      cardMatchFail(firstCard, secondCard);
      movesTaken = 0;
    }
  };
});

    //IF SUCCESSFUL CARD MATCH
    function cardMatchSuccess(firstCard, secondCard) {
      firstCard.addClass('match');
      secondCard.addClass('match');
      cardPairsMatched = cardPairsMatched + 1;
      movesCounter = movesCounter + 1;
      moveCounter(movesCounter);
    }

    //IF UNSUCCESSFUL CARD MATCH
    function cardMatchFail(firstCard, secondCard) {
      firstCard.addClass('not-a-match');
      secondCard.addClass('not-a-match');
      movesCounter = movesCounter + 1;
      //INCORRECT CARDS GET FLIPPED BACK OVER
      flipCards(firstCard, secondCard);
      moveCounter(movesCounter);
    }

    //UNSUCCESSFUL CARD MATCH
    function flipCards(firstCard, secondCard) {
      setTimeout(function(){
            firstCard.removeClass('not-a-match open');
            secondCard.removeClass('not-a-match open');
      },1000);
    };

    //MOVE COUNTER
    function moveCounter(movesCounter){
      //NUMBER OF PLAYER MOVES
      if(movesCounter > 1) {
        $('.score-panel').find('.moves').text(movesCounter);
        $('.moves_text').text("Moves");
      } else if (movesCounter === 1) {
        $('.score-panel').find('.moves').text(movesCounter);
        $('.moves_text').text("Move");
      };

      //STAR RATING
      if (movesCounter === 10) {
        $('#first-star').removeClass('fa-star').addClass('fa-star-o');
        performanceRating = "2 stars";
      } else if (movesCounter === 20) {
        $('#second-star').removeClass('fa-star').addClass('fa-star-o');
        performanceRating = "1 star";
      };
    };

    //IF GAME WON
    function gameCompleted() {
      //STOP GAME TIMER
      clearInterval(gameTimer);
      timerStart = false;
      //POP OPEN MODAL
      modalElement.css('display', 'block');
      //MODAL CONTENT
      performanceRatingElement.text(performanceRatingString + performanceRating);
      timeTakenElement.text(timeTakenString + $('.hours').text() +
       $('.colon_one').text() +
       $('.minutes').text() +
       $('.colon_two').text() +
       $('.seconds').text());
      movesTakenElement.text(movesTakenString + movesCounter);

      //RESTART GAME
      $('.play_again_button').click(function() {
        restartGame();
        modalElement.css('display', 'none');
      });

    };

    //TIMER
    $('.card').click(function() {
      if (timerStart === false) {
        timer();
        timerStart = true;
      }
    });

    function timer() {
      gameTimer = setInterval(function() {
          //SECONDS
          if(seconds < 60) {
            $('.seconds').text(seconds + "s");
            seconds = seconds + 1;
          }
          //MINUTES
          else if (seconds === 60) {
            $('.minutes').css('visibility', 'visible');
            $('.colon_two').css('visibility', 'visible');
            seconds = 0;
            $('.seconds').text(seconds + "s");
            $('.minutes').text(minutes + "m");
            minutes = minutes + 1;
            seconds = seconds + 1;

            //HOURS
            if (minutes === 60) {
              $('.hours').css('visibility', 'visible');
              $('.colon_one').css('visibility', 'visible');
              seconds = 0;
              minutes = 0;
              $('.seconds').text(seconds + "s");
              $('.minutes').text(minutes + "m");
              $('.hours').text(hours + "hr");
              hours = hours + 1;
              minutes = minutes + 1;
              seconds = seconds + 1;
              };
          };
        }, 1000);
    };

    //RESTART THE GAME
    $('.restart').click(function() {
      restartGame();
    });

    //IF RESTART GAME
    function restartGame() {
      //RESET CARDS
      $('.card').removeClass('open match');
      movesTaken = 0;
      cardPairsMatched = 0;
      performanceRating = "3 stars";

      //TIMER
      clearInterval(gameTimer);
      seconds = 0;
      minutes = 0;
      hours = 0;
      $('.colon_one').css('visibility', 'hidden');
      $('.minutes').css('visibility', 'hidden');
      $('.colon_two').css('visibility', 'hidden');
      $('.hours').css('visibility', 'hidden');
      $('.seconds').text(seconds + "s");
      $('.minutes').text(minutes);
      $('.hours').text(hours);
      timerStart = false;

      //MOVES
      movesCounter = 0;
      $('.score-panel').find('.moves').text(movesCounter);

      //STAR RATING
      $('#first-star').removeClass('fa-star-o').addClass('fa-star');
      $('#second-star').removeClass('fa-star-o').addClass('fa-star');
      $('#third-star').removeClass('fa-star-o').addClass('fa-star');

      //SHUFFLE CARDS
      shuffle(cardDeck);
      let shuffledDeck = cardDeck;

      //ASSIGN CARDS NEW CLASSES
      $('#card_1').removeClass().addClass(shuffledDeck[0]);
      $('#card_2').removeClass().addClass(shuffledDeck[1]);
      $('#card_3').removeClass().addClass(shuffledDeck[2]);
      $('#card_4').removeClass().addClass(shuffledDeck[3]);
      $('#card_5').removeClass().addClass(shuffledDeck[4]);
      $('#card_6').removeClass().addClass(shuffledDeck[5]);
      $('#card_7').removeClass().addClass(shuffledDeck[6]);
      $('#card_8').removeClass().addClass(shuffledDeck[7]);
      $('#card_9').removeClass().addClass(shuffledDeck[8]);
      $('#card_10').removeClass().addClass(shuffledDeck[9]);
      $('#card_11').removeClass().addClass(shuffledDeck[10]);
      $('#card_12').removeClass().addClass(shuffledDeck[11]);
      $('#card_13').removeClass().addClass(shuffledDeck[12]);
      $('#card_14').removeClass().addClass(shuffledDeck[13]);
      $('#card_15').removeClass().addClass(shuffledDeck[14]);
      $('#card_16').removeClass().addClass(shuffledDeck[15]);
      };

  //SHUFFLE FUNCTION FROM http://stackoverflow.com/a/2450976
  function shuffle(array) {
      let currentIndex = array.length, temporaryValue, randomIndex;
      while (currentIndex !== 0) {
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;
          temporaryValue = array[currentIndex];
          array[currentIndex] = array[randomIndex];
          array[randomIndex] = temporaryValue;
      }
      return array;
  }
});
