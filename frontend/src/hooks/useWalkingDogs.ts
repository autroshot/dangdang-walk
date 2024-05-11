import { WalkingDog } from '@/models/dog.model';
import { Position } from '@/models/location.model';
import { useState } from 'react';

const dogs: WalkingDog[] = [
    {
        id: 1, // 강아지 id
        name: '덕지', //강아지 이름
        photoUrl: 'https://ai.esmplus.com/pixie2665/001.jpg', // 강아지 사진
        isUrineChecked: false,
        isFeceChecked: false,
        fecesLocations: [],
        urineLocations: [],
    },
    {
        id: 2, // 강아지 id
        name: '철도', //강아지 이름
        photoUrl: 'https://ai.esmplus.com/pixie2665/002.jpg', // 강아지 사진
        isUrineChecked: false,
        isFeceChecked: false,
        fecesLocations: [],
        urineLocations: [],
    },
    {
        id: 3, // 강아지 id
        name: '', //강아지 이름
        photoUrl: '', // 강아지 사진
        isUrineChecked: false,
        isFeceChecked: false,
        fecesLocations: [],
        urineLocations: [],
    },
];

const useWalkingDogs = () => {
    const [walkingDogs, setWalkingDogs] = useState<WalkingDog[]>(dogs);

    const toggleUrineCheck = (id: number) => {
        setWalkingDogs(
            walkingDogs.map((d: WalkingDog) => (d.id === id ? { ...d, isUrineChecked: !d.isUrineChecked } : d))
        );
    };
    const toggleFeceCheck = (id: number) => {
        setWalkingDogs(walkingDogs.map((d: any) => (d.id === id ? { ...d, isFeceChecked: !d.isFeceChecked } : d)));
    };
    const saveFecesAndUriens = (position: Position | null) => {
        if (!position) return;
        const { lat, lng } = position;
        setWalkingDogs(
            walkingDogs.map((d: WalkingDog) => {
                return {
                    ...d,
                    isFeceChecked: false,
                    isUrineChecked: false,
                    fecesLocations: d.isFeceChecked ? [...d.fecesLocations, { lat, lng }] : d.fecesLocations,
                    urineLocations: d.isUrineChecked ? [...d.urineLocations, { lat: lat, lng: lng }] : d.urineLocations,
                };
            })
        );
    };

    return { walkingDogs, setWalkingDogs, toggleFeceCheck, toggleUrineCheck, saveFecesAndUriens };
};

export default useWalkingDogs;