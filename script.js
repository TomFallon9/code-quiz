$(document).ready(function () {
 
 
   // Declarations for JQUERY
   const $home = $("#home");
   const $timer = $("#timer");
   const $quiz = $("#quiz");
   const $question = $("#question");
   const $btn0 = $("#btn0");
   const $btn1 = $("#btn1");
   const $btn2 = $("#btn2");
   const $btn3 = $("#btn3");
   const $highScores = $("#high-scores");
   let $highScoresList = $("#high-scores-list");
   const $results = $("#results");
   const $userScoreEl = $("#user-score");
   let $seconds = $("#seconds");
   let $userInitialsEl = $("#initials-input");
 
   // variables
   let counter = 60;
   let userScore = 0;
   let scores = [];
   let interval;
  
   //questions object
   let questions = [
     {
       question: "Which of the following is correct about features of JavaScript?",
       choices: ["Javascript is a high-level programming language", "JavaScript is complementary to and integrated with HTML.", "JavaScript is open and cross-platform.", "All of the above."],
       answer: "All of the above.",
     },
     {
       question: "Which of the following function of Boolean object returns a string containing the source of the Boolean object?",
       choices: ["toSource( )", "valueOf( )", "toString( )", "none of the above"],
       answer: "toSource( )",
     },
     {
       question: "What programming language is the most widely used today?",
       choices: ["Java", "Python", "JavaScript", "C++"],
       answer: "JavaScript",
     },
     {
       question: "What is JavaScript?",
       choices: ["Formula", "Code Editor", "Function", "Programming Language"],
       answer: "Programming Language",
     },
     {
       question: "Which of the following function of Array object joins all elements of an array into a string?",
       choices: ["concat( )", "join ( )", "pop( )", "map( )"],
       answer: "join ( )",
     },
     {
       question: "Which of the following is not a JavaScript term?",
       choices: ["Var", "Const", "Let", "Esq"],
       answer: "Esq",
     },
     {
       question: "Which of the following is the correct syntax to print a page using JavaScript?",
       choices: ["document.print( )", "navigator.print( )", "window.print( );", "browser.print( )"],
       answer: "window.print( );",
     },
   ];
   let currentQuestion = 0;
 
   // Init to check local storage
   init();
 
   // Start Timer
   function startTimer() {
     interval = setInterval(function () {
       counter--;
       if (counter <= 0) {
         clearInterval(interval);
         $timer.html("Time is Up!");
         endQuiz();
       } else {
         $seconds.text(counter);
       }
     }, 1000);
   }
 
   // Set next question
   function setNextQuestion() {
     $question.append(questions[currentQuestion].question);
     $btn0.attr("value", questions[currentQuestion].choices[0]);
     $btn1.attr("value", questions[currentQuestion].choices[1]);
     $btn2.attr("value", questions[currentQuestion].choices[2]);
     $btn3.attr("value", questions[currentQuestion].choices[3]);
     $btn0.append(questions[currentQuestion].choices[0]);
     $btn1.append(questions[currentQuestion].choices[1]);
     $btn2.append(questions[currentQuestion].choices[2]);
     $btn3.append(questions[currentQuestion].choices[3]);
   }
 
   // Clear last question/gets new question
   function getNewQuestion() {
     $question.html("");
     $btn0.text("");
     $btn1.text("");
     $btn2.text("");
     $btn3.text("");
     if (questions[currentQuestion] === questions[6]) {
       endQuiz();
     } else {
       currentQuestion++;
       setNextQuestion();
     }
   }
 
   // End quiz
   function endQuiz() {
     clearInterval(interval);
     $results.show();
     $quiz.hide();
     $timer.hide();
     $userScoreEl.append(userScore);
   }
 
   // Show High Scores
   function showHighScores() {
     $("#high-scores-list").empty();
     clearInterval(interval);
     $quiz.hide();
     $home.hide();
     $timer.hide();
     $results.hide();
     $highScores.show();
   }
 
   //Init function to check local storage
   function init() {
     if (localStorage.getItem("scores")) {
       const savedScores = JSON.parse(localStorage.getItem("scores"));
       scores.push(...savedScores);
       renderScores();
     }
   }
 
   // Append scores to list
   function renderScores() {
     for (let i = 0; i < scores.length; i++) {
       const score = scores[i];
       const $li = $("<li>");
       $li.text(score);
       $li.attr("data-index", i);
       $highScoresList.append($li);
     }
   }
 
   // Store scores locally
   function storeScores() {
     localStorage.setItem("scores", JSON.stringify(scores));
   }
 
   // on Click Events
 
   // Start quiz
   $("#start-btn").on("click", function () {
     $home.hide();
     $quiz.show();
     $timer.show();
     startTimer();
     setNextQuestion();
   });
 
   // Check answer
   $(".answer-btn").on("click", function () {
     if (event.target.value === questions[currentQuestion].answer) {
       userScore += 100;
       $("#correct").show();
       setTimeout(function () {
         $("#correct").hide();
       }, 1000);
       getNewQuestion();
     } else {
       counter -= 10;
       $("#incorrect").show();
       setTimeout(function () {
         $("#incorrect").hide();
       }, 1000);
       getNewQuestion();
     }
   });
 
   // Save score and initials to array
   $("#save-score").on("click", function () {
     let userInitials = $userInitialsEl.val().toUpperCase().trim();
     let savedScore = userInitials + " " + userScore;
     if (userInitials === "") {
       return;
     }
     scores.push(savedScore);
     $userInitialsEl.val("");
     showHighScores();
     storeScores();
     renderScores();
   });
 
   // View high scores
   $("#view-high-scores").on("click", function () {
     showHighScores();
     renderScores();
   });
 
   // Restart
   $("#start-over").on("click", function () {
     location.reload();
   });
 });
