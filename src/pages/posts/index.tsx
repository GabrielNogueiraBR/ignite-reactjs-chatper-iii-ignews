import Head from "next/head";
import styles from "./styles.module.scss";

export default function Posts() {
  return (
    <>
      <Head>
        <title>Posts | Ignews</title>
      </Head>

      <main className={styles.container}>
        <div className={styles.posts}>
          <a href="#">
            <time>12 de março de 2021</time>
            <strong>Creating a Monorepo with Lerna</strong>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum
              eligendi corporis asperiores, quas quasi, magnam quia officia hic
              quisquam repellat dolor facilis esse dolorem expedita! Neque
              commodi ad pariatur tempora?
            </p>
          </a>
        </div>
      </main>
    </>
  );
}
