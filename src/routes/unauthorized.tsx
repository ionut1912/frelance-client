import Unauthorized from "../components/auth/Unauthoized";

export default function Home() {
  return (
    <section className="prose flex justify-center">
      <Unauthorized />
    </section>
  );
}
