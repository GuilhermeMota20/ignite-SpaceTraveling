import { GetStaticPaths, GetStaticProps } from 'next';
import { RichText } from 'prismic-dom';
import { FiCalendar, FiClock, FiUser } from 'react-icons/fi';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import * as Prismic from '@prismicio/client';

import Header from '../../components/Header';
import { getPrismicClient } from '../../services/prismic';

import commonStyles from '../../styles/common.module.scss';
import styles from './post.module.scss';
import { useRouter } from 'next/router';
import Head from 'next/head';

interface Post {
  first_publication_date: string | null;
  data: {
    title: string;
    banner: {
      url: string;
    };
    author: string;
    content: {
      heading: string;
      body: {
        text: string;
      }[];
    }[];
  };
}

interface PostProps {
  post: Post;
}

export default function Post({ post }: PostProps) {

  // calculando a quantidade de palavras  dentro de um post para saber o tempo de leitura que leva;
  const totalWords = post.data.content.reduce((total, contentItem) => {

    total += contentItem.heading.split(' ').length; // total de palavras no heading

    const words = contentItem.body.map(item => item.text.split(' ').length); // total de palavras no body
    words.map(word => (total += word));

    return total;

  }, 0);

  const readTime = Math.ceil(totalWords/200); //valor do tempo de leitura

  const router = useRouter();

  if(router.isFallback) { // loading
    return <h1>Carregando...</h1>;
  };

  const formattedDate = format( // formatando data
    new Date(post.first_publication_date),
    'dd MMM yyyy',
    {
      locale: ptBR
    }
  );

  return(
    <>
    <Head>
      <title>{post.data.title} | SpaceTraveling</title>
    </Head>

      <Header />
      <img src={post.data.banner.url} alt="Banner" className={styles.banner} />

      <main className={commonStyles.container}>
        <div className={styles.post}>

          <div className={styles.postTop}>
            <h1>{post.data.title}</h1>

            <ul>
              <li>
                <FiCalendar />
                {formattedDate}
              </li>

              <li>
                <FiUser />
                {post.data.author}
              </li>

              <li>
                <FiClock />
                {`${readTime} min`}
              </li>
            </ul>
          </div>

          {post.data.content.map(content => {
            return (
              <article key={content.heading}>
                <h2>{content.heading}</h2>
                <div 
                  className={styles.postContent}
                  dangerouslySetInnerHTML={{
                    __html: RichText.asHtml(content.body),
                  }}
                />
              </article>
            )
          })}

        </div>
      </main>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const prismic = getPrismicClient({});
  
  const posts = await prismic.query([ 
    Prismic.predicate.at('document.type', 'posts'),
  ]);

  const paths = posts.results.map(post => {
    return {
      params: {
        slug: post.uid,
      }
    }
  });

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async context => {
  const prismic = getPrismicClient({});
  const { slug } = context.params;
  const response = await prismic.getByUID('posts', String(slug));

  console.log(slug)

  const post = {
    uid: response.uid,
    first_publication_date: response.first_publication_date,
    data: {
      title: response.data.title,
      subtitle: response.data.subtitle,
      author: response.data.author,
      banner: {
        url: response.data.banner.url,
      },
      content: response.data.content.map(content => {
        return {
          heading: content.heading,
          body: [...content.body],
        };
      }),
    },
  }

  return {
    props: {
      post,
    }
  }
}
// export const getStaticProps = async ({params }) => {
//   const prismic = getPrismicClient({});
//   const response = await prismic.getByUID(TODO);

//   // TODO
// };
