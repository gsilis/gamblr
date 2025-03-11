import Picker, { type PickerOption } from '~/components/picker/picker';
import Cities from '../constants/city';
import type { CityKey } from '../constants/city';
import { use, useCallback } from 'react';
import { ProfileContext } from '~/profile-context';
import { useNavigate } from 'react-router';

const options = Cities.map(city => {
  return {
    title: city,
    available: true,
    value: city,
  };
});

export default function CityPickerRoute() {
  const context = use(ProfileContext);
  const navigate = useNavigate();

  if (!context) {
    throw new Error('Could not load context.');
  }

  const onSelect = useCallback((option: PickerOption) => {
    const city = option.value as CityKey;
    context.setCity(city);
    navigate('/');
  }, [context.setCity, navigate]);

  return <>
    <Picker
      options={ options }
      prompt={ 'Where would you like to start?' }
      confirm={ 'Continue' }
      onSelect={ onSelect }
    />
  </>;
}