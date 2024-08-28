import {cookies} from 'next/headers';
export default function Product() {
  console.log(cookies().has('token'));
  return <></>;
}
