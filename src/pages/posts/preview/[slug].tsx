import { GetStaticPaths, GetStaticProps } from "next";

import { createClient } from "../../../services/prismicio";
import * as prismicH from "@prismicio/helpers";
import Head from "next/head";

import styles from "../post.module.scss";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/router";

interface PostPreviewProps {
  post: {
    slug: string;
    title: string;
    content: string;
    updatedAt: string;
  };
}

export default function PostPreview({ post }: PostPreviewProps) {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session?.activeSubscription) {
      router.push(`/posts/${post.slug}`);
    }
  }, [session, router, post]);

  return (
    <>
      <Head>
        <title>{post.title} | title</title>
      </Head>

      <main className={styles.container}>
        <article className={styles.post}>
          <h1>{post.title}</h1>
          <time>{post.updatedAt}</time>
          <div
            className={`${styles.postContent} ${styles.previewContent}`}
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
          <div className={styles.continueReading}>
            Wanna continue reading?
            <Link href="/">
              <a>Subscribe now 🤗</a>
            </Link>
          </div>
        </article>
      </main>
    </>
  );
}

/* 
Três opções de geração de páginas estágicas
  1. Gerar as páginas estáticas durante a build (adicionando os slugs em paths no retorno do método)
  2. Gerar a página estática no primeiro acesso (comum)
  3. Combinação das duas abordagens

  Obs: só acontece em páginas que temos parâmetros, por exemplo [slug].tsx, quando tem []
*/
export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [],
    fallback: "blocking",

    // Quando uma página não é carregada de forma estática na build
    // fallback: "blocking",  // Realiza a requisição do lado do Servidor e depois carrega a página
    // fallback: true,        // Carrega a página sem o conteúdo e depois faz a requisição pelo lado do BROWNSER do cliente
    // fallback: false,       // Retona 404
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params;

  const prismic = createClient();
  const response = await prismic.getByUID("post", String(slug));

  const post = {
    slug,
    title: prismicH.asText(response.data.title),
    content: prismicH.asHTML(response.data.content.splice(0, 4)),
    updatedAt: new Date(response.last_publication_date).toLocaleDateString(
      "pt-BR",
      {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }
    ),
  };

  return {
    props: {
      post,
    },
    revalidate: 60 * 30, // 30 minutes
  };
};
