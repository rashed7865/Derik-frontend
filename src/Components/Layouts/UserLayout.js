import React from 'react'

export const UserLayout = (props) => {
  return (
    <div>
      {
        props.navbar ?
          <div>
            <div>
              {props.children}
            </div>

          </div>
          :
          props.children
      }

    </div>
  )
}
