const questions = [ 
   { 
     question: "What is the capital of Australia?", 
     options: ["Sydney", "Melbourne", "Canberra", "Brisbane"], 
     correctAnswer: "Canberra", 
     status: "Active" 
   }, 
   { 
     question: "Who wrote the play 'Romeo and Juliet'?", 
     options: ["Charles Dickens", "William Shakespeare", "Leo Tolstoy", "Mark Twain"], 
     correctAnswer: "William Shakespeare", 
     status: "Active" 
   }, 
   { 
     question: "Which planet is known as the Red Planet?", 
     options: ["Venus", "Mars", "Jupiter", "Mercury"], 
     correctAnswer: "Mars", 
     status: "Active" 
   }, 
   { 
     question: "Which gas do plants absorb from the atmosphere?", 
     options: ["Oxygen", "Hydrogen", "Nitrogen", "Carbon dioxide"], 
     correctAnswer: "Carbon dioxide", 
     status: "Active" 
   }, 
   { 
     question: "Which is the longest river in the world?", 
     options: ["Amazon", "Nile", "Yangtze", "Mississippi"], 
     correctAnswer: "Nile", 
     status: "Active" 
   }, 
   { 
     question: "Which country hosted the 2020 Summer Olympics (held in 2021)?", 
     options: ["China", "Brazil", "Japan", "South Korea"], 
     correctAnswer: "Japan", 
     status: "Active" 
   }, 
   { 
     question: "What is the boiling point of water in Celsius?", 
     options: ["90°C", "100°C", "80°C", "120°C"], 
     correctAnswer: "100°C", 
     status: "Active" 
   }, 
   { 
     question: "Who painted the Mona Lisa?", 
     options: ["Picasso", "Michelangelo", "Leonardo da Vinci", "Van Gogh"], 
     correctAnswer: "Leonardo da Vinci", 
     status: "Active" 
   }, 
   { 
     question: "Which organ is responsible for pumping blood?", 
     options: ["Brain", "Liver", "Heart", "Lungs"], 
     correctAnswer: "Heart", 
     status: "Active" 
   }, 
   { 
     question: "What is the hardest natural substance on Earth?", 
     options: ["Iron", "Diamond", "Quartz", "Platinum"], 
     correctAnswer: "Diamond", 
     status: "Active" 
   }, 
   { 
     question: "Which planet is closest to the Sun?", 
     options: ["Venus", "Earth", "Mars", "Mercury"], 
     correctAnswer: "Mercury", 
     status: "Active" 
   }, 
   { 
     question: "How many continents are there on Earth?", 
     options: ["5", "6", "7", "8"], 
     correctAnswer: "7", 
     status: "Active" 
   }, 
   { 
     question: "Who discovered gravity?", 
     options: ["Albert Einstein", "Isaac Newton", "Galileo", "Thomas Edison"], 
     correctAnswer: "Isaac Newton", 
     status: "Active" 
   }, 
   { 
     question: "Which element has the chemical symbol 'O'?", 
     options: ["Gold", "Oxygen", "Osmium", "Ozone"], 
     correctAnswer: "Oxygen", 
     status: "Active" 
   }, 
   { 
     question: "Which is the largest mammal in the world?", 
     options: ["Elephant", "Blue Whale", "Giraffe", "Hippopotamus"], 
     correctAnswer: "Blue Whale", 
     status: "Active" 
   }, 
   { 
     question: "What is the capital of India?", 
     options: ["Mumbai", "New Delhi", "Kolkata", "Chennai"], 
     correctAnswer: "New Delhi", 
     status: "Active" 
   }, 
   { 
     question: "Which sport is known as the 'king of sports'?", 
     options: ["Tennis", "Cricket", "Soccer (Football)", "Basketball"], 
     correctAnswer: "Soccer (Football)", 
     status: "Active" 
   }, 
   { 
     question: "Who is known as the 'Father of the Nation' in India?", 
     options: ["Jawaharlal Nehru", "Sardar Patel", "Subhas Chandra Bose", "Mahatma Gandhi"], 
     correctAnswer: "Mahatma Gandhi", 
     status: "Active" 
   }, 
   { 
     question: "Which bird is the symbol of peace?", 
     options: ["Crow", "Pigeon", "Dove", "Parrot"], 
     correctAnswer: "Dove", 
     status: "Active" 
   }, 
   { 
     question: "What is the smallest prime number?", 
     options: ["0", "1", "2", "3"], 
     correctAnswer: "2", 
     status: "Active" 
   }, 
   { 
     question: "Which festival is known as the festival of lights?", 
     options: ["Holi", "Diwali", "Eid", "Christmas"], 
     correctAnswer: "Diwali", 
     status: "Active" 
   }, 
   { 
     question: "Which is the largest desert in the world?", 
     options: ["Sahara", "Gobi", "Thar", "Kalahari"], 
     correctAnswer: "Sahara", 
     status: "Active" 
   }, 
   { 
     question: "Who invented the telephone?", 
     options: ["Thomas Edison", "Alexander Graham Bell", "Nikola Tesla", "Isaac Newton"], 
     correctAnswer: "Alexander Graham Bell", 
     status: "Active" 
   }, 
   { 
     question: "Which vitamin is produced when the skin is exposed to sunlight?", 
     options: ["Vitamin A", "Vitamin C", "Vitamin D", "Vitamin B"], 
     correctAnswer: "Vitamin D", 
     status: "Active" 
   }, 
   { 
     question: "Which is the fastest land animal?", 
     options: ["Lion", "Tiger", "Cheetah", "Horse"], 
     correctAnswer: "Cheetah", 
     status: "Active" 
   }, 
   { 
     question: "Which language is the most spoken in the world?", 
     options: ["English", "Hindi", "Mandarin Chinese", "Spanish"], 
     correctAnswer: "Mandarin Chinese", 
     status: "Active" 
   }, 
   { 
     question: "What is the freezing point of water?", 
     options: ["100°C", "50°C", "0°C", "-10°C"], 
     correctAnswer: "0°C", 
     status: "Active" 
   }, 
   { 
     question: "What is the chemical symbol of gold?", 
     options: ["Go", "Gd", "Au", "Ag"], 
     correctAnswer: "Au", 
     status: "Active" 
   }, 
   { 
     question: "Who is the author of Harry Potter?", 
     options: ["J.R.R. Tolkien", "J.K. Rowling", "C.S. Lewis", "Suzanne Collins"], 
     correctAnswer: "J.K. Rowling", 
     status: "Active" 
   }, 
   { 
     question: "What currency is used in Japan?", 
     options: ["Yen", "Won", "Yuan", "Peso"], 
     correctAnswer: "Yen", 
     status: "Active" 
   }, 
   { 
     question: "Which is the tallest mountain in the world?", 
     options: ["K2", "Kangchenjunga", "Mount Everest", "Lhotse"], 
     correctAnswer: "Mount Everest", 
     status: "Active" 
   }, 
 ]; 
 
 export default questions;