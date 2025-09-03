import React, { useState } from "react";

const Blog = () => {
  const [openPost, setOpenPost] = useState(null);

  const blogPosts = [
    {
      title: "The Do’s and Don’ts of Dog Training Techniques",
      excerpt:
        "A dog can be a wonderful addition to your family. If you want to enjoy your time and have fun together, it is essential that your dog is properly trained...",
      fullText:
        "A dog can be a wonderful addition to your family. If you want to enjoy your time and have fun together, it is essential that your dog is properly trained. An untrained dog will bark excessively, have accidents in the house, chew things, and even bite. If you are planning to train your dog yourself, there are a few techniques you should use to do it properly. If you use the techniques and are patient, your dog will be very well behaved. Positive Reinforcement Techniques... [Full content here]",
      imageUrl:
        "./src/assets/MetavetImages/heroimage0.235642001634165091.3a8f8dac334ef0d8a8bc.jpg", // Replace with actual image URL
    },
    {
      title: "The Best Ways to Keep Your Pet Safe from Fleas and Ticks",
      excerpt:
        "Pet ownership does come with its share of responsibilities. One of these being keeping your pet free from potentially disease-carrying pests...",
      fullText:
        "Pet ownership does come with its share of responsibilities. One of these being keeping your pet free from potentially disease-carrying pests. Unfortunately, some insects like fleas and ticks can harbor harmful bacteria and pathogens, posing a danger to your pets and to any humans they may come into contact with. This risk can be higher for those animals spending much of their time outdoors... [Full content here]",
      imageUrl:
        "./src/assets/MetavetImages/heroimage0.867520001634165106.28e418834d2515c51771.jpg", // Replace with actual image URL
    },
    {
      title: "How to Welcome a New Pet Into Your Home",
      excerpt:
        "You're probably ecstatic about bringing a new pet home. However, your new furball may not feel the same way...",
      fullText:
        "You're probably ecstatic about bringing a new pet home. However, your new furball may not feel the same way. Your pet may feel a bit anxious and for good reason. Imagine how you'd feel in a new home, not knowing anyone or where you are. However, you can take steps to make your pet feel welcome and make the transition easier... [Full content here]",
      imageUrl:
        "./src/assets/MetavetImages/heroimage0.017294001634164052.32eba0ba8b43a6280d59.jpg", // Replace with actual image URL
    },
  ];

  return (
    <div className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-semibold text-gray-800 text-center mb-12">
          Blog
        </h2>

        {/* Blog List */}
        <div className="space-y-8">
          {blogPosts.map((post, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md flex flex-col md:flex-row space-y-4 md:space-y-0"
            >
              <div className="md:w-1/2">
                <img
                  src={post.imageUrl}
                  alt="Blog Post Image"
                  className="w-96 h-auto rounded-lg"
                />
              </div>

              <div className="md:w-1/2 flex flex-col justify-between">
                <h3 className="text-2xl font-semibold text-gray-800">
                  {post.title}
                </h3>
                <p className="text-gray-600 mb-4">{post.excerpt}</p>

                <button
                  onClick={() => setOpenPost(openPost === index ? null : index)}
                  className="text-indigo-600 hover:text-indigo-800"
                >
                  {openPost === index ? "Close" : "Read More"}
                </button>

                {/* Full Content */}
                {openPost === index && (
                  <div className="mt-4">
                    <p className="text-gray-800">{post.fullText}</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;
