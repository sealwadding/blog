import { IAuthor } from "../../lib/authors";
import Author from "../Author/Author";
import styles from "./Subheader.module.scss";

/**
 * The props needed to render the Subheader.
 */
interface ISubheaderProps {
  /**
   * The author of the post.
   */
  author: IAuthor;

  /**
   * The path of the post (excluding the domain).
   */
  path: string;

  /**
   * The title the post.
   */
  title: string;
}

/**
 * The subheader component is responsible for displaying meta data
 * in a post.
 *
 * @param props ISubheaderProps - The props for the component.
 * @returns The subheader markup.
 */
const Subheader = (props: ISubheaderProps): JSX.Element => {
  const { author, path, title } = props;
  return (
    <div className={styles.container}>
      <div className={styles.subheader}>
        <p>← ALL POSTS</p>
        <ul className={styles.shareList}>
          <li className={styles.shareItem}>
            <a
              className={styles.shareAction}
              href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
                `https://somedevsdo.com${path}`
              )}&text=${encodeURIComponent(title)}&via=somedevsdo`}
            >
              <svg
                aria-labelledby="share-to-twitter"
                height="24"
                viewBox="0 0 24 24"
                width="24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title id="share-to-twitter">Share to Twitter</title>
                <path
                  d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609
                1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127
                1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797
                6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108
                1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581
                4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07
                1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0
                14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"
                />
              </svg>
            </a>
          </li>
          <li>
            <button
              className={styles.shareAction}
              onClick={(): Promise<void> =>
                navigator.clipboard.writeText(`https://somedevsdo.com${path}`)
              }
              type="button"
            >
              <svg
                aria-labelledby="copy-link"
                height="24"
                viewBox="0 0 24 24"
                width="24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title id="copy-link">Copy link to clipboard</title>
                <path
                  d="M6.188 8.719c.439-.439.926-.801 1.444-1.087 2.887-1.591 6.589-.745
                8.445 2.069l-2.246
                2.245c-.644-1.469-2.243-2.305-3.834-1.949-.599.134-1.168.433-1.633.898l-4.304
                4.306c-1.307 1.307-1.307 3.433 0 4.74 1.307 1.307 3.433 1.307 4.74
                0l1.327-1.327c1.207.479 2.501.67 3.779.575l-2.929 2.929c-2.511 2.511-6.582
                2.511-9.093 0s-2.511-6.582 0-9.093l4.304-4.306zm6.836-6.836l-2.929
                2.929c1.277-.096 2.572.096 3.779.574l1.326-1.326c1.307-1.307 3.433-1.307 4.74 0
                1.307 1.307 1.307 3.433 0 4.74l-4.305 4.305c-1.311 1.311-3.44 1.3-4.74
                0-.303-.303-.564-.68-.727-1.051l-2.246 2.245c.236.358.481.667.796.982.812.812 1.846
                1.417 3.036 1.704 1.542.371 3.194.166 4.613-.617.518-.286 1.005-.648
                1.444-1.087l4.304-4.305c2.512-2.511 2.512-6.582.001-9.093-2.511-2.51-6.581-2.51-9.092 0z"
                />
              </svg>
            </button>
          </li>
        </ul>
      </div>
      <div className={styles.author}>
        <Author author={author} avatarBorder avatarSize="medium" vertical />
      </div>
    </div>
  );
};

export default Subheader;
