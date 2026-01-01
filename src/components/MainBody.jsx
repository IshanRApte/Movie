import ListOfMovies from "./ListOfMovies";
import "./MainBody.css";
import SelectedMovie from "./SelectedMovie";

function MainBody({string , selected, setSelected}) {
  return (
    <main className="main-body">
      <ListOfMovies string = {string} setSelected = {setSelected}/>
      <div className="selected-movie">
        <SelectedMovie selected = {selected}/>
      </div>
    </main>
  );
}

export default MainBody;
