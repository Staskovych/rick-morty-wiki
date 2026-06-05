import type { Location } from "@/types/rick-morty";

interface LocationCardProps {
  location: Location;
}

export default function LocationCard({
  location,
}: LocationCardProps): React.ReactElement {
  return (
    <article className="rounded-lg border-2 border-[#0b5ed7] bg-white p-3">
      <h2 className="mb-2 text-lg font-bold text-[#212529]">{location.name}</h2>
      <div className="mb-1">
        <span className="text-sm text-[#6c757d]">Type: </span>
        <span className="text-base text-[#212529]">{location.type}</span>
      </div>
      <div className="mb-1">
        <span className="text-sm text-[#6c757d]">Dimension: </span>
        <span className="text-base text-[#212529]">{location.dimension}</span>
      </div>
      <div>
        <span className="text-sm text-[#6c757d]">Residents: </span>
        <span className="text-base text-[#212529]">
          {location.residents.length}
        </span>
      </div>
    </article>
  );
}
