
import { FC } from "react";
import Counter from "../components/Counter";

type HomeProps = {
  title?: string;
};

const Home: FC<HomeProps> = ({ title }) => {
  return (
    <div>
      <p>{title ?? "Home"}</p>
      <Counter />
    </div>
  );
};

export default Home;
