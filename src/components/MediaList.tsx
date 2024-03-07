import { fetchAllMedia } from '@/models/mediaModel';
import Image from 'next/image';
import Link from 'next/link';
const MediaList = async () => {
  const mediaList = await fetchAllMedia();

  if (!mediaList) {
    return <p>No media found</p>;
  }

  return (
    <section className="flex flex-col p-8">
      <ul className="grid grid-cols-3 gap-4">
        {mediaList.map((item, index) => (
          <li
            key={index}
            className="flex flex-col items-center border border-gray-300 p-4 shadow-lg rounded-md bg-white"
          >
            <Image
              src={item.thumbnail}
              alt={item.title}
              width={320}
              height={200}
            />
            <h3 className="text-lg font-bold self-start">{item.title}</h3>
            <p>Description: {item.description}</p>
            <p>Date: {new Date(item.created_at).toLocaleDateString('fi-FI')}</p>
            <Link href={`/single/${item.media_id}`}>View</Link>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default MediaList;
