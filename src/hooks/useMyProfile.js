import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";

export default function useMyProfile(){
  const { data: session } = useSession();
  const { username } = useParams();
  
  if(!session) return false;
  if(session?.user?.username !== username) return false;

  return true;
}