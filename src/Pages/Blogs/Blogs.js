import React from 'react';

const Blogs = () => {
  const blogs = [
    {
      id: 1,
      ques: '1. How will you improve the performance of a React Application?',
      ans: 'Try to compress the image sizes which are you using on the website to avoid extra loading. Do not repeat your codes or components. If necessary make hooks and use that hooks where you needed to implement them.Memoizing React components to prevent unnecessary re-renders. You can use dynamic export or import where you need to implement it.'
    },
    {
      id: 2,
      ques: '2. How does prototypical inheritance work?',
      ans: 'Every object, along with its methods and attributes, has a secret internal property called [Prototype]. Prototypal inheritance is a javascript feature that allows you to add methods and attributes to objects. It is a technique that allows one object to inherit the attributes and methods of another. We use Object.getPrototypeOf and Object.setPrototypeOf to get and set the [Prototype] of an object, respectively. It is now set using __proto__ in current programming languages.'
    },
    {
      id: 3,
      ques: '3. What is a unit test? Why should write unit tests?',
      ans: 'Before code is deployed, unit testing verifies that it fulfills quality criteria. This promotes a stable engineering environment that prioritizes quality. Unit testing saves time and money across the product development life cycle, and it helps developers produce better code faster.'
    },
    {
      id: 4,
      ques: '4. You have an array of products. Each object has a name, price, description, etc. How will you implement a search to find products by name?',
      ans: 'First of all, if it is an array of objects, we can use the map function to check every element of that array. Then inside the array, there have objects and we can find the object element by using (object element name.the element we wanted to get). For example, If we use products array after maping we can get every single elements as product. Then we can use product.name to get the name of the object element. Then we need to use an input tag and we have to get the value from input tag. If searching element matched with product.name then it will show that element from that array of object.'
    },
    {
      id: 5,
      ques: '5. What are the different ways to manage a state in React Application?',
      ans: 'As far as we know, in React have four states. They are URL state, Server state, Local state, and Global state. React employs an observable object as the state, which tracks changes to the state and assists the component in responding appropriately. If we alter the state of any component, such as the following, the webpage will not re-render because React State will not be able to detect the changes.'
    },
  ];
  return (
    <div className='h-screen w-full text-white' >
      <h1 className="text-center text-5xl my-8">Blogs</h1>
      {
        blogs.map(blog =>
          <div className="card w-full p-6 bg-base-100 shadow-xl">
            <div className="card-body bg-neutral shadow-lg rounded-lg">
              <h2 className="card-title">{blog.ques}</h2>
              <p>{blog.ans}</p>

            </div>
          </div>
        )
      }
    </div>
  );
};

export default Blogs;