import QuestionCard from "@/components/cards/QuestionCard";
import HomeFilter from "@/components/filters/HomeFilter";
import LocalSearch from "@/components/search/LocalSearch";
import { Button } from "@/components/ui/button";
import ROUTES from "@/constants/routes";
import Link from "next/link";

const urlImg = "https://lh3.googleusercontent.com/a/ACg8ocKP23pxpMM4qi-wrOOZfJt7JALVl1qX1OPnF54jcrar_oMVuOFA=s288-c-no";

const questions = [
  {
    _id: "1",
    title: "¿Como utilizar React?",
    // description: "Quiero utilizar react, puedes ayudarme?",
    tags: [
      {_id: "1", name: "React"},
      {_id: "2", name: "React"},
    ],
    author: {_id: "1", name: "Miguel Armenta", image: urlImg},
    upvotes: 10,
    answers: 5,
    views: 100,
    createdAt: new Date(),
  },
  {
    _id: "2",
    title: "¿Como aprender JavasCript?",
    // description: "Quiero aprender next, de manera rapida?",
    tags: [
      {_id: "1", name: "JavasCript"},
      {_id: "2", name: "JavasCript"},
    ],
    author: {_id: "1", name: "John Doe", image: urlImg},
    upvotes: 45,
    answers: 12,
    views: 55,
    createdAt: new Date(),
  },
];

interface SearchParams {
  searchParams: Promise<{[key: string]: string}>
}

const Home = async ({searchParams}: SearchParams) => {

  const {query = "", filter = ""} = await searchParams;
  
  const filteredQuestions = questions.filter((question) => {
    const matchesQuery = question.title
      .toLowerCase()
      .includes(query.toLowerCase());
    const matchesFilter = filter
      ? question.tags[0].name.toLowerCase() === filter.toLowerCase() : true;
    
    return matchesQuery && matchesFilter;
  });

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

      <HomeFilter />

      <div className="mt-10 flex w-full flex-col gap-6">
        {filteredQuestions.map((question) =>(
          <QuestionCard key={question._id} question={question}/>
        ))}
      </div>
    </>
  );
};

export default Home;