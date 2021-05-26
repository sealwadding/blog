import fs from "fs";
import path from "path";
import matter from "gray-matter";
import remark from "remark";
import html from "remark-html";
import prism from "remark-prism";
import { getAuthorData, IAuthor } from "./authors";

const postsDirectory = path.join(process.cwd(), "posts");

/**
 * Defines what a post looks like.
 */
export interface IPost {
  /**
   * The ID of the post. This is the name of the post file, minus the ".md" bit.
   */
  id: string;

  /**
   * The content of the post.
   */
  contentHtml: string;

  /**
   * The authors profile.
   */
  authorProfile: IAuthor;

  /**
   * The date the post was published.
   */
  date: string;

  /**
   * The title of the post.
   */
  title: string;
}

/**
 * Get sorted posts
 *
 * @returns all posts sorted by date
 */
export const getSortedPostsData = (): { id: string; date: string; title: string }[] => {
  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, "");

    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    // Combine the data with the id
    return {
      id,
      ...(matterResult.data as { date: string; title: string }),
    };
  });
  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    }
    return -1;
  });
};

/**
 * Get all of the post IDs
 *
 * @returns a list of post IDs
 */
export const getAllPostIds = (): { params: { id: string } }[] => {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ""),
      },
    };
  });
};

/**
 * Get post data
 *
 * @param id the ID of the post to get
 * @returns the post data
 */
export const getPostData = async (id: string): Promise<IPost> => {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  // Use remark to convert markdown into HTML string
  const processedContent = await remark().use(html).use(prism).process(matterResult.content);
  const contentHtml = processedContent.toString();

  const authorProfile = await getAuthorData(matterResult.data.author);

  // Combine the data with the id and contentHtml
  return {
    id,
    contentHtml,
    authorProfile,
    ...(matterResult.data as { date: string; title: string }),
  };
};
