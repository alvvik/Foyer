import { useParams } from "react-router-dom";

export default function WatchList() {
  const { WatchListName: name } = useParams();
  if (!WatchListName) return <div>Nie znaleziono listy.</div>;

  return <h1>Twoja lista: {WatchListName}</h1>;
}
