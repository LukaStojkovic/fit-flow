import Spinner from "../(site)/_components/Spinner";

export default function loading() {
  return (
    <div className="flex justify-center items-center h-screen w-full">
      <Spinner />
    </div>
  );
}
