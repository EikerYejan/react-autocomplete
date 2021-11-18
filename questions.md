## Deel Front-End Engineer Test Questions


<br>

1. What is the difference between Component and PureComponent? give an example where it might break my app.
    
       PureComponent performs a shallow comparison when the state or props change which is more performant. This shallow comparison will fail if we are working with complex data structures.


2. Context + ShouldComponentUpdate might be dangerous. Can think of why is that?

       I'm not quite sure, never ran into this scenario 😕

3. Describe 3 ways to pass information from a component to its PARENT.

       We could pass a callback as a prop, use React.Context API or using some state management library such as Redux or Recoil


4. Give 2 ways to prevent components from re-rendering.

       We could wrap the component in the memo function, or use shouldComponentUpdate (NOT RECOMMENDED)


5. What is a fragment and why do we need it? Give an example where it might break my app.
 
       A fragment is used when we want to render two or more elements without an HTML parent element, it could break your app if your React version doesn't support fragments or doesn't have the proper babel config.

6. Give 3 examples of the HOC pattern.

       Redux connector, component to handle page transitions, or a component to handle auth related logic 


7. What's the difference in handling exceptions in promises, callbacks, and async...await.

       With promises are handled with the .catch method, with callbacks usually, there is an onError parameter which is a function that is called when an error occurs and with async/await the best approach is try-catch blocks

8. How many arguments does setState take and why is it async.

       It takes 2, the new state or a function that returns the new state, and a callback that is called immediately after setState. It's asynchronous because it doesn't mutate the state immediately but schedules a state update.   


9. List the steps needed to migrate a Class to Function Component.

       We must change the class definition for a const or function, move the return of render to the body of the function, remove any use of the `this` keyword, convert any life-cycle method to its equivalent hook.

10. List a few ways styles can be used with components.

        We can use inline styles, CSS, SCSS stylesheets and CSS-in-JS


11. How to render an HTML string coming from the server.

        It must be sanitized and passed in the dangerouslySetInnerHTML prop, eg. <Component dangerouslySetInnerHTML={{ __html: htmlString }} />

