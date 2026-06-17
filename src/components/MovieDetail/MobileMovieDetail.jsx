import { Play, Star } from "lucide-react";
export default function ({ img }) {
  return (
    <div>
      <div
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/w500/${img})`,
        }}
        className="bg-cover bg-center bg-no-repeat min-h-[200px]"
      >
        <div>
          <div className="w-14 h-14 bg-background-sec rounded-full flex justify-center items-center ring-1 ring-primary">
            <Play className="text-primary" />
          </div>
        </div>
        <h1 className="font-bold text-3xl">Mortal combat</h1>
        <p>2026 | 116 min</p>
        <p>
          <Star className="text-yellow-300 inline-block" /> 8.02 (199K.)
        </p>
      </div>
      <div>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Soluta eaque
          eligendi quae laudantium aperiam, delectus in id earum sequi suscipit
          voluptatum adipisci expedita quis consectetur labore voluptatibus
          repellat reprehenderit porro?
        </p>
      </div>
    </div>
  );
}
