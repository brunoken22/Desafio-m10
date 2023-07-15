import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { Button } from '@mui/material';
import { useState } from 'react';
import Link from 'next/link'
import { useAuth,useToken } from '@/lib/hooks';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import { useRouter } from 'next/navigation';

export  function FormularioSignin() {
   const router = useRouter()
   const [data,setData] = useState({
      email:"",
      name:""
   })
   const [error,setError] = useState({
      error:false,
      message:""
   })
   const [code,setCode] = useState("")
   const {token,errorToken,isLoading} =useToken({code, email:data.email})
   const darCod =useAuth(data)
   if(token?.errorToken){
      return (
         <h1>Error</h1>
      )
   }
   if(token?.isLoading){
      return (
         <h1>cargando</h1>
      )
   }
   const handleSubmit = (e:any)=>{
      e.preventDefault()
      setData({email:e.target.email.value,name:e.target.name.value})
      const regex = /^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/
      if(regex.test(data.email)){
         setError({
            error:false,
            message:""
         })
         if(darCod?.data?.code){
            alert("Codigo enviado a tu email")
         }
      }else{
         setError({
            error:true,
               message:"Formato de email incorrrecto"
            })
         }
   }
   const handleSubmitCode = (e:any)=>{
      e.preventDefault()
      if(token?.messsage == 'Accedistes'){
         localStorage.setItem("token",token.token.tokenGen)
         localStorage.setItem("authId",token.token.authId)
         router.push("/profile")
      }
   }

   return (
      <>
          {!darCod?.data?.code? <Box component="form" sx={{ '& > :not(style)': { m: 1 } }} style={{color:"#000",display: "flex",flexDirection: "column" ,maxWidth: "100%",minWidth: "30%"}} onSubmit={handleSubmit}>
            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
               <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
               <TextField
                  id="name"
                  name='name'
                  label="Nombre"
                  type='text'
                  variant="standard"
                  fullWidth
                  required
               />
            </Box> 
            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
               <AlternateEmailIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
               <TextField
               id="email"
               label="Email"
               name='email'
               type='email'
               variant="standard"
               error={error.error}
               helperText={error.message}
               fullWidth
               required
            />
         </Box>
         <Button type='submit' variant="contained" style={{color:"#fff"}}>Ingresar</Button>
         </Box>:null}
         {darCod?.data?.code?  <Box component="form" sx={{ '& > :not(style)': { m: 1 } }} style={{color:"#000",display: "flex",flexDirection: "column" ,maxWidth: "100%",minWidth: "30%"}} onSubmit={handleSubmitCode}>
            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
               <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
               <TextField
                  id="code"
                  name='code'
                  label="Código"
                  type='number'
                  variant="standard"
                  onChange={(e:any)=>e.target.value.length  == 5 ? setCode(e.target.value):e.target.value}
                  fullWidth
                  required
               />
            </Box> 
         <Button type='submit' variant="contained" style={{color:"#fff"}}>Ingresar</Button>
         </Box>:null}
      </>
  );
}

