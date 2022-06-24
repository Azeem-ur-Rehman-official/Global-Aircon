import React, { useEffect, useState } from 'react';
import { getData } from '../../routes/FetchData';
import Loader from '../layout/Loader';
import BlogCard from './cards/BlogCard';
const BlogPage = () => {
  const [blogsData, setblogsData] = useState();
  useEffect(() => {
    // setLoading(true);
    getData(`/api/v1/blogs`)
      .then((res) => {
        // console.log(res.data.blog);
        setblogsData((r) => (r = res.data.blog));
        // setLoading(false);
      })
      .catch((err) => console.log(err.response.data.msg));
  }, []);

  return (
      <section className="blog-area bg-color pt-50 pb-50">
        <div className="container">
      {blogsData ? (
        <>
          <div className="row">
          {blogsData.map((data, i) => {
            return (
              <BlogCard
                _id={data._id}
                heading={data.heading}
                image={data.image.url}
                description={data.description}
                createdAt={data.createdAt}
              />
            );
          })}
          </div>
        </>
      ) : (
        <>
          <Loader />
        </>
      )}
    </div>
    </section>
  );
};

export default BlogPage;
