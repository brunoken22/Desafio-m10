import {cookies} from 'next/headers';
export default function Product() {
  console.log(cookies().get('token'));
  return <></>;
}
