import React from 'react'
import Headers from './_components/Header.jsx'

function Provider({children}) {
  return (
    <div>
        <Headers />
        <div className="px-10 lg:px-32 xl:px-40 2xl:px-56">
            
            {children}

        </div>
         
        

    </div>
  )
}

export default Provider


/*
  Why do we need to render {children} inside <Provider>?

  In React, when we use:
      <Provider>{children}</Provider>

  We're passing the page content (children) into the Provider component.
  However, inside the Provider, we still need to explicitly render {children}
  to actually display it.

  If we don't include {children} inside the return of Provider,
  the content passed into it won't show up.

  Example:
    <Provider>
      <h1>Home Page</h1>
    </Provider>

  Inside Provider:
    return (
      <div>
        <Headers />
        {children} ← this is where <h1>Home Page</h1> will appear
      </div>
    );

  This is how React composition works: we pass components into other components,
  and use {children} as a placeholder for where they should appear.
*/
