import { Link } from "react-router-dom";

function getTitle(note) {
  const title = note.body.split("\n")[0];

  if (title.length > 40) {
    return title.slice(0, 40) + "...";
  }

  return title;
}

function getDate(note) {
  return new Date(note.updated).toLocaleDateString();
}

function getContent(note) {
  const title = getTitle(note);
  let content = note.body.replaceAll("\n", "");
  content = content.replaceAll(title, "");

  if (content.length > 45) return content.slice(0, 45);
  else {
    return content;
  }
}

export default function ListItem({ note }) {
  return (
    <Link to={`/note/${note.id}`}>
      <div className="notes-list-item">
        <h3>{getTitle(note)}</h3>
        <p>
          <span>{getDate(note)}</span>
          {getContent(note)}
        </p>
      </div>
    </Link>
  );
}
