import { use, useEffect, useTransition } from "react";
import { useNavigate } from "react-router";
import { ProfileContext } from "~/profile-context";

export default function RedirectUser() {
  const profile = use(ProfileContext);
  const navigate = useNavigate();

  if (!profile) {
    throw new Error('Could not load profile context');
  }

  let goto = '';

  if (profile.city) {
    goto = '/play';
  } else {
    goto = '/city-picker';
  }

  if (goto) {
    console.log('REDIRECTING!!!');
    useEffect(() => {
      console.log('CALLING REDIRECT');
      navigate(goto);
    }, [goto, navigate]);
  }
}