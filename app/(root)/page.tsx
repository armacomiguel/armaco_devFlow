import LocalSearch from "@/components/search/LocalSearch";
import { Button } from "@/components/ui/button";
import ROUTES from "@/constants/routes";
import Link from "next/link";

const questions = [
  {
    _id: 1,
    title: "¿Como utilizar React?",
    description: "Quiero utilizar react, puedes ayudarme?",
    tags: [
      {_id: "1", name: "React"},
      {_id: "2", name: "Learn"},
    ],
    author: {_id: "1", name: "Miguel Armenta"},
    upvotes: 10,
    asnwers: 5,
    views: 100,
    createAt: new Date(),
  },
  {
    _id: 2,
    title: "¿Como aprender Next 15?",
    description: "Quiero aprender next, de manera rapida?",
    tags: [
      {_id: "1", name: "Next"},
      {_id: "2", name: "Learn"},
    ],
    author: {_id: "1", name: "John Doe"},
    upvotes: 45,
    asnwers: 12,
    views: 55,
    createAt: new Date(),
  },
];

interface SearchParams {
  searchParams: Promise<{[key: string]: string}>
}

const Home = async ({searchParams}: SearchParams) => {

  const {query = ""} = await searchParams;
  
  const filteredQuestions = questions.filter((question) => question.title.toLowerCase().includes(
    query?.toLowerCase())
  );

  return (
    <>
      <section className="w-full flex flex-col-reverse sm:flex-row justify-between gap-4 sm:items-center">
        <h1 className="h1-bold text-dark100_light900">Todas las preguntas</h1>

        <Button className="primary-gradient min-h-[46px] px-4 py-3 !text-light-900" asChild>
          <Link href={ROUTES.ASK_QUESTION}>
            Comienza con una pregunta
          </Link>
        </Button>
      </section>
      <section className="mt-11">
        <LocalSearch 
          route="/"
          imgSrc="/icons/search.svg"
          placeholder="Search questions..."
          otherClasses="flex-1"
        />
      </section>
      Homefilter
      <div className="mt-10 flex w-full flex-col gap-6">
        {filteredQuestions.map((question) =>(
          <h1 key={question._id}>{question.title}</h1>
        ))}
      </div>
    </>
  );
};

export default Home;