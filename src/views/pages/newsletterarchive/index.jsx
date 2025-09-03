import React from "react";

const NewsletterArchive = () => {
  const articles = [
    {
      title: "Does My Pet Dream?",
      description:
        "Are humans the only mammals who dream? Find out if your pet experiences dreams and nightmares.",
      link: "#",
    },
    {
      title: "Canine Environmental Enrichment",
      description:
        "Does your dog like to bark, dig and chew everything in his line of sight? The solution may be simpler than you think.",
      link: "#",
    },
    {
      title: "A Tired Dog is a Happy Dog",
      description:
        "Dogs can vary greatly in size and breed, but all need mental and physical stimulation. This article explores how tired dogs are happier.",
      link: "#",
    },
    {
      title: "Camping With Your Pets",
      description:
        "Many dogs and some cats enjoy traveling with their families. Here are a few tips to help make your pet's outdoor adventure a success.",
      link: "#",
    },
    {
      title: "Protect Your Pets with These Water Safety Tips",
      description:
        "Ensure that your pet enjoys water safely this summer by following these water safety tips.",
      link: "#",
    },
    {
      title: "Get Down With Your Dog",
      description:
        "Doga (dog yoga) is becoming a trend. Learn how yoga can benefit both you and your dog.",
      link: "#",
    },
    {
      title: "Having a Positive Experience at the Dog Park",
      description:
        "Tips and preparation for ensuring you and your dog have a great time at the dog park.",
      link: "#",
    },
    {
      title: "Assistance Dogs Offer Many Benefits",
      description:
        "Learn about how assistance dogs help people with various conditions, beyond just the visually impaired.",
      link: "#",
    },
    {
      title: "New Uses for Animal DNA",
      description:
        "Advances in animal DNA science have led to new uses, including in medicine and the criminal justice system.",
      link: "#",
    },
    {
      title: "White House Pets",
      description:
        "A fun look at the Obama family’s choice of a dog breed for the White House and the history of White House pets.",
      link: "#",
    },
    {
      title: "The Incredible Sense of Smell in the Dog",
      description:
        "Dogs have an extraordinary sense of smell—100,000 times better than humans. Learn how dogs use their powerful noses.",
      link: "#",
    },
    {
      title: "Rescue Dogs",
      description:
        "Rescue dogs played an important role in the aftermath of September 11. Learn about their heroic efforts in disaster zones.",
      link: "#",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-10 bg-gray-50">
      <h1 className="text-3xl font-bold text-center mb-8">
        Newsletter Archive
      </h1>
      <p className="text-center text-lg mb-6">
        Welcome to our FREE Pet Living and Wellness Newsletter! Here you will
        find timely information on a variety of topics all centered on creating
        a happy, healthy life with your pets.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article, index) => (
          <div
            key={index}
            className="bg-white border border-gray-200 rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              {article.title}
            </h3>
            <p className="text-gray-600 mb-4">{article.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsletterArchive;
