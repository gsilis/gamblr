import Picker, { type PickerOption } from '~/components/picker/picker';
import Cities from '~/constants/city';
import type { CityKey } from '~/constants/city';
import { use, useCallback, useEffect } from 'react';
import { ProfileContext } from '~/contexts/profile-context';
import { useNavigate } from 'react-router';

const options = Cities.map(city => {
  return {
    title: city,
    available: true,
    value: city,
  };
});

export default function CityPickerRoute() {
  const profileContext = use(ProfileContext);
  const navigate = useNavigate();

  if (!profileContext) {
    throw new Error('Could not load context.');
  }

  const onSelect = useCallback((option: PickerOption) => {
    const city = option.value as CityKey;
    profileContext.setCity(city);
    profileContext.credit(1000);
    navigate('/play');
  }, [profileContext.setCity, profileContext.credit, navigate]);

  return <>
    <Picker
      options={ options }
      prompt={ 'Where would you like to start?' }
      confirm={ 'Continue' }
      onSelect={ onSelect }
    />
  </>;
}