import dynamic from "next/dynamic";

const HomeForm = dynamic(() => import("../components/HomeForm"), { ssr: false });

export default function Page() {
  return <HomeForm />;
}
