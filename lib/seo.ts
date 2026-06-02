export function getBlogSEO(blog: any) {
  if (!blog) {
    return {
      title: "Blog - Abbad Dental Clinic",
      description: "Read our latest dental blogs and articles.",
      canonical: "https://www.abbaddentalclinic.com/Blogs/blogs",
      image: "https://www.abbaddentalclinic.com/_next/image?url=%2Fassets%2Fphoto%2F1.JPG&w=640&q=75",
    };
  }

  return {
    title: blog.seo?.metaTitle || blog.title || "Blog - Abbad Dental Clinic",
    description: blog.seo?.metaDescription || blog.excerpt || "Read our latest dental blogs and articles.",
    canonical: blog.seo?.canonical || `https://www.abbaddentalclinic.com/Blogs/blogs/${blog.slug}`,
    image: blog.coverImage || "https://www.abbaddentalclinic.com/_next/image?url=%2Fassets%2Fphoto%2F1.JPG&w=640&q=75",
  };
}
