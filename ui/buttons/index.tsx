"use client"
import styled from 'styled-components'

export const Button = styled.button`
   color:   white;
   font-size: 1.5rem;
   border-color: white;
   background-color: pink;
   margin:1rem;
`

export const SecondaryButton  = styled(Button)`
   background-color: orange;
   color:   red;
`

export const OutlineButton = styled(Button)`
   background-color:transparent;
`
