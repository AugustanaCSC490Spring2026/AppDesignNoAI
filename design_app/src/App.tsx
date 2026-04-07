import "./App.css";
import QuizQuestions from "./components/QuizQuestions";

function App() {
  let movies = [
    "Inception",
    "The Matrix",
    "Interstellar",
    "The Dark Knight",
    "Pulp Fiction",
    "Fight Club",
    "Forrest Gump",
    "The Shawshank Redemption",
    "The Godfather",
    "The Lord of the Rings",
  ];

  return (
    <div>
      <QuizQuestions />
    </div>
  );
}

export default App;
