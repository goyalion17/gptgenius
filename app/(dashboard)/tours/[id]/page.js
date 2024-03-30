import Link from "next/link";
import Image from "next/image";
import { redirect } from "next/navigation";
import axios from "axios";

import TourInfo from "@/components/TourInfo";

import { generateTourImage, getSingleTour } from "@/utils/action";

const url = `https://api.unsplash.com/search/photos?client_id=${process.env.UNSPLASH_API_KEY}&query=`;

const SingleTourPage = async ({ params }) => {
  const tour = await getSingleTour(params.id);
  if (!tour) {
    redirect("/tours");
  }

  // generating images from unsplash
  const { data } = await axios.get(`${url}${tour.city}`);
  const tourImage = data?.results[0]?.urls?.raw;

  // generating images from openai
  /* const tourImage = await generateTourImage({
    city: tour.city,
    country: tour.country,
  }); */

  return (
    <div>
      <Link href="/tours" className="btn btn-secondary mb-12">
        back to tours
      </Link>
      {tourImage ? (
        <div>
          <Image
            src={tourImage}
            width={300}
            height={300}
            className="rounded-lg shadow-xl mb-16 h-96 w-96 object-cover"
            alt={tour.title}
            priority
          />
        </div>
      ) : null}
      <TourInfo tour={tour} />
    </div>
  );
};

export default SingleTourPage;
