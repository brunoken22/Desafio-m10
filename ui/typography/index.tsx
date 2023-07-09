import styled ,{css} from 'styled-components'
type TypeButton ={
   $bg:string
}
export const Title = styled.h1<TypeButton>`
   color: ${(props:any)=>props.$bg} ;
   font-size: 2.5rem;
   text-align: center;
`

export const Subtitle = styled.h2`
   font-size: 1.2rem;
   text-align: center;
`

export const Body = styled.p<any>`
   color:${((props:any)=>props.$bg)|| "#fff"} ;
   font-weight: 300;
   font-size: 0.9rem;
   text-align: center;
   ${(props?)=>props.$style}
`

